import axios from 'axios';

export default async function fetchLifts(userID) {
  const data = await axios.get(`http://localhost:3001/user/${userID}/lifts`);
    return data;
};