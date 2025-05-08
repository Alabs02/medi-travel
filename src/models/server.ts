export enum Roles {
  ADMIN = "admin",
  USER = "user"
}

export enum RoleTypes {
  SYSTEM = "sysytem",
  CUSTOM = "custom"
}

export interface Procedure {
  name: string;
  amount: number;
}

export interface Clinic {
  id: string;
  clinicName: string;
  clincSlug: string;
  location: string;
  description: string;
  gallery: string[];
  procedures: Procedure[];
  clinicEstimatedCost: number;
  usEstimatedCost: number;
  saving: number;
  verified: boolean;
  rating: number;
  createdBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: "2025-05-06T22:56:42.090Z";
  updatedAt: "2025-05-06T22:56:42.090Z";
}

export interface Role {
  id: string;
  name: Roles;
  type: RoleTypes;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  name: string;
  isActive: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GenericResponse<T, E = any> {
  data: T;
  message: string;
  statusCode: number;
  isSuccessful: boolean;
  error: E;
}

export interface GenericPaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  results: T;
}

export interface PaginatedResponse<T, E = any> {
  data: GenericPaginatedResponse<T>;
  message: string;
  statusCode: number;
  isSuccessful: boolean;
  error: E;
}

export interface Analytics {
  activeUsers: number;
  totalUser: number;
  inactiveUsers: number;
  deletedUsers: number;
  totalClinics: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUser {
  id: string;
  email: string;
  role: Role;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  firebaseUid: string;
}
