import type AccessControlService from "./access-control-service"
import type {
  AccessControl,
  CreateAccessControlParams,
  DeleteAccessControlParams,
  UpdateAccessControlParams,
} from "~/types/access-control"
import type {
  BulkSubjectHasPermissionParams,
  BulkSubjectHasRoleParams,
  BulkSubjectTargetParams,
  SubjectHasPermissionParams,
  SubjectHasRoleParams,
  SubjectTargetParams,
} from "~/types/params"
import type Permission from "~/types/permission"
import type { BulkCheckResult } from "~/types/results"
import type Role from "~/types/role"

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
