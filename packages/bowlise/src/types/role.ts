import type Permission from "./permission"

/**
 * Represents a role with associated permissions.
 * A role defines a set of permissions that can be assigned to a subject.
 */
type Role = {
  /**
   * A unique identifier for the role.
   */
  handle: string
  /**
   * An optional name for the role.
   */
  name?: string | undefined
  /**
   * An optional description of the role.
   */
  description?: string | undefined
  /**
   * Indicates whether the role is enabled or not.
   */
  enabled: boolean
  /**
   * A list of permissions associated with the role.
   */
  permissions: Permission[]
}

export default Role
