/**
 * The AI roster for Aion AI.
 *
 * Aion AI is a single platform for chatting with multiple leading AI
 * models, coordinated by "Aion Mind" — a master agent.
 *
 * NOTE: third-party model names are referenced descriptively. Aion AI
 * uses its own original avatars (never the vendors' logos) and is not
 * affiliated with or endorsed by these companies.
 *
 * `image` values are free-license placeholder photos (Lorem Picsum).
 * Swap them for your own files in client/public/images/ — see the
 * README in that folder.
 */
import {
  Brain,
  MessageSquare,
  PenLine,
  Gem,
  Zap,
  Telescope,
  Cpu,
  Code2,
} from 'lucide-react';

/** The flagship master agent — orchestrates every other model. */
export const aionMind = {
  id: 'aion-mind',
  name: 'Aion Mind',
  vendor: 'Aion AI',
  category: 'Master Agent',
  tagline: 'The master agent that orchestrates every model',
  description:
    'Aion Mind sits at the centre of the platform. It reads your intent, routes the work to the best models, and merges their strengths into one clear, reliable answer.',
  accent: 'gold',
  icon: Brain,
  glyph: 'AM',
  image: 'https://picsum.photos/seed/aionai-mind/640/360',
  featured: true,
};

/** The third-party models available inside the platform. */
export const bots = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    category: 'Versatile',
    tagline: 'Versatile everyday reasoning',
    description:
      'A dependable generalist for everyday questions, drafting, brainstorming and step-by-step reasoning across almost any topic.',
    accent: 'mint',
    icon: MessageSquare,
    glyph: 'GPT',
    image: 'https://picsum.photos/seed/aionai-chatgpt/640/360',
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    category: 'Writing',
    tagline: 'Thoughtful writing & analysis',
    description:
      'Tuned for long-form writing, careful analysis and nuanced, well-structured responses that keep their context.',
    accent: 'ember',
    icon: PenLine,
    glyph: 'Cl',
    image: 'https://picsum.photos/seed/aionai-claude/640/360',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    category: 'Multimodal',
    tagline: 'Broad, multimodal understanding',
    description:
      'Strong across broad general knowledge and structured tasks, with a fluid, multimodal way of working through ideas.',
    accent: 'blue',
    icon: Gem,
    glyph: 'Ge',
    image: 'https://picsum.photos/seed/aionai-gemini/640/360',
  },
  {
    id: 'grok',
    name: 'Grok',
    vendor: 'xAI',
    category: 'Realtime',
    tagline: 'Real-time, current answers',
    description:
      'Built for up-to-the-minute, current-events answers delivered in a direct, conversational style.',
    accent: 'cyan',
    icon: Zap,
    glyph: 'Gr',
    image: 'https://picsum.photos/seed/aionai-grok/640/360',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    vendor: 'Perplexity',
    category: 'Research',
    tagline: 'Sourced research & search',
    description:
      'A research-first assistant focused on sourced, search-grounded answers you can trace and trust.',
    accent: 'aurora',
    icon: Telescope,
    glyph: 'Px',
    image: 'https://picsum.photos/seed/aionai-perplexity/640/360',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    vendor: 'DeepSeek',
    category: 'Reasoning',
    tagline: 'Deep reasoning & problem solving',
    description:
      'Specialised in deep reasoning, mathematics and complex, multi-step problem solving.',
    accent: 'violet',
    icon: Cpu,
    glyph: 'Ds',
    image: 'https://picsum.photos/seed/aionai-deepseek/640/360',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    vendor: 'Microsoft',
    category: 'Coding',
    tagline: 'Code generation & productivity',
    description:
      'A coding-focused companion for writing, explaining and debugging software faster.',
    accent: 'royal',
    icon: Code2,
    glyph: 'Co',
    image: 'https://picsum.photos/seed/aionai-copilot/640/360',
  },
];

/** Aion Mind first, then the rest — used by the agents directory. */
export const allAgents = [aionMind, ...bots];

/** Quick id → agent lookup. */
export const agentsById = allAgents.reduce((map, agent) => {
  map[agent.id] = agent;
  return map;
}, {});

/** Filter chips for the "Explore AI Agents" page. */
export const agentCategories = [
  'All',
  'Master Agent',
  'Versatile',
  'Writing',
  'Multimodal',
  'Realtime',
  'Research',
  'Reasoning',
  'Coding',
];

export default bots;
