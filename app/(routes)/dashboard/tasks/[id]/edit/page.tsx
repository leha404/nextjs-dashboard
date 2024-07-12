import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchCustomers, fetchInvoiceById, fetchTaskById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // TODO
    // const [invoice, customers] = await Promise.all([
    //     fetchInvoiceById(id),
    //     fetchCustomers(),
    // ]);

    const [task] = await Promise.all([
        fetchTaskById(id),
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
            <Form task={task} />
        </main>
    );
}