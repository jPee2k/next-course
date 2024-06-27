'use client';

export default function DeleteInvoiceForm({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => Promise<{ message: string }>;
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      confirm('Are you sure you want to delete this invoice?') &&
        (await action());
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
}
