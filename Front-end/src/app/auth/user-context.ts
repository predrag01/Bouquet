import { User } from '../models/user';

export const setUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Set user:" + user.username);
  } else {
    localStorage.removeItem('user');
    console.log("Remove user - userContext");
  }
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('user');

  if (user) {
    console.log("Get user: " + user);
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const getUserId = (): number | void => {
  const user= getUser()

  if(user) {
    return user.id;
  }
};

export const setToken = (token: string | null) => {
  if (token === null) {
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', JSON.stringify(token));
    console.log("Set token: "+token+localStorage)
  }
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  console.log("Get token, nedekodiran:"+localStorage)

  if (token) {
    console.log("Get token, dekodiran:"+JSON.parse(token))
    return JSON.parse(token);
  }
  return null;
};
