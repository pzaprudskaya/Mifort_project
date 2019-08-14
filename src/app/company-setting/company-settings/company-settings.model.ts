export interface CompanySettingsModel {
  id: number;
  name: string;
  activities:
    {
      vacation: boolean;
      sickLeave: boolean;
      business: boolean;
    };
  defaultProject: string[];
  startWeek: string;
  defaultWorkload: {
    hours: number;
    period: string;
  };
  approval: string;
  notify: any[];
  abilityToForget: boolean;
  submitTimeLogs: boolean;
  comments: boolean;
  validation: string;

  connectedIntegration: [
    {
      id: number;
      name: string;
      background: string;
    }
  ];
  integrations: [
    {
      id: number;
      name: string;
      background: string;
    }
  ];
}



