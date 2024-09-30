// src/analytics/mixpanel.js
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = 'YOUR_MIXPANEL_TOKEN'; // Replace with your Mixpanel token

export const initMixpanel = () => {
  mixpanel.init(MIXPANEL_TOKEN, { debug: true });
};

export const trackPageView = (page) => {
  mixpanel.track('Page View', { page });
};

export const trackEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, properties);
};
