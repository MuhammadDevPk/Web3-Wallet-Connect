"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, avalanche } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({ 
    // Your dApps chains
    chains: [mainnet, polygon, avalanche],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        'https://lb.nodies.app/v1/8cd354ce-9e5c-4428-8051-9bc892e3cc5e',
        // or
        // `https://ethereum-public.nodies.app`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }:{children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};