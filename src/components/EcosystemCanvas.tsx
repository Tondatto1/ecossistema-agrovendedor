import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Bot,
  Target,
  Award,
  GraduationCap,
  UserCheck,
  Sparkles,
  RotateCcw,
  ArrowUpRight,
  Crown,
} from 'lucide-react';
import { DeliveryItem } from '../types/ecosystem';
import { DELIVERIES_DATA } from '../data/ecosystemData';

interface NodePosition {
  x: number;
  y: number;
}

interface AmbientParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export const EcosystemCanvas: React.FC = () => {
  // Infinite canvas pan & zoom
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  // Auto-fit scale to guarantee 100% visibility in 1 single fold on any monitor
  const [viewportScale, setViewportScale] = useState<number>(1);

  useEffect(() => {
    const updateScale = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      const scaleH = (h - 60) / 580;
      const scaleW = w / 920;
      const autoScale = Math.min(1, Math.min(scaleH, scaleW));
      setViewportScale(Math.max(0.75, autoScale));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Node positions map
  const [positions, setPositions] = useState<Record<string, NodePosition>>(() => {
    const initial: Record<string, NodePosition> = {};
    DELIVERIES_DATA.forEach((item) => {
      initial[item.id] = { ...item.orbitPosition };
    });
    return initial;
  });

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeDraggingId, setActiveDraggingId] = useState<string | null>(null);

  // Dragging states with instant responsiveness
  const draggingNodeRef = useRef<string | null>(null);
  const dragStartPosRef = useRef<{ clientX: number; clientY: number; initialNodeX: number; initialNodeY: number }>({
    clientX: 0,
    clientY: 0,
    initialNodeX: 0,
    initialNodeY: 0,
  });
  const hasMovedRef = useRef<boolean>(false);

  // Canvas background panning state
  const isPanningRef = useRef<boolean>(false);
  const panStartRef = useRef<{ clientX: number; clientY: number; initialPanX: number; initialPanY: number }>({
    clientX: 0,
    clientY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });

  // Living breathing organic levitation offsets
  const [organicOffsets, setOrganicOffsets] = useState<Record<string, { ox: number; oy: number }>>(() => {
    const map: Record<string, { ox: number; oy: number }> = {};
    DELIVERIES_DATA.forEach((item) => {
      map[item.id] = { ox: 0, oy: 0 };
    });
    return map;
  });

  // Ambient floating dust particles in dark space
  const ambientParticles = useMemo<AmbientParticle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.sin(i * 137.5) * 850,
      y: Math.cos(i * 137.5) * 600,
      size: 1.2 + (i % 3) * 1.2,
      opacity: 0.25 + (i % 4) * 0.15,
      color: i % 2 === 0 ? '#38bdf8' : '#34d399',
    }));
  }, []);

  // Frame loop for living breathing oscillation
  useEffect(() => {
    let frameId: number;
    const startTime = performance.now();

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const newOffsets: Record<string, { ox: number; oy: number }> = {};

      DELIVERIES_DATA.forEach((item, index) => {
        // Skip organic offset on node currently being dragged for 100% fluid drag
        if (draggingNodeRef.current === item.id) {
          newOffsets[item.id] = { ox: 0, oy: 0 };
          return;
        }
        const phase = index * 1.4;
        const ox = Math.sin(elapsed * 0.8 + phase) * 6;
        const oy = Math.cos(elapsed * 1.0 + phase) * 7.5;
        newOffsets[item.id] = { ox, oy };
      });

      setOrganicOffsets(newOffsets);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Ultra-fluid Node Drag handlers (Zero latency, direct coordinate calculation)
  const handleNodePointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLElement;
    currentTarget.setPointerCapture(e.pointerId);

    draggingNodeRef.current = id;
    setActiveDraggingId(id);
    hasMovedRef.current = false;

    const currentPos = positions[id] || { x: 0, y: 0 };
    dragStartPosRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initialNodeX: currentPos.x,
      initialNodeY: currentPos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // 1. Dragging a node (1:1 instant tracking, no lag)
    if (draggingNodeRef.current) {
      const id = draggingNodeRef.current;
      const currentScale = zoom * viewportScale;
      const dx = (e.clientX - dragStartPosRef.current.clientX) / currentScale;
      const dy = (e.clientY - dragStartPosRef.current.clientY) / currentScale;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        hasMovedRef.current = true;
      }

      setPositions((prev) => ({
        ...prev,
        [id]: {
          x: dragStartPosRef.current.initialNodeX + dx,
          y: dragStartPosRef.current.initialNodeY + dy,
        },
      }));
      return;
    }

    // 2. Panning the canvas
    if (isPanningRef.current) {
      const dx = e.clientX - panStartRef.current.clientX;
      const dy = e.clientY - panStartRef.current.clientY;
      setPan({
        x: panStartRef.current.initialPanX + dx,
        y: panStartRef.current.initialPanY + dy,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingNodeRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
      draggingNodeRef.current = null;
      setActiveDraggingId(null);
    }
    if (isPanningRef.current) {
      isPanningRef.current = false;
    }
  };

  // Background pan handler
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.ecosystem-interactive-item')) return;
    isPanningRef.current = true;
    panStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y,
    };
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.05 : -0.05;
    setZoom((prev) => Math.min(1.5, Math.max(0.7, prev + zoomFactor)));
  };

  const handleResetOrbit = useCallback(() => {
    setPositions(() => {
      const reset: Record<string, NodePosition> = {};
      DELIVERIES_DATA.forEach((item) => {
        reset[item.id] = { ...item.orbitPosition };
      });
      return reset;
    });
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const getIcon = (name: string, className = 'w-6 h-6') => {
    switch (name) {
      case 'Bot':
        return <Bot className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'UserCheck':
        return <UserCheck className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none touch-none"
      style={{
        background: 'radial-gradient(130% 115% at 50% 15%, #0b1a34 0%, #071224 45%, #040914 80%, #02050b 100%)',
      }}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Dark Luxury Atmospheric Gradients & Glow Centers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky / Cyan luminous glow */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(14,165,233,0.16)_0%,rgba(2,132,199,0.05)_45%,transparent_70%)] blur-3xl" />
        {/* Emerald luminous glow */}
        <div className="absolute right-1/4 bottom-1/4 translate-x-1/4 translate-y-1/4 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(5,150,105,0.04)_45%,transparent_70%)] blur-3xl" />
        {/* Core central atmospheric illumination */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(14,165,233,0.09)_0%,rgba(16,185,129,0.05)_40%,transparent_75%)] blur-2xl" />

        {/* Delicate dark coordinates matrix */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.35) 1.2px, transparent 0)`,
            backgroundSize: '44px 44px',
            transform: `translate(${pan.x % 44}px, ${pan.y % 44}px)`,
          }}
        />
      </div>

      {/* Floating Recenter Indicator */}
      {(pan.x !== 0 || pan.y !== 0 || zoom !== 1) && (
        <div className="absolute top-3 right-6 z-30 pointer-events-auto">
          <button
            onClick={handleResetOrbit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c1a30]/90 backdrop-blur-md border border-slate-700/80 shadow-xs text-[11px] font-semibold text-slate-200 hover:text-emerald-400 hover:border-emerald-500/60 transition-all cursor-pointer"
            title="Recentralizar espaço do ecossistema"
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Recentralizar</span>
          </button>
        </div>
      )}

      {/* Infinite Space Coordinate Engine */}
      <div
        className="absolute left-1/2 top-1/2 w-0 h-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom * viewportScale})`,
        }}
      >
        {/* 1. Ambient Celestial Sparkles (Low z-index: 2) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {ambientParticles.map((pt) => (
            <div
              key={pt.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                backgroundColor: pt.color,
                opacity: pt.opacity,
                boxShadow: `0 0 6px ${pt.color}`,
              }}
            />
          ))}
        </div>

        {/* 2. SVG Canvas for Ultra-Fine Energy Filaments (z-index: 5, strictly under nodes) */}
        <svg
          className="absolute -left-[1400px] -top-[1400px] w-[2800px] h-[2800px] pointer-events-none overflow-visible"
          style={{ zIndex: 5 }}
        >
          <defs>
            <filter id="fine-beam-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Fine Gradient Filaments for Dark Mode */}
            <linearGradient id="dark-fine-cable-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="dark-fine-cable-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="dark-fine-cable-halo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="flagship-cable-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="flagship-cable-halo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.38" />
            </linearGradient>
          </defs>

          {/* Ultra-Fine Continuous Connectors */}
          {DELIVERIES_DATA.map((item) => {
            const pos = positions[item.id] || { x: 0, y: 0 };
            const off = organicOffsets[item.id] || { ox: 0, oy: 0 };
            const isBeingDragged = activeDraggingId === item.id;
            const nodeX = 1400 + pos.x + (isBeingDragged ? 0 : off.ox);
            const nodeY = 1400 + pos.y + (isBeingDragged ? 0 : off.oy);
            const coreX = 1400;
            const coreY = 1400;

            const dx = nodeX - coreX;
            const dy = nodeY - coreY;
            const curvature = 0.22;
            const cp1X = coreX + dx * 0.3 - dy * curvature;
            const cp1Y = coreY + dy * 0.3 + dx * curvature;
            const cp2X = nodeX - dx * 0.3 - dy * curvature;
            const cp2Y = nodeY - dy * 0.3 + dx * curvature;

            const pathString = `M ${coreX} ${coreY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nodeX} ${nodeY}`;
            const isHovered = hoveredNodeId === item.id || isBeingDragged;
            const isFlagship = Boolean(item.isFlagship);

            return (
              <g key={`cable-${item.id}`}>
                {/* 1. Subtle soft halo */}
                <path
                  d={pathString}
                  fill="none"
                  stroke={isFlagship ? 'url(#flagship-cable-halo)' : 'url(#dark-fine-cable-halo)'}
                  strokeWidth={isFlagship ? (isHovered ? 6 : 4) : isHovered ? 4.5 : 2.5}
                  strokeLinecap="round"
                  filter="url(#fine-beam-glow)"
                />

                {/* 2. Ultra-fine laser filament */}
                <path
                  d={pathString}
                  fill="none"
                  stroke={
                    isFlagship
                      ? 'url(#flagship-cable-gradient)'
                      : isHovered
                        ? 'url(#dark-fine-cable-active)'
                        : 'url(#dark-fine-cable-gradient)'
                  }
                  strokeWidth={isFlagship ? (isHovered ? 2.4 : 1.9) : isHovered ? 1.8 : 1.2}
                  strokeLinecap="round"
                />

                {/* 3. Primary Flowing Energy Photon */}
                <circle
                  r={isFlagship ? (isHovered ? 4.4 : 3.5) : isHovered ? 3.8 : 2.5}
                  fill={isFlagship ? '#fbbf24' : isHovered ? '#34d399' : '#38bdf8'}
                  filter="url(#fine-beam-glow)"
                >
                  <animateMotion
                    path={pathString}
                    dur={`${(isFlagship ? 1.9 : 2.4) + (DELIVERIES_DATA.indexOf(item) % 3) * 0.35}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 4. Secondary Trailing Photon */}
                <circle
                  r={isFlagship ? (isHovered ? 3.2 : 2.4) : isHovered ? 2.6 : 1.8}
                  fill={isFlagship ? '#34d399' : isHovered ? '#38bdf8' : '#34d399'}
                  opacity={0.85}
                  filter="url(#fine-beam-glow)"
                >
                  <animateMotion
                    path={pathString}
                    dur={`${(isFlagship ? 1.9 : 2.4) + (DELIVERIES_DATA.indexOf(item) % 3) * 0.35}s`}
                    begin="1.0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* 3. Central Core: Ecossistema Agrovendedor Hub (Pure visual anchor, non-clickable) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{ zIndex: 15 }}
        >
          {/* Luminous Pulsing Ripple Waves (Contained at z-10 inside core container, strictly under cards) */}
          <div className="absolute -inset-10 rounded-full border border-sky-400/40 animate-ripple-1 pointer-events-none" />
          <div className="absolute -inset-10 rounded-full border border-emerald-400/35 animate-ripple-2 pointer-events-none" />
          <div className="absolute -inset-10 rounded-full border border-sky-400/30 animate-ripple-3 pointer-events-none" />

          {/* Ultra-Fine Concentric Orbital Rings */}
          <div className="absolute -inset-14 rounded-full border border-sky-400/30 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-8 rounded-full border border-emerald-400/35 animate-spin-reverse-slow pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
          </div>

          {/* Ambient Core Aura */}
          <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-sky-500/25 via-emerald-500/25 to-sky-400/25 blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Central Glass Disc Surface (Midnight Sapphire Luxury Disc) */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-b from-[#0c1b33] via-[#081326] to-[#040a17] border-2 border-sky-400/50 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center backdrop-blur-2xl">
            {/* Delicate inner hairline ring */}
            <div className="absolute inset-2 rounded-full border border-emerald-400/30" />

            <span className="text-[10px] font-extrabold tracking-[0.28em] text-sky-400 uppercase">
              Ecossistema
            </span>
            <span className="text-xl font-black tracking-tight text-white my-0.5 group-hover:text-emerald-300 transition-all">
              AGROVENDEDOR
            </span>

            {/* Glowing divider line */}
            <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent my-1" />

            {/* Subheadline: Educação e Tecnologia */}
            <span className="text-xs text-emerald-400 font-bold tracking-tight max-w-[130px] leading-tight">
              Educação e Tecnologia
            </span>
          </div>
        </div>

        {/* 4. THE 5 DELIVERY CARDS: THE PROTAGONISTS / DESTAQUE (Rendered AFTER core in DOM, z-index 40/45/50/60) */}
        {DELIVERIES_DATA.map((item) => {
          const pos = positions[item.id] || { x: 0, y: 0 };
          const off = organicOffsets[item.id] || { ox: 0, oy: 0 };
          const isBeingDragged = activeDraggingId === item.id;
          const currentX = pos.x + (isBeingDragged ? 0 : off.ox);
          const currentY = pos.y + (isBeingDragged ? 0 : off.oy);
          const isHovered = hoveredNodeId === item.id;
          const isFlagship = Boolean(item.isFlagship);

          // Determine prominent high z-index: Always sitting ON TOP of ripple waves and central core
          const zIndexValue = isBeingDragged ? 60 : isHovered ? 55 : isFlagship ? 45 : 40;
          const scaleValue = isFlagship
            ? isHovered || isBeingDragged
              ? 1.09
              : 1.04
            : isHovered || isBeingDragged
              ? 1.05
              : 1;

          return (
            <div
              key={item.id}
              className={`ecosystem-interactive-item absolute -translate-x-1/2 -translate-y-1/2 select-none touch-none ${
                isBeingDragged
                  ? 'cursor-grabbing transition-none'
                  : 'cursor-grab transition-transform duration-150'
              }`}
              style={{
                transform: `translate(${currentX}px, ${currentY}px) scale(${scaleValue})`,
                zIndex: zIndexValue,
              }}
              onPointerDown={(e) => handleNodePointerDown(item.id, e)}
              onMouseEnter={() => setHoveredNodeId(item.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              {/* Outer Luminous Highlight Halo */}
              <div
                className={`absolute rounded-2xl blur-xl transition-opacity duration-200 pointer-events-none ${
                  isFlagship
                    ? `-inset-3.5 bg-gradient-to-r from-amber-400/35 via-emerald-400/45 to-amber-400/35 ${
                        isHovered || isBeingDragged ? 'opacity-100' : 'opacity-75 animate-pulse-glow'
                      }`
                    : `-inset-2.5 bg-gradient-to-r from-sky-400/40 via-emerald-400/40 to-sky-400/40 ${
                        isHovered || isBeingDragged ? 'opacity-100' : 'opacity-0'
                      }`
                }`}
              />

              {/* Flagship Floating Ribbon Badge */}
              {isFlagship && (
                <div className="absolute -top-3.5 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-[#05101a] text-[10px] font-black uppercase tracking-[0.14em] shadow-[0_4px_16px_rgba(251,191,36,0.45)] border border-amber-200/70">
                  <Crown className="w-3 h-3 stroke-[2.5]" />
                  <span>{item.flagshipLabel || 'Carro-Chefe'} da Empresa</span>
                </div>
              )}

              {/* Delivery Node Card Container */}
              <div
                className={`relative rounded-2xl backdrop-blur-2xl flex items-center gap-3.5 transition-all duration-150 ${
                  isFlagship
                    ? isHovered || isBeingDragged
                      ? 'px-5 py-4 bg-gradient-to-br from-[#10293e] via-[#0b1f33] to-[#081625] border-2 border-amber-300 shadow-[0_24px_55px_rgba(251,191,36,0.32),0_12px_30px_rgba(16,185,129,0.35)] ring-2 ring-amber-400/40'
                      : 'px-5 py-4 bg-gradient-to-br from-[#0e2438] via-[#0a1b2e] to-[#071422] border-2 border-amber-400/75 shadow-[0_20px_48px_rgba(251,191,36,0.22),0_16px_36px_rgba(0,0,0,0.75)] ring-1 ring-emerald-400/35'
                    : isHovered || isBeingDragged
                      ? 'px-4 py-3 bg-[#0b172a] border-2 border-emerald-400 shadow-[0_20px_45px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/40'
                      : 'px-4 py-3 bg-[#091528]/95 border border-sky-500/35 shadow-[0_16px_36px_rgba(0,0,0,0.65)] hover:border-emerald-400/70'
                }`}
                style={{
                  minWidth: isFlagship ? '330px' : '280px',
                }}
              >
                {/* Prominent Geometric Icon Badge */}
                <div
                  className={`rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-150 shadow-xs ${
                    isFlagship
                      ? `w-11 h-11 border-amber-400/80 bg-gradient-to-br from-amber-500/25 via-emerald-500/20 to-emerald-950/60 shadow-[0_0_16px_rgba(251,191,36,0.25)] ${
                          isHovered || isBeingDragged ? 'scale-110' : ''
                        }`
                      : `w-10 h-10 ${
                          isHovered || isBeingDragged
                            ? 'border-emerald-400 bg-emerald-950/60 scale-105'
                            : 'border-sky-500/40 bg-sky-950/50'
                        }`
                  }`}
                >
                  <div
                    style={{
                      color: isFlagship
                        ? '#fbbf24'
                        : isHovered || isBeingDragged
                          ? '#34d399'
                          : '#38bdf8',
                    }}
                  >
                    {getIcon(item.iconName, isFlagship ? 'w-5.5 h-5.5' : 'w-5 h-5')}
                  </div>
                </div>

                {/* Delivery Name */}
                <div className="flex flex-col pr-2 min-w-0">
                  <h3
                    className={`tracking-tight leading-snug whitespace-nowrap transition-colors duration-150 ${
                      isFlagship
                        ? `text-[15px] md:text-base font-black ${
                            isHovered || isBeingDragged ? 'text-amber-200' : 'text-white'
                          }`
                        : `text-sm md:text-[15px] font-extrabold ${
                            isHovered || isBeingDragged ? 'text-emerald-300' : 'text-white'
                          }`
                    }`}
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Button "Ver detalhes" - Redirecionamento direto */}
                <a
                  href={item.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className={
                    isFlagship
                      ? 'ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-xs font-extrabold text-[#04101a] transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_26px_rgba(251,191,36,0.6)] whitespace-nowrap cursor-pointer active:scale-95 shrink-0'
                      : 'ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 hover:from-emerald-500/35 hover:to-sky-500/35 border border-emerald-400/50 hover:border-emerald-300 text-xs font-bold text-emerald-300 hover:text-white transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] whitespace-nowrap cursor-pointer active:scale-95 shrink-0'
                  }
                  title={`Acessar ${item.name}`}
                >
                  <span>Ver detalhes</span>
                  <ArrowUpRight
                    className={`w-3.5 h-3.5 ${isFlagship ? 'text-[#04101a] stroke-[2.5]' : 'text-emerald-300'}`}
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
