// src/analytics/ga.js
import ReactGA from 'react-ga';
ReactGA.initialize('UA-XXXXXXXXX-X');


const TRACKING_ID = 'UA-XXXXXXXXX-X'; // Replace with your Google Analytics tracking ID

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
