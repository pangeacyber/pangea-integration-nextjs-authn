"use client";

import styles from "../page.module.css";

export default function News() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Public page example</h2>
        <p>This is an unauthenticated public page.</p>
      </div>
    </main>
  );
}
