import { fetchFilteredTasks } from '@/app/lib/data';
import TasksTableClient from '@/app/ui/tasks/TasksTableClient';
import React from 'react';

export default async function TasksTable({
  query,
  currentPage,
  userId
}: {
  query: string;
  currentPage: number;
  userId: string
}) {
  const tasks = await fetchFilteredTasks(query, currentPage, userId);

  return (
    <TasksTableClient tasks={tasks} userId={userId} />
  );
}