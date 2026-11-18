import React, { useState } from 'react';
import {
  Check,
  TrendingUp,
  Clock,
  Zap,
  Shield,
  ArrowRight,
  Bot,
  Target,
  Award,
  GraduationCap,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { DELIVERIES_DATA } from '../data/ecosystemData';
import { DeliveryItem } from '../types/ecosystem';

interface SynergySimulatorProps {
  onOpenDiagnostic: (selectedIds: string[]) => void;
}

export const SynergySimulator: React.FC<SynergySimulatorProps> = ({ onOpenDiagnostic }) => {
  // By default, all 5 selected for full ecosystem showcase, but can toggle
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'agente-cerutti',
    'programa-campeao',
    'campeao-vendas',
    'plataforma-ead',
    'mentoria-individual',
  ]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((i) => i !== id) : prev) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(DELIVERIES_DATA.map((d) => d.id));
  };

  // Metrics computation based on selection
  const hasAI = selectedIds.includes('agente-cerutti');
  const hasProgram = selectedIds.includes('programa-campeao');
  const hasMethod = selectedIds.includes('campeao-vendas');
  const hasEAD = selectedIds.includes('plataforma-ead');
  const hasMentorship = selectedIds.includes('mentoria-individual');

  const count = selectedIds.length;

  // Efficiency estimate
  let efficiencyBoost = count * 35;
  if (count >= 3) efficiencyBoost += 45;
  if (count === 5) efficiencyBoost += 100; // Complete synergy bonus

  // Cycle reduction
  let cycleReduction = count * 6;
  if (hasAI && hasMethod) cycleReduction += 12;

  // Coverage percentage
  const coveragePercent = Math.round((count / 5) * 100);

  const getIcon = (id: string) => {
    switch (id) {
      case 'agente-cerutti':
        return <Bot className="w-4 h-4 text-sky-400" />;
      case 'programa-campeao':
        return <Target className="w-4 h-4 text-emerald-400" />;
      case 'campeao-vendas':
        return <Award className="w-4 h-4 text-blue-400" />;
      case 'plataforma-ead':
        return <GraduationCap className="w-4 h-4 text-teal-400" />;
      case 'mentoria-individual':
        return <UserCheck className="w-4 h-4 text-indigo-400" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#081226] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Simulador de Sinergia
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Calcule o Impacto Combinado na Sua Operação
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Selecione as entregas que deseja integrar para ver a projeção de aceleração, cobertura da jornada e eliminação de gargalos comerciais.
          </p>
        </div>

        <button
          onClick={selectAll}
          className="px-3.5 py-1.5 text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-800/60 rounded-lg hover:bg-sky-900/60 transition-colors"
        >
          Selecionar Todas as 5 Entregas (Recomendado)
        </button>
      </div>

      {/* Selectable Delivery Chips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {DELIVERIES_DATA.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/70 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-60 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getIcon(item.id)}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700 bg-slate-800/60'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 block">{item.code}</span>
                <h4 className="text-xs font-bold text-white leading-tight mt-0.5 mb-1">
                  {item.name}
                </h4>
              </div>

              <span className="text-[10px] text-emerald-400 font-medium line-clamp-1 mt-2">
                {item.metrics[0].value} {item.metrics[0].label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Results Dashboard & Real Impact projection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
        {/* KPI 1: Estimated Efficiency Boost */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Aceleração de Eficiência</span>
            </div>
            <span className="text-4xl font-mono font-extrabold text-emerald-400 block my-1">
              +{efficiencyBoost}%
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiplicador obtido pela automação de topo de funil aliada ao aumento de taxa de conversão em propostas.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Status:</span>
            <span className="text-emerald-400 font-semibold">
              {count === 5 ? 'Ecossistema Pleno 360°' : `${count} Módulos Integrados`}
            </span>
          </div>
        </div>

        {/* KPI 2: Sales Cycle Reduction */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Encurtamento do Ciclo</span>
            </div>
            <span className="text-4xl font-mono font-extrabold text-sky-400 block my-1">
              -{cycleReduction}%
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Menos tempo perdido entre o primeiro contato e a decisão final graças ao alinhamento de scripts e qualificação rigorosa.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tempo de Resposta:</span>
            <span className="text-sky-400 font-semibold">{hasAI ? '< 3 segundos' : 'Manual'}</span>
          </div>
        </div>

        {/* KPI 3: Coverage & Action */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 via-[#0a1838] to-slate-900 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Cobertura da Operação</span>
              <span className="text-white font-bold">{coveragePercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${coveragePercent}%` }}
              />
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {hasAI && hasMethod
                    ? 'Qualificação instantânea e sem vazamento de leads'
                    : 'Leads podem sofrer demora no contato inicial'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {hasProgram && hasEAD
                    ? 'Equipe capacitada e onboarding rápido garantido'
                    : 'Capacitação dependente de esforço manual de gestores'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenDiagnostic(selectedIds)}
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Gerar Proposta para ({selectedIds.length}) Entregas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
