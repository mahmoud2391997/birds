import React from "react";
import Link from "next/link";

const FancyButton = ({
  onClick,
  href,
  children = "Get started",
  className = "",
  style = {},
  ...props
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`glowing-btn ${className}`}
        style={style}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`glowing-btn ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default FancyButton;
