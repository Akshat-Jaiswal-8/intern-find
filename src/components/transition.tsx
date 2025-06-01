import React from 'react';
import type { JSX } from 'react';

import { AnimatePresence, motion } from 'motion/react';

const Transition = React.memo(({ Component }: { Component: JSX.Element }) => {
  return (
    <div>
      <AnimatePresence mode='popLayout'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'backIn' }}
        >
          {Component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

Transition.displayName = 'Transition';

export default Transition;
