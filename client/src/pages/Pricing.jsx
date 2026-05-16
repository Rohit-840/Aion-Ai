import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, ChevronDown } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import SectionHeading from '../components/common/SectionHeading';
import PremiumButton from '../components/common/PremiumButton';
import FinalCTA from '../components/landing/FinalCTA';
import { pricingPlans, pricingFaqs } from '../data/pricingData';

/** Detailed pricing plan card. */
const PlanCard = ({ plan, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className={`glow-card relative flex h-full flex-col rounded-3xl p-6 transition-all duration-500 ease-premium hover:-translate-y-2 ${
      plan.featured ? 'shadow-glow' : 'hover:shadow-card-hover'
    }`}
  >
    {plan.featured && (
      <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-aion-gold to-amber-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-aion-black">
        <Star className="h-3 w-3 fill-current" />
        Popular
      </span>
    )}

    <h3 className="font-display text-lg font-semibold text-white">{plan.name}</h3>
    <p className="mt-1.5 text-xs leading-relaxed text-aion-muted">{plan.tagline}</p>

    <div className="mt-4 flex items-end gap-1">
      <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
      {plan.priceNote && (
        <span className="pb-1.5 text-sm text-aion-muted">{plan.priceNote}</span>
      )}
    </div>

    <p className="mt-3 inline-flex w-fit items-center rounded-lg bg-aion-gold/10 px-2.5 py-1 text-xs font-semibold text-aion-gold ring-1 ring-aion-gold/20">
      {plan.credits}
    </p>

    <div className="my-5 h-px bg-white/10" />

    <ul className="flex-1 space-y-2.5">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-aion-cyan" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <div className="mt-6">
      {plan.active ? (
        <PremiumButton to={plan.cta.to} fullWidth>
          {plan.cta.label}
        </PremiumButton>
      ) : (
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/40"
        >
          {plan.cta.label}
        </button>
      )}
    </div>
  </motion.div>
);

/** Single FAQ accordion row. */
const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className="glow-card overflow-hidden rounded-2xl">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 p-5 text-left"
    >
      <span className="font-medium text-white">{faq.question}</span>
      <ChevronDown
        className={`h-5 w-5 shrink-0 text-aion-gold transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 text-sm leading-relaxed text-aion-muted">{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/**
 * /pricing — detailed plans + FAQ.
 */
const Pricing = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Navbar />
      <main className="pt-32 sm:pt-36">
        {/* Header */}
        <section className="pb-12">
          <Container>
            <SectionHeading
              eyebrow="Pricing"
              title="Simple credit plans for every AI chat."
              description="Start free today. Paid plans are prepared for future scale across every model and Aion Mind — no payment integration is enabled in this version."
            />
          </Container>
        </section>

        {/* Plans */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-white/40">
              Only the Free plan is active in this version. Paid plans show future-ready
              product structure — no payment integration is enabled yet.
            </p>
          </Container>
        </section>

        {/* FAQ */}
        <section className="section-padding pt-4">
          <Container>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions about credits and plans."
              description="Everything you need to know about how the credit system works today and where it is heading."
            />
            <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
              {pricingFaqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </Container>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Pricing;
