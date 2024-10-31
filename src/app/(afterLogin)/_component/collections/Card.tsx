import Link from "next/link";
import {
  FaHeart as ContainedHeart,
  FaRegHeart as OutlinedHeart,
} from "react-icons/fa";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./card.module.scss";

function Container({ children, id, className }: ComponentProps<"a">) {
  return (
    <Link
      href={`/details/collections/${id}`}
      className={`${styles.card} ${className}`}
    >
      {children}
    </Link>
  );
}

interface LikesLabelProps {
  likes: number;
}

function LikesLabel({ likes }: LikesLabelProps) {
  return (
    <>
      <div className={styles.likesLabel}>
        <OutlinedHeart />
        <span>{likes}</span>
      </div>
    </>
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
  Likes: LikesLabel,
});
