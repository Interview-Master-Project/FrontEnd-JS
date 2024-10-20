"use client";

import { ComponentProps, PropsWithChildren } from "react";
import styles from "./filter.module.scss";

function FilterContainer({ children, onClick }: ComponentProps<'div'>) {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
    </div>
  );
}

function Icon({ children }: PropsWithChildren) {
  return <div className={styles.iconWrapper}>{children}</div>;
}

function Label({ children }: PropsWithChildren) {
  return <span className={styles.label}>{children}</span>;
}

function Dropdown({ children, className }: ComponentProps<"div">) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const Filter = Object.assign(FilterContainer, {
  Icon,
  Label,
  Dropdown,
});
