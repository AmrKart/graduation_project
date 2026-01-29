import { ShamcarPaginationAttributes, ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json";
import { PaginationPayload } from "@@/common/types/payload";
import { IUser } from "@@/interfaces/user";

// prettier-ignore
export enum actionsName {

    GET_USERS = "GET_USERS",
    GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
    GET_USERS_FAILED = "GET_USERS_FAILED",
    GET_USERS_CLEANUP = "GET_USERS_CLEANUP",

    //================================================================

    GET_SINGLE_USER = "GET_SINGLE_USER",
    GET_SINGLE_USER_SUCCESS = "GET_SINGLE_USER_SUCCESS",
    GET_SINGLE_USER_FAILED = "GET_SINGLE_USER_FAILED",
    GET_SINGLE_USER_CLEANUP = "GET_SINGLE_USER_CLEANUP",

    //================================================================

    CREATE_USER = "CREATE_USER",
    CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
    CREATE_USER_FAILED = "CREATE_USER_FAILED",
    CREATE_USER_CLEANUP = "CREATE_USER_CLEANUP",
    CHANGE_USER_SUCCESS = "CHANGE_USER_SUCCESS",

    //================================================================

    UPDATE_USER = "UPDATE_USER",
    UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
    UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
    UPDATE_USER_CLEANUP = "UPDATE_USER_CLEANUP",

    //================================================================

    DELETE_USER = "DELETE_USER",
    DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
    DELETE_USER_FAILED = "DELETE_USER_FAILED",


    //================================================================

    ACTIVATE_USER = "ACTIVATE_USER",
    ACTIVATE_USER_SUCCESS = "ACTIVATE_USER_SUCCESS",
    ACTIVATE_USER_FAILED = "ACTIVATE_USER_FAILED",

    //================================================================
    DEACTIVATE_USER = "DEACTIVATE_USER",
    DEACTIVATE_USER_SUCCESS = "DEACTIVATE_USER_SUCCESS",
    DEACTIVATE_USER_FAILED = "DEACTIVATE_USER_FAILED",

    //dontRemoveMeNames,
}

type Payloads = {
    // GET_ATTACHMENT_TYPES: MoiRequest<MoiPaginationAttributes>;
    // GET_ATTACHMENT_TYPES_SUCCESS: PaginationPayload<IAttachmentType>;
    // CREATE_ATTACHMENT_TYPE: MoiRequest<IAttachmentType>;
    // GET_SINGLE_ATTACHMENT_TYPE: MoiRequest<IAttachmentType>;
    // GET_SINGLE_ATTACHMENT_TYPE_SUCCESS: IAttachmentType;
    // UPDATE_ATTACHMENT_TYPE: MoiRequest<IAttachmentType>;
    // DELETE_ATTACHMENT_TYPE: MoiRequest<JObject>;
    GET_SINGLE_USER: ShamcarRequest<JObject>;
    GET_SINGLE_USER_SUCCESS: IUser;
    CREATE_USER: ShamcarRequest<IUser>;
    UPDATE_USER: ShamcarRequest<IUser>;
    DELETE_USER: ShamcarRequest<JObject>;
    ACTIVATE_USER: ShamcarRequest<JObject>;
    DEACTIVATE_USER: ShamcarRequest<JObject>;

    //dontRemoveMePayload
}

export type actionName = typeof actionsName[keyof typeof actionsName]
export type actionType = {
    [K in keyof typeof actionsName]: {
        type: typeof actionsName[K]
        payload: K extends keyof Payloads ? Payloads[K] : any
    }
}[keyof typeof actionsName]
