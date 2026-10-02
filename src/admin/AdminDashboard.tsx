import { useState, useEffect, useCallback } from 'react';
import { Image, BarChart3, LogOut, ArrowLeft, Hammer, Inbox, AlertCircle } from 'lucide-react';
import { useAuth } from '@/admin/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';
import type { Lead, PortfolioItem, LeadStatus } from '@/types';
import { LeadsManager } from '@/admin/LeadsManager';
import { PortfolioManager } from '@/admin/PortfolioManager';
import { AnalyticsOverview } from '@/admin/AnalyticsOverview';

type Tab = 'leads' | 'portfolio' | 'analytics';
type PortfolioMutation = Partial<PortfolioItem> & { id?: string };

export function AdminDashboard() {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadLeads = useCallback(async (): Promise<boolean> => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      setErrorMessage(t.admin.loadError);
      return false;
    }
    setLeads(data as Lead[]);
    return true;
  }, [t.admin.loadError]);

  const loadPortfolio = useCallback(async (): Promise<boolean> => {
    const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      setErrorMessage(t.admin.loadError);
      return false;
    }
    setPortfolio(data as PortfolioItem[]);
    return true;
  }, [t.admin.loadError]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    void Promise.all([loadLeads(), loadPortfolio()]).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [loadLeads, loadPortfolio]);

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'leads', label: t.admin.leads, icon: <Inbox className="w-4 h-4" />, badge: leads.filter((l) => l.status === 'new').length },
    { key: 'portfolio', label: t.admin.portfolio, icon: <Image className="w-4 h-4" /> },
    { key: 'analytics', label: t.admin.analytics, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleStatusChange = async (id: string, status: LeadStatus): Promise<boolean> => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      setErrorMessage(t.admin.actionError);
      return false;
    }
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    return true;
  };

  const handleDeleteLead = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      setErrorMessage(t.admin.actionError);
      return false;
    }
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    return true;
  };

  const handleSavePortfolio = async (item: PortfolioMutation): Promise<boolean> => {
    if (item.id) {
      const { id, ...updates } = item;
      const { error } = await supabase.from('portfolio_items').update(updates).eq('id', id);
      if (error) {
        setErrorMessage(t.admin.actionError);
        return false;
      }
    } else {
      const { error } = await supabase.from('portfolio_items').insert(item);
      if (error) {
        setErrorMessage(t.admin.actionError);
        return false;
      }
    }

    return loadPortfolio();
  };

  const handleDeletePortfolio = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (error) {
      setErrorMessage(t.admin.actionError);
      return false;
    }
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
    return true;
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <header className="sticky top-0 z-40 bg-obsidian/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-obsidian" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">WebForge <span className="text-white/30 font-normal">Admin</span></span>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.backToSite}</span>
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-panel glass-panel-hover text-white text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex items-center gap-1 mb-8 p-1 glass-panel rounded-xl w-fit">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === tabItem.key
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tabItem.icon}
              {tabItem.label}
              {tabItem.badge !== undefined && tabItem.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${tab === tabItem.key ? 'bg-obsidian/20 text-obsidian' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {tabItem.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{errorMessage}</p>
            <button onClick={() => setErrorMessage('')} className="ml-auto text-xs text-white/50 hover:text-white">Dismiss</button>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <div className="h-32 glass-panel rounded-2xl animate-shimmer" />
            <div className="h-64 glass-panel rounded-2xl animate-shimmer" />
          </div>
        ) : (
          <>
            {tab === 'leads' && (
              <LeadsManager leads={leads} onStatusChange={handleStatusChange} onDelete={handleDeleteLead} />
            )}
            {tab === 'portfolio' && (
              <PortfolioManager portfolio={portfolio} onSave={handleSavePortfolio} onDelete={handleDeletePortfolio} />
            )}
            {tab === 'analytics' && <AnalyticsOverview leads={leads} portfolio={portfolio} />}
          </>
        )}
      </div>
    </div>
  );
}
