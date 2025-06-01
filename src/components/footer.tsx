import React from 'react';

export const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex h-[var(--footer-height)] items-center justify-center border-t border-dotted border-slate-800'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center'>
          <p className='text-center text-sm tracking-wide text-gray-600'>
            {' '}
            &copy; {currentYear} InternFind. All rights reserved. Powered by
            Internshala API.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
