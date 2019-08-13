export interface CompanyModel {
  nameCompany: string;
  projects:
    [
      {
        color: string,
        name: string
      }
      ];
  roles: string[];
}
