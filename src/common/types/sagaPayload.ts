import { ShamcarRequest } from "./axiosRequest"

export type SagaPayload<T> =
    {
        type: string,
        payload: ShamcarRequest<T>
    }
