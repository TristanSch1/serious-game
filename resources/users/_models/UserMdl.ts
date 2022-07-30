import { USER_ROLES } from "../../../lib/users/UserModel";

export type TUserBase = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type TUser = TUserBase & {
    roles: USER_ROLES;
};
