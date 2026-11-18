import React, { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { DELIVERIES_DATA } from '../data/ecosystemData';
import { DeliveryItem } from '../types/ecosystem';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedDelivery?: DeliveryItem | null;
  initialSelectedIds?: string[];
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialSelectedDelivery,
  initialSelectedIds,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '1 a 5 vendedores',
    notes: '',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (initialSelectedDelivery) return [initialSelectedDelivery.id];
    if (initialSelectedIds && initialSelectedIds.length > 0) return initialSelectedIds;
    return DELIVERIES_DATA.map((d) => d.id);
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor, preencha seu nome, e-mail e telefone de contato.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-emerald-50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                Atendimento Executivo
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Solicitar Diagnóstico Comercial & Proposta
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Solicitação Recebida com Sucesso!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Nosso consultor executivo entrará em contato via WhatsApp/E-mail nas próximas 2 horas úteis para agendar a sessão de diagnóstico do seu funil comercial.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-sm"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Service Selection Pills */}
              <div>
                <label className="text-slate-800 font-bold block mb-2">
                  Soluções do Ecossistema em Interesse:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DELIVERIES_DATA.map((d) => {
                    const isChecked = selectedServices.includes(d.id);
                    return (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => toggleService(d.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-500 text-slate-900 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[10px] text-emerald-700 font-bold block">{d.code}</span>
                          <span className="text-xs">{d.name}</span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-emerald-600 text-white font-bold' : 'border border-slate-300'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal & Business Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="voce@suaempresa.com.br"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Sua Empresa"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Tamanho da Equipe Comercial</label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Apenas eu (Fundador/Autônomo)">Apenas eu (Fundador/Autônomo)</option>
                  <option value="1 a 5 vendedores">1 a 5 vendedores</option>
                  <option value="6 a 15 vendedores">6 a 15 vendedores</option>
                  <option value="Mais de 15 vendedores">Mais de 15 vendedores</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Desafio Atual ou Observações</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Queremos acelerar o contato com leads que chegam pelo tráfego pago e treinar o time para fechar sem dar descontos."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:from-emerald-700 hover:to-teal-700 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Solicitação de Diagnóstico</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
