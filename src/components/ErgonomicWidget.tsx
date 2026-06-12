import React, { useState } from 'react';
import { POSTURE_QUESTIONS } from '../data';
import { Check, ClipboardList, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErgonomicWidgetProps {
  onScheduleSpine: () => void;
}

export default function ErgonomicWidget({ onScheduleSpine }: ErgonomicWidgetProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggleQuestion = (id: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const resetWidget = () => {
    setSelectedQuestions([]);
    setShowResult(false);
  };

  // Calculate score starting from 100 and subtracting impact of selected habits
  const totalImpact = selectedQuestions.reduce((acc, qId) => {
    const question = POSTURE_QUESTIONS.find((q) => q.id === qId);
    return acc + (question ? question.scoreImpact : 0);
  }, 0);

  const finalScore = Math.max(0, 100 - totalImpact);

  const getDiagnostics = (score: number) => {
    if (score >= 90) {
      return {
        title: 'Excelente Saúde Postural',
        color: 'text-emerald-600 border-emerald-200 bg-emerald-500/10',
        glow: 'shadow-emerald-500/10',
        text: 'Seus hábitos protegem sua integridade vertebral. Continue se movimentando, hidratando-se bem e mantendo sua rotina ativa para proteger suas articulações a longo prazo.',
        tip: 'Dica: Adicione exercícios de extensão de quadril e torácica para complementar.'
      };
    } else if (score >= 60) {
      return {
        title: 'Estresse Vertebral Moderado',
        color: 'text-amber-600 border-amber-200 bg-amber-500/10',
        glow: 'shadow-amber-500/10',
        text: 'Seu estilo de vida atual impõe tensões repetitivas aos discos e ligamentos. Recomenda-se realizar pausas ativas de 5 minutos a cada hora de trabalho sentado.',
        tip: 'Dica: Alongue peitorais e flexores de quadril em intervalos de 50 minutos.'
      };
    } else {
      return {
        title: 'Alto Risco de Sobrecarga Discal',
        color: 'text-rose-600 border-rose-200 bg-rose-500/10',
        glow: 'shadow-rose-500/10',
        text: 'Seus padrões expõem a coluna cervical e lombar a cargas excessivas, encurtamento muscular severo e desgaste acelerado. É aconselhável uma avaliação detalhada com especialista.',
        tip: 'Aviso: Dores frequentes podem estar relacionadas a desvios ou microhérnias.'
      };
    }
  };

  const diagnostics = getDiagnostics(finalScore);

  return (
    <div id="ergonomic-calculator" className="flex flex-col h-full justify-between p-1">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-600">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ocean uppercase tracking-wider font-sans">
              Auto-Avaliação Postural
            </h4>
            <p className="text-xs text-slate-500">Avalie seu risco de dor cervical ou lombar imediatamente</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 mt-4"
            >
              {POSTURE_QUESTIONS.map((q) => {
                const isSelected = selectedQuestions.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleQuestion(q.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all duration-300 flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-400 text-blue-900 font-medium'
                        : 'bg-white/40 border-slate-200/50 hover:bg-white/70 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-400 border-transparent text-white'
                          : 'border-slate-300 bg-white/75'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{q.text}</span>
                  </button>
                );
              })}

              <div className="pt-2">
                <button
                  onClick={() => setShowResult(true)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-ocean to-ocean-light text-white font-medium hover:from-ocean-light hover:to-blue-600 rounded-xl text-xs hover:shadow-lg hover:shadow-ocean/10 transition-all flex items-center justify-center gap-2 group border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-glow group-hover:rotate-12 transition-transform" />
                  Calcular Meu Índice Postural
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
              className="mt-2 space-y-4"
            >
              <div className="flex flex-col items-center justify-center py-3 bg-white/60 rounded-2xl border border-white/50 backdrop-blur-md">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Seu Score Ergofuncional
                </span>
                <div className="relative flex items-center justify-center mt-2">
                  {/* Subtle pulsing background behind score */}
                  <div className={`absolute w-16 h-16 rounded-full blur-xl filter animate-pulse bg-current opacity-25 ${
                    finalScore >= 90 ? 'text-emerald-400' : finalScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                  }`} />
                  <span className={`text-4xl font-extrabold tracking-tight relative ${
                    finalScore >= 90 ? 'text-emerald-600' : finalScore >= 60 ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {finalScore}%
                  </span>
                </div>
                <div className={`mt-2 px-3 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${diagnostics.color}`}>
                  {diagnostics.title}
                </div>
              </div>

              <div className="text-xs bg-white/30 p-3 rounded-xl border border-slate-200/50 space-y-2">
                <p className="text-slate-700 leading-relaxed">{diagnostics.text}</p>
                <div className="p-2 rounded bg-slate-500/5 border-l-2 border-slate-400 flex gap-1.5 items-start">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] italic text-slate-600 leading-normal">{diagnostics.tip}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={resetWidget}
                  className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[11px] text-slate-600 font-semibold border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Voltar
                </button>
                <button
                  onClick={onScheduleSpine}
                  className="flex-2 py-2 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:shadow-md hover:shadow-teal-500/10 transition-all border border-white/20"
                >
                  Tratar Coluna Agora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 border-t border-slate-200/50 pt-2 text-[10px] text-slate-400 flex items-center gap-1 justify-center">
        <span>*Teste educativo. Não substitui consulta médica especializada.</span>
      </div>
    </div>
  );
}
