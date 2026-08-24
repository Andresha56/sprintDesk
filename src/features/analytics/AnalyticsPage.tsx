import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { columns } from '../../constants/board';
import { Priority } from '../../types';
import { getPriorityData } from '../../utils/getPriorityBreakdown';
import { useTasksQuery, useSprintVelocityQuery } from '../../query';

export function AnalyticsPage() {
  const { data: tasks = [] } = useTasksQuery();
  const { data: sprintVelocity = [] } = useSprintVelocityQuery();

  const completedTask = tasks.filter((task) => task.status === 'done').length;

  const statusData = columns.map((column) => ({
    name: column.label,
    value: tasks.filter((task) => task.status === column.id).length,
    color: column.color,
  }));

  const panel = 'rounded border border-line bg-panel';
  const heading =
    'flex items-start justify-between px-6 pb-[17px] pt-6 max-[650px]:px-[17px] max-[650px]:pb-3 max-[650px]:pt-5';
  const eyebrow =
    'font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted';

  return (
    <>
      <PageHeader eyebrow="REPORTING / SPRINT 24" title="Analytics">
        <button className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-line bg-panel px-[15px] py-2.5 text-xs font-semibold">
          <CalendarDays size={15} />
          Last 30 days
          <ChevronDown size={14} />
        </button>
      </PageHeader>

      <div className="mb-5 grid grid-cols-4 border border-line bg-panel max-[900px]:grid-cols-2">
        <div className="border-r border-line p-5 max-[900px]:border-b max-[900px]:[&:nth-child(2)]:border-r-0">
          <span className={eyebrow}>COMPLETION</span>
          <strong className="my-2.5 block text-[29px]">
            {tasks.length ? Math.round((completedTask / tasks.length) * 100) : 0}%
          </strong>
          <small className="text-[10px] text-green">+12% vs last sprint</small>
        </div>

        <div className="border-r border-line p-5 max-[900px]:border-b max-[900px]:[&:nth-child(2)]:border-r-0">
          <span className={eyebrow}>TOTAL TASKS</span>
          <strong className="my-2.5 block text-[29px]">{tasks.length}</strong>
          <small className="text-[10px] text-muted">Across current sprint</small>
        </div>

        <div className="border-r border-line p-5">
          <span className={eyebrow}>HIGH PRIORITY</span>
          <strong className="my-2.5 block text-[29px]">
            {tasks.filter((task) => task.priority === Priority.High).length}
          </strong>
          <small className="text-[10px] text-muted">Needs attention</small>
        </div>

        <div className="p-5">
          <span className={eyebrow}>AVG. VELOCITY</span>
          <strong className="my-2.5 block text-[29px]">
            {sprintVelocity.length
              ? (
                  sprintVelocity.reduce((sum, s) => sum + s.value, 0) /
                  sprintVelocity.length
                ).toFixed(1)
              : 0}
          </strong>
          <small className="text-[10px] text-muted">Tasks per sprint</small>
        </div>
      </div>

      <div className="grid grid-cols-[1.35fr_.65fr] gap-5 max-[900px]:grid-cols-1">
        <section className={`${panel} min-h-[310px] pb-[15px]`}>
          <div className={heading}>
            <div>
              <p className={eyebrow}>OUTPUT</p>
              <h3 className="mt-1.5 text-[17px]">Sprint velocity</h3>
            </div>
            <span className="font-mono text-[10px] text-muted">Completed tasks</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sprintVelocity} barSize={32}>
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef765d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className={`${panel} min-h-[310px]`}>
          <div className={heading}>
            <div>
              <p className={eyebrow}>DISTRIBUTION</p>
              <h3 className="mt-1.5 text-[17px]">Task status</h3>
            </div>
          </div>

          <div className="flex items-center px-[15px] pb-5 pt-[5px]">
            <ResponsiveContainer width="52%" height={180}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-1 flex-col gap-[11px] font-mono text-[10px]">
              {statusData.map((entry) => (
                <span className="flex items-center gap-1.5" key={entry.name}>
                  <i
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: entry.color }}
                  />
                  {entry.name}
                  <b className="ml-auto font-normal">{entry.value}</b>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={`${panel} col-span-full min-h-[310px] pb-[15px]`}>
          <div className={heading}>
            <div>
              <p className={eyebrow}>COMPOSITION</p>
              <h3 className="mt-1.5 text-[17px]">Priority breakdown</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={getPriorityData(tasks)} barSize={32}>
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="Backlog" stackId="a" fill="#a6a29b" />
              <Bar dataKey="In progress" stackId="a" fill="#ef765d" />
              <Bar dataKey="Review" stackId="a" fill="#d8ad4a" />
              <Bar dataKey="Done" stackId="a" fill="#54a886" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </>
  );
}