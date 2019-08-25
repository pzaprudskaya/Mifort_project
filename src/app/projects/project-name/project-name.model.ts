export interface ProjectNameModel {

      name: string;
      color: string;
      code: string;
      status: string;
      projectType: string;
      startDate: string;
      endDateOrMen: string;
      progressBar: {
        total: number,
        currentlySpent: number,
        expected: number
      };
      team: [
        {
          id: number
          photo: string,
          role: string;
          name: string,
          workload: number,
        }
      ];
      connectedIntegration:	[
        {
          id: string,
          name: string,
          background: string,
        }
        ];
      integrations:	[
        {
          id: string,
          name: string,
          background: string,
        }
      ];
  'yearsWorkload': [
    {
      'month': string,
      'projectsWorkload': [
        {
          'color':	string,
          'name':	string,
          'workload':	number
        }
        ]
    }
];

}



