import Link from "next/link";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./card.module.scss";

function Container({ children, id, className }: ComponentProps<"a">) {
  return (
    <Link href={`/collections/${id}`} className={`${styles.card} ${className}`}>
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

interface TextProps extends PropsWithChildren {
  className?: string;
}

function Title({ children, className }: TextProps) {
  return <h3 className={className}>{children}</h3>;
}

function Info({ children, className }: TextProps) {
  return <div className={`${className} ${styles.info}`}>{children}</div>;
}

function Description({ children }: PropsWithChildren) {
  return <span className={styles.description}>{children}</span>;
}

export const Card = Object.assign(Container, {
  Title,
  Info,
  Description,
  Access: AccessLabel,
});
