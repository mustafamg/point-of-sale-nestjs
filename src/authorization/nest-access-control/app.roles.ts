import { RolesBuilder, UserRoles } from "nest-access-control";

export enum AppRoles {
    USER = 'user',
    ADMIN = 'admin', 
  }
  
  export const roles: RolesBuilder = new RolesBuilder();
  
  roles
    .grant(AppRoles.USER)  // switch to another role without breaking the chain
        .readAny('product')
        .readAny('category')
    .grant(AppRoles.ADMIN)
        .extend(AppRoles.USER) // inherit role capabilities. also takes an array
        .createOwn('product')   // equivalent to .createOwn('video', ['*'])
        .updateAny('product')
        .deleteOwn('product')
        .createAny('category')  // equivalent to .createOwn('video', ['*'])
        .updateAny('category')
        .deleteOwn('category')

    //   .extend(UserRoles.USER_CREATE_ANY_VIDEO) // inherit role capabilities. also takes an array
    //   .updateAny('video', ['title']) // explicitly defined attributes
    //   .deleteAny('video');