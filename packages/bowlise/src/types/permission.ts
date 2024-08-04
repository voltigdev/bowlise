import type TargetType from "~types/target-type"

/**
 * Represents a permission associated with a role.
 * A permission defines a specific action that can be performed on a target.
 */
type Permission = {
  /**
   * A unique identifier for the permission.
   */
  handle: string
  /**
   * An optional name for the permission.
   */
  name?: string | undefined
  /**
   * An optional description of the permission.
   */
  description?: string | undefined
  /**
   * Indicates whether the permission is enabled or not.
   */
  enabled: boolean
  /**
   * The type of target this permission applies to.
   */
  targetType: TargetType
}

export default Permission
