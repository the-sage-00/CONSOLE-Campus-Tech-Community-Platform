import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthProvider';
import { API_ENDPOINTS, apiFetch } from '../utils/api';
import { motion } from 'framer-motion';
import { logger } from '../utils/logger';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(true);
  const [googleError, setGoogleError] = useState(false);
  const googleButtonRef = useRef(null);

  useEffect(() => {
    document.title = 'Login | Console';

    // Redirect if already authenticated
    if (isAuthenticated()) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Google Sign-In Integration
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // Check if client ID is configured
    if (!clientId) {
      logger.error('Google Client ID not configured');
      setGoogleLoading(false);
      setGoogleError(true);
      return;
    }

    // Load Google Identity Services script
    const loadGoogleScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        waitForRefAndInitialize();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        waitForRefAndInitialize();
      };
      script.onerror = () => {
        setGoogleLoading(false);
        setGoogleError(true);
        logger.error('Failed to load Google Sign-In script');
        toast.error('Failed to load Google Sign-In. Please check your internet connection.');
      };
      document.body.appendChild(script);
    };

    // Wait for ref to be ready with retry logic
    const waitForRefAndInitialize = () => {
      let attempts = 0;
      const maxAttempts = 30; // Try for 3 seconds (30 * 100ms)

      const checkRef = () => {
        attempts++;

        if (googleButtonRef.current && window.google?.accounts?.id) {
          initializeGoogleSignIn();
        } else if (attempts < maxAttempts) {
          // Retry after 100ms
          setTimeout(checkRef, 100);
        } else {
          logger.error('Google button ref not ready after 3 seconds');
          setGoogleLoading(false);
          setGoogleError(true);
        }
      };

      // Start checking
      checkRef();
    };

    // Initialize Google Sign-In
    const initializeGoogleSignIn = () => {
      try {
        if (!window.google || !window.google.accounts || !window.google.accounts.id) {
          logger.error('Google Identity Services not available');
          setGoogleLoading(false);
          setGoogleError(true);
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the button
        if (googleButtonRef.current) {
          try {
            window.google.accounts.id.renderButton(googleButtonRef.current, {
              theme: 'filled_black',
              size: 'large',
              shape: 'rectangular',
              width: 320,
              text: 'signin_with',
              logo_alignment: 'center'
            });

            setGoogleLoading(false);
            setGoogleError(false);
          } catch (error) {
            logger.error('Error rendering Google button:', error);
            setGoogleLoading(false);
            setGoogleError(true);
          }
        } else {
          logger.error('Google button ref is null');
          setGoogleLoading(false);
          setGoogleError(true);
        }
      } catch (error) {
        logger.error('Error initializing Google Sign-In:', error);
        setGoogleLoading(false);
        setGoogleError(true);
      }
    };

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      loadGoogleScript();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle Google Sign-In response
  const handleGoogleResponse = async (response) => {
    if (response.credential) {
      setIsLoading(true);
      try {
        const result = await apiFetch(API_ENDPOINTS.AUTH_CALLBACK, {
          method: 'POST',
          body: JSON.stringify({ credential: response.credential }),
        });

        if (result.success) {
          login(result.user, result.token);

          // Show different message for new vs existing users
          if (result.isNewUser) {
            toast.success('Account created successfully! Welcome to Console!', {
              autoClose: 3000,
            });
          } else {
            toast.success('Welcome back!', {
              autoClose: 2000,
            });
          }

          setTimeout(() => {
            navigate('/profile');
          }, 1000);
        } else {
          toast.error(result.message || 'Authentication failed. Please try again.');
        }
      } catch (error) {
        // Handle specific error messages with user-friendly responses
        const errorMessage = error.message || '';

        if (errorMessage.includes('MNIT') || errorMessage.includes('mnit.ac.in')) {
          // MNIT email restriction - show friendly message
          toast.error('🎓 Please use your MNIT email (@mnit.ac.in) to sign in.', {
            autoClose: 5000,
          });
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          toast.error('Network error. Please check your connection and try again.');
        } else if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error('Authentication failed. Please try again.');
        }

        // Only log in development mode
        if (import.meta.env.DEV) {
          logger.error('Google authentication error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Retry loading Google button
  const retryGoogleLoad = () => {
    setGoogleLoading(true);
    setGoogleError(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer position="top-center" theme="dark" />

      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF3C5F]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFC22D]/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Back Button - Floating */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center space-x-1.5 text-gray-500 hover:text-white transition-all duration-300 group z-10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back</span>
      </button>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-12 h-12 border-2 border-[#FF3C5F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-300">Signing you in...</p>
          </motion.div>
        </div>
      )}

      {/* Premium Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[360px]"
      >
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3C5F]/30 to-[#FFC22D]/30 rounded-2xl blur-xl opacity-50" />

        {/* Main Card */}
        <div className="relative bg-[#0d0d12]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

          {/* Premium Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="px-3 py-1 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
              MNIT Students Only
            </div>
          </div>

          {/* Logo */}
          <div className="text-center mt-4 mb-6">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-[#FF3C5F] via-[#FF6B4A] to-[#FFC22D] bg-clip-text text-transparent">
                Console
              </span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Competitive Programming Hub</p>
          </div>

          {/* Instructions Card */}
          <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] flex items-center justify-center">
                <span className="text-[10px]">📋</span>
              </div>
              <h2 className="text-xs font-semibold text-white">How to Login</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2.5 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full bg-[#FF3C5F]" />
                <span>Use your <span className="text-white font-medium">@mnit.ac.in</span> email</span>
              </li>
              <li className="flex items-center space-x-2.5 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full bg-[#FFC22D]" />
                <span>Click Google button below</span>
              </li>
              <li className="flex items-center space-x-2.5 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full bg-green-400" />
                <span>Auto-register for new accounts</span>
              </li>
            </ul>
          </div>

          {/* Google Sign-In Button */}
          <div className="mb-4">
            {googleError ? (
              <div className="text-center">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-3">
                  <p className="text-red-400 text-xs">Failed to load Google Sign-In</p>
                </div>
                <button
                  onClick={retryGoogleLoad}
                  className="w-full py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#FF3C5F]/25 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Google button container */}
                <div
                  ref={googleButtonRef}
                  className="flex justify-center w-full"
                  style={{ minHeight: '44px' }}
                />

                {/* Show loading while Google button is loading */}
                {googleLoading && (
                  <div className="flex items-center justify-center space-x-2 py-3 bg-white/5 rounded-xl">
                    <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-500">Loading...</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-600">
            By signing in, you agree to our{' '}
            <Link to="/terms-of-service" className="text-gray-500 hover:text-[#FF3C5F] transition-colors">
              Terms
            </Link>
            {' '}&{' '}
            <Link to="/privacy-policy" className="text-gray-500 hover:text-[#FF3C5F] transition-colors">
              Privacy
            </Link>
          </p>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-t-full" />
        </div>
      </motion.div>

      {/* Bottom Text */}
      <p className="absolute bottom-4 text-[10px] text-gray-600">
        © 2026 Console • Made with ❤️ for MNIT
      </p>
    </div>
  );
};

export default Login;