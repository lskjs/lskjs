/* eslint-disable no-empty-function */
import { Err } from '@lskjs/err';
import { CanActivate, ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, ROLES_KEY } from './Auth.decorator';

export function isAdmin(user: Record<string, unknown>) {
  return ['admin'].includes(user?.companyId as string);
}

export function isDeveloper(user: Record<string, unknown>) {
  return isAdmin(user) || ['developer'].includes(user?.companyId as string);
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  isAdmin(user: Record<string, unknown>) {
    return isAdmin(user);
  }
  isDeveloper(user: Record<string, unknown>) {
    return isDeveloper(user);
  }
  canActivate(context: ExecutionContext): boolean {
    const type = context.getType() as ContextType | 'rmq';
    // console.log('context.getType()', context.getType());
    if (type === 'rmq') {
      // console.log('context', context);
      return true;
    }
    // console.log('AuthGuard.canActivate', context.getType());
    // console.log('context.getHandler()', context.getHandler());
    // console.log('context.getClass()', context.getClass());
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | 'any' | 'public'>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    if (requiredRoles === 'public') return true;
    const req = context.switchToHttp().getRequest();
    const user = req?.session?.user;
    if (!user) throw new Err('!user', { status: 401, message: 'Unauthorized' });
    const roles = [user?.role, ...(user?.roles || [])].filter(Boolean);
    if (requiredRoles === 'any') return !!user;
    return requiredRoles.some((role: string) => {
      if (role === Role.admin) return this.isAdmin(user);
      if (role === Role.developer) return this.isDeveloper(user);
      return roles.includes(role);
    });
  }
}
