import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    CUD_PRODUCTS = 'CUD_PRODUCTS',
    R_PRODUCTS = 'READ_PRODUCTS',
    CUD_CATEGORY = 'CUD_CATEGORY',
    R_CATEGORY = 'R_CATEGORY'
  }

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.CUD_PRODUCTS) // define new or modify existing role. also takes an array.
    .createAny('product') // equivalent to .createOwn('video', ['*'])
    .deleteAny('product')
    .updateAny('product')
    .readAny('product')
  
  .grant(AppRoles.CUD_CATEGORY)
    .extend(AppRoles.CUD_PRODUCTS)
    .createAny('category') // equivalent to .createOwn('video', ['*'])
    .deleteAny('category')
    .updateAny('category')
    .readAny('category')
  