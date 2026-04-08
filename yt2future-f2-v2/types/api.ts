export type ApiErrorPayload = {
  code?: string;
  message?: string;
  details?: unknown;
};

export type ApiEnvelope<T = unknown> = {
  success?: boolean;
  data?: T;
  message?: string;
  error?: ApiErrorPayload;
  [key: string]: unknown;
};
