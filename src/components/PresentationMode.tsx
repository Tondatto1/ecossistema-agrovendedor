import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Bot,
  Target,
  Award,
  GraduationCap,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DELIVERIES_DATA, SYNERGY_COMBOS } from '../data/ecosystemData';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiagnostic: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isOpen,
  onClose,
  onOpenDiagnostic,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 8;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalSlides, onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(0, prev - 1));

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] text-slate-900 flex flex-col justify-between overflow-hidden">
      {/* Top Controls Bar */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900">
            ECOSSISTEMA CERUTTI <span className="text-slate-400 font-normal">| Apresentação Executiva</span>
          </span>
        </div>

        {/* Slide Counter & Jump Pills */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-6 h-6 rounded text-xs font-mono font-medium transition-all ${
                  currentSlide === i
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-500 sm:hidden">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Alternar Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        {/* SLIDE 0: INTRODUÇÃO & TESE */}
        {currentSlide === 0 && (
          <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Apresentação Oficial de Soluções</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              O Ecossistema Integrado de{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Alta Performance Comercial
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Como transformamos operações de vendas em organismos vivos: unindo tecnologia autônoma com IA, método proprietário, capacitação contínua e mentoria estratégica.
            </p>

            {/* 3 Core Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs font-mono text-sky-700 uppercase font-bold">01. Agilidade Extrema</span>
                <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">Primeiro Contato com IA</h4>
                <p className="text-xs text-slate-600">Atendimento e qualificação em menos de 3 segundos para que nenhum lead esfrie.</p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs font-mono text-emerald-700 uppercase font-bold">02. Rigor Científico</span>
                <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">Método Campeão</h4>
                <p className="text-xs text-slate-600">Scripts validados e playbook comercial para fechar propostas sem concessão de desconto.</p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs font-mono text-teal-700 uppercase font-bold">03. Escalabilidade Perene</span>
                <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">EAD + Mentoria</h4>
                <p className="text-xs text-slate-600">Onboarding de novos vendedores em 21 dias e calibração semanal direta com o decisor.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={nextSlide}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
              >
                <span>Conhecer as Entregas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDES 1 to 5: THE 5 DELIVERABLES */}
        {currentSlide >= 1 && currentSlide <= 5 && (() => {
          const item = DELIVERIES_DATA[currentSlide - 1];
          return (
            <div className="max-w-4xl w-full space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 text-emerald-700 shadow-sm"
                    style={{ backgroundColor: item.color.badgeBg }}
                  >
                    {item.id === 'agente-cerutti' && <Bot className="w-6 h-6 text-sky-700" />}
                    {item.id === 'programa-campeao' && <Target className="w-6 h-6 text-emerald-700" />}
                    {item.id === 'campeao-vendas' && <Award className="w-6 h-6 text-blue-700" />}
                    {item.id === 'plataforma-ead' && <GraduationCap className="w-6 h-6 text-teal-700" />}
                    {item.id === 'mentoria-individual' && <UserCheck className="w-6 h-6 text-indigo-700" />}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      Entrega {currentSlide} de 5 · Código {item.code}
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.name}
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block">Pilar Central</span>
                  <span className="text-sm font-semibold text-sky-800">{item.tagline}</span>
                </div>
              </div>

              {/* 3 Large KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {item.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col">
                    <span className="text-xs text-slate-500">{m.label}</span>
                    <span className="text-3xl font-mono font-extrabold text-slate-900 my-1">{m.value}</span>
                    <span className="text-xs text-emerald-700 font-semibold leading-tight">{m.detail}</span>
                  </div>
                ))}
              </div>

              {/* Deep Dive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold mb-2">
                      O que Resolve na Prática
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.fullDescription}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold mb-1">
                      Público & Momento Ideal
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.idealFor}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold mb-3">
                      Entregáveis Estruturados
                    </h4>
                    <div className="space-y-3">
                      {item.deliverables.map((deliv, idx) => (
                        <div key={idx} className="border-l-2 border-emerald-600 pl-3">
                          <h5 className="text-xs font-semibold text-slate-900">{deliv.title}</h5>
                          <p className="text-[11px] text-slate-600 leading-normal">{deliv.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Impacto Comercial:</span>
                    <span className="font-semibold text-emerald-700">{item.businessImpact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* SLIDE 6: A SINERGIA 360° */}
        {currentSlide === 6 && (
          <div className="max-w-4xl w-full space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-emerald-700 uppercase font-bold">
                Sinergia do Organismo Vivo
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Como as 5 Entregas se Multiplicam
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                O valor real do Ecossistema não está em contratar ferramentas avulsas, mas no efeito multiplicador quando operam em conjunto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {SYNERGY_COMBOS.map((combo, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    <span className="text-3xl font-mono font-extrabold text-emerald-700 block mb-1">
                      {combo.multiplier}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{combo.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{combo.highlight}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-1">
                    {combo.components.map((cId) => {
                      const found = DELIVERIES_DATA.find((d) => d.id === cId);
                      return (
                        <span
                          key={cId}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {found?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 7: PRÓXIMO PASSO & CALL TO ACTION */}
        {currentSlide === 7 && (
          <div className="max-w-2xl w-full text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 via-emerald-500 to-sky-400 p-[2px] mx-auto shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Pronto para ativar o Ecossistema na sua empresa?
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Agende agora uma sessão de Diagnóstico Comercial Executivo. Vamos analisar o seu funil atual, identificar os maiores pontos de vazamento e desenhar a melhor combinação do ecossistema para o seu modelo de negócio.
            </p>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Auditoria de velocidade de atendimento e perda de leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Avaliação da consistência de fechamento da equipe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Plano de implementação customizado com projeção de ROI</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenDiagnostic();
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
              >
                Agendar Diagnóstico Comercial
              </button>
              <button
                onClick={() => setCurrentSlide(0)}
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all border border-slate-200"
              >
                Reiniciar Apresentação
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="px-6 py-4 border-t border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between z-10 shadow-xs">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            currentSlide === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Slide Tracker */}
        <span className="text-xs text-slate-500 font-mono">
          Slide {currentSlide + 1} de {totalSlides}
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            currentSlide === totalSlides - 1
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm'
          }`}
        >
          <span>Próximo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
