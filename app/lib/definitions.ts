// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

// Todo-App tables
export type TodoUser = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  login: string;
  password: string;
  is_manager: boolean;
  manager_id: string | null;
};

export type TodoTask = {
  id: string;
  name: string;
  description: string;
  create_date: string;
  update_date: string;
  end_date: string;
  priority: 'high' | 'mid' | 'low';
  status: 'todo' | 'progress' | 'done' | 'cancelled';
  creator_id: string;
  responsible_user_id: string;
}

export type TasksTable = {
  id: string;
  name: string;
  description: string;
  create_date: string;
  update_date: string;
  end_date: string;
  priority: 'high' | 'mid' | 'low';
  status: 'todo' | 'progress' | 'done' | 'cancelled';
  creator: string;
  responsible: string;
};