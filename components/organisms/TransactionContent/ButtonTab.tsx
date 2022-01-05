import React from "react";

interface ButtonTabProps {
  title: string;
  active?: boolean;
  href?: string;
  dataFilter: string;
}

export default function ButtonTab(props: ButtonTabProps) {
  const { title, active, href, dataFilter } = props;
  return (
    <a
      data-filter={dataFilter}
      href={href}
      className={`btn btn-status rounded-pill text-sm ${
        active && "btn-active"
      } me-3`}
    >
      {title}
    </a>
  );
}
