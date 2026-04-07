import { useUserDate } from "./useUserDate";
import { useUserPicture } from "./useUserPicture";
import { useUserName } from "./useUserName";
import { useUserGender } from "./useUserGender";
import { useUserSize } from "./useUserSize";
import { useUserAge } from "./useUserAge";
import { useUserWeight } from "./useUserWeight";

export type UserProfile = {
    userAge: number | null;
    userGender: string | null;
    userSize: string | null;
    userName: string | null;
    userPicture: string | null;
    userDate: string | null;
    userWeight: string | null;
}

/**
 * Hook qui regroupe l'ensemble d'un profile utilisateur
 * @returns User Profile
 * @desc Ce hook utilise les hooks individuels pour récupérer les différentes informations du profil utilisateur.
 */
export const useUserProfile = () => {
    const userAge = useUserAge ();
    const userGender = useUserGender();
    const userSize = useUserSize();
    const userName = useUserName();
    const userPicture = useUserPicture();
    const userDate = useUserDate();
    const userWeight = useUserWeight();

    return {
        userAge,
        userGender,
        userSize,
        userName,
        userPicture,
        userDate,
        userWeight
    }
}