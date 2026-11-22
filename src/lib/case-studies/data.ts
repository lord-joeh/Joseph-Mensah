import type { CaseStudyData } from './types';
import type { Project } from '@/lib/api';
import { SLUG_ALIASES, getProjectSlug } from '@/lib/projects/slugs';

/**
 * Live canonical project image URLs hosted in Supabase Storage via the production NestJS API.
 */
export const API_PROJECT_IMAGES: Record<string, string> = {
  agromarket:
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/251a8cfb-996e-4613-bbd7-16e3ee225ab3.png',
  'cv-builder':
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/d77c736b-ad60-421b-af33-e433442b903c.png',
  'zee-essentials':
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/ef65c485-48e8-4ff5-bae8-7e232323e880.png',
  'adepa-wc-mpaboa':
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/06909a02-7848-46d0-b3c7-4efd77dca8cc.png',
  'the-vault':
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/cb20e44a-4702-4e9e-86ea-8c9f72139bbc.png',
  'course-rep':
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/projects/c3e38aa3-3e4a-4324-bf9b-2ac40a9b2daa.png',
};

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  agromarket: {
    slug: 'agromarket',
    title: 'AgroMarket',
    subtitle: 'Three-Sided Agricultural & Logistics Marketplace Platform',
    category: 'Full-Stack & Mobile Ecosystem',
    status: 'production',
    statusLabel: 'Production Architecture',
    statusDescription:
      'Multi-service architecture built with cross-platform mobile client, NestJS API gateway, Redis caching, Paystack escrow settlements, and PostgreSQL.',
    year: '2025 – Present',
    role: 'Lead Full-Stack & Mobile Engineer',
    clientContext: 'Ghanaian Agricultural Supply Chain',
    timeline: '6 Months Active Engineering',
    image: API_PROJECT_IMAGES.agromarket,
    overview:
      'A multi-sided agricultural and logistics platform engineered to empower smallholder farmers in rural Ghana by connecting them directly with commercial commodity buyers, institutional food processors, and licensed logistics haulers without predatory middlemen.',
    problem:
      'Smallholder farmers in West Africa face severe post-harvest losses (up to 40% in grains and tubers) due to lack of market price transparency, fragmented haulage logistics, and payment settlement delays that stretch across weeks. Traditional paper-based transactions create severe cash-flow bottlenecks.',
    objectives: [
      'Eliminate exploitative middlemen by facilitating direct producer-to-buyer transactions.',
      'Deploy real-time commodity price discovery backed by sub-second Redis caching.',
      'Establish a secure escrow payment pipeline holding buyer funds until physical delivery verification.',
      'Provide offline-first mobile sync capabilities for rural regions with intermittent 2G/3G connectivity.',
    ],
    architecture: {
      summary:
        'Decoupled microservices architecture connecting a Flutter cross-platform mobile client to a modular NestJS API gateway, backed by PostgreSQL for transactional safety and Redis for in-memory price discovery.',
      frontend: [
        'Flutter mobile application compiling to iOS and Android from a single unified codebase',
        'Bloc state management pattern enforcing unidirectional data flow and deterministic UI states',
        'Local SQLite / Hive cache enabling seamless offline crop logging and draft creation',
      ],
      backend: [
        'NestJS modular backend with strict TypeScript DTOs and class-validator runtime checks',
        'JWT-based role-based access control (RBAC) isolating Farmer, Buyer, Hauler, and Admin flows',
        'Event-driven transaction processing utilizing BullMQ queues for asynchronous order settlement',
      ],
      database: [
        'PostgreSQL relational schema with foreign key constraints, atomic transactions, and audit trails',
        'Redis in-memory store for high-throughput commodity pricing indices and token blacklisting',
      ],
      devops: [
        'Multi-stage Docker builds deployed on a self-managed DigitalOcean VPS',
        'NGINX reverse proxy with automated Let’s Encrypt SSL renewal and gzip compression',
        'GitHub Actions CI/CD pipeline executing automated test suites before container rebuilds',
      ],
    },
    keyFeatures: [
      {
        title: 'Multi-Tier Role Dashboards',
        description:
          'Distinct interfaces tailored to specific actor personas: Farmers track harvest batches and incoming bids; Buyers browse certified crops with price comparisons; Drivers claim haulage routes based on geo-proximity.',
        tag: 'Mobile & Web',
      },
      {
        title: 'Paystack Automated Escrow Settlements',
        description:
          'Payment engine integrating Paystack webhooks to lock buyer funds in escrow upon bid acceptance, releasing automated mobile money payouts to farmers and haulers once delivery is confirmed via QR handshake.',
        tag: 'Fintech Integration',
      },
      {
        title: 'Low-Bandwidth SMS & Push Notification Dispatch',
        description:
          'Dual notification pipeline using OneSignal for real-time mobile push alerts, coupled with an SMS Gateway API fallback that automatically dispatches text alerts to farmers when data connectivity drops.',
        tag: 'Infrastructure',
      },
      {
        title: 'Real-Time Price Discovery Index',
        description:
          'Live commodity exchange board pulling wholesale market averages across major regional markets (Techiman, Kumasi, Accra), powered by Redis in-memory caching for zero-latency lookups.',
        tag: 'Data Architecture',
      },
    ],
    challenges: [
      {
        challenge: 'Intermittent Rural Network Connectivity',
        solution:
          'Designed an optimistic offline mutation queue in Flutter using SQLite. When a farmer creates a crop listing without cellular coverage, the transaction is signed, stored locally, and automatically reconciled with the NestJS backend as soon as connectivity resumes.',
      },
      {
        challenge: 'Preventing Delivery Disputes in Escrow Release',
        solution:
          'Implemented a cryptographic two-party QR handshake. When a driver arrives at the delivery destination, the buyer scans the driver’s single-use verification token, triggering an atomic database transaction that releases the escrowed funds to both the farmer and the driver.',
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'NestJS',
      'TypeScript',
      'Redis',
      'PostgreSQL',
      'Paystack API',
      'OneSignal',
      'Docker',
      'NGINX',
    ],
    nextSlug: 'cv-builder',
    nextTitle: 'AI-Powered CV Builder',
    nextCategory: 'Full-Stack AI Application',
  },

  'cv-builder': {
    slug: 'cv-builder',
    title: 'AI-Powered CV Builder',
    subtitle: 'Intelligent Resume Creation & Career Optimization Platform',
    category: 'Full-Stack AI Application',
    status: 'production',
    statusLabel: 'Live Production Web App',
    statusDescription:
      'Deployed on custom production domain (cv-builder.dev-joseph.me) with Google Gemini AI integration, schema validation, and headless Puppeteer PDF compilation.',
    year: '2024',
    role: 'Full-Stack Engineer & Architect',
    clientContext: 'Independent Digital Product',
    timeline: '3 Months Iterative Development',
    image: API_PROJECT_IMAGES['cv-builder'],
    liveUrl: 'https://cv-builder.dev-joseph.me',
    overview:
      'A high-performance full-stack resume platform that transforms unstructured career notes, unformatted work history, and raw project bullet points into ATS-optimized, recruiter-friendly developer resumes with real-time AI critique and pixel-perfect PDF export.',
    problem:
      'Software engineers and job seekers frequently struggle to translate technical achievements into concise, quantifiable bullet points that pass automated Applicant Tracking Systems (ATS). Generic resume tools produce bloated formatting that corrupts parser extraction.',
    objectives: [
      'Instant transformation of unformatted text into structured, standardized resume sections.',
      'Contextual AI refinement powered by Google Gemini enforcing quantifiable action-result bullet structures.',
      'Pixel-perfect PDF generation that preserves exact typography, margins, and print layout across all devices.',
      'Schema-validated client state preventing corrupted or incomplete career profiles.',
    ],
    architecture: {
      summary:
        'Next.js App Router application integrating React Hook Form and Zod on the client, Google Gemini AI structured inference on the server, and a headless Chromium Puppeteer worker for high-fidelity PDF rendering.',
      frontend: [
        'Next.js App Router with React 19 and strict TypeScript component architecture',
        'Custom Tailwind CSS print design system with precise millimeter margins and print-safe typography',
        'React Hook Form paired with Zod schemas for immediate input validation and autosave state',
      ],
      backend: [
        'Next.js Server Actions and API route handlers orchestrating AI inference and PDF generation pipelines',
        'Google Gemini 1.5 Flash API integration using structured JSON schema response constraints',
        'Strict rate-limiting and input sanitization preventing injection attacks during prompt interpolation',
      ],
      database: [
        'Local storage persistence for anonymous guest sessions with encrypted export capabilities',
        'Structured JSON export/import conforming to standardized resume schemas',
      ],
      devops: [
        'Automated Vercel deployment with serverless edge functions for low-latency AI streaming',
        'Containerized Chromium instance configured for isolated, headless PDF rasterization',
      ],
    },
    keyFeatures: [
      {
        title: 'AI Critique & Bullet Rewriter',
        description:
          'Contextual rewriting engine powered by Google Gemini that analyzes passive bullet points and transforms them using the Google "Accomplished [X] as measured by [Y] by doing [Z]" impact framework.',
        tag: 'Generative AI',
      },
      {
        title: 'Split-Screen Interactive Live Preview',
        description:
          'Dual-pane workspace allowing developers to adjust career information on the left while observing real-time typesetting, margin calculations, and section flow updates on the right.',
        tag: 'Client Architecture',
      },
      {
        title: 'Headless Puppeteer PDF Compilation',
        description:
          'Server-side headless browser engine that renders the resume DOM at exact print resolution and streams back a high-dpi, vector-searchable PDF document guaranteed to parse accurately in Workday, Greenhouse, and Lever.',
        tag: 'Rendering Engine',
      },
      {
        title: 'Existing CV Upload & Parser',
        description:
          'Intelligent upload pipeline allowing candidates to import existing text or PDF resumes, automatically segmenting work experience, education, skills, and certifications into editable components.',
        tag: 'Document Ingestion',
      },
    ],
    challenges: [
      {
        challenge: 'Inconsistent PDF Output Across Devices',
        solution:
          'Standard browser window.print() introduces unpredictable page breaks and vendor-specific font rasterization. Solved by replacing client-side printing with a server-side Puppeteer headless Chromium pipeline that evaluates print media queries with exact page-break-inside: avoid CSS rules.',
      },
      {
        challenge: 'LLM Response Hallucination & Format Breaking',
        solution:
          'Free-form AI text generations frequently broke JSON structures. Resolved by configuring Google Gemini with strict responseSchema parameters and validating the raw output through Zod before committing to the application state.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Google Gemini AI',
      'Puppeteer',
      'Zod',
      'React Hook Form',
    ],
    nextSlug: 'zee-essentials',
    nextTitle: 'Zee Essentials',
    nextCategory: 'Commercial E-Commerce Client Prototype',
  },

  'zee-essentials': {
    slug: 'zee-essentials',
    title: 'Zee Essentials',
    subtitle: 'Content Creator Gear, Salon Equipment & Smart Electronics Storefront',
    category: 'Commercial E-Commerce Client Prototype',
    status: 'prototype',
    statusLabel: 'Commercial Client Prototype',
    statusDescription:
      'Interactive client demonstration prototype built for a Lapaz, Accra retail business. Demonstrates fluid catalog discovery, responsive shopping bag state, and admin inventory view.',
    year: '2024',
    role: 'Frontend Architect & UI Designer',
    clientContext: 'Zee Essentials Retail (Lapaz Showroom, Accra, Ghana)',
    timeline: '4 Weeks Prototype Delivery',
    image: API_PROJECT_IMAGES['zee-essentials'],
    liveUrl: 'https://zee-essentials-prototype.vercel.app/',
    overview:
      'A bespoke e-commerce digital storefront prototype crafted for Zee Essentials, a retail enterprise based in Lapaz, Accra specializing in content creation equipment (studio video lighting, wireless microphones, heavy-duty tripods), salon furniture, and rechargeable electronics.',
    problem:
      'Independent retail shops across Accra operate primarily through Instagram DMs and WhatsApp chats. This leads to missed customer inquiries during peak hours, repetitive price/stock questions, manual order tracking errors, and high drop-off during payment coordination.',
    objectives: [
      'Provide a polished, premium digital storefront capturing the high-grade aesthetic of content creator gear.',
      'Incorporate authentic Ghanaian commercial context: Lapaz showroom pickup, delivery across Accra, and pricing in Ghana Cedis (GH₵).',
      'Implement a fluid interactive shopping bag drawer with instant item calculation on mobile devices.',
      'Build a prototype admin management view for store supervisors to inspect inventory and order logs.',
    ],
    architecture: {
      summary:
        'Next.js App Router client architecture featuring optimized responsive imagery, Framer Motion drawer interactions, client-side cart persistence, and lightweight static page delivery.',
      frontend: [
        'Next.js App Router delivering high Core Web Vitals performance with instantaneous page transitions',
        'Framer Motion physics driving the slide-out bag drawer, product card hover zooms, and category carousels',
        'Custom warm canvas color tokens (#FAFAF8) paired with high-contrast typography and subtle creator accents',
      ],
      backend: [
        'Client-side state architecture managing item quantities, bag subtotals, and category filtering',
        'Demonstration admin routes (/admin) providing high-fidelity previews of business analytics and order statuses',
      ],
      database: [
        'Structured catalog JSON architecture organized for seamless future migration to Supabase PostgreSQL',
        'Client local storage persistence preserving shopping bag contents across browser refreshes',
      ],
      devops: [
        'Vercel edge deployment with automated preview branches and image optimization pipelines',
        'Lighthouse optimization achieving 95+ scores across Accessibility, Best Practices, and SEO',
      ],
    },
    keyFeatures: [
      {
        title: 'Categorized Creator Equipment Catalog',
        description:
          'Structured product discovery across Studio Video Lighting, Wireless Microphones, Rechargeable Living, Salon & Studio Furniture, Beauty Supplies, and Smart Home Gadgets with high-resolution photography.',
        tag: 'Catalog Architecture',
      },
      {
        title: 'Interactive Slide-Out Shopping Bag Drawer',
        description:
          'Framer Motion slide-over drawer enabling shoppers to add items, adjust quantities, inspect subtotal calculations in GH₵, and proceed to checkout without disruptive page reloads.',
        tag: 'Micro-Interactions',
      },
      {
        title: 'Localized Ghanaian Retail Touchpoints',
        description:
          'Designed around real Ghanaian shopping habits: Free Lapaz showroom pickup indicators, Accra doorstep delivery guarantees, Mobile Money payment badges, and direct telephone contact (054 265 5690).',
        tag: 'Localization',
      },
      {
        title: 'Store Manager Admin Demo Hub',
        description:
          'Dedicated /admin demonstration route displaying key retail metrics: daily order volume, gross revenue counters, low-stock warnings, and recent customer delivery statuses.',
        tag: 'Demonstration Suite',
      },
    ],
    challenges: [
      {
        challenge: 'Ensuring 60fps Micro-Interactions on Mobile Devices',
        solution:
          'Content creators predominantly browse on smartphones over mobile cellular networks. Handcrafted lightweight CSS transforms and Framer Motion spring physics with layoutId, avoiding heavy layout re-renders during bag opening.',
      },
      {
        challenge: 'Maintaining Clear Commercial Transparency',
        solution:
          'Distinguished client presentation prototype features from transactional production backends. Highlighted interactive demo state, allowing the client to test user engagement before investing in merchant banking API integrations.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Lucide React',
      'Vercel',
    ],
    nextSlug: 'adepa-wc-mpaboa',
    nextTitle: 'Adepa Wc Mpaboa',
    nextCategory: 'Commercial Retail Storefront Prototype',
  },

  'adepa-wc-mpaboa': {
    slug: 'adepa-wc-mpaboa',
    title: 'Adepa Wc Mpaboa',
    subtitle: 'Premium Footwear, Sneaker Drops & Streetwear Digital Storefront',
    category: 'Commercial Retail Storefront Prototype',
    status: 'prototype',
    statusLabel: 'Commercial Client Prototype',
    statusDescription:
      'High-contrast luxury footwear storefront prototype designed for a Kumasi Adum retail brand. Demonstrates category filtering, interactive sneaker drops, and demo controls.',
    year: '2024',
    role: 'Frontend Engineer & Creative Director',
    clientContext: 'Adepa Wc Mpaboa (Adum, Kumasi, Ghana)',
    timeline: '3 Weeks Design & Development',
    image: API_PROJECT_IMAGES['adepa-wc-mpaboa'],
    liveUrl: 'https://adepa-wc-mpaboa.vercel.app/',
    overview:
      'A modern digital storefront prototype built for Adepa Wc Mpaboa, a footwear brand headquartered in Adum, Kumasi, Ghana. The platform curates premium streetwear sneakers, designer slides, rugged combat boots, and luxury lifestyle accessories with high visual impact.',
    problem:
      'Independent footwear retailers in Ghana struggle with generic e-commerce templates that fail to convey the authenticity and editorial presence of limited-release sneakers. Sales channels rely on phone calls and WhatsApp chats, causing inventory miscounts and sizing confusion.',
    objectives: [
      'Establish an editorial, brand-forward digital storefront reflecting contemporary streetwear aesthetics.',
      'Provide frictionless product discovery across footwear categories: Sneakers, Slippers & Slides, Boots, and Watches.',
      'Communicate localized delivery trust: Kumasi Adum showroom verification, nationwide parcel dispatch, and quality inspection guarantees.',
      'Incorporate interactive demonstration controls allowing the merchant to preview storefront announcements and stock levels.',
    ],
    architecture: {
      summary:
        'Next.js App Router application featuring an editorial high-contrast monochrome design system, fluid category filtering, interactive demo controllers, and responsive image showcases.',
      frontend: [
        'Next.js App Router with custom responsive image wrappers ensuring crisp product rendering across Retina displays',
        'Space Grotesk and editorial sans typography creating an unmistakable street luxury identity',
        'Motion gesture handling powering product carousel navigation and category filtering transitions',
      ],
      backend: [
        'Client-side state management orchestrating shopping bag items, order tracking previews, and interactive demo controls',
        'Admin Management Hub (/admin) showcasing mock order pipelines and product management controls',
      ],
      database: [
        'Normalized client catalog schema modeling product variants (EU sizing 39–45), colorways, and price points in GH₵',
      ],
      devops: [
        'Vercel continuous deployment with sub-second global edge CDN caching for static assets',
      ],
    },
    keyFeatures: [
      {
        title: 'High-Impact 3D Hero Drop Showcase',
        description:
          'Dynamic hero section with bold typography ("STEP INTO GREATNESS"), floating sneaker perspective, pricing badge (GH₵ 370.00), and rapid "Shop Now" call to action.',
        tag: 'Editorial UI',
      },
      {
        title: 'Category-Specific Footwear Filtering',
        description:
          'One-click filtering between Streetwear Sneakers, Luxury Slides, Rugged Boots, and Lifestyle Accessories with visual count badges (e.g. "9 demonstration styles available").',
        tag: 'Product Discovery',
      },
      {
        title: 'Localized Kumasi Commercial Touchpoints',
        description:
          'Tailored to Ghanaian retail: "Verified in Adum, Kumasi", direct telephone ordering (0551189090), 100% Quality Inspected guarantee, and Nationwide Express Parcel Delivery.',
        tag: 'Localization',
      },
      {
        title: 'Embedded Interactive Demo Controls',
        description:
          'Floating interactive controller enabling prospective clients and evaluators to preview banner toggles, simulated cart additions, and inventory status without editing source code.',
        tag: 'Demonstration Suite',
      },
    ],
    challenges: [
      {
        challenge: 'Balancing Rich Image Quality with Fast Mobile Load Times',
        solution:
          'High-resolution footwear mockups can easily cause page weight bloat. Implemented WebP compression and responsive srcset image wrappers that serve correctly sized image assets depending on viewport density.',
      },
      {
        challenge: 'Honest Prototype Positioning for Retailers',
        solution:
          'Clearly exposed demonstration controls and prototype notices. Highlighted frontend UX excellence while clearly outlining the roadmap for live payment gateway and inventory database integration.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Lucide React',
      'Vercel',
    ],
    nextSlug: 'agromarket',
    nextTitle: 'AgroMarket',
    nextCategory: 'Full-Stack & Mobile Ecosystem',
  },

  'the-vault': {
    slug: 'the-vault',
    title: 'The Vault',
    subtitle: 'Zero-Knowledge Encrypted Mobile Messaging & Credential Vault',
    category: 'Mobile Security & Encryption',
    status: 'completed',
    statusLabel: 'Completed Architecture',
    statusDescription:
      'Mobile application built with Flutter, SQLCipher zero-knowledge local encryption, biometric key derivation, and asynchronous queueing.',
    year: '2024',
    role: 'Mobile Systems Engineer',
    clientContext: 'Privacy & Security Research',
    timeline: '4 Months Development',
    image: API_PROJECT_IMAGES['the-vault'],
    overview:
      'A zero-knowledge encrypted messaging and credential management mobile application built for users requiring confidential communications and sensitive asset storage without exposing plaintext data to centralized servers.',
    problem:
      'Mainstream messaging and note applications store plaintext or reversibly encrypted data on remote cloud servers, exposing user communications to corporate subpoena, server-side data leaks, and insider threats.',
    objectives: [
      'Client-side AES-256 GCM encryption where plaintext never leaves the physical mobile device.',
      'Hardware-backed biometric authentication bound to the device Secure Enclave / KeyStore.',
      'Ephemeral offline sync queues that purge decrypted states upon application backgrounding.',
    ],
    architecture: {
      summary:
        'Flutter mobile architecture integrating SQLCipher for encrypted local SQLite storage, native platform biometric channels, and a stateless Node.js relay backend.',
      frontend: [
        'Flutter cross-platform client with strict memory management preventing memory dumps',
        'Local database encryption utilizing SQLCipher with 256-bit PBKDF2 key derivation',
      ],
      backend: [
        'Stateless Node.js backend acting strictly as an encrypted payload relay without persistent storage',
        'Zero-knowledge message queuing purging payloads immediately upon confirmed delivery',
      ],
      database: [
        'Encrypted SQLite (SQLCipher) on-device database storing encrypted key-value pairs and chat histories',
      ],
      devops: [
        'Reproducible Docker builds for backend relay verification and automated security scans',
      ],
    },
    keyFeatures: [
      {
        title: 'Zero-Knowledge Local Storage',
        description:
          'All messages, credentials, and attachments are encrypted client-side using AES-256 before disk writes; database files are unreadable without the biometric key.',
        tag: 'Cryptography',
      },
      {
        title: 'Ephemeral Session Purging',
        description:
          'Automatic RAM wipe whenever the mobile operating system triggers an application background or screen lock event, preventing memory dump inspection.',
        tag: 'Security Engineering',
      },
    ],
    challenges: [
      {
        challenge: 'Maintaining High-Speed Search on Encrypted Records',
        solution:
          'Standard full-text search fails on encrypted ciphertext. Implemented deterministic blind indexing using HMAC-SHA256 tokens, allowing fast query filtering without exposing plaintext keywords.',
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Node.js',
      'SQLCipher',
      'SQLite',
      'Biometric API',
      'WebSockets',
    ],
    nextSlug: 'course-rep',
    nextTitle: 'Course Rep Management System',
    nextCategory: 'Campus Web Infrastructure',
  },

  'course-rep': {
    slug: 'course-rep',
    title: 'Course Representative Management System',
    subtitle: 'Unified Academic Communication & Resource Platform',
    category: 'Campus Web Infrastructure',
    status: 'production',
    statusLabel: 'Live Campus Platform',
    statusDescription:
      'Deployed on custom production domain (rep.dev-joseph.me) with automated SMS gateway integration, PostgreSQL database, and Docker containerization.',
    year: '2024',
    role: 'Full-Stack Developer',
    clientContext: 'University Academic Departments',
    timeline: '3 Months Development',
    image: API_PROJECT_IMAGES['course-rep'],
    liveUrl: 'https://rep.dev-joseph.me',
    overview:
      'A centralized academic communications platform engineered to coordinate timetable updates, lecturer announcements, and resource sharing across university course representative networks.',
    problem:
      'University class announcements were scattered across noisy WhatsApp groups, resulting in students missing crucial venue adjustments, test postponements, and lecture slides.',
    objectives: [
      'Centralize academic announcements and learning materials into a unified web portal.',
      'Automate urgent class alerts via bulk SMS gateway dispatch directly to student mobile phones.',
      'Provide course representatives with role-based dashboard tools to manage schedules and attendance logs.',
    ],
    architecture: {
      summary:
        'React frontend deployed behind NGINX, communicating with a Node.js REST API, PostgreSQL database, and external SMS Gateway API for automated broadcast alerts.',
      frontend: [
        'React single-page application with Tailwind CSS and responsive table components',
        'Instant client-side resource search and document preview integrations',
      ],
      backend: [
        'Node.js REST API with rate-limited SMS dispatch controllers and announcement management',
        'Role-based authentication ensuring only verified course representatives can broadcast notices',
      ],
      database: [
        'PostgreSQL relational schema managing student directories, courses, and dispatch logs',
      ],
      devops: [
        'Dockerized service deployment on self-hosted VPS with NGINX reverse proxy',
      ],
    },
    keyFeatures: [
      {
        title: 'Automated SMS Broadcast Dispatch',
        description:
          'Enables course representatives to broadcast urgent lecture or exam venue adjustments directly to students’ SMS inboxes within seconds.',
        tag: 'Telecommunications',
      },
      {
        title: 'Centralized Material Repository',
        description:
          'Structured syllabus library categorizing lecture slides, past question papers, and lab manuals by course code with instant search.',
        tag: 'Academic Portal',
      },
    ],
    challenges: [
      {
        challenge: 'SMS Gateway Rate Limiting & Delivery Reliability',
        solution:
          'Implemented asynchronous message batching in Node.js to queue broadcast jobs and handle telco rate limits without dropped notifications.',
      },
    ],
    techStack: [
      'React',
      'Node.js',
      'Tailwind CSS',
      'PostgreSQL',
      'SMS Gateway API',
      'Docker',
      'NGINX',
    ],
    nextSlug: 'agromarket',
    nextTitle: 'AgroMarket',
    nextCategory: 'Full-Stack & Mobile Ecosystem',
  },
};

/**
 * Retrieve case study data by slug with automatic alias resolution and fallback generation.
 */
export function getCaseStudy(
  slug: string,
  apiProjects?: Project[]
): CaseStudyData | null {
  const normalizedSlug = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();

  // 1. Direct hit in curated case studies
  if (CASE_STUDIES[normalizedSlug]) {
    const study = { ...CASE_STUDIES[normalizedSlug] };
    // Enrich with dynamic API image/link if available
    if (apiProjects) {
      const match = apiProjects.find((p) => getProjectSlug(p) === normalizedSlug);
      if (match) {
        if (match.image_url) study.image = match.image_url;
        if (match.link && !study.liveUrl) study.liveUrl = match.link;
        if (match.github_link && !study.githubUrl) study.githubUrl = match.github_link;
      }
    }
    return study;
  }

  // 2. Dynamic fallback for other database projects (e.g. CI/CD infra, ShopEase, Event Ticketing, etc.)
  if (apiProjects) {
    const match = apiProjects.find(
      (p) => getProjectSlug(p) === normalizedSlug || p.id === slug
    );
    if (match) {
      const cleanTags = match.tags
        ? match.tags.split(',').map((t) => t.trim())
        : ['Full-Stack', 'TypeScript', 'Web Application'];

      return {
        slug: getProjectSlug(match),
        title: match.title,
        subtitle: match.description.slice(0, 100),
        category: cleanTags[0] ? `${cleanTags[0]} Project` : 'Software Engineering Project',
        status: 'completed',
        statusLabel: 'Completed Project',
        statusDescription: 'Verified engineering project from Joseph Mensah’s production portfolio.',
        year: '2024 – 2025',
        role: 'Full-Stack Engineer',
        clientContext: 'Engineering Deployment',
        timeline: 'Completed Deployment',
        image: match.image_url || API_PROJECT_IMAGES['cv-builder'],
        liveUrl: match.link || undefined,
        githubUrl: match.github_link || undefined,
        overview: match.description,
        problem:
          'Solving technical and functional requirements through clean architecture, automated workflows, and type-safe implementation.',
        objectives: [
          'Deliver robust application functionality with reliable performance.',
          'Implement clean code practices, modular architecture, and automated verification.',
          'Deploy on stable infrastructure with verified access endpoints.',
        ],
        architecture: {
          summary: `System engineered using ${cleanTags.join(', ')} with structured data flows and responsive presentation.`,
          frontend: cleanTags.slice(0, 3).map((t) => `${t} client implementation`),
          backend: cleanTags.slice(2, 5).map((t) => `${t} service processing`),
          database: ['PostgreSQL / Data store persistence'],
          devops: ['Automated deployment and production monitoring'],
        },
        keyFeatures: [
          {
            title: 'Core Implementation',
            description: match.description,
            tag: 'Core System',
          },
        ],
        challenges: [
          {
            challenge: 'Architectural Implementation & Delivery',
            solution:
              'Applied modular separation of concerns and pragmatic technical decisions to ensure reliable performance.',
          },
        ],
        techStack: cleanTags,
        nextSlug: 'agromarket',
        nextTitle: 'AgroMarket',
        nextCategory: 'Full-Stack & Mobile Ecosystem',
      };
    }
  }

  return null;
}
