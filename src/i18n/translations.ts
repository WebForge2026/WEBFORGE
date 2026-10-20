import type { Language } from '@/types';

export interface Translation {
  nav: {
    services: string;
    process: string;
    work: string;
    industries: string;
    estimator: string;
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
    liveBookings: string;
    bookingReceived: string;
    appointmentBooked: string;
    orderPlaced: string;
    trialRequested: string;
    yourWebsite: string;
    directToYou: string;
    booking: string;
    zeroCommission: string;
    bookingConfirmed: string;
    clientBooks: string;
    instantConfirmation: string;
    notifiedAutomatically: string;
    runningAutomatically: string;
    foundOnGoogle: string;
    website: string;
    bookings: string;
    payments: string;
    emails: string;
    seo: string;
    mobile: string;
    reviews: string;
    analytics: string;
  }; 
  process: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  industries: {
    title: string;
    subtitle: string;
    gastronomy: string;
    gastronomyBenefit1: string;
    gastronomyBenefit2: string;
    gastronomyBenefit3: string;
    barber: string;
    barberBenefit1: string;
    barberBenefit2: string;
    barberBenefit3: string;
    fitness: string;
    fitnessBenefit1: string;
    fitnessBenefit2: string;
    fitnessBenefit3: string;
    localServices: string;
    localServicesBenefit1: string;
    localServicesBenefit2: string;
    localServicesBenefit3: string;
    reservationTitle: string;
    noCommission: string;
    reserveFree: string;
    appointmentTitle: string;
    openAllDay: string;
    pickTime: string;
    trialTitle: string;
    requestFromPhone: string;
    spots: string;
    claimTrial: string;
    googleSearch: string;
    rankOne: string;
    openNow: string;
    callToday: string;
    away: string;
    requestQuote: string;
    today: string;
    tomorrow: string;
    monday: string;
    wednesday: string;
    saturday: string;
    fadeCut: string;
    beardTrim: string;
    hotTowelShave: string;
    reviewsCount: string;
    customersNearYou: string;
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
      services: 'Vorteile',
      process: 'Ablauf',
      work: 'Projekte',
      industries: 'Branchen',
      estimator: 'Preisrechner',
      contact: 'Kontakt',
      bookCall: 'Kostenlose Beratung',
    },
    hero: {
      headline: 'Ihre neue Website. Einfach. Schnell. Gebaut für mehr Kunden.',
      subheadline: 'Wir entwerfen und bauen Websites für Restaurants, Barbershops, Fitnessstudios und lokale Unternehmen — ganz ohne technischen Stress.',
      ctaPrimary: 'Kostenlose Beratung buchen',
      ctaSecondary: 'Projektpreis berechnen',
      badge: 'Websites für lokale Unternehmen',
      stat1: '50+',
      stat1Label: 'Projekte abgeschlossen',
      stat2: '98%',
      stat2Label: 'Zufriedene Kunden',
      stat3: '2-6',
      stat3Label: 'Wochen bis Launch',
    },
    services: {
      title: 'Was Ihre Website für Sie tun kann',
      subtitle: 'Klare Vorteile, die Ihrem Unternehmen mehr Kunden bringen.',
      webTitle: 'Websites & Online-Shops',
      webDesc: 'Professionelle Websites, die auf jedem Gerät perfekt funktionieren.',
      paymentTitle: 'Online-Buchungen & Zahlungen',
      paymentDesc: 'Reservierungen und Zahlungen direkt über Ihre Website.',
      emailTitle: 'Automatische Termin-Erinnerungen',
      emailDesc: 'Sparen Sie Zeit mit automatisierten E-Mails an Ihre Kunden.',
      designTitle: 'Schräges Design',
      designDesc: 'Ein Look, der zu Ihrem Geschäft passt und beeindruckt.',
      seoTitle: 'Auf Google gefunden werden',
      seoDesc: 'Mehr lokale Kunden finden Sie online — ganz automatisch.',
      enterpriseTitle: 'Komplett-Paket für Ihr Unternehmen',
      enterpriseDesc: 'Alles aus einer Hand: Website, Buchungen, Zahlungen und mehr.',
      liveBookings: 'Neue Buchungen',
      bookingReceived: 'Neue Buchung — Tisch für 4',
      appointmentBooked: 'Termin gebucht — Haarschnitt um 15:00',
      orderPlaced: 'Bestellung eingegangen — €48,50',
      trialRequested: 'Probetraining angefragt — Fitnessstudio',
      yourWebsite: 'Ihre Website',
      directToYou: 'Direkt zu Ihnen',
      booking: 'Buchung',
      zeroCommission: '€0 Provision',
      bookingConfirmed: 'Buchung bestätigt',
      clientBooks: 'Kunde bucht einen Termin',
      instantConfirmation: 'Sofortige Bestätigung',
      notifiedAutomatically: 'Sie werden automatisch benachrichtigt',
      runningAutomatically: 'Läuft automatisch',
      foundOnGoogle: 'Auf Google gefunden',
      website: 'Website',
      bookings: 'Buchungen',
      payments: 'Zahlungen',
      emails: 'E-Mails',
      seo: 'Google-Sichtbarkeit',
      mobile: 'Mobil optimiert',
      reviews: 'Bewertungen',
      analytics: 'Auswertung',
    },
    process: {
      title: 'So einfach geht das',
      subtitle: 'Vier Schritte von der ersten Idee bis zu Ihrer neuen Website.',
      step1Title: 'Kennenlernen',
      step1Desc: 'Ein kurzes Gespräch über Ihre Wünsche und Ziele.',
      step2Title: 'Design & Bau',
      step2Desc: 'Wir übernehmen die ganze Arbeit und bauen Ihre Website.',
      step3Title: 'Freigabe',
      step3Desc: 'Wir zeigen Ihnen das fertige Ergebnis. Erst mit Ihrem 100% Okay geht es online.',
      step4Title: 'Online & Wachstum',
      step4Desc: 'Ihre Website geht live und bringt sofort neue Kunden.',
    },
    industries: {
      title: 'Gebaut für Ihre Branche',
      subtitle: 'Wir kennen die Bedürfnisse Ihres Geschäfts — genau darauf spezialisiert.',
      gastronomy: 'Gastro & Bars',
      gastronomyBenefit1: 'Online-Tischreservierungen ohne Provision',
      gastronomyBenefit2: 'Digitale Speisekarte zum Teilen per Link',
      gastronomyBenefit3: 'Bestellungen direkt über Ihre Website',
      barber: 'Barber & Beauty',
      barberBenefit1: 'Online-Terminbuchung rund um die Uhr',
      barberBenefit2: 'Service-Menü und Preisliste online',
      barberBenefit3: 'Instagram-Feed direkt auf der Website',
      fitness: 'Fitness & Studios',
      fitnessBenefit1: 'Probetraining-Anfragen direkt vom Handy',
      fitnessBenefit2: 'Kursplan und Trainer-Profile online',
      fitnessBenefit3: 'Mitgliedschaften und Zahlungen online',
      localServices: 'Lokale Dienste',
      localServicesBenefit1: 'Auf Google gefunden — von Kunden in Ihrer Nähe',
      localServicesBenefit2: 'Anfragen und Termine direkt online',
      localServicesBenefit3: 'Bewertungen und Referenzen auf einen Blick',
      reservationTitle: 'Tisch reservieren',
      noCommission: 'Keine Provision · Direkt zu Ihnen',
      reserveFree: 'Reservieren — kostenlos',
      appointmentTitle: 'Termin buchen',
      openAllDay: 'Online rund um die Uhr',
      pickTime: 'Zeit auswählen',
      trialTitle: 'Kostenloses Probetraining',
      requestFromPhone: 'Direkt vom Handy anfragen',
      spots: 'Plätze',
      claimTrial: 'Probetraining sichern',
      googleSearch: 'Google-Suche',
      rankOne: 'Platz 1',
      openNow: 'Jetzt geöffnet',
      callToday: 'Heute anrufen',
      away: 'entfernt',
      requestQuote: 'Angebot anfragen',
      today: 'Heute',
      tomorrow: 'Morgen',
      monday: 'Montag',
      wednesday: 'Mittwoch',
      saturday: 'Samstag',
      fadeCut: 'Fade Cut',
      beardTrim: 'Bart trimmen',
      hotTowelShave: 'Rasur mit heißem Handtuch',
      reviewsCount: '48 Bewertungen',
      customersNearYou: 'Kunden in Ihrer Nähe',
    },
    portfolio: {
      title: 'Unsere Projekte',
      subtitle: 'Realisierte Websites für lokale Unternehmen.',
      all: 'Alle',
      website: 'Websites',
      ecommerce: 'E-Commerce',
      webapp: 'Web Apps',
      enterprise: 'Enterprise',
      viewProject: 'Projekt ansehen',
    },
    founders: {
      title: 'Das Team hinter WebForge',
      subtitle: 'Wir bauen Websites, die Ihr Geschäft nach vorn bringen.',
      angelName: 'Angel Kodzhebashev',
      angelRole: 'Sales Manager',
      angelQuote: 'Gute Verkäufe kommen aus echtem Interesse am Kunden.',
      todorName: 'Todor Shopov',
      todorRole: 'IT Operative Manager',
      todorQuote: 'Technik soll einfach sein. Weniger Komplexität, mehr Ergebnis.',
      emailButton: 'E-Mail senden',
      bookTeamCall: 'Kostenlose Beratung buchen',
      mindsBehind: 'Das Team',
    },
    estimator: {
      title: 'Preisrechner',
      subtitle: 'Budget und Dauer in wenigen Klicks berechnen.',
      step: 'Schritt',
      of: 'von',
      next: 'Weiter',
      back: 'Zurück',
      submit: 'Anfrage senden',
      projectScope: 'Welches Projekt planen Sie?',
      brandSite: 'Marken-Website',
      brandSiteDesc: 'Professionelle Unternehmens-Präsenz',
      ecommerce: 'Online-Shop',
      ecommerceDesc: 'Produktkatalog und Checkout',
      webApp: 'Web-App',
      webAppDesc: 'Interaktive Anwendung mit Benutzerkonten',
      automationPortal: 'Automatisierung',
      automationPortalDesc: 'Workflows und Integrationen',
      languageReq: 'Welche Sprachen brauchen Sie?',
      singleLang: 'Einsprachig',
      singleLangDesc: 'Eine Sprache nach Wahl',
      multiLang: 'Mehrsprachig (DE/EN/BG)',
      multiLangDesc: 'Volle Mehrsprachigkeit',
      addons: 'Zusätzliche Features',
      adminDashboard: 'Admin-Bereich',
      adminDashboardDesc: 'Inhalte selbst verwalten',
      paymentGateway: 'Online-Zahlungen',
      paymentGatewayDesc: 'Stripe / PayPal Integration',
      emailAutomation: 'E-Mail-Automatisierung',
      emailAutomationDesc: 'Automatische Kunden-E-Mails',
      seoPackage: 'Google-Sichtbarkeit',
      seoPackageDesc: 'Lokale Suchmaschinen-Optimierung',
      yourInfo: 'Ihre Kontaktdaten',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon (optional)',
      message: 'Nachricht (optional)',
      messagePlaceholder: 'Erzählen Sie uns kurz über Ihr Projekt...',
      budgetRange: 'Geschätztes Budget',
      timeline: 'Geschätzter Zeitplan',
      estimatedBudget: 'Ihr Projektbudget',
      estimatedTimeline: 'Geschätzte Dauer',
      weeks: 'Wochen',
      summary: 'Zusammenfassung',
      submitLead: 'Anfrage absenden',
      successTitle: 'Anfrage gesendet!',
      successMessage: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
      bookConsultation: 'Kostenlose Beratung buchen',
      close: 'Schliessen',
      selectAtLeastOne: 'Bitte wählen Sie mindestens eine Option',
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Schreiben Sie uns oder buchen Sie direkt ein kostenloses Gespräch.',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon (optional)',
      service: 'Was brauchen Sie?',
      servicePlaceholder: 'Eine Website, einen Shop, etwas anderes?',
      message: 'Nachricht',
      messagePlaceholder: 'Wie können wir Ihnen helfen?',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Vielen Dank! Ihre Nachricht wurde gesendet.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      directContacts: 'Direkte Kontakte',
      bookingLink: 'Termin direkt buchen',
      bookCallNow: 'Kostenlose Beratung',
    },
    footer: {
      tagline: 'Websites für lokale Unternehmen — einfach, schnell, erfolgreich.',
      quickLinks: 'Schnellzugriff',
      legal: 'Rechtliches',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
      rights: 'Alle Rechte vorbehalten.',
      madeWith: 'Mit Sorgfalt gefertigt von WebForge',
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
      services: 'Benefits',
      process: 'How It Works',
      work: 'Work',
      industries: 'Industries',
      estimator: 'Estimator',
      contact: 'Contact',
      bookCall: 'Free Consultation',
    },
    hero: {
      headline: 'Your New Website. Simple. Fast. Built to Get You Clients.',
      subheadline: 'We design and build high-converting websites for restaurants, barbershops, gyms, and local businesses — zero technical headaches required.',
      ctaPrimary: 'Book a Free Consultation',
      ctaSecondary: 'Calculate Project Price',
      badge: 'Websites for Local Businesses',
      stat1: '50+',
      stat1Label: 'Projects Delivered',
      stat2: '98%',
      stat2Label: 'Happy Clients',
      stat3: '2-6',
      stat3Label: 'Weeks to Launch',
    },
    services: {
      title: 'What Your Website Can Do For You',
      subtitle: 'Clear benefits that bring more customers to your business.',
      webTitle: 'Websites & Online Shops',
      webDesc: 'Professional websites that work perfectly on every device.',
      paymentTitle: 'Online Bookings & Payments',
      paymentDesc: 'Reservations and payments right through your website.',
      emailTitle: 'Automatic Appointment Reminders',
      emailDesc: 'Save time with automated emails to your clients.',
      designTitle: 'Stunning Design',
      designDesc: 'A look that fits your business and impresses visitors.',
      seoTitle: 'Get Found on Google',
      seoDesc: 'More local customers find you online — automatically.',
      enterpriseTitle: 'Everything in One Package',
      enterpriseDesc: 'All-in-one: website, bookings, payments, and more.',
      liveBookings: 'Live bookings',
      bookingReceived: 'New booking — Table for 4',
      appointmentBooked: 'Appointment booked — Fade cut at 15:00',
      orderPlaced: 'Order placed — €48.50',
      trialRequested: 'Trial session requested — Fitness studio',
      yourWebsite: 'Your website',
      directToYou: 'Direct to you',
      booking: 'Booking',
      zeroCommission: '€0 commission',
      bookingConfirmed: 'Booking confirmed',
      clientBooks: 'Client books an appointment',
      instantConfirmation: 'They get instant confirmation',
      notifiedAutomatically: 'You get notified automatically',
      runningAutomatically: 'Running automatically',
      foundOnGoogle: 'Found on Google',
      website: 'Website',
      bookings: 'Bookings',
      payments: 'Payments',
      emails: 'Emails',
      seo: 'SEO',
      mobile: 'Mobile',
      reviews: 'Reviews',
      analytics: 'Analytics',
    },
    process: {
      title: 'How Simple It Is',
      subtitle: 'Four steps from first idea to your new website.',
      step1Title: 'Discovery Meeting',
      step1Desc: 'A quick chat to discuss your vision and goals.',
      step2Title: 'Design & Build',
      step2Desc: 'We do all the heavy lifting and build your site.',
      step3Title: 'Review & Green Light',
      step3Desc: 'We present the final product. We only launch when you give 100% approval.',
      step4Title: 'Go-Live & Growth',
      step4Desc: 'Your website goes live and starts bringing in new customers immediately.',
    },
    industries: {
      title: 'Built for Your Industry',
      subtitle: 'We know what your business needs — and build exactly that.',
      gastronomy: 'Gastronomy & Bars',
      gastronomyBenefit1: 'Direct table reservations, no commission fees',
      gastronomyBenefit2: 'Digital menu you can share by link',
      gastronomyBenefit3: 'Online ordering straight from your site',
      barber: 'Barber & Beauty',
      barberBenefit1: '24/7 online appointment bookings',
      barberBenefit2: 'Service menu and price list online',
      barberBenefit3: 'Instagram feed right on your website',
      fitness: 'Fitness & Studios',
      fitnessBenefit1: 'Trial session requests straight from smartphones',
      fitnessBenefit2: 'Class schedule and trainer profiles online',
      fitnessBenefit3: 'Memberships and payments online',
      localServices: 'Local Services',
      localServicesBenefit1: 'Found on Google by customers near you',
      localServicesBenefit2: 'Inquiries and appointments right online',
      localServicesBenefit3: 'Reviews and references at a glance',
      reservationTitle: 'Table Reservation',
      noCommission: 'No commission · Direct to you',
      reserveFree: 'Reserve — Free',
      appointmentTitle: 'Book Your Appointment',
      openAllDay: 'Open 24/7 online',
      pickTime: 'Pick a Time',
      trialTitle: 'Free Trial Session',
      requestFromPhone: 'Request from your phone',
      spots: 'spots',
      claimTrial: 'Claim Free Trial',
      googleSearch: 'Google Search',
      rankOne: 'Rank #1',
      openNow: 'Open now',
      callToday: 'Call today',
      away: 'away',
      requestQuote: 'Request a Quote',
      today: 'Today',
      tomorrow: 'Tomorrow',
      monday: 'Monday',
      wednesday: 'Wednesday',
      saturday: 'Saturday',
      fadeCut: 'Fade Cut',
      beardTrim: 'Beard Trim',
      hotTowelShave: 'Hot Towel Shave',
      reviewsCount: '48 reviews',
      customersNearYou: 'Customers near you',
    },
    portfolio: {
      title: 'Our Work',
      subtitle: 'Real websites we built for local businesses.',
      all: 'All',
      website: 'Websites',
      ecommerce: 'E-Commerce',
      webapp: 'Web Apps',
      enterprise: 'Enterprise',
      viewProject: 'View Project',
    },
    founders: {
      title: 'The Team Behind WebForge',
      subtitle: 'We build websites that move your business forward.',
      angelName: 'Angel Kodzhebashev',
      angelRole: 'Sales Manager',
      angelQuote: 'Good sales come from genuinely caring about the client.',
      todorName: 'Todor Shopov',
      todorRole: 'IT Operative Manager',
      todorQuote: 'Technology should be simple. Less complexity, more results.',
      emailButton: 'Send Email',
      bookTeamCall: 'Book a Free Consultation',
      mindsBehind: 'The Team',
    },
    estimator: {
      title: 'Project Estimator',
      subtitle: 'Calculate your budget and timeline in a few clicks.',
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      submit: 'Submit Request',
      projectScope: 'What are you planning?',
      brandSite: 'Brand Website',
      brandSiteDesc: 'Professional business presence',
      ecommerce: 'Online Shop',
      ecommerceDesc: 'Product catalog and checkout',
      webApp: 'Web App',
      webAppDesc: 'Interactive app with user accounts',
      automationPortal: 'Automation',
      automationPortalDesc: 'Workflows and integrations',
      languageReq: 'Which languages do you need?',
      singleLang: 'Single Language',
      singleLangDesc: 'One language of your choice',
      multiLang: 'Multi-language (DE/EN/BG)',
      multiLangDesc: 'Full multi-language support',
      addons: 'Extra Features',
      adminDashboard: 'Admin Panel',
      adminDashboardDesc: 'Manage your own content',
      paymentGateway: 'Online Payments',
      paymentGatewayDesc: 'Stripe / PayPal integration',
      emailAutomation: 'Email Automation',
      emailAutomationDesc: 'Automatic client emails',
      seoPackage: 'Google Visibility',
      seoPackageDesc: 'Local search optimization',
      yourInfo: 'Your Contact Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      message: 'Message (optional)',
      messagePlaceholder: 'Tell us briefly about your project...',
      budgetRange: 'Estimated Budget',
      timeline: 'Estimated Timeline',
      estimatedBudget: 'Your Project Budget',
      estimatedTimeline: 'Estimated Duration',
      weeks: 'weeks',
      summary: 'Summary',
      submitLead: 'Submit Request',
      successTitle: 'Request Submitted!',
      successMessage: 'Thank you! We received your request and will get back to you shortly.',
      bookConsultation: 'Book Your Free Consultation',
      close: 'Close',
      selectAtLeastOne: 'Please select at least one option',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Send us a message or book a free call directly.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      service: 'What do you need?',
      servicePlaceholder: 'A website, a shop, something else?',
      message: 'Message',
      messagePlaceholder: 'How can we help you?',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent.',
      error: 'Something went wrong. Please try again.',
      directContacts: 'Direct Contacts',
      bookingLink: 'Book a meeting directly',
      bookCallNow: 'Free Consultation',
    },
    footer: {
      tagline: 'Websites for local businesses — simple, fast, successful.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      impressum: 'Impressum',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      rights: 'All rights reserved.',
      madeWith: 'Crafted with care by WebForge',
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
      services: 'Ползи',
      process: 'Процес',
      work: 'Проекти',
      industries: 'Браншове',
      estimator: 'Калкулатор',
      contact: 'Контакт',
      bookCall: 'Безплатна консултация',
    },
    hero: {
      headline: 'Уебсайт, който превръща посетителите в клиенти.',
      subheadline: 'Създаваме уебсайтове за ресторанти, бръснарници, фитнеси и местни бизнеси — без технически главоболия.',
      ctaPrimary: 'Запази безплатна консултация',
      ctaSecondary: 'Изчисли цена на проекта',
      badge: 'Уебсайтове за местни бизнеси',
      stat1: '50+',
      stat1Label: 'Завършени проекти',
      stat2: '98%',
      stat2Label: 'Доволни клиенти',
      stat3: '2-6',
      stat3Label: 'седмици до стартиране',
    },
    services: {
      title: 'Какво може да направи уебсайтът за вас',
      subtitle: 'Ясни ползи, които носят повече клиенти във вашия бизнес.',
      webTitle: 'Уебсайтове и онлайн магазини',
      webDesc: 'Професионални уебсайтове, които работят перфектно на всяко устройство.',
      paymentTitle: 'Онлайн резервации и плащания',
      paymentDesc: 'Резервации и плащания директно през вашия сайт.',
      emailTitle: 'Автоматични напомняния за часове',
      emailDesc: 'Спестете време с автоматични имейли до клиентите.',
      designTitle: 'Страхотен дизайн',
      designDesc: 'Изглед, който пасва на вашия бизнес и впечатлява.',
      seoTitle: 'Открийте ви в Google',
      seoDesc: 'Повече местни клиенти ви намират онлайн — автоматично.',
      enterpriseTitle: 'Всичко в едно',
      enterpriseDesc: 'Комплект: уебсайт, резервации, плащания и още.',
      liveBookings: 'Нови резервации',
      bookingReceived: 'Нова резервация — маса за 4',
      appointmentBooked: 'Записан час — подстригване в 15:00',
      orderPlaced: 'Нова поръчка — €48,50',
      trialRequested: 'Заявка за пробна тренировка — фитнес',
      yourWebsite: 'Вашият сайт',
      directToYou: 'Директно към вас',
      booking: 'Резервация',
      zeroCommission: '€0 комисионна',
      bookingConfirmed: 'Резервацията е потвърдена',
      clientBooks: 'Клиентът записва час',
      instantConfirmation: 'Получава незабавно потвърждение',
      notifiedAutomatically: 'Вие получавате автоматично известие',
      runningAutomatically: 'Работи автоматично',
      foundOnGoogle: 'Намират ви в Google',
      website: 'Уебсайт',
      bookings: 'Резервации',
      payments: 'Плащания',
      emails: 'Имейли',
      seo: 'Видимост в Google',
      mobile: 'Мобилен',
      reviews: 'Ревюта',
      analytics: 'Анализ',
    },
    process: {
      title: 'Колко лесно е',
      subtitle: 'Четири стъпки от първата идея до вашия нов уебсайт.',
      step1Title: 'Запознанство',
      step1Desc: 'Кратък разговор за вашите желания и цели.',
      step2Title: 'Дизайн и изграждане',
      step2Desc: 'Ние поемаме цялата работа и изграждаме вашия сайт.',
      step3Title: 'Одобрение',
      step3Desc: 'Показваме ви готовия резултат. Стартираме само с вашето 100% одобрение.',
      step4Title: 'Онлайн и растеж',
      step4Desc: 'Вашият сайт е активен и веднага започва да носи нови клиенти.',
    },
    industries: {
      title: 'Създадено за вашия бранш',
      subtitle: 'Знаем от какво се нуждае бизнесът ви — и създаваме точно това.',
      gastronomy: 'Гастро и Барове',
      gastronomyBenefit1: 'Директни резервации на маси без комисионни',
      gastronomyBenefit2: 'Дигитално меню за споделяне с линк',
      gastronomyBenefit3: 'Поръчки директно от вашия сайт',
      barber: 'Бръснар и Красота',
      barberBenefit1: 'Онлайн записване за час 24/7',
      barberBenefit2: 'Меню с услуги и цените онлайн',
      barberBenefit3: 'Instagram емисия директно в сайта',
      fitness: 'Фитнес и Студиа',
      fitnessBenefit1: 'Заявки за пробни тренировки от телефона',
      fitnessBenefit2: 'Програма и профили на треньорите онлайн',
      fitnessBenefit3: 'Членства и плащания онлайн',
      localServices: 'Местни услуги',
      localServicesBenefit1: 'Открийте ви в Google от клиенти наблизо',
      localServicesBenefit2: 'Запитвания и часове директно онлайн',
      localServicesBenefit3: 'Ревюта и препоръки на едно място',
      reservationTitle: 'Резервация на маса',
      noCommission: 'Без комисионна · Директно към вас',
      reserveFree: 'Резервирай — безплатно',
      appointmentTitle: 'Запази своя час',
      openAllDay: 'Онлайн 24/7',
      pickTime: 'Избери час',
      trialTitle: 'Безплатна пробна тренировка',
      requestFromPhone: 'Заяви директно от телефона',
      spots: 'места',
      claimTrial: 'Запази пробна тренировка',
      googleSearch: 'Търсене в Google',
      rankOne: 'Позиция №1',
      openNow: 'Отворено сега',
      callToday: 'Обади се днес',
      away: 'разстояние',
      requestQuote: 'Поискай оферта',
      today: 'Днес',
      tomorrow: 'Утре',
      monday: 'Понеделник',
      wednesday: 'Сряда',
      saturday: 'Събота',
      fadeCut: 'Модерно подстригване',
      beardTrim: 'Оформяне на брада',
      hotTowelShave: 'Бръснене с гореща кърпа',
      reviewsCount: '48 ревюта',
      customersNearYou: 'Клиенти наблизо',
    },
    portfolio: {
      title: 'Нашите проекти',
      subtitle: 'Реални уебсайтове, които създадохме за местни бизнеси.',
      all: 'Всички',
      website: 'Уебсайтове',
      ecommerce: 'Е-Комерс',
      webapp: 'Уеб Приложения',
      enterprise: 'Enterprise',
      viewProject: 'Виж проект',
    },
    founders: {
      title: 'Екипът зад WebForge',
      subtitle: 'Създаваме уебсайтове, които движат бизнеса ви напред.',
      angelName: 'Ангел Коджебашев',
      angelRole: 'Мениджър Продажби',
      angelQuote: 'Добрите продажби идват от истински интерес към клиента.',
      todorName: 'Тодор Шопов',
      todorRole: 'IT Оперативен Мениджър',
      todorQuote: 'Технологията трябва да е проста. По-малко сложност, повече резултати.',
      emailButton: 'Изпрати имейл',
      bookTeamCall: 'Запази безплатна консултация',
      mindsBehind: 'Екипът',
    },
    estimator: {
      title: 'Калкулатор на проект',
      subtitle: 'Изчислете бюджета и срока с няколко клика.',
      step: 'Стъпка',
      of: 'от',
      next: 'Напред',
      back: 'Назад',
      submit: 'Изпрати запитване',
      projectScope: 'Какво планирате?',
      brandSite: 'Бранд Уебсайт',
      brandSiteDesc: 'Професионално бизнес присъствие',
      ecommerce: 'Онлайн магазин',
      ecommerceDesc: 'Продуктов каталог и чекаут',
      webApp: 'Уеб приложение',
      webAppDesc: 'Интерактивно приложение с акаунти',
      automationPortal: 'Автоматизация',
      automationPortalDesc: 'Работни процеси и интеграции',
      languageReq: 'Кои езици ви трябват?',
      singleLang: 'Едноезичен',
      singleLangDesc: 'Един език по ваш избор',
      multiLang: 'Многоезичен (DE/EN/BG)',
      multiLangDesc: 'Пълна многоезична поддръжка',
      addons: 'Допълнителни функции',
      adminDashboard: 'Админ панел',
      adminDashboardDesc: 'Управлявайте съдържанието си',
      paymentGateway: 'Онлайн плащания',
      paymentGatewayDesc: 'Stripe / PayPal интеграция',
      emailAutomation: 'Имейл автоматизация',
      emailAutomationDesc: 'Автоматични имейли до клиенти',
      seoPackage: 'Видимост в Google',
      seoPackageDesc: 'Локална оптимизация за търсачки',
      yourInfo: 'Вашите контактни данни',
      name: 'Име',
      email: 'Имейл',
      phone: 'Телефон (по желание)',
      message: 'Съобщение (по желание)',
      messagePlaceholder: 'Разкажете ни накратко за вашия проект...',
      budgetRange: 'Очакван бюджет',
      timeline: 'Очакван срок',
      estimatedBudget: 'Вашият проектен бюджет',
      estimatedTimeline: 'Очаквана продължителност',
      weeks: 'седмици',
      summary: 'Резюме',
      submitLead: 'Изпрати запитване',
      successTitle: 'Запитването е изпратено!',
      successMessage: 'Благодарим! Получихме вашето запитване и ще се свържем с вас скоро.',
      bookConsultation: 'Запазете безплатна консултация',
      close: 'Затвори',
      selectAtLeastOne: 'Моля, изберете поне една опция',
    },
    contact: {
      title: 'Свържете се с нас',
      subtitle: 'Пишете ни или запазете директно безплатен разговор.',
      name: 'Име',
      email: 'Имейл',
      phone: 'Телефон (по желание)',
      service: 'От какво се нуждаете?',
      servicePlaceholder: 'Уебсайт, магазин, нещо друго?',
      message: 'Съобщение',
      messagePlaceholder: 'Как можем да ви помогнем?',
      send: 'Изпрати съобщение',
      sending: 'Изпращане...',
      success: 'Благодарим! Съобщението ви е изпратено.',
      error: 'Възникна грешка. Моля, опитайте отново.',
      directContacts: 'Директни контакти',
      bookingLink: 'Запазете среща директно',
      bookCallNow: 'Безплатна консултация',
    },
    footer: {
      tagline: 'Уебсайтове за местни бизнеси — просто, бързо, успешно.',
      quickLinks: 'Бързи връзки',
      legal: 'Правни',
      impressum: 'Импресум',
      privacy: 'Защита на данните',
      terms: 'Общи условия',
      rights: 'Всички права запазени.',
      madeWith: 'Изработено с грижа от WebForge',
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
      actionError: 'Действието не може да бъде запазено.',
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
