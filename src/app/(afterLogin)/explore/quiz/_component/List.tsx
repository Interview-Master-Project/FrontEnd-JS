import Link from "next/link";
import Image from "next/image";
import { ComponentProps, PropsWithChildren } from "react";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import clsx from "clsx";
import styles from "./list.module.scss";

function ListContainer({ id, children, className }: ComponentProps<"a">) {
  return (
    <Link
      href={`/details/collections/${id}`}
      className={`${styles.list} ${className}`}
    >
      {children}
    </Link>
  );
}

interface CollectionInfoProps {
  name: string;
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
}

function CollectionInfo({ name, imgUrl, access }: CollectionInfoProps) {
  return (
    <div className={styles.collectionInfo}>
      <div>
        <Image
          src={imgUrl}
          alt="이미지"
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
        />
        <span>{name}</span>
      </div>
      <div
        className={clsx(styles.accessLabel, {
          [styles.accessLabel__public]: access === "PUBLIC",
          [styles.accessLabel__private]: access === "PRIVATE",
        })}
      >
        {access === "PUBLIC" ? <PublicIcon /> : <PrivateIcon />}
      </div>
    </div>
  );
}

function Question({ children }: PropsWithChildren) {
  return <h3 className={styles.question}>{children}</h3>;
}

export const List = Object.assign(ListContainer, {
  Question,
  CollectionInfo,
});
