// ==== CONTENT ====
// All site content lives here. Edit this file for text, dates, images, and links;
// index.html only holds layout and behavior. Loaded as a classic script before
// index.html's main script, so CATEGORIES and EVENTS are shared globals.
//
// EVENTS fields:
//   id          unique slug, used by data-id="..." buttons and openModal(id)
//   day         0-6 (Mon-Sun), the Week view day label
//   time        display string on Year view chips
//   title, subtitle
//   category    key of CATEGORIES
//   year        2022-2026, places it in the Year view column (omit to hide there)
//   current     true adds the pulsing "Now" marker
//   type        'bullets' | 'skills' (uses skillGroups) | 'contact'
//   bullets, tags, links [{label, url}]
//   image       single image path, or images: [...] for a carousel
//   startMonth, endMonth   1-12; any event with both appears in the Month (2026) roadmap
//   wide        legacy flag from the old day grid, harmless

// Colors resolve from CSS variables, so each category follows the light/dark theme.
const CATEGORIES = {
  about:             { label: 'About',            color: 'var(--cat-about)' },
  experience:        { label: 'Experience',       color: 'var(--cat-experience)' },
  leadership:        { label: 'Leadership',       color: 'var(--cat-leadership)' },
  'work-project':    { label: 'Work Projects',    color: 'var(--cat-work)' },
  'college-project': { label: 'College Projects', color: 'var(--cat-college)' },
  skills:            { label: 'Skills',           color: 'var(--cat-skills)' },
  personal:          { label: 'Personal',         color: 'var(--cat-personal)' },
  contact:           { label: 'Contact',          color: 'var(--cat-contact)' },
};

const EVENTS = [
  { id: 'now-cummins', day: 0, time: '9:00 AM – 5:00 PM', title: 'Now: AI Solutions Engineer', subtitle: 'Cummins Inc., Power Systems Business Unit · Dec 2025 – Present · Minneapolis, MN',
    category: 'experience', year: 2025, current: true, type: 'bullets',
    bullets: [
      'Collaborate with cross-functional teams to translate business requirements into scalable analytics tools and dashboards.',
      'Implement AI/NLP workflows to analyze unstructured sales data and surface recurring problems.',
      'Produce technical documentation and user stories for enterprise data tools.',
    ], tags: ['AI/NLP', 'Analytics', 'Cross-functional'] },
  { id: 'about', day: 0, time: '5:30 – 6:00 PM', title: 'About Me', subtitle: 'Shivli Agrawal · Minneapolis, MN',
    category: 'about', type: 'bullets',
    bullets: [
      'AI Solutions Engineer at Cummins Inc. in Minneapolis, building AI/LLM pipelines and analytics tools for the Power Systems Business Unit. My current role, and my biggest highlight so far.',
      'Computer Science graduate of Purdue University (B.S., Dec 2025).',
      'Looking for my next move as a Forward Deployed Engineer, Technical PM, or Technical Solutions Engineer: roles where building the AI pipeline and understanding the business problem are the same job.',
    ] },

  { id: 'cummins-intern', day: 1, time: '9:00 – 11:00 AM', title: 'Tech Applications Intern', subtitle: 'Cummins Inc., Power Systems Business Unit · June 2025 – Aug 2025 · Minneapolis, MN',
    category: 'experience', year: 2025, type: 'bullets',
    bullets: [
      'Developed automated test frameworks in Databricks (PySpark, MLflow) to validate ETL pipelines on Salesforce CPQ data across 5,000+ opportunities.',
      'Built and fine-tuned a domain-specific LLM with Hugging Face Transformers to generate smoke-test suites, cutting QA prep time by 90%.',
      'Engineered an Outlook phishing-detection add-in (Office.js, Microsoft Graph API, Node.js) with 99% classification accuracy in pilots.',
      'Integrated automated tests into CI/CD pipelines on AWS-hosted environments.',
    ], tags: ['Databricks', 'PySpark', 'Hugging Face', 'AWS'] },
  { id: 'education', day: 1, time: '1:00 – 1:45 PM', title: 'College Coursework', subtitle: 'Purdue University, B.S. Computer Science · Jan 2022 – Dec 2025 · West Lafayette, IN',
    category: 'about', year: 2022, type: 'bullets',
    bullets: [
      "Dean's List: 2022 – 2023.",
      'Teaching Assistant for Object-Oriented Programming with Java across 7 terms, supervising lab sessions for 80+ students each term.',
    ], tags: [
      'CS 18000 · Problem Solving & OOP', 'CS 18200 · Foundations of CS', 'CS 24000 · Programming in C',
      'CS 25000 · Computer Architecture', 'CS 25100 · Data Structures & Algorithms', 'CS 25200 · Systems Programming',
      'CS 30700 · Software Engineering', 'CS 35400 · Operating Systems', 'CS 38100 · Algorithms',
      'CS 40800 · Software Testing', 'CS 34800 · Information Systems',
    ], links: [{ label: 'Coursework on GitHub', url: 'https://github.com/shivliagrawal/CourseWork' }] },
  { id: 'win-loss-intelligence', day: 1, time: '3:00 – 5:00 PM', title: 'Win/Loss Intelligence', subtitle: 'Cummins Inc. · IT Sales & Aftermarket · Jun – Aug 2026',
    category: 'work-project', year: 2026, type: 'bullets', wide: true, startMonth: 6, endMonth: 8, image: 'assets/winloss_infograph.jpg',
    bullets: [
      'Turned unstructured Salesforce Win/Loss comments into a reusable analytics pipeline that surfaced why opportunities were lost, competitive themes, and repeat-loss account patterns.',
      'Designed an end-to-end Databricks/Spark pipeline to filter and deduplicate Salesforce opportunity comments, generate SBERT embeddings, cluster semantic themes, and use Claude Sonnet to extract structured loss reasons.',
      'Reduced AI request volume by clustering similar comments first, using roughly 200 cluster-level calls instead of sending every note individually.',
      'Built analysis around loss reasons, competitor signals, comment quality, and repeat-loss accounts. Caterpillar was the top competitor showing up in loss data.',
      'Prototyped a serial-loss account module to surface customers with high quote volume and low conversion.',
      '55,044 closed-lost deals analyzed in the final documented run, at roughly 8 minutes of runtime and under $3 in model-token cost, down from an earlier version that took 18+ hours to run.',
    ], tags: ['Databricks', 'Spark', 'SBERT', 'Claude Sonnet', 'SQL', 'Salesforce', 'NLP', 'LLM'] },

  { id: 'ta', day: 2, time: '9:00 – 10:30 AM', title: 'Teaching Experience', subtitle: 'Undergraduate TA, Object-Oriented Programming with Java, Purdue University · Fall 2022 – Fall 2025',
    category: 'experience', year: 2022, type: 'bullets', image: 'assets/teaching_experience.jpg',
    bullets: [
      'Supervised lab sessions for 80+ students per term across 7 terms, improving proficiency in Java and object-oriented programming concepts.',
      'Debugged student assignments, gave detailed feedback, and maintained accurate performance records over 3+ years.',
      'Onboarded and active for CS 18000 across Fall 2022, Spring 2023, Fall 2023, Spring 2024, Summer 2024, Fall 2024, Spring 2025, and Fall 2025.',
      'Helped students build confidence with classes, inheritance, polymorphism, and core data structures, often the first real programming class they had taken.',
    ] },
  { id: 'urglobal', day: 2, time: '4:00 – 5:00 PM', title: 'President, UR Global', subtitle: 'UR Global, Purdue University · Aug 2023 – Dec 2025',
    category: 'leadership', year: 2023, type: 'bullets',
    bullets: [
      'Led cross-cultural events and fostered a welcoming environment for international students.',
      'Enhanced global awareness and cultural exchange across campus.',
    ] },
  { id: 'smoke-testing-suite', day: 2, time: '5:30 – 7:00 PM', title: 'AI-Driven Smoke Testing Suite', subtitle: 'Cummins Inc. · QA strategy + prompt engineering · Jun – Aug 2026',
    category: 'work-project', year: 2026, type: 'bullets', wide: true, startMonth: 6, endMonth: 8, image: 'assets/smoke_testing_infograph.jpg',
    bullets: [
      'Created a reusable QA playbook for generating high-value Salesforce CPQ smoke tests from JIRA stories and acceptance criteria, with human review before execution in staging.',
      'Designed a repeatable JIRA → AI generation → human review → qTest → staging workflow for release-specific smoke testing.',
      'Developed prompt patterns using role framing, explicit schemas, few-shot examples, edge-case instructions, and strict output formatting.',
      'Applied the approach to documented CPQ scenarios covering Conga quote templates, COR document generation, and multi-currency pricing.',
      'Added risk-based selection criteria around P1 stories, recent changes, component tags, past incidents, core functionality, and integrations.',
      'Produced a reusable training playbook that future testers can use to create and curate release-specific smoke suites, structuring AI as an accelerator, not a replacement, for QA judgment.',
    ], tags: ['Salesforce CPQ', 'JIRA', 'qTest', 'ChatGPT', 'Conga', 'Prompt Engineering', 'QA'] },

  { id: 'nll-swe', day: 3, time: '10:00 AM – 12:00 PM', title: 'Software Development Intern', subtitle: 'No Limit Living LLC · June 2024 – Aug 2024 · Gary, IN',
    category: 'experience', year: 2024, type: 'bullets',
    bullets: [
      'Rebuilt the company website with Node.js and React.js, cutting page load time by 30%.',
      'Shipped a mobile-friendly web app and Android app with React Native and Express.js.',
      'Integrated Python (Beautiful Soup) scrapers for content updates; owned unit and QA testing.',
    ], tags: ['React', 'Node.js', 'React Native'] },
  { id: 'nll-webdev', day: 3, time: '2:00 – 3:30 PM', title: 'Web Development Researcher', subtitle: 'No Limit Living LLC · Aug 2023 – Dec 2023 · West Lafayette, IN',
    category: 'experience', year: 2023, type: 'bullets',
    bullets: [
      'Designed a website supporting daily operations and integrated internal MLS tools via The Data Mine Corporate Partnership at Purdue.',
      'Built live-update analytics dashboards that improved operational efficiency.',
    ] },
  { id: 'market-intelligence', day: 3, time: '4:00 – 6:00 PM', title: 'Market Intelligence Tool', subtitle: 'Cummins Power Systems · Market Intelligence · Jun – Aug 2026',
    category: 'work-project', year: 2026, type: 'bullets', wide: true, startMonth: 6, endMonth: 8, image: 'assets/market_int.jpg',
    bullets: [
      'Built and evolved an AI-powered competitor intelligence capability that automates the path from public competitor product data to structured, searchable, and comparable product intelligence inside Cummins Power Suite.',
      'Partnered with Sales, Product, Engineering, and IT to translate competitive-intelligence needs into technical requirements, acceptance criteria, JIRA stories, and solution designs.',
      'Designed the end-to-end flow: competitor-source discovery → automated collection → document ingestion → AI extraction → standardization/validation → centralized storage → Power Suite comparison.',
      'Worked across Python web scraping, Power Automate Desktop / RPA, FastAPI, Azure Blob Storage, Azure OpenAI / Azure AI Foundry, PostgreSQL, Data Lake, and Power Suite / Angular.',
      'Built schema mapping, unit normalization, deduplication, required-field validation, confidence scoring, and source traceability into the pipeline.',
      'Supported Product Finder workflows including search, filters, product cards, detail pages, side-by-side comparison, and community notes.',
      'Phase 1 focused on Caterpillar, with expansion planned toward Kohler, MTU, Generac, and FG Wilson.',
    ], tags: ['Python', 'FastAPI', 'Azure OpenAI', 'AI Foundry', 'RPA', 'PostgreSQL', 'RAG/Vector Search', 'Prompt Engineering', 'System Architecture'] },

  { id: 'qnucleon', day: 4, time: '9:30 – 11:00 AM', title: 'Front-end Development Intern', subtitle: 'Qnucleon PTY LTD · May 2023 – Aug 2023 · Remote',
    category: 'experience', year: 2023, type: 'bullets',
    bullets: [
      "Modernized the site's visual design with HTML and JavaScript, lifting click-through rates by 17%.",
      'Ran usability tests and shipped iterative UX improvements.',
    ] },
  { id: 'battelle', day: 4, time: '1:00 – 3:00 PM', title: 'Data Science Researcher', subtitle: 'Battelle Inc. · Aug 2022 – May 2023 · West Lafayette, IN',
    category: 'experience', year: 2022, type: 'bullets',
    bullets: [
      'Improved knowledge-graph generation for drug-related health records using ML techniques.',
      'Used BERT to extract structured data from a Harvard Medical School Adverse Drug Events dataset.',
      'Fine-tuned BioBERT with Hyperband and population-based training, lifting NER performance by 5%.',
    ], tags: ['BERT', 'BioBERT', 'NLP'] },
  { id: 'sales-enablement', day: 4, time: '3:30 – 5:30 PM', title: 'Sales Enablement PowerCell Support', subtitle: 'Cummins Inc. · Sales Enablement PowerCell · Jan – Dec 2026',
    category: 'work-project', year: 2026, type: 'bullets', wide: true, startMonth: 1, endMonth: 12, image: 'assets/sales_enablement_infographic.jpg',
    bullets: [
      'Work as the business-analysis bridge between Sales Enablement stakeholders and the development organization: understanding what the business needs and translating it into clear, actionable Jira stories for the GDC team.',
      'Built a repeatable business requirement → technical requirement → Jira story → development feedback → sprint execution workflow.',
      'Created and refined Jira stories across 5 named PowerCell initiatives: GenSize, SSR 2.0 / Webdata, GenCalc, Tiled / Seismic Transition, and Market Intelligence.',
      'Took on project-management responsibilities within the Tiled / Seismic Transition, tracking open items, progress, and blockers to keep work moving.',
      'Explored process improvements such as TOSCA testing and the potential for a PowerSuite → Data Lake → Databricks analytics path.',
      'Began identifying opportunities for AI-assisted PowerCell workflows, including simplifying competitor-data collection and updates.',
      '4 annual goal areas, 5 named PowerCell initiatives, and 6 core responsibilities: requirements discovery, requirements translation, cross-functional alignment, project execution, project management, and process improvement.',
    ], tags: ['Business Analysis', 'Requirements Engineering', 'JIRA', 'Agile/Scrum', 'Stakeholder Management', 'PowerCell', 'PowerSuite', 'Databricks', 'TOSCA'] },
  { id: 'spec-data-automation', day: 4, time: '5:45 – 7:00 PM', title: 'Spec / Data Sheet Automation Platform', subtitle: 'Cummins Inc. · Document automation + data engineering · Jan – Jul 2026',
    category: 'work-project', year: 2026, type: 'bullets', wide: true, startMonth: 1, endMonth: 7, image: 'assets/specsheet_infographic.jpg',
    bullets: [
      'Designed a reusable automation architecture for converting product and configuration data from WebDATA, CRD files, and Excel workbooks into standardized Excel, TXT, CSV, spec sheet, data sheet, and brochure outputs.',
      'Led discovery across the existing WebDATA → Excel → CSV → Adobe InDesign → PDF process, identifying manual handoffs, duplicated mapping logic, and document-generation bottlenecks.',
      'Defined a reusable Excel-to-Excel mapping engine that stores mappings and transformation rules in a centralized configuration layer rather than embedding the same logic in every output workbook.',
      'Designed an AI-assisted CRD → structured JSON → TXT workflow using document parsing, prompt-based extraction, schema validation, deterministic formatting, confidence checks, and human review.',
      'Mapped product attributes and Parameter IDs from WebDATA to downstream document fields.',
      'Evaluated integration points across WebDATA, Databricks, CPQ, Logik BP blueprint logic, Excel templates, and Adobe InDesign.',
      'Coordinated with product management, engineering, WebDATA specialists, sales, and document-design stakeholders.',
    ], tags: ['Python', 'pandas', 'openpyxl', 'Databricks', 'SQL', 'WebDATA', 'Excel Automation', 'ETL', 'Prompt Engineering', 'LLM', 'JSON Schema', 'Adobe InDesign', 'Solution Architecture'] },
  { id: 'skills', day: 4, time: '7:15 – 7:45 PM', title: 'Skills Review', subtitle: 'A running inventory',
    category: 'skills', type: 'skills',
    skillGroups: [
      { label: 'Languages', items: ['Java', 'C', 'C++', 'Python', 'R', 'JavaScript', 'TypeScript', 'SQL'] },
      { label: 'Frameworks & Tools', items: ['React.js', 'Node.js', 'Express.js', 'PyTorch', 'Hugging Face', 'Databricks', 'MongoDB', 'MySQL', 'PostgreSQL', 'MLflow', 'Figma', 'Pandas', 'React Native'] },
      { label: 'Platforms & Practices', items: ['Machine Learning', 'NLP', 'LLMs', 'Test Automation', 'DevOps', 'Cloudflare Workers', 'AWS', 'Azure', 'REST', 'GraphQL', 'HPC'] },
      { label: 'Forward Deployed Engineering', items: ['Client-Facing Solution Delivery', 'RAG & Vector Search', 'LLM Agent Frameworks (LangChain)', 'Prompt Engineering', 'API Integration', 'Solution Architecture', 'Rapid Prototyping', 'FastAPI', 'Docker', 'System Design'] },
      { label: 'Technical Product Management', items: ['Product Discovery', 'Requirements Engineering', 'Roadmapping', 'Stakeholder Management', 'JIRA', 'Agile/Scrum', 'A/B Testing', 'Business Analysis', 'AI Product Strategy', 'Technical Specification Writing'] },
    ] },

  { id: 'nocturne', day: 5, time: '10:00 AM – 12:00 PM', title: 'Build: Nocturnè Marketplace', subtitle: 'MERN · JWT · Cloudflare Workers · Jan 2025',
    category: 'college-project', type: 'bullets', images: ['assets/nocturne1.jpg', 'assets/nocturne2.jpg', 'assets/nocturne3.jpg'],
    bullets: [
      'A next-generation e-commerce aggregator inspired by platforms like Amazon and Apple, offering real-time search, category-based navigation, and a seamless shopping experience.',
      'Instead of direct purchases, users are redirected to official brand websites, ensuring authentic transactions.',
      'Built the frontend with React.js and Tailwind CSS, backend with Node.js and Express.js, and MongoDB for data.',
      'Implemented WebSockets for live search suggestions and external API integrations for brand-store redirection.',
      'Integrated PostgreSQL queries into reporting modules to validate data integrity.',
    ], tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS', 'WebSockets', 'Cloudflare'],
    links: [{ label: 'GitHub', url: 'https://github.com/shivliagrawal/Nocturne' }] },
  { id: 'sysmonitor', day: 5, time: '1:00 – 3:00 PM', title: 'Build: System Monitor', subtitle: 'C · GTK · Linux /proc · Nov 2024',
    category: 'college-project', type: 'bullets', image: 'assets/sysmonitor1.jpg',
    bullets: [
      'Built a GTK desktop app in C to monitor CPU, memory, and processes via the /proc filesystem.',
      'Implemented process-management controls, automated performance checks, and real-time visualization.',
    ], tags: ['C', 'GTK', 'Linux'] },
  { id: 'boilertutors', day: 5, time: '4:00 – 6:00 PM', title: 'Build: BoilerTutors', subtitle: 'React · Node.js · PostgreSQL · REST · Sept 2024',
    category: 'college-project', type: 'bullets', images: ['assets/boilertutors1.jpg', 'assets/boilertutors2.jpg', 'assets/boilertutors3.jpg', 'assets/boilertutors4.jpg'],
    bullets: [
      'Built a full-stack resource-sharing platform with React.js and Node.js.',
      'Designed REST APIs and a PostgreSQL schema with indexing and query optimization for scale.',
      'Wrote backend unit tests validating scheduling and resource-matching algorithms.',
    ], tags: ['React', 'Node.js', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/shivliagrawal/BoilerTutorsShivli' }] },
  { id: 'lms', day: 6, time: '3:30 – 5:00 PM', title: 'Build: Database LMS', subtitle: 'GUI · Concurrency · Apr 2022',
    category: 'college-project', type: 'bullets', images: ['assets/databaselms1.jpg', 'assets/databaselms2.jpg', 'assets/databaselms3.jpg'],
    bullets: [
      'Designed a GUI-based Learning Management System with concurrency support for quizzes and auto-grading.',
      'Built real-time student–teacher interaction features.',
    ], tags: ['Database Systems', 'Concurrency'] },
  { id: 'contact', day: 6, time: '5:30 – 6:30 PM', title: "Office Hours: Let's Connect", subtitle: 'Open invite',
    category: 'contact', type: 'contact',
    bullets: ['Best way to reach me: a LinkedIn DM or an email. I read both.'] },

  { id: 'seventy-five-hard', day: 5, time: '6:00 – 6:45 AM', title: '75 Hard Challenge', subtitle: 'Apr 20 – Jul 4, 2026',
    category: 'personal', year: 2026, type: 'bullets', startMonth: 4, endMonth: 7,
    bullets: [
      'Two 45-minute workouts a day (one outdoors), a strict diet, a gallon of water, and 10 pages of reading, every day for 75 days straight, no exceptions.',
      'Built the kind of daily discipline that carries over into how I show up at work.',
    ] },
  { id: 'running-journey', day: 6, time: '7:00 AM', title: '5K Running Journey', subtitle: 'Mid-July 2026 – Present',
    category: 'personal', year: 2026, type: 'bullets', startMonth: 7, endMonth: 9, image: 'assets/5k.jpg',
    bullets: [
      "Started running as a habit in mid-July and haven't stopped since, training toward my first 5K, one run at a time.",
    ] },
  { id: 'matcha-corner', day: 5, time: 'All year round', title: 'Matcha Corner', subtitle: '2026, ongoing',
    category: 'personal', year: 2026, type: 'bullets', startMonth: 1, endMonth: 12, image: 'assets/matchacorner.jpg',
    bullets: [
      'Building out a little matcha corner at home, testing new matcha blends, jams, and toppings, and slowly making it feel like mine.',
    ] },
  { id: 'hp-trip', day: 6, time: 'Jul 24 – 28, 2026', title: 'Wizarding World of Harry Potter, LA', subtitle: 'A long-time dream trip',
    category: 'personal', year: 2026, type: 'bullets', startMonth: 7, endMonth: 7, image: 'assets/wizardingworld.jpg',
    bullets: [
      "Five days at the Wizarding World of Harry Potter in LA. I've been a Potterhead for as long as I can remember, so this was the trip.",
    ] },
];
