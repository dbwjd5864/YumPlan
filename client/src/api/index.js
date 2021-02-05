import axios from 'axios';

const userUrl = '/api/v1/user';

export const signup = (newUser) => axios.post(`${userUrl}/signup`, newUser);
