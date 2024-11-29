"use client";

import { useState } from "react";
import Link from "next/link";
import { Dropdown } from "../dropdown/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { IDetailsProps } from "@/types/CollectionDetails/types";
import styles from "./collectionDetails.module.scss";

export default function InfoEditBtn({ isCreator, collId }: IDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDropdown = () => setIsOpen(!isOpen);
  const handleOffDropdown = () => setIsOpen(false);

  return (
    <div className={styles.infoEditBtn}>
      {isCreator && (
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Active
            onClick={handleCloseDropdown}
            boxWidth={36}
            boxHeight={36}
          >
            <BsThreeDots />
          </Dropdown.Active>
          <Dropdown.Menu isOpen={isOpen} containerWidth={100}>
            <Link href={`/my/collections/${collId}/edit`}>
              <Dropdown.Item>수정</Dropdown.Item>
            </Link>
            <Link href={`/my/collections/${collId}/delete`}>
              <Dropdown.Item variant="alert">삭제</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
