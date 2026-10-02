import { useState } from 'react';
import { Hammer, X, FileText, Shield, ScrollText, Mail, Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MagneticButton } from '@/components/MagneticButton';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

type LegalPage = 'impressum' | 'privacy' | 'terms' | null;

export function Footer() {
  const { t } = useLanguage();
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.work, href: '#portfolio' },
    { label: t.nav.estimator, href: '#estimator' },
    { label: t.nav.founders, href: '#founders' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <footer className="relative pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-obsidian" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-white">
                  Web<span className="gradient-text-static">Forge</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-xs">
                {t.footer.tagline}
              </p>
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-lg shadow-emerald-500/20"
              >
                <Calendar className="w-4 h-4" />
                {t.nav.bookCall}
              </MagneticButton>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white/40 text-sm hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => setLegalPage('impressum')}
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-emerald-400 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {t.footer.impressum}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalPage('privacy')}
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-emerald-400 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    {t.footer.privacy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalPage('terms')}
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-emerald-400 transition-colors"
                  >
                    <ScrollText className="w-4 h-4" />
                    {t.footer.terms}
                  </button>
                </li>
              </ul>

              <div className="mt-6 space-y-1.5">
                <a href="mailto:kodzhebashev@web-forge.dev" className="flex items-center gap-2 text-white/40 text-xs hover:text-emerald-400 transition-colors">
                  <Mail className="w-3 h-3" />
                  kodzhebashev@web-forge.dev
                </a>
                <a href="mailto:shopov@web-forge.dev" className="flex items-center gap-2 text-white/40 text-xs hover:text-emerald-400 transition-colors">
                  <Mail className="w-3 h-3" />
                  shopov@web-forge.dev
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} WebForge. {t.footer.rights}
            </p>
            <p className="text-white/30 text-xs">
              {t.footer.madeWith}
            </p>
          </div>
        </div>
      </footer>

      {legalPage && <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />}
    </>
  );
}

