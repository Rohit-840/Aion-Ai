import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import SmoothScrollProvider from './components/common/SmoothScrollProvider';
import AnimatedBackground from './components/common/AnimatedBackground';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Agents from './pages/Agents';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AppPlaceholder from './pages/AppPlaceholder';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

/**
 * App root.
 * - MotionConfig: makes all Framer Motion animations honour the user's
 *   reduced-motion preference.
 * - SmoothScrollProvider: global Lenis smooth scrolling + GSAP sync.
 * - AnimatedBackground: fixed ambient background behind every page.
 */
const App = () => (
  <MotionConfig reducedMotion="user">
    <SmoothScrollProvider>
      <AnimatedBackground />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aiadmin" element={<AdminLogin />} />

        {/* Protected — requires an authenticated user */}
        <Route
          path="/app-placeholder"
          element={
            <ProtectedRoute>
              <AppPlaceholder />
            </ProtectedRoute>
          }
        />

        {/* Admin — requires the "admin" role */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SmoothScrollProvider>
  </MotionConfig>
);

export default App;
