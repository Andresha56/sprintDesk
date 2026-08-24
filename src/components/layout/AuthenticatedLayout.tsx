import { Menu, Moon, Search, Sun } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { NotificationBell } from '../notifications/NotificationBell';

type AuthenticatedLayoutProps = {
  onLogout: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
};

export function AuthenticatedLayout({
  onLogout,
  dark,
  setDark,
}: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar onLogout={onLogout} />

      <div className="min-w-0 flex-1">
        <header
          className="
            flex h-[72px] items-center justify-between
            border-b border-line px-[5.2%]
            max-[650px]:h-[62px]
            max-[650px]:px-5
          "
        >
          <button
            className="
              relative hidden cursor-pointer place-items-center
              border-0 bg-transparent p-1 text-muted
              hover:text-ink
              max-[650px]:grid
            "
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>

          <div className="text-xs text-muted">
            Product team{' '}
            <span className="mx-2 text-line">/</span>{' '}
            <strong className="font-medium text-ink">Sprint 24</strong>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              className="
                relative grid cursor-pointer place-items-center
                border-0 bg-transparent p-1 text-muted
                hover:text-ink
              "
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button
              className="
                relative grid cursor-pointer place-items-center
                border-0 bg-transparent p-1 text-muted
                hover:text-ink
              "
              aria-label="Toggle theme"
              onClick={() => {
                setDark(!dark);
                localStorage.setItem(
                  'sprintdesk-theme',
                  !dark ? 'dark' : 'light',
                );
              }}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <NotificationBell />

            <div
              className="
                grid h-7 w-7 flex-none place-items-center
                rounded-full bg-[#e56c55]
                font-mono text-[10px] text-white
              "
            >
              MC
            </div>
          </div>
        </header>

        <main
          className="
            mx-auto max-w-[1260px]
            px-[5.2%] pb-[70px] pt-[51px]
            max-[900px]:px-[4%]
            max-[900px]:pt-[38px]
            max-[650px]:px-[18px]
            max-[650px]:pb-[50px]
            max-[650px]:pt-7
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}