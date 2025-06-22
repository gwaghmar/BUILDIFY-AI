export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  estimatedTokens: number;
  source?: string;
  stars?: number;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'Professional landing pages for businesses and startups',
    icon: '🏠'
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    description: 'Admin panels and analytics dashboards',
    icon: '📊'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online stores and shopping experiences',
    icon: '🛒'
  },
  {
    id: 'components',
    name: 'Components',
    description: 'Reusable UI components and libraries',
    icon: '🧩'
  },
  {
    id: 'starters',
    name: 'Starters',
    description: 'Project starters and boilerplates',
    icon: '🚀'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools and productivity applications',
    icon: '⚡'
  },
  {
    id: 'gui-apps',
    name: 'GUI Applications',
    description: 'Desktop applications with modern UI',
    icon: '🖥️'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Social platforms and communication apps',
    icon: '📱'
  },
  {
    id: 'content-management',
    name: 'Content Management',
    description: 'Blogs, CMS, and content platforms',
    icon: '📝'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Games and entertainment applications',
    icon: '🎮'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business and professional applications',
    icon: '💼'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning and educational platforms',
    icon: '📚'
  },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    description: 'Health tracking and fitness applications',
    icon: '💪'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial and budgeting applications',
    icon: '💰'
  },
  {
    id: 'travel-location',
    name: 'Travel & Location',
    description: 'Travel planning and location-based apps',
    icon: '✈️'
  }
];

