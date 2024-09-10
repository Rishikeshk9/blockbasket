'use client';

import React from 'react';
import ManagePortfolio from '@/components/rebalance-performance';
import { useSearchParams } from 'next/navigation';

// Mock data for demonstration
const mockSmallcases = [
  {
    id: 1,
    name: 'Tech Giants',
    performance: 15.2,
    subscribers: 1200,
    needsRebalance: false,
    allocation: { AAPL: 30, GOOGL: 30, MSFT: 40 },
  },
  {
    id: 2,
    name: 'Green Energy',
    performance: 8.7,
    subscribers: 800,
    needsRebalance: true,
    allocation: { TSLA: 40, ENPH: 30, SEDG: 30 },
  },
];

const Manage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // In a real application, you would fetch the specific smallcase data based on the id
  // For now, we'll just filter our mock data
  const selectedSmallcase = mockSmallcases.find((sc) => sc.id === Number(id));

  if (!selectedSmallcase) {
    return <div>No smallcase found with the given ID.</div>;
  }

  return (
    <ManagePortfolio userRole='creator' smallcases={[selectedSmallcase]} />
  );
};

export default Manage;
