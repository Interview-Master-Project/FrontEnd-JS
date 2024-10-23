import Link from "next/link";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./list.module.scss";

function Container({ children, id, className }: ComponentProps<"a">) {
  return (
    <Link href={`/collections/${id}`} className={`${styles.list} ${className}`}>
      {children}
    </Link>
  );
}

interface AccessLabelProps {
  access: string;
}

function AccessLabel({ access }: AccessLabelProps) {
  return (
    <>
      <div
        className={clsx(styles.accessLabel, {
          [styles.accessLabel_public]: access === "PUBLIC",
          [styles.accessLabel_private]: access === "PRIVATE",
        })}
      >
        {access === "PUBLIC" ? <PublicIcon /> : <PrivateIcon />}
      </div>
    </>
  );
}

interface TitleProps extends PropsWithChildren {
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return <h3 className={className}>{children}</h3>;
}

function Description({ children }: PropsWithChildren) {
  return <span className={styles.description}>{children}</span>;
}

export const List = Object.assign(Container, {
  Title,
  Description,
  Access: AccessLabel,
});
