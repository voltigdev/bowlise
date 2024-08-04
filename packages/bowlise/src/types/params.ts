/**
 * Parameters for identifying a subject and target.
 * Used for operations that require both subject and target identifiers.
 */
export type SubjectTargetParams = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * The unique identifier of the target.
   */
  targetId: string
}

/**
 * Parameters for checking if a subject has a specific role.
 * Extends SubjectTargetParams with an additional role handle.
 */
export type SubjectHasRoleParams = SubjectTargetParams & {
  /**
   * The handle of the role to check.
   */
  roleHandle: string
}

/**
 * Parameters for checking if a subject has a specific permission.
 * Extends SubjectTargetParams with an additional permission handle.
 */
export type SubjectHasPermissionParams = SubjectTargetParams & {
  /**
   * The handle of the permission to check.
   */
  permissionHandle: string
}

/**
 * Parameters for bulk operations involving a subject and multiple targets.
 * Used for operations that involve multiple targets for a single subject.
 */
export type BulkSubjectTargetParams = {
  /**
   * The unique identifier of the subject.
   */
  subjectId: string
  /**
   * A list of unique identifiers for the targets.
   */
  targetIds: string[]
}

/**
 * Parameters for bulk checking if a subject has a specific role across
 * multiple targets. Extends BulkSubjectTargetParams with an additional role
 * handle.
 */
export type BulkSubjectHasRoleParams = BulkSubjectTargetParams & {
  /**
   * The handle of the role to check across multiple targets.
   */
  roleHandle: string
}

/**
 * Parameters for bulk checking if a subject has a specific permission across
 * multiple targets. Extends BulkSubjectTargetParams with an additional
 * permission handle.
 */
export type BulkSubjectHasPermissionParams = BulkSubjectTargetParams & {
  /**
   * The handle of the permission to check across multiple targets.
   */
  permissionHandle: string
}
