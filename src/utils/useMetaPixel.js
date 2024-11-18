import { useCallback } from 'react';

export const useMetaPixel = () => {
  // Helper to ensure FB Pixel is loaded
  const isPixelLoaded = () => {
    return typeof window !== 'undefined' && window.fbq;
  };

  console.log("pixel status"+isPixelLoaded());
  

  // Standard Events
  const standardEvents = {
    LEAD: 'Lead',
    PAGE_VIEW: 'PageView',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    CONTACT: 'Contact',
    CUSTOMIZE_PRODUCT: 'CustomizeProduct',
    DONATE: 'Donate',
    FIND_LOCATION: 'FindLocation',
    SCHEDULE: 'Schedule',
    START_TRIAL: 'StartTrial',
    SUBMIT_APPLICATION: 'SubmitApplication',
    SUBSCRIBE: 'Subscribe'
  };

  // Custom Events
  const customEvents = {
    // Form Related Events
    FORM_START: 'FormStart',
    FORM_STEP_COMPLETE: 'FormStepComplete',
    FORM_ABANDON: 'FormAbandon',
    FORM_ERROR: 'FormError',
    FORM_IMPRESSION: 'FormImpression',
    
    // Button Click Events
    BUTTON_CLICK: 'ButtonClick',
    CTA_CLICK: 'CTAClick',
    
    // Section View Events
    SECTION_VIEW: 'SectionView',
    CONTENT_VIEW: 'ContentView',
    
    // User Interaction Events
    SERVICE_SELECTED: 'ServiceSelected',
    BUDGET_SELECTED: 'BudgetSelected',
    SCROLL_DEPTH: 'ScrollDepth',
    
    // Offer Related Events
    OFFER_VIEW: 'OfferView',
    OFFER_CLAIM: 'OfferClaim',
    DISCOUNT_APPLIED: 'DiscountApplied',
    
    // Chat/Support Events
    CHAT_START: 'ChatStart',
    CHAT_END: 'ChatEnd',
    SUPPORT_CLICK: 'SupportClick',
    
    // Document/Resource Events
    DOCUMENT_DOWNLOAD: 'DocumentDownload',
    RESOURCE_ACCESS: 'ResourceAccess',
    
    // Video Events
    VIDEO_START: 'VideoStart',
    VIDEO_COMPLETE: 'VideoComplete',
    VIDEO_MILESTONE: 'VideoMilestone'
  };

  // Track standard events
  const trackEvent = useCallback((eventName, data = {}) => {
    if (!isPixelLoaded()) {
      console.warn('Facebook Pixel not loaded');
      return;
    }

    try {
      const eventData = {
        ...data,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title
      };

      window.fbq('track', eventName, eventData);
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Meta Pixel] Standard Event: ${eventName}`, eventData);
      }
    } catch (error) {
      console.error('Error tracking pixel event:', error);
    }
  }, []);

  // Track custom events
  const trackCustomEvent = useCallback((eventName, data = {}) => {
    if (!isPixelLoaded()) {
      console.warn('Facebook Pixel not loaded');
      return;
    }

    try {
      const eventData = {
        ...data,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        user_agent: navigator.userAgent
      };

      window.fbq('trackCustom', eventName, eventData);
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Meta Pixel] Custom Event: ${eventName}`, eventData);
      }
    } catch (error) {
      console.error('Error tracking custom pixel event:', error);
    }
  }, []);

  // Specific tracking functions for common events
  const trackFormEvent = useCallback((action, formData = {}) => {
    const formEvents = {
      start: customEvents.FORM_START,
      step: customEvents.FORM_STEP_COMPLETE,
      abandon: customEvents.FORM_ABANDON,
      error: customEvents.FORM_ERROR,
      impression: customEvents.FORM_IMPRESSION
    };

    trackCustomEvent(formEvents[action], {
      form_name: formData.formName || 'Lead Form',
      form_step: formData.step,
      form_data: formData,
      interaction_time: new Date().toISOString()
    });
  }, [trackCustomEvent]);

  const trackButtonClick = useCallback((buttonName, data = {}) => {
    trackCustomEvent(customEvents.BUTTON_CLICK, {
      button_name: buttonName,
      button_type: data.type || 'button',
      button_location: data.location,
      interaction_type: 'click',
      ...data
    });
  }, [trackCustomEvent]);

  const trackSectionView = useCallback((sectionName, data = {}) => {
    trackCustomEvent(customEvents.SECTION_VIEW, {
      section_name: sectionName,
      section_type: data.type || 'content',
      view_duration: data.duration,
      scroll_depth: data.scrollDepth,
      ...data
    });
  }, [trackCustomEvent]);

  const trackScrollDepth = useCallback((depth) => {
    trackCustomEvent(customEvents.SCROLL_DEPTH, {
      scroll_depth_percentage: depth,
      scroll_depth_pixels: window.scrollY,
      page_height: document.documentElement.scrollHeight
    });
  }, [trackCustomEvent]);

  const trackOfferInteraction = useCallback((action, offerData = {}) => {
    const offerEvents = {
      view: customEvents.OFFER_VIEW,
      claim: customEvents.OFFER_CLAIM,
      apply: customEvents.DISCOUNT_APPLIED
    };

    trackCustomEvent(offerEvents[action], {
      offer_id: offerData.id,
      offer_type: offerData.type,
      offer_value: offerData.value,
      ...offerData
    });
  }, [trackCustomEvent]);

  return {
    // Base tracking functions
    trackEvent,
    trackCustomEvent,
    
    // Specific tracking functions
    trackFormEvent,
    trackButtonClick,
    trackSectionView,
    trackScrollDepth,
    trackOfferInteraction,
    
    // Event name constants
    standardEvents,
    customEvents
  };
};