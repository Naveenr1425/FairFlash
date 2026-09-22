import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUiStore } from '@/store/uiStore';
import {
  Search,
  MapPin,
  Ticket,
  ShoppingBag,
  Settings,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { LocationModal } from './LocationModal';
import { SearchOverlay } from './SearchOverlay';
import { cn } from '@/utils/cn';

export const Header: React.FC = () => {
  const { selectedCity, setSearchOpen, setLocationModalOpen } = useUiStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Concerts', path: '/events?category=Concerts' },
    { label: 'Sports', path: '/events?category=Sports' },
    { label: 'Movies', path: '/events?category=Movies' },
    { label: 'Comedy', path: '/events?category=Comedy' },
    { label: 'Theatre', path: '/events?category=Theatre' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-charcoal-200/80 shadow-subtle backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-600 transition-colors">
                <Ticket className="w-5 h-5 sm:w-5.5 sm:h-5.5 -rotate-12" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-charcoal-900">
                    Fair<span className="text-brand-500">Flash</span>
                  </span>
                </div>
                <span className="text-[10px] text-charcoal-400 font-medium hidden sm:block -mt-1 tracking-tight">
                  Fair access. Reliable booking.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-charcoal-700">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={cn(
                    'hover:text-brand-500 transition-colors py-1',
                    location.search.includes(link.label) && 'text-brand-500 font-semibold border-b-2 border-brand-500'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Trigger Bar (Desktop) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-3 bg-surface-secondary hover:bg-charcoal-200/60 border border-charcoal-200 text-charcoal-400 rounded-full px-4 py-2 text-xs sm:text-sm max-w-xs lg:max-w-sm w-full transition-all"
              aria-label="Search events, movies, concerts"
            >
              <Search className="w-4 h-4 text-charcoal-500 shrink-0" />
              <span className="truncate text-charcoal-500">Search events, concerts, sports...</span>
              <kbd className="hidden lg:inline-block ml-auto bg-white border border-charcoal-200 text-[10px] font-semibold text-charcoal-400 px-1.5 py-0.5 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Right Actions: City Switcher & User Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-charcoal-700 hover:bg-surface-secondary"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* City Selector Button */}
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-surface-secondary hover:bg-charcoal-200/70 border border-charcoal-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full transition-colors"
                aria-label={`Current city: ${selectedCity}. Click to change location.`}
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500 shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-[110px]">{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-charcoal-400" />
              </button>

              {/* Quick Links: My Tickets & Orders (Desktop) */}
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  to="/tickets"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-charcoal-700 hover:text-brand-500 hover:bg-surface-secondary transition-colors',
                    location.pathname === '/tickets' && 'text-brand-500 font-semibold bg-brand-50'
                  )}
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Tickets</span>
                </Link>

                <Link
                  to="/orders"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-charcoal-700 hover:text-brand-500 hover:bg-surface-secondary transition-colors',
                    location.pathname === '/orders' && 'text-brand-500 font-semibold bg-brand-50'
                  )}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg text-charcoal-700 hover:bg-surface-secondary"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-charcoal-200 bg-white px-4 py-4 animate-fade-in shadow-card">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider px-2 py-1">
                Categories
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-800 hover:bg-surface-secondary flex items-center justify-between"
                >
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="border-t border-charcoal-100 my-2" />

              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider px-2 py-1">
                My Account
              </span>
              <Link
                to="/tickets"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal-800 hover:bg-surface-secondary"
              >
                <Ticket className="w-4 h-4 text-brand-500" />
                <span>My Tickets (Wallet)</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal-800 hover:bg-surface-secondary"
              >
                <ShoppingBag className="w-4 h-4 text-brand-500" />
                <span>Order History</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal-800 hover:bg-surface-secondary"
              >
                <Settings className="w-4 h-4 text-charcoal-500" />
                <span>Preferences & Settings</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <LocationModal />
      <SearchOverlay />
    </>
  );
};
