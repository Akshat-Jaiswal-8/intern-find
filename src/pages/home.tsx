import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/features/home/hero';
import React from 'react';

const HomePage = React.memo(() => {
  return (
    <div className='font-cal-sans flex min-h-screen flex-col'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
