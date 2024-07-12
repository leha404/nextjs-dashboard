'use client';

import { deleteInvoice, deleteTask } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import CreateForm from '@/app/ui/tasks/create-form';
import { TaskUser } from '@/app/lib/definitions';
import Modal from '@/app/ui/modal';

export function CreateTask({creatorId, taskUsers}: { 
    creatorId: string, 
    taskUsers: TaskUser[]
  }
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Task</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateForm 
          creatorId={creatorId} 
          taskUsers={taskUsers} 
          onClose={() => setIsModalOpen(false)} // Передаем функцию закрытия
        />
      </Modal>
    </>
  );
}

export function UpdateTask({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tasks/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTask({ id }: { id: string }) {
  const deleteTaskWithId = deleteTask.bind(null, id);

  return (
    <>
      <form action={deleteTaskWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
