export type Language = 'en' | 'bg';

export interface Translation {
  nav: {
    services: string;
    portfolio: string;
    consultation: string;
    contact: string;
    bookAppointment: string;
    getQuote: string;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    bookCta: string;
    portfolioCta: string;
    quoteCta: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    projects: { tag: string; title: string; description: string }[];
  };
  booking: {
    badge: string;
    title: string;
    descriptionPrefix: string;
    duration: string;
    descriptionSuffix: string;
    cardTitle: string;
    cardDescription: string;
    button: string;
  };
  footer: {
    title: string;
    description: string;
    copyright: string;
    tagline: string;
    privacyLink: string;
  };
  privacy: {
    title: string;
    backToHome: string;
    sections: { heading: string; body: { subheading: string; text: string }[] }[];
  };
  languageToggle: {
    en: string;
    bg: string;
  };
  quote: {
    title: string;
    subtitle: string;
    step: string;
    of: string;
    next: string;
    back: string;
    finish: string;
    websiteType: string;
    websiteTypeDesc: string;
    websiteTypes: { value: string; label: string; price: number }[];
    numPages: string;
    numPagesDesc: string;
    numImages: string;
    numImagesDesc: string;
    features: string;
    featuresDesc: string;
    onlinePayments: string;
    onlinePaymentsDesc: string;
    notifications: string;
    notificationsDesc: string;
    multilingual: string;
    multilingualDesc: string;
    languagesLabel: string;
    languagesPlaceholder: string;
    contactInfo: string;
    contactInfoDesc: string;
    yourName: string;
    yourEmail: string;
    yourPhone: string;
    notes: string;
    notesPlaceholder: string;
    summary: string;
    summaryDesc: string;
    estimatedPrice: string;
    submit: string;
    submitting: string;
    success: string;
    successDesc: string;
    bookCall: string;
    error: string;
    invalidName: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidNotes: string;
    required: string;
    selectPlaceholder: string;
    pages: string;
    images: string;
    perPage: string;
    perImage: string;
  };
  admin: {
    title: string;
    login: string;
    username: string;
    password: string;
    loginBtn: string;
    loginError: string;
    logout: string;
    dashboard: string;
    totalQuotes: string;
    newQuotes: string;
    contactedQuotes: string;
    wonQuotes: string;
    quotesList: string;
    customer: string;
    type: string;
    price: string;
    status: string;
    date: string;
    actions: string;
    statusNew: string;
    statusContacted: string;
    statusWon: string;
    statusLost: string;
    view: string;
    noQuotes: string;
    quoteDetails: string;
    close: string;
    pages: string;
    images: string;
    features: string;
    yes: string;
    no: string;
    languages: string;
    contact: string;
    phone: string;
    notes: string;
    delete: string;
    deleteConfirm: string;
    databaseError: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      consultation: 'Free Consultation',
      contact: 'Contact',
      bookAppointment: 'Book Appointment',
      getQuote: 'Get Quote',
    },
    hero: {
      badge: 'Premium Web Design & Full-Service Management',
      titlePrefix: 'Take your business',
      titleHighlight: 'to the digital level.',
      description:
        "Whether it's a café, barbershop, car wash, or restaurant: We create, maintain, and optimize your website to attract more customers. All from a single source.",
      bookCta: 'Book Free Consultation',
      portfolioCta: 'View Portfolio',
      quoteCta: 'Get Quote in 60 Seconds',
    },
    services: {
      title: 'Everything your business needs online',
      subtitle:
        "We don't just build websites – we ensure they run smoothly, grow, and deliver measurable results.",
      items: [
        {
          title: 'Website Creation',
          description:
            'Custom-tailored, lightning-fast, and mobile-optimized websites for cafes, barbershops, trades, and service providers. Includes online payments, booking systems, and modern design.',
        },
        {
          title: 'Management & Updates',
          description:
            'No time for updates? We handle ongoing maintenance, update texts, prices, or opening hours, and keep your web presence completely up to date.',
        },
        {
          title: 'Monitoring & Security',
          description:
            'Security patches, backups, and performance monitoring. We guarantee your site runs flawlessly, email confirmations arrive securely, and customers can always reach you.',
        },
      ],
    },
    portfolio: {
      title: 'Our Recent Projects',
      subtitle:
        'A small glimpse into websites we have successfully built for various industries.',
      projects: [
        {
          tag: 'Cafe & Bistro',
          title: 'Cafe & Roastery Web Presence',
          description: 'Featuring integrated menus and table reservation capabilities.',
        },
        {
          tag: 'Barbershop',
          title: 'Barbershop Booking Platform',
          description: 'Direct online booking system for haircuts and beard grooming.',
        },
        {
          tag: 'Car Wash',
          title: 'Car Detailing & Wash Portal',
          description: 'Clear service presentation and integrated gift card shop.',
        },
      ],
    },
    booking: {
      badge: '100% Free',
      title: 'Book Your Free Consultation',
      descriptionPrefix: 'Schedule your non-binding consultation now (Duration:',
      duration: '30 to 60 minutes',
      descriptionSuffix: '). Choose your preferred time slot below!',
      cardTitle: 'Schedule Your Strategy Session',
      cardDescription:
        'Click the button below to open your booking page and secure your Google Meet slot seamlessly.',
      button: 'Open Booking Calendar',
    },
    footer: {
      title: 'WebForge',
      description:
        'Your partner for professional websites, online payments, email automation, and full-service management. Everything your business needs to succeed online.',
      copyright: '© 2026 WebForge. All rights reserved.',
      tagline: 'Built for maximum performance and customer generation.',
      privacyLink: 'Privacy Policy',
    },
    privacy: {
      title: 'Privacy Policy',
      backToHome: 'Back to home',
      sections: [
        {
          heading: '1. Data Protection at a Glance',
          body: [
            {
              subheading: 'General Information',
              text: 'The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data with which you can be personally identified.',
            },
          ],
        },
        {
          heading: '2. Responsible Party',
          body: [
            {
              subheading: '',
              text: 'Responsible for data processing on this website is:\n\nWebForge\nE-Mail: kodzhebashev@web-forge.dev',
            },
          ],
        },
        {
          heading: '3. Hosting, Deployment & Infrastructure',
          body: [
            {
              subheading: 'Vercel (Website Hosting & Deployment)',
              text: 'Our website is hosted and provided by Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). When you access our website, Vercel collects various server log files including your IP address, browser information, operating system, and access times to ensure a secure, stable, and fast delivery of the website.\n\nLegal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in a reliable and secure provision of our online offering).',
            },
            {
              subheading: 'GitHub (Code Management)',
              text: 'The source code of our website is managed in repositories by GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) and automatically deployed via Vercel. End-user data is not processed by GitHub during a simple visit to the website.',
            },
            {
              subheading: 'Google Domains & Google Workspace',
              text: 'Our domain as well as our email and business system are operated through Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). Emails, contact data, and inquiries via our forms are processed and stored on Google Workspace servers.\n\nLegal basis: Art. 6 para. 1 lit. b GDPR (contract performance and pre-contractual measures) and Art. 6 para. 1 lit. f GDPR.',
            },
          ],
        },
        {
          heading: '4. Data Collection on the Website',
          body: [
            {
              subheading: 'Quote Calculator & Contact Inquiries',
              text: 'When you request a quote via our online quote calculator or send us a message, the data you enter (e.g. name, email address, phone number, selected options) is processed to create your individual quote and answer your inquiry.\n\nLegal basis: Art. 6 para. 1 lit. b GDPR.',
            },
            {
              subheading: 'Online Appointment Booking & Consultation',
              text: 'When you book a consultation appointment via our website, your entered contact data is processed for scheduling and conducting the appointment. Appointment confirmation and video meeting provision are handled via Google Calendar and Google Meet.\n\nLegal basis: Art. 6 para. 1 lit. b GDPR.',
            },
          ],
        },
        {
          heading: '5. Your Rights',
          body: [
            {
              subheading: '',
              text: 'You have the right at any time to free information about your stored personal data, its origin and recipients, and the purpose of data processing, as well as a right to correction, blocking, or deletion of this data.\n\nFor this purpose or for further questions regarding data protection, please contact us at any time: kodzhebashev@web-forge.dev.',
            },
          ],
        },
      ],
    },
    languageToggle: {
      en: 'EN',
      bg: 'BG',
    },
    quote: {
      title: 'Instant Quote Calculator',
      subtitle: 'Get your personalized offer in under 60 seconds',
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      finish: 'Get My Quote',
      websiteType: 'What type of website do you need?',
      websiteTypeDesc: 'Choose the category that best fits your business',
      websiteTypes: [
        { value: 'cafe', label: 'Café / Bistro', price: 400 },
        { value: 'barbershop', label: 'Barbershop / Salon', price: 450 },
        { value: 'restaurant', label: 'Restaurant', price: 500 },
        { value: 'carwash', label: 'Car Wash / Auto Service', price: 450 },
        { value: 'shop', label: 'Online Shop', price: 700 },
        { value: 'business', label: 'Business / Corporate', price: 600 },
        { value: 'portfolio', label: 'Portfolio / Personal', price: 350 },
        { value: 'other', label: 'Other', price: 500 },
      ],
      numPages: 'How many pages do you need?',
      numPagesDesc: 'Home, About, Services, Contact, etc.',
      numImages: 'How many images will the site have?',
      numImagesDesc: 'Photos, gallery images, product shots',
      features: 'Which features do you need?',
      featuresDesc: 'Select all that apply — each adds to the price',
      onlinePayments: 'Online Payments',
      onlinePaymentsDesc: 'Accept payments via card, PayPal, etc.',
      notifications: 'Email / SMS Notifications',
      notificationsDesc: 'Automatic booking confirmations and reminders',
      multilingual: 'Multilingual Website',
      multilingualDesc: 'Support multiple languages',
      languagesLabel: 'Which languages?',
      languagesPlaceholder: 'e.g. Bulgarian, English, German',
      contactInfo: 'Your contact information',
      contactInfoDesc: 'So we can send you the detailed offer',
      yourName: 'Your Name',
      yourEmail: 'Email Address',
      yourPhone: 'Phone Number (optional)',
      notes: 'Additional Notes (optional)',
      notesPlaceholder: 'Tell us more about your project...',
      summary: 'Your quote summary',
      summaryDesc: 'Review your selections and submit',
      estimatedPrice: 'Estimated Price',
      submit: 'Submit Quote Request',
      submitting: 'Submitting...',
      success: 'Quote submitted successfully!',
      successDesc: 'We will contact you shortly. Book a free consultation call now to speed things up!',
      bookCall: 'Book a Free Consultation Call',
      error: 'Something went wrong. Please try again.',
      invalidName: 'Please enter a name between 1 and 120 characters.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.',
      invalidNotes: 'Notes must be 2,000 characters or fewer.',
      required: 'This field is required',
      selectPlaceholder: 'Please select an option',
      pages: 'pages',
      images: 'images',
      perPage: 'per page',
      perImage: 'per image',
    },
    admin: {
      title: 'Admin Dashboard',
      login: 'Admin Login',
      username: 'Username',
      password: 'Password',
      loginBtn: 'Login',
      loginError: 'Invalid username or password',
      logout: 'Logout',
      dashboard: 'Dashboard',
      totalQuotes: 'Total Quotes',
      newQuotes: 'New',
      contactedQuotes: 'Contacted',
      wonQuotes: 'Won',
      quotesList: 'All Quotes',
      customer: 'Customer',
      type: 'Type',
      price: 'Price',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      statusNew: 'New',
      statusContacted: 'Contacted',
      statusWon: 'Won',
      statusLost: 'Lost',
      view: 'View',
      noQuotes: 'No quotes yet',
      quoteDetails: 'Quote Details',
      close: 'Close',
      pages: 'Pages',
      images: 'Images',
      features: 'Features',
      yes: 'Yes',
      no: 'No',
      languages: 'Languages',
      contact: 'Contact',
      phone: 'Phone',
      notes: 'Notes',
      delete: 'Archive',
      deleteConfirm: 'Are you sure you want to archive this quote?',
      databaseError: 'The database could not complete that request. Please try again.'
    },
  },
  bg: {
    nav: {
      services: 'Услуги',
      portfolio: 'Портфолио',
      consultation: 'Безплатна консултация',
      contact: 'Контакти',
      bookAppointment: 'Запази час',
      getQuote: 'Получи оферта',
    },
    hero: {
      badge: 'Премиум уеб дизайн и пълно обслужване',
      titlePrefix: 'Изведете бизнеса си',
      titleHighlight: 'на дигитално ниво.',
      description:
        'Независимо дали е кафене, бръснарница, автомивка или ресторант: Създаваме, поддържаме и оптимизираме вашия уебсайт, за да привлечете повече клиенти. Всичко от едно място.',
      bookCta: 'Запази безплатна консултация',
      portfolioCta: 'Вижте портфолио',
      quoteCta: 'Получи оферта в 60 секунди',
    },
    services: {
      title: 'Всичко, от което бизнесът ви се нуждае онлайн',
      subtitle:
        'Не просто създаваме уебсайтове – гарантираме, че те работят гладко, растат и носят измерими резултати.',
      items: [
        {
          title: 'Създаване на уебсайт',
          description:
            'Персонализирани, мълниеносни и мобилно оптимизирани уебсайтове за кафенета, бръснарници, занаяти и доставчици на услуги. Включва онлайн плащания, системи за резервация и модерен дизайн.',
        },
        {
          title: 'Управление и актуализации',
          description:
            'Нямате време за актуализации? Поемаме текущата поддръжка, обновяваме текстове, цени или работно време и поддържаме вашето онлайн присъствие напълно актуално.',
        },
        {
          title: 'Мониторинг и сигурност',
          description:
            'Кръпки за сигурност, резервни копия и мониторинг на производителността. Гарантираме, че сайтът ви работи безупречно, имейлите пристигат сигурно и клиентите винаги могат да ви достигнат.',
        },
      ],
    },
    portfolio: {
      title: 'Нашите последни проекти',
      subtitle:
        'Малък поглед към уебсайтове, които успешно създадохме за различни индустрии.',
      projects: [
        {
          tag: 'Кафене и бистро',
          title: 'Уеб присъствие за кафене и пекарна',
          description: 'С интегрирани менюта и възможност за резервация на маси.',
        },
        {
          tag: 'Бръснарница',
          title: 'Платформа за резервации за бръснарница',
          description: 'Директна онлайн система за резервация на подстригвания и бръснене.',
        },
        {
          tag: 'Автомивка',
          title: 'Портал за автомивка и детайлинг',
          description: 'Ясно представяне на услуги и интегриран магазин за ваучери.',
        },
      ],
    },
    booking: {
      badge: '100% Безплатно',
      title: 'Запазете вашата безплатна консултация',
      descriptionPrefix: 'Запазете вашата необвързваща консултация сега (Продължителност:',
      duration: '30 до 60 минути',
      descriptionSuffix: '). Изберете предпочитания от вас час по-долу!',
      cardTitle: 'Запазете вашата стратегическа сесия',
      cardDescription:
        'Кликнете върху бутона по-долу, за да отворите страницата за резервация и да запазите своя Google Meet слот безпроблемно.',
      button: 'Отвори календара за резервация',
    },
    footer: {
      title: 'WebForge',
      description:
        'Вашият партньор за професионални уебсайтове, онлайн плащания, имейл автоматизация и пълно обслужване. Всичко, от което бизнесът ви се нуждае, за да успее онлайн.',
      copyright: '© 2026 WebForge. Всички права запазени.',
      tagline: 'Създаден за максимална производителност и привличане на клиенти.',
      privacyLink: 'Политика за поверителност',
    },
    privacy: {
      title: 'Политика за поверителност',
      backToHome: 'Обратно към началната страница',
      sections: [
        {
          heading: '1. Защита на данните накратко',
          body: [
            {
              subheading: 'Обща информация',
              text: 'Следната информация дава прост преглед на това какво се случва с вашите лични данни, когато посещавате нашия уебсайт. Лични данни са всички данни, с които можете да бъдете лично идентифицирани.',
            },
          ],
        },
        {
          heading: '2. Отговорно лице',
          body: [
            {
              subheading: '',
              text: 'Отговорно за обработката на данни в този уебсайт е:\n\nWebForge\nИмейл: kodzhebashev@web-forge.dev',
            },
          ],
        },
        {
          heading: '3. Хостинг, внедряване и инфраструктура',
          body: [
            {
              subheading: 'Vercel (Хостинг и внедряване на уебсайт)',
              text: 'Нашият уебсайт се хоства и предоставя от Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, САЩ). Когато посещавате нашия уебсайт, Vercel събира различни серверни лог файлове, включително вашия IP адрес, информация за браузъра, операционна система и времена на достъп, за да осигури сигурна, стабилна и бърза доставка на уебсайта.\n\nПравно основание: чл. 6, ал. 1, буква "f" от GDPR (легитимен интерес в надеждно и сигурно предоставяне на нашето онлайн предложение).',
            },
            {
              subheading: 'GitHub (Управление на кода)',
              text: 'Изходният код на нашия уебсайт се управлява в хранилища на GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, САЩ) и автоматично се внедрява чрез Vercel. Данни на крайни потребители не се обработват от GitHub при обикновено посещение на уебсайта.',
            },
            {
              subheading: 'Google Domains & Google Workspace',
              text: 'Нашият домейн, както и нашата имейл и бизнес система се управляват чрез Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ирландия). Имейли, контактни данни и запитвания чрез нашите формуляри се обработват и съхраняват на сървърите на Google Workspace.\n\nПравно основание: чл. 6, ал. 1, буква "b" от GDPR (изпълнение на договор и преддоговорни мерки) и чл. 6, ал. 1, буква "f" от GDPR.',
            },
          ],
        },
        {
          heading: '4. Събиране на данни в уебсайта',
          body: [
            {
              subheading: 'Калкулатор за оферти и контактни запитвания',
              text: 'Когато заявявате оферта чрез нашия онлайн калкулатор за оферти или ни изпращате съобщение, въведените от вас данни (напр. име, имейл адрес, телефонен номер, избрани опции) се обработват, за да създадем вашата индивидуална оферта и да отговорим на запитването ви.\n\nПравно основание: чл. 6, ал. 1, буква "b" от GDPR.',
            },
            {
              subheading: 'Онлайн резервация на час и консултация',
              text: 'Когато резервирате час за консултация чрез нашия уебсайт, въведените от вас контактни данни се обработват за планиране и провеждане на часа. Потвърждението на часа и предоставянето на видеоконференции се осъществяват чрез Google Calendar и Google Meet.\n\nПравно основание: чл. 6, ал. 1, буква "b" от GDPR.',
            },
          ],
        },
        {
          heading: '5. Вашите права',
          body: [
            {
              subheading: '',
              text: 'Имате право по всяко време на безплатна информация за съхранените ви лични данни, техния произход и получатели, и целта на обработката на данните, както и право на коригиране, блокиране или изтриване на тези данни.\n\nЗа тази цел или при допълнителни въпроси относно защитата на данните, свържете се с нас по всяко време: kodzhebashev@web-forge.dev.',
            },
          ],
        },
      ],
    },
    languageToggle: {
      en: 'EN',
      bg: 'BG',
    },
    quote: {
      title: 'Калкулатор за мигновена оферта',
      subtitle: 'Получете персонализирана оферта за по-малко от 60 секунди',
      step: 'Стъпка',
      of: 'от',
      next: 'Напред',
      back: 'Назад',
      finish: 'Получи моята оферта',
      websiteType: 'От какъв тип уебсайт се нуждаете?',
      websiteTypeDesc: 'Изберете категорията, която най-добре отговаря на вашия бизнес',
      websiteTypes: [
        { value: 'cafe', label: 'Кафене / Бистро', price: 400 },
        { value: 'barbershop', label: 'Бръснарница / Салон', price: 450 },
        { value: 'restaurant', label: 'Ресторант', price: 500 },
        { value: 'carwash', label: 'Автомивка / Авто услуга', price: 450 },
        { value: 'shop', label: 'Онлайн магазин', price: 700 },
        { value: 'business', label: 'Бизнес / Корпоративен', price: 600 },
        { value: 'portfolio', label: 'Портфолио / Личен', price: 350 },
        { value: 'other', label: 'Друг', price: 500 },
      ],
      numPages: 'Колко страници ви трябват?',
      numPagesDesc: 'Начална, За нас, Услуги, Контакти и т.н.',
      numImages: 'Колко снимки ще има сайтът?',
      numImagesDesc: 'Снимки, галерия, продуктови кадри',
      features: 'Кои функции ви трябват?',
      featuresDesc: 'Изберете всички, които са ви нужни — всяка добавя към цената',
      onlinePayments: 'Онлайн плащания',
      onlinePaymentsDesc: 'Приемайте плащания с карта, PayPal и др.',
      notifications: 'Имейл / SMS известия',
      notificationsDesc: 'Автоматични потвърждения и напомняния за резервации',
      multilingual: 'Многоезичен уебсайт',
      multilingualDesc: 'Поддръжка на няколко езика',
      languagesLabel: 'Кои езици?',
      languagesPlaceholder: 'напр. Български, Английски, Немски',
      contactInfo: 'Вашите контактни данни',
      contactInfoDesc: 'За да можем да ви изпратим подробната оферта',
      yourName: 'Вашето име',
      yourEmail: 'Имейл адрес',
      yourPhone: 'Телефонен номер (по избор)',
      notes: 'Допълнителни бележки (по избор)',
      notesPlaceholder: 'Разкажете ни повече за вашия проект...',
      summary: 'Резюме на вашата оферта',
      summaryDesc: 'Прегледайте избора си и изпратете заявката',
      estimatedPrice: 'Очаквана цена',
      submit: 'Изпрати заявка за оферта',
      submitting: 'Изпращане...',
      success: 'Офертата е изпратена успешно!',
      successDesc: 'Ще се свържем с вас скоро. Запазете безплатна консултация сега, за да ускорите процеса!',
      bookCall: 'Запази безплатна консултация',
      error: 'Нещо се обърка. Моля, опитайте отново.',
      invalidName: 'Моля, въведете име между 1 и 120 символа.',
      invalidEmail: 'Моля, въведете валиден имейл адрес.',
      invalidPhone: 'Моля, въведете валиден телефонен номер.',
      invalidNotes: 'Бележките трябва да са до 2000 символа.',
      required: 'Това поле е задължително',
      selectPlaceholder: 'Моля, изберете опция',
      pages: 'страници',
      images: 'снимки',
      perPage: 'на страница',
      perImage: 'на снимка',
    },
    admin: {
      title: 'Административен панел',
      login: 'Вход за администратор',
      username: 'Потребителско име',
      password: 'Парола',
      loginBtn: 'Вход',
      loginError: 'Невалидно потребителско име или парола',
      logout: 'Изход',
      dashboard: 'Табло',
      totalQuotes: 'Общо оферти',
      newQuotes: 'Нови',
      contactedQuotes: 'Контактрани',
      wonQuotes: 'Спечелени',
      quotesList: 'Всички оферти',
      customer: 'Клиент',
      type: 'Тип',
      price: 'Цена',
      status: 'Статус',
      date: 'Дата',
      actions: 'Действия',
      statusNew: 'Нова',
      statusContacted: 'Контактувана',
      statusWon: 'Спечелена',
      statusLost: 'Изгубена',
      view: 'Преглед',
      noQuotes: 'Все още няма оферти',
      quoteDetails: 'Детайли на офертата',
      close: 'Затвори',
      pages: 'Страници',
      images: 'Снимки',
      features: 'Функции',
      yes: 'Да',
      no: 'Не',
      languages: 'Езици',
      contact: 'Контакт',
      phone: 'Телефон',
      notes: 'Бележки',
      delete: 'Архивирай',
      deleteConfirm: 'Сигурни ли сте, че искате да архивирате тази оферта?',
      databaseError: 'Базата данни не успя да изпълни заявката. Моля, опитайте отново.'
    },
  },
};
