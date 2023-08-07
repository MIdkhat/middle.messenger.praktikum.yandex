import { queryStringify } from './Helpers';

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  content_type?: string;
  data?: any;
};

type HTTPMethod<Response = void> = (
  path: string,
  data?: unknown,
  content_type?: string
) => Promise<Response>;

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path = '/', data = {}) =>
    this.request(this.endpoint + path, { data, method: Method.Get });

  public post: HTTPMethod = (path, data = {}) =>
    this.request(this.endpoint + path, { data, method: Method.Post });

  public put: HTTPMethod = (path, data = {}, content_type = 'json') =>
    this.request(this.endpoint + path, {
      data,
      method: Method.Put,
      content_type,
    });

  public patch: HTTPMethod = (path, data = {}) =>
    this.request(this.endpoint + path, { data, method: Method.Patch });

  public delete: HTTPMethod = (path, data = {}) =>
    this.request(this.endpoint + path, { data, method: Method.Delete });

  // replacement to fetch
  // XMLHttpRequest is defined in lib.dom
  private request<Response>(
    url: string,
    options: Options = { method: Method.Get, content_type: 'json' }
  ): Promise<Response> {
    const { method, data, content_type } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        if (content_type === 'multipart/form-data') {
          xhr.send(data);
          return;
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
