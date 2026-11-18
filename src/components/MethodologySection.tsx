import React from 'react';
import { Check, X, ShieldCheck, TrendingUp, Users, Cpu, ArrowRight } from 'lucide-react';

interface MethodologySectionProps {
  onOpenDiagnostic: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onOpenDiagnostic }) => {
  const comparisonRows = [
    {
      factor: 'Atendimento Inicial & Resposta a Leads',
      traditional: 'Demora de horas a dias; leads esfriam e perdem o interesse',
      cerutti: 'Agente com IA responde em <3s com qualificação SPIN/BANT 24/7',
    },
    {
      factor: 'Capacitação da Equipe Comercial',
      traditional: 'Treinamento pontual que é esquecido em 2 semanas',
      cerutti: 'Programa imersivo + Plataforma EAD contínua com microlearning',
    },
    {
      factor: 'Padronização do Processo de Vendas',
      traditional: 'Cada vendedor vende do seu próprio jeito; depende de sorte',
      cerutti: 'Playbook Campeão em Vendas com scripts cirúrgicos e sem desconto',
    },
    {
      factor: 'Onboarding de Novos Vendedores',
      traditional: '60 a 90 dias de ramp-up com líderes sobrecarregados',
      cerutti: 'Ramp-up em 21 dias com trilhas estruturadas e simulações gravadas',
    },
    {
      factor: 'Direcionamento Estratégico & Gestão',
      traditional: 'Decisões no escuro ou cobrança desesperada no fim do mês',
      cerutti: 'Mentoria individual com auditoria de pipeline e correção semanal',
    },
  ];

  return (
    <section className="space-y-10">
      {/* Section Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
          A Ciência Por Trás do Método
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Por que um Ecossistema Vivo Supera Soluções Isoladas?
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
          Contratar apenas um CRM, ou apenas um curso, ou apenas uma automação nunca resolve o problema de vendas. O segredo da alta performance sustentável reside na sinergia entre tecnologia, pessoas e metodologia.
        </p>
      </div>

      {/* Comparison Table: Traditional vs Cerutti Ecosystem */}
      <div className="bg-[#081226] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Matriz Comparativa de Maturidade Comercial
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Análise de Eficiência Operacional
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-4 text-xs font-semibold bg-slate-900/40 text-slate-400 min-w-[640px]">
            <div className="col-span-4">Dimensão Comercial</div>
            <div className="col-span-4 text-rose-400/90">Modelo Tradicional / Fragmentado</div>
            <div className="col-span-4 text-emerald-400">Ecossistema Cerutti (Integrado)</div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-4 text-xs hover:bg-slate-800/30 transition-colors min-w-[640px]"
            >
              <div className="col-span-4 font-medium text-white pr-4">
                {row.factor}
              </div>
              <div className="col-span-4 text-slate-400 pr-4 flex items-start gap-2">
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>
              <div className="col-span-4 text-slate-200 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium text-emerald-300/90">{row.cerutti}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Pillars of Market Authority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-[#09132b]/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Engenharia Comercial de Precisão</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Não acreditamos em fórmulas mágicas nem em sorte. Nossas soluções são baseadas em dados, métricas de conversão e processos repetíveis testados no campo de batalha.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-emerald-400">
            Acurácia de Fechamento: 94%
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#09132b]/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Cultura de Alta Performance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equipes comuns hesitam frente a objeções de preço. O método Cerutti instaura uma cultura de confiança inabalável, onde os vendedores negociam pelo valor percebido.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-emerald-400">
            Retenção de Equipe: 92%
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#09132b]/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Autoridade Executiva & ROI</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mais de uma década de experiência transformando operações em setores B2B e B2C de alta complexidade. Retorno financeiro transparente e mensurável.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-emerald-400">
            Retorno Médio: 8.4x ROI
          </div>
        </div>
      </div>
    </section>
  );
};
