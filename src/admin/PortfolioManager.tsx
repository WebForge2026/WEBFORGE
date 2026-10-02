import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { portfolioSchema } from '@/lib/validation';
import { resolvePortfolioImage } from '@/lib/portfolioImages';
import type { PortfolioItem, PortfolioInput } from '@/types';

interface Props {
  portfolio: PortfolioItem[];
  onSave: (item: Partial<PortfolioItem> & { id?: string }) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

const CATEGORIES = [
  { value: 'website', label: 'Website' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'webapp', label: 'Web App' },
  { value: 'enterprise', label: 'Enterprise' },
] as const;

export function PortfolioManager({ portfolio, onSave, onDelete }: Props) {
  const { t } = useLanguage();
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">{t.admin.portfolio}</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          {t.admin.addPortfolio}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <div key={item.id} className="glass-panel rounded-2xl overflow-hidden group">
            {item.image_url && (
              <div className="relative h-32 overflow-hidden">
                <img src={resolvePortfolioImage(item.image_url)} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs">{item.category}</span>
                {item.metrics && <span className="text-white/40 text-xs">{item.metrics}</span>}
              </div>
              <h3 className="text-white font-medium text-sm mb-1 truncate">{item.title}</h3>
              <p className="text-white/40 text-xs line-clamp-2 mb-3">{item.description}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-panel glass-panel-hover text-white text-xs font-medium"
                >
                  <Pencil className="w-3 h-3" />
                  {t.admin.editPortfolio}
                </button>
                <button
                  onClick={() => {
                    if (confirm(t.admin.deleteConfirm)) onDelete(item.id);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20"
                >
                  <Trash2 className="w-3 h-3" />
                  {t.admin.deletePortfolio}
                </button>
                {item.live_url && (
                  <a
                    href={item.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-white/30 hover:text-emerald-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(adding || editing) && (
        <PortfolioForm
          item={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={async (data) => {
            const saved = await onSave(data);
            if (saved) {
              setAdding(false);
              setEditing(null);
            }
            return saved;
          }}
        />
      )}
    </div>
  );
}

function PortfolioForm({
  item,
  onClose,
  onSave,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
  onSave: (data: Partial<PortfolioItem> & { id?: string }) => Promise<boolean>;
}) {
  const { t } = useLanguage();
  const [form, setForm] = useState<PortfolioInput>({
    title: item?.title || '',
    description: item?.description || '',
    image_url: item?.image_url || '',
    live_url: item?.live_url || '',
    category: item?.category || 'website',
    metrics: item?.metrics || '',
    tech_tags: item?.tech_tags || [],
  });
  const [tagsInput, setTagsInput] = useState(form.tech_tags.join(', '));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techTags = tagsInput.split(',').map((s) => s.trim()).filter(Boolean);

    const data = {
      ...(item?.id ? { id: item.id } : {}),
      title: form.title,
      description: form.description,
      image_url: form.image_url,
      live_url: form.live_url,
      category: form.category,
      metrics: form.metrics,
      tech_tags: techTags,
    };

    const result = portfolioSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0] ?? '');
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSave(result.data);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-scale-in" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative glass-panel rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">
            {item ? t.admin.editPortfolio : t.admin.addPortfolio}
          </h3>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <FormInput label={t.admin.title} error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="admin-input"
            />
          </FormInput>

          <FormInput label={t.admin.description}>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="admin-input resize-none"
            />
          </FormInput>

          <div className="grid grid-cols-2 gap-3">
            <FormInput label={t.admin.imageUrl} error={errors.image_url}>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="admin-input"
                placeholder="https://..."
              />
            </FormInput>

            <FormInput label={t.admin.liveUrl} error={errors.live_url}>
              <input
                type="url"
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="admin-input"
                placeholder="https://..."
              />
            </FormInput>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput label={t.admin.category}>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioInput['category'] })}
                className="admin-input cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-obsidian-100">{c.label}</option>
                ))}
              </select>
            </FormInput>

            <FormInput label={t.admin.metrics}>
              <input
                type="text"
                value={form.metrics}
                onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                className="admin-input"
                placeholder="+310% Conversion"
              />
            </FormInput>
          </div>

          <FormInput label={t.admin.techTags} hint={t.admin.techTagsHint}>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="admin-input"
              placeholder="React, TypeScript, Stripe"
            />
          </FormInput>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm"
          >
            <Check className="w-4 h-4" />
            {t.admin.save}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl glass-panel text-white text-sm font-medium"
          >
            {t.admin.cancel}
          </button>
        </div>

        <style>{`
          .admin-input {
            width: 100%;
            padding: 0.625rem 0.875rem;
            border-radius: 0.75rem;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            font-size: 0.875rem;
            transition: all 0.2s;
          }
          .admin-input:focus {
            outline: none;
            border-color: rgba(16,185,129,0.5);
            background: rgba(255,255,255,0.05);
          }
          .admin-input::placeholder { color: rgba(255,255,255,0.25); }
          .admin-input option { background: #0f0f12; color: white; }
        `}</style>
      </form>
    </div>
  );
}

function FormInput({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5">
        {label}
        {hint && <span className="text-white/25 ml-1">({hint})</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
