import React, { useState } from 'react';

const PlatformVerificationModal = ({ platform, data, onVerify, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const cfProblemUrl = platform === 'codeforces' && data.verificationCode
    ? (() => {
        const match = data.verificationCode.match(/^(\d+)([A-Z])$/);
        if (match) {
          return `https://codeforces.com/problemset/problem/${match[1]}/${match[2]}`;
        }
        return null;
      })()
    : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await onVerify();
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
            Verify Your {platform === "leetcode" ? "LeetCode" : "Codeforces"} Profile
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Add the verification code to your {platform} profile
          </p>
        </div>

        {/* Code Section */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono break-words">
                {data.verificationCode}
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white text-sm"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-4">
              {copied ? "Copied!" : "Copy this verification code"}
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-300">
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              {platform === "leetcode" ? (
                <>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">1.</span>
                    <span>Go to your LeetCode profile</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">2.</span>
                    <span>Add this code to your ReadMe:</span>
                  </div>
                  <div className="bg-gray-700 rounded p-2 mt-2 overflow-x-auto">
                    <code className="text-[#FFC22D] font-mono text-xs sm:text-sm">
                      {data.verificationCode}
                    </code>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">3.</span>
                    <span>Click "Verify" below to complete verification</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">1.</span>
                    <span>Go to this problem:</span>
                  </div>
                  <div className="ml-7 mb-2">
                    {cfProblemUrl ? (
                      <a
                        href={cfProblemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-[#FFC22D] font-mono font-bold text-sm">{data.verificationCode}</span>
                        <span className="text-xs text-gray-400">→ Open in Codeforces</span>
                      </a>
                    ) : (
                      <span className="text-[#FFC22D] font-mono text-sm font-bold">{data.verificationCode}</span>
                    )}
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">2.</span>
                    <span>Submit <strong>any solution</strong> to that problem (even if it's wrong)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#FF3C5F] font-bold">3.</span>
                    <span>Wait 2-3 minutes, then click "Verify" below</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90"
              } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>

        {/* Note */}
        <div className="mt-4 p-2 sm:p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <p className="text-[10px] sm:text-xs text-blue-300">
            <strong>Note:</strong> The verification code will expire in 10 minutes. Make sure to add it to your profile quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformVerificationModal;
