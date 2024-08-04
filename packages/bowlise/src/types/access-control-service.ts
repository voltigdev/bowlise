import type {
  BulkSubjectHasPermissionParams,
  BulkSubjectHasRoleParams,
  BulkSubjectTargetParams,
  SubjectHasPermissionParams,
  SubjectHasRoleParams,
  SubjectTargetParams,
} from "~types/params"

import type {
  AccessControl,
  CreateAccessControlParams,
  DeleteAccessControlParams,
  UpdateAccessControlParams,
} from "~types/access-control"
import type Permission from "~types/permission"
import type { BulkCheckResult } from "~types/results"
import type Role from "~types/role"

/**
 * Interface for the Access Control Service.
 * Provides methods for managing roles, permissions, and access control checks.
 */
type AccessControlService = {
  /**
   * Lists all roles available in the system.
   * @returns A promise that resolves to an array of Role objects.
   */
  listAllRoles(): Promise<Role[]>

  /**
   * Lists all permissions available in the system.
   * @returns A promise that resolves to an array of Permission objects.
   */
  listAllPermissions(): Promise<Permission[]>

  /**
   * Creates a new access control entry.
   * @param params - The parameters for creating the access control entry.
   * @returns A promise that resolves to the created AccessControl object.
   */
  createAccessControl(params: CreateAccessControlParams): Promise<AccessControl>

  /**
   * Updates an existing access control entry.
   * @param params - The parameters for updating the access control entry.
   * @returns A promise that resolves to the updated AccessControl object.
   */
  updateAccessControl(params: UpdateAccessControlParams): Promise<AccessControl>

  /**
   * Deletes an existing access control entry.
   * @param params - The parameters for deleting the access control entry.
   * @returns A promise that resolves to a boolean indicating whether the
   * deletion was successful.
   */
  deleteAccessControl(params: DeleteAccessControlParams): Promise<boolean>

  /**
   * Lists roles assigned to a specific subject for a specific target.
   * @param params - The parameters identifying the subject and target.
   * @returns A promise that resolves to an array of Role objects assigned to
   * the subject for the target.
   */
  listRolesForSubject(params: SubjectTargetParams): Promise<Role[]>

  /**
   * Lists permissions assigned to a specific subject for a specific target.
   * @param params - The parameters identifying the subject and target.
   * @returns A promise that resolves to an array of Permission objects
   * assigned to the subject for the target.
   */
  listPermissionsForSubject(params: SubjectTargetParams): Promise<Permission[]>

  /**
   * Checks if a subject has a specific role for a specific target.
   * @param params - The parameters identifying the subject, target, and role.
   * @returns A promise that resolves to a boolean indicating whether the
   * subject has the specified role.
   */
  subjectHasRole(params: SubjectHasRoleParams): Promise<boolean>

  /**
   * Checks if a subject has a specific permission for a specific target.
   * @param params - The parameters identifying the subject, target, and
   * permission.
   * @returns A promise that resolves to a boolean indicating whether the
   * subject has the specified permission.
   */
  subjectHasPermission(params: SubjectHasPermissionParams): Promise<boolean>

  /**
   * Performs a bulk check of roles for a subject across multiple targets.
   * @param params - The parameters identifying the subject and multiple
   * targets.
   * @returns A promise that resolves to a BulkCheckResult object mapping
   * target IDs to arrays of Role objects or errors.
   */
  bulkListRolesForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Role>>

  /**
   * Performs a bulk check of permissions for a subject across multiple
   * targets.
   * @param params - The parameters identifying the subject and multiple
   * targets.
   * @returns A promise that resolves to a BulkCheckResult object mapping
   * target IDs to arrays of Permission objects or errors.
   */
  bulkListPermissionsForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Permission>>

  /**
   * Performs a bulk check if a subject has a specific role across multiple targets.
   * @param params - The parameters identifying the subject, role, and multiple targets.
   * @returns A promise that resolves to a BulkCheckResult object mapping target
   * IDs to boolean values or errors.
   */
  bulkSubjectHasRole(
    params: BulkSubjectHasRoleParams,
  ): Promise<BulkCheckResult<boolean>>

  /**
   * Performs a bulk check if a subject has a specific permission across multiple targets.
   * @param params - The parameters identifying the subject, permission, and multiple targets.
   * @returns A promise that resolves to a BulkCheckResult object mapping
   * target IDs to boolean values or errors.
   */
  bulkSubjectHasPermission(
    params: BulkSubjectHasPermissionParams,
  ): Promise<BulkCheckResult<boolean>>
}

export default AccessControlService
