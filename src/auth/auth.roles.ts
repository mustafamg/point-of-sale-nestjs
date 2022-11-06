import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    CUD_PRODUCT = 'CUD_PRODUCT',
    CUD_CATEGORY = 'CUD_CATEGORY',
  }


export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.CUD_PRODUCT) // define new or modify existing role. also takes an array.
    .createAny('product') 
    .deleteAny('product')
    .readAny('product')
  .grant(AppRoles.CUD_CATEGORY) // switch to another role without breaking the chain
    .extend(AppRoles.CUD_PRODUCT) // inherit role capabilities. also takes an array
    .createAny('category')
    .updateAny('category')
    .deleteAny('category')
    .readAny('category');