import { InternshipListing } from '@/features/internships/internship-listing.tsx';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import React from 'react';

const InternshipsPage = React.memo(() => {
  return (
    <div className='font-poppins flex min-h-screen flex-col'>
      <Navbar />
      <InternshipListing />
      <Footer />
    </div>
  );
});

InternshipsPage.displayName = 'InternshipsPage';

export default InternshipsPage;
