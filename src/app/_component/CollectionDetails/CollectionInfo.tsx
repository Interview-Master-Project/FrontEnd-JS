"use client";

import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { GetCollectionQuery } from "@/__api__/types";
import styles from "./collectionDetails.module.scss";

type Props = Pick<
  NonNullable<GetCollectionQuery["getCollection"]>,
  "access" | "name" | "description"
>;

function PrivateLabel() {
  return (
    <div className={styles.privateLabel}>
      <PrivateIcon />
      <span>Private</span>
    </div>
  );
}

function PublicLabel() {
  return (
    <div className={styles.publicLabel}>
      <PublicIcon />
      <span>Public</span>
    </div>
  );
}

export default function CollectionInfo({ access, name, description }: Props) {
  return (
    <div className={styles.collectionInfo}>
      <div className={styles.collectionAccess}>
        {access === "PRIVATE" ? <PrivateLabel /> : <PublicLabel />}
      </div>
      <h4>{name}</h4>
      <h5>{description}</h5>
    </div>
  );
}
