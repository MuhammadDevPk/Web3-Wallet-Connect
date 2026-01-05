# Web3 Wallet Connect

A Next.js dApp starter template with wallet connection functionality using **ConnectKit**, **Wagmi**, and **Viem**.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css)

## Features

- 🔗 **Multi-wallet support** - MetaMask, WalletConnect, Coinbase Wallet, and more
- ⛓️ **Multi-chain ready** - Ethereum, Polygon, Avalanche configured out of the box
- 🎨 **Beautiful UI** - Pre-styled connect button with dark mode support
- ⚡ **Fast & optimized** - Built with Next.js 14 and React Query for caching
- 🔒 **Type-safe** - Full TypeScript support

## Tech Stack

| Package                                         | Version | Purpose                     |
| ----------------------------------------------- | ------- | --------------------------- |
| [Next.js](https://nextjs.org/)                  | 14.2    | React framework             |
| [ConnectKit](https://docs.family.co/connectkit) | 1.9     | Wallet connection UI        |
| [Wagmi](https://wagmi.sh/)                      | 2.19    | React hooks for Ethereum    |
| [Viem](https://viem.sh/)                        | 2.43    | TypeScript Ethereum library |
| [React Query](https://tanstack.com/query)       | 5.90    | Data fetching & caching     |

## Project Structure

```
web3-wallet-connect/
├── app/
│   ├── components/
│   │   └── Web3Provider.tsx   # Wallet provider setup (Wagmi + ConnectKit)
│   ├── plugins/
│   │   └── ConnectKit.tsx     # Custom wallet hooks
│   ├── layout.tsx             # Root layout with Web3Provider
│   ├── page.tsx               # Home page with wallet status
│   └── globals.css            # Global styles
├── next.config.mjs            # Next.js configuration
└── package.json
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

> Get a free project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dApp.

## How It Works

### Architecture

```
┌─────────────────────────────────────────────┐
│               layout.tsx                    │
│  ┌───────────────────────────────────────┐  │
│  │           Web3Provider                │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │       WagmiProvider             │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │   QueryClientProvider     │  │  │  │
│  │  │  │  ┌─────────────────────┐  │  │  │  │
│  │  │  │  │  ConnectKitProvider │  │  │  │  │
│  │  │  │  │  ┌───────────────┐  │  │  │  │  │
│  │  │  │  │  │   Your App    │  │  │  │  │  │
│  │  │  │  │  └───────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Key Components

#### `Web3Provider.tsx`

Sets up the wallet connection infrastructure:

```tsx
export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <ConnectKitButton />
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```

#### `useWalletStatus` Hook

Custom hook to get wallet connection status:

```tsx
import { useAccount } from "wagmi";

export function useWalletStatus() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return "Connecting...";
  if (isDisconnected) return "Disconnected";
  return `Connected Wallet: ${address}`;
}
```

## Supported Chains

The app is pre-configured for:

- **Ethereum Mainnet** (chainId: 1)
- **Polygon** (chainId: 137)
- **Avalanche** (chainId: 43114)

To add more chains, update `Web3Provider.tsx`:

```tsx
import { mainnet, polygon, avalanche, arbitrum } from "wagmi/chains";

// Add to chains array
chains: [mainnet, polygon, avalanche, arbitrum],
```

## Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Adding More Features

### Get wallet balance

```tsx
import { useBalance } from "wagmi";

function WalletBalance() {
  const { data } = useBalance({ address: "0x..." });
  return (
    <p>
      Balance: {data?.formatted} {data?.symbol}
    </p>
  );
}
```

### Send transaction

```tsx
import { useSendTransaction } from "wagmi";

function SendETH() {
  const { sendTransaction } = useSendTransaction();

  return (
    <button
      onClick={() =>
        sendTransaction({
          to: "0x...",
          value: parseEther("0.01"),
        })
      }
    >
      Send 0.01 ETH
    </button>
  );
}
```

## Resources

- [ConnectKit Docs](https://docs.family.co/connectkit)
- [Wagmi Docs](https://wagmi.sh/)
- [Viem Docs](https://viem.sh/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)

## License

MIT
