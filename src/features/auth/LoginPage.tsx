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

    setBusy(true);

    setTimeout(() => {
      onLogin();
      navigate('/dashboard', { replace: true });
    }, 450);
  };

  const eyebrow =
    'font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted';

  const muted = 'leading-relaxed text-muted';

  const input =
    'border-0 border-b border-[#c9c5ba] bg-transparent px-0 py-2.5 focus:border-coral';

  return (
    <main className="grid min-h-screen grid-cols-[1.1fr_.9fr] bg-paper max-[650px]:grid-cols-1">
      <div
        className="
          flex flex-col justify-between
          bg-ink px-[10%] py-[54px]
          text-[#f8f5ed]
          max-[650px]:min-h-[330px]
          max-[650px]:px-[30px]
          max-[650px]:py-7
        "
      >
        <div
          className="
            mb-auto grid h-[34px] w-[34px]
            place-items-center rounded-full
            border border-[#65665f]
            font-mono text-xs
          "
        >
          SD
        </div>

        <div>
          <p className={eyebrow}>SPRINTDESK / 2026</p>

          <h1
            className="
              mb-[19px] mt-[25vh]
              text-[clamp(44px,5vw,70px)]
              font-medium leading-tight
              max-[650px]:mb-[13px]
              max-[650px]:mt-[35px]
              max-[650px]:text-[44px]
            "
          >
            Good work
            <br />
            <em className="font-display text-coral">moves visibly.</em>
          </h1>

          <p
            className={`${muted} max-w-[280px] text-[13px] text-[#96978f]`}
          >
            One calm place for the work between planning and shipped.
          </p>
        </div>

        <div
          className="
            font-mono text-[10px] tracking-wider text-[#92938b]
            max-[650px]:mt-[30px]
          "
        >
          SPRINT 24 <span className="mx-2 text-coral">●</span> AUG 18 — AUG 29
        </div>
      </div>

      <form
        className="
          m-auto flex w-[min(330px,80%)] flex-col gap-[21px]
          max-[650px]:w-[calc(100%-60px)]
          max-[650px]:py-10
        "
        onSubmit={submit}
      >
        <div className="mb-[65px] flex items-center gap-2.5 text-[17px] font-bold tracking-[-.03em] text-ink max-[650px]:mb-[25px]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-coral font-mono text-[13px] font-semibold text-white">
            S
          </span>

          <span>SprintDesk</span>
        </div>

        <div>
          <p className={eyebrow}>WELCOME BACK</p>

          <h2 className="mb-1 mt-2 text-[26px]">
            Sign in to your workspace
          </h2>

          <p className={muted}>Pick up where your team left off.</p>
        </div>

        <label className="text-[11px] text-muted">
          Username

          <input
            className={`mt-1.5 block w-full ${input}`}
            required
            defaultValue="emilys"
            autoComplete="username"
          />
        </label>

        <label className="text-[11px] text-muted">
          Password

          <input
            className={`mt-1.5 block w-full ${input}`}
            required
            type="password"
            defaultValue="emilyspass"
            autoComplete="current-password"
          />
        </label>

        <button
          className="
            inline-flex w-full cursor-pointer
            items-center justify-between gap-2
            whitespace-nowrap rounded-sm
            border border-transparent
            bg-coral px-4 py-3.5
            text-xs font-semibold text-white
            hover:bg-[#d95f49]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          disabled={busy}
        >
          {busy ? 'Signing you in...' : 'Enter workspace'}
          <span>↗</span>
        </button>

        <p className="text-center font-mono text-[10px] text-muted">
          Demo access is enabled for this assessment.
        </p>
      </form>
    </main>
  );
}