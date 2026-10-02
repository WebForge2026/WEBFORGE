import { useState } from 'react';
import { Trash2, ChevronDown, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Lead, LeadStatus } from '@/types';

interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  contacted: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  meeting_scheduled: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  closed: 'bg-white/5 text-white/40 border-white/10',
};

const STATUS_ORDER: LeadStatus[] = ['new', 'contacted', 'meeting_scheduled', 'closed'];

export function LeadsManager({ leads, onStatusChange, onDelete }: Props) {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const statusLabel = (s: LeadStatus) => {
    const map: Record<LeadStatus, string> = {
      new: t.admin.new,
      contacted: t.admin.contacted,
      meeting_scheduled: t.admin.meetingScheduled,
      closed: t.admin.closed,
    };
    return map[s];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (leads.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center">
        <p className="text-white/40 text-sm">{t.admin.noLeads}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <div key={lead.id} className="glass-panel rounded-2xl overflow-hidden">
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
            onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">
                {lead.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white font-medium text-sm truncate">{lead.name}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status]}`}>
                  {statusLabel(lead.status)}
                </span>
              </div>
              <p className="text-white/40 text-xs truncate">{lead.email} · {lead.project_type}</p>
            </div>

            {lead.estimated_budget && (
              <div className="hidden sm:block text-right">
                <p className="text-white/60 text-xs">{lead.estimated_budget}</p>
              </div>
            )}

            <div className="hidden md:block text-right">
              <p className="text-white/30 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(lead.created_at)}
              </p>
            </div>

            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform shrink-0 ${expandedId === lead.id ? 'rotate-180' : ''}`} />
          </div>

          {expandedId === lead.id && (
            <div className="border-t border-white/5 p-4 animate-fade-in-up">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-white/30 text-xs mb-1">{t.admin.projectType}</p>
                  <p className="text-white/70 text-sm">{lead.project_type}</p>
                </div>
                {lead.estimated_budget && (
                  <div>
                    <p className="text-white/30 text-xs mb-1">{t.admin.budget}</p>
                    <p className="text-emerald-400 text-sm font-medium">{lead.estimated_budget}</p>
                  </div>
                )}
                {lead.phone && (
                  <div>
                    <p className="text-white/30 text-xs mb-1">Phone</p>
                    <p className="text-white/70 text-sm">{lead.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-white/30 text-xs mb-1">Language</p>
                  <p className="text-white/70 text-sm">{lead.language}</p>
                </div>
              </div>

              {lead.features_selected && lead.features_selected.length > 0 && (
                <div className="mb-4">
                  <p className="text-white/30 text-xs mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.features_selected.map((f) => (
                      <span key={f} className="px-2 py-1 rounded-md bg-white/5 text-white/50 text-xs font-mono">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lead.message && (
                <div className="mb-4">
                  <p className="text-white/30 text-xs mb-1">Message</p>
                  <p className="text-white/60 text-sm bg-white/[0.02] rounded-xl p-3">{lead.message}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel glass-panel-hover text-white text-xs font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  {t.founders.emailButton}
                </a>

                <div className="flex items-center gap-1">
                  {STATUS_ORDER.map((s) => (
                    <button
                      key={s}
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusChange(lead.id, s);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        lead.status === s
                          ? STATUS_COLORS[s]
                          : 'bg-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {statusLabel(s)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(lead.id);
                  }}
                  className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t.admin.deletePortfolio}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
