import React from 'react';
import { Link } from 'react-router';
import { Footer } from './footer';

const PageNotFound = React.memo(() => {
  return (
    <section className='container flex h-screen flex-col justify-between overflow-x-hidden'>
      <div className='flex flex-grow items-center justify-center px-4 pt-32'>
        <div className='max-w-md text-center'>
          <h2 className='mb-4 text-[48px] font-extrabold text-blue-700 sm:text-[64px] md:text-[80px] lg:text-[96px] dark:text-white'>
            404
          </h2>

          <h4 className='mb-4 text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl dark:text-gray-300'>
            Oops! That page can't be found.
          </h4>
          <p className='mb-8 text-sm text-gray-700 sm:text-base lg:text-lg dark:text-gray-400'>
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>

          <Link
            to='/#'
            className='inline-block rounded-lg border border-blue-700 px-8 py-3 text-center text-base text-blue-700 transition hover:bg-blue-700 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
});

PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
