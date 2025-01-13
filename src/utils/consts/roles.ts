import { Role } from "@/enums/globaEnums";
import { Labels } from "./string";

export const roles = [
    { value: Role.selectRole, title: Labels.roleLabels.selectRoleText },
    { value: Role.admin, title: Labels.roleLabels.adminRoleText },
    { value: Role.coach, title: Labels.roleLabels.coachRoleText},
    { value: Role.manager, title: Labels.roleLabels.managerRoleText}
]

export const rolesFilter = [
    { value: Role.admin, title: Labels.roleLabels.adminRoleText },
    { value: Role.coach, title: Labels.roleLabels.coachRoleText},
    { value: Role.manager, title: Labels.roleLabels.managerRoleText}
]