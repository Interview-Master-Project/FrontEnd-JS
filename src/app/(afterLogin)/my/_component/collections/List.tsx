"use client";

import Link from "next/link";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import {
  FaRegHeart as OutlinedHeart,
  FaHeart as ContainedHeart,
} from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { LIKE } from "@/graphql/mutation/like";
import { UNLIKE } from "@/graphql/mutation/unlike";
import { IData, MY_COLLECTIONS } from "@/graphql/query/my-collections";
import { motion } from "framer-motion";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import clsx from "clsx";
import styles from "./list.module.scss";

type Props = {
  data: IData;
  sort: any;
  offset: any;
};

export default function List({ data, sort, offset }: Props) {
  const cookies = useCookies();
  const token = cookies.get("authToken");

  const [likeCollection] = useMutation(LIKE);
  const [unlikeCollection] = useMutation(UNLIKE);

  const handleLike = async (isLiked: boolean, collectionId: string) => {
    const targetMutation = isLiked ? unlikeCollection : likeCollection;

    await targetMutation({
      variables: { collectionId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
      update(cache, { data }) {
        if (!data) return;

        const prevData = cache.readQuery<IData>({
          query: MY_COLLECTIONS,
          variables: {
            sort: sort ?? "LATEST",
            offset: Number(offset) ?? 0,
          },
        });

        if (prevData) {
          const updatedCollections =
            prevData.myCollections.collectionsWithAttempt.map((item) => {
              if (item.collection.id === collectionId) {
                return {
                  ...item,
                  collection: {
                    ...item.collection,
                    likes: isLiked
                      ? item.collection.likes - 1
                      : item.collection.likes + 1,
                  },
                  isLiked: !isLiked,
                };
              }
              return item;
            });
          cache.writeQuery({
            query: MY_COLLECTIONS,
            variables: {
              sort: sort ?? "LATEST",
              offset: Number(offset) ?? 0,
            },
            data: {
              ...prevData,
              myCollections: {
                ...prevData?.myCollections,
                collectionsWithAttempt: updatedCollections,
              },
            },
          });
        }
      },
    });
  };

  return (
    <>
      {data?.myCollections.collectionsWithAttempt.map(
        ({ collection, isLiked }) => (
          <motion.div
            key={collection.id}
            whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
            // whileTap={{
            //   scale: 0.9,
            //   backgroundColor: "rgba(25, 140, 160, 0.2)",
            // }}
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
              <div
                className={styles.likesLabel}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLike(isLiked, collection.id);
                }}
              >
                {isLiked ? <ContainedHeart /> : <OutlinedHeart />}
                <span>{collection.likes}</span>
              </div>
            </Link>
          </motion.div>
        )
      )}
    </>
  );
}
