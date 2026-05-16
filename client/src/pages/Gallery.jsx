import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import BotAvatar from '../components/common/BotAvatar';
import PremiumButton from '../components/common/PremiumButton';
import MagneticButton from '../components/common/MagneticButton';
import { promptGallery, promptCategories } from '../data/galleryData';
import { agentsById } from '../data/botsData';

const PromptCard = ({ item }) => {
  const agent = agentsById[item.agentId];

  return (
    <article className="glow-card group flex h-full flex-col rounded-3xl p-5 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-aion-gold">
          {item.category}
        </span>
        <MessageSquare className="h-4 w-4 text-white/20" />
      </div>

      {/* User prompt bubble */}
      <div className="mt-4 flex justify-end">
        <div className="max-w-[88%] rounded-2xl rounded-br-md bg-gradient-to-br from-aion-violet to-aion-blue px-3.5 py-2.5">
          <p className="text-sm text-white">{item.prompt}</p>
        </div>
      </div>

      {/* Agent reply */}
      <div className="mt-3 flex gap-2.5">
        <BotAvatar bot={agent} size="xs" />
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[11px] font-semibold text-white">
            {agent?.name} <span className="text-aion-muted">replied</span>
          </p>
          <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5">
            <p className="text-sm leading-relaxed text-white/85">{item.reply}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * /gallery — the prompt gallery: example prompts paired with the AI
 * replies they produce on Aion AI.
 */
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? promptGallery
      : promptGallery.filter((item) => item.category === activeCategory);

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
                  Prompt gallery
                </Badge>
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                See what you can ask.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-aion-muted sm:text-lg">
                Real examples of prompts and the replies you get on Aion AI — from quick
                everyday tasks to Aion Mind coordinating several models at once.
              </p>
            </motion.div>

            {/* Filter chips */}
            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              {promptCategories.map((category) => {
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

        {/* Prompt grid */}
        <section className="pb-20">
          <Container>
            <div key={activeCategory} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: (index % 3) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <PromptCard item={item} />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-aion-muted">
                No prompts in this category yet.
              </p>
            )}

            {/* CTA */}
            <div className="mt-14 flex justify-center">
              <MagneticButton>
                <PremiumButton to="/signup" size="lg" icon={Sparkles}>
                  Start Chatting Free
                </PremiumButton>
              </MagneticButton>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
