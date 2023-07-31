'use client';

import styles from './page.module.css';
import { Alert } from 'flowbite-react';
import variables from './variables.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <Alert color='info'>Alert!</Alert>
      <Link href={'http://fptuni.localhost:3000'}>go</Link>
    </main>
  );
}
