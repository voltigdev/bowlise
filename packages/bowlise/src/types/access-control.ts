import type TargetType from "~/types/target-type"

/**
 * Represents access control information for a subject and target.
 * This defines the relationship between a subject, a target, and the role
 * assigned.
 */
export type AccessControl = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * The unique identifier of the target.
   */
  targetId: string
  /**
   * The type of the target.
   */
  targetType: TargetType
  /**
   * The handle of the role assigned to the subject for the target.
   */
  roleHandle: string
  /**
   * Whether the access control entry is deleted.
   */
  isDeleted?: boolean | undefined
  /**
   * The date and time when the access control entry was deleted
   * if applicable).
   */
  deletedAt?: Date | undefined
  /**
   * The date and time when the access control entry was created.
   */
  createdAt: Date
  /**
   * The date and time when the access control entry was last updated.
   */
  updatedAt: Date
}

/**
 * Parameters for creating an access control entry.
 * Used for operations that create a new access control entry.
 */
export type CreateAccessControlParams = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * The unique identifier of the target.
   */
  targetId: string
  /**
   * The type of the target.
   */
  targetType: TargetType
  /**
   * The handle of the role to assign to the subject for the target.
   */
  roleHandle: string
}

/**
 * Parameters for updating an access control entry.
 * Used for operations that update an existing access control entry.
 */
export type UpdateAccessControlParams = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * The unique identifier of the target.
   */
  targetId: string
  /**
   * The handle of the new role to assign to the subject for the target.
   */
  roleHandle: string
}

/**
 * Parameters for deleting an access control entry.
 * Used for operations that delete an existing access control entry.
 */
export type DeleteAccessControlParams = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * The unique identifier of the target.
   */
  targetId: string
  /**
   * Whether to perform a soft delete or hard delete.
   */
  softDelete?: boolean | undefined
}
