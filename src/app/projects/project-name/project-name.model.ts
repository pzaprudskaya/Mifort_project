export interface ProjectNameModel {

      name: string;
      color: string;
      code: string;
      status: string;
      projectType: string;
      startDate: string;
      endDate: string;
      progressBar: {
        total: number,
        currentlySpent: number,
        expected: number
      };
      team: [
        {
          photo: string,
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



