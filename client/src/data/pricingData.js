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
    question: 'What is Aion AI?',
    answer:
      'Aion AI is a single platform for chatting with multiple leading AI models — ChatGPT, Claude, Gemini, Grok and more — plus Aion Mind, a master agent that coordinates them. One account, one balance, no separate subscriptions to juggle.',
  },
  {
    question: 'What are credits and how do they work?',
    answer:
      'Credits are tokens tied to your account balance. Each AI conversation can draw from your credits, and your balance is visible in your workspace at all times. Every new account starts with 25 free credits.',
  },
  {
    question: 'Which AI models can I use?',
    answer:
      'Aion AI brings together ChatGPT, Claude, Gemini, Grok, Perplexity, DeepSeek and Copilot. You can pick a model yourself, or let Aion Mind choose and combine the best ones for each request.',
  },
  {
    question: 'What is Aion Mind?',
    answer:
      'Aion Mind is the master agent at the centre of the platform. It reads your request, routes it to the most suitable models, and merges their strengths into one clear answer — so you never have to guess which model to use.',
  },
  {
    question: 'Do I need an account to start chatting?',
    answer:
      'Yes. Chatting is available after a quick, free signup — that is how your credits stay tied to you. Creating an account takes only a name, email and password.',
  },
  {
    question: 'What happens when I run out of credits?',
    answer:
      'When your balance reaches zero you can still browse the platform, but new conversations pause until your credits are topped up. Paid plans (coming soon) will add a monthly credit allowance.',
  },
  {
    question: 'Do payments work right now?',
    answer:
      'Not yet. This version has no payment integration — only the Free plan is active. Paid plans are shown as future-ready product structure so pricing is ready when billing goes live.',
  },
  {
    question: 'Is Aion AI affiliated with OpenAI, Google or other providers?',
    answer:
      'No. Aion AI is an independent platform. Model names are referenced descriptively only — Aion AI is not affiliated with, sponsored by, or endorsed by these companies.',
  },
];

export default pricingPlans;
