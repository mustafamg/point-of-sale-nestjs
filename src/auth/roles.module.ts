import { Injectable, Module } from "@nestjs/common";
import { AccessControlModule, RolesBuilder } from "nest-access-control";

@Injectable()
class RoleProvider {

    getRoles(): Promise<string[]> {
        return Promise.resolve([
            'CUD_PRODUCT',
        ]);
    }
}

@Module({
  providers: [RoleProvider],
  exports: [RoleProvider],
})
class RoleModule { }

@Module({
    imports: [
      AccessControlModule.forRootAsync({
        imports: [RoleModule],
        inject: [RoleProvider],
        useFactory: async (roleService: RoleProvider):
             Promise<RolesBuilder> => {
          return new RolesBuilder(await roleService.getRoles());
        },
      }),
    ],
  })
  export class AccessModule {}
