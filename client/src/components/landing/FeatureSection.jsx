import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import GlowCard from '../common/GlowCard';
import { features } from '../../data/landingData';

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const FeatureSection = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Why Aion AI"
        title="Built like a real AI platform from day one."
        description="Aion AI starts with the essentials: a unified multi-model experience, secure accounts, a credit system, admin controls, and Aion Mind at the center."
      />

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-70px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={gridItem}>
            <GlowCard className="h-full">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aion-violet/25 to-aion-blue/15 ring-1 ring-white/10">
                <feature.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-aion-muted">
                {feature.text}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  </section>
);

export default FeatureSection;
