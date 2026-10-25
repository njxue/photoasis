export interface MutationResult<T = undefined> {
  status: number;
  message: string;
  ok: boolean;
  data?: T;
}

export type EntityId = number | string;

export type EmailActionResult<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error: string };
