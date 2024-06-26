'use client';

export default function DeleteInvoiceForm({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => Promise<void>;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confirm('Are you sure you want to delete this invoice?') && action();
  };

  return (
    <form action={action} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