function LegalModal({ page, onClose }: { page: NonNullable<LegalPage>; onClose: () => void }) {
  const { t, language } = useLanguage();

  const titles: Record<string, string> = {
    impressum: t.legal.impressumTitle,
    privacy: t.legal.privacyTitle,
    terms: t.legal.termsTitle,
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-scale-in" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl" />

      <div
        className="relative glass-panel rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/5 bg-obsidian/80 backdrop-blur-xl rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">{titles[page]}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          {page === 'impressum' && <ImpressumContent lang={language} />}
          {page === 'privacy' && <PrivacyContent lang={language} />}
          {page === 'terms' && <TermsContent lang={language} />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
      <div className="text-white/50 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ImpressumContent({ lang }: { lang: string }) {
  if (lang === 'DE') {
    return (
      <>
        <Section title="Angaben gemäß § 5 TMG">
          <p>WebForge</p>
          <p>web-forge.dev</p>
        </Section>
        <Section title="Vertreten durch die Geschäftsführung">
          <p>Angel Kodzhebashev (Sales Manager)</p>
          <p>Todor Shopov (IT Operative Manager)</p>
        </Section>
        <Section title="Kontakt">
          <p>E-Mail: <a href="mailto:kodzhebashev@web-forge.dev" className="text-emerald-400 hover:underline">kodzhebashev@web-forge.dev</a></p>
          <p>E-Mail: <a href="mailto:shopov@web-forge.dev" className="text-emerald-400 hover:underline">shopov@web-forge.dev</a></p>
        </Section>
        <Section title="EU-Streitschlichtung">
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </Section>
        <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </Section>
      </>
    );
  }
  if (lang === 'BG') {
    return (
      <>
        <Section title="Данни съгласно § 5 TMG">
          <p>WebForge</p>
          <p>web-forge.dev</p>
        </Section>
        <Section title="Представено от ръководството">
          <p>Ангел Коджебашев (Мениджър Продажби)</p>
          <p>Тодор Шопов (IT Оперативен Мениджър)</p>
        </Section>
        <Section title="Контакт">
          <p>Имейл: <a href="mailto:kodzhebashev@web-forge.dev" className="text-emerald-400 hover:underline">kodzhebashev@web-forge.dev</a></p>
          <p>Имейл: <a href="mailto:shopov@web-forge.dev" className="text-emerald-400 hover:underline">shopov@web-forge.dev</a></p>
        </Section>
        <Section title="ЕС разрешаване на спорове">
          <p>Европейската комисия предоставя платформа за онлайн разрешаване на спорове: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
        </Section>
      </>
    );
  }
  return (
    <>
      <Section title="Information according to § 5 TMG">
        <p>WebForge</p>
        <p>web-forge.dev</p>
      </Section>
      <Section title="Represented by the Management">
        <p>Angel Kodzhebashev (Sales Manager)</p>
        <p>Todor Shopov (IT Operative Manager)</p>
      </Section>
      <Section title="Contact">
        <p>Email: <a href="mailto:kodzhebashev@web-forge.dev" className="text-emerald-400 hover:underline">kodzhebashev@web-forge.dev</a></p>
        <p>Email: <a href="mailto:shopov@web-forge.dev" className="text-emerald-400 hover:underline">shopov@web-forge.dev</a></p>
      </Section>
      <Section title="EU Dispute Resolution">
        <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
      </Section>
      <Section title="Consumer Dispute Resolution / Universal Arbitration Board">
        <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
      </Section>
    </>
  );
}

function PrivacyContent({ lang }: { lang: string }) {
  if (lang === 'DE') {
    return (
      <>
        <Section title="1. Datenschutz auf einen Blick">
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen oder unser Kontaktformular nutzen.</p>
        </Section>
        <Section title="2. Verantwortliche Stelle">
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p>WebForge</p>
          <p>Kontakt: kodzhebashev@web-forge.dev, shopov@web-forge.dev</p>
        </Section>
        <Section title="3. Datenerfassung auf dieser Website">
          <p><strong>Technische Logfiles:</strong> Beim Aufruf der Website werden automatisch Informationen vom Hosting-Server erfasst (Browser-Typ, Betriebssystem, IP-Adresse, Uhrzeit).</p>
          <p><strong>Kontaktformular & Projektrechner:</strong> Daten, die Sie über das Kontaktformular oder den Projektrechner eingeben, werden über Supabase in einer sicheren Datenbank gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.</p>
        </Section>
        <Section title="4. Google Calendar Integration">
          <p>Wir nutzen die Google Calendar Buchungsfunktion (calendar.app.google) zur Terminvereinbarung. Beim Klick auf den Buchungslink werden Sie zu Google weitergeleitet, wo die Datenschutzerklärung von Google gilt.</p>
        </Section>
        <Section title="5. SSL/TLS Verschlüsselung">
          <p>Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.</p>
        </Section>
        <Section title="6. Ihre Rechte als betroffene Person">
          <p>Sie haben folgende Rechte:</p>
          <p>• Recht auf Auskunft (Art. 15 DSGVO)</p>
          <p>• Recht auf Berichtigung (Art. 16 DSGVO)</p>
          <p>• Recht auf Löschung (Art. 17 DSGVO)</p>
          <p>• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</p>
          <p>• Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</p>
        </Section>
      </>
    );
  }
  if (lang === 'BG') {
    return (
      <>
        <Section title="1. Защита на данните накратко">
          <p>Следните указания дават прост преглед на това какво се случва с вашите лични данни, когато посещавате този уебсайт или използвате нашата контактна форма.</p>
        </Section>
        <Section title="2. Отговорна страна">
          <p>Отговорна за обработката на данни в този уебсайт е:</p>
          <p>WebForge</p>
          <p>Контакт: kodzhebashev@web-forge.dev, shopov@web-forge.dev</p>
        </Section>
        <Section title="3. Събиране на данни">
          <p><strong>Технически логове:</strong> При достъп до уебсайта се събират автоматично данни от сървъра.</p>
          <p><strong>Контактна форма и калкулатор:</strong> Данните се съхраняват сигурно чрез Supabase.</p>
        </Section>
        <Section title="4. Интеграция с Google Calendar">
          <p>Използваме функцията за резервация на Google Calendar. При клик върху линка за резервация ще бъдете пренасочени към Google.</p>
        </Section>
        <Section title="5. SSL/TLS криптиране">
          <p>Този уебсайт използва SSL/TLS криптиране за защита на предаваните данни.</p>
        </Section>
        <Section title="6. Вашите права">
          <p>• Право на достъп</p>
          <p>• Право на корекция</p>
          <p>• Право на изтриване</p>
          <p>• Право на преносимост на данни</p>
          <p>• Право на жалба до надзорен орган</p>
        </Section>
      </>
    );
  }
  return (
    <>
      <Section title="1. Data Protection at a Glance">
        <p>The following notes provide a simple overview of what happens to your personal data when you visit this website or use our contact form.</p>
      </Section>
      <Section title="2. Responsible Party">
        <p>Responsible for data processing on this website:</p>
        <p>WebForge</p>
        <p>Contact: kodzhebashev@web-forge.dev, shopov@web-forge.dev</p>
      </Section>
      <Section title="3. Data Collection on this Website">
        <p><strong>Technical Log Files:</strong> When accessing the website, information is automatically collected by the hosting server (browser type, operating system, IP address, time).</p>
        <p><strong>Contact Form & Project Estimator:</strong> Data entered via the contact form or project estimator is stored securely via Supabase and used exclusively for processing your request.</p>
      </Section>
      <Section title="4. Google Calendar Integration">
        <p>We use the Google Calendar booking function (calendar.app.google) for scheduling appointments. When you click the booking link, you will be redirected to Google, where Google's privacy policy applies.</p>
      </Section>
      <Section title="5. SSL/TLS Encryption">
        <p>For security reasons and to protect the transmission of confidential content, this website uses SSL/TLS encryption. You can recognize an encrypted connection by the change from "http://" to "https://" in the browser address bar.</p>
      </Section>
      <Section title="6. Your Rights as a Data Subject">
        <p>You have the following rights:</p>
        <p>• Right of access (Art. 15 GDPR)</p>
        <p>• Right to rectification (Art. 16 GDPR)</p>
        <p>• Right to erasure (Art. 17 GDPR)</p>
        <p>• Right to data portability (Art. 20 GDPR)</p>
        <p>• Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</p>
      </Section>
    </>
  );
}

function TermsContent({ lang }: { lang: string }) {
  if (lang === 'DE') {
    return (
      <>
        <Section title="§ 1 Geltungsbereich">
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen WebForge und dem Kunden über die Erbringung von Dienstleistungen, insbesondere Webentwicklung, Automatisierungen, Payment-Setups und UI/UX-Design.</p>
        </Section>
        <Section title="§ 2 Leistungsbeschreibung">
          <p>WebForge erbringt Dienstleistungen in den Bereichen:</p>
          <p>• Webentwicklung & E-Commerce</p>
          <p>• Online-Zahlungssysteme (Stripe, PayPal)</p>
          <p>• E-Mail-Automatisierung & CRM-Integration</p>
          <p>• SEO & Performance-Optimierung</p>
          <p>• UI/UX-Design & Micro-Animationen</p>
        </Section>
        <Section title="§ 3 Mitwirkungspflichten des Kunden">
          <p>Der Kunde stellt WebForge alle für die Durchführung des Auftrags benötigten Informationen und Materialien rechtzeitig und in geeigneter Form zur Verfügung.</p>
        </Section>
        <Section title="§ 4 Abnahme">
          <p>Nach Fertigstellung der Leistung wird WebForge den Kunden zur Abnahme auffordern. Die Abnahme gilt als erfolgt, wenn der Kunde nicht innerhalb von 14 Tagen schriftlich konkrete Mängel rügt.</p>
        </Section>
        <Section title="§ 5 Gewährleistung & Haftung">
          <p>WebForge gewährleistet die vertragsgemäße Erbringung der Leistung. Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Für leichte Fahrlässigkeit haftet WebForge nur bei Verletzung wesentlicher Vertragspflichten.</p>
        </Section>
        <Section title="§ 6 Urheberrecht">
          <p>Nach vollständiger Zahlung des vereinbarten Honorars gehen die Nutzungsrechte an den erstellten Werken auf den Kunden über, soweit nichts anderes vereinbart wurde.</p>
        </Section>
      </>
    );
  }
  if (lang === 'BG') {
    return (
      <>
        <Section title="§ 1 Обхват">
          <p>Тези общи условия се прилагат за всички договори между WebForge и клиента за предоставяне на услуги, по-специално уеб разработка, автоматизации, настройки на плащания и UI/UX дизайн.</p>
        </Section>
        <Section title="§ 2 Описание на услугите">
          <p>• Уеб разработка & Е-Комерс</p>
          <p>• Онлайн системи за плащане (Stripe, PayPal)</p>
          <p>• Имейл автоматизация & CRM интеграция</p>
          <p>• SEO & Оптимизация на производителността</p>
          <p>• UI/UX дизайн & Микро-анимации</p>
        </Section>
        <Section title="§ 3 Задължения на клиента">
          <p>Клиентът предоставя на WebForge своевременно цялата информация и материали, необходими за изпълнението на поръчката.</p>
        </Section>
        <Section title="§ 4 Приемане">
          <p>След завършване на услугата WebForge ще поиска приемане от клиента. Приемането се счита за извършена, ако клиентът не посочи конкретни дефекти в 14-дневен срок.</p>
        </Section>
        <Section title="§ 5 Гаранция & Отговорност">
          <p>WebForge гарантира договорно предоставяне на услугата. Отговорността е ограничена до умисъл и груба небрежност.</p>
        </Section>
        <Section title="§ 6 Авторски права">
          <p>След пълно плащане на договореното възнаграждение правата за използване на създадените произведения се прехвърлят на клиента.</p>
        </Section>
      </>
    );
  }
  return (
    <>
      <Section title="§ 1 Scope">
        <p>These General Terms and Conditions apply to all contracts between WebForge and the client regarding the provision of services, in particular web development, automations, payment setups, and UI/UX design.</p>
      </Section>
      <Section title="§ 2 Service Description">
        <p>WebForge provides services in the following areas:</p>
        <p>• Web Development & E-Commerce</p>
        <p>• Online Payment Systems (Stripe, PayPal)</p>
        <p>• Email Automation & CRM Integration</p>
        <p>• SEO & Performance Optimization</p>
        <p>• UI/UX Design & Micro-Animations</p>
      </Section>
      <Section title="§ 3 Client Cooperation Duties">
        <p>The client shall provide WebForge with all information and materials required for the execution of the order in a timely manner and in suitable form.</p>
      </Section>
      <Section title="§ 4 Acceptance">
        <p>Upon completion of the service, WebForge will request acceptance from the client. Acceptance is deemed to have occurred if the client does not raise specific defects in writing within 14 days.</p>
      </Section>
      <Section title="§ 5 Warranty & Liability">
        <p>WebForge warrants the contractual provision of the service. Liability is limited to intent and gross negligence. For slight negligence, WebForge is only liable in the event of a breach of essential contractual obligations.</p>
      </Section>
      <Section title="§ 6 Copyright">
        <p>Upon full payment of the agreed fee, the rights of use of the created works are transferred to the client, unless otherwise agreed.</p>
      </Section>
    </>
  );
}
