import { Request, Response } from "express";
import * as adminService from "../services/admin.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await adminService.createUser(req.body);
  res.status(201).json(user);
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await adminService.getUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await adminService.getUserById(req.params.id);
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await adminService.updateUser(
    req.params.id,
    req.body
  );
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await adminService.deleteUser(req.params.id);
  res.status(204).send();
};
