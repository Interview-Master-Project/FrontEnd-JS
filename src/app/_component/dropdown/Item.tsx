import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "alert";
};

export default function Item({ children, onClick, variant }: Props) {
  return (
    <motion.li
      whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
      whileTap={{ scale: 0.9, backgroundColor: "rgba(25, 140, 160, 0.2)" }}
      className={clsx(styles.item, {
        [styles.item__alert]: variant === "alert",
      })}
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
}
