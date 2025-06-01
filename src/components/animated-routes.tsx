import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

import InternshipsPage from '@/pages/internships';
import Home from '@/pages/home';
import PageNotFound from './page-not-found';
import Transition from './transition';
import { AnimatePresence } from 'framer-motion';

export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Transition Component={<Home />} />} />
        <Route
          path='/internships'
          element={<Transition Component={<InternshipsPage />} />}
        />
        <Route path='*' element={<Transition Component={<PageNotFound />} />} />
      </Routes>
    </AnimatePresence>
  );
};
