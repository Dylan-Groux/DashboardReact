import { useAuth } from "../../context/AuthContext";
import { useFetchUserInformations } from "./_useUserInformations";

/**
 * Hook intermédiaire qui permet de retourner un objet User connecté en utilisant le token d'authentification stocké dans le contexte AuthContext.
 * @returns Un objet User Connecté 
 * @desc contenant les informations de l'utilisateur, un indicateur de chargement, une éventuelle erreur et une fonction pour rafraîchir les données
 */
export const useUserInformationWithAuth = () => {
    const { token } = useAuth();
    const { userInformation, loading, error, refresh } = useFetchUserInformations(token);
    return { userInformation, loading, error, refresh };
}