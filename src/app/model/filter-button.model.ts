export interface FilterButton {
  type: Filter;
  label: string;
  isActived: boolean;
}

export enum Filter {
  All, Active, Completed
}
