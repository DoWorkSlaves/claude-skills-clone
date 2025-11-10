/**
 * Real Skills Data from Anthropic's Official Repository
 * Source: https://github.com/anthropics/skills
 */

export interface SkillData {
  id: string;
  name: string;
  description: string;
  categories: string[];
  downloads?: number;
  icon?: string;
  featured?: boolean;
  author: string;
  license: string;
  stars: number;
  forks: number;
  repository?: string;
  tags?: string[];
  installCommand?: string;
  // Detail page fields
  whatIsIt?: string;
  howToUse?: string;
  keyFeatures?: string[];
  version?: string;
  lastUpdate?: string;
}

export const skills: SkillData[] = [
  // Creative & Design Skills
  {
    id: 'algorithmic-art',
    name: 'Algorithmic Art',
    description: 'Create generative art using p5.js with seeded randomness, flow fields, and particle systems',
    categories: ['Creative', 'Dev'],
    downloads: 1250,
    icon: 'A',
    featured: true,
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['p5.js', 'generative', 'art', 'creative'],
    installCommand: 'claude-skill install algorithmic-art',
    version: '1.0.0',
    lastUpdate: '2025-01-15',
    whatIsIt: 'Algorithmic Art enables creating living, breathing algorithms that produce unique artwork on each run. This skill emphasizes algorithmic philosophy as an aesthetic movement rather than purely technical implementation, allowing you to explore generative art concepts through code.',
    howToUse: 'Start by writing a 4-6 paragraph manifesto for a generative art movement, then implement your philosophy via p5.js with seeded randomness for reproducibility. The skill provides interactive parameter controls with real-time sliders for exploring different variations.',
    keyFeatures: [
      'Algorithmic philosophy creation',
      'Seeded randomness following Art Blocks patterns',
      'Interactive parameter controls with real-time sliders',
      'Seed navigation buttons',
      'Professional viewer template with Anthropic branding',
      'Single-file self-contained HTML artifacts',
      'Master-level craftsmanship emphasis',
    ],
  },
  {
    id: 'canvas-design',
    name: 'Canvas Design',
    description: 'Design beautiful visual art in PNG and PDF formats using professional design philosophies',
    categories: ['Creative', 'Design'],
    downloads: 1100,
    icon: 'C',
    featured: true,
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['design', 'visual', 'png', 'pdf'],
    installCommand: 'claude-skill install canvas-design',
    version: '1.2.0',
    lastUpdate: '2025-01-10',
    whatIsIt: 'Canvas Design is a powerful skill for creating professional visual designs using code. It combines artistic principles with technical precision to generate high-quality graphics in both raster (PNG) and vector (PDF) formats.',
    howToUse: 'Describe your design concept or provide specific requirements. The skill will apply professional design philosophies to create polished visuals. You can request iterations and refinements to achieve your desired aesthetic.',
    keyFeatures: [
      'Multiple output formats (PNG, PDF)',
      'Professional design principles',
      'Color theory application',
      'Typography expertise',
      'Layout and composition tools',
      'High-resolution output',
      'Customizable dimensions',
    ],
  },
  {
    id: 'slack-gif-creator',
    name: 'Slack GIF Creator',
    description: 'Create animated GIFs optimized for Slack\'s size constraints and file requirements',
    categories: ['Creative', 'Communication'],
    downloads: 650,
    icon: 'S',
    featured: true,
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['gif', 'slack', 'animation', 'communication'],
    installCommand: 'claude-skill install slack-gif-creator',
  },

  // Development & Technical Skills
  {
    id: 'artifacts-builder',
    name: 'Artifacts Builder',
    description: 'Build complex claude.ai HTML artifacts using React, Tailwind CSS, and shadcn/ui components',
    categories: ['Dev'],
    downloads: 2100,
    icon: 'A',
    featured: true,
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['react', 'tailwind', 'shadcn', 'html', 'artifacts'],
    installCommand: 'claude-skill install artifacts-builder',
  },
  {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Comprehensive guide for creating high-quality MCP servers to integrate external APIs and services',
    categories: ['Dev'],
    downloads: 1800,
    icon: 'M',
    featured: true,
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['mcp', 'api', 'integration', 'server'],
    installCommand: 'claude-skill install mcp-builder',
  },
  {
    id: 'webapp-testing',
    name: 'Web App Testing',
    description: 'Test local web applications using Playwright for UI verification, debugging, and automated testing',
    categories: ['Dev'],
    downloads: 1350,
    icon: 'W',
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['testing', 'playwright', 'ui', 'automation'],
    installCommand: 'claude-skill install webapp-testing',
  },

  // Enterprise & Communication Skills
  {
    id: 'brand-guidelines',
    name: 'Brand Guidelines',
    description: 'Apply Anthropic\'s official brand colors and typography to artifacts and design work',
    categories: ['Design'],
    downloads: 890,
    icon: 'B',
    featured: true,
    author: 'Anthropic',
    license: 'Proprietary',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['branding', 'design', 'typography', 'colors'],
    installCommand: 'claude-skill install brand-guidelines',
  },
  {
    id: 'internal-comms',
    name: 'Internal Communications',
    description: 'Write effective internal communications like status reports, newsletters, FAQs, and organizational documents',
    categories: ['Communication', 'Productivity'],
    downloads: 920,
    icon: 'I',
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['communication', 'writing', 'reports', 'newsletters'],
    installCommand: 'claude-skill install internal-comms',
  },
  {
    id: 'theme-factory',
    name: 'Theme Factory',
    description: 'Style artifacts with 10 pre-set professional themes or generate custom color and typography themes',
    categories: ['Design', 'Dev'],
    downloads: 540,
    icon: 'T',
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['themes', 'styling', 'colors', 'typography'],
    installCommand: 'claude-skill install theme-factory',
  },

  // Document Skills
  {
    id: 'pdf-processor',
    name: 'PDF Processor',
    description: 'Extract text and tables, merge and split documents, handle forms, and manipulate PDF files',
    categories: ['Office', 'Productivity'],
    downloads: 2500,
    icon: 'P',
    author: 'Anthropic',
    license: 'Source Available',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['pdf', 'documents', 'extraction', 'merge'],
    installCommand: 'claude-skill install document-skills/pdf',
  },
  {
    id: 'docx-processor',
    name: 'Word Document Processor',
    description: 'Create, edit, and analyze Word documents with support for tracked changes and formatting',
    categories: ['Office', 'Productivity'],
    downloads: 2200,
    icon: 'W',
    author: 'Anthropic',
    license: 'Source Available',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['word', 'docx', 'documents', 'editing'],
    installCommand: 'claude-skill install document-skills/docx',
  },
  {
    id: 'pptx-processor',
    name: 'PowerPoint Processor',
    description: 'Create and edit PowerPoint presentations with layouts, speaker notes, and professional formatting',
    categories: ['Office', 'Productivity'],
    downloads: 1900,
    icon: 'P',
    author: 'Anthropic',
    license: 'Source Available',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['powerpoint', 'pptx', 'presentations', 'slides'],
    installCommand: 'claude-skill install document-skills/pptx',
  },
  {
    id: 'xlsx-processor',
    name: 'Excel Spreadsheet Processor',
    description: 'Create, edit, and analyze Excel spreadsheets with formulas, charts, and data manipulation',
    categories: ['Office', 'Productivity'],
    downloads: 2400,
    icon: 'E',
    author: 'Anthropic',
    license: 'Source Available',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['excel', 'xlsx', 'spreadsheet', 'data'],
    installCommand: 'claude-skill install document-skills/xlsx',
  },

  // Meta Skills
  {
    id: 'skill-creator',
    name: 'Skill Creator',
    description: 'Comprehensive guide for creating effective skills that extend Claude\'s capabilities and improve performance',
    categories: ['Dev', 'Meta'],
    downloads: 780,
    icon: 'S',
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['meta', 'creation', 'guide', 'tutorial'],
    installCommand: 'claude-skill install skill-creator',
  },
  {
    id: 'template-skill',
    name: 'Template Skill',
    description: 'Basic template for starting new skill development with best practices and structure',
    categories: ['Dev', 'Meta'],
    downloads: 450,
    icon: 'T',
    author: 'Anthropic',
    license: 'Apache-2.0',
    stars: 5300,
    forks: 408,
    repository: 'https://github.com/anthropics/skills',
    tags: ['template', 'starter', 'boilerplate'],
    installCommand: 'claude-skill install template-skill',
  },
];

// Helper functions
export const getFeaturedSkills = () => skills.filter((skill) => skill.featured);
export const getLatestSkills = () => [...skills].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
export const getSkillsByCategory = (category: string) =>
  skills.filter((skill) => skill.categories.includes(category));

export const getAllCategories = () => {
  const categories = new Set<string>();
  skills.forEach((skill) => skill.categories.forEach((cat) => categories.add(cat)));
  return Array.from(categories).sort();
};

export const searchSkills = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowercaseQuery) ||
      skill.description.toLowerCase().includes(lowercaseQuery) ||
      skill.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      skill.categories.some((cat) => cat.toLowerCase().includes(lowercaseQuery))
  );
};

export const getSkillById = (id: string) => skills.find((skill) => skill.id === id);
