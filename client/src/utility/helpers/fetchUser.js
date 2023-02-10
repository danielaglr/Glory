import axios from 'axios';

export default async function fetchUser(userID) {
  const data = await axios.get(`http://localhost:3001/user/${userID}`);
    return data;
};