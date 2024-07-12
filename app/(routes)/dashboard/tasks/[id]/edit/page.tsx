import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchCustomers, fetchInvoiceById, fetchTaskById, fetchTaskUsers, getUserIdByMail } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const session = await auth()
    if (!session?.user?.email) return null

    const userId = await getUserIdByMail(session.user.email)

    const [task, taskUsers] = await Promise.all([
        fetchTaskById(id),
        fetchTaskUsers(userId)
    ]);
    

    if (!task) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tasks', href: '/dashboard/tasks' },
                    {
                        label: 'Edit Task',
                        href: `/dashboard/tasks/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form task={task} taskUsers={taskUsers} userId={userId} />
        </main>
    );
}