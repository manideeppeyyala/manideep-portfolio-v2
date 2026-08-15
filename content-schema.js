// Single source of truth for every editable piece of site content.
// Used as (a) the fallback the public site renders before Firebase is configured,
// and (b) the starting values the admin panel edits.
window.DEFAULT_CONTENT = {
  hero: {
    eyebrow: "SMARTCOMM DEVELOPER & AI/DATA ENGINEER",
    titleLine1: "Engineering",
    titleGradient: "Reliable Backend",
    titleLine3: "Systems.",
    subPython: "Python",
    subMiddle: "SmartComm",
    subData: "Data",
    name: "PEYYALA MANIDEEP",
    roles: [
      "SmartComm Developer",
      "AI & Data Engineer",
      "Analyst, Consulting Services @ Deloitte",
      "Python Backend Developer",
      "Content Creator @ Vlogging With Mani"
    ],
    desc: "Detail-oriented SmartComm Developer & AI/Data Engineer specializing in Python, skilled in document generation development, SQL-driven backend logic, and automation. Delivers clean, maintainable code while supporting production workflows and resolving technical issues.",
    orbitNodes: ["Deloitte", "AI & Data", "SQL", "Automation", "Python", "SmartComm"]
  },

  about: {
    bio: [
      "I'm <strong>Peyyala Manideep</strong> — a SmartComm Developer &amp; AI/Data Engineer currently working as an <strong>Analyst, Consulting Services at Deloitte</strong>, Hyderabad, building document-processing systems and backend data workflows for enterprise clients.",
      "My work spans <strong>Python</strong>, <strong>SmartComm</strong>, <strong>SQL</strong>, and backend integration — designing clean, modular systems that transform and validate high-volume enterprise data. I care about maintainable code, scalable design fundamentals, and getting the details right in production.",
      "Beyond backend engineering, I'm actively building skills in <strong>AI tools, data engineering and analytics</strong> — from Databricks certification to hands-on Anthropic Claude training — and I share my journey through tech &amp; career content under <strong>Vlogging With Mani</strong>."
    ],
    exploring: ["SmartComm", "AI Tools", "Data Engineering", "Automation", "Cloud Platforms"],
    features: [
      { icon: "⚙️", color: "cyan", title: "Backend Development", desc: "Building reliable, modular backend logic with Python for production systems." },
      { icon: "🗄️", color: "purple", title: "Data & SQL", desc: "Performance-optimized queries, joins, aggregations and window functions on production data." },
      { icon: "🤖", color: "pink", title: "Automation", desc: "Designing reusable modules for automation and validation, reducing manual intervention." },
      { icon: "🧠", color: "cyan", title: "AI & Data Tools", desc: "Growing expertise across Databricks, Power BI and Claude-powered AI workflows." },
      { icon: "🎥", color: "purple", title: "Content Creation", desc: "Sharing technology, career and AI insights through Vlogging With Mani." }
    ]
  },

  experience: [
    {
      icon: "briefcase",
      company: "Deloitte",
      role: "Analyst, Consulting Services",
      dateRange: "09/2025 — Present",
      location: "Hyderabad, India",
      type: "Full-time",
      desc: "Developing backend document-processing logic and SQL-driven data workflows for high-volume enterprise systems, at the intersection of automation, integration and production support.",
      responsibilities: [
        "Developed backend document-processing logic using Python to transform, validate, and structure high-volume enterprise data for production systems.",
        "Built and optimized SQL queries (joins, aggregations, window functions) to support backend data workflows and ensure high data accuracy and performance.",
        "Worked extensively with SmartComm for document composition, template logic, and data-driven content generation, integrating backend data sources into scalable document pipelines.",
        "Designed reusable Python modules for automation, validation, and backend integration, improving processing efficiency and reducing manual intervention.",
        "Applied backend design principles such as separation of concerns, modularity, and maintainability while handling sensitive business data.",
        "Supported production delivery by troubleshooting technical issues, resolving data inconsistencies, and ensuring timely completion of assigned tasks.",
        "Collaborated with cross-functional teams (developers, analysts, and stakeholders) to understand requirements and deliver step-by-step outputs aligned with scope and timelines.",
        "Demonstrated ownership and accountability by independently handling deliverables and ensuring adherence to confidentiality and compliance standards."
      ],
      environment: ["Python", "SQL", "SmartComm", "Git", "Data Pipelines", "Backend Integrations"]
    }
  ],

  skills: [
    { category: "Programming Languages", icon: "code", color: "cyan", tags: ["Python", "Java", "C", "HTML", "Data Structures"] },
    { category: "Backend & Integration", icon: "server", color: "purple", tags: ["RESTful API Concepts", "Microservice-Oriented Design", "Backend Data Integrations", "Modular & Reusable Code"] },
    { category: "Databases & Data Engineering", icon: "database", color: "pink", tags: ["SQL (MySQL)", "Joins & Aggregations", "Window Functions", "ETL (Extract, Transform, Load)", "Data Warehousing", "Data Analytics", "Data Analysis", "Power BI", "Tableau"] },
    { category: "SmartComm & Enterprise Content Mgmt", icon: "document", color: "cyan", tags: ["SmartComm", "Docuedge", "CCE-16", "CCM", "XECM", "Enterprise Content Management"] },
    { category: "AI & Machine Learning", icon: "ai", color: "purple", tags: ["Artificial Intelligence (AI)", "Machine Learning", "AI Literacy & Foundational Concepts", "Responsible & Ethical AI Adoption", "Use-Case Identification for AI in Business Workflows", "Assessing AI Capabilities & Limitations"] },
    { category: "Enterprise Platforms & Tools", icon: "tools", color: "pink", tags: ["SAP Basics", "Git & GitHub", "Docker (basics)", "Microsoft Office"] },
    { category: "Core Engineering", icon: "git", color: "cyan", tags: ["Clean & Maintainable Code", "Scalable App Design", "Debugging & Prod Issue Resolution", "Secure Data Handling"] },
    { category: "Design & Digital Marketing", icon: "design", color: "purple", tags: ["Adobe InDesign", "Adobe Photoshop", "Digital Marketing", "Social Media Marketing", "Social Influence", "Marketing"] },
    { category: "Professional & Soft Skills", icon: "people", color: "pink", tags: ["Communication", "Interpersonal Skills", "Teamwork", "Project Management", "Training & Development (HR)", "Engineering", "English"] }
  ],

  projects: [
    {
      icon: "ai",
      badges: [{ text: "AI System · Live", type: "purple" }, { text: "FEATURED", type: "outline" }],
      title: "Juliet AI — Real-Time AI Model Embedded in This Portfolio",
      desc: "A real, functioning AI assistant built into this site — not a demo. Juliet answers general and technical questions, writes and debugs code, and answers questions about this portfolio grounded in verified resume data (never invented). Powered by Google Gemini through a secure serverless proxy that keeps the API key server-side. Romeo, the chat widget, is Juliet's conversational front-end; there's also a dedicated live console to try her directly.",
      tags: ["Gemini API", "Vercel Serverless Functions", "Prompt Engineering", "Markdown Rendering", "RAG-style Grounding", "JavaScript"],
      linkText: "Try Juliet Live →",
      linkHref: "#juliet"
    },
    {
      icon: "research",
      badges: [{ text: "Machine Learning · Research", type: "purple" }, { text: "PUBLISHED", type: "outline" }],
      title: "Smart Agriculture: Crop Recommendation Using Satellite Images",
      desc: "An ML-based system using CNN and EfficientNet to recommend optimal crops for farmers using satellite imagery, remote sensing and soil/weather data. Presented at IEEE ICIRCA 2025.",
      tags: ["Python", "CNN", "EfficientNet", "Satellite Data", "SQL"],
      linkText: "View Research Paper →",
      linkHref: "#research"
    },
    {
      icon: "server",
      badges: [{ text: "Backend · Automation", type: "cyan" }],
      title: "Enterprise Document Processing Pipeline",
      desc: "Backend document-processing pipeline built at Deloitte using Python and SmartComm — validating, transforming and structuring high-volume enterprise data with reusable, modular components.",
      tags: ["Python", "SmartComm", "SQL", "Automation"],
      linkText: "View Experience →",
      linkHref: "#experience"
    },
    {
      icon: "chart",
      badges: [{ text: "Data Analytics · Power BI", type: "pink" }],
      title: "AI-Powered Interactive Dashboards",
      desc: "Built interactive, AI-assisted Power BI dashboards translating raw operational data into decision-ready visual insights — created in under 30 minutes using AI-driven workflows.",
      tags: ["Power BI", "SQL", "Data Visualization", "AI Tools"],
      linkText: "View Certificate →",
      linkHref: "#achievements"
    }
  ],

  certifications: [
    { icon: "research", color: "purple", badgeType: "purple", badgeText: "Research Publication", title: "IEEE Certificate of Presentation", org: "IEEE ICIRCA 2025 · RVS College of Engineering, Coimbatore", desc: "Presented \"Smart Agriculture: Satellite Image-based Crop Recommendation using CNN and EfficientNet\" at the 6th International Conference on Inventive Research in Computing Applications, 25–27 June 2025.", skillsCovered: [], linkHref: "assets/certificates/IEEE_ICIRCA_2025_Paper_Presentation.pdf" },
    { icon: "ai", color: "cyan", badgeType: "cyan", badgeText: "Certification", title: "Anthropic Certified: AI Fluency Framework & Foundations", org: "Anthropic · Issued Jul 2026", desc: "Credential ID 42c9k7t9tvcv", skillsCovered: ["AI literacy and foundational concepts", "Use-case identification for AI in business workflows", "Assessing AI capabilities and limitations", "Responsible AI usage", "Ethical and effective AI adoption"], linkHref: "" },
    { icon: "database", color: "pink", badgeType: "pink", badgeText: "Certification", title: "Databricks Certified Data Engineer Associate", org: "Databricks · Issued Feb 2026 · Expires Feb 2028", desc: "Credential ID 175114048", skillsCovered: [], linkHref: "" },
    { icon: "code", color: "cyan", badgeType: "cyan", badgeText: "Certification", title: "Anthropic Certified: Claude Code in Action!", org: "Anthropic", desc: "", skillsCovered: [], linkHref: "" },
    { icon: "ai", color: "purple", badgeType: "purple", badgeText: "Certification", title: "Anthropic Certified: Claude 101!", org: "Anthropic", desc: "", skillsCovered: [], linkHref: "" },
    { icon: "chart", color: "pink", badgeType: "pink", badgeText: "Workshop", title: "PowerBI Workshop — AI-Powered Dashboards", org: "OfficeMaster · Issued Sep 7, 2025", desc: "Holder can create AI-powered interactive dashboards in Power BI in under 30 minutes.", skillsCovered: [], linkHref: "assets/certificates/OfficeMaster_PowerBI_Workshop.jpeg" },
    { icon: "tools", color: "cyan", badgeType: "cyan", badgeText: "Workshop", title: "AI Tools & ChatGPT Workshop", org: "be10x · Issued Aug 1, 2026", desc: "Create presentations using AI in under 5 min, analyse data in under 30 min, code & debug using AI in under 10 min.", skillsCovered: [], linkHref: "assets/certificates/be10x_AI_Tools_Workshop.pdf" },
    { icon: "certificate", color: "purple", badgeType: "purple", badgeText: "Certification", title: "Certificate of Completion — Kalasalingam Academy Track", org: "CodeChef · Issued Sep 27, 2023", desc: "Completed all lessons and projects of Kalasalingam Academy of Research and Education. Certificate ID: b61fdf8", skillsCovered: [], linkHref: "assets/certificates/CodeChef_Kalasalingam_Academy.pdf" },
    { icon: "email", color: "pink", badgeType: "pink", badgeText: "Course", title: "Writing Email", org: "LinkedIn Learning · Completed Sep 3, 2025", desc: "Top skills: Email Etiquette, Professional Communication. Certificate ID: 96da224bf968...c9a234efa80dc", skillsCovered: [], linkHref: "assets/certificates/LinkedIn_Writing_Email.pdf" }
  ],

  research: {
    badge: "CONFERENCE PAPER",
    title: "Smart Agriculture: Satellite Image-based Crop Recommendation using CNN and EfficientNet",
    authors: "Peyyala Manideep et al. · 6th International Conference on Inventive Research in Computing Applications (ICIRCA 2025)",
    desc: "A machine learning-based system that leverages satellite imagery and remote sensing data, processed through CNN and EfficientNet architectures, to provide precision crop recommendations for farmers based on soil, weather and geospatial data.",
    keyDetails: [
      "Organised by the Department of Electrical and Electronics Engineering, RVS College of Engineering and Technology, Coimbatore, India.",
      "Presented 25–27 June 2025, IEEE Xplore Compliant (ISBN 979-8-3315-2142-4).",
      "Combines CNN-based image classification with EfficientNet for precision agricultural insights at scale."
    ],
    tags: ["Machine Learning", "CNN", "EfficientNet", "Satellite Data", "Remote Sensing", "Python"],
    linkHref: "assets/certificates/IEEE_ICIRCA_2025_Paper_Presentation.pdf"
  },

  education: {
    icon: "graduation",
    degree: "B.Tech — Computer Science & Engineering (AI & ML)",
    school: "Kalasalingam Academy of Research and Education, Madurai",
    dateRange: "Graduated 05/2025",
    extra: "CGPA — 8.84",
    projects: [
      "<strong>Smart Agriculture Management System</strong> — using Python &amp; SQL for analyzing soil, weather, and crop data.",
      "<strong>Crop Recommendation System</strong> — Developed Python-based recommendation logic with SQL-backed data integration."
    ]
  },

  content: {
    bioLine: "Under the brand <strong>Vlogging With Mani</strong>, I create content that bridges technology, career growth and real-world experiences.",
    tags: ["Technology", "Career", "Artificial Intelligence", "Lifestyle", "Student Resources"],
    socials: [
      { platform: "YouTube", icon: "youtube", color: "pink", handle: "@vlogingwithmani2003", desc: "Technology, Career & AI video content", url: "https://www.youtube.com/@vlogingwithmani2003" },
      { platform: "Instagram", icon: "instagram", color: "purple", handle: "@vloggingwithmani", desc: "Lifestyle, tech and career insights", url: "https://www.instagram.com/vloggingwithmani/" },
      { platform: "Facebook", icon: "facebook", color: "cyan", handle: "Vlogging With Mani", desc: "Community updates and highlights", url: "https://www.facebook.com/mani.royals.33/" }
    ]
  },

  // Social Analytics section — "github" and "youtube" sources auto-fetch live
  // numbers (see content-loader.js). "manual" sources show whatever the admin
  // typed into manualValue, since Instagram/Facebook don't offer a free,
  // maintenance-free public stats API for personal accounts.
  socialStats: [
    { platform: "YouTube", icon: "youtube", color: "pink", url: "https://www.youtube.com/@vlogingwithmani2003", statSource: "youtube", handle: "@vlogingwithmani2003", label: "Subscribers", manualValue: "" },
    { platform: "Instagram", icon: "instagram", color: "purple", url: "https://www.instagram.com/vloggingwithmani/", statSource: "manual", handle: "@vloggingwithmani", label: "Followers", manualValue: "" },
    { platform: "Facebook", icon: "facebook", color: "cyan", url: "https://www.facebook.com/mani.royals.33/", statSource: "manual", handle: "Vlogging With Mani", label: "Followers", manualValue: "" },
    { platform: "GitHub", icon: "github", color: "cyan", url: "https://github.com/manideeppeyyala", statSource: "github", handle: "manideeppeyyala", label: "Followers", manualValue: "" }
  ],

  contact: {
    email: "manideepyadav380@gmail.com",
    phone: "+91 70757 43204",
    phoneHref: "+917075743204",
    location: "Nellore, India",
    socialLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/peyyalamanideep/" },
      { label: "GitHub", url: "https://github.com/manideeppeyyala" },
      { label: "Email", url: "mailto:manideepyadav380@gmail.com" },
      { label: "Instagram", url: "https://www.instagram.com/vloggingwithmani/" },
      { label: "YouTube", url: "https://www.youtube.com/@vlogingwithmani2003" },
      { label: "Facebook", url: "https://www.facebook.com/mani.royals.33/" }
    ]
  },

  footer: {
    tagline: "SmartComm Developer | AI & Data Engineer | Creator"
  },

  julietSection: {
    intro: "A real AI system, not a demo — try it below. Juliet answers general and technical questions, writes and debugs code, and knows this portfolio in detail. She's honest about her limits: no live internet access, and she won't guess at personal facts she isn't sure of.",
    tags: ["Code", "Q&A", "Portfolio Knowledge", "Content Generation", "Problem Solving", "Real-Time Info (when connected)"]
  },

  bittuSection: {
    intro: "Bittu is the playful, creative member of the AI trio — general conversation, brainstorming and content generation, plus real image generation. Nothing here fakes a result: if a capability isn't connected, Bittu says so and offers what he can actually do instead.",
    tags: ["General Q&A", "Creative Writing", "Brainstorming", "Image Generation"]
  }
};
