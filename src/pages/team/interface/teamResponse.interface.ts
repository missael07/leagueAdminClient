import type { Category } from "@/enums/globaEnums";

export interface TeamResponse {
    id: number;
    name: string;
    isActive: boolean;
    isPaid: boolean;
    category: Category;
    categoryName: string;
    branch: number;
    branchName: string;
}