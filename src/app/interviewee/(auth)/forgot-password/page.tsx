'use client';

import React, { useRef, useState } from 'react';
import styles from './forgot-password.module.scss';
import ForgotPasswordForm from './ForgotPasswordForm';
import Head from 'next/head';
import ChangePassword from './ChangePassword';
import EmailSent from './EmailSent';

const ForgotPassword = () => {
  const [stage, setStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  const swipeLeft = () => {
    setStage(stage + 1);
    backBtnRef.current!.remove();
    backBtnRef.current!.classList.add(styles.fadeIn);
    wrapperRef.current!.appendChild(backBtnRef.current!);
  };

  const swipeRight = () => {
    setStage(stage - 1);
    backBtnRef.current!.remove();
    if (stage === 2) wrapperRef.current!.appendChild(backBtnRef.current!);
  };

  return (
    <>
      <main className={styles.wrapper}>
        <Head>
          <title>Forgot Password</title>
        </Head>
        <div
          ref={wrapperRef}
          className='w-full md:w-[500px] bg-white rounded-lg border border-slate-200 drop-shadow-md p-10 px-14 text-center overflow-hidden relative'
        >
          <h1 className={styles.title__gradient}>Forgot Password</h1>

          <div
            className='w-full flex flex-nowrap items-center gap-14 transition-all'
            style={{
              transform: `translateX(-${1 * stage}00%) translateX(-${
                56 * stage
              }px)`,
            }}
          >
            <ForgotPasswordForm onSwipe={swipeLeft} />
            {stage > 0 && <EmailSent onSwipe={swipeLeft} />}
            {stage > 0 && <ChangePassword />}
          </div>
          <button
            ref={backBtnRef}
            className={`opacity-0 absolute left-2 top-1/2 -translate-y-1/2 `}
            disabled={stage <= 0}
            onClick={() => swipeRight()}
          >
            back
          </button>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
