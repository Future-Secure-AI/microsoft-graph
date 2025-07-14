/**
 * Conflict behavior options.
 * @module ConflictBehavior
 * @category Models
 */

/**
 * What to do if a file/folder with the same name already exists.
 * - "fail": Throw an error if the item already exists.
 * - "replace": Replace the existing item with the new one.
 * - "rename": Rename the new item to avoid conflict.
 */
export type ConflictBehavior = "fail" | "replace" | "rename";
