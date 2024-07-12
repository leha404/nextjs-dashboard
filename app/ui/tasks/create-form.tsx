'use client';

import { CustomerField, TaskUser } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTask, TaskState } from '@/app/lib/actions';
import { useActionState } from 'react';
import TasksStatus from '@/app/ui/tasks/status';
import TasksPriority from '@/app/ui/tasks/priority';

export default function CreateForm({creatorId, taskUsers}: { 
  creatorId: string, 
  taskUsers: TaskUser[]
}) {
  const initialState: TaskState = {message: null, errors: {}}
  const [state, formAction] = useActionState(createTask, initialState);

  const creatorEmail = taskUsers.find((user) => user.id === creatorId)?.email

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Creator Fixed */}
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <h1 className="mb-2 block text-sm">Creator: <div className="font-medium">{creatorEmail}</div></h1>
              <input type="hidden" name="creatorId" value={creatorId} />
            </div>
          </div>
        </div>
        
        {/* Task Users */}
        <div className="mb-4">
          <label htmlFor="responsible" className="mb-2 block text-sm font-medium">
            Choose responsible
          </label>
          <div className="relative">
            <select
              id="responsible"
              name="responsibleId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="responsible-error"
            >
              <option value="" disabled>
                Select a responsible
              </option>
              {taskUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="creator-error" aria-live="polite" aria-atomic="true">
            {state.errors?.responsibleId &&
              state.errors.responsibleId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskname" className="mb-2 block text-sm font-medium">
            Task name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="taskname"
                name="taskname"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="taskname-error"
                required
              />
            </div>
          </div>
          <div id="taskname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.taskname &&
              state.errors.taskname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Task description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Task endDate */}
        <div className="mb-4">
          <label htmlFor="enddate" className="mb-2 block text-sm font-medium">
            Task end date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="enddate"
                name="enddate"
                type="text"
                placeholder="YYYY-MM-DD"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="enddate-error"
              />
            </div>
          </div>
          <div id="enddate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.enddate &&
              state.errors.enddate.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the task status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3" aria-describedby="status-error">
            <div className="flex gap-4">
              
              <div className="flex items-center">
                <input
                  id="todo"
                  name="status"
                  type="radio"
                  value="todo"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="todo"
                  className="ml-2"
                >
                  <TasksStatus status='todo' />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="progress"
                  name="status"
                  type="radio"
                  value="progress"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="progress"
                  className="ml-2"
                >
                  <TasksStatus status='progress' />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="done"
                  name="status"
                  type="radio"
                  value="done"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="done"
                  className="ml-2"
                >
                  <TasksStatus status='done' />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cancelled"
                  name="status"
                  type="radio"
                  value="cancelled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="cancelled"
                  className="ml-2"
                >
                  <TasksStatus status='cancelled' />
                </label>
              </div>

            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Task Priority */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the task priority
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3" aria-describedby="priority-error">
            <div className="flex gap-4">
              
              <div className="flex items-center">
                <input
                  id="high"
                  name="priority"
                  type="radio"
                  value="high"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="high"
                  className="ml-2"
                >
                  <TasksPriority priority='high' />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="mid"
                  name="priority"
                  type="radio"
                  value="mid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="mid"
                  className="ml-2"
                >
                  <TasksPriority priority='mid' />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="low"
                  name="priority"
                  type="radio"
                  value="low"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="low"
                  className="ml-2"
                >
                  <TasksPriority priority='low' />
                </label>
              </div>

            </div>
          </div>
          <div id="priority-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {/* <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link> */}
        <Button type="submit">Create Task</Button>
      </div>
      <div id="main-error" aria-live="polite" aria-atomic="true">
        {(state.errors && state.message) ? state.message : ''}
      </div>
    </form>
  );
}
