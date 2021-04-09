import React from "react";

const DropdownLink = ({ link, children }) => {
  return (
    <a href={link} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
      {children}
    </a>
  );
};

export default DropdownLink;
