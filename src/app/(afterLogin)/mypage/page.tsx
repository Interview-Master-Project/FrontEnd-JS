import styles from "./page.module.scss";
import { faker } from "@faker-js/faker";
import Image from "next/image";

export default function Page() {
  // dummy data
  const user = {
    username: "유준상",
    image: faker.image.avatarGitHub(),
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.userInfo}>
          <div className={styles.userProfile}>
            <button>수정</button>
            <Image
              src={user.image}
              alt={user.username}
              width={144}
              height={144}
            />
            <span>{user.username}</span>
          </div>
          <div className={styles.userLog}>
            <div>제출 수</div>
          </div>
        </div>
      </main>
    </>
  );
}
