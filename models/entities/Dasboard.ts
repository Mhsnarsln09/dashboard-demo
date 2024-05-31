export class DashboardInfo {
    constructor() {
        this.expireTime = '';
        this.lastChargeAmount = '';
        this.lastCharge = '';
        this.totalDataUsage = '';
        this.dailyUsage = '';

    }

    expireTime: string;
    lastChargeAmount: string;
    lastCharge: string;
    totalDataUsage: string;
    dailyUsage: string;
}


export class DashboardTable {

    constructor() {
        this.type = '';
        this.location = '';
        this.rental = '';
        this.ipcount = '';
        this.purpose = '';
        this.date = '';
    }

    type: string;
    location: string;
    rental: string;
    ipcount: string;
    purpose: string;
    date: string;
}