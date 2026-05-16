import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import PremiumButton from '../common/PremiumButton';
import MagneticButton from '../common/MagneticButton';

const FinalCTA = () => (
  <section className="section-padding relative">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-aion-gold">
          <Sparkles className="h-3.5 w-3.5" />
          Get started
        </span>

        <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
          Start chatting with every AI today.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-aion-muted text-balance">
          Create your free account, get 25 credits, and start chatting with every leading
          AI — coordinated by Aion Mind, the master agent.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton>
            <PremiumButton to="/signup" size="lg" icon={Sparkles}>
              Start Chatting Free
            </PremiumButton>
          </MagneticButton>
          <PremiumButton to="/pricing" size="lg" variant="secondary" icon={ArrowRight} iconRight>
            View Plans
          </PremiumButton>
        </div>

        <p className="mt-6 text-xs text-white/40">
          No payment required — your first 25 credits are on us.
        </p>
      </motion.div>
    </Container>
  </section>
);

export default FinalCTA;
