import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-3.5 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-tr from-sky-500 to-emerald-400 p-[1px]">
            <div className="w-full h-full bg-white rounded-[3px] flex items-center justify-center">
              <span className="text-emerald-700 font-extrabold text-[9px]">EC</span>
            </div>
          </div>
          <span className="font-semibold text-slate-800">
            ECOSSISTEMA CERUTTI
          </span>
          <span className="text-slate-400">·</span>
          <span>Aceleração Comercial & Inteligência em Vendas</span>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          © {new Date().getFullYear()} Cerutti. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
};
