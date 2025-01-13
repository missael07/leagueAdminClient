import { Branch } from "@/enums/globaEnums";
import { Labels } from "./string";

export const branches = [
    { value: Branch.selectBranch, title: Labels.branchLabels.selectBranchText },
    { value: Branch.womenBranch, title: Labels.branchLabels.womenBranchText },
    { value: Branch.menBranch, title: Labels.branchLabels.menBranchText}
]

export const branchesFilter = [
    { value: Branch.womenBranch, title: Labels.branchLabels.womenBranchText },
    { value: Branch.menBranch, title: Labels.branchLabels.menBranchText}
]