"use client";

import Link from "next/link";
import Image from "next/image";
import { useClientFetch } from "@/hooks/useClientFetch";
import { MY_HISTORY, IData } from "@/graphql/query/my-history";
import { motion } from "framer-motion";
import clsx from "clsx";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styles from "./list.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function List() {
  const { data, loading, error } = useClientFetch<IData>(MY_HISTORY, {
    variables: {
      offset: 0,
      filter: "PRIVATE",
    },
  });

  return (
    <>
      {data?.myHistory.collectionsWithAttempt.map(({ collection }) => (
        <motion.div
          key={collection.id}
          whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
          whileTap={{
            scale: 0.9,
            backgroundColor: "rgba(25, 140, 160, 0.2)",
          }}
        >
          <Link
            href={`/my/collections?id=${collection.id}`}
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
              <span>{dayjs(collection.updatedAt).fromNow()}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
