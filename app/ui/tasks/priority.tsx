import { CheckIcon, ClockIcon, ExclamationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TasksPriority({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-500 text-white': priority === 'high',
          'bg-orange-500 text-white': priority === 'mid',
          'bg-green-500 text-white': priority === 'low',
        },
      )}
    >
      <>{priority}</>
    </span>
  );
}
