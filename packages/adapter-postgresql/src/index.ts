import type {
  AccessControl,
  AccessControlService,
  BulkCheckResult,
  BulkSubjectTargetParams,
  CreateAccessControlParams,
  DeleteAccessControlParams,
  Permission,
  Role,
  SubjectHasPermissionParams,
  SubjectHasRoleParams,
  SubjectTargetParams,
  UpdateAccessControlParams,
} from "@bowlise/bowlise"
import type { PoolConfig } from "pg"

import { Pool } from "pg"

export class PostgresSQLAdapter implements AccessControlService {
  private pool: Pool

  constructor(config: PoolConfig) {
    this.pool = new Pool(config)
  }
  listRolesForSubject(params: SubjectTargetParams): Promise<Role[]> {
    this.pool.query("SELECT * FROM roles")
    throw new Error("Method not implemented.")
  }
  listPermissionsForSubject(
    params: SubjectTargetParams,
  ): Promise<Permission[]> {
    throw new Error("Method not implemented.")
  }
  subjectHasRole(params: SubjectHasRoleParams): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  subjectHasPermission(params: SubjectHasPermissionParams): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  listAllRoles(): Promise<Role[]> {
    throw new Error("Method not implemented.")
  }
  listAllPermissions(): Promise<Permission[]> {
    throw new Error("Method not implemented.")
  }
  createAccessControl(
    params: CreateAccessControlParams,
  ): Promise<AccessControl> {
    throw new Error("Method not implemented.")
  }
  async updateAccessControl(
    params: UpdateAccessControlParams,
  ): Promise<AccessControl> {
    const { subjectId, targetId, roleHandle } = params
    const result = await this.pool.query(
      `UPDATE access_control
       SET role_id = $2, permission_id = $3
       WHERE id = $1
       RETURNING *`,
      [subjectId, targetId, roleHandle],
    )
    return result.rows[0] as AccessControl
  }
  async deleteAccessControl(
    params: DeleteAccessControlParams,
  ): Promise<boolean> {
    const { subjectId } = params
    const result = await this.pool.query(
      "DELETE FROM access_control WHERE id = $1",
      [subjectId],
    )

    if (result.rowCount === 0) {
      return false
    }

    return true
  }

  async bulkListRolesForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Role>> {
    const { subjectId } = params
    const result = await this.pool.query(
      `SELECT sr.subject_id, r.* FROM roles r
     INNER JOIN subject_roles sr ON r.id = sr.role_id
     WHERE sr.subject_id = ANY($1::uuid[])`,
      [subjectId],
    )
    return {
      results: result.rows.reduce(
        (acc, row) => {
          if (!acc[row.subject_id]) acc[row.subject_id] = []
          acc[row.subject_id].push(row)
          return acc
        },
        {} as Record<string, Role[]>,
      ),
    }
  }
  async bulkListPermissionsForSubject(
    params: BulkSubjectTargetParams,
  ): Promise<BulkCheckResult<Permission>> {
    const { subjectId } = params
    const result = await this.pool.query(
      `SELECT sr.subject_id, p.* FROM permissions p
       INNER JOIN role_permissions rp ON p.id = rp.permission_id
       INNER JOIN subject_roles sr ON rp.role_id = sr.role_id
       WHERE sr.subject_id = ANY($1::uuid[])`,
      [subjectId],
    )
    return {
      results: result.rows.reduce(
        (acc, row) => {
          if (!acc[row.subject_id]) acc[row.subject_id] = []
          acc[row.subject_id].push(row)
          return acc
        },
        {} as Record<string, Permission[]>,
      ),
    }
  }
}
