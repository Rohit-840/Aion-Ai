import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import BotAvatar from '../components/common/BotAvatar';
import { allAgents, agentCategories } from '../data/botsData';

const AgentCard = ({ agent }) => (
  <article
    className={`glow-card group h-full overflow-hidden rounded-3xl transition-all duration-500 ease-premium hover:-translate-y-1.5 ${
      agent.featured ? 'hover:shadow-glow-gold' : 'hover:shadow-card-hover'
    }`}
  >
    {/* Photo header */}
    <div className="relative h-40 overflow-hidden">
      <img
        src={agent.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aion-charcoal via-aion-charcoal/55 to-aion-charcoal/10" />

      {agent.featured && (
        <span className="absolute right-3 top-3">
          <Badge tone="gold">Master Agent</Badge>
        </span>
      )}

      <div className="absolute bottom-3 left-4 flex items-center gap-3">
        <span className="rounded-2xl bg-aion-charcoal/85 p-1 backdrop-blur-sm">
          <BotAvatar bot={agent} size="sm" glow={agent.featured} />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-white">{agent.name}</h3>
          <p className="text-[11px] text-white/60">by {agent.vendor}</p>
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="p-5">
      <span className="inline-block rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-aion-gold">
        {agent.category}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-aion-muted">{agent.description}</p>
    </div>
  </article>
);

/**
 * /agents — "Explore AI Agents": the directory of every model on the
 * platform, plus the Aion Mind master agent.
 */
const Agents = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? allAgents
      : allAgents.filter((agent) => agent.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="pt-32 sm:pt-36">
        {/* Header */}
        <section className="pb-10">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="flex justify-center">
                <Badge tone="gold" dot>
                  AI Agents
                </Badge>
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Explore the AI agents.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-aion-muted sm:text-lg">
                Every model available on Aion AI. Chat with any of them directly, or hand
                the work to Aion Mind — the master agent that coordinates them all.
              </p>
            </motion.div>

            {/* Filter chips */}
            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              {agentCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'border-transparent bg-gradient-to-r from-aion-violet to-aion-blue text-white shadow-glow'
                        : 'border-white/10 bg-white/[0.04] text-aion-muted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Agent grid */}
        <section className="pb-24">
          <Container>
            <div key={activeCategory} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: (index % 3) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <AgentCard agent={agent} />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-aion-muted">
                No agents in this category yet.
              </p>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Agents;
