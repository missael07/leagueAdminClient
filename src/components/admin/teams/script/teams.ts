
import useEditTeam from '@/pages/admin/team/composables/useEditTeam';
import useTeam from '@/pages/admin/team/composables/useTeam';
import { succesModal } from '@/services/sweetAlert.service';


const { getTeams} = useTeam();
const { changeTeamStatus, pay } = useEditTeam();

const filter = async () => {
    await getTeams();
};

export const changeStatus = async (teamId: number) => {
    const response = await changeTeamStatus(teamId);
    if (response) {
        succesModal(response.message);
        await filter();

    }
}

export const payMethod = async (teamId: number) => {
    const response = await pay(teamId);
    if (response) {
        succesModal(response.message);
        await filter();
    }
}