import React from 'react';

export const useOutsideClick = <T>(callback: any) => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !(ref.current as any).contains(event.target))
        callback();
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
