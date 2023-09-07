'use client';

import React from 'react';

import Quill, { QuillOptionsStatic } from 'quill';
import styles from './QuillEditor.module.scss';
import { useOutsideClick } from '@/hooks/useClickOutside';

interface IQuillEditor {
  theme?: 'snow' | 'bubble';
}

const CustomTooltip = (value: string) => (
  <div className='relative h-0 w-0 overflow-visible'>
    <span className='absolute top-full'>{value}</span>
  </div>
);

const QuillEditor = ({ theme = 'snow' }: IQuillEditor) => {
  const wrapperRef = useOutsideClick<HTMLDivElement>(() =>
    toolbarRef.current!!.removeAttribute('style')
  );
  const editorRef = React.useRef<HTMLDivElement>(null);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const [editor, setEditor] = React.useState<Quill>();

  React.useEffect(() => {
    if (
      editorRef.current &&
      toolbarRef.current &&
      editorRef.current.childNodes.length === 0
    ) {
      const editor = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarRef.current,
        },
      } as QuillOptionsStatic);
      setEditor(editor);
    }
  }, [theme]);

  return (
    <div
      ref={wrapperRef}
      onFocusCapture={() => (toolbarRef.current!!.style.height = '36px')}
    >
      <div ref={toolbarRef} className={styles.toolbar__container}>
        <ul className='flex'>
          <li className='w-9 aspect-square flex items-center justify-center border-r border-gray-400 hover:bg-slate-200 cursor-pointer' onMouseEnter={(e) => {
            console.log(e.currentTarget)
          }}>
            <button type='button' className='ql-bold'>
              <span className='h-4 w-4'>B</span>
              {CustomTooltip('Bold')}
            </button>
          </li>
          <li className='w-9 aspect-square flex items-center justify-center border-r border-gray-400 hover:bg-slate-200 cursor-pointer'>
            <button type='button' className='ql-italic'>
              <span className='h-4 w-4'>I</span>
            </button>
          </li>
        </ul>
      </div>
      <div ref={editorRef} className={styles.editor__container}></div>
    </div>
  );
};

export default QuillEditor;
