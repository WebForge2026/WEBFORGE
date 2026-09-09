import { useLanguage } from '@/i18n/LanguageContext';

const projectImages = [
  '/portfolio/cafe-restaurant-new.jpg',
  '/portfolio/barbershop-new.jpg',
  '/portfolio/car-wash.jpg',
];

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{t.portfolio.title}</h2>
          <p className="text-slate-400">{t.portfolio.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.portfolio.projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-brand-card transition hover:border-brand-500/50"
            >
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={projectImages[index]}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-brand-dark/80 px-3 py-1 text-xs font-semibold text-brand-400 backdrop-blur-md">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-slate-400">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
