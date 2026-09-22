import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShieldCheck, Zap, RefreshCw, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-secondary border-t border-charcoal-200 mt-auto">
      {/* Value Proposition Highlights */}
      <div className="border-b border-charcoal-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">100% Genuine Tickets</h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                  Direct official allocations with barcoded digital passes. Guaranteed authentic gate entry.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">Fair Flash Queue</h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                  Anti-bot waiting rooms protect high-demand sales, giving real fans equal first-come opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">Transparent & Reliable</h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                  No hidden markup, instant digital ticket delivery, and hassle-free automated booking support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Ticket className="w-4 h-4 -rotate-12" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-charcoal-900">
                Fair<span className="text-brand-500">Flash</span>
              </span>
            </Link>
            <p className="text-xs text-charcoal-500 leading-relaxed mb-4 max-w-xs">
              Fair access. Reliable booking. Connecting fans with concerts, stadium matches, cinema premieres, and live shows.
            </p>
            <span className="text-[11px] text-charcoal-400">
              © {new Date().getFullYear()} FairFlash Technologies Inc.
            </span>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-3.5">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600 font-medium">
              <li>
                <Link to="/events?category=Concerts" className="hover:text-brand-500 transition-colors">
                  Music Concerts
                </Link>
              </li>
              <li>
                <Link to="/events?category=Sports" className="hover:text-brand-500 transition-colors">
                  Cricket & Stadium Sports
                </Link>
              </li>
              <li>
                <Link to="/events?category=Movies" className="hover:text-brand-500 transition-colors">
                  IMAX & Cinema Premieres
                </Link>
              </li>
              <li>
                <Link to="/events?category=Comedy" className="hover:text-brand-500 transition-colors">
                  Stand-up Comedy Specials
                </Link>
              </li>
              <li>
                <Link to="/events?category=Theatre" className="hover:text-brand-500 transition-colors">
                  Musicals & Broadway Plays
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-3.5">
              My Account
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600 font-medium">
              <li>
                <Link to="/tickets" className="hover:text-brand-500 transition-colors">
                  My Tickets (Digital Passes)
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-brand-500 transition-colors">
                  Order Invoices & Receipts
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-brand-500 transition-colors">
                  Notification Settings
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-brand-500 transition-colors">
                  Terms & Fair Queue FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Metro Cities */}
          <div>
            <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-3.5">
              Top Cities
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600 font-medium">
              <li>
                <Link to="/events?city=Chennai" className="hover:text-brand-500 transition-colors">
                  Events in Chennai
                </Link>
              </li>
              <li>
                <Link to="/events?city=Mumbai" className="hover:text-brand-500 transition-colors">
                  Events in Mumbai
                </Link>
              </li>
              <li>
                <Link to="/events?city=Bengaluru" className="hover:text-brand-500 transition-colors">
                  Events in Bengaluru
                </Link>
              </li>
              <li>
                <Link to="/events?city=Delhi+NCR" className="hover:text-brand-500 transition-colors">
                  Events in Delhi NCR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-charcoal-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-3">
          <p>Designed for authentic consumer ticketing with fair access & transparent checkout.</p>
          <div className="flex items-center gap-1 text-charcoal-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            <span>for fans across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
