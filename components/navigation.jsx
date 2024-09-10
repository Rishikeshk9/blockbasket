'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, Search, User } from 'lucide-react';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/home/notifications', icon: Bell, label: 'Notifications' },
    { href: '/home/browse', icon: Search, label: 'Browse' },
    { href: '/home/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className='  bg-background border-t border-border bg-black'>
      <div className='container mx-auto px-4'>
        <ul className='flex justify-between items-center py-2'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span
                  className={`flex flex-col items-center ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className='h-6 w-6' />
                  <span className='text-xs'>{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
