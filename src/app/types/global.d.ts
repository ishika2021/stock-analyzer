import { CompanyData } from "./commonTypes";

declare global {
  interface Company {
    company_name: string;
    data: CompanyData;
  }
}

export {};
