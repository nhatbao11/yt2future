/** Safe message extraction for catch (unknown) blocks */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
