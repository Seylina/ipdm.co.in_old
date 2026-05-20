import React, { useState } from 'react';
import { AstraOverview } from './AstraOverview';
import { IPDMAstra } from './IPDMAstra';

export function AstraPage({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'overview' | 'chat'>('overview');

  if (view === 'chat') {
    return <IPDMAstra onBack={() => setView('overview')} />;
  }

  return <AstraOverview onBack={onBack} onLaunch={() => setView('chat')} />;
}
