// Secure logging utility - only logs in development mode
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  error: (...args) => {
    // In production, only log critical errors
    if (!isDevelopment) {
      // Skip logging for expected/non-critical errors
      const errorString = args.map(a => String(a)).join(' ').toLowerCase();
      const skipPatterns = [
        'mnit',
        'google authentication',
        'cross-origin',
        'postmessage',
        'network error',
        'api request failed'
      ];

      if (skipPatterns.some(pattern => errorString.includes(pattern))) {
        return; // Don't log expected errors in production
      }
    }

    // Sanitize sensitive data before logging
    const sanitized = args.map(arg => {
      if (typeof arg === 'string') {
        // Remove potential sensitive data
        return arg
          .replace(/client[_-]?id["\\s:=]+([^\\s"',}]+)/gi, 'client_id: [REDACTED]')
          .replace(/token["\\s:=]+([^\\s"',}]+)/gi, 'token: [REDACTED]')
          .replace(/password["\\s:=]+([^\\s"',}]+)/gi, 'password: [REDACTED]')
          .replace(/authorization["\\s:=]+([^\\s"',}]+)/gi, 'authorization: [REDACTED]')
          .replace(/bearer\\s+[\\w-]+/gi, 'Bearer [REDACTED]');
      }
      if (arg && typeof arg === 'object') {
        // Sanitize objects
        const sanitizedObj = { ...arg };
        if (sanitizedObj.token) sanitizedObj.token = '[REDACTED]';
        if (sanitizedObj.password) sanitizedObj.password = '[REDACTED]';
        if (sanitizedObj.clientId) sanitizedObj.clientId = '[REDACTED]';
        if (sanitizedObj.client_id) sanitizedObj.client_id = '[REDACTED]';
        if (sanitizedObj.authorization) sanitizedObj.authorization = '[REDACTED]';
        if (sanitizedObj.headers?.Authorization) sanitizedObj.headers.Authorization = 'Bearer [REDACTED]';
        return sanitizedObj;
      }
      return arg;
    });
    console.error(...sanitized);
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  }
};
