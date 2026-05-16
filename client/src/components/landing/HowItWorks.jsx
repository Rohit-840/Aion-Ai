import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { howItWorksSteps } from '../../data/landingData';

const HowItWorks = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Getting started"
        title="From signup to your first answer in seconds."
        description="A clear, four-step path from creating an account to chatting with every AI in one place."
      />

      <div className="relative mt-16">
        {/* Connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Step node */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-aion-charcoal shadow-glow">
                  <step.icon className="h-6 w-6 text-aion-gold" />
                </span>
                <span className="font-display text-4xl font-bold text-white/10 lg:mt-4">
                  {step.step}
                </span>
              </div>

              <div className="glow-card mt-5 rounded-2xl p-5">
                <h3 className="font-display text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-aion-muted">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default HowItWorks;
