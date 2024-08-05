// write tests
import type { Mock } from "vitest"

import { beforeEach, describe, expect, it, vi } from "vitest"

import type {
  AccessControl,
  AccessControlService,
  CreateAccessControlParams,
  Permission,
  Role,
  SubjectTargetParams,
} from "../types"

import Bowlise from "../index"

const mockPermissions: Permission[] = [
  {
    handle: "bowlise-super-admin",
    name: "super admin",
    description: "super admin role",
    enabled: true,
    targetType: "subject",
  },
]

const mockRoles: Role[] = [
  {
    handle: "admin",
    name: "Admin",
    description: "Admin role",
    enabled: true,
    permissions: mockPermissions,
  },
]

const mockAccessControl: AccessControl = {
  subjectId: "1",
  targetId: "2",
  createdAt: new Date(),
  updatedAt: new Date(),
  targetType: "",
  roleHandle: "",
}

describe("Bowlise", () => {
  let accessControlService: AccessControlService
  let bowlise: Bowlise

  beforeEach(() => {
    accessControlService = {
      listAllRoles: vi.fn(),
      listAllPermissions: vi.fn(),
      createAccessControl: vi.fn(),
      updateAccessControl: vi.fn(),
      deleteAccessControl: vi.fn(),
      listRolesForSubject: vi.fn(),
      listPermissionsForSubject: vi.fn(),
      subjectHasRole: vi.fn(),
      subjectHasPermission: vi.fn(),
      bulkListRolesForSubject: vi.fn(),
      bulkListPermissionsForSubject: vi.fn(),
    } as unknown as AccessControlService

    bowlise = new Bowlise(accessControlService)
  })

  it("should list all roles", async () => {
    ;(accessControlService.listAllRoles as Mock).mockResolvedValue(mockRoles)

    const result = await bowlise.listAllRoles()

    expect(result).toEqual(mockRoles)
    expect(accessControlService.listAllRoles).toHaveBeenCalledTimes(1)
  })

  it("should list all permissions", async () => {
    const permissions: Permission[] = [
      {
        handle: "bowlise-super-admin",
        name: "super admin",
        description: "super admin role",
        enabled: true,
        targetType: "subject",
      },
    ]
    ;(accessControlService.listAllPermissions as Mock).mockResolvedValue(
      permissions,
    )

    const result = await bowlise.listAllPermissions()

    expect(result).toEqual(permissions)
    expect(accessControlService.listAllPermissions).toHaveBeenCalledTimes(1)
  })

  it("should create an access control", async () => {
    const params: CreateAccessControlParams = {
      subjectId: "1",
      targetId: "2",
      targetType: "",
      roleHandle: "",
    }

    ;(accessControlService.createAccessControl as Mock).mockResolvedValue(
      mockAccessControl,
    )

    const result = await bowlise.createAccessControl(params)

    expect(result).toEqual(mockAccessControl)
    expect(accessControlService.createAccessControl).toHaveBeenCalledTimes(1)
  })

  it("should list permissions for subject", async () => {
    const params: SubjectTargetParams = { subjectId: "1", targetId: "2" }

    ;(accessControlService.listPermissionsForSubject as Mock).mockResolvedValue(
      mockPermissions,
    )

    const result = await bowlise.listPermissionsForSubject(params)

    expect(result).toEqual(mockPermissions)
    expect(
      accessControlService.listPermissionsForSubject,
    ).toHaveBeenCalledTimes(1)
  })

  // Add more tests for other methods as needed
})
