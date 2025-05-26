export type User = {
  id: string;
  name: string;
  studentCode: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
};
