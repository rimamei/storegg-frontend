import React from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

interface MenuItemProps {
  icon:
    | "overview"
    | "transaction"
    | "messages"
    | "cards"
    | "rewards"
    | "settings"
    | "logout";
  title: string;
  href: string;
  active?: boolean;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { icon, title, active, href } = props;

  const classItem = cx({
    item: true,
    "mb-30": true,
    active: active,
  });

  console.log(href)

  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={`/icon/ic-menu-${icon}.svg`} width={25} height={25} />
      </div>
      <p className="item-title m-0">
        <Link href={href}>
          <a className="text-lg text-decoration-none">
            {title}
          </a>
        </Link>
      </p>
    </div>
  );
}
