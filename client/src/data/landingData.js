/**
 * Static content for the landing page sections.
 * Aion AI — one platform for chatting with every leading AI model,
 * coordinated by the Aion Mind master agent.
 */
import {
  Layers,
  Brain,
  Coins,
  ShieldCheck,
  SlidersHorizontal,
  MonitorSmartphone,
  UserPlus,
  Gift,
  Bot,
  Sparkles,
  ReceiptText,
  Telescope,
  PenLine,
  Code2,
  GraduationCap,
  Briefcase,
  Zap,
} from 'lucide-react';

/** Features section — 6 cards. */
export const features = [
  {
    icon: Layers,
    title: 'Every model, one place',
    text: 'Switch between ChatGPT, Claude, Gemini, Grok and more — no juggling tabs, logins or separate subscriptions.',
  },
  {
    icon: Brain,
    title: 'Aion Mind master agent',
    text: 'A flagship agent that routes each request to the right models and merges their answers into one.',
  },
  {
    icon: Coins,
    title: 'One credit balance',
    text: 'A single credit balance works across every AI. New accounts start with 25 free credits.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure authentication',
    text: 'Accounts are protected with JWT, httpOnly cookies, bcrypt password hashing and backend validation.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Admin control center',
    text: 'Manage users, credits, account status and transaction history from a protected admin panel.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive premium UI',
    text: 'A polished chat experience that feels right across desktop, laptop, tablet and mobile.',
  },
];

/** How It Works — 4 steps. */
export const howItWorksSteps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create your account',
    text: 'Sign up with your name, email and password to unlock the Aion AI workspace.',
  },
  {
    step: '02',
    icon: Gift,
    title: 'Get 25 free credits',
    text: 'Every new account starts with 25 credits, recorded safely inside the database.',
  },
  {
    step: '03',
    icon: Bot,
    title: 'Pick an AI — or ask Aion Mind',
    text: 'Chat with any model directly, or let Aion Mind choose and coordinate the best ones for you.',
  },
  {
    step: '04',
    icon: Sparkles,
    title: 'Chat, research and create',
    text: 'Write, code, learn and solve problems — all from a single conversation.',
  },
];

/** Credits section — 3 highlight cards + a closing note. */
export const creditHighlights = [
  {
    icon: Gift,
    title: '25 free credits',
    text: 'Every new account starts with 25 credits, ready to use right away.',
  },
  {
    icon: Layers,
    title: 'One balance, every AI',
    text: 'The same credits work across ChatGPT, Claude, Gemini, Aion Mind and the rest.',
  },
  {
    icon: ReceiptText,
    title: 'Tracked transactions',
    text: 'Every credit change is stored with its reason, amount, balance and timestamp.',
  },
];

export const creditFutureNote =
  'Each AI conversation can draw from this balance — and admins can top up any account from the panel at any time.';

/** Use Cases section — 6 cards (each with a designed topical visual). */
export const useCases = [
  {
    icon: Telescope,
    title: 'Research & analysis',
    text: 'Pull together sourced research, compare viewpoints and turn dense material into clear summaries.',
    variant: 'research',
    accent: 'aurora',
  },
  {
    icon: PenLine,
    title: 'Writing & content',
    text: 'Draft, edit and polish anything from emails to long-form content, with the right model for each voice.',
    variant: 'writing',
    accent: 'ember',
  },
  {
    icon: Code2,
    title: 'Coding & development',
    text: 'Generate, explain and debug code faster — and ask several models when one gets stuck.',
    variant: 'coding',
    accent: 'royal',
  },
  {
    icon: GraduationCap,
    title: 'Learning & study',
    text: 'Break down hard topics, get step-by-step explanations and study with a patient AI tutor.',
    variant: 'learning',
    accent: 'cyan',
  },
  {
    icon: Briefcase,
    title: 'Business & strategy',
    text: 'Pressure-test ideas, draft plans and explore strategy with multiple AI perspectives at once.',
    variant: 'business',
    accent: 'gold',
  },
  {
    icon: Zap,
    title: 'Everyday productivity',
    text: 'Plan your day, summarise long threads and knock out small tasks without switching apps.',
    variant: 'productivity',
    accent: 'mint',
  },
];

/** Testimonials section — 3 placeholder quotes. */
export const testimonials = [
  {
    name: 'Aria Mehta',
    role: 'Content Strategist',
    initials: 'AM',
    text: 'Having ChatGPT, Claude and Gemini in one place — with Aion Mind picking between them — completely changed how fast my team ships.',
  },
  {
    name: 'Kabir Anand',
    role: 'Software Engineer',
    initials: 'KA',
    text: 'I cancelled three separate AI subscriptions. One platform, one balance, every model I actually use.',
  },
  {
    name: 'Naina Kapoor',
    role: 'Product Manager',
    initials: 'NK',
    text: 'Aion Mind is the part that surprised me — it genuinely blends models into a sharper answer than any single one gives.',
  },
];

/** Small trust stats shown in the hero. */
export const heroStats = [
  { value: '7+', label: 'AI models' },
  { value: '1', label: 'Master agent' },
  { value: '25', label: 'Free credits' },
];

/** What Aion Mind does — used in the spotlight section. */
export const aionMindCapabilities = [
  'Reads your intent and picks the best-suited models',
  'Coordinates several AIs on a single request',
  'Merges their strengths into one clear answer',
  'Falls back gracefully when one model is unsure',
];
