import type {
  AccessControl,
  AccessControlService,
  BulkCheckResult,
  BulkSubjectHasPermissionParams,
  BulkSubjectHasRoleParams,
  BulkSubjectTargetParams,
  CreateAccessControlParams,
  DeleteAccessControlParams,
  Permission,
  Role,
  SubjectHasPermissionParams,
  SubjectHasRoleParams,
  SubjectTargetParams,
  UpdateAccessControlParams,
} from "./types"

/**
 * Bowlise is responsible for managing access control operations such as listing
 * roles and permissions for subjects. It includes methods that utilize caching
 * to improve performance by avoiding redundant calls to the underlying access
 * control system.
 */
export default class Bowlise {
  private readonly accessControlService: AccessControlService

  protected accessControls = new Map<string, AccessControl>()
  protected permissions = new Map<string, Permission>()
  protected roles = new Map<string, Role>()
  protected subjectRoles = new Map<string, Role[] | Error>()
  protected subjectPermissions = new Map<string, Permission[] | Error>()

  constructor(accessControlService: AccessControlService) {
    this.accessControlService = accessControlService
  }

  /**
   * Lists all roles available in the system. Utilizes caching to avoid
   * redundant calls to the underlying access control service.
   * @returns {Promise<Role[]>} A promise that resolves to an array of roles.
   */
  async listAllRoles(): Promise<Role[]> {
    if (this.roles.size > 0) {
      return Array.from(this.roles.values())
    }

    const roles = await this.accessControlService.listAllRoles()

    roles.forEach((role) => {
      this.roles.set(role.handle, role)
    })

    return roles
  }

  /**
   * Lists all permissions available in the system. Utilizes caching to avoid
   * redundant calls to the underlying access control service.
   * @returns {Promise<Permission[]>} A promise that resolves to an array of permissions.
   */
  async listAllPermissions(): Promise<Permission[]> {
    if (this.permissions.size > 0) {
      return Array.from(this.permissions.values())
    }

    const permissions = await this.accessControlService.listAllPermissions()

    permissions.forEach((permission) => {
      this.permissions.set(permission.handle, permission)
    })

    return permissions
  }

