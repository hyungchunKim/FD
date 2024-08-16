import Dropdown from '@/components/atoms/dropdown/Dropdown';
import { TDropdown } from '@/types/dropdown/dropdown';
import React from 'react';



const DropdownPage = () => {
  
  const dropdown: TDropdown = {
    dropStandard: 'Sort',
    dropWidth: 120,
    downMenus: [
      {
        menuTitle: '최신순',
        isChecked: true
      },
      {
        menuTitle: '오래된순',
        isChecked: false
      },
      {
        menuTitle: '이름순',
        isChecked: false
      }
    ],
    isToggle: false,
  }
  
  return (
    <>
      <Dropdown dropdown={dropdown}/>
    </>
  );
};

export default DropdownPage;