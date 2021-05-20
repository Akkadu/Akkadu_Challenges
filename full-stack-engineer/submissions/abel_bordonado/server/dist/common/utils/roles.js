// import { RoleTypes } from "../../models/User";
// import { isArray } from "util";
// /**
//  * SuperAdmin always return true, for the rest, it checks if the certain role is in user.roles array.
//  * @param user
//  * @param roles
//  * @param excludeAdmin
//  */
// export const hasRole = (
//   user: { roles: RoleTypes[] | string[] } | null,
//   roles: RoleTypes | RoleTypes[],
//   excludeAdmin = false
// ): boolean => {
//   if (!user || !user.roles) {
//     return false;
//   }
//   roles = isArray(roles) ? roles : [roles];
//   if (!excludeAdmin) roles.unshift(RoleTypes.superAdmin); // Super Admin can all
//   return roles.some((role: RoleTypes) => user.roles.includes(role));
// };
// /**
//  * If user has that role, excluding super-admin.
//  * @param user
//  * @param roles
//  *
//  * Different of hasRole that is Role wont check if you are superadmin
//  */
// export const isRole = (
//   user: { roles: RoleTypes[] | string[] } | null,
//   roles: RoleTypes | RoleTypes[]
// ) => hasRole(user, roles, true);
//# sourceMappingURL=roles.js.map