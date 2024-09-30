// // src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import StudentProvider from './context/StudentContext';
import MentorProvider from './context/MentorContext';
import ScholarshipProvider from './context/ScholarshipContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfileProvider from './context/UserProfileContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <UserProfileProvider>
      <AuthProvider>
        <StudentProvider>
          <MentorProvider>
            <ScholarshipProvider>
              
              <App />
              <ToastContainer />
            </ScholarshipProvider>
          </MentorProvider>
        </StudentProvider>
      </AuthProvider>
      </UserProfileProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// src/index.js
// src/index.js
// src/index.js
// src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { messaging } from './firebase';
// import { onMessage } from 'firebase/messaging';

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//       <ToastContainer />
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // Register Service Worker for FCM
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/firebase-messaging-sw.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((err) => {
//         console.error('Service Worker registration failed:', err);
//       });
//   });
// }

// // Listen for foreground messages
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   const { title, body } = payload.notification;
//   // Display in-app notification using React Toastify
//   import('react-toastify').then(({ toast }) => {
//     toast.info(`${title}: ${body}`);
//   });
// });
