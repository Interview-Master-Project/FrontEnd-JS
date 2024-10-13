import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import styles from "./dropdown.module.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
};

export default function Menu({ children, isOpen, className }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(styles.dropdownMenu, className)}
          initial={{ opacity: 0, scale: 0.5, x: 20, y: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 20, y: -50 }}
        >
          <ul>{children}</ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
