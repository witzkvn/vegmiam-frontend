import React from "react";
import { GiCook } from "react-icons/gi";
import CustomButton from "../CustomButton/CustomButton";

const SearchBar = () => {
  return (
    <div className="flex items-center w-full pr-6 max-w-xl">
      <form className="flex items-center w-full ">
        <input type="text" id="search" className="text-black input rounded-tr-none rounded-br-none" placeholder="Recherche..." />
        <CustomButton type="primary" className=" flex items-center rounded-bl-none rounded-tl-none whitespace-nowrap">
          Miam
          <span className="ml-1 text-base">
            <GiCook />
          </span>
        </CustomButton>
      </form>
    </div>
  );
};

export default SearchBar;