export const APP_TEMPLATES: AppTemplate[] = [
  // Landing Pages
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    description: 'Modern SaaS landing page with hero, features, pricing, and CTA sections',
    category: 'landing-pages',
    prompt: 'Create a modern SaaS landing page with hero section, feature highlights, pricing table, testimonials, and call-to-action. Use HeroUI components for a beautiful, professional design.',
    estimatedTokens: 300,
    source: 'https://github.com/heroui-inc/heroui.git',
    stars: 24600,
    tags: ['hero', 'pricing', 'features', 'cta'],
    difficulty: 'intermediate'
  },
  {
    id: 'saas-landingpage',
    name: 'SaaS Landing Page (Next.js)',
    description: 'Complete SaaS landing page with modern design and animations',
    category: 'landing-pages',
    prompt: 'Build a complete SaaS landing page with modern design, smooth animations, feature sections, pricing plans, testimonials, and contact forms. Use Next.js and Tailwind CSS.',
    estimatedTokens: 350,
    source: 'https://github.com/saaslandingpage/saaslandingpage',
    tags: ['saas', 'nextjs', 'tailwind', 'animations'],
    difficulty: 'intermediate'
  },
  {
    id: 'nextjs-boilerplate',
    name: 'Next.js Landing Page Boilerplate',
    description: 'SEO-friendly, PWA-ready Next.js boilerplate with best practices',
    category: 'landing-pages',
    prompt: 'Create a Next.js landing page boilerplate with SEO optimization, PWA support, TypeScript, and best practices for scalable web apps.',
    estimatedTokens: 200,
    source: 'https://github.com/ixartz/Next-js-Boilerplate',
    stars: 2000,
    tags: ['boilerplate', 'seo', 'pwa', 'typescript', 'nextjs'],
    difficulty: 'intermediate'
  },
  {
    id: 'tailwind-landing',
    name: 'Tailwind CSS Landing Page Template',
    description: 'Beautiful landing page template with Tailwind CSS',
    category: 'landing-pages',
    prompt: 'Create a beautiful landing page template using Tailwind CSS with modern design, responsive layout, and smooth animations.',
    estimatedTokens: 250,
    source: 'https://github.com/cruip/tailwind-landing-page-template',
    tags: ['tailwind', 'landing', 'responsive', 'animations'],
    difficulty: 'beginner'
  },
  {
    id: 'react-landing',
    name: 'React Landing Page Template',
    description: 'Modern React landing page with clean design',
    category: 'landing-pages',
    prompt: 'Build a modern React landing page with clean design, smooth scrolling, and interactive components.',
    estimatedTokens: 220,
    source: 'https://github.com/issaafalkattan/React-Landing-Page-Template',
    tags: ['react', 'landing', 'clean', 'interactive'],
    difficulty: 'beginner'
  },
  {
    id: 'astro-landing',
    name: 'Astro Landing Page',
    description: 'Fast, modern landing page with Astro framework',
    category: 'landing-pages',
    prompt: 'Create a fast, modern landing page using Astro framework with excellent performance and SEO.',
    estimatedTokens: 200,
    source: 'https://github.com/withastro/astro/tree/main/examples/landing-page',
    tags: ['astro', 'performance', 'seo', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'bootstrap-landing',
    name: 'Bootstrap Landing Page Template',
    description: 'Responsive landing page with Bootstrap framework',
    category: 'landing-pages',
    prompt: 'Build a responsive landing page using Bootstrap with modern components and mobile-first design.',
    estimatedTokens: 180,
    source: 'https://github.com/StartBootstrap/startbootstrap-landing-page',
    tags: ['bootstrap', 'responsive', 'mobile-first'],
    difficulty: 'beginner'
  },
  {
    id: 'gatsby-landing',
    name: 'Gatsby Landing Page Starter',
    description: 'Static landing page with Gatsby and GraphQL',
    category: 'landing-pages',
    prompt: 'Create a static landing page using Gatsby with GraphQL data layer and optimized performance.',
    estimatedTokens: 220,
    source: 'https://github.com/paulmorales7/gatsby-landing-page-starter',
    tags: ['gatsby', 'static', 'graphql', 'performance'],
    difficulty: 'intermediate'
  },
  {
    id: 'vue-landing',
    name: 'Vue.js Landing Page',
    description: 'Modern landing page with Vue.js framework',
    category: 'landing-pages',
    prompt: 'Build a modern landing page using Vue.js with reactive components and smooth transitions.',
    estimatedTokens: 200,
    source: 'https://github.com/safak/youtube/tree/landing-page',
    tags: ['vue', 'reactive', 'transitions', 'modern'],
    difficulty: 'intermediate'
  },

  // Dashboards
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    description: 'Complete admin panel with sidebar navigation and data tables',
    category: 'dashboards',
    prompt: 'Build an admin dashboard with sidebar navigation, data tables, charts, user management, and settings panel. Use Material-UI components.',
    estimatedTokens: 400,
    source: 'https://github.com/devias-io/material-kit-react',
    stars: 5500,
    tags: ['admin', 'navigation', 'tables', 'charts'],
    difficulty: 'advanced'
  },
  {
    id: 'next-saas-dashboard',
    name: 'Next.js SaaS Starter Dashboard',
    description: 'Complete SaaS dashboard with authentication and billing',
    category: 'dashboards',
    prompt: 'Create a complete SaaS dashboard with user authentication, billing integration, user management, and analytics. Use Next.js and modern UI.',
    estimatedTokens: 450,
    source: 'https://github.com/Blazity/next-saas-starter',
    tags: ['saas', 'authentication', 'billing', 'analytics'],
    difficulty: 'advanced'
  },
  {
    id: 'tailwind-dashboard',
    name: 'Tailwind CSS Dashboard Template',
    description: 'Modern dashboard with Tailwind CSS styling',
    category: 'dashboards',
    prompt: 'Build a modern dashboard using Tailwind CSS with clean design, responsive layout, and interactive components.',
    estimatedTokens: 300,
    source: 'https://github.com/tailwindlabs/tailwindcss-dashboard-template',
    tags: ['tailwind', 'dashboard', 'responsive', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'shadcn-dashboard',
    name: 'ShadCN UI Dashboard',
    description: 'High-quality dashboard with ShadCN UI components',
    category: 'dashboards',
    prompt: 'Create a high-quality dashboard using ShadCN UI components with Radix UI primitives and Tailwind CSS.',
    estimatedTokens: 320,
    source: 'https://github.com/shadcn-ui/ui',
    stars: 35000,
    tags: ['shadcn', 'radix', 'tailwind', 'components'],
    difficulty: 'intermediate'
  },
  {
    id: 'mantine-dashboard',
    name: 'Mantine Admin Dashboard',
    description: 'Professional admin dashboard with Mantine UI',
    category: 'dashboards',
    prompt: 'Build a professional admin dashboard using Mantine UI with modern design and comprehensive features.',
    estimatedTokens: 350,
    source: 'https://github.com/mantinedev/mantine-admin',
    tags: ['mantine', 'admin', 'professional', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'vue-black-dashboard',
    name: 'Vue Black Dashboard',
    description: 'Dark-themed Vue.js admin dashboard',
    category: 'dashboards',
    prompt: 'Create a dark-themed admin dashboard using Vue.js with modern design and comprehensive admin features.',
    estimatedTokens: 300,
    source: 'https://github.com/creativetimofficial/vue-black-dashboard',
    tags: ['vue', 'dark-theme', 'admin', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'adminlte',
    name: 'AdminLTE Dashboard',
    description: 'Bootstrap-based admin panel template',
    category: 'dashboards',
    prompt: 'Build a comprehensive admin panel using Bootstrap with sidebar navigation, data tables, and admin features.',
    estimatedTokens: 280,
    source: 'https://github.com/ColorlibHQ/AdminLTE',
    tags: ['bootstrap', 'admin', 'sidebar', 'tables'],
    difficulty: 'beginner'
  },
  {
    id: 'next-auth-dashboard',
    name: 'Next.js + Prisma Dashboard',
    description: 'Dashboard with authentication and database integration',
    category: 'dashboards',
    prompt: 'Create a dashboard with Next.js, Prisma ORM, and authentication system. Include user management and data visualization.',
    estimatedTokens: 400,
    source: 'https://github.com/nextauthjs/next-auth-typescript-example',
    tags: ['nextjs', 'prisma', 'authentication', 'database'],
    difficulty: 'advanced'
  },
  {
    id: 'nivo-dashboard',
    name: 'Nivo Data Visualization Dashboard',
    description: 'Dashboard with D3.js data visualization using Nivo',
    category: 'dashboards',
    prompt: 'Build a dashboard with rich data visualization using Nivo (D3.js) charts and graphs. Include interactive charts and analytics.',
    estimatedTokens: 350,
    source: 'https://github.com/plouc/nivo',
    tags: ['nivo', 'd3', 'charts', 'analytics'],
    difficulty: 'advanced'
  },
  {
    id: 'tailwind-admin-dashboard',
    name: 'Next.js + Tailwind Admin Dashboard',
    description: 'Modern admin dashboard with Next.js and Tailwind',
    category: 'dashboards',
    prompt: 'Create a modern admin dashboard using Next.js and Tailwind CSS with clean design and comprehensive admin features.',
    estimatedTokens: 320,
    source: 'https://github.com/Kamona-WD/tailwind-admin-dashboard',
    tags: ['nextjs', 'tailwind', 'admin', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'apitable-dashboard',
    name: 'APITable Spreadsheet Dashboard',
    description: 'Spreadsheet-like dashboard with collaborative features',
    category: 'dashboards',
    prompt: 'Build a spreadsheet-like dashboard with collaborative features, real-time editing, and data management capabilities.',
    estimatedTokens: 500,
    source: 'https://github.com/apitable/apitable',
    tags: ['spreadsheet', 'collaborative', 'real-time', 'data'],
    difficulty: 'advanced'
  },
  {
    id: 'appsmith-dashboard',
    name: 'Appsmith Low-Code Dashboard',
    description: 'Low-code dashboard builder for rapid development',
    category: 'dashboards',
    prompt: 'Create a low-code dashboard builder that allows users to create custom dashboards with drag-and-drop interface.',
    estimatedTokens: 600,
    source: 'https://github.com/appsmithorg/appsmith',
    tags: ['low-code', 'drag-drop', 'customizable', 'builder'],
    difficulty: 'advanced'
  },

  // Components
  {
    id: 'ui-components',
    name: 'UI Component Library',
    description: 'Collection of reusable UI components with HeroUI',
    category: 'components',
    prompt: 'Build a collection of reusable UI components including buttons, forms, modals, and navigation. Use HeroUI design system.',
    estimatedTokens: 200,
    source: 'https://github.com/heroui-inc/heroui.git',
    stars: 24600,
    tags: ['components', 'ui', 'reusable'],
    difficulty: 'beginner'
  },
  {
    id: 'tailwind-ui-components',
    name: 'Tailwind UI Components',
    description: 'Professional UI components built with Tailwind CSS',
    category: 'components',
    prompt: 'Create professional UI components using Tailwind CSS with modern design and accessibility features.',
    estimatedTokens: 180,
    source: 'https://github.com/tailwindlabs/tailwindui-react',
    tags: ['tailwind', 'components', 'professional', 'accessible'],
    difficulty: 'intermediate'
  },
  {
    id: 'shadcn-components',
    name: 'ShadCN Components',
    description: 'High-quality components built with Radix UI and Tailwind',
    category: 'components',
    prompt: 'Create a set of high-quality components using ShadCN UI patterns with Radix UI primitives and Tailwind CSS styling.',
    estimatedTokens: 180,
    source: 'https://github.com/shadcn-ui/ui',
    stars: 35000,
    tags: ['shadcn', 'radix', 'tailwind'],
    difficulty: 'intermediate'
  },
  {
    id: 'chakra-ui-templates',
    name: 'Chakra UI Templates',
    description: 'Modern component templates with Chakra UI',
    category: 'components',
    prompt: 'Build modern component templates using Chakra UI with accessibility and responsive design.',
    estimatedTokens: 200,
    source: 'https://github.com/chakra-ui/chakra-ui-templates',
    tags: ['chakra', 'accessible', 'responsive', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'react-hook-form',
    name: 'React Hook Form Components',
    description: 'Form components with React Hook Form validation',
    category: 'components',
    prompt: 'Create form components using React Hook Form with validation, error handling, and modern styling.',
    estimatedTokens: 150,
    source: 'https://github.com/react-hook-form/react-hook-form',
    tags: ['forms', 'validation', 'react-hook-form'],
    difficulty: 'intermediate'
  },
  {
    id: 'nextjs-components',
    name: 'Next.js Components Library',
    description: 'Official Next.js component library',
    category: 'components',
    prompt: 'Build a component library specifically designed for Next.js applications with server-side rendering support.',
    estimatedTokens: 200,
    source: 'https://github.com/vercel/nextjs-components',
    tags: ['nextjs', 'ssr', 'components', 'vercel'],
    difficulty: 'intermediate'
  },
  {
    id: 'material-ui-templates',
    name: 'Material-UI Templates',
    description: 'Material Design component templates',
    category: 'components',
    prompt: 'Create Material Design component templates using Material-UI with consistent design language.',
    estimatedTokens: 180,
    source: 'https://github.com/mui/material-ui/tree/master/docs/src/pages/getting-started/templates',
    tags: ['material-ui', 'material-design', 'templates'],
    difficulty: 'intermediate'
  },
  {
    id: 'headless-ui',
    name: 'Headless UI Components',
    description: 'Unstyled, accessible UI components',
    category: 'components',
    prompt: 'Build unstyled, accessible UI components that can be styled with any CSS framework.',
    estimatedTokens: 160,
    source: 'https://github.com/tailwindlabs/headlessui',
    tags: ['headless', 'accessible', 'unstyled'],
    difficulty: 'intermediate'
  },
  {
    id: 'ant-design',
    name: 'Ant Design Components',
    description: 'Enterprise-level UI component library',
    category: 'components',
    prompt: 'Create enterprise-level UI components using Ant Design with comprehensive features and documentation.',
    estimatedTokens: 220,
    source: 'https://github.com/ant-design/ant-design',
    tags: ['ant-design', 'enterprise', 'comprehensive'],
    difficulty: 'intermediate'
  },
  {
    id: 'bootstrap-components',
    name: 'Bootstrap 5 Components',
    description: 'Modern Bootstrap 5 component library',
    category: 'components',
    prompt: 'Build modern UI components using Bootstrap 5 with responsive design and utility classes.',
    estimatedTokens: 180,
    source: 'https://github.com/twbs/bootstrap',
    tags: ['bootstrap', 'responsive', 'utility-classes'],
    difficulty: 'beginner'
  },
  {
    id: 'radix-primitives',
    name: 'Radix UI Primitives',
    description: 'Low-level UI primitives for building components',
    category: 'components',
    prompt: 'Create low-level UI primitives using Radix UI for building accessible and customizable components.',
    estimatedTokens: 150,
    source: 'https://github.com/radix-ui/primitives',
    tags: ['radix', 'primitives', 'accessible', 'low-level'],
    difficulty: 'advanced'
  },

  // GUI Applications
  {
    id: 'modern-tkinter',
    name: 'Modern Tkinter Themes',
    description: 'Modern-looking Tkinter applications with custom themes',
    category: 'gui-apps',
    prompt: 'Create a modern-looking desktop application using Tkinter with custom themes and contemporary design.',
    estimatedTokens: 200,
    source: 'https://github.com/RedFantom/ttkthemes',
    tags: ['tkinter', 'themes', 'desktop', 'modern'],
    difficulty: 'intermediate'
  },
  {
    id: 'pysimplegui',
    name: 'PySimpleGUI Application',
    description: 'Easy-to-use GUI framework for Python applications',
    category: 'gui-apps',
    prompt: 'Build a desktop application using PySimpleGUI with simple and intuitive user interface.',
    estimatedTokens: 180,
    source: 'https://github.com/PySimpleGUI/PySimpleGUI',
    tags: ['pysimplegui', 'python', 'desktop', 'simple'],
    difficulty: 'beginner'
  },
  {
    id: 'tkinter-designer',
    name: 'Tkinter Designer',
    description: 'Drag and drop UI designer for Tkinter applications',
    category: 'gui-apps',
    prompt: 'Create a drag-and-drop UI designer for Tkinter applications with visual interface building.',
    estimatedTokens: 300,
    source: 'https://github.com/ParthJadhav/Tkinter-Designer',
    tags: ['tkinter', 'designer', 'drag-drop', 'visual'],
    difficulty: 'advanced'
  },
  {
    id: 'customtkinter',
    name: 'CustomTkinter Application',
    description: 'Modern UI framework for Tkinter applications',
    category: 'gui-apps',
    prompt: 'Build a desktop application using CustomTkinter with modern UI components and styling.',
    estimatedTokens: 220,
    source: 'https://github.com/TomSchimansky/CustomTkinter',
    tags: ['customtkinter', 'modern', 'desktop', 'ui'],
    difficulty: 'intermediate'
  },
  {
    id: 'tkinter-login',
    name: 'Tkinter Login Application',
    description: 'Login system with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Create a login system with Tkinter GUI including user authentication and registration.',
    estimatedTokens: 150,
    source: 'https://github.com/python-engineer/tkinter-course/tree/main/login',
    tags: ['tkinter', 'login', 'authentication', 'gui'],
    difficulty: 'beginner'
  },
  {
    id: 'tkinter-dashboard',
    name: 'Tkinter Dashboard',
    description: 'Dashboard application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Build a dashboard application using Tkinter with data visualization and user interface.',
    estimatedTokens: 250,
    source: 'https://github.com/alejandro-du/Tkinter-Dashboard',
    tags: ['tkinter', 'dashboard', 'data', 'gui'],
    difficulty: 'intermediate'
  },
  {
    id: 'tkinter-calculator',
    name: 'Tkinter Calculator',
    description: 'Calculator application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Create a calculator application using Tkinter with mathematical operations and user interface.',
    estimatedTokens: 120,
    source: 'https://github.com/python-engineer/tkinter-calculator',
    tags: ['tkinter', 'calculator', 'math', 'gui'],
    difficulty: 'beginner'
  },
  {
    id: 'tkinter-todo',
    name: 'Tkinter Todo App',
    description: 'Todo list application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Build a todo list application using Tkinter with task management and user interface.',
    estimatedTokens: 150,
    source: 'https://github.com/python-engineer/tkinter-todo',
    tags: ['tkinter', 'todo', 'tasks', 'gui'],
    difficulty: 'beginner'
  },
  {
    id: 'tkinter-weather',
    name: 'Tkinter Weather App',
    description: 'Weather application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Create a weather application using Tkinter with weather data display and user interface.',
    estimatedTokens: 200,
    source: 'https://github.com/python-engineer/tkinter-weather',
    tags: ['tkinter', 'weather', 'api', 'gui'],
    difficulty: 'intermediate'
  },
  {
    id: 'tkinter-snake',
    name: 'Tkinter Snake Game',
    description: 'Snake game with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Build a snake game using Tkinter with game logic and user interface.',
    estimatedTokens: 180,
    source: 'https://github.com/python-engineer/tkinter-snake',
    tags: ['tkinter', 'game', 'snake', 'gui'],
    difficulty: 'intermediate'
  },
  {
    id: 'tkinter-paint',
    name: 'Tkinter Paint App',
    description: 'Paint application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Create a paint application using Tkinter with drawing tools and user interface.',
    estimatedTokens: 250,
    source: 'https://github.com/python-engineer/tkinter-paint',
    tags: ['tkinter', 'paint', 'drawing', 'gui'],
    difficulty: 'intermediate'
  },
  {
    id: 'tkinter-music-player',
    name: 'Tkinter Music Player',
    description: 'Music player application with Tkinter GUI',
    category: 'gui-apps',
    prompt: 'Build a music player application using Tkinter with audio playback and user interface.',
    estimatedTokens: 280,
    source: 'https://github.com/python-engineer/tkinter-music-player',
    tags: ['tkinter', 'music', 'audio', 'gui'],
    difficulty: 'intermediate'
  },

  // E-commerce
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Complete online store with product catalog and shopping cart',
    category: 'ecommerce',
    prompt: 'Create an e-commerce store with product catalog, shopping cart, checkout process, and user authentication. Use Vercel Commerce as reference.',
    estimatedTokens: 500,
    source: 'https://github.com/vercel/commerce',
    stars: 9100,
    tags: ['store', 'products', 'cart', 'checkout'],
    difficulty: 'advanced'
  },
  {
    id: 'saas-subscription',
    name: 'SaaS Subscription Payments',
    description: 'SaaS app with Stripe subscription payments, Supabase, and Next.js',
    category: 'ecommerce',
    prompt: 'Create a SaaS application with user authentication, Stripe subscription payments, and Supabase as the backend. Include a pricing page, user dashboard, and subscription management. Use Next.js best practices.',
    estimatedTokens: 500,
    source: 'https://github.com/vercel/nextjs-subscription-payments',
    stars: 7500,
    tags: ['saas', 'stripe', 'supabase', 'subscriptions', 'nextjs'],
    difficulty: 'advanced'
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog',
    description: 'Product listing with filters, search, and grid layout',
    category: 'ecommerce',
    prompt: 'Build a product catalog with grid layout, filters, search functionality, and product cards. Include pagination and sorting options.',
    estimatedTokens: 280,
    source: 'https://github.com/saleor/storefront',
    stars: 2400,
    tags: ['catalog', 'filters', 'search', 'grid'],
    difficulty: 'intermediate'
  },
  {
    id: 'product-detail',
    name: 'Product Detail Page',
    description: 'Detailed product page with images, description, and purchase options',
    category: 'ecommerce',
    prompt: 'Create a product detail page with image gallery, product information, variants, reviews, and add to cart functionality.',
    estimatedTokens: 250,
    tags: ['product', 'gallery', 'reviews', 'variants'],
    difficulty: 'intermediate'
  },

  // Starters
  {
    id: 'nextjs-starter',
    name: 'Next.js Starter',
    description: 'Clean Next.js starter with TypeScript and Tailwind',
    category: 'starters',
    prompt: 'Create a clean Next.js starter template with TypeScript, Tailwind CSS, and essential configurations. Include basic pages and components.',
    estimatedTokens: 150,
    source: 'https://github.com/theodorusclarence/ts-nextjs-tailwind-starter',
    tags: ['nextjs', 'typescript', 'tailwind'],
    difficulty: 'beginner'
  },
  {
    id: 'tailwind-nextjs-starter',
    name: 'Tailwind Next.js Starter',
    description: 'Clean, fast Next.js starter with Tailwind CSS and modern setup',
    category: 'starters',
    prompt: 'Create a Next.js starter project with Tailwind CSS, optimized performance, and a clean codebase. Include example pages and components.',
    estimatedTokens: 180,
    source: 'https://github.com/timlrx/tailwind-nextjs-starter',
    stars: 5000,
    tags: ['tailwind', 'nextjs', 'starter', 'performance'],
    difficulty: 'beginner'
  },
  {
    id: 'nextjs-blog-starter',
    name: 'Next.js Blog Starter',
    description: 'Blog starter with Next.js and Tailwind CSS',
    category: 'starters',
    prompt: 'Create a blog starter using Next.js and Tailwind CSS with markdown support and SEO optimization.',
    estimatedTokens: 200,
    source: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
    tags: ['nextjs', 'blog', 'markdown', 'seo'],
    difficulty: 'intermediate'
  },
  {
    id: 'vercel-ai-chatbot',
    name: 'Vercel AI Chatbot',
    description: 'AI chatbot starter with Vercel AI SDK',
    category: 'starters',
    prompt: 'Build an AI chatbot using Vercel AI SDK with streaming responses and modern UI.',
    estimatedTokens: 250,
    source: 'https://github.com/vercel-labs/ai-chatbot',
    tags: ['ai', 'chatbot', 'vercel', 'streaming'],
    difficulty: 'intermediate'
  },

  // Productivity
  {
    id: 'todo-app',
    name: 'Todo List App',
    description: 'A simple todo list with add, complete, and delete functionality',
    category: 'productivity',
    prompt: 'Create a React todo list application with the following features: add new todos, mark as complete, delete todos, and filter by status. Use modern React hooks and clean UI.',
    estimatedTokens: 150,
    tags: ['todo', 'productivity', 'tasks'],
    difficulty: 'beginner'
  },
  {
    id: 'note-taking',
    name: 'Note Taking App',
    description: 'Simple note taking with save and edit functionality',
    category: 'productivity',
    prompt: 'Build a note-taking app with create, edit, save, and delete functionality. Include auto-save and markdown support.',
    estimatedTokens: 130,
    tags: ['notes', 'markdown', 'auto-save'],
    difficulty: 'beginner'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'A basic calculator with arithmetic operations',
    category: 'productivity',
    prompt: 'Build a calculator app with basic arithmetic operations (+, -, *, /), clear function, and responsive design. Include error handling for division by zero.',
    estimatedTokens: 120,
    tags: ['calculator', 'math', 'tools'],
    difficulty: 'beginner'
  },

  // Social Media
  {
    id: 'social-media-feed',
    name: 'Social Media Feed',
    description: 'Social media style feed with posts and interactions',
    category: 'social-media',
    prompt: 'Create a social media feed with posts, likes, comments, and user avatars. Include infinite scroll and responsive design.',
    estimatedTokens: 300,
    tags: ['social', 'feed', 'posts', 'interactions'],
    difficulty: 'intermediate'
  },
  {
    id: 'chat-application',
    name: 'Chat Application',
    description: 'Real-time chat application with messaging features',
    category: 'social-media',
    prompt: 'Build a real-time chat application with user authentication, message history, and live messaging capabilities.',
    estimatedTokens: 400,
    tags: ['chat', 'real-time', 'messaging', 'authentication'],
    difficulty: 'advanced'
  },

  // Content Management
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description: 'Complete blog platform with CMS features',
    category: 'content-management',
    prompt: 'Create a complete blog platform with content management, user authentication, markdown support, and SEO optimization.',
    estimatedTokens: 350,
    tags: ['blog', 'cms', 'markdown', 'seo'],
    difficulty: 'intermediate'
  },
  {
    id: 'documentation-site',
    name: 'Documentation Site',
    description: 'Documentation site with search and navigation',
    category: 'content-management',
    prompt: 'Build a documentation site with search functionality, navigation, and markdown content support.',
    estimatedTokens: 280,
    tags: ['documentation', 'search', 'navigation', 'markdown'],
    difficulty: 'intermediate'
  },

  // Gaming
  {
    id: 'game-dashboard',
    name: 'Game Dashboard',
    description: 'Dashboard for game statistics and leaderboards',
    category: 'gaming',
    prompt: 'Create a game dashboard with statistics, leaderboards, and player profiles. Include data visualization and real-time updates.',
    estimatedTokens: 300,
    tags: ['game', 'dashboard', 'statistics', 'leaderboards'],
    difficulty: 'intermediate'
  },
  {
    id: 'quiz-game',
    name: 'Quiz Game',
    description: 'Interactive quiz game with scoring system',
    category: 'gaming',
    prompt: 'Build an interactive quiz game with multiple choice questions, scoring system, and results display.',
    estimatedTokens: 200,
    tags: ['quiz', 'game', 'scoring', 'interactive'],
    difficulty: 'beginner'
  },

  // Business
  {
    id: 'crm-system',
    name: 'CRM System',
    description: 'Customer relationship management system',
    category: 'business',
    prompt: 'Create a CRM system with customer management, contact tracking, and sales pipeline visualization.',
    estimatedTokens: 450,
    tags: ['crm', 'customers', 'sales', 'pipeline'],
    difficulty: 'advanced'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Project management tool with task tracking',
    category: 'business',
    prompt: 'Build a project management tool with task tracking, team collaboration, and project timeline visualization.',
    estimatedTokens: 400,
    tags: ['project', 'tasks', 'collaboration', 'timeline'],
    difficulty: 'intermediate'
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Business invoicing system with PDF generation',
    category: 'business',
    prompt: 'Create an invoice generator with PDF generation, client management, and payment tracking.',
    estimatedTokens: 300,
    tags: ['invoice', 'pdf', 'clients', 'payments'],
    difficulty: 'intermediate'
  },

  // Education
  {
    id: 'learning-management',
    name: 'Learning Management System',
    description: 'Online course platform with video lessons',
    category: 'education',
    prompt: 'Build a learning management system with course creation, video lessons, progress tracking, and student management.',
    estimatedTokens: 500,
    tags: ['lms', 'courses', 'video', 'progress'],
    difficulty: 'advanced'
  },
  {
    id: 'flashcard-app',
    name: 'Flashcard App',
    description: 'Study and memorization tool with flashcards',
    category: 'education',
    prompt: 'Create a flashcard app with spaced repetition, progress tracking, and multiple study modes.',
    estimatedTokens: 250,
    tags: ['flashcards', 'study', 'memorization', 'progress'],
    difficulty: 'intermediate'
  },

  // Health & Fitness
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    description: 'Workout and health monitoring application',
    category: 'health-fitness',
    prompt: 'Build a fitness tracker with workout logging, progress tracking, and health metrics visualization.',
    estimatedTokens: 300,
    tags: ['fitness', 'workouts', 'progress', 'health'],
    difficulty: 'intermediate'
  },
  {
    id: 'meditation-app',
    name: 'Meditation App',
    description: 'Mindfulness and wellness application',
    category: 'health-fitness',
    prompt: 'Create a meditation app with guided sessions, progress tracking, and mindfulness features.',
    estimatedTokens: 250,
    tags: ['meditation', 'mindfulness', 'wellness', 'guided'],
    difficulty: 'intermediate'
  },

  // Finance
  {
    id: 'budget-tracker',
    name: 'Budget Tracker',
    description: 'Personal finance management application',
    category: 'finance',
    prompt: 'Build a budget tracker with expense categorization, spending analysis, and financial goal setting.',
    estimatedTokens: 300,
    tags: ['budget', 'expenses', 'finance', 'goals'],
    difficulty: 'intermediate'
  },
  {
    id: 'expense-manager',
    name: 'Expense Manager',
    description: 'Track and categorize expenses',
    category: 'finance',
    prompt: 'Create an expense manager with receipt scanning, categorization, and spending reports.',
    estimatedTokens: 280,
    tags: ['expenses', 'receipts', 'categorization', 'reports'],
    difficulty: 'intermediate'
  },

  // Travel & Location
  {
    id: 'travel-planner',
    name: 'Travel Planner',
    description: 'Trip planning and itinerary application',
    category: 'travel-location',
    prompt: 'Build a travel planner with itinerary creation, expense tracking, and travel recommendations.',
    estimatedTokens: 350,
    tags: ['travel', 'itinerary', 'expenses', 'recommendations'],
    difficulty: 'intermediate'
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    description: 'Advanced weather forecasting application',
    category: 'travel-location',
    prompt: 'Create a weather app with detailed forecasts, location-based weather, and weather alerts.',
    estimatedTokens: 250,
    tags: ['weather', 'forecast', 'location', 'alerts'],
    difficulty: 'intermediate'
  }
];

export const getTemplateById = (id: string): AppTemplate | undefined => {
  return APP_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): AppTemplate[] => {
  return APP_TEMPLATES.filter(template => template.category === category);
};

export const getPopularTemplates = (limit: number = 6): AppTemplate[] => {
  // Return templates with highest star counts or most popular
  return APP_TEMPLATES
    .filter(template => template.stars)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0))
    .slice(0, limit);
};

export const getTemplatesByDifficulty = (difficulty: string): AppTemplate[] => {
  return APP_TEMPLATES.filter(template => template.difficulty === difficulty);
};

export const searchTemplates = (query: string): AppTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return APP_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCategoryById = (id: string): TemplateCategory | undefined => {
  return TEMPLATE_CATEGORIES.find(category => category.id === id);
}; 