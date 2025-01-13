export interface RosterResponse {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    imgUrl: string;
    canPlay: boolean;
    canPitch: boolean;
    isReinforcement: boolean;
}