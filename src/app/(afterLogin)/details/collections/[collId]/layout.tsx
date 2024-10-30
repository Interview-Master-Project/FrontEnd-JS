import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <main className={styles.main}>{children}</main>;
}
