'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GraduationCap, BarChart3, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Exams',
    href: '/exams',
    icon: GraduationCap,
  },
  {
    name: 'Results',
    href: '/exams/results',
    icon: BarChart3,
  },
];
type Notification = {
  id: string;
  message: string;
  seenBy?: { id: string }[]; // Adjust to your actual user relationship shape
};
type usertype = {
  id: string;
  name: string;};
export function Navbar() {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser, setCurrentUser] = useState<usertype | null>(null);
  const [hasUnseen, setHasUnseen] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        setCurrentUser(data?.user || null);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
  
    async function fetchNotifications() {
      try {
        const res = await fetch('/api/notifications?limit=5', {
          credentials: 'include',
        });
  
        const data = await res.json();
        setNotifications(data.docs || []);
  
        // Check if user has not seen any of the notifications
        const unseen = data.docs.some((notif: Notification) =>
          !(notif.seenBy || []).some((user) => user.id === currentUser?.id)
        );
  
        setHasUnseen(unseen);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    }
    fetchNotifications();
  }, [currentUser]);

  const handleDropdownOpen = async () => {
    //console.log('clicked')
    if (!currentUser) return;
  
    try {
      await fetch('/api/notifications/mark-seen', {
        method: 'POST',
        credentials: 'include',
      });
      setHasUnseen(false);
    } catch (err) {
      console.error('Failed to mark notifications as seen:', err);
    }
  };
  
  const handleLogout = async () => {
    try {
      const req = await fetch('/api/users/logout', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      // Redirect to home page on successful logout
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm transition-all md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
      {/* Mobile Hamburger Menu - shown only on mobile */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {navItems.map((item) => (
              <DropdownMenuItem asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logo (ExamAspire) */}
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold"
      >
        <GraduationCap className="h-6 w-6" />
        <span className="hidden md:inline-block">ExamAspire</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex md:items-center md:gap-4 md:pl-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>


      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu onOpenChange={(open) => {
        if (open) {
          handleDropdownOpen(); // Call your mark-as-seen logic here
        }
      }}>
        <DropdownMenuTrigger asChild>
        <button className="relative h-6 w-6">
        <Bell className="h-5 w-5" />
        {hasUnseen && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
        )}
      </button>

        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {notifications.length > 0 ? (
      notifications.map((notif) => (
        <DropdownMenuItem key={notif.id}>
          📢 {notif.message}
        </DropdownMenuItem>
      ))
    ) : (
      <DropdownMenuItem className="text-muted-foreground text-sm">
        No new notifications
      </DropdownMenuItem>
    )}
  </DropdownMenuContent>
</DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
