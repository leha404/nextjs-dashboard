"use server";

// validating library
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { amount, customerId, status } = validatedFields.data

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices')
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data

    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET customer_id=${customerId}, amount=${amountInCents}, status=${status}
            WHERE id=${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Invoice Deleted.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

// Todo-app block
const TaskFormSchema = z.object({
    id: z.string(),
    taskname: z.string(),
    description: z.string(),
    enddate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Please enter a valid date in the format YYYY-MM-DD.',
    }),
    status: z.enum(['todo', 'progress', 'done', 'cancelled'], {
        invalid_type_error: 'Please select a task status.',
    }),
    priority: z.enum(['high', 'mid', 'low'], {
        invalid_type_error: 'Please select a task priority.',
    }),
});

const CreateTask = TaskFormSchema.omit({ id: true });
const UpdateTask = TaskFormSchema.omit({ id: true });

export type TaskState = {
    errors?: {
        taskname?: string[];
        enddate?: string[];
        status?: string[];
        priority?: string[];
    };
    message?: string | null;
};

export async function createTask(prevState: TaskState, formData: FormData) {
    const validatedFields = CreateTask.safeParse({
        taskname: formData.get('taskname'),
        description: formData.get('description'),
        enddate: formData.get('enddate'),
        priority: formData.get('priority'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Task.',
        };
    }

    const { taskname, description, enddate, priority, status} = validatedFields.data

    const date = new Date().toISOString().split('T')[0];

    try {
        // TODO user
        await sql`
            INSERT INTO todotasks (
                name,
                description,
                enddate,
                priority,
                status,
                creatorid,
                responsibleuserid,
                createdate,
                updatedate
            )
            VALUES (
                ${taskname},
                ${description},
                ${enddate},
                ${priority},
                ${status},
                '964cbfae-ba13-4749-b098-71cbdec5cfa4',
                '964cbfae-ba13-4749-b098-71cbdec5cfa4',
                now() at time zone 'utc-5',
                now() at time zone 'utc-5'
            )
        `;
    } catch (error) {
        console.log(error)
        return {
            error: {},
            message: 'Database Error: Failed to Create Task.',
        };
    }

    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/tasks')
}

export async function deleteTask(id: string) {
    try {
        await sql`DELETE FROM todotasks WHERE id = ${id}`;
        revalidatePath('/dashboard/tasks');
        return { message: 'Task Deleted.' };
    } catch (error) {
        return { errors: {}, message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function updateTask(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateTask.safeParse({
        taskname: formData.get('taskname'),
        description: formData.get('description'),
        enddate: formData.get('enddate'),
        priority: formData.get('priority'),
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Task.',
        };
    }

    const { 
        taskname,
        description,
        enddate,
        priority,
        status
     } = validatedFields.data

    try {
        await sql`
            UPDATE todotasks
            SET name=${taskname}, description=${description}, enddate=${enddate}, priority=${priority}, status=${status}
            WHERE id=${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Task.',
        };
    }

    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/tasks');
}