import type { AccessControlService } from "@bowlise/bowlise"
import type { PoolConfig } from "pg"

import { Pool } from "pg"

export class PostgresSQLAdapter implements AccessControlService {
  private pool: Pool

  constructor(config: PoolConfig) {
    this.pool = new Pool(config)
  }

  async listRolesForSubject(params: SubjectTargetParams): Promise<Role[]> {
    const { subjectId, targetId } = params
    const query = `
      SELECT roles.id, roles.name, roles.description
      FROM roles
      JOIN role_assignments
      ON roles.id = role_assignments.role_id
      WHERE role_assignments.subject_id = $1
      AND role_assignments.target_id = $2
    `
    const { rows } = await this.pool.query(query, [subjectId, targetId])
    return rows.map((row) => new Role(row))
  }

  async listPermissionsForSubject(
    params: SubjectTargetParams,
  ): Promise<Permission[]> {
    const { subjectId, targetId } = params
    const query = `
      SELECT permissions.id, permissions.name, permissions.description
      FROM permissions
      JOIN permission_assignments
      ON permissions.id = permission_assignments.permission_id
      WHERE permission_assignments.subject_id = $1
      AND permission_assignments.target_id = $2
    `
    const { rows } = await this.pool.query(query, [subjectId, targetId])
    return rows.map((row) => new Permission(row))
  }

  async subjectHasRole(params: SubjectHasRoleParams): Promise<boolean> {
    const { subjectId, targetId, roleId } = params
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM role_assignments
        WHERE subject_id = $1
        AND target_id = $2
        AND role_id = $3
      )
    `
    const { rows } = await this.pool.query(query, [subjectId, targetId, roleId])
    return rows[0].exists
  }

  async subjectHasPermission(
    params: SubjectHasPermissionParams,
  ): Promise<boolean> {
    const { subjectId, targetId, permissionId } = params
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM permission_assignments
        WHERE subject_id = $1
        AND target_id = $2
        AND permission_id = $3
      )
    `
    const { rows } = await this.pool.query(query, [
      subjectId,
      targetId,
      permissionId,
    ])
    return rows[0].exists
  }
}
