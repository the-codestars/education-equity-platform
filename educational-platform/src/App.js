// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForumsList from './components/ForumsList';
import ForumDetails from './components/ForumDetails';
import CreateForum from './components/CreateForum';
import EditForum from './components/EditForum';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import NotificationHandler from './components/NotificationHandler';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import { initGA, logPageView } from './analytics/ga';

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Forums Routes */}
        <Route
          path="/forums"
          element={
            <ProtectedRoute>
              <ForumsList />
            </ProtectedRoute>
          }
        />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forums/create"
          element={
            <ProtectedRoute>
              <CreateForum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
          />
        <Route
          path="/forums/:forumId"
          element={
            <ProtectedRoute>
              <ForumDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forums/:forumId/edit"
          element={
            <ProtectedRoute>
              <EditForum />
            </ProtectedRoute>
          }
        />

        {/* Posts Routes */}
        <Route
          path="/forums/:forumId/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId/edit"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        {/* Add other routes as needed */}
      </Routes>
    </>
  );
}

export default App;
// // src/App.js (or a dedicated Toast configuration file)
// import { ToastContainer, Slide } from 'react-toastify';

// function App() {
//   return (
//     <>
//       {/* Other components */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         transition={Slide}
//       />
//       {/* Other components */}
//     </>
//   );
// }

// export default App;
