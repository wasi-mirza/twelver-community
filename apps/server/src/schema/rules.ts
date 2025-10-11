import { rule } from 'graphql-shield';
import { AppContext } from '../app_server';
import { Role } from '@prisma/client';

export const isAuthenticated = rule()(async (_parent, _args, ctx: AppContext) => {
  return ctx.user !== null;
});

export const isAdmin = rule()(async (_parent, _args, ctx: AppContext) => {
  return ctx.user?.role === Role.ADMIN;
});

export const isEnterprise = rule()(async (_parent, _args, ctx: AppContext) => {
  return ctx.user?.role === Role.ENTERPRISE;
});

export const isUser = rule()(async (_parent, _args, ctx: AppContext) => {
  return ctx.user?.role === Role.USER;
});
