import React from "react";

interface ButtonTabProps {
  title: string;
  active?: boolean;
  href?: string;
  dataFilter: string;
  onClick: () => void;
}

export default function ButtonTab(props: ButtonTabProps) {
  const { title, active, href, dataFilter, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`btn btn-status rounded-pill text-sm ${active && "btn-active"
        } me-3`}
    >
      {title}
    </button>
  );
}
