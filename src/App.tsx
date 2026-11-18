/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { EcosystemCanvas } from './components/EcosystemCanvas';

export default function App() {
  return (
    <div className="h-screen h-[100dvh] w-screen bg-[#040914] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden">
      {/* Sleek Floating Header */}
      <Header />

      {/* Main Single-Fold Infinite Space */}
      <main className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
        {/* Subtle Top-Left Ambient Label */}
        <div className="absolute top-3 left-6 md:left-8 z-20 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
            Ecossistema Agrovendedor
          </span>
          <h1 className="text-base md:text-lg font-extrabold text-white tracking-tight leading-tight">
            Educação e Tecnologia
          </h1>
        </div>

        {/* The Edge-to-Edge Living Organism Canvas */}
        <div className="w-full h-full flex-1 relative overflow-hidden">
          <EcosystemCanvas />
        </div>
      </main>
    </div>
  );
}
