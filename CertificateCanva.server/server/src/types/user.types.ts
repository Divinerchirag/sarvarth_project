export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  email?: string;
  role?: Role;
  is_active?: boolean;
}
