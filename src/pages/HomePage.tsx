import HeroSection from '@/components/home/HeroSection';
import BankInfoHighlight from '@/components/home/BankInfoHighlight';
import QuickCategoryCards from '@/components/home/QuickCategoryCards';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQPreview from '@/components/home/FAQPreview';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BankInfoHighlight />
      <QuickCategoryCards />
      <HowItWorksSection />
      <TrustSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </>
  );
}
