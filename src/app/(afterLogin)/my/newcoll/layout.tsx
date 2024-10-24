import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div style={{ width: 750, margin: "0 auto" }}>
      {children}
      {modal}
    </div>
  );
}
