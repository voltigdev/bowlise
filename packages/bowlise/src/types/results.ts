/**
 * Represents the result of a bulk check operation.
 * Maps each target ID to a list of results or an error.
 */
export type BulkCheckResult<T> = {
  /**
   * A mapping of target IDs to the results of the bulk check operation.
   * Each entry can be a list of results of type T or an Error.
   */
  [targetId: string]: T[] | Error
}
