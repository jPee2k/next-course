export default function FormError({
  id,
  field,
  actionState,
}: {
  id: string;
  field?: string;
  actionState: {
    message?: string | null;
    errors?: Record<string, string[]>;
  };
}) {
  const isShowErrorsMessage = !field && actionState.message;
  // @ts-ignore
  const fieldErrors = actionState.errors?.[field] || [];

  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {isShowErrorsMessage ? (
        <p className="mt-2 text-sm text-red-500">{actionState.message}</p>
      ) : (
        fieldErrors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))
      )}
    </div>
  );
}
