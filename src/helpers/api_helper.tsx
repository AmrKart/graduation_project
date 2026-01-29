import axios from 'axios';
import { Response, ResponseStatusCode } from '../common/types/axiosResponse';
import authHeader, {
  getAuthObject,
  setAuthUser,
} from './jwt-token-access/auth-token-header';
import store from '@@/store';
import { REFRESH_TOKEN } from './url_helper';
import { JObject } from '../common/types/json';
// import { loginSuccess, logout } from '@@/store/authentication/actions';
import langHeader from './language/languageHeader';
import moment from 'moment-timezone';
// import { MoiRoutes } from '@@/routes/routeEnum';
import { ErrorMode, SuccessMode } from '../common/types/axiosRequest';
import { getErrorMessage, showMessage } from './errorResponse';
import { overwriteResponse } from './dateHelper';
import { ShamcarRoutes } from '@@/routes/routeEnum';
import { loginSuccess, logout } from '@@/store/actions';
import { buildShamcarRequest } from './buildRequest';

//pass new generated access token here

//apply base url for axios
const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
// const API_URL = "/proxy";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.data) {
      response.data = overwriteResponse(response.data);
    }
    response.data.messages = response.data.message;
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response.status === ResponseStatusCode.Unauthorized) {
      if (!error.config.retry) {
        try {
          error.config.retry = true;
          const authObject = await getAuthObject();
          if (authObject == null) {
            window.document.location.href = ShamcarRoutes.Login;
          }
          try {
            const response: Response<JObject> = await axiosApi.post(
              `${REFRESH_TOKEN}`,
              {
                accessToken: authObject.accessToken,
                refreshToken: authObject.refreshToken,
              }
            );
            await setAuthUser(response.data);
            store.dispatch(loginSuccess(response!.data!));
          } catch (error) {
            localStorage.removeItem('authUser');
            window.document.location.href = ShamcarRoutes.Login;
          }
          return axiosApi(error.config);
        } catch (error) {
          store.dispatch(logout(buildShamcarRequest({})));
        }
      } else {
        store.dispatch(logout(buildShamcarRequest({})));
      }
    }
    return Promise.reject(error);
  }
);
axiosApi.interceptors.request.use(
  async (config) => {
    const token = await authHeader();
    const lang = await langHeader();
    const timeZonse = moment.tz.guess();
    if (token) {
      config.headers.Authorization = await authHeader();
    }
    if (lang) {
      config.headers['Accept-Language'] = await langHeader();
    }
    if (timeZonse) {
      config.headers['Tz'] = timeZonse;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function get<U>(
  url: string,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config: JObject = {}
): Promise<Response<U>> {
  if (config?.params?.pageIndex)
    config.params.pageNumber = config.params.pageIndex;
  return await axiosApi
    .get(url, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data?.message);
      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}

export async function post<T, U>(
  url: string,
  data: T,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config = {}
): Promise<Response<U>> {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data?.message);
      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}
export async function patch<T, U>(
  url: string,
  data: T,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config = {}
): Promise<Response<U>> {
  return axiosApi
    .patch(url, data, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data?.message);

      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}
export async function postFormData<T, U>(
  url: string,
  data: T,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config = {}
): Promise<Response<U>> {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data.message);
      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}
export async function downloadFile(
  url: string,
  data: any,
  name = 'response',
  config = {}
): Promise<boolean> {
  return axiosApi
    .post(url, { ...data }, { ...config, responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('target', '_blank'); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      return true;
    })
    .catch((ex) => {
      handleExp('message', ex);
      throw ex;
    });
}
export async function downloadFileGetMethod(
  url: string,
  config = {}
): Promise<boolean> {
  return axiosApi
    .get(url, { ...config, responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('target', '_blank'); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      return true;
    });
}

export async function previewFileGetMethod(
  url: string,
  name = 'response',
  config = {}
): Promise<Blob> {
  return axiosApi
    .get(url, { ...config, responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });

      return blob;
    });
}

export async function put<T, U>(
  url: string,
  data: T,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config = {}
): Promise<Response<U>> {
  return axiosApi
    .put(url, data, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data.message);
      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}

export async function del<U>(
  url: string,
  messageMode = { error: ErrorMode.none, success: SuccessMode.none },
  config = {}
): Promise<Response<U>> {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => {
      handleSuccess(messageMode.success, response.data.message);
      return response.data;
    })
    .catch((ex) => {
      handleExp(messageMode.error, ex);
      throw ex;
    });
}

export const handleExp = (mode: string, error: any) => {
  if (mode == ErrorMode.message) getErrorMessage(error, true);
  else if (mode == ErrorMode.page) window.location.href = ShamcarRoutes.ERROR;
};
export const handleSuccess = (mode: string, message: any) => {
  if (mode == SuccessMode.message) showMessage(message);
};
