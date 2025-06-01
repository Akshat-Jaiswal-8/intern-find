import React from 'react';
import { NavLink } from 'react-router';
import { ModeToggle } from './mode-toggle';
import { TrendingUp } from 'lucide-react';

export const Navbar = React.memo(() => {
  return (
    <nav
      className={
        'font-poppins flex h-[var(--nav-height)] flex-col items-center justify-center border-b border-dotted border-slate-800'
      }
    >
      <div className={'container flex items-center justify-between gap-x-4'}>
        <NavLink to={'/'} className={'flex items-center gap-x-2'}>
          <TrendingUp />
          <p
            className={
              'font-poppins hidden bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text font-semibold text-transparent md:block md:text-xl dark:text-slate-200'
            }
          >
            Intern Find
          </p>
        </NavLink>

        <div className='flex items-center gap-4'>
          <NavLink
            to='/internships'
            className={({ isActive }) =>
              `rounded-md px-4 py-2 font-medium transition-colors ${
                isActive
                  ? 'bg-blue-200 text-blue-700'
                  : 'hover:bg-blue-100 hover:text-blue-700'
              }`
            }
          >
            Browse Internships
          </NavLink>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
