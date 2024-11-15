import BackButton from "./BackButton";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ReactNode } from "react";
import styles from "./infoModal.module.scss";

type Props = {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  children: ReactNode; // Link, button 요소
  backButtonActive?: boolean;
};

export default function InfoModal({
  title,
  subtitle,
  description,
  children,
  backButtonActive = true,
}: Props) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {backButtonActive && <BackButton />}
          <Image src={logo} alt="로고" className={styles.logo} />
          <h1>
            {title}
            {subtitle && (
              <>
                <br />
                {subtitle}
              </>
            )}
          </h1>
          <p>{description && description}</p>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}
