import { RolesBuilder, UserRoles } from "nest-access-control";
import { UserRole } from "src/users/User";



export const Roles: RolesBuilder = new RolesBuilder();

Roles
.grant(UserRole.USER)
    .readAny("product")
    .readAny("category")
    .readAny("shift")
    
.grant(UserRole.ECONOMIST)
    .extend(UserRole.USER)
    .readAny("user")

.grant(UserRole.MANAGER)
    .extend(UserRole.ECONOMIST)
    .createAny("product")
    .updateAny("product")
    .deleteAny("product")

    .createAny("category")
    .updateAny("category")
    .deleteAny("category")

    .createAny("user")
    .updateAny("user")
    .deleteAny("user")
    
    .createAny("shift")
    .updateAny("shift")
    .deleteAny("shift")