import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import PremiumButton from '../common/PremiumButton';
import { pricingPlans } from '../../data/pricingData';

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

    <div className="mt-3 flex items-end gap-1">
      <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
      {plan.priceNote && (
        <span className="pb-1 text-sm text-aion-muted">{plan.priceNote}</span>
      )}
    </div>

    <p className="mt-2 text-sm font-medium text-aion-gold">{plan.credits}</p>

    <ul className="mt-5 flex-1 space-y-2.5">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm text-aion-muted">
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

const PricingPreview = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Plans"
        title="Simple credit plans that scale with your chats."
        description="Start free today. Paid plans are prepared as future-ready product structure — no payment integration in this version."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PremiumButton to="/pricing" variant="secondary" icon={ArrowRight} iconRight>
          See full pricing details
        </PremiumButton>
      </div>
    </Container>
  </section>
);

export default PricingPreview;
