import clsx from "clsx";
import { motion } from "framer-motion";
import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Item({ children, className }: Props) {
  return (
    <motion.li
      whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
      whileTap={{ scale: 0.9, backgroundColor: "rgba(25, 140, 160, 0.2)" }}
      className={clsx(styles.dropdownItem, className)}
    >
      {children}
    </motion.li>
  );
}
