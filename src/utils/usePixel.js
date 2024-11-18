// src/hooks/usePixel.js

import { useCallback } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { PIXEL_CONFIG } from '../pixel.config.js';

export const usePixel = () => {
  const trackEvent = useCallback((eventName, data = {}) => {
    if (PIXEL_CONFIG.OPTIONS.debug) {
      console.log('Tracking event:', eventName, data);
    }
    
    ReactPixel.track(eventName, {
      ...data,
      timestamp: new Date().toISOString(),
      pixelId: PIXEL_CONFIG.FACEBOOK_PIXEL_ID
    });
  }, []);

  const trackCustomEvent = useCallback((eventName, data = {}) => {
    if (PIXEL_CONFIG.OPTIONS.debug) {
      console.log('Tracking custom event:', eventName, data);
    }
    
    ReactPixel.trackCustom(eventName, {
      ...data,
      timestamp: new Date().toISOString(),
      pixelId: PIXEL_CONFIG.FACEBOOK_PIXEL_ID
    });
  }, []);

  return {
    trackEvent,
    trackCustomEvent,
    pageView: ReactPixel.pageView
  };
};