  /**
   * Creates a new access control entry. Utilizes caching to store the new
   * access control entry, avoiding redundant calls for the same entry.
   * @param {CreateAccessControlParams} params - Parameters required to create
   * the access control.
   * @returns {Promise<AccessControl>} A promise that resolves to the created
   * access control entry.
   */
  async createAccessControl(
    params: CreateAccessControlParams,
  ): Promise<AccessControl> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.accessControls.has(compositeId)) {
      return this.accessControls.get(compositeId) as AccessControl
    }

    const accessControl =
      await this.accessControlService.createAccessControl(params)

    this.accessControls.set(compositeId, accessControl)

    return this.accessControls.get(compositeId) as AccessControl
  }

  /**
   * Updates an existing access control entry. Utilizes caching to update the
   * stored entry and ensure the cache remains consistent with the underlying
   * service.
   * @param {UpdateAccessControlParams} params - Parameters required to update
   * the access control.
   * @returns {Promise<AccessControl>} A promise that resolves to the updated
   * access control entry.
   */
  async updateAccessControl(
    params: UpdateAccessControlParams,
  ): Promise<AccessControl> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.accessControls.has(compositeId)) {
      this.accessControls.delete(compositeId)
    }

    const accessControl =
      await this.accessControlService.updateAccessControl(params)

    this.accessControls.set(compositeId, accessControl)

    return this.accessControls.get(compositeId) as AccessControl
  }

  /**
   * Deletes an existing access control entry. Utilizes caching to remove the
   * entry from the cache, ensuring the cache remains consistent with the
   * underlying service.
   * @param {DeleteAccessControlParams} params - Parameters required to delete
   * the access control.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
   * the success of the deletion.
   */
  async deleteAccessControl(
    params: DeleteAccessControlParams,
  ): Promise<boolean> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.accessControls.has(compositeId)) {
      this.accessControls.delete(compositeId)
    }

    return await this.accessControlService.deleteAccessControl(params)
  }

  /**
   * Lists all roles associated with a given subject and target. Utilizes
   * caching to avoid redundant calls to the underlying service for the same
   * subject and target.
   * @param {SubjectTargetParams} params - Parameters specifying the subject and
   * target.
   * @returns {Promise<Role[]>} A promise that resolves to an array of roles.
   */
  async listRolesForSubject(params: SubjectTargetParams): Promise<Role[]> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.subjectRoles.has(compositeId)) {
      return this.subjectRoles.get(compositeId) as Role[]
    }

    const roles = await this.accessControlService.listRolesForSubject(params)

    this.subjectRoles.set(compositeId, roles)

    return this.subjectRoles.get(compositeId) as Role[]
  }

  /**
   * Lists all permissions associated with a given subject and target. Utilizes
   * caching to avoid redundant calls to the underlying service for the same
   * subject and target.
   * @param {SubjectTargetParams} params - Parameters specifying the subject and
   * target.
   * @returns {Promise<Permission[]>} A promise that resolves to an array of
   * permissions.
   */
  async listPermissionsForSubject(
    params: SubjectTargetParams,
  ): Promise<Permission[]> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.subjectPermissions.has(compositeId)) {
      return this.subjectPermissions.get(compositeId) as Permission[]
    }

    const permissions =
      await this.accessControlService.listPermissionsForSubject(params)

    this.subjectPermissions.set(compositeId, permissions)

    return this.subjectPermissions.get(compositeId) as Permission[]
  }

  /**
   * Checks if a given subject has a specific role for a target. Utilizes
   * caching to avoid redundant calls to the underlying service for the same
   * subject and target.
   * @param {SubjectHasRoleParams} params - Parameters specifying the subject,
   * target, and role.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
   * if the subject has the role.
   */
  async subjectHasRole(params: SubjectHasRoleParams): Promise<boolean> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.subjectRoles.has(compositeId)) {
      const roles = this.subjectRoles.get(compositeId) as Role[]

      return roles.some((role) => role.handle === params.roleHandle)
    }

    return await this.accessControlService.subjectHasRole(params)
  }

  /**
   * Checks if a given subject has a specific permission for a target. Utilizes
   * caching to avoid redundant calls to the underlying service for the same
   * subject and target.
   * @param {SubjectHasPermissionParams} params - Parameters specifying the
   * subject, target, and permission.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
   * if the subject has the permission.
   */
  async subjectHasPermission(
    params: SubjectHasPermissionParams,
  ): Promise<boolean> {
    const compositeId = `${params.subjectId}:${params.targetId}`

    if (this.subjectPermissions.has(compositeId)) {
      const permissions = this.subjectPermissions.get(
        compositeId,
      ) as Permission[]

      return permissions.some(
        (permission) => permission.handle === params.permissionHandle,
      )
    }

    return await this.accessControlService.subjectHasPermission(params)
  }

  /**
   * Lists roles for a subject across multiple targets. Utilizes caching to
   * avoid redundant calls to the underlying service for the same subject and
   * targets.
   * @param {BulkSubjectTargetParams} params - Parameters specifying the subject
   * and multiple targets.
   * @returns {Promise<BulkCheckResult<Role>>} A promise that resolves to a
   * mapping of target IDs to roles.
   */
  async bulkListRolesForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Role>> {
    const { subjectId, targetIds } = params

    const missingTargetIds = targetIds.filter(
      (targetId) => !this.subjectRoles.has(`${subjectId}:${targetId}`),
    )

    const result = await this.accessControlService.bulkListRolesForSubject({
      subjectId,
      targetIds: missingTargetIds,
    })

    missingTargetIds.forEach((targetId) => {
      const roles = result[targetId] as Role[] | Error

      this.subjectRoles.set(`${subjectId}:${targetId}`, roles)
    })

    return targetIds.reduce((acc, targetId) => {
      acc[targetId] = this.subjectRoles.get(`${subjectId}:${targetId}`) as
        | Role[]
        | Error

      return acc
    }, {} as BulkCheckResult<Role>)
  }

  /**
   * Lists permissions for a subject across multiple targets. Utilizes caching
   * to avoid redundant calls to the underlying service for the same subject and
   * targets.
   * @param {BulkSubjectTargetParams} params - Parameters specifying the subject
   * and multiple targets.
   * @returns {Promise<BulkCheckResult<Permission>>} A promise that resolves to
   * a mapping of target IDs to permissions.
   */
  async bulkListPermissionsForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Permission>> {
    const { subjectId, targetIds } = params

    const missingTargetIds = targetIds.filter(
      (targetId) => !this.subjectPermissions.has(`${subjectId}:${targetId}`),
    )

    const result =
      await this.accessControlService.bulkListPermissionsForSubject({
        subjectId,
        targetIds: missingTargetIds,
      })

    missingTargetIds.forEach((targetId) => {
      const permissions = result[targetId] as Permission[]

      this.subjectPermissions.set(`${subjectId}:${targetId}`, permissions)
    })

    return targetIds.reduce((acc, targetId) => {
      acc[targetId] = this.subjectPermissions.get(
        `${subjectId}:${targetId}`,
      ) as Permission[] | Error

      return acc
    }, {} as BulkCheckResult<Permission>)
  }

  /**
   * Checks if a subject has a specific role across multiple targets. Utilizes
   * caching to avoid redundant calls to the underlying service for the same
   * subject and targets.
   * @param {BulkSubjectHasRoleParams} params - Parameters specifying the
   * subject, multiple targets, and role.
   * @returns {Promise<BulkCheckResult<boolean>>} A promise that resolves to a
   * mapping of target IDs to booleans indicating if the subject has the role.
   */
  async bulkSubjectHasRole(
    params: BulkSubjectHasRoleParams,
  ): Promise<BulkCheckResult<boolean>> {
    const { subjectId, targetIds, roleHandle } = params

    const missingTargetIds = targetIds.filter(
      (targetId) => !this.subjectRoles.has(`${subjectId}:${targetId}`),
    )

    const result = await this.accessControlService.bulkListRolesForSubject({
      subjectId,
      targetIds: missingTargetIds,
    })

    missingTargetIds.forEach((targetId) => {
      const roles = result[targetId] as Role[] | Error

      this.subjectRoles.set(`${subjectId}:${targetId}`, roles)
    })

    return targetIds.reduce((acc, targetId) => {
      const roles = this.subjectRoles.get(`${subjectId}:${targetId}`) as
        | Role[]
        | Error

      if (roles instanceof Error) {
        acc[targetId] = roles
      } else {
        acc[targetId] = [roles.some((role) => role.handle === roleHandle)]
      }

      return acc
    }, {} as BulkCheckResult<boolean>)
  }

  /**
   * Checks if a subject has a specific permission across multiple targets.
   * Utilizes caching to avoid redundant calls to the underlying service for the
   * same subject and targets.
   * @param {BulkSubjectHasPermissionParams} params - Parameters specifying the
   * subject, multiple targets, and permission.
   * @returns {Promise<BulkCheckResult<boolean>>} A promise that resolves to a
   * mapping of target IDs to booleans indicating if the subject has the
   * permission.
   */
  async bulkSubjectHasPermission(
    params: BulkSubjectHasPermissionParams,
  ): Promise<BulkCheckResult<boolean>> {
    const { subjectId, targetIds, permissionHandle } = params

    const missingTargetIds = targetIds.filter(
      (targetId) => !this.subjectPermissions.has(`${subjectId}:${targetId}`),
    )

    const result =
      await this.accessControlService.bulkListPermissionsForSubject({
        subjectId,
        targetIds: missingTargetIds,
      })

    missingTargetIds.forEach((targetId) => {
      const permissions = result[targetId] as Permission[]

      this.subjectPermissions.set(`${subjectId}:${targetId}`, permissions)
    })

    return targetIds.reduce((acc, targetId) => {
      const permissions = this.subjectPermissions.get(
        `${subjectId}:${targetId}`,
      ) as Permission[] | Error

      if (permissions instanceof Error) {
        acc[targetId] = permissions
      } else {
        acc[targetId] = [
          permissions.some(
            (permission) => permission.handle === permissionHandle,
          ),
        ]
      }

      return acc
    }, {} as BulkCheckResult<boolean>)
  }
}

export type {
  AccessControl,
  AccessControlService,
  BulkCheckResult,
  BulkSubjectHasPermissionParams,
  BulkSubjectHasRoleParams,
  BulkSubjectTargetParams,
  CreateAccessControlParams,
  DeleteAccessControlParams,
  Permission,
  Role,
  SubjectHasPermissionParams,
  SubjectHasRoleParams,
  SubjectTargetParams,
  UpdateAccessControlParams,
}
