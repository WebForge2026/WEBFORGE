import { useMemo } from 'react';
import { TrendingUp, Inbox, Users, Target } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Lead, PortfolioItem } from '@/types';

interface Props {
  leads: Lead[];
  portfolio: PortfolioItem[];
}

const STATUS_COLORS: Record<string, string> = {
  new: '#10b981',
  contacted: '#06b6d4',
  meeting_scheduled: '#f59e0b',
  closed: '#6b7280',
};

export function AnalyticsOverview({ leads, portfolio }: Props) {
  const { t } = useLanguage();

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'new').length;
    const closedLeads = leads.filter((l) => l.status === 'closed').length;
    const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

    const budgetValues = leads
      .filter((l) => l.estimated_budget)
      .map((l) => {
        const match = l.estimated_budget!.match(/€([\d,.]+)/g);
        if (!match || match.length === 0) return 0;
        const nums = match.map((m) => parseInt(m.replace(/[€,.]/g, ''), 10));
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        return avg;
      });
    const avgBudget = budgetValues.length > 0
      ? Math.round(budgetValues.reduce((a, b) => a + b, 0) / budgetValues.length)
      : 0;

    return { totalLeads, newLeads, conversionRate, avgBudget };
  }, [leads]);

  const statusDistribution = useMemo(() => {
    const dist: Record<string, number> = { new: 0, contacted: 0, meeting_scheduled: 0, closed: 0 };
    leads.forEach((l) => { dist[l.status] = (dist[l.status] || 0) + 1; });
    return dist;
  }, [leads]);

  const projectTypes = useMemo(() => {
    const dist: Record<string, number> = {};
    leads.forEach((l) => {
      const type = l.project_type;
      dist[type] = (dist[type] || 0) + 1;
    });
    return Object.entries(dist).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const maxStatus = Math.max(...Object.values(statusDistribution), 1);
  const maxProjectType = Math.max(...projectTypes.map(([, v]) => v), 1);

  const statusLabels: Record<string, string> = {
    new: t.admin.new,
    contacted: t.admin.contacted,
    meeting_scheduled: t.admin.meetingScheduled,
    closed: t.admin.closed,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Inbox className="w-5 h-5" />} label={t.admin.totalLeads} value={stats.totalLeads.toString()} color="emerald" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label={t.admin.newLeads} value={stats.newLeads.toString()} color="cyan" />
        <StatCard icon={<Target className="w-5 h-5" />} label={t.admin.conversionRate} value={`${stats.conversionRate}%`} color="emerald" />
        <StatCard icon={<Users className="w-5 h-5" />} label={t.admin.avgBudget} value={stats.avgBudget > 0 ? `€${stats.avgBudget.toLocaleString()}` : '—'} color="cyan" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-white font-semibold text-sm mb-6">{t.admin.leadDistribution}</h3>
          <div className="space-y-4">
            {Object.entries(statusDistribution).map(([status, count]) => (
              <div key={status}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/60 text-xs">{statusLabels[status]}</span>
                  <span className="text-white/40 text-xs font-mono">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(count / maxStatus) * 100}%`,
                      backgroundColor: STATUS_COLORS[status],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-white font-semibold text-sm mb-6">{t.admin.projectTypes}</h3>
          <div className="space-y-4">
            {projectTypes.length === 0 ? (
              <p className="text-white/30 text-sm">No data yet</p>
            ) : (
              projectTypes.map(([type, count]) => (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white/60 text-xs">{type}</span>
                    <span className="text-white/40 text-xs font-mono">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700"
                      style={{ width: `${(count / maxProjectType) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-4">{t.admin.recentLeads}</h3>
        <div className="space-y-2">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-xs font-bold text-emerald-400">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                <p className="text-white/30 text-xs truncate">{lead.project_type}</p>
              </div>
              <span className="text-white/30 text-xs">{new Date(lead.created_at).toLocaleDateString('de-DE')}</span>
            </div>
          ))}
          {leads.length === 0 && <p className="text-white/30 text-sm text-center py-4">{t.admin.noLeads}</p>}
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-4">Portfolio Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['website', 'ecommerce', 'webapp', 'enterprise'].map((cat) => {
            const count = portfolio.filter((p) => p.category === cat).length;
            return (
              <div key={cat} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-white/40 text-xs capitalize mb-1">{cat}</p>
                <p className="text-2xl font-bold text-white">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'emerald' | 'cyan' }) {
  const colorMap = {
    emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-400',
    cyan: 'from-cyan-500/15 to-cyan-500/5 text-cyan-400',
  };
  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${colorMap[color]} blur-2xl opacity-50`} />
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <p className="text-2xl lg:text-3xl font-bold text-white">{value}</p>
        <p className="text-white/40 text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}
