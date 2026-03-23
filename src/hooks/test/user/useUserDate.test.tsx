import { formatMemberDate } from "../../User/useUserDate";
import { mockUserInformation } from "../mocks/mockUserInformation";

describe('formatMemberDate', () => {
    it('retourne la date formatée correctement', () => {
        const user = mockUserInformation;
        const result = formatMemberDate(user);

        expect(result).toBe('Membre depuis le 15 janvier 2022');
    });
})