
import Banner from '@/components/Banner';
import CategoriesPage from '@/components/Categories';
import HowItWorks from '@/components/HowItWorks';
import NewArrivals from '@/components/NewArrivels';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <main className='bg-[#E8E3D9]'>
      <Suspense fallback={<div className="h-[420px] animate-pulse bg-[#422B1F]" />}>
        <Banner />
      </Suspense>
      <NewArrivals/>
      <CategoriesPage/>
      <HowItWorks/>
    </main>
  );
};

export default page;
