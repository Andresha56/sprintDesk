import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  LayoutGrid,
  LogOut,
  Target,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

type SidebarProps = {
  onLogout: () => void;
};

export function Sidebar({ onLogout }: SidebarProps) {
  const navItem =
    'flex items-center gap-3 rounded px-2.5 py-2.5 text-[13px] text-[#999b94] hover:bg-[#30312d] hover:text-white';

  return (
    <aside
      className="
        sticky top-0
    flex h-screen w-[236px] flex-none flex-col
    bg-ink px-[18px] pb-5 pt-[27px]
    text-[#e9e4d9]
    max-[900px]:w-[190px]
    max-[650px]:hidden
      "
    >
      <Link
        to="/dashboard"
        className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.03em]"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-coral font-mono text-[13px] font-semibold text-white">
          S
        </span>

        <span>SprintDesk</span>
      </Link>

      <div className="mx-1 mb-[31px] mt-[42px] flex items-center gap-2 border-b border-[#363733] pb-5 text-xs">
        <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[#557a87] font-mono text-[10px] text-white">
          PT
        </div>

        <div className="flex-1">
          <b className="block">Product team</b>

          <small className="mt-[3px] block text-[10px] text-[#85857f]">
            Personal workspace
          </small>
        </div>

        <ChevronDown size={15} />
      </div>

      <nav className="flex flex-col gap-[3px]">
        <p className="mx-2 mb-2 font-mono text-[9px] font-medium uppercase tracking-[.1em] text-muted">
          WORKSPACE
        </p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navItem}${isActive ? ' bg-[#30312d] text-white' : ''}`
          }
        >
          <LayoutGrid size={17} />
          Overview
        </NavLink>

        <NavLink
          to="/board"
          className={({ isActive }) =>
            `${navItem}${isActive ? ' bg-[#30312d] text-white' : ''}`
          }
        >
          <Target size={17} />
          Sprint board

          <span className="ml-auto rounded-xl bg-[#454640] px-2 py-0.5 font-mono text-[10px]">
            6
          </span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${navItem}${isActive ? ' bg-[#30312d] text-white' : ''}`
          }
        >
          <BarChart3 size={17} />
          Analytics
        </NavLink>

        <p className="mx-2 mb-2 mt-7 font-mono text-[9px] font-medium uppercase tracking-[.1em] text-muted">
          MANAGE
        </p>

        <a className={navItem} href="#calendar">
          <CalendarDays size={17} />
          Calendar
        </a>

        <a className={navItem} href="#help">
          <CircleHelp size={17} />
          Help center
        </a>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-2.5 border-y border-[#363733] px-2.5 py-3.5">
          <span className="grid h-[35px] w-[35px] place-items-center rounded-full border-2 border-coral font-mono text-[9px] text-coral">
            76%
          </span>

          <div>
            <b className="block">Sprint 24</b>

            <small className="mt-[3px] block text-[10px] text-[#85857f]">
              5 days remaining
            </small>
          </div>
        </div>

        <button
          className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent px-2.5 pt-3.5 text-xs text-[#92938d]"
          onClick={onLogout}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}