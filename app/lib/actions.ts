'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const INVOICES_PATH = '/dashboard/invoices';
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { customerId, amount, status } = CreateInvoice.parse(rawFormData);

  const amountInCents = Math.round(amount * 100);
  const creationDate = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${creationDate})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath(INVOICES_PATH);
  redirect(INVOICES_PATH);
}

const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { customerId, amount, status } = UpdateInvoice.parse(rawFormData);

  const amountInCents = Math.round(amount * 100);

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Update Invoice with the id -> ${id}.`,
    };
  }

  revalidatePath(INVOICES_PATH);
  redirect(INVOICES_PATH);
}

export async function deleteInvoice(id: string): Promise<{ message: string }> {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath(INVOICES_PATH);

    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Invoice with the id -> ${id}.`,
    };
  }
}
