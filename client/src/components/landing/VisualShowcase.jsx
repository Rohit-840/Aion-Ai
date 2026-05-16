import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Badge from '../common/Badge';
import BotAvatar from '../common/BotAvatar';
import PremiumButton from '../common/PremiumButton';
import { allAgents } from '../../data/botsData';

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const AgentCard = ({ agent }) => (
  <article
    className={`glow-card group h-full rounded-3xl p-5 transition-all duration-500 ease-premium hover:-translate-y-1.5 ${
      agent.featured ? 'shadow-glow-gold' : 'hover:shadow-card-hover'
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <BotAvatar bot={agent} size="md" glow={agent.featured} />
      {agent.featured ? (
        <Badge tone="gold">Master Agent</Badge>
      ) : (
        <span className="text-[11px] text-aion-muted">{agent.vendor}</span>
      )}
    </div>

    <h3 className="mt-4 font-display text-lg font-semibold text-white">{agent.name}</h3>
    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-aion-gold">
      {agent.category}
    </p>
    <p className="mt-2.5 text-sm leading-relaxed text-aion-muted">{agent.tagline}</p>
  </article>
);

/**
 * "Meet the AIs" — the agent line-up showcase on the landing page.
 */
const VisualShowcase = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="The line-up"
        title="Every leading AI, ready in one workspace."
        description="Chat with any model below directly, or let Aion Mind decide. One account, one balance — no extra subscriptions to manage."
      />

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-70px' }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {allAgents.map((agent) => (
          <motion.div key={agent.id} variants={gridItem}>
            <AgentCard agent={agent} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <PremiumButton to="/agents" variant="secondary" icon={ArrowRight} iconRight>
          Explore all agents
        </PremiumButton>
      </div>
    </Container>
  </section>
);

export default VisualShowcase;
