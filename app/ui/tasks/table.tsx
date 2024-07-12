import Image from 'next/image';
import { DeleteTask, UpdateTask } from '@/app/ui/tasks/buttons';
import TasksStatus from '@/app/ui/tasks/status';
import TasksPriority from '@/app/ui/tasks/priority';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredTasks } from '@/app/lib/data';

export default async function TasksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center font-medium">
                      <p>{task.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                  <p>Created: {formatDateToLocal(task.create_date)}</p>
                  <p>DateTo: {formatDateToLocal(task.end_date)}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>Creator: {task.creator}</p>
                    <p>User: {task.responsible}</p>
                    <p>Status: <TasksStatus status={task.status} /></p>
                    <p>Priority: <TasksPriority priority={task.priority} /></p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={task.id} />
                    <DeleteTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Create Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creator
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Responsible User
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pl-6 pr-3 w-1/12">
                    <div className="flex items-center gap-3">
                      <p>{task.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3 w-1/6">
                    <div className="flex items-center gap-4">
                      <p>{task.description}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 w-1/12">
                    <TasksStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 w-1/12">
                    <TasksPriority priority={task.priority} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 w-1/12">
                    {formatDateToLocal(task.end_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 w-1/12">
                    {formatDateToLocal(task.create_date)}
                  </td>
                  <td className="px-3 py-3 w-1/12">
                    {task.creator}
                  </td>
                  <td className="px-3 py-3 w-1/12">
                    {task.responsible}
                  </td>
                  <td className="py-3 pl-6 pr-3 w-1/12">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
