/**
 * Gallery data for Aion AI.
 *
 * - cardGradients / getCardGradient : shared CSS-gradient presets
 * - promptGallery : example prompts paired with the AI that answers them
 *   (powers the /gallery "prompt gallery" page)
 */

/** Layered gradient presets, keyed by tone. */
export const cardGradients = {
  gold: 'radial-gradient(circle at 22% 18%, rgba(214,181,109,0.55), transparent 58%), radial-gradient(circle at 82% 88%, rgba(139,92,246,0.32), transparent 55%), linear-gradient(160deg, #14110a, #050505)',
  violet: 'radial-gradient(circle at 70% 18%, rgba(139,92,246,0.6), transparent 58%), radial-gradient(circle at 20% 85%, rgba(59,130,246,0.3), transparent 55%), linear-gradient(160deg, #0e0a1c, #050505)',
  cyan: 'radial-gradient(circle at 28% 24%, rgba(34,211,238,0.5), transparent 58%), radial-gradient(circle at 80% 82%, rgba(59,130,246,0.38), transparent 55%), linear-gradient(160deg, #07131a, #050505)',
  blue: 'radial-gradient(circle at 24% 80%, rgba(59,130,246,0.52), transparent 58%), radial-gradient(circle at 80% 16%, rgba(34,211,238,0.28), transparent 55%), linear-gradient(160deg, #080f1e, #050505)',
  aurora: 'radial-gradient(circle at 20% 16%, rgba(139,92,246,0.52), transparent 55%), radial-gradient(circle at 85% 82%, rgba(34,211,238,0.42), transparent 55%), linear-gradient(160deg, #0c0a1a, #050505)',
  ember: 'radial-gradient(circle at 80% 78%, rgba(214,181,109,0.5), transparent 56%), radial-gradient(circle at 18% 22%, rgba(244,114,182,0.24), transparent 55%), linear-gradient(160deg, #160f0c, #050505)',
  mint: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.42), transparent 56%), radial-gradient(circle at 78% 80%, rgba(139,92,246,0.36), transparent 55%), linear-gradient(160deg, #09131a, #050505)',
  royal: 'radial-gradient(circle at 50% 18%, rgba(99,102,241,0.5), transparent 56%), radial-gradient(circle at 82% 90%, rgba(214,181,109,0.26), transparent 55%), linear-gradient(160deg, #0b0a1a, #050505)',
};

/** Safe gradient lookup with a sensible fallback. */
export const getCardGradient = (tone) => cardGradients[tone] || cardGradients.aurora;

/** Filter chips for the /gallery prompt gallery page. */
export const promptCategories = [
  'All',
  'Writing',
  'Coding',
  'Research',
  'Learning',
  'Everyday',
  'Aion Mind',
];

/**
 * Example prompts paired with the AI that handles them.
 * `agentId` matches an id in botsData.js (bots + aionMind).
 */
export const promptGallery = [
  {
    id: 'p1',
    category: 'Writing',
    agentId: 'claude',
    prompt: 'Rewrite this paragraph to sound more confident and concise.',
    reply: 'Here are three tightened versions — each keeps your meaning but trims the hedging and sharpens the verbs.',
  },
  {
    id: 'p2',
    category: 'Writing',
    agentId: 'claude',
    prompt: 'Draft a warm but professional out-of-office reply.',
    reply: 'Done — a friendly two-line message with your return date and an alternate contact to reach.',
  },
  {
    id: 'p3',
    category: 'Coding',
    agentId: 'copilot',
    prompt: 'Why does this React component re-render on every keystroke?',
    reply: 'The input state lives in the parent — lift it down or memoise the child. Here is the corrected version.',
  },
  {
    id: 'p4',
    category: 'Coding',
    agentId: 'copilot',
    prompt: 'Refactor this function to be cleaner and easier to test.',
    reply: 'I split it into three small, pure functions with clear names — each is now testable in isolation.',
  },
  {
    id: 'p5',
    category: 'Research',
    agentId: 'perplexity',
    prompt: 'Summarise current thinking on remote-work productivity, with sources.',
    reply: 'Three consistent findings emerge across recent studies — each is summarised with a citation below.',
  },
  {
    id: 'p6',
    category: 'Research',
    agentId: 'grok',
    prompt: 'What are the biggest tech stories from this week?',
    reply: 'Here are the five stories worth knowing, newest first, each in a single clear line.',
  },
  {
    id: 'p7',
    category: 'Learning',
    agentId: 'gemini',
    prompt: 'Explain how JWT authentication works, simply.',
    reply: 'Think of a JWT as a signed wristband — the server trusts the signature instead of re-asking who you are.',
  },
  {
    id: 'p8',
    category: 'Learning',
    agentId: 'deepseek',
    prompt: 'Walk me through this probability problem, step by step.',
    reply: 'First we define the sample space, then work each event in order — here is the full reasoning.',
  },
  {
    id: 'p9',
    category: 'Everyday',
    agentId: 'chatgpt',
    prompt: 'Plan a simple 3-day weekend itinerary for Jaipur.',
    reply: 'Day 1 covers the old city, Day 2 the palaces and forts, Day 3 markets and a relaxed finish.',
  },
  {
    id: 'p10',
    category: 'Everyday',
    agentId: 'chatgpt',
    prompt: 'Turn these rough notes into a clean to-do list.',
    reply: 'Grouped into Today, This week and Later — with the two urgent items pulled to the top.',
  },
  {
    id: 'p11',
    category: 'Aion Mind',
    agentId: 'aion-mind',
    prompt: 'Draft a product launch email, then make it punchier.',
    reply: 'I drafted with ChatGPT, then had Claude tighten the tone — the sharper final version is ready.',
  },
  {
    id: 'p12',
    category: 'Aion Mind',
    agentId: 'aion-mind',
    prompt: 'Compare two approaches and recommend one for a beginner.',
    reply: 'I weighed both with several models and picked the one with the gentler learning curve — here is why.',
  },
];

export default promptGallery;
