import type { Language } from '@/types';

export interface Translation {
  nav: {
    services: string;
    work: string;
    estimator: string;
    founders: string;
    contact: string;
    bookCall: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  services: {
    title: string;
    subtitle: string;
    webTitle: string;
    webDesc: string;
    paymentTitle: string;
    paymentDesc: string;
    emailTitle: string;
    emailDesc: string;
    designTitle: string;
    designDesc: string;
    seoTitle: string;
    seoDesc: string;
    enterpriseTitle: string;
    enterpriseDesc: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    all: string;
    website: string;
    ecommerce: string;
    webapp: string;
    enterprise: string;
    viewProject: string;
  };
  founders: {
    title: string;
    subtitle: string;
    angelName: string;
    angelRole: string;
    angelQuote: string;
    todorName: string;
    todorRole: string;
    todorQuote: string;
    emailButton: string;
    bookTeamCall: string;
    mindsBehind: string;
  };
  estimator: {
    title: string;
    subtitle: string;
    step: string;
    of: string;
    next: string;
    back: string;
    submit: string;
    projectScope: string;
    brandSite: string;
    brandSiteDesc: string;
    ecommerce: string;
    ecommerceDesc: string;
    webApp: string;
    webAppDesc: string;
    automationPortal: string;
    automationPortalDesc: string;
    languageReq: string;
    singleLang: string;
    singleLangDesc: string;
    multiLang: string;
    multiLangDesc: string;
    addons: string;
    adminDashboard: string;
    adminDashboardDesc: string;
    paymentGateway: string;
    paymentGatewayDesc: string;
    emailAutomation: string;
    emailAutomationDesc: string;
    seoPackage: string;
    seoPackageDesc: string;
    yourInfo: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    budgetRange: string;
    timeline: string;
    estimatedBudget: string;
    estimatedTimeline: string;
    weeks: string;
    summary: string;
    submitLead: string;
    successTitle: string;
    successMessage: string;
    bookConsultation: string;
    close: string;
    selectAtLeastOne: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    directContacts: string;
    bookingLink: string;
    bookCallNow: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legal: string;
    impressum: string;
    privacy: string;
    terms: string;
    rights: string;
    madeWith: string;
  };
  legal: {
    impressumTitle: string;
    privacyTitle: string;
    termsTitle: string;
    close: string;
  };
  admin: {
    loginTitle: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    error: string;
    dashboard: string;
    logout: string;
    leads: string;
    portfolio: string;
    analytics: string;
    noLeads: string;
    name: string;
    projectType: string;
    budget: string;
    status: string;
    date: string;
    actions: string;
    new: string;
    contacted: string;
    meetingScheduled: string;
    closed: string;
    addPortfolio: string;
    editPortfolio: string;
    deletePortfolio: string;
    save: string;
    cancel: string;
    title: string;
    description: string;
    imageUrl: string;
    liveUrl: string;
    category: string;
    metrics: string;
    techTags: string;
    techTagsHint: string;
    totalLeads: string;
    newLeads: string;
    avgBudget: string;
    conversionRate: string;
    deleteConfirm: string;
    statusUpdated: string;
    portfolioSaved: string;
    portfolioDeleted: string;
    leadDistribution: string;
    projectTypes: string;
    recentLeads: string;
    backToSite: string;
    loadError: string;
    actionError: string;
  };
  cursor: {
    view: string;
  };
  ui: {
    showDetails: string;
    hideDetails: string;
  };
  dashboard: {
    analyticsOverview: string;
    realTimePerformance: string;
    revenue: string;
    visitors: string;
    conversion: string;
    live: string;
    lighthouse: string;
    roiGrowth: string;
    siteLive: string;
  };
}

const translations: Record<Language, Translation> = {
  DE: {
    nav: {
      services: 'Leistungen',
      work: 'Projekte',
      estimator: 'Preisrechner',
      founders: 'Team',
      contact: 'Kontakt',
      bookCall: 'Anruf buchen',
    },
    hero: {
      headline: 'Wir schmieden digitale Meisterwerke mit Höchstleistung.',
      subheadline: 'Ihr Partner für professionelle Websites, Online-Zahlungen, E-Mail-Automatisierung und umfassende digitale Betreuung.',
      ctaPrimary: 'Strategiegespräch buchen',
      ctaSecondary: 'Projektpreis berechnen',
      badge: 'Premium Digital Agentur',
      stat1: '50+',
      stat1Label: 'Projekte abgeschlossen',
      stat2: '98%',
      stat2Label: 'Kundenzufriedenheit',
      stat3: '5x',
      stat3Label: 'Faster Launch Speed',
    },
    services: {
      title: 'Leistungen, die Ihren Markt erobern',
      subtitle: 'Von Konzept bis Launch — wir liefern End-to-End Digital-Lösungen mit messbarem ROI.',
      webTitle: 'Web- & E-Commerce Engineering',
      webDesc: 'Massgeschneiderte Websites und Online-Shops mit modernster Technologie.',
      paymentTitle: 'Online Zahlungen & Checkout',
      paymentDesc: 'Stripe- und PayPal-Integrationen für reibungslose Transaktionen.',
      emailTitle: 'E-Mail-Automatisierung & CRM',
      emailDesc: 'Intelligente Workflows und automatisierte Kundenkommunikation.',
      designTitle: 'UI/UX Design & Micro-Animationen',
      designDesc: 'Hochwertige Benutzeroberflächen mit durchdachten Interaktionen.',
      seoTitle: 'SEO & Performance-Optimierung',
      seoDesc: 'Maximale Geschwindigkeit und perfekte Google-Platzierungen.',
      enterpriseTitle: 'Enterprise Software Engineering',
      enterpriseDesc: 'Skalierbare Systeme für anspruchsvolle Geschäftsanforderungen.',
    },
    portfolio: {
      title: 'Ausgewählte Projekte',
      subtitle: 'Eine Auswahl unserer erfolgreichsten digitalen Transformationen.',
      all: 'Alle',
      website: 'Websites',
      ecommerce: 'E-Commerce',
      webapp: 'Web Apps',
      enterprise: 'Enterprise',
      viewProject: 'Projekt ansehen',
    },
    founders: {
      title: 'Die Köpfe hinter WebForge',
      subtitle: 'Ein Team aus Vertriebs- und Technologie-Experten mit Leidenschaft für digitale Exzellenz.',
      angelName: 'Angel Kodzhebashev',
      angelRole: 'Sales Manager',
      angelQuote: 'Vertrieb ist keine Abteilung — es ist die Seele jedes wachsenden Unternehmens.',
      todorName: 'Todor Shopov',
      todorRole: 'IT Operative Manager',
      todorQuote: 'Technologie soll Probleme lösen, nicht welche schaffen. Einfachheit ist die höchste Form der Raffinesse.',
      emailButton: 'E-Mail senden',
      bookTeamCall: 'Gespräch mit dem Team buchen',
      mindsBehind: 'Das Team',
    },
    estimator: {
      title: 'Projektrechner',
      subtitle: 'Berechnen Sie Ihr Budget und Ihren Zeitplan in wenigen Klicks.',
      step: 'Schritt',
      of: 'von',
      next: 'Weiter',
      back: 'Zurück',
      submit: 'Anfrage senden',
      projectScope: 'Welches Projekt planen Sie?',
      brandSite: 'Marken-Website',
      brandSiteDesc: 'Professionelle Unternehmens- oder Marken-Präsenz',
      ecommerce: 'E-Commerce Shop',
      ecommerceDesc: 'Online-Shop mit Produktkatalog und Checkout',
      webApp: 'Web-Applikation',
      webAppDesc: 'Interaktive Anwendung mit Benutzerkonten',
      automationPortal: 'Automatisierungs-Portal',
      automationPortalDesc: 'Workflow-Automatisierung und Integrationen',
      languageReq: 'Sprach-Anforderungen',
      singleLang: 'Einsprachig',
      singleLangDesc: 'Eine Sprache nach Wahl',
      multiLang: 'Mehrsprachig (DE/EN/BG)',
      multiLangDesc: 'Vollständige Mehrsprachigkeit',
      addons: 'Zusätzliche Features',
      adminDashboard: 'Admin-Dashboard',
      adminDashboardDesc: 'Verwaltungsoberfläche für Inhalte und Daten',
      paymentGateway: 'Zahlungs-Gateway',
      paymentGatewayDesc: 'Stripe / PayPal Integration',
      emailAutomation: 'E-Mail-Automatisierung',
      emailAutomationDesc: 'Automatisierte Workflows und Newsletter',
      seoPackage: 'SEO-Paket',
      seoPackageDesc: 'Suchmaschinenoptimierung und Performance',
      yourInfo: 'Ihre Kontaktdaten',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon (optional)',
      message: 'Nachricht (optional)',
      messagePlaceholder: 'Erzählen Sie uns mehr über Ihr Projekt...',
      budgetRange: 'Geschätztes Budget',
      timeline: 'Geschätzter Zeitplan',
      estimatedBudget: 'Ihr Projektbudget',
      estimatedTimeline: 'Geschätzte Dauer',
      weeks: 'Wochen',
      summary: 'Zusammenfassung',
      submitLead: 'Anfrage absenden',
      successTitle: 'Anfrage gesendet!',
      successMessage: 'Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns in Kürze.',
      bookConsultation: 'Kostenloses Beratungsgespräch buchen',
      close: 'Schliessen',
      selectAtLeastOne: 'Bitte wählen Sie mindestens eine Option',
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Sprechen Sie direkt mit unserem Team oder buchen Sie ein Strategy-Call.',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon (optional)',
      service: 'Service',
      servicePlaceholder: 'Welchen Service benötigen Sie?',
      message: 'Nachricht',
      messagePlaceholder: 'Wie können wir Ihnen helfen?',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Vielen Dank! Ihre Nachricht wurde gesendet.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      directContacts: 'Direkte Kontakte',
      bookingLink: 'Direkt einen Termin buchen',
      bookCallNow: 'Anruf buchen',
    },
    footer: {
      tagline: 'Wir schmieden digitale Meisterwerke, die skalieren.',
      quickLinks: 'Schnellzugriff',
      legal: 'Rechtliches',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
      rights: 'Alle Rechte vorbehalten.',
      madeWith: 'Mit Präzision gefertigt von WebForge',
    },
    legal: {
      impressumTitle: 'Impressum',
      privacyTitle: 'Datenschutzerklärung',
      termsTitle: 'AGB — Allgemeine Geschäftsbedingungen',
      close: 'Schliessen',
    },
    admin: {
      loginTitle: 'Admin Anmeldung',
      email: 'E-Mail',
      password: 'Passwort',
      signIn: 'Anmelden',
      signingIn: 'Anmeldung...',
      error: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.',
      dashboard: 'Dashboard',
      logout: 'Abmelden',
      leads: 'Anfragen',
      portfolio: 'Portfolio',
      analytics: 'Analytics',
      noLeads: 'Keine Anfragen vorhanden',
      name: 'Name',
      projectType: 'Projekttyp',
      budget: 'Budget',
      status: 'Status',
      date: 'Datum',
      actions: 'Aktionen',
      new: 'Neu',
      contacted: 'Kontaktiert',
      meetingScheduled: 'Termin gesetzt',
      closed: 'Abgeschlossen',
      addPortfolio: 'Portfolio-Eintrag hinzufügen',
      editPortfolio: 'Portfolio-Eintrag bearbeiten',
      deletePortfolio: 'Löschen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      title: 'Titel',
      description: 'Beschreibung',
      imageUrl: 'Bild URL',
      liveUrl: 'Live URL',
      category: 'Kategorie',
      metrics: 'Kennzahl',
      techTags: 'Tech-Tags',
      techTagsHint: 'Durch Komma trennen',
      totalLeads: 'Anfragen gesamt',
      newLeads: 'Neue Anfragen',
      avgBudget: 'Ø Budget',
      conversionRate: 'Conversion Rate',
      deleteConfirm: 'Möchten Sie diesen Eintrag wirklich löschen?',
      statusUpdated: 'Status aktualisiert',
      portfolioSaved: 'Portfolio-Eintrag gespeichert',
      portfolioDeleted: 'Portfolio-Eintrag gelöscht',
      leadDistribution: 'Anfragen-Verteilung',
      projectTypes: 'Projekttypen',
      recentLeads: 'Neueste Anfragen',
      backToSite: 'Zurück zur Website',
      loadError: 'Die Admin-Daten konnten nicht geladen werden.',
      actionError: 'Die Aktion konnte nicht gespeichert werden.',
    },
    cursor: {
      view: 'Ansehen',
    },
    ui: {
      showDetails: 'Details anzeigen',
      hideDetails: 'Details ausblenden',
    },
    dashboard: {
      analyticsOverview: 'Analytics Übersicht',
      realTimePerformance: 'Echtzeit-Leistung',
      revenue: 'Umsatz',
      visitors: 'Besucher',
      conversion: 'Konversion',
      live: 'Live',
      lighthouse: 'Lighthouse',
      roiGrowth: 'ROI Wachstum',
      siteLive: 'Website live auf web-forge.dev',
    },
  },
  EN: {
    nav: {
      services: 'Services',
      work: 'Work',
      estimator: 'Estimator',
      founders: 'Team',
      contact: 'Contact',
      bookCall: 'Book Call',
    },
    hero: {
      headline: 'We Forge Digital Masterpieces That Scale.',
      subheadline: 'Your partner for professional websites, online payments, email automation, and full digital care.',
      ctaPrimary: 'Schedule Strategy Call',
      ctaSecondary: 'Calculate Project Price',
      badge: 'Premium Digital Agency',
      stat1: '50+',
      stat1Label: 'Projects Delivered',
      stat2: '98%',
      stat2Label: 'Client Satisfaction',
      stat3: '5x',
      stat3Label: 'Faster Launch Speed',
    },
    services: {
      title: 'Services That Conquer Your Market',
      subtitle: 'From concept to launch — we deliver end-to-end digital solutions with measurable ROI.',
      webTitle: 'Web & E-Commerce Engineering',
      webDesc: 'Custom websites and online shops built with cutting-edge technology.',
      paymentTitle: 'Online Payments & Checkout',
      paymentDesc: 'Stripe and PayPal integrations for seamless transactions.',
      emailTitle: 'Email Automation & CRM',
      emailDesc: 'Intelligent workflows and automated customer communication.',
      designTitle: 'UI/UX Design & Micro-Animations',
      designDesc: 'Premium interfaces with thoughtful interactions and motion.',
      seoTitle: 'SEO & Performance Optimization',
      seoDesc: 'Maximum speed and top Google rankings.',
      enterpriseTitle: 'Enterprise Software Engineering',
      enterpriseDesc: 'Scalable systems for demanding business requirements.',
    },
    portfolio: {
      title: 'Featured Work',
      subtitle: 'A selection of our most successful digital transformations.',
      all: 'All',
      website: 'Websites',
      ecommerce: 'E-Commerce',
      webapp: 'Web Apps',
      enterprise: 'Enterprise',
      viewProject: 'View Project',
    },
    founders: {
      title: 'The Minds Behind WebForge',
      subtitle: 'A team of sales and technology experts passionate about digital excellence.',
      angelName: 'Angel Kodzhebashev',
      angelRole: 'Sales Manager',
      angelQuote: 'Sales is not a department — it is the soul of every growing business.',
      todorName: 'Todor Shopov',
      todorRole: 'IT Operative Manager',
      todorQuote: 'Technology should solve problems, not create them. Simplicity is the highest form of sophistication.',
      emailButton: 'Send Email',
      bookTeamCall: 'Book a Call with the Team',
      mindsBehind: 'The Team',
    },
    estimator: {
      title: 'Project Estimator',
      subtitle: 'Calculate your budget and timeline in just a few clicks.',
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      submit: 'Submit Request',
      projectScope: 'What project are you planning?',
      brandSite: 'Brand Website',
      brandSiteDesc: 'Professional company or brand presence',
      ecommerce: 'E-Commerce Shop',
      ecommerceDesc: 'Online store with product catalog and checkout',
      webApp: 'Web Application',
      webAppDesc: 'Interactive app with user accounts',
      automationPortal: 'Automation Portal',
      automationPortalDesc: 'Workflow automation and integrations',
      languageReq: 'Language Requirements',
      singleLang: 'Single Language',
      singleLangDesc: 'One language of your choice',
      multiLang: 'Multi-language (DE/EN/BG)',
      multiLangDesc: 'Full multi-language support',
      addons: 'Additional Features',
      adminDashboard: 'Admin Dashboard',
      adminDashboardDesc: 'Management interface for content and data',
      paymentGateway: 'Payment Gateway',
      paymentGatewayDesc: 'Stripe / PayPal integration',
      emailAutomation: 'Email Automation',
      emailAutomationDesc: 'Automated workflows and newsletters',
      seoPackage: 'SEO Package',
      seoPackageDesc: 'Search engine optimization and performance',
      yourInfo: 'Your Contact Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      message: 'Message (optional)',
      messagePlaceholder: 'Tell us more about your project...',
      budgetRange: 'Estimated Budget',
      timeline: 'Estimated Timeline',
      estimatedBudget: 'Your Project Budget',
      estimatedTimeline: 'Estimated Duration',
      weeks: 'weeks',
      summary: 'Summary',
      submitLead: 'Submit Request',
      successTitle: 'Request Submitted!',
      successMessage: 'Thank you! We have received your request and will get back to you shortly.',
      bookConsultation: 'Book Your Free Consultation Now',
      close: 'Close',
      selectAtLeastOne: 'Please select at least one option',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Speak directly with our team or book a strategy call.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      service: 'Service',
      servicePlaceholder: 'Which service do you need?',
      message: 'Message',
      messagePlaceholder: 'How can we help you?',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent.',
      error: 'An error occurred. Please try again.',
      directContacts: 'Direct Contacts',
      bookingLink: 'Book a meeting directly',
      bookCallNow: 'Book a Call',
    },
    footer: {
      tagline: 'We forge digital masterpieces that scale.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      impressum: 'Impressum',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      rights: 'All rights reserved.',
      madeWith: 'Crafted with precision by WebForge',
    },
    legal: {
      impressumTitle: 'Impressum — Legal Notice',
      privacyTitle: 'Datenschutzerklärung — Privacy Policy',
      termsTitle: 'AGB — Terms & Conditions',
      close: 'Close',
    },
    admin: {
      loginTitle: 'Admin Login',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      error: 'Login failed. Please check your credentials.',
      dashboard: 'Dashboard',
      logout: 'Logout',
      leads: 'Leads',
      portfolio: 'Portfolio',
      analytics: 'Analytics',
      noLeads: 'No leads yet',
      name: 'Name',
      projectType: 'Project Type',
      budget: 'Budget',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      new: 'New',
      contacted: 'Contacted',
      meetingScheduled: 'Meeting Scheduled',
      closed: 'Closed',
      addPortfolio: 'Add Portfolio Item',
      editPortfolio: 'Edit Portfolio Item',
      deletePortfolio: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      title: 'Title',
      description: 'Description',
      imageUrl: 'Image URL',
      liveUrl: 'Live URL',
      category: 'Category',
      metrics: 'Metrics',
      techTags: 'Tech Tags',
      techTagsHint: 'Separate with commas',
      totalLeads: 'Total Leads',
      newLeads: 'New Leads',
      avgBudget: 'Avg Budget',
      conversionRate: 'Conversion Rate',
      deleteConfirm: 'Are you sure you want to delete this item?',
      statusUpdated: 'Status updated',
      portfolioSaved: 'Portfolio item saved',
      portfolioDeleted: 'Portfolio item deleted',
      leadDistribution: 'Lead Distribution',
      projectTypes: 'Project Types',
      recentLeads: 'Recent Leads',
      backToSite: 'Back to Site',
      loadError: 'Admin data could not be loaded.',
      actionError: 'The action could not be saved.',
    },
    cursor: {
      view: 'View',
    },
    ui: {
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
    },
    dashboard: {
      analyticsOverview: 'Analytics Overview',
      realTimePerformance: 'Real-time performance',
      revenue: 'Revenue',
      visitors: 'Visitors',
      conversion: 'Conversion',
      live: 'Live',
      lighthouse: 'Lighthouse',
      roiGrowth: 'ROI Growth',
      siteLive: 'Site live at web-forge.dev',
    },
  },
  BG: {
    nav: {
      services: 'Услуги',
      work: 'Проекти',
      estimator: 'Калкулатор',
      founders: 'Екип',
      contact: 'Контакт',
      bookCall: 'Запази обаждане',
    },
    hero: {
      headline: 'Създаваме дигитални шедьоври, които се скалират.',
      subheadline: 'Вашият партньор за професионални уебсайтове, онлайн плащания, имейл автоматизация и цялостна дигитална поддръжка.',
      ctaPrimary: 'Запази стратегическо обаждане',
      ctaSecondary: 'Изчисли цена на проекта',
      badge: 'Премиум Цифрова Агенция',
      stat1: '50+',
      stat1Label: 'Завършени проекти',
      stat2: '98%',
      stat2Label: 'Удовлетвореност на клиентите',
      stat3: '5x',
      stat3Label: 'По-бързо стартиране',
    },
    services: {
      title: 'Услуги, които завладяват вашия пазар',
      subtitle: 'От концепция до старт — доставяме пълни дигитални решения с измерим ROI.',
      webTitle: 'Уеб и Е-Комерс Инженеринг',
      webDesc: 'Персонализирани уебсайтове и онлайн магазини с най-модерни технологии.',
      paymentTitle: 'Онлайн плащания и чекаут',
      paymentDesc: 'Stripe и PayPal интеграции за безпроблемни транзакции.',
      emailTitle: 'Имейл Автоматизация & CRM',
      emailDesc: 'Интелигентни работни процеси и автоматизирана комуникация с клиентите.',
      designTitle: 'UI/UX Дизайн & Микро-Анимации',
      designDesc: 'Премиум интерфейси с прецизни взаимодействия и анимации.',
      seoTitle: 'SEO & Оптимизация на Производителността',
      seoDesc: 'Максимална скорост и топ позиции в Google.',
      enterpriseTitle: 'Enterprise Софтуерен Инженеринг',
      enterpriseDesc: 'Мащабируеми системи за взискателни бизнес нужди.',
    },
    portfolio: {
      title: 'Избрани Проекти',
      subtitle: 'Подбор от най-успешните ни дигитални трансформации.',
      all: 'Всички',
      website: 'Уебсайтове',
      ecommerce: 'Е-Комерс',
      webapp: 'Уеб Приложения',
      enterprise: 'Enterprise',
      viewProject: 'Виж проект',
    },
    founders: {
      title: 'Разумът зад WebForge',
      subtitle: 'Екип от експерти по продажби и технологии, обединени от страст към дигитално съвършенство.',
      angelName: 'Ангел Коджебашев',
      angelRole: 'Мениджър Продажби',
      angelQuote: 'Продажбите не са отдел — те са душата на всеки растящ бизнес.',
      todorName: 'Тодор Шопов',
      todorRole: 'IT Оперативен Мениджър',
      todorQuote: 'Технологията трябва да решава проблеми, а не да създава. Простотата е най-висшата форма на изящество.',
      emailButton: 'Изпрати имейл',
      bookTeamCall: 'Запази разговор с екипа',
      mindsBehind: 'Екипът',
    },
    estimator: {
      title: 'Калкулатор на Проект',
      subtitle: 'Изчислете бюджета и срока само с няколко клика.',
      step: 'Стъпка',
      of: 'от',
      next: 'Напред',
      back: 'Назад',
      submit: 'Изпрати запитване',
      projectScope: 'Какъв проект планирате?',
      brandSite: 'Бранд Уебсайт',
      brandSiteDesc: 'Професионално присъствие на компания или бранд',
      ecommerce: 'Е-Комерс Магазин',
      ecommerceDesc: 'Онлайн магазин с продуктов каталог и чекаут',
      webApp: 'Уеб Приложение',
      webAppDesc: 'Интерактивно приложение с потребителски акаунти',
      automationPortal: 'Портал за Автоматизация',
      automationPortalDesc: 'Автоматизация на работни процеси и интеграции',
      languageReq: 'Езикови Изисквания',
      singleLang: 'Едноезичен',
      singleLangDesc: 'Един език по ваш избор',
      multiLang: 'Многоезичен (DE/EN/BG)',
      multiLangDesc: 'Пълна многоезична поддръжка',
      addons: 'Допълнителни Функции',
      adminDashboard: 'Админ Панел',
      adminDashboardDesc: 'Интерфейс за управление на съдържание и данни',
      paymentGateway: 'Платежен Портал',
      paymentGatewayDesc: 'Stripe / PayPal интеграция',
      emailAutomation: 'Имейл Автоматизация',
      emailAutomationDesc: 'Автоматизирани работни процеси и бюлетини',
      seoPackage: 'SEO Пакет',
      seoPackageDesc: 'Оптимизация за търсачки и производителност',
      yourInfo: 'Вашите контактни данни',
      name: 'Име',
      email: 'Имейл',
      phone: 'Телефон (по желание)',
      message: 'Съобщение (по желание)',
      messagePlaceholder: 'Разкажете ни повече за вашия проект...',
      budgetRange: 'Очакван Бюджет',
      timeline: 'Очакван Срок',
      estimatedBudget: 'Вашият Проектен Бюджет',
      estimatedTimeline: 'Очаквана Продължителност',
      weeks: 'седмици',
      summary: 'Резюме',
      submitLead: 'Изпрати запитване',
      successTitle: 'Запитването е изпратено!',
      successMessage: 'Благодарим! Получихме вашето запитване и ще се свържем с вас скоро.',
      bookConsultation: 'Запазете безплатна консултация сега',
      close: 'Затвори',
      selectAtLeastOne: 'Моля, изберете поне една опция',
    },
    contact: {
      title: 'Свържете се с нас',
      subtitle: 'Говорете директно с екипа ни или запазете стратегическо обаждане.',
      name: 'Име',
      email: 'Имейл',
      phone: 'Телефон (по желание)',
      service: 'Услуга',
      servicePlaceholder: 'Коя услуга ви е необходима?',
      message: 'Съобщение',
      messagePlaceholder: 'Как можем да ви помогнем?',
      send: 'Изпрати съобщение',
      sending: 'Изпращане...',
      success: 'Благодарим! Съобщението ви е изпратено.',
      error: 'Възникна грешка. Моля, опитайте отново.',
      directContacts: 'Директни контакти',
      bookingLink: 'Запазете среща директно',
      bookCallNow: 'Запази обаждане',
    },
    footer: {
      tagline: 'Създаваме дигитални шедьоври, които се скалират.',
      quickLinks: 'Бързи връзки',
      legal: 'Правни',
      impressum: 'Импресум',
      privacy: 'Защита на данните',
      terms: 'Общи условия',
      rights: 'Всички права запазени.',
      madeWith: 'Изработено с прецизност от WebForge',
    },
    legal: {
      impressumTitle: 'Импресум — Правно уведомление',
      privacyTitle: 'Политика за поверителност',
      termsTitle: 'Общи условия',
      close: 'Затвори',
    },
    admin: {
      loginTitle: 'Админ Вход',
      email: 'Имейл',
      password: 'Парола',
      signIn: 'Вход',
      signingIn: 'Влизане...',
      error: 'Входът неуспешен. Моля, проверете данните си.',
      dashboard: 'Табло',
      logout: 'Изход',
      leads: 'Запитвания',
      portfolio: 'Портфолио',
      analytics: 'Аналитика',
      noLeads: 'Няма запитвания',
      name: 'Име',
      projectType: 'Тип проект',
      budget: 'Бюджет',
      status: 'Статус',
      date: 'Дата',
      actions: 'Действия',
      new: 'Ново',
      contacted: 'Контакт',
      meetingScheduled: 'Терминът е зададен',
      closed: 'Затворено',
      addPortfolio: 'Добави портфолио',
      editPortfolio: 'Редактирай портфолио',
      deletePortfolio: 'Изтрий',
      save: 'Запази',
      cancel: 'Отказ',
      title: 'Заглавие',
      description: 'Описание',
      imageUrl: 'URL на изображение',
      liveUrl: 'Live URL',
      category: 'Категория',
      metrics: 'Метрики',
      techTags: 'Технологии',
      techTagsHint: 'Разделяйте със запетая',
      totalLeads: 'Общо запитвания',
      newLeads: 'Нови запитвания',
      avgBudget: 'Среден бюджет',
      conversionRate: 'Конверсия',
      deleteConfirm: 'Сигурни ли сте, че искате да изтриете този запис?',
      statusUpdated: 'Статусът е актуализиран',
      portfolioSaved: 'Портфолиото е запазено',
      portfolioDeleted: 'Портфолиото е изтрито',
      leadDistribution: 'Разпределение на запитванията',
      projectTypes: 'Типове проекти',
      recentLeads: 'Скорошни запитвания',
      backToSite: 'Обратно към сайта',
      loadError: 'Админ данните не могат да бъдат заредени.',
      actionError: 'Действието не може да бъде запазено.'
    },
    cursor: {
      view: 'Виж',
    },
    ui: {
      showDetails: 'Виж детайли',
      hideDetails: 'Скрий детайли',
    },
    dashboard: {
      analyticsOverview: 'Аналитичен преглед',
      realTimePerformance: 'Производителност на живо',
      revenue: 'Приходи',
      visitors: 'Посетители',
      conversion: 'Конверсия',
      live: 'На живо',
      lighthouse: 'Lighthouse',
      roiGrowth: 'Ръст на ROI',
      siteLive: 'Сайтът е активен на web-forge.dev',
    },
  },
};

export function getTranslation(lang: Language): Translation {
  return translations[lang];
}

export { translations };
