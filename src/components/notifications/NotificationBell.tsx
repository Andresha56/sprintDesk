import { Bell, CheckCheck, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBoardStore } from '../../store/useBoardStore';

type Post = { id: number; title: string; body: string };

const POLL_INTERVAL = 30_000;
const PAGE_SIZE = 20;
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

const formatTime = (timestamp: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(timestamp));

export function NotificationBell() {
  const notices = useBoardStore((state) => state.notices);
  const addNotice = useBoardStore((state) => state.addNotice);
  const markRead = useBoardStore((state) => state.markRead);
  const markAllRead = useBoardStore((state) => state.markAllRead);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const knownIds = useRef(new Set<number>());
  const hasPolled = useRef(false);

  useEffect(() => {
    knownIds.current = new Set(notices.map((notice) => notice.id));
  }, [notices]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, Math.ceil(notices.length / PAGE_SIZE) - 1)));
  }, [notices.length]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 5_000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const poll = useCallback(async () => {
    if (document.hidden) return;

    try {
      const response = await fetch(POSTS_URL);
      if (!response.ok) throw new Error('Unable to fetch notifications');
      const posts = (await response.json()) as Post[];
      const newPosts = posts.filter((post) => !knownIds.current.has(post.id));

      newPosts.forEach((post) => {
        knownIds.current.add(post.id);
        addNotice({ id: post.id, title: post.title, body: post.body, read: false, createdAt: new Date().toISOString() });
      });

      if (hasPolled.current && !open && newPosts.length) {
        setToast(`${newPosts.length} new notification${newPosts.length === 1 ? '' : 's'}`);
      }
      hasPolled.current = true;
    } catch {
      // Polling is best-effort; the next interval retries automatically.
    }
  }, [addNotice, open]);

  useEffect(() => {
    void poll();
    const interval = window.setInterval(() => void poll(), POLL_INTERVAL);
    const onVisibilityChange = () => { if (!document.hidden) void poll(); };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [poll]);

  const unread = notices.filter((notice) => !notice.read).length;
  const currentNotices = notices.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(notices.length / PAGE_SIZE));

  return (
    <div className="relative">
      <button className="relative grid cursor-pointer place-items-center border-0 bg-transparent p-1 text-muted hover:text-ink" aria-label="Notifications" aria-expanded={open} onClick={() => { setOpen((value) => !value); setToast(null); }}>
        <Bell size={18} />
        {unread > 0 && <span className="absolute -right-2 -top-2 grid min-w-4 place-items-center rounded-full bg-coral px-1 font-mono text-[9px] leading-4 text-white">{unread > 99 ? '99+' : unread}</span>}
      </button>

      {toast && <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 border border-line bg-panel px-4 py-3 text-xs shadow-lg" role="status">
        <Bell size={16} className="text-coral" /><span>{toast}</span>
        <button className="border-0 bg-transparent p-0 text-muted" onClick={() => setToast(null)} aria-label="Dismiss notification"><X size={15} /></button>
      </div>}

      {open && <section className="absolute right-0 top-9 z-40 w-[min(380px,calc(100vw-32px))] border border-line bg-panel shadow-lg" aria-label="Notifications panel">
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <div><h2 className="text-sm">Notifications</h2><p className="mt-0.5 font-mono text-[9px] text-muted">{unread} unread</p></div>
          <button className="inline-flex items-center gap-1 border-0 bg-transparent p-1 text-[10px] text-muted hover:text-ink disabled:opacity-40" onClick={markAllRead} disabled={!unread}><CheckCheck size={14} /> Mark all read</button>
        </header>

        <div className="max-h-[420px] overflow-y-auto">
          {currentNotices.length ? currentNotices.map((notice) => <button key={notice.id} className={`flex w-full gap-2 border-0 border-b border-line px-4 py-3 text-left hover:bg-wash ${notice.read ? '' : 'bg-wash/60'}`} onClick={() => { if (!notice.read) markRead(notice.id); }}>
            <i className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${notice.read ? 'bg-transparent' : 'bg-coral'}`} />
            <span className="min-w-0"><b className="block truncate text-[11px] font-medium">{notice.title}</b><span className="mt-1 block line-clamp-2 text-[10px] leading-relaxed text-muted">{notice.body}</span><time className="mt-1 block font-mono text-[9px] text-muted">{formatTime(notice.createdAt)}</time></span>
          </button>) : <p className="px-4 py-8 text-center text-xs text-muted">You’re all caught up.</p>}
        </div>

        {notices.length > PAGE_SIZE && <footer className="flex items-center justify-between px-4 py-2.5 font-mono text-[10px] text-muted">
          <button className="p-1 disabled:opacity-40" onClick={() => setPage((value) => value - 1)} disabled={!page} aria-label="Previous page"><ChevronLeft size={15} /></button>
          <span>{page + 1} / {pageCount}</span>
          <button className="p-1 disabled:opacity-40" onClick={() => setPage((value) => value + 1)} disabled={page >= pageCount - 1} aria-label="Next page"><ChevronRight size={15} /></button>
        </footer>}
      </section>}
    </div>
  );
}
