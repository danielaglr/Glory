import axios from 'axios';

export default async function putlift(userID, weight, lift, reps) {
  await axios.put(`http://localhost:3001/user/${userID}/lifts`, {
    lift: lift,
    weight: weight,
    reps: reps
  })
};