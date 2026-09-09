import { useState, useEffect, useCallback } from 'react';
import { Lock, LogOut, Eye, Archive, X, BarChart3, Inbox, PhoneCall, Trophy, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';

interface Quote {
  id: string;
  website_type: string;
  num_pages: number;
  num_images: number;
  online_payments: boolean;
  notifications: boolean;
  multilingual: boolean;
  languages: string;
  price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string;
  status: string;
  created_at: string;
  archived_at: string | null;
}

export function AdminDashboard() {
  const { t, language } = useLanguage();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [dashboardError, setDashboardError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: unknown) => {
      setAuthed(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Admin quote fetch failed', error);
      if (error.code === '42501') {
        await supabase.auth.signOut();
        return;
      }
      setDashboardError(t.admin.databaseError);
    } else if (data) {
      setQuotes(data as Quote[]);
      setDashboardError('');
    }
    setLoading(false);
  }, [t.admin.databaseError]);

  useEffect(() => {
    if (authed) fetchQuotes();
  }, [authed, fetchQuotes]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(t.admin.loginError);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setQuotes([]);
    setSelectedQuote(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('quotes').update({ status: newStatus }).eq('id', id);
    if (error) {
      console.error('Quote status update failed', error);
      setDashboardError(t.admin.databaseError);
      return;
    }
    setQuotes((current) => current.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
    setSelectedQuote((current) => (current?.id === id ? { ...current, status: newStatus } : current));
    setDashboardError('');
  };

  const handleArchive = async (id: string) => {
    if (!confirm(t.admin.deleteConfirm)) return;
    const { error } = await supabase
      .from('quotes')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      console.error('Quote archive failed', error);
      setDashboardError(t.admin.databaseError);
      return;
    }
    setQuotes((current) => current.filter((q) => q.id !== id));
    setSelectedQuote(null);
    setDashboardError('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-brand-500/20 text-brand-400 border-brand-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'won': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'lost': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-700 text-slate-400 border-slate-600';
    }
  };

  const getTypeLabel = (type: string) => {
    const wt = t.quote.websiteTypes.find((w) => w.value === type);
    return wt?.label ?? type;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'bg' ? 'bg-BG' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-dark">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-dark px-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-brand-card p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t.admin.login}</h1>
            <p className="text-sm text-slate-400 mt-1">WebForge Studio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.admin.username}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white focus:border-brand-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.admin.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            {loginError && (
              <p role="alert" className="text-sm text-red-400">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              {t.admin.loginBtn}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
              ← {language === 'bg' ? 'Обратно към сайта' : 'Back to site'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const newCount = quotes.filter((q) => q.status === 'new').length;
  const contactedCount = quotes.filter((q) => q.status === 'contacted').length;
  const wonCount = quotes.filter((q) => q.status === 'won').length;

  return (
    <div className="min-h-screen bg-brand-dark px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-brand-400" />
              {t.admin.dashboard}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">WebForge Studio</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4" />
            {t.admin.logout}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-brand-card p-5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <Inbox className="h-4 w-4" />
              {t.admin.totalQuotes}
            </div>
            <p className="text-3xl font-extrabold text-white">{quotes.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-brand-card p-5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              {t.admin.newQuotes}
            </div>
            <p className="text-3xl font-extrabold text-brand-400">{newCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-brand-card p-5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <PhoneCall className="h-4 w-4" />
              {t.admin.contactedQuotes}
            </div>
            <p className="text-3xl font-extrabold text-blue-400">{contactedCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-brand-card p-5">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <Trophy className="h-4 w-4" />
              {t.admin.wonQuotes}
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">{wonCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-brand-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">{t.admin.quotesList}</h2>
          </div>
          {dashboardError && (
            <p role="alert" className="border-b border-red-500/20 bg-red-500/10 px-6 py-3 text-sm text-red-300">
              {dashboardError}
            </p>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
            </div>
          ) : quotes.length === 0 ? (
            <div className="py-16 text-center text-slate-400">{t.admin.noQuotes}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="px-6 py-3 text-left font-medium">{t.admin.customer}</th>
                    <th className="px-6 py-3 text-left font-medium hidden md:table-cell">{t.admin.type}</th>
                    <th className="px-6 py-3 text-left font-medium">{t.admin.price}</th>
                    <th className="px-6 py-3 text-left font-medium">{t.admin.status}</th>
                    <th className="px-6 py-3 text-left font-medium hidden md:table-cell">{t.admin.date}</th>
                    <th className="px-6 py-3 text-right font-medium">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{q.customer_name}</p>
                        <p className="text-xs text-slate-400">{q.customer_email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300 hidden md:table-cell">{getTypeLabel(q.website_type)}</td>
                      <td className="px-6 py-4 font-semibold text-brand-400">€{q.price}</td>
                      <td className="px-6 py-4">
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer ${getStatusColor(q.status)}`}
                        >
                          <option value="new">{t.admin.statusNew}</option>
                          <option value="contacted">{t.admin.statusContacted}</option>
                          <option value="won">{t.admin.statusWon}</option>
                          <option value="lost">{t.admin.statusLost}</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs hidden md:table-cell">{formatDate(q.created_at)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedQuote(q)}
                            aria-label={t.admin.view}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleArchive(q.id)}
                            aria-label={t.admin.delete}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-brand-dark shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-brand-dark/95 backdrop-blur-md px-6 py-4">
              <h3 className="text-lg font-bold text-white">{t.admin.quoteDetails}</h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t.admin.customer}</p>
                  <p className="font-medium text-white">{selectedQuote.customer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t.admin.contact}</p>
                  <p className="font-medium text-white text-sm">{selectedQuote.customer_email}</p>
                </div>
                {selectedQuote.customer_phone && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">{t.admin.phone}</p>
                    <p className="font-medium text-white text-sm">{selectedQuote.customer_phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t.admin.date}</p>
                  <p className="font-medium text-white text-sm">{formatDate(selectedQuote.created_at)}</p>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.admin.type}</span>
                  <span className="font-medium text-white">{getTypeLabel(selectedQuote.website_type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.admin.pages}</span>
                  <span className="font-medium text-white">{selectedQuote.num_pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.admin.images}</span>
                  <span className="font-medium text-white">{selectedQuote.num_images}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.quote.onlinePayments}</span>
                  <span className="font-medium text-white">{selectedQuote.online_payments ? t.admin.yes : t.admin.no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.quote.notifications}</span>
                  <span className="font-medium text-white">{selectedQuote.notifications ? t.admin.yes : t.admin.no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.quote.multilingual}</span>
                  <span className="font-medium text-white">{selectedQuote.multilingual ? t.admin.yes : t.admin.no}</span>
                </div>
                {selectedQuote.multilingual && selectedQuote.languages && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.admin.languages}</span>
                    <span className="font-medium text-white">{selectedQuote.languages}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-800 pt-3">
                  <span className="text-base font-bold text-white">{t.admin.price}</span>
                  <span className="text-2xl font-extrabold text-brand-400">€{selectedQuote.price}</span>
                </div>
              </div>
              {selectedQuote.notes && (
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs text-slate-400 mb-1">{t.admin.notes}</p>
                  <p className="text-sm text-slate-300">{selectedQuote.notes}</p>
                </div>
              )}
              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs text-slate-400 mb-2">{t.admin.status}</p>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium cursor-pointer ${getStatusColor(selectedQuote.status)}`}
                >
                  <option value="new">{t.admin.statusNew}</option>
                  <option value="contacted">{t.admin.statusContacted}</option>
                  <option value="won">{t.admin.statusWon}</option>
                  <option value="lost">{t.admin.statusLost}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
