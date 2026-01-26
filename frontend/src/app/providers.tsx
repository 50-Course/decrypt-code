'use client';

import { WalletProvider } from '@/context/WalletContext';
import { VaultProvider } from '@/context/VaultContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <VaultProvider>
        {children}
      </VaultProvider>
    </WalletProvider>
  );
}
