import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const createUser = (id:number, profile: any) => {
  let user = userModel.findOrCreate(id, profile);
  return user;
}
// const createUser = (id:number, name: string, email: string, password: string, role: "user") => {
//   let user = userModel.create(id, name, email, password, role);
//   if(!user) {
//     return user;
//   }
//   return null;
// };

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  createUser
};
