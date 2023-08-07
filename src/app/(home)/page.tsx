import type { Metadata } from 'next';

import OverviewSection from './components/OverView/Overview';
import HomeHeader from './components/HomeHeader/HomeHeader';
import FeatureSection from './components/FeatureSection/FeatureSection';
import FeatureDescription from './components/FeatureDescription/FeatureDescription';
import IntegrationDescription from './components/IntegrationDescription/IntegrationDescription';
import CustomerReview from './components/CustomerReview/CustomerReview';
import FormSection from './components/FormSection/FormSection';
import HomeFooter from './components/HomeFooter/HomeFooter';

export const metadata: Metadata = {
  title: 'Hirelight',
};

export default function Home() {
  return (
    <div className='w-full flex flex-col gap-20'>
      <HomeHeader />
      <OverviewSection />
      <FeatureSection />
      <div className='flex flex-col gap-20 relative'>
        <div className='hidden md:block w-full h-28 absolute -top-36 z-30 bg-gradient-to-b from-[#F2F7FE] to-white'></div>
        <FeatureDescription />
        <IntegrationDescription />
        <CustomerReview />
        <FormSection />
        <HomeFooter />
      </div>
    </div>
  );
}
