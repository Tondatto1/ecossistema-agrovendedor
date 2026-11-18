import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Bot,
  Target,
  Award,
  GraduationCap,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { DeliveryItem } from '../types/ecosystem';
import { DELIVERIES_DATA } from '../data/ecosystemData';

interface DeliveryModalProps {
  delivery: DeliveryItem | null;
  onClose: () => void;
  onSelectDelivery: (item: DeliveryItem) => void;
  onRequestProposal: (item: DeliveryItem) => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  delivery,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!delivery) return null;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0b172a] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-gradient-to-r from-[#0d1f38] via-[#0b172a] to-[#07192a]">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-sky-400/30 shadow-sm"
              style={{ backgroundColor: delivery.color.badgeBg, color: '#38bdf8' }}
            >
              {getIcon(delivery.iconName)}
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="font-bold text-sky-400">{delivery.code}</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">{delivery.tagline}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                {delivery.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Executive Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {delivery.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col"
              >
                <span className="text-xs text-slate-400">{metric.label}</span>
                <span className="text-2xl font-mono font-extrabold text-white my-0.5">
                  {metric.value}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold leading-tight">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Full Description & Value Proposition */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Visão Geral & Proposta de Valor</span>
            </h4>
            <p className="text-slate-200 leading-relaxed text-sm bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {delivery.fullDescription}
            </p>
          </div>

          {/* Structured Deliverables */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>O que Está Incluso nesta Entrega</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {delivery.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <h5 className="font-semibold text-white text-xs mb-1">
                    {item.title}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Diferenciais de Implementação
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {delivery.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Synergies */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Sinergia Ativa no Ecossistema
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {delivery.synergies.map((synId) => {
                const target = DELIVERIES_DATA.find((d) => d.id === synId);
                if (!target) return null;
                return (
                  <span
                    key={synId}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700"
                  >
                    <span className="font-mono text-emerald-400 text-[10px] font-bold">[{target.code}]</span>
                    <span>{target.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer (Minimalist Status) */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#081324] flex items-center justify-between text-xs text-slate-400">
          <span>{delivery.businessImpact}</span>
          <span className="font-mono text-[11px] text-slate-500">Pressione Esc para fechar</span>
        </div>
      </div>
    </div>
  );
};
