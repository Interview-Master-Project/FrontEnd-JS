"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegHeart as OutlinedHeart } from "react-icons/fa";
import { IData } from "@/graphql/query/my-collections";
import { motion } from "framer-motion";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import clsx from "clsx";
import styles from "./list.module.scss";

export default function List({ data }: { data: IData }) {
  return (
    <>
      {data?.myCollections.collectionsWithAttempt.map(({ collection }) => (
        <motion.div
          key={collection.id}
          whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
          whileTap={{
            scale: 0.9,
            backgroundColor: "rgba(25, 140, 160, 0.2)",
          }}
        >
          <Link
            href={`/details/collections/${collection.id}`}
            className={styles.list}
          >
            <div
              className={clsx(styles.accessLabel, {
                [styles.accessLabel_public]: collection.access === "PUBLIC",
                [styles.accessLabel_private]: collection.access === "PRIVATE",
              })}
            >
              {collection.access === "PUBLIC" ? (
                <PublicIcon />
              ) : (
                <PrivateIcon />
              )}
            </div>
            <Image
              src={collection.imgUrl as string}
              alt={`${collection.name} 이미지`}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
              priority
            />
            <div>
              <h3>{collection.name}</h3>
              <span>{collection.description}</span>
            </div>
            <div className={styles.likesLabel}>
              <OutlinedHeart />
              <span>{collection.likes}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
