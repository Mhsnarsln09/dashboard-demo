import { BaseService } from "./baseServices/BaseService";

export class DashboardService extends BaseService {
  constructor() {
    super("");
  }
  GetInfo() {
    return this.client.Get(`${this.baseUrl}get-info`);
  }
  GetTable() {
    return this.client.Get(`${this.baseUrl}get-table`);
  }
}