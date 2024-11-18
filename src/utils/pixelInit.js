// src/utils/pixelInit.js
import ReactPixel from 'react-facebook-pixel';
import { PIXEL_CONFIG } from '../pixel.config.js';

export const initializePixel = () => {
  try {
    // Initialize base pixel
    ReactPixel.default.init(
      PIXEL_CONFIG.FACEBOOK_PIXEL_ID,
      PIXEL_CONFIG.ADVANCED_MATCHING,
      PIXEL_CONFIG.OPTIONS
    );

    // Enable page view tracking
    ReactPixel.default.pageView();

    // Return methods for tracking
    return {
      trackCustom: ReactPixel.default.trackCustom,
      track: ReactPixel.default.track,
      pageView: ReactPixel.default.pageView
    };
  } catch (error) {
    console.error('Pixel initialization error:', error);
    return {
      trackCustom: () => {},
      track: () => {},
      pageView: () => {}
    };
  }
};

// Additional pixel utilities
export const pixelUtils = {
  consent: {
    grant: () => {
      ReactPixel.default.grantConsent();
    },
    revoke: () => {
      ReactPixel.default.revokeConsent();
    }
  },
  dataProcessing: {
    enable: () => {
      ReactPixel.default.setAllowDataProcessing(true);
    },
    disable: () => {
      ReactPixel.default.setAllowDataProcessing(false);
    }
  }
};

// Export pixel instance
export const pixel = ReactPixel.default;

// Standard event tracking functions
export const pixelEvents = {
  trackPageView: () => {
    ReactPixel.default.pageView();
  },

  trackEvent: (eventName, data = {}) => {
    ReactPixel.default.track(eventName, data);
  },

  trackCustomEvent: (eventName, data = {}) => {
    ReactPixel.default.trackCustom(eventName, data);
  }
};
