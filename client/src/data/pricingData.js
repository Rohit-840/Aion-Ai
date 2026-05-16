/**
 * Pricing plans + FAQ content for Aion AI.
 *
 * NOTE: Aion AI v1 has NO payment integration. Only the Free plan is
 * active — paid tiers are displayed as future-ready product structure.
 */

export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    priceNote: 'forever',
    credits: '25 starter credits',
    tagline: 'Everything you need to explore Aion AI.',
    features: [
      'Secure account',
      '25 starter credits',
      'Access to every AI model',
      'Aion Mind master agent',
    ],
    cta: { label: 'Start Free', to: '/signup' },
    active: true,
    featured: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '₹999',
    priceNote: '/month',
    credits: '1,000 credits/month',
    tagline: 'For individuals who chat with AI every day.',
    features: [
      '1,000 credits every month',
      'All models + Aion Mind',
      'Priority responses in future',
      'Saved chat history in future',
    ],
    cta: { label: 'Coming Soon' },
    active: false,
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹2,999',
    priceNote: '/month',
    credits: '5,000 credits/month',
    tagline: 'For power users and small teams.',
    features: [
      '5,000 credits every month',
      'Advanced Aion Mind routing',
      'Team-ready workspace',
      'Premium support',
    ],
    cta: { label: 'Coming Soon' },
    active: false,
    featured: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: '',
    credits: 'Custom credits',
    tagline: 'For organisations that need scale and control.',
    features: [
      'Custom credit limits',
      'Dedicated admin support',
      'Custom model access',
      'Future API options',
    ],
    cta: { label: 'Contact Later' },
    active: false,
    featured: false,
  },
];

export const pricingFaqs = [
  {
    question: 'What are credits?',
    answer:
      'Credits are tokens tied to your account balance. Each AI conversation can draw from your credits. Every new account starts with 25 free credits.',
  },
  {
    question: 'Which AIs can I use?',
    answer:
      'Aion AI brings together leading models — ChatGPT, Claude, Gemini, Grok, Perplexity, DeepSeek and Copilot — plus the Aion Mind master agent.',
  },
  {
    question: 'What is Aion Mind?',
    answer:
      'Aion Mind is a master agent that reads your request, routes it to the most suitable models, and combines their strengths into a single clear answer.',
  },
  {
    question: 'Do payments work now?',
    answer:
      'No. Payment integration is not active in this version. Paid plans are displayed as future-ready product structure.',
  },
];

export default pricingPlans;
