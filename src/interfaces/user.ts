import { JObject } from "@@/common/types/json";

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
}

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: UserRoles;
    is_active?: boolean;
}

export const jsonToIUser = (data : JObject) : IUser => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        is_active: data.is_active,
    }
}