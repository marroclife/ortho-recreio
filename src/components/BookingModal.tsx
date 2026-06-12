import React, { useState, useEffect } from 'react';
import { SPECIALTIES, DOCTORS } from '../data';
import { Doctor, Specialty } from '../types';
import { 
  X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, 
  ChevronRight, ArrowLeft, Send, Sparkles, Check, Info, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecialtyId?: string;
  initialDoctorId?: string;
}

export default function BookingModal({ 
  isOpen, 
  onClose, 
  initialSpecialtyId = '', 
  initialDoctorId = '' 
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState('');

  // Handle default presets
  useEffect(() => {
    if (isOpen) {
      setSelectedSpecialty(initialSpecialtyId || '');
      setSelectedDoctor(initialDoctorId || '');
      
      // If a doctor was pre-selected, set their specialty automatically
      if (initialDoctorId && !initialSpecialtyId) {
        const doc = DOCTORS.find(d => d.id === initialDoctorId);
        if (doc) {
          setSelectedSpecialty(doc.specialtyId);
        }
      }
      
      // Reset steps and states when modal opens
      setStep(1);
      setName('');
      setPhone('');
      setEmail('');
      setSymptoms('');
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [isOpen, initialSpecialtyId, initialDoctorId]);

  // Generate mock dates (next 6 days excluding Sundays)
  const getNextDates = () => {
    const dates = [];
    const dateOpts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    
    let daysAdded = 0;
    let current = new Date();
    
    while (daysAdded < 6) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0) { // Exclude Sunday
        const formatted = current.toLocaleDateString('pt-BR', dateOpts);
        const iso = current.toISOString().split('T')[0];
        dates.push({ label: formatted, iso });
        daysAdded++;
      }
    }
    return dates;
  };

  const datesList = getNextDates();

  const handleSpecialtySelect = (id: string) => {
    setSelectedSpecialty(id);
    // Reset doctor if they don't match the new specialty
    const matchingDoc = DOCTORS.find(d => d.id === selectedDoctor);
    if (matchingDoc && matchingDoc.specialtyId !== id) {
      setSelectedDoctor('');
    }
    setStep(2);
  };

  const handleDoctorSelect = (id: string) => {
    setSelectedDoctor(id);
    // Find specialty for this doctor and select it if empty
    const doc = DOCTORS.find(d => d.id === id);
    if (doc) {
      setSelectedSpecialty(doc.specialtyId);
    }
    setStep(3);
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep(4);
    }
  };

  const filteredDoctors = DOCTORS.filter(d => !selectedSpecialty || d.specialtyId === selectedSpecialty);

  const formatPhoneNumber = (val: string) => {
    // Basic phone formatter for (XX) XXXXX-XXXX
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setIsSubmitting(true);
    
    // Simulate API storage / processing
    setTimeout(() => {
      // Generate a nice high-end aesthetic clinical code
      const rand = Math.floor(1000 + Math.random() * 9000);
      setAppointmentCode(`OR-${rand}-RECREIO`);
      setIsSubmitting(false);
      setStep(5);
    }, 1500);
  };

  const activeDocObj = DOCTORS.find(d => d.id === selectedDoctor);
  const activeSpecObj = SPECIALTIES.find(s => s.id === selectedSpecialty);
  const formattedDateString = datesList.find(d => d.iso === selectedDate)?.label || selectedDate;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ocean-dark/60 backdrop-blur-md"
      />

      {/* Booking Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, type: 'spring', damping: 25 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel border border-white/50 shadow-2xl flex flex-col max-h-[85vh] md:max-h-[90vh]"
      >
        {/* Subtle glowing elements inside modal for premium organic vibe */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-cyan-glow/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-teal-glow/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-white/30 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean to-cyan-glow/30 flex items-center justify-center text-white font-serif font-bold text-lg select-none border border-white/30 shadow-sm">
              O
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-ocean leading-tight">Agendar Consulta</h3>
              <p className="text-xs text-slate-500">Ortho Recreio • Solução Digital de Reabilitação</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/50 hover:bg-white border border-slate-200/50 text-slate-600 hover:text-ocean hover:scale-105 transition-all"
            aria-label="Fecar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (only for steps 1-4) */}
        {step < 5 && (
          <div className="bg-white/20 backdrop-blur-sm py-2 px-6 border-b border-white/20 flex items-center justify-between text-xs font-semibold text-slate-500 z-10">
            <div className="flex items-center gap-4 w-full justify-between max-w-md mx-auto">
              <span className={`${step >= 1 ? 'text-ocean font-bold' : ''}`}>1. Especialidade</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className={`${step >= 2 ? 'text-ocean font-bold' : ''}`}>2. Especialista</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className={`${step >= 3 ? 'text-ocean font-bold' : ''}`}>3. Agenda</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className={`${step >= 4 ? 'text-ocean font-bold' : ''}`}>4. Cadastro</span>
            </div>
          </div>
        )}

        {/* Modal Content Space */}
        <div className="p-6 overflow-y-auto flex-1 relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Specialty Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center md:text-left">
                  <h4 className="text-base font-serif font-bold text-ocean leading-snug">Selecione a Especialidade Desejada</h4>
                  <p className="text-xs text-slate-500 mt-1">Escolha a categoria clínica na qual se enquadra sua necessidade física:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {SPECIALTIES.map((spec) => {
                    const isSelected = selectedSpecialty === spec.id;
                    return (
                      <button
                        key={spec.id}
                        onClick={() => handleSpecialtySelect(spec.id)}
                        className={`text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between h-36 relative overflow-hidden group ${
                          isSelected
                            ? 'bg-gradient-to-br from-ocean to-ocean-light border-transparent text-white shadow-lg shadow-ocean/10'
                            : 'bg-white/50 border-white/60 hover:border-slate-300 hover:bg-white text-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-white/20 text-cyan-glow' : 'bg-slate-100 text-slate-500 border border-slate-200/55'
                          }`}>
                            {spec.tags[0]}
                          </span>
                          {isSelected && <Check className="w-4.5 h-4.5 text-cyan-glow stroke-[2] shrink-0" />}
                        </div>
                        
                        <div className="mt-4">
                          <h5 className={`font-serif text-sm font-bold leading-normal ${isSelected ? 'text-white' : 'text-ocean'}`}>
                            {spec.title}
                          </h5>
                          <p className={`text-[11px] leading-relaxed mt-1 line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                            {spec.shortDesc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/20">
                  <button
                    onClick={() => setStep(2)}
                    className="py-2.5 px-5 bg-white/70 hover:bg-white border border-slate-300 text-ocean text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all hover:shadow-sm"
                  >
                    Pular para Especialistas
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Doctor Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setStep(1)} 
                    className="p-1 px-2 rounded-lg hover:bg-white/40 text-slate-500 hover:text-ocean text-xs flex items-center gap-1 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Voltar
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <h4 className="text-base font-serif font-bold text-ocean leading-snug">Selecione o Profissional Médico</h4>
                  <p className="text-xs text-slate-500 mt-1">Conheça nosso corpo clínico altamente especializado:</p>
                </div>

                <div className="space-y-3 pt-2">
                  {filteredDoctors.map((doc) => {
                    const isSelected = selectedDoctor === doc.id;
                    const docSpecialty = SPECIALTIES.find(s => s.id === doc.specialtyId);
                    return (
                      <button
                        key={doc.id}
                        onClick={() => handleDoctorSelect(doc.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative group ${
                          isSelected
                            ? 'bg-gradient-to-br from-ocean/5 to-cyan-glow/5 border-ocean/40 shadow-md'
                            : 'bg-white/50 border-white/60 hover:bg-white/80 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start md:items-center gap-4">
                          {/* Doctor Initials Avatar with dynamic theme */}
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-sm select-none shrink-0 border shadow-inner ${
                            isSelected 
                              ? 'bg-gradient-to-tr from-ocean to-cyan-glow/60 text-white border-transparent' 
                              : 'bg-white border-slate-200 text-ocean'
                          }`}>
                            {doc.avatar}
                          </div>
                          
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h5 className="font-serif text-sm font-bold text-ocean leading-tight">
                                {doc.name}
                              </h5>
                              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-ocean-light border border-blue-200/40">
                                {docSpecialty?.title}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5 tracking-wide">{doc.crm}</p>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 md:line-clamp-1 max-w-md leading-relaxed">{doc.bio}</p>
                          </div>
                        </div>

                        <div className="w-full md:w-auto shrink-0 flex justify-between md:justify-end items-center border-t md:border-t-0 border-slate-200/50 pt-3 md:pt-0">
                          <span className="text-[10px] text-slate-500 md:hidden font-medium">Visualizar disponibilidade:</span>
                          <div className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 text-[11px] font-semibold transition-all ${
                            isSelected 
                              ? 'bg-ocean text-white border border-transparent shadow shadow-ocean/10' 
                              : 'bg-white border border-slate-200/80 text-ocean-light hover:bg-slate-50'
                          }`}>
                            <span>Escolher</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Date & Hour Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setStep(2)} 
                    className="p-1 px-2 rounded-lg hover:bg-white/40 text-slate-500 hover:text-ocean text-xs flex items-center gap-1 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Voltar
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <h4 className="text-base font-serif font-bold text-ocean leading-snug">Selecione o Dia e Horário</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Mostrando horários livres com{' '}
                    <span className="font-semibold text-ocean">
                      {activeDocObj ? activeDocObj.name : 'Especialista Recomendado'}
                    </span>:
                  </p>
                </div>

                {/* Days list row */}
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Selecione a Data</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {datesList.map((dt) => {
                      const isSelected = selectedDate === dt.iso;
                      // Simulating days availability based on doctor constraints if present
                      const dateObj = new Date(dt.iso);
                      const daysMap = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                      const dayName = daysMap[dateObj.getDay() + 1] || 'Qua';
                      const isPhysicianAvailable = activeDocObj ? activeDocObj.availableDays.some(d => d.startsWith(dayName.slice(0, 3))) : true;

                      return (
                        <button
                          key={dt.iso}
                          disabled={!isPhysicianAvailable}
                          onClick={() => {
                            setSelectedDate(dt.iso);
                            setSelectedTime(''); // Reset time on day change
                          }}
                          className={`p-3 rounded-2xl transition-all border flex flex-col items-center justify-center text-center ${
                            !isPhysicianAvailable 
                              ? 'opacity-30 bg-slate-100/50 border-slate-200 cursor-not-allowed'
                              : isSelected
                                ? 'bg-gradient-to-br from-ocean to-ocean-light border-transparent text-white shadow shadow-ocean/20'
                                : 'bg-white/60 border-white/80 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSelected ? 'text-cyan-glow' : 'text-slate-400'}`}>
                            {dt.label.split(' ')[0]} {/* Weekday snippet */}
                          </span>
                          <span className="text-base font-bold tracking-tight leading-tight mt-0.5">
                            {dt.label.split(' ')[1]} {/* Date number */}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours grid */}
                <AnimatePresence mode="wait">
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="pt-2"
                    >
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Selecione o Horário</span>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {(activeDocObj ? activeDocObj.availableHours : ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']).map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                                isSelected
                                  ? 'bg-teal-500 text-white border-transparent shadow shadow-teal-500/25'
                                  : 'bg-white border-slate-200/80 hover:bg-teal-50 hover:border-teal-300 text-slate-600 hover:text-teal-700'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5 shrink-0 opacity-70" />
                              <span>{time}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center pt-5 border-t border-white/20 mt-4">
                  <div className="text-xs text-slate-500 italic flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Selecione ambos para prosseguir</span>
                  </div>

                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleDateTimeConfirm}
                    className={`py-2.5 px-6 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-white/20 shadow-md ${
                      selectedDate && selectedTime
                        ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:from-teal-600 hover:to-teal-500 hover:shadow-teal-500/10 hover:scale-[1.02]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border-none'
                    }`}
                  >
                    Continuar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Personal Form submission */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setStep(3)} 
                    className="p-1 px-2 rounded-lg hover:bg-white/40 text-slate-500 hover:text-ocean text-xs flex items-center gap-1 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Voltar
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <h4 className="text-base font-serif font-bold text-ocean leading-snug">Dados do Paciente</h4>
                  <p className="text-xs text-slate-500 mt-1">Preencha corretamente para agilizarmos sua guia de atendimento e cadastro:</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          required
                          type="text"
                          placeholder="Ex: Carlos Eduardo de Oliveira"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean focus:ring-1 focus:ring-ocean/20 transition-all outline-none text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Telefone de Contato</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          required
                          type="tel"
                          placeholder="(21) 98765-4321"
                          value={phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean focus:ring-1 focus:ring-ocean/20 transition-all outline-none text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Endereço de E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                      <input
                        required
                        type="email"
                        placeholder="Ex: carlos.oliveira@recreio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean focus:ring-1 focus:ring-ocean/20 transition-all outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Symptoms textarea */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Sintomas ou Motivo da Consulta (Opcional)</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <textarea
                        rows={2}
                        placeholder="Descreva brevemente sua dor, lesão recente ou encaminhamento médico..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean focus:ring-1 focus:ring-ocean/20 transition-all outline-none text-slate-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* Form Summary Plate */}
                  <div className="p-3 bg-ocean/5 rounded-2xl border border-ocean/10 flex flex-wrap gap-x-4 gap-y-2 items-center text-[11px] text-ocean mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-semibold">{formattedDateString}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-semibold">às {selectedTime}h</span>
                    </div>
                    <div className="flex items-center gap-1 truncate max-w-[200px]">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate font-semibold">{activeDocObj ? activeDocObj.name : 'Dr. Especialista'}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto py-2.5 px-8 bg-gradient-to-r from-ocean to-ocean-light text-white font-bold rounded-xl text-xs hover:from-ocean-light hover:to-blue-600 shadow-lg shadow-ocean/15 transition-all flex items-center justify-center gap-2 border border-white/10"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          Confirmar Minha Consulta
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 5: Success confirmation screen */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6 max-w-md mx-auto"
              >
                {/* Visual success rings */}
                <div className="relative flex justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-teal-500/10 blur-xl animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white border border-white/40 shadow-lg flex items-center justify-center relative">
                    <CheckCircle className="w-9 h-9 stroke-[2]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-ocean tracking-tight">Agendamento Realizado!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Parabéns, seu horário foi reservado com sucesso no sistema da <span className="font-semibold text-ocean">Ortho Recreio</span>.
                  </p>
                </div>

                {/* Patient Voucher Glass Slate */}
                <div className="p-5 rounded-2xl bg-white/80 border border-white uppercase font-mono tracking-wider space-y-3 relative overflow-hidden backdrop-blur-md shadow-md">
                  <div className="absolute top-0 right-0 py-0.5 px-2 rounded-bl-xl bg-teal-500 text-[8px] font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Seguro</span>
                  </div>
                  
                  <div className="text-left text-xs space-y-2 text-slate-500正常 non-mono leading-normal lowercase first-letter:uppercase font-sans font-medium">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">ID de Atendimento</span>
                      <strong className="text-slate-800 font-mono text-sm tracking-widest">{appointmentCode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Paciente</span>
                      <span className="font-bold text-slate-700 capitalize">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Médico</span>
                      <span className="font-bold text-slate-700">{activeDocObj?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono font-bold">Data & Hora</span>
                      <span className="font-bold text-slate-700">{formattedDateString} • {selectedTime}h</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-start gap-2 bg-blue-500/5 p-3 rounded-xl border border-blue-100/50 text-left">
                  <Info className="w-4.5 h-4.5 text-blue-500 mt-0.5 shrink-0" />
                  <p className="leading-normal">
                    Enviamos os detalhes e as orientações preparatórias em seu e-mail (<strong className="text-slate-700">{email}</strong>). Apresente o código acima no balcão da clínica.
                  </p>
                </div>

                {/* Simulated notifications tools */}
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      alert(`Mock agendamento adicionado ao seu calendário!\n${formattedDateString} às ${selectedTime}h - Ortho Recreio.`);
                    }}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs text-slate-600 font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all w-1/2"
                  >
                    Adicionar Agenda
                  </button>
                  <button
                    onClick={() => {
                      const msg = `Olá Ortho Recreio, confirmo meu agendamento código ${appointmentCode} com ${activeDocObj?.name} em ${formattedDateString} às ${selectedTime}h.`;
                      const url = `https://wa.me/5521999999999?text=${encodeURIComponent(msg)}`;
                      window.open(url, '_blank');
                    }}
                    className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all border border-white/20 w-1/2"
                  >
                    Confirmar no WhatsApp
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200/50">
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-ocean hover:text-ocean-light tracking-wide hover:underline cursor-pointer"
                  >
                    Fechar e Voltar ao Portal
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
