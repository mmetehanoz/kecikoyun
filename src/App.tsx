import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const KucukbasPage = lazy(() => import('@/pages/KucukbasPage'));
const BuyukbasPage = lazy(() => import('@/pages/BuyukbasPage'));
const AdakPage = lazy(() => import('@/pages/AdakPage'));
const AkikaPage = lazy(() => import('@/pages/AkikaPage'));
const SukurPage = lazy(() => import('@/pages/SukurPage'));
const SadakaPage = lazy(() => import('@/pages/SadakaPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const TeslimatIadePage = lazy(() => import('@/pages/TeslimatIadePage'));
const GizlilikPage = lazy(() => import('@/pages/GizlilikPage'));
const KVKKPage = lazy(() => import('@/pages/KVKKPage'));
const MesafeliSatisPage = lazy(() => import('@/pages/MesafeliSatisPage'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-3 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kurbanlıklar" element={<ProductsPage />} />
              <Route path="/kucukbas" element={<KucukbasPage />} />
              <Route path="/buyukbas-hisse" element={<BuyukbasPage />} />
              <Route path="/adak" element={<AdakPage />} />
              <Route path="/akika" element={<AkikaPage />} />
              <Route path="/sukur" element={<SukurPage />} />
              <Route path="/sadaka" element={<SadakaPage />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/odeme" element={<CheckoutPage />} />
              <Route path="/siparis-takibi" element={<OrderTrackingPage />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="/nasil-calisir" element={<HowItWorksPage />} />
              <Route path="/sss" element={<FAQPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/teslimat-iade-sartlari" element={<TeslimatIadePage />} />
              <Route path="/gizlilik-politikasi" element={<GizlilikPage />} />
              <Route path="/kvkk" element={<KVKKPage />} />
              <Route path="/mesafeli-satis-sozlesmesi" element={<MesafeliSatisPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
