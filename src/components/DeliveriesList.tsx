import React from 'react';
import {
  Bot,
  Target,
  Award,
  GraduationCap,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { DELIVERIES_DATA } from '../data/ecosystemData';
import { DeliveryItem } from '../types/ecosystem';

interface DeliveriesListProps {
  onSelectDelivery: (item: DeliveryItem) => void;
  onRequestProposal: (item: DeliveryItem) => void;
}

export const DeliveriesList: React.FC<DeliveriesListProps> = ({
  onSelectDelivery,
  onRequestProposal,
}) => {
  const getIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'agente-cerutti':
        return <Bot className={className} />;
      case 'programa-campeao':
        return <Target className={className} />;
      case 'campeao-vendas':
        return <Award className={className} />;
      case 'plataforma-ead':
        return <GraduationCap className={className} />;
      case 'mentoria-individual':
        return <UserCheck className={className} />;
      default:
        return null;
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Soluções & Entregáveis
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            As 5 Engrenagens do Ecossistema Cerutti
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Cada solução foi desenhada para atuar em sinergia cirúrgica. Conheça as atribuições técnicas, métricas de resultado e diferenciais de cada entrega.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DELIVERIES_DATA.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#09132b]/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-md flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/20 text-emerald-400 shadow-md"
                    style={{ backgroundColor: item.color.badgeBg }}
                  >
                    {getIcon(item.id)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">
                      {item.code}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-emerald-400 font-semibold mb-2">
                {item.tagline}
              </p>

              {/* Short Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.shortDescription}
              </p>

              {/* 2 Key Features */}
              <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                {item.keyFeatures.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metrics & Actions */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-slate-400">{item.metrics[0].label}:</span>
                <span className="font-mono font-bold text-white">
                  {item.metrics[0].value} <span className="text-[10px] font-normal text-emerald-400 font-sans">({item.metrics[0].detail})</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectDelivery(item)}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors text-center"
                >
                  Ver Detalhes
                </button>
                <button
                  onClick={() => onRequestProposal(item)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all"
                >
                  <span>Solicitar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 6th Card: All-In-One Ecosystem Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1e45] via-[#091533] to-[#071026] border border-sky-500/40 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
              <span>EC-360</span>
              <span>·</span>
              <span>Ecossistema Integral</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Implantação Comercial Completa
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Integração completa dos 5 pilares: Agente com IA, Treinamento da Equipe, Método Proprietário, Plataforma EAD e Mentoria Executiva com o mentor fundador.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-4 text-xs space-y-1 text-slate-300">
              <div className="flex items-center justify-between">
                <span>Multiplicador de Receita:</span>
                <span className="font-mono font-bold text-emerald-400">+320%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ramp-up da Operação:</span>
                <span className="font-mono font-bold text-white">45 a 60 dias</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onRequestProposal(DELIVERIES_DATA[0])}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/10"
          >
            <span>Consultar Implantação 360°</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
