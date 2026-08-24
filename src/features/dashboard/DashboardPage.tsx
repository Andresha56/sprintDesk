import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { Activity } from '../../components/common/Activity';
import { TaskRow } from '../../components/board/TaskRow';
import { PageHeader } from '../../components/layout/PageHeader';
import { useBoardStore } from '../../store/useBoardStore';
import { formatRelativeTime } from '../../utils/formatRelativeTimes';

export function DashboardPage() {
  const tasks = useBoardStore((state) => state.tasks);

  const {
    done,
    progress,
    inProgress,
    inReview,
    pendingTasks,
  } = useMemo(() => {
    const done = tasks.filter(
      (task) => task.status === 'done',
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === 'progress',
    ).length;

    const inReview = tasks.filter(
      (task) => task.status === 'review',
    ).length;

    const pendingTasks = tasks
      .filter((task) => task.status !== 'done')
      .slice(0, 4);

    const progress = tasks.length
      ? Math.round((done / tasks.length) * 100)
      : 0;

    return {
      done,
      progress,
      inProgress,
      inReview,
      pendingTasks,
    };
  }, [tasks]);
  console.log(tasks)
  const recentTasks = useMemo(() => {
  return tasks
    .toSorted(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    )
    .slice(0, 4);
}, [tasks]);

  const eyebrow =
    'font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted';

  const panel =
    'rounded border border-line bg-panel';

  const panelHeading =
    'flex items-start justify-between px-6 pb-[17px] pt-6 max-[650px]:px-[17px] max-[650px]:pb-3 max-[650px]:pt-5';

  return (
    <>
      <PageHeader
        eyebrow="CURRENT SPRINT"
        title="Good morning, Maya."
      >
        <Link
          className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-line bg-panel px-[15px] py-2.5 text-xs font-semibold text-ink"
          to="/board"
        >
          View board <span>↗</span>
        </Link>

        <Link
          className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-transparent bg-coral px-[15px] py-2.5 text-xs font-semibold text-white hover:bg-[#d95f49]"
          to="/board"
        >
          <Plus size={16} />
          Add task
        </Link>
      </PageHeader>

      <section
        className="
          mb-7 grid grid-cols-[1.2fr_.65fr_1fr]
          items-center border border-[#d9e1d8]
          bg-[#e8eee8] px-8 py-7
          max-[900px]:grid-cols-2
          max-[900px]:gap-[25px]
          max-[650px]:grid-cols-1
          max-[650px]:p-[23px]
        "
      >
        <div>
          <p className={eyebrow}>
            CURRENT SPRINT
          </p>

          <h2 className="mb-1.5 mt-1.5 text-[25px]">
            Make the invisible work visible.
          </h2>
        </div>

        <div
          className="
            border-l border-[#cbd5cb] pl-8
            max-[650px]:border-0
            max-[650px]:border-t
            max-[650px]:p-5
            max-[650px]:px-0
          "
        >
          <strong className="text-[46px] leading-none">
            {done}

            <small className="text-[19px] text-[#a1aba1]">
              /{tasks.length}
            </small>
          </strong>

          <span className="mt-1 block text-[11px] text-[#6e796f]">
            tasks complete
          </span>
        </div>

        <div
          className="
            pl-5
            max-[900px]:p-0
            max-[650px]:col-span-full
          "
        >
          <div
            className="
              mb-2.5 flex justify-between
              font-mono text-[10px]
              uppercase tracking-[.1em] text-[#708074]
            "
          >
            <span>SPRINT PROGRESS</span>

            <b className="font-mono text-xs text-[#536257]">
              {progress}%
            </b>
          </div>

          <div className="h-[5px] bg-[#d0d9d0]">
            <i
              className="block h-full bg-green"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-[1.25fr_.75fr] gap-5 max-[900px]:grid-cols-1">
        <section className={panel}>
          <div className={panelHeading}>
            <div>
              <p className={eyebrow}>TEAM FOCUS</p>

              <h3 className="mt-1.5 text-[17px]">
                What needs your attention
              </h3>
            </div>

            <Link
              to="/board"
              className="text-[11px] text-muted"
            >
              See all ↗
            </Link>
          </div>

          {pendingTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
            />
          ))}
        </section>

        <section className={`${panel} pb-5`}>
          <div className={panelHeading}>
            <div>
              <p className={eyebrow}>SPRINT PULSE</p>

              <h3 className="mt-1.5 text-[17px]">
                At a glance
              </h3>
            </div>

            <span className="inline-flex items-center gap-[5px] font-mono text-[9px] text-green">
              <i className="h-[5px] w-[5px] rounded-full bg-green" />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 px-6 pb-[22px] pt-[9px]">
            <div>
              <strong className="block text-[28px]">
                {tasks.length}
              </strong>

              <span className="mt-1 block font-mono text-[10px] text-muted">
                All tasks
              </span>
            </div>

            <div>
              <strong className="block text-[28px]">
                {inProgress}
              </strong>

              <span className="mt-1 block font-mono text-[10px] text-muted">
                In progress
              </span>
            </div>

            <div>
              <strong className="block text-[28px]">
                {inReview}
              </strong>

              <span className="mt-1 block font-mono text-[10px] text-muted">
                In review
              </span>
            </div>
          </div>
        </section>
      </div>

    <section className={`${panel} pb-[5px]`}>
  <div className={panelHeading}>
    <div>
      <p className={eyebrow}>RECENT ACTIVITY</p>

      <h3 className="mt-1.5 text-[17px]">
        Team timeline
      </h3>
    </div>
  </div>

  {recentTasks.map((task) => (
    <Activity
      key={task.id}
      icon={task.status === 'done' ? '✓' : '↗'}
      color={
        task.status === 'done'
          ? 'green'
          : task.status === 'progress'
            ? 'coral'
            : 'gold'
      }
      text={`${task?.assignee?.name} updated ${task.title}`}
      time={formatRelativeTime(task.updatedAt)}
    />
  ))}
</section>
    </>
  );
}