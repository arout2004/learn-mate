import { APIFunction } from "@/types";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//SET To LocalStorage
export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const saveToSessionStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getFromSessionStorage = (key: any) => {
  return typeof window !== "undefined"
    ? sessionStorage.getItem(key) ?? null
    : null;
};

export const removeSessionStorage = (key: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

// GET From LocalStorage
export const getFromLocalStorage = (key: any) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null
    : null;
};

//  Remove from LocalStorage
export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const put: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = "PUT",
  options = {},
  headers = {},
  token = "",
  isImage,
}) => {
  const authToken = getFromLocalStorage("REFRESH_TOKEN");
  // const accessToken = getFromLocalStorage("token");
  const accessToken = getFromLocalStorage("ACCESS_TOKEN");
  // console.log({ accessToken });
  headers.Authorization = `Bearer ${accessToken}`;
  if (!isImage) {
    headers["Content-Type"] = "application/json";
  }
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    };
    // console.log(headers);
    //
    const response = await fetch(`${BASE_URL}${path}`, API_OPTIONS);
    const json = await response.json();
    if (response?.status === 401) {
      const getResponse = await fetch(`${BASE_URL}auth/get-access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          refresh_token: authToken,
        }),
      });
      const getResponseData = await getResponse.json();
      if (token) headers.Authorization = `$Bearer ${getResponseData?.token}`;
      const response = await fetch(`${BASE_URL}${path}`, API_OPTIONS);
      const json = await response.json();
      // console.log(API_OPTIONS);
      return {
        ...json,
        data: json?.data,
        status: response?.status,
        error: json?.error,
      };
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return { error };
  }
};
