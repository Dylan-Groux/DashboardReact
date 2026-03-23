import type { UserInformation } from "@api/UserInformation/GetUserInformation";

export const mockUserInformation: UserInformation = {
  profile: {
    firstName: 'Cyrille',
    lastName: 'Martraire',
    createdAt: '2022-01-15T10:00:00Z',
    age: 30,
    weight: 70,
    height: 175,
    profilePicture: 'http://localhost:8000/images/cyrille.jpg'
  },
  statistics: {
    totalDistance: '3791.4',
    totalSessions: 607,
    totalDuration: 22624
  }
}