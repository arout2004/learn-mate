export interface Card {
  id?: string;
}

export type APIOptsType = {
  path: string;
  body?: any;
  method?: RequestInit["method"];
  headers?: {
    [key: string]: string;
  };
  options?: RequestInit;
  token?: string;
  isImage?: boolean;
};

export type APIReturnType = {
  success: any;
  data: any;
  status: number;
  message: string;
  error: any;
  ACCESS_TOKEN?: any;
  REFRESH_TOKEN?: any;
  res: any;
};

export type APIFunction = (APIOpts: APIOptsType) => Promise<APIReturnType>;

export interface USER_TYPE {
  _id?: string;
  dp?: string;
  name?: string;
  email?: string;
  role?: string;
}
