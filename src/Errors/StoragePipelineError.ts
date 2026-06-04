export type StoragePipelineStep =
  | "read"
  | "validate"
  | "map"
  | "unmap"
  | "write";

/**
 * Thrown when any step of the StorageStore pipeline fails.
 * Inspect `step` to know where the failure occurred and `cause` for the original error.
 *
 * Read pipeline:  read → validate → map
 * Write pipeline: unmap → write
 *
 * @example
 * try {
 *   store.set(value);
 * } catch (err) {
 *   if (err instanceof StoragePipelineError) {
 *     console.error(`Failed at step "${err.step}":`, err.cause);
 *   }
 * }
 */
export class StoragePipelineError extends Error {
  readonly step: StoragePipelineStep;

  constructor(step: StoragePipelineStep, cause: unknown) {
    super(
      `Storage pipeline failed at step "${step}": ${cause instanceof Error ? cause.message : String(cause)}`,
      { cause },
    );
    this.name = "StoragePipelineError";
    this.step = step;
  }
}
