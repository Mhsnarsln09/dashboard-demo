
import { BaseService } from "./baseServices/BaseService";

export class AuthService extends BaseService {
  constructor() {
    super("");
  }
  Login(item: any) {
    return this.client.Post(`${this.baseUrl}login`, item);
  }
}
