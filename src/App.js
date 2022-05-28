import React, { useState, useEffect, useMemo } from "react";
import {
  Pre,
  Navigation,
  Footer,
  Home,
  About,
  Hunt,
  Roadmap,
  Whitepaper,
} from "./components";
import GenZero from "./components/GenZero";
import Claim from "./components/Claim";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton />
          <WalletDisconnectButton /> */}
          <Router>
            <Pre load={load} />
            <div className="App" id={load ? "no-scroll" : "scroll"}>
              <Navigation />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/hunt" element={<Hunt />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/whitepaper" element={<Whitepaper />} />
                <Route path="/genZero" element={<GenZero />} />
                <Route path="/claim" element={<Claim />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
