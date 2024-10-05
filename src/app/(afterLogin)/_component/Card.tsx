import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { BsIncognito as PrivateIcon } from "react-icons/bs";
import { PropsWithChildren } from "react";
import styles from "./card.module.scss";
import clsx from "clsx";

function Container({ children }: PropsWithChildren) {
  return <div className={styles.card}>{children}</div>;
}

interface AccessLabelProps {
  access: string;
}

function AccessLabel({ access }: AccessLabelProps) {
  return (
    <>
      <div
        className={clsx(styles.accessLabel, {
          [styles.accessLabel_public]: access === "PUBLIC",
          [styles.accessLabel_private]: access === "PRIVATE",
        })}
      >
        {access === "PUBLIC" ? <PublicIcon /> : <PrivateIcon />}
      </div>
    </>
  );
}

interface TitleProps extends PropsWithChildren {
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return <h5 className={className}>{children}</h5>;
}

function Description({ children }: PropsWithChildren) {
  return <p className={styles.description}>{children}</p>;
}

export const Card = Object.assign(Container, {
  Title,
  Description,
  Access: AccessLabel,
});
