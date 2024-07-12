'use client';

import React, { useState } from 'react';
import { DeleteTask, UpdateTask } from '@/app/ui/tasks/buttons';
import TasksStatus from '@/app/ui/tasks/status';
import TasksPriority from '@/app/ui/tasks/priority';
import { formatDateToLocal } from '@/app/lib/utils';
import { isToday, isThisWeek } from 'date-fns';
import { TasksTable } from '@/app/lib/definitions';

export default function TasksTableClient({ 
    tasks, 
    userId 
}: {
    tasks: TasksTable[],
    userId: string
}) {
    const [grouped, setGrouped] = useState(true);

    const groupedTasks = tasks.reduce((acc: { [key: string]: any[] }, task) => {
        (acc[task.responsible] = acc[task.responsible] || []).push(task);
        return acc;
    }, {});

    const groupByEndDate = (tasks: any[]) => {
        return tasks.reduce((acc: { [key: string]: any[] }, task) => {
            const endDate = new Date(task.end_date);
            let key = 'later';
            if (isToday(endDate)) {
                key = 'today';
            } else if (isThisWeek(endDate)) {
                key = 'this_week';
            }
            (acc[key] = acc[key] || []).push(task);
            return acc;
        }, {});
    };

    const sortOrder = ['today', 'this_week', 'later'];

    return (
        <div className="mt-6 flow-root">
            <button onClick={() => setGrouped(!grouped)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                {grouped ? 'Без группировки' : 'Группировать по дням'}
            </button>
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {Object.keys(groupedTasks).map((user) => {
                            const tasksByEndDate = groupByEndDate(groupedTasks[user]);
                            return (
                                <div key={user}>
                                    <h2 className="text-lg font-bold">{user}</h2>
                                    {grouped ? (
                                        sortOrder.map((dateGroup) => (
                                            tasksByEndDate[dateGroup] && (
                                                <div key={dateGroup}>
                                                    <h3 className="text-md font-semibold">
                                                        {dateGroup === 'today' ? 'Сегодня' : dateGroup === 'this_week' ? 'На этой неделе' : 'Позже'}
                                                    </h3>
                                                    {tasksByEndDate[dateGroup].map((task) => (
                                                        <div
                                                            key={task.id}
                                                            className="mb-2 w-full rounded-md bg-white p-4"
                                                        >
                                                            <div className="flex items-center justify-between border-b pb-4">
                                                                <div>
                                                                    <div className="mb-2 flex items-center font-medium">
                                                                        <p>{task.name}</p>
                                                                    </div>
                                                                </div>
                                                                <p>DateTo: {formatDateToLocal(task.end_date)}</p>
                                                            </div>
                                                            <div className="flex w-full items-center justify-between pt-4">
                                                                <div>
                                                                    <p>User: {task.responsible}</p>
                                                                    <p>Status: <TasksStatus status={task.status} /></p>
                                                                    <p>Priority: <TasksPriority priority={task.priority} /></p>
                                                                </div>
                                                                <div className="flex justify-end gap-2">
                                                                    <UpdateTask id={task.id} />
                                                                    {task.creator_id === userId ? <DeleteTask id={task.id} /> : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        ))
                                    ) : (
                                        groupedTasks[user].map((task) => (
                                            <div
                                                key={task.id}
                                                className="mb-2 w-full rounded-md bg-white p-4"
                                            >
                                                <div className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <div className="mb-2 flex items-center font-medium">
                                                            <p>{task.name}</p>
                                                        </div>
                                                    </div>
                                                    <p>DateTo: {formatDateToLocal(task.end_date)}</p>
                                                </div>
                                                <div className="flex w-full items-center justify-between pt-4">
                                                    <div>
                                                        <p>User: {task.responsible}</p>
                                                        <p>Status: <TasksStatus status={task.status} /></p>
                                                        <p>Priority: <TasksPriority priority={task.priority} /></p>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <UpdateTask id={task.id} />
                                                        {task.creator_id === userId ? <DeleteTask id={task.id} /> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Priority
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    End Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Responsible User
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {Object.keys(groupedTasks).map((user) => {
                                const tasksByEndDate = groupByEndDate(groupedTasks[user]);
                                return (
                                    <React.Fragment key={user}>
                                        <tr>
                                            <td colSpan={6} className="bg-gray-200 text-lg font-bold px-6 py-3">
                                                {user}
                                            </td>
                                        </tr>
                                        {grouped ? (
                                            sortOrder.map((dateGroup) => (
                                                tasksByEndDate[dateGroup] && (
                                                    <React.Fragment key={dateGroup}>
                                                        <tr>
                                                            <td colSpan={6} className="bg-gray-100 text-md font-semibold px-6 py-2">
                                                                {dateGroup === 'today' ? 'Сегодня' : dateGroup === 'this_week' ? 'На этой неделе' : 'Позже'}
                                                            </td>
                                                        </tr>
                                                        {tasksByEndDate[dateGroup].map((task) => (
                                                            <tr
                                                                key={task.id}
                                                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                                            >
                                                                <td className="py-3 pl-6 pr-3 w-1/12">
                                                                    <div className="flex items-center gap-3">
                                                                        <p>{task.name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                                    <TasksPriority priority={task.priority} />
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                                    {formatDateToLocal(task.end_date)}
                                                                </td>
                                                                <td className="px-3 py-3 w-1/12">
                                                                    {task.responsible}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                                    <TasksStatus status={task.status} />
                                                                </td>
                                                                <td className="py-3 pl-6 pr-3 w-1/12">
                                                                    <div className="flex justify-end gap-3">
                                                                        <UpdateTask id={task.id} />
                                                                        {task.creator_id === userId ? <DeleteTask id={task.id} /> : ''}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                )
                                            ))
                                        ) : (
                                            groupedTasks[user].map((task) => (
                                                <tr
                                                    key={task.id}
                                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                                >
                                                    <td className="py-3 pl-6 pr-3 w-1/12">
                                                        <div className="flex items-center gap-3">
                                                            <p>{task.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                        <TasksPriority priority={task.priority} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                        {formatDateToLocal(task.end_date)}
                                                    </td>
                                                    <td className="px-3 py-3 w-1/12">
                                                        {task.responsible}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-3 w-1/12">
                                                        <TasksStatus status={task.status} />
                                                    </td>
                                                    <td className="py-3 pl-6 pr-3 w-1/12">
                                                        <div className="flex justify-end gap-3">
                                                            <UpdateTask id={task.id} />
                                                            {task.creator_id === userId ? <DeleteTask id={task.id} /> : ''}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}