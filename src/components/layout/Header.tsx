import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  {
    label: 'Kurbanlıklar',
    href: '/kurbanlıklar',
    children: [
      { label: 'Küçükbaş Kurban', href: '/kucukbas' },
      { label: 'Büyükbaş Hisse', href: '/buyukbas-hisse' },
      { label: 'Adak Kurbanı', href: '/adak' },
      { label: 'Akika Kurbanı', href: '/akika' },
      { label: 'Şükür Kurbanı', href: '/sukur' },
      { label: 'Sadaka Kurbanı', href: '/sadaka' },
    ],
  },
  { label: 'Nasıl Çalışır?', href: '/nasil-calisir' },
  { label: 'Sipariş Takibi', href: '/siparis-takibi' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { items, toggleCart } = useCartStore();
  const location = useLocation();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      {/* Top bar */}
      <div className="bg-brand-green text-white text-sm py-1.5">
        <div className="container-site flex items-center justify-between gap-4">
          <span className="hidden sm:block text-white/80 text-xs">
            Profesyonel kurban hizmeti — Türkiye geneli ve yurt dışı
          </span>
          <a
            href="tel:+902121234567"
            className="flex items-center gap-1.5 text-white hover:text-brand-gold-light transition-colors ml-auto"
          >
            <Phone size={13} />
            <span className="font-medium">0212 123 45 67</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-site">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-green rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="leading-none">
              <span className="font-bold text-lg text-brand-green">Keçi</span>
              <span className="font-bold text-lg text-brand-gold">koyun</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-brand-green font-medium text-sm rounded-xl hover:bg-brand-cream transition-all">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform',
                        activeDropdown === link.label && 'rotate-180'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-card-hover border border-gray-100 overflow-hidden min-w-[200px] py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-green transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-xl transition-all',
                    location.pathname === link.href
                      ? 'text-brand-green bg-brand-cream'
                      : 'text-gray-700 hover:text-brand-green hover:bg-brand-cream'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/kurbanlıklar"
              className="hidden sm:block btn-primary py-2 px-4 text-sm"
            >
              Kurbanını Seç
            </Link>

            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-brand-cream transition-colors text-gray-700 hover:text-brand-green"
              aria-label="Sepet"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-brand-cream transition-colors text-gray-700"
              aria-label="Menü"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="container-site py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-brand-cream rounded-xl transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href!}
                    className={cn(
                      'px-3 py-2.5 text-sm font-medium rounded-xl transition-all',
                      location.pathname === link.href
                        ? 'text-brand-green bg-brand-cream'
                        : 'text-gray-700 hover:text-brand-green hover:bg-brand-cream'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link to="/kurbanlıklar" className="btn-primary w-full text-center">
                  Kurbanını Seç
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
