const basePath = `${
  process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ''
}/icons/`;

export const icons = {
  logoIcon: `${basePath}`,
};

export const favIcons = `${process.env.REACT_APP_BASE_URL}/favicons`;

export const enum ApiVersions {
  V1 = 'V1',
  MOCK = 'MOCK',
}

export const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export const token = 'token';
