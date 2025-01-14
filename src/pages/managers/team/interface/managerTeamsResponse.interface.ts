import type { Category, Role } from "@/enums/globaEnums";
import type { RosterResponse } from "../../rosters/interfaces/rosterResponse";

export interface UsersTeam {
    teamId:   number;
    name:     string;
    isActive: boolean;
    isPaid:   boolean;
    category: Category;
    branch: string;
    managers: Manager[];
    rosters:   RosterResponse[];
}

export interface Manager {
    name: string;
    email:  string;
    role:  Role;
    phoneNumber: number;
}