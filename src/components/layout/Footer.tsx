import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import darkIcon from '@/assets/dark-icon.png';
import iyzico from '@/assets/iyzico-.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-site py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={darkIcon} alt="Keçikoyun" className="w-8 h-8" />
              <div className="leading-none">
                <span className="font-bold text-lg text-white">Keçi</span>
                <span className="font-bold text-lg text-brand-gold">koyun</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Güvenilir kurban satışı, vekalet hizmeti ve kesim takibi. Türkiye geneli ve yurt dışı kesim imkânı.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: '#', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Facebook', href: '#', svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'YouTube', href: '#', svg: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-brand-green rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d={svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kurbanlıklar</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Küçükbaş Kurban', href: '/kucukbas' },
                { label: 'Büyükbaş Hisse', href: '/buyukbas-hisse' },
                { label: 'Adak Kurbanı', href: '/adak' },
                { label: 'Akika Kurbanı', href: '/akika' },
                { label: 'Şükür Kurbanı', href: '/sukur' },
                { label: 'Sadaka Kurbanı', href: '/sadaka' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="hover:text-brand-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Nasıl Çalışır?', href: '/nasil-calisir' },
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Sıkça Sorulan Sorular', href: '/sss' },
                { label: 'Sipariş Takibi', href: '/siparis-takibi' },
                { label: 'İletişim', href: '/iletisim' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="hover:text-brand-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+905340178867" className="hover:text-white transition-colors block">
                    0534 017 88 67
                  </a>
                  <span className="text-gray-500 text-xs">Pzt–Cmt, 09:00–18:00</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-brand-gold flex-shrink-0" />
                <a href="mailto:info@kecikoyun.com" className="hover:text-white transition-colors">
                  info@kecikoyun.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span>Muratpaşa Mahallesi Uluyol Caddesi NO:17-19 Daire:68, Istanbul, Turkey</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-site py-5 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Keçikoyun. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/teslimat-iade-sartlari" className="hover:text-gray-300 transition-colors">
              Teslimat ve İade Şartları
            </Link>
            <Link to="/gizlilik-politikasi" className="hover:text-gray-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link to="/kvkk" className="hover:text-gray-300 transition-colors">
              KVKK
            </Link>
            <Link to="/mesafeli-satis-sozlesmesi" className="hover:text-gray-300 transition-colors">
              Mesafeli Satış Sözleşmesi
            </Link>
          </div>
          <img
            src={iyzico}
            alt="iyzico ile güvenli ödeme"
            className="h-8 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}
