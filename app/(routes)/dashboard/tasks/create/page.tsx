import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    // TODO Подчиненные
    // const customers = await fetchCustomers();

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
            {/* TODO props */}
            <Form />
        </main>
    );
}