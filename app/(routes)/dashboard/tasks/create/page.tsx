import CreateForm from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchCustomers, fetchTaskUsers, getUserIdByMail } from '@/app/lib/data';
import { auth } from '@/auth';

export default async function Page() {
    const session = await auth()
    if (!session?.user?.email) return null

    const userId = await getUserIdByMail(session.user.email)
    
    const taskUsers = await fetchTaskUsers(userId);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tasks', href: '/dashboard/tasks' },
                    {
                        label: 'Create Task',
                        href: '/dashboard/tasks/create',
                        active: true,
                    },
                ]}
            />
            {/* <Form creatorId={userId} taskUsers={taskUsers} /> */}
        </main>
    );
}