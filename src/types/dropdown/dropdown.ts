export type TDropdown = {
  dropStandard: string;
  dropWidth: number;
  downMenus: TDownMenus[];
  isToggle: boolean; 
}

export type TDownMenus = {
  menuTitle: string;
  isChecked: boolean;
}