export interface Bill {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  cost: number;
  edit: boolean;
  removed: boolean;
}

export interface Member {
  id: number;
  name: string;
  stayPeriod: Array<Period>;
  fee: number;
  edit: boolean;
  removed: boolean;
}

export interface Period {
  startDate: string;
  endDate: string;
}