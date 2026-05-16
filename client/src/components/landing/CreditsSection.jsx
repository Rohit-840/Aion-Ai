import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import GlowCard from '../common/GlowCard';
import { creditHighlights, creditFutureNote } from '../../data/landingData';

const CreditsSection = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Credits"
        title="One balance across every AI."
        description="Aion AI runs on a single credit system. New accounts get free credits, admins can adjust any balance, and every movement is saved as a transaction."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {creditHighlights.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="h-full">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aion-gold/10 ring-1 ring-aion-gold/20">
                  <card.icon className="h-5 w-5 text-aion-gold" />
                </span>
                <h3 className="font-display text-base font-semibold text-white">
                  {card.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-aion-muted">{card.text}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Future note */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glow-card mt-6 flex flex-col items-center gap-4 rounded-2xl p-6 text-center sm:flex-row sm:text-left"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-aion-gold/30 to-aion-violet/20 ring-1 ring-white/10">
          <Coins className="h-6 w-6 text-aion-gold" />
        </span>
        <p className="text-sm leading-relaxed text-white/80">
          <span className="font-semibold text-white">Future-ready: </span>
          {creditFutureNote}
        </p>
      </motion.div>
    </Container>
  </section>
);

export default CreditsSection;
