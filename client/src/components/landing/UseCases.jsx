import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import UseCaseVisual from '../common/UseCaseVisual';
import { useCases } from '../../data/landingData';

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const UseCases = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Use cases"
        title="One platform for every kind of work."
        description="Whatever you are working on, the right AI — and Aion Mind — is one message away."
      />

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-70px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {useCases.map((useCase) => (
          <motion.div key={useCase.title} variants={gridItem}>
            <article className="glow-card group h-full overflow-hidden rounded-3xl transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover">
              {/* Topical visual */}
              <div className="relative h-44 overflow-hidden">
                <UseCaseVisual
                  variant={useCase.variant}
                  accent={useCase.accent}
                  className="transition-transform duration-700 ease-premium group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <useCase.icon className="h-5 w-5 text-aion-gold" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {useCase.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-aion-muted">
                  {useCase.text}
                </p>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  </section>
);

export default UseCases;
