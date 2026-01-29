import { JObject } from '../common/types/json';

export const buildShamcarRequest = <T,>(
  data: T,
  history: any = null,
  route: any = null,
  reFetch: any = null,
  methods: any = null
) => {
  return {
    data: data,
    history,
    route,
    reFetch,
    methods,
  };
};

export const buildActionShamcarRequest = <T,>(
  data: T,
  history: any = null,
  route: any = null
) => {
  return {
    data: { id: data },
    history,
    route,
  };
};
