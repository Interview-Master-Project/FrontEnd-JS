import Link from "next/link";
import Image from "next/image";
import {
  FaHeart as ContainedHeart,
  FaRegHeart as OutlinedHeart,
} from "react-icons/fa";
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { ComponentProps, MouseEventHandler } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import styles from "./list.module.scss";

function Container({ children, href }: ComponentProps<"a">) {
  return (
    <Link href={href as string} className={styles.list}>
      {children}
    </Link>
  );
}

interface ImageFrameProps extends ComponentProps<"img"> {
  variant?: "default";
}

function ImageFrame({ src, alt, variant = "default" }: ImageFrameProps) {
  const sizes = {
    default: [120, 120],
  };

  return (
    <div className={styles.imageFrame}>
      <Image
        src={src as string}
        alt={alt as string}
        width={sizes[variant][0]}
        height={sizes[variant][0]}
      />
    </div>
  );
}

interface AccessLabelProps {
  access: string;
}

function AccessLabel({ access }: AccessLabelProps) {
  return (
    <div
      className={clsx(styles.accessLabel, {
        [styles.accessLabel_public]: access === "PUBLIC",
        [styles.accessLabel_private]: access === "PRIVATE",
      })}
    >
      {access === "PUBLIC" ? <PublicIcon /> : <PrivateIcon />}
    </div>
  );
}

function InfoContainer({ children }: ComponentProps<"div">) {
  return (
    <motion.div
      initial={{ width: 900 }}
      whileHover={{ width: 900 }}
      transition={{ type: "tween", stiffness: 400, damping: 20 }}
      className={styles.infoContainer}
    >
      {children}
    </motion.div>
  );
}

interface ContentsBriefProps {
  title: string;
  category: string;
}

function ContentsBriefWrapper({ title, category }: ContentsBriefProps) {
  return (
    <div
      className={`${styles.contentsWrapper} ${styles.contentsWrapper__brief}`}
    >
      <h3>{title}</h3>
      <span>{category}</span>
    </div>
  );
}

interface ContentsDetailProps {
  description: string;
  quizCount: number;
  totalCorrectRate: number | string;
  recentCorrectRate: number | string;
  children: React.ReactNode;
}

function ContentsDetailsWrapper({
  description,
  quizCount,
  totalCorrectRate,
  recentCorrectRate,
  children,
}: ContentsDetailProps) {
  return (
    <div
      className={`${styles.contentsWrapper} ${styles.contentsWrapper__details}`}
    >
      <h5>{description}</h5>
      <span>
        <strong>{quizCount}</strong> 문제
      </span>
      <span>
        최근 정답률 <strong>{recentCorrectRate}</strong>
      </span>
      <span>
        전체 정답률 <strong>{totalCorrectRate}</strong>
      </span>
      {children}
    </div>
  );
}

interface LikesLabelProps {
  likes: number;
  isLiked: boolean;
  onMutate: MouseEventHandler;
}

function LikesLabel({ likes, isLiked, onMutate }: LikesLabelProps) {
  return (
    <div className={styles.likesLabel} onClick={onMutate}>
      {isLiked ? <ContainedHeart /> : <OutlinedHeart />}
      <span>{likes}</span>
    </div>
  );
}

export const List = Object.assign(Container, {
  ImageFrame,
  Info: InfoContainer,
  Access: AccessLabel,
  Brief: ContentsBriefWrapper,
  Details: ContentsDetailsWrapper,
  Likes: LikesLabel,
});
