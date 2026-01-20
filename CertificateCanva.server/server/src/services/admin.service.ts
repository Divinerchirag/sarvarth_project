import bcrypt from "bcryptjs";
import * as adminRepo from "../repository/user.repository";


export const createUser = async (data: any) => {
  const passwordHash = await bcrypt.hash(data.password, 10);

  return adminRepo.createUser({
    ...data,
    password_hash: passwordHash,
  });
};

export const getUsers = () => {
  return adminRepo.getAllUsers();
};

export const getUserById = (id: string) => {
  return adminRepo.getUserById(id);
};

export const updateUser = (id: string, data: any) => {
  return adminRepo.updateUserById(id, data);
};

export const deleteUser = (id: string) => {
  return adminRepo.deleteUserById(id);
};
