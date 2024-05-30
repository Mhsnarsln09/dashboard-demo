import { HttpClient } from "./HttpClient"

export class BaseService {
  public client: HttpClient;
  baseUrl = '';
  constructor(endpoint: string = "") {
    this.baseUrl = endpoint;
    this.client = new HttpClient();
  }
}