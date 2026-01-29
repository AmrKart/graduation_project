export interface JObject {
    [key: string]: any;
}

export interface JActions {
    [key: string]: Partial<Record<string, boolean>>;
  }
