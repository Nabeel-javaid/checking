import React from "react";
import classNames from "classnames";
// import PropTypes from "prop-types";

export default function SecondaryButton({
  children,
  className,
  onClick,
  ...props
}) {
  const cx = classNames(
    "border border-primary text-primary hover:bg-Red-500 transition-colors duration-300 rounded-full py-3 px-4",
    className
  );
  
  return (
    <button onClick={onClick} className={cx} {...props}>
      {children}
    </button>
  );
}

// SecondaryButton.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
//   onClick: PropTypes.func,
// };
