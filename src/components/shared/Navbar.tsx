'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import logo from '@/assets/logo.png';
import { ChevronDown, Heart, MenuIcon, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../Search/SearchBar';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <div>
      {/* top bar */}

      <div className="flex justify-between bg-blue-900 px-5 py-2.5 text-sm text-white">
        <div>Free Shipping on Orders Over $50!</div>
        <div className="hidden gap-3 lg:flex">
          {/* {session?.user?.role === 'admin' && (
            <Link href="/admin">Admin Dashboard</Link>
          )}
          <Link href="/profile">Profile</Link>
          {session?.user?.role === 'user' && (
            <Link href="/orders">Track Order</Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="cursor-pointer rounded bg-red-600 px-5 text-white"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )} */}
          <Link href={'/shop'}>
            <span className="animate-pulse">Visit Shop Now</span>
          </Link>
        </div>
      </div>

      {/* main navbar */}
      <div className="flex items-center justify-between border border-[#ddd] bg-white px-5 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image height={300} width={300} src={logo} alt="Logo" />
          </Link>
        </div>

        <button className="block text-xl lg:hidden" onClick={toggleMenu}>
          <MenuIcon />
        </button>

        {/* searchBar */}
        <div className="hidden w-[40%] lg:block">
          <SearchBar />
        </div>

        <div>
          <div className="hidden gap-3 lg:flex">
            <div className="flex items-center justify-center gap-3">
              <Link href="/cart">
                <div className="relative hidden items-center gap-3 lg:flex">
                  <ShoppingBag />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>
              <Link
                href={`${session?.user?.role === 'user' ? '/userDashboard/wishlist' : '/cart'}`}
              >
                <div className="relative hidden items-center gap-3 lg:flex">
                  <Heart />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            {session ? (
              // <button
              //   onClick={() => signOut()}
              //   className="cursor-pointer rounded bg-red-600 px-5 text-white"
              // >
              //   Logout
              // </button>
              <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    const dropdown = document.getElementById('dropdown-menu');
                    dropdown?.classList.toggle('hidden');
                  }}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </button>
              </div>

              <div
                id="dropdown-menu"
                className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <Link href="/profile">
                    <span
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {' '}
                      Profile{' '}
                      <span className="ml-2 inline-block rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                        New
                      </span>
                    </span>
                  </Link>
                  {session?.user?.role === 'admin' && (
                    <Link href="/admin">
                      <span
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Admin Dashboard
                      </span>
                    </Link>
                  )}
                  {session?.user?.role === 'user' && (
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Link href="/orders">Track Order</Link>
                    </span>
                  )}{' '}
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </span>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {session ? (
                      <button
                        onClick={() => signOut()}
                        className="cursor-pointer rounded bg-red-600 px-5 text-white"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link href="/login">Login</Link>
                    )}
                  </span>
                </div>
              </div>
            </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
            

            {/* {session?.user?.role === 'admin' && (
              <Link href="/admin">Admin Dashboard</Link>
            )}
            <Link href="/profile">Profile</Link>
            {session?.user?.role === 'user' && (
              <Link href="/orders">Track Order</Link>
            )}

            {session ? (
              <button
                onClick={() => signOut()}
                className="cursor-pointer rounded bg-red-600 px-5 text-white"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">Login</Link>
            )} */}
          </div>
        </div>
      </div>

      {/* nav Links */}
      <nav className={`w-full text-black bg-white transition-all duration-300 ease-in-out ${isSticky ? 'fixed top-0 left-0 z-50 shadow-md bg-gray-50 ' : ''}`}>
        <ul className="flex justify-center gap-5 py-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          {/* <li>
            <Link href="/">Deals</Link>
          </li> */}
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/deals">Deal</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {/* <li>
            <Link href="/">Deals</Link>
          </li> */}
          <li>
            <Link href="/shop">
              <span className="flex items-center gap-[2px]">
                Category <ChevronDown />
              </span>
            </Link>
          </li>
          {session?.user?.role === 'user' && (
            <>
              <li>
                <Link href="/userDashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/userDashboard/orders">Orders</Link>
              </li>
            </>
          )}
          {session?.user?.role === 'admin' && (
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* mbl Menu */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 transition-transform lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 h-full w-64 transform bg-white p-5 text-blue-900 transition-transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-3/4'
          }`}
        >
          <button onClick={toggleMenu} className="mb-5 text-xl">
            <X />
          </button>

          {/* mbl search */}
          <div className="mb-4">
            <SearchBar />
          </div>

          <ul className="space-y-3">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            {/* <li>
              <Link href="/">Deals</Link>
            </li> */}
            <li>
              <Link href="/about">About</Link>
            </li>
            {session?.user?.role === 'admin' && (
              <li>
                <Link href="/admin">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/cart">Cart ({totalQuantity})</Link>
            </li>
            <li>
              <Link href="/orders">Track Order</Link>
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="rounded bg-red-600 px-5 text-white"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
