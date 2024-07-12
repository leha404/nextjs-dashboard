import { CheckIcon, ClockIcon, ExclamationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TasksStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-cyan-500 text-white': status === 'todo',
          'bg-orange-500 text-white': status === 'progress',
          'bg-green-500 text-white': status === 'done',
          'bg-gray-500 text-white': status === 'cancelled',
        },
      )}
    >
      {status === 'todo' ? (
        <>
          ToDo
          <ExclamationCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'progress' ? (
        <>
          Progress...
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'done' ? (
        <>
          Done!
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          Cancelled
          <QuestionMarkCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
