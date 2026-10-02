import { useState, useEffect, useRef } from 'react';
import { X, TrendingUp, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import { resolvePortfolioImage } from '@/lib/portfolioImages';
import type { PortfolioItem } from '@/types';

type FilterCategory = 'all' | 'website' | 'ecommerce' | 'webapp' | 'enterprise';

export function Portfolio() {
  const { t } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setItems(data as PortfolioItem[]);
    }
    setLoading(false);
  };

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t.portfolio.all },
    { key: 'website', label: t.portfolio.website },
    { key: 'ecommerce', label: t.portfolio.ecommerce },
    { key: 'webapp', label: t.portfolio.webapp },
    { key: 'enterprise', label: t.portfolio.enterprise },
  ];

  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.portfolio.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto">{t.portfolio.subtitle}</p>
        </Reveal>

        {/* Filters: horizontally scrollable on mobile */}
        <Reveal delay={100} className="mb-8 sm:mb-12">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar snap-carousel pb-1 md:flex-wrap md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian shadow-lg shadow-emerald-500/20'
                    : 'glass-panel glass-panel-hover text-white/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-panel rounded-2xl h-80 animate-shimmer" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={i * 80}>
                  <PortfolioCard item={item} onClick={() => setSelected(item)} />
                </Reveal>
              ))}
            </div>

            {/* Mobile: horizontal carousel */}
            <div className="md:hidden">
              <PortfolioCarousel items={filtered} onSelect={setSelected} />
            </div>
          </>
        )}
      </div>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function PortfolioCarousel({ items, onSelect }: { items: PortfolioItem[]; onSelect: (item: PortfolioItem) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;
    const cardWidth = el.scrollWidth / items.length;
    setActiveIdx(Math.round(el.scrollLeft / cardWidth));
  };

  if (items.length === 0) return null;

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar snap-carousel pb-2 -mx-4 px-4"
      >
        {items.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[80%]">
            <PortfolioCard item={item} onClick={() => onSelect(item)} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === i ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onClick={onClick}
      className="group relative glass-panel rounded-2xl overflow-hidden cursor-pointer h-72 sm:h-80 transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
    >
      {item.image_url && !imgError ? (
        <div className="absolute inset-0">
          <img
            src={resolvePortfolioImage(item.image_url)}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
          <ImageIcon className="w-12 h-12 text-white/20" />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            {item.category}
          </span>
          {item.metrics && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              {item.metrics}
            </span>
          )}
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
        <p className="text-white/50 text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tech_tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs font-mono">{tag}</span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}

function Lightbox({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-scale-in" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl" />
      <div className="relative glass-panel rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
        {item.image_url && (
          <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-t-2xl">
            <img src={resolvePortfolioImage(item.image_url)} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
          </div>
        )}
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium">{item.category}</span>
            {item.metrics && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                {item.metrics}
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-white/60 leading-relaxed mb-6 text-sm sm:text-base">{item.description}</p>
          {item.tech_tags && item.tech_tags.length > 0 && (
            <div className="mb-6">
              <p className="text-white/40 text-sm mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {item.tech_tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-mono">{tag}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
