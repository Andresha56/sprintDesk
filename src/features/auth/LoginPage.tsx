import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (busy) return;

    setBusy(true);

    setTimeout(() => {
      onLogin();
      navigate('/dashboard', { replace: true });
    }, 650);
  };

  const eyebrow =
    'font-mono text-[10px] font-medium uppercase tracking-[.12em] text-muted';

  const muted = 'leading-relaxed text-muted';

  const input = `
    mt-1.5 block w-full
    border-0 border-b border-[#c9c5ba]
    bg-transparent px-0 py-2.5
    text-sm text-ink
    outline-none
    transition-all duration-300
    placeholder:text-[#aaa79e]
    hover:border-[#8d8a81]
    focus:border-coral
    focus:shadow-[0_1px_0_0_#e86f59]
  `;

  return (
    <main className="min-h-screen overflow-hidden bg-paper">
      <div className="grid min-h-screen grid-cols-[1.1fr_.9fr] max-[800px]:grid-cols-1">
        {/* LEFT PANEL */}
        <section
          className="
            relative flex min-h-screen flex-col justify-between
            overflow-hidden bg-ink
            px-[10%] py-[54px]
            text-[#f8f5ed]
            animate-[fadeIn_.8s_ease-out]
            max-[800px]:min-h-[440px]
            max-[650px]:min-h-[390px]
            max-[650px]:px-[30px]
            max-[650px]:py-7
          "
        >
          {/* Decorative background */}
          <div
            className="
              pointer-events-none absolute -right-32 -top-32
              h-80 w-80 rounded-full
              border border-[#65665f]/20
              animate-[slowSpin_25s_linear_infinite]
            "
          />

          <div
            className="
              pointer-events-none absolute -bottom-40 -left-40
              h-96 w-96 rounded-full
              border border-coral/10
              animate-[slowSpin_30s_linear_infinite_reverse]
            "
          />

          {/* Subtle grid */}
          <div
            className="
              pointer-events-none absolute inset-0 opacity-[0.025]
              [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />

          {/* Logo */}
          <div
            className="
              relative z-10 mb-auto grid h-[34px] w-[34px]
              place-items-center rounded-full
              border border-[#65665f]
              font-mono text-xs
              transition-all duration-500
              hover:rotate-12 hover:border-coral hover:text-coral
            "
          >
            SD
          </div>

          {/* Hero content */}
          <div className="relative z-10">
            <p className={`${eyebrow} animate-[slideUp_.7s_.1s_both]`}>
              SPRINTDESK / 2026
            </p>

            <h1
              className="
                mb-[19px] mt-[25vh]
                text-[clamp(44px,5vw,70px)]
                font-medium leading-[1.02]
                tracking-[-0.04em]
                animate-[slideUp_.8s_.2s_both]
                max-[800px]:mt-[80px]
                max-[650px]:mb-[13px]
                max-[650px]:mt-[45px]
                max-[650px]:text-[44px]
              "
            >
              Good work
              <br />
              <em
                className="
                  font-display text-coral
                  not-italic
                  transition-colors duration-500
                  hover:text-[#ff836d]
                "
              >
                moves visibly.
              </em>
            </h1>

            <p
              className={`
                ${muted}
                max-w-[280px]
                text-[13px] text-[#96978f]
                animate-[slideUp_.8s_.35s_both]
              `}
            >
              One calm place for the work between planning and shipped.
            </p>
          </div>

          {/* Footer */}
          <div
            className="
              relative z-10
              mt-10
              font-mono text-[10px]
              tracking-wider text-[#92938b]
              animate-[fadeIn_.8s_.5s_both]
              max-[650px]:mt-[30px]
            "
          >
            SPRINT 24
            <span className="mx-2 text-coral animate-pulse">●</span>
            AUG 18 — AUG 29
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section
          className="
            flex min-h-screen items-center justify-center
            bg-paper px-6
            max-[800px]:min-h-[calc(100vh-390px)]
            max-[650px]:min-h-0
            max-[650px]:px-[30px]
            max-[650px]:py-14
          "
        >
          <form
            onSubmit={submit}
            className="
              m-auto flex w-[min(330px,100%)]
              flex-col gap-[21px]
              animate-[slideRight_.8s_.15s_both]
            "
          >
            {/* Brand */}
            <div
              className="
                mb-[65px]
                flex items-center gap-2.5
                text-[17px] font-bold
                tracking-[-.03em] text-ink
                max-[650px]:mb-[35px]
              "
            >
              <span
                className="
                  grid h-7 w-7 place-items-center
                  rounded-full bg-coral
                  font-mono text-[13px]
                  font-semibold text-white
                  shadow-[0_5px_15px_rgba(232,111,89,.25)]
                  transition-transform duration-300
                  hover:scale-110
                "
              >
                S
              </span>

              <span>SprintDesk</span>
            </div>

            {/* Heading */}
            <div>
              <p className={eyebrow}>WELCOME BACK</p>

              <h2
                className="
                  mb-1 mt-2
                  text-[26px]
                  font-medium
                  tracking-[-.025em]
                  text-ink
                "
              >
                Sign in to your workspace
              </h2>

              <p className={`${muted} text-sm`}>
                Pick up where your team left off.
              </p>
            </div>

            {/* Username */}
            <label className="text-[11px] font-medium text-muted">
              Username

              <input
                name="username"
                className={input}
                required
                defaultValue="emilys"
                autoComplete="username"
                placeholder="Enter your username"
                aria-label="Username"
              />
            </label>

            {/* Password */}
            <label className="text-[11px] font-medium text-muted">
              Password

              <input
                name="password"
                className={input}
                required
                type="password"
                defaultValue="emilyspass"
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-label="Password"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy}
              className="
                group
                relative inline-flex w-full
                cursor-pointer items-center
                justify-between gap-2
                overflow-hidden
                whitespace-nowrap rounded-sm
                border border-transparent
                bg-coral px-4 py-3.5
                text-xs font-semibold text-white
                shadow-[0_6px_20px_rgba(232,111,89,.18)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#d95f49]
                hover:shadow-[0_10px_25px_rgba(232,111,89,.25)]
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {/* Button shine */}
              <span
                className="
                  pointer-events-none absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent via-white/10 to-transparent
                  transition-transform duration-700
                  group-hover:translate-x-full
                "
              />

              <span className="relative z-10">
                {busy ? 'Signing you in...' : 'Enter workspace'}
              </span>

              <span
                className={`
                  relative z-10 text-base
                  transition-transform duration-300
                  ${busy ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}
                `}
              >
                {busy ? '...' : '↗'}
              </span>
            </button>

            {/* Footer */}
            <p className="mt-1 text-center font-mono text-[10px] text-muted">
              Secure workspace access
            </p>
          </form>
        </section>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}