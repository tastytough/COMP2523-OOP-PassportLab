const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`); // req.session
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findOrCreate: (id: number, profile: any) => {
    const user = database.find((user) => user.id === id);
    if(user) {
      return user;
    }
    const newUser = {
      id: id,
      name: profile.displayName,
      email: "",
      password: "",
      role: "user"
    }
    database.push(newUser)
    return newUser

  }
}
  // findOrCreate: (id: number, name: string, email: string, password: string, role: string) => {
  //   const user = database.find((user) => user.id === id );
  //   if(!user) {
  //   const newUser = {
  //       id,
  //       name,
  //       email, 
  //       password,
  //       role
  //     };
  //     database.push(newUser);
  //     return newUser;
  //   } 
  //   throw new Error(`${user} exists`)


export { database, userModel };
