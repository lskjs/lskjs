import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'auth:roles';

// eslint-disable-next-line no-shadow
export enum Role {
  admin = 'admin',
  root = 'root',
  developer = 'developer',
  companyAdmin = 'companyAdmin',
  companyManager = 'companyManager',
  companyUser = 'companyUser',
  public = 'public',
}

export function AuthRole(...roles: Role[]) {
  return SetMetadata(ROLES_KEY, roles);
}
AuthRole.admin = Role.admin;
AuthRole.root = Role.root;
AuthRole.developer = Role.developer;
AuthRole.companyAdmin = Role.companyAdmin;
AuthRole.companyManager = Role.companyManager;
AuthRole.companyUser = Role.companyUser;
AuthRole.public = Role.public;

export function IsAuth() {
  return SetMetadata(ROLES_KEY, 'any');
}
export function IsPublic() {
  return SetMetadata(ROLES_KEY, AuthRole.public);
}
