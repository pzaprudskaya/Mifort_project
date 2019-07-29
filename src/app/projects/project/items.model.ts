export interface Project {
  color: string;
  name: string;
  team:
    [
      {
        photo:	string,
        name:	string,
        workload:	number,
      }
    ];
  startDate:	string;
  endDate:	string;
  planned:	number;
  actual:	number;
  status: string;


}

