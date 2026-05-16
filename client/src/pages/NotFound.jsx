import { motion } from 'framer-motion';
import { Home, ImageIcon } from 'lucide-react';
import Container from '../components/common/Container';
import PremiumButton from '../components/common/PremiumButton';

/**
 * 404 — catch-all route.
 */
const NotFound = () => (
  <div className="relative flex min-h-screen flex-col">
    <Container className="flex flex-1 flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md"
      >
        <p className="premium-gradient-text font-display text-7xl font-bold sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          This page drifted out of frame.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-aion-muted">
          The page you are looking for doesn&apos;t exist or may have moved. Let&apos;s get
          you back to the Aion AI experience.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PremiumButton to="/" icon={Home}>
            Back to Home
          </PremiumButton>
          <PremiumButton to="/gallery" variant="secondary" icon={ImageIcon}>
            Explore Gallery
          </PremiumButton>
        </div>
      </motion.div>
    </Container>
  </div>
);

export default NotFound;
