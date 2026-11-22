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
    subtitle: 'Three-Sided Agricultural & Logistics Marketplace Architecture',
    category: 'Full-Stack Ecosystem & Backend Architecture',
    status: 'production',
    statusLabel: 'Production Architecture',
    statusDescription:
      'Multi-service backend architecture built with NestJS API gateway, Redis caching, Paystack payment processing, PostgreSQL TypeORM entities, and OTP delivery verification.',
    year: '2025 – Present',
    role: 'Lead Full-Stack & Systems Engineer',
    clientContext: 'Ghanaian Agricultural Supply Chain Systems',
    timeline: '6 Months Active Engineering',
    image: API_PROJECT_IMAGES.agromarket,
    overview:
      'A multi-sided agricultural and logistics platform engineered to empower smallholder farmers in Ghana by connecting them directly with commercial commodity buyers, institutional food processors, and verified logistics agents through transparent pricing, wallet ledgers, and delivery verification.',
    problem:
      'Smallholder farmers across West Africa encounter severe market inefficiencies, including opaque commodity pricing, fragmented transport logistics, and extended payment settlement cycles. Traditional informal transactions create high risk and cash-flow bottlenecks for both producers and commercial buyers.',
    objectives: [
      'Facilitate direct producer-to-buyer transactions through structured produce listings and order workflows.',
      'Deploy high-throughput Redis caching to accelerate catalog discovery and reduce database query load.',
      'Establish a platform-managed wallet ledger holding order funds until physical delivery verification.',
      'Implement an authenticated delivery verification protocol ensuring transparent settlement for farmers and haulage agents.',
    ],
    architecture: {
      summary:
        'Modular NestJS backend architecture connected to PostgreSQL for relational entity management and Redis for caching, BullMQ job processing, and token invalidation, designed to support web and mobile client interfaces.',
      frontend: [
        'Multi-client API architecture engineered to support responsive web dashboards and mobile clients',
        'Strict DTO validation interfaces enforcing type consistency across buyer, farmer, and agent clients',
        'Stateful order progression interfaces reflecting real-time delivery lifecycle transitions',
      ],
      backend: [
        'NestJS modular backend with strict TypeScript DTOs, class-validator runtime checks, and TypeORM entities',
        'JWT-based role-based access control (RBAC) isolating Farmer, Buyer, Agent, and Admin routes',
        'Event-driven transaction processing utilizing BullMQ queues for asynchronous task execution',
      ],
      database: [
        'PostgreSQL relational schema with TypeORM entities for users, listings, orders, wallet balances, and transactions',
        'Redis in-memory store for HTTP response caching, JWT token blacklisting, and OTP delivery-code caching',
      ],
      devops: [
        'Multi-stage Docker builds deployed on a self-managed DigitalOcean VPS',
        'NGINX reverse proxy with automated Let’s Encrypt SSL renewal and gzip compression',
        'GitHub Actions CI/CD pipeline executing automated test suites before container rebuilds',
      ],
    },
    keyFeatures: [
      {
        title: 'Multi-Tier Role Access Control',
        description:
          'Strictly isolated role-based access control (RBAC) for Farmers (crop inventory, order confirmations), Buyers (catalog checkout, address management), and Delivery Agents (route pickup, delivery fulfillment).',
        tag: 'Backend Architecture',
      },
      {
        title: 'Platform-Managed Paystack Wallet Ledger',
        description:
          'Payment engine integrating Paystack for checkout transactions. Funds are held in a platform-managed ledger until delivery confirmation, after which earnings are credited to internal farmer and agent wallets with automated Paystack Mobile Money transfer withdrawals.',
        tag: 'Fintech Integration',
      },
      {
        title: 'Dual-Channel Push & SMS Notifications',
        description:
          'Notification pipeline integrating OneSignal for authenticated push notifications, coupled with an external SMS Gateway API fallback to dispatch text alerts for order status transitions.',
        tag: 'Notification Systems',
      },
      {
        title: 'High-Performance Redis In-Memory Layer',
        description:
          'Redis caching layer providing sub-second HTTP response caching, JWT token blacklisting for secure logouts, BullMQ background job queues, and temporary OTP delivery-code storage with a 7-day TTL.',
        tag: 'Caching & Performance',
      },
    ],
    challenges: [
      {
        challenge: 'Preventing Unauthorized Delivery Confirmation',
        solution:
          'Designed a single-use six-digit OTP delivery verification system. Upon order creation, a six-digit numeric code is generated, bcrypt-hashed and stored against the order record, and cached in Redis with a 7-day TTL. When the delivery agent arrives, the buyer shares the code, which is verified via bcrypt.compare before the order is marked delivered and wallet funds are unlocked.',
      },
      {
        challenge: 'Maintaining Ledger Integrity Across Order States',
        solution:
          'Implemented structured wallet and transaction service handlers in TypeORM that track credit, debit, commission, and withdrawal events with compensation logic and status validation to maintain accurate user balances.',
      },
    ],
    techStack: [
      'NestJS',
      'TypeScript',
      'Redis',
      'BullMQ',
      'PostgreSQL',
      'TypeORM',
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
      'Deployed on custom production domain (cv-builder.dev-joseph.me) with Google Gemini AI structured JSON integration, Zod schema validation, and headless Puppeteer print-media PDF rendering.',
    year: '2024',
    role: 'Full-Stack Engineer & Architect',
    clientContext: 'Independent Digital Product',
    timeline: '3 Months Iterative Development',
    image: API_PROJECT_IMAGES['cv-builder'],
    liveUrl: 'https://cv-builder.dev-joseph.me',
    overview:
      'A high-performance full-stack resume platform that transforms unstructured career notes and raw project history into clean, structured developer resumes with AI extraction, live split-screen preview, and server-side PDF export.',
    problem:
      'Software engineers and job seekers frequently struggle to translate unstructured work history into clean, standardized resume sections. Generic online resume builders often produce bloated layouts, inconsistent print styles, and corrupted formatting when converted to PDF.',
    objectives: [
      'Instant extraction and structuring of unstructured text or uploaded PDF resumes into clean schema-compliant sections.',
      'Contextual AI structuring powered by Google Gemini outputting structured JSON without markdown formatting artifacts.',
      'Pixel-perfect server-side PDF generation that preserves exact typography, millimeter margins, and A4 print layout across all devices.',
      'Runtime Zod schema validation ensuring type safety and preventing corrupted profile states.',
    ],
    architecture: {
      summary:
        'Next.js App Router application integrating React Hook Form and Zod on the client, Google Gemini AI structured inference on the server with model fallbacks, and a headless Chromium Puppeteer worker for high-fidelity A4 PDF rendering.',
      frontend: [
        'Next.js App Router with React 19 and strict TypeScript component architecture',
        'Custom Tailwind CSS print design system with precise millimeter margins and print-safe typography',
        'React Hook Form paired with Zod schemas for immediate input validation and autosave state',
      ],
      backend: [
        'Next.js route handlers orchestrating AI extraction (/api/parse-cv) and PDF generation (/api/generate-pdf)',
        'Google Gemini API integration using @google/genai with candidate model fallbacks (gemini-3.8-flash, gemini-3.7-flash, gemini-flash-latest) and application/json MIME configuration',
        'In-memory IP rate-limiting and input sanitization protecting AI inference endpoints from abuse',
      ],
      database: [
        'Local storage persistence for guest sessions with import/export capabilities',
        'Structured JSON export and import conforming to standardized TypeScript/Zod resume schemas',
      ],
      devops: [
        'Production Ubuntu VPS deployment behind NGINX reverse proxy with SSL encryption',
        'Headless Chromium Puppeteer environment configured with isolated sandbox flags for deterministic PDF rendering',
      ],
    },
    keyFeatures: [
      {
        title: 'Structured AI Extraction & Bullet Generation',
        description:
          'Structured inference pipeline using Google Gemini that parses unstructured CV text, extracts personal details, skills, experience, and education, and formats bullet points into clean, action-oriented descriptions.',
        tag: 'Generative AI',
      },
      {
        title: 'Dual-Pane Interactive Live Preview',
        description:
          'Real-time split-screen interface allowing developers to edit profile sections on the left while observing live typography, section reordering, and millimeter spacing updates on the right.',
        tag: 'Client Architecture',
      },
      {
        title: 'Headless Puppeteer PDF Compilation',
        description:
          'Server-side Puppeteer engine that renders the resume HTML DOM using print-media emulation (A4 format) and outputs a high-resolution, vector-searchable, ATS-friendly PDF with preserved selectable text layers.',
        tag: 'Rendering Engine',
      },
      {
        title: 'Document Ingestion & Text Parsing',
        description:
          'Ingestion pipeline using pdf-parse that extracts raw text from existing PDF resumes, handling polyfills in serverless Node environments and passing clean text to the Gemini structuring engine.',
        tag: 'Document Ingestion',
      },
    ],
    challenges: [
      {
        challenge: 'Inconsistent PDF Output Across Devices & Browsers',
        solution:
          'Standard browser window.print() introduces unpredictable margins, inconsistent font rasterization, and arbitrary page breaks. Solved by implementing a server-side Puppeteer headless Chromium pipeline that emulates print media with exact CSS page-break-inside: avoid rules and A4 millimeter dimensions.',
      },
      {
        challenge: 'LLM Response Hallucination & Format Breaking',
        solution:
          'Free-form AI text generations frequently returned invalid JSON or markdown codeblocks. Resolved by configuring Google Gemini with responseMimeType: "application/json", candidate fallback models, markdown cleanup filters, and strict runtime validation via cvSchema.parse(parsedData) using Zod.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      '@google/genai',
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
      'Interactive client demonstration prototype built for a Lapaz, Accra retail business. Demonstrates catalog discovery, client-side Zustand shopping bag state, and simulated admin inventory management.',
    year: '2024',
    role: 'Frontend Architect & UI Designer',
    clientContext: 'Zee Essentials Retail (Lapaz Showroom, Accra, Ghana)',
    timeline: '4 Weeks Prototype Delivery',
    image: API_PROJECT_IMAGES['zee-essentials'],
    liveUrl: 'https://zee-essentials-prototype.vercel.app/',
    overview:
      'A bespoke e-commerce digital storefront prototype crafted for Zee Essentials, a retail enterprise in Lapaz, Accra specializing in content creation equipment (studio lighting, wireless microphones, heavy-duty tripods), salon furniture, and rechargeable electronics.',
    problem:
      'Independent retail shops across Accra frequently operate primarily through Instagram DMs and WhatsApp chats. This manual coordination leads to missed customer inquiries during peak hours, repetitive price/stock inquiries, manual calculation errors, and high drop-off.',
    objectives: [
      'Provide an editorial, brand-forward digital storefront capturing the high-grade aesthetic of creator gear.',
      'Incorporate authentic Ghanaian commercial context: Lapaz showroom pickup, delivery across Accra, and pricing in Ghana Cedis (GH₵).',
      'Implement a fluid interactive shopping bag drawer with instant item calculation and localStorage persistence.',
      'Build a prototype admin management dashboard for store supervisors to preview catalog and order controls.',
    ],
    architecture: {
      summary:
        'Next.js App Router client architecture featuring responsive photography, Framer Motion drawer interactions, client-side Zustand shopping bag persistence, and interactive administrative demonstration views.',
      frontend: [
        'Next.js App Router delivering high Core Web Vitals performance with smooth page transitions',
        'Framer Motion driving slide-out bag drawer animations, product card hover zooms, and category carousels',
        'Warm canvas theme tokens paired with high-contrast typography and subtle creator accents',
      ],
      backend: [
        'Client-side Zustand state architecture managing item quantities, bag subtotals, and category filtering without a live transactional backend',
        'Simulated admin route (/admin) demonstrating catalog toggles, promo code configuration, and mock customer order tables',
      ],
      database: [
        'Curated 21-product catalog structure organized across 7 categories in local data schemas',
        'Browser localStorage persistence (zee-essentials-cart-v3) preserving bag state and promo discounts across sessions',
      ],
      devops: [
        'Vercel edge deployment with automated preview branches and image optimization pipelines',
        'Lighthouse optimization achieving 95+ scores across Accessibility, Best Practices, and SEO',
      ],
    },
    keyFeatures: [
      {
        title: 'Curated 21-Product Creator Catalog',
        description:
          'Structured product discovery across Studio Video Lighting, Wireless Microphones, Rechargeable Living, Salon & Studio Furniture, Beauty Supplies, and Displays with high-resolution photography.',
        tag: 'Catalog Architecture',
      },
      {
        title: 'Zustand Slide-Out Shopping Bag Drawer',
        description:
          'Interactive slide-over drawer enabling shoppers to add items, adjust quantities, calculate live subtotals in GH₵, and apply promotional discounts with instant browser persistence.',
        tag: 'State & Micro-Interactions',
      },
      {
        title: 'Localized Ghanaian Retail Touchpoints',
        description:
          'Designed around real Ghanaian shopping habits: Free Lapaz showroom pickup indicators, Accra doorstep delivery guarantees, Mobile Money badges, and direct telephone contact (054 265 5690).',
        tag: 'Localization',
      },
      {
        title: 'Store Manager Simulated Admin Hub',
        description:
          'Dedicated /admin demonstration route displaying simulated retail metrics: mock order volume, gross revenue counters, low-stock warnings, and recent customer delivery records.',
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
        challenge: 'Transparent Prototype Positioning',
        solution:
          'Clearly exposed demonstration notices and simulated data badges. Distinguished frontend UX excellence and client-side state handling from live transactional payment processing and production inventory databases.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
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
      'High-contrast luxury footwear storefront prototype designed for a Kumasi Adum retail brand. Demonstrates category filtering, instant modal search, shopping bag interactions, and WhatsApp direct ordering.',
    year: '2024',
    role: 'Frontend Engineer & Creative Director',
    clientContext: 'Adepa Wc Mpaboa (Adum, Kumasi, Ghana)',
    timeline: '3 Weeks Design & Development',
    image: API_PROJECT_IMAGES['adepa-wc-mpaboa'],
    liveUrl: 'https://adepa-wc-mpaboa.vercel.app/',
    overview:
      'A modern digital storefront prototype built for Adepa Wc Mpaboa, a footwear brand based in Adum, Kumasi, Ghana. The platform curates premium streetwear sneakers, designer slides, rugged combat boots, and luxury lifestyle accessories with high visual impact and WhatsApp order dispatch.',
    problem:
      'Independent footwear retailers in Ghana struggle with generic e-commerce templates that fail to convey the authenticity and editorial presence of limited-release sneakers. Sales channels rely on phone calls and WhatsApp chats, causing inventory miscounts and sizing confusion.',
    objectives: [
      'Establish an editorial, brand-forward digital storefront reflecting contemporary streetwear aesthetics.',
      'Provide frictionless product discovery across footwear categories: Sneakers, Slippers & Slides, Boots, and Watches.',
      'Implement instant modal search and responsive bag interactions with size and variant selection.',
      'Incorporate interactive demonstration controls and direct WhatsApp dispatch to bridge prototype checkout with merchant operations.',
    ],
    architecture: {
      summary:
        'Next.js App Router application featuring an editorial high-contrast monochrome design system, fluid category filtering, instant search, client-side Zustand state, and direct WhatsApp order generation.',
      frontend: [
        'Next.js App Router with custom responsive image wrappers ensuring crisp product rendering across Retina displays',
        'Space Grotesk and editorial typography creating an unmistakable street luxury identity',
        'Instant modal search component (SearchModal.tsx) enabling real-time product filtering by name and category',
      ],
      backend: [
        'Client-side state management using Zustand (useCartStore, useOrderStore, useConfigStore) orchestrating bag items, order logs, and demo controls',
        'Simulated admin route (/admin) showcasing mock order pipelines and product management controls without a production database',
      ],
      database: [
        'Normalized client catalog schema modeling product variants (EU sizing 40–46), colorways, and price points in GH₵',
      ],
      devops: [
        'Vercel continuous deployment with global edge CDN caching for static assets',
      ],
    },
    keyFeatures: [
      {
        title: 'Editorial 3D Hero Drop Showcase',
        description:
          'Dynamic hero section with bold typography ("STEP INTO GREATNESS"), floating sneaker perspective, pricing badge (GH₵ 370.00), and rapid "Shop Now" call to action.',
        tag: 'Editorial UI',
      },
      {
        title: 'Instant Search & Footwear Filtering',
        description:
          'Interactive search modal paired with one-click category filtering across Streetwear Sneakers, Luxury Slides, Rugged Boots, and Lifestyle Accessories with visual count badges.',
        tag: 'Product Discovery',
      },
      {
        title: 'WhatsApp Direct Ordering Bridge',
        description:
          'Automated WhatsApp URL generator (whatsapp.ts) that formats the customer order details, item count, selected sizes, and delivery location into a structured message sent directly to the merchant phone number.',
        tag: 'Commerce Integration',
      },
      {
        title: 'Interactive Demo Banner Controls',
        description:
          'Floating interactive controller enabling evaluators to toggle delivery fee calculations, switch announcement banners, and reset demo order state without modifying code.',
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
        challenge: 'Simulating Merchant Order Workflows Honestly',
        solution:
          'Prominently labeled the checkout with a prototype demonstration notice. Simulated Mobile Money USSD prompt flows while providing a real WhatsApp dispatch option so the merchant could immediately accept orders.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Framer Motion',
      'Lucide React',
      'Vercel',
    ],
    nextSlug: 'agromarket',
    nextTitle: 'AgroMarket',
    nextCategory: 'Full-Stack Ecosystem & Backend Architecture',
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
