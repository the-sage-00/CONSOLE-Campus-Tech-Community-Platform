import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { logger } from '../../../utils/logger';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars", // 'chars' | 'words' | 'lines'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  once = true,
  staggerDirection = 1,
  gradient = "", // ✅ new prop for Tailwind gradient classes
  onLetterAnimationComplete,
  as = 'span',
}) => {
  const ref = useRef(null);
  const scrollTriggerRef = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current || !text) return;

    const el = ref.current;
    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    // Wait for fonts to load before initializing SplitText
    const initializeSplitText = () => {
      // Check if document fonts are ready
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          createSplitTextAnimation();
        }).catch(() => {
          // Fallback: proceed without waiting
          logger.warn('SplitText called before fonts loaded');
          setTimeout(createSplitTextAnimation, 100);
        });
      } else {
        // Fallback for browsers without document.fonts API
        setTimeout(createSplitTextAnimation, 100);
      }
    };

    const createSplitTextAnimation = () => {

    let splitter;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      logger.error("Failed to create SplitText:", error);
      return;
    }

    let targets =
      splitType === "lines"
        ? splitter.lines
        : splitType === "words"
        ? splitter.words
        : splitter.chars;

    if (!targets || targets.length === 0) {
      logger.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    // ✅ Apply gradient classes to each split element
    if (gradient) {
      targets.forEach((t) => {
        t.classList.add(...gradient.split(" "));
      });
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const sign =
      marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once,
        onToggle: (self) => {
          scrollTriggerRef.current = self;
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    // ✅ Use fromTo to prevent instant disappearance
    tl.fromTo(
      targets,
      { ...from, immediateRender: false, force3D: true },
      {
        ...to,
        duration,
        ease,
        stagger: {
          each: delay / 1000,
          from: staggerDirection === -1 ? "end" : "start",
        },
        force3D: true,
      }
    );

      return () => {
        tl.kill();
        scrollTriggerRef.current?.kill();
        gsap.killTweensOf(targets);
        splitter?.revert();
      };
    };

    initializeSplitText();
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    once,
    staggerDirection,
    gradient,
    onLetterAnimationComplete,
  ]);

  const ComponentTag = as;
  return (
    <ComponentTag
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </ComponentTag>
  );
};

export default SplitText;
