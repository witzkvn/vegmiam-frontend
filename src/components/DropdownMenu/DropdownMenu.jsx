import React from "react";

const DropdownMenu = React.forwardRef((props, ref) => {
  console.log(props);
  const { open, className, children, ...otherProps } = props;
  return (
    <div
      className={`${className ? className : ""} ${
        open ? " opacity-100 block top-14" : "opacity-0 hidden top-0"
      }  absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      ref={ref}
      {...otherProps}
    >
      <div class="py-1" role="none">
        {children}
      </div>
    </div>
  );
});

export default DropdownMenu;
