'use client';

import React from 'react';
import styles from './JobDetail.module.scss';
import { Selection } from '@/components';

const JobDetail = ({
  stage,
  onTitleChange,
}: {
  stage: string;
  onTitleChange: any;
}) => {
  const [formState, setFormState] = React.useState({
    title: '',
    location: '',
  });

  return (
    <form className='flex'>
      <div className='bg-white w-3/4 drop-shadow-md rounded-md'>
        {/* ***********************Job Title Section*********************************** */}
        <section className='relative'>
          <h2 className={`${styles.form__section__title}`}>Job title</h2>
          <div className={`${styles.form__section__wrapper}`}>
            <div className='mb-6'>
              <label
                htmlFor='job-title'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                <span className='text-red-500 mr-1'>*</span>
                Job title
              </label>
              <input
                type='text'
                id='job-title'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Example: Fullstack Developer'
                value={formState.title}
                onChange={(e) => {
                  setFormState({ ...formState, title: e.target.value });
                  onTitleChange(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='absolute left-full top-1/2 -translate-y-1/2 ml-8 w-1/3'>
            <span className='text-sm text-neutral-500'>
              Sử dụng chức danh công việc phổ biến cho khả năng tìm kiếm Chỉ
              quảng cáo cho một công việc, ví dụ: &apos;Y tá&apos;, không phải
              &apos;y tá&apos; Không có cơ hội hoặc sự kiện chung
            </span>
          </div>
        </section>

        {/* ***********************Location Section*********************************** */}
        <section className='relative'>
          <h2 className={`${styles.form__section__title}`}>Location</h2>
          <div className={`${styles.form__section__wrapper}`}>
            <div className='mb-6'>
              <label
                htmlFor='job-location'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                <span className='text-red-500 mr-1'>*</span>
                Job location
              </label>
              <div className='flex gap-8 items-center'>
                <input
                  type='text'
                  id='job-location'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Example: District 7, Ho Chi Minh'
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                />
                <span className='flex-shrink-0'>Fully remote</span>
              </div>
            </div>
          </div>
          <div className='absolute left-full top-1/2 -translate-y-1/2 ml-8 w-1/3'>
            <span className='text-sm text-neutral-500'>
              Sử dụng vị trí để thu hút các ứng viên phù hợp nhất Nếu bạn chọn
              hộp &quot;hoàn toàn từ xa&quot;, hãy thêm ít nhất một quốc gia.
              Một số bảng công việc yêu cầu một vị trí
            </span>
          </div>
        </section>

        {/* ***********************Description Section*********************************** */}
        <section className='relative'>
          <h2 className={`${styles.form__section__title}`}>Description</h2>
          <div className={`${styles.form__section__wrapper}`}>
            <div className='mb-6'>
              <label
                htmlFor='job-location'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                <span className='text-red-500 mr-1'>*</span>
                About this role
              </label>
              <div className='border border-slate-600 rounded-lg min-h-[600px] p-6 relative overflow-hidden'>
                <div className='mb-6 min-h-[220px]'>
                  <label
                    htmlFor='job-location'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Description
                  </label>
                  <p className='text-sm text-gray-600'>
                    Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day.
                  </p>
                </div>
                <div className='mb-6 min-h-[220px]'>
                  <label
                    htmlFor='job-location'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Requirments
                  </label>
                  <p className='text-sm text-gray-600'>
                    Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day.
                  </p>
                </div>
                <div className='mb-6 min-h-[220px]'>
                  <label
                    htmlFor='job-location'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Benefits
                  </label>
                  <p className='text-sm text-gray-600'>
                    Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day.
                  </p>
                </div>

                <div className='absolute bottom-0 right-0 left-0 p-1 bg-gray-200'>
                  <span className='text-xs text-gray-500'>
                    Minimum 700 characters. 0 characters used.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute left-full top-1/2 -translate-y-1/2 ml-8 w-1/3'>
            <span className='text-sm text-neutral-500'>
              Định dạng thành các phần và danh sách để cải thiện khả năng đọc
              Tránh nhắm mục tiêu nhân khẩu học cụ thể, ví dụ: giới tính, quốc
              tịch và độ tuổi Không cần thêm liên kết để đăng ký (một liên kết
              được thêm tự động)
            </span>
          </div>
        </section>

        {/* ***********************Company industry and Job function Section*********************************** */}
        <h2 className={`${styles.form__section__title}`}>
          Company industry and Job function
        </h2>
        <section className={`${styles.form__section__wrapper}`}>
          <Selection
            title='Company industry'
            required={true}
            datas={[
              'Accounting',
              'Airlines/Aviation',
              'Alternative Dispute Resolution',
            ]}
          />
        </section>
        <div className='p-5 border-t border-t-slate-300'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Save & continue
          </button>
          <button
            type='button'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
          >
            Save draft
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobDetail;
