import React, { useState, useEffect } from 'react';
import { 
  Activity, Sparkles, Flame, ShieldAlert, MapPin, Clock, Phone, Mail, 
  ChevronRight, ChevronLeft, Award, Star, HeartPulse, Stethoscope, 
  Menu, X, Check, ArrowRight, ShieldCheck, ThumbsUp, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import ErgonomicWidget from './components/ErgonomicWidget';
import BookingModal from './components/BookingModal';

// Static Data & Types
import { SPECIALTIES, DOCTORS, TESTIMONIALS } from './data';
import { Specialty, Doctor } from './types';

import HERO_IMAGE from './assets/images/ortho_hero_1781287848853.jpg';
import SPORTS_IMAGE from './assets/images/ortho_sports_1781287864452.jpg';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSpecialtyPreset, setModalSpecialtyPreset] = useState('');
  const [modalDoctorPreset, setModalDoctorPreset] = useState('');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  
  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSendingContact, setIsSendingContact] = useState(false);

  // Set page title and metadata on mount
  useEffect(() => {
    document.title = 'Ortho Recreio • Clínica de Ortopedia & Reabilitação de Alto Padrão';
  }, []);

  // Open booking helper with constraints
  const triggerBooking = (specialtyId = '', doctorId = '') => {
    setModalSpecialtyPreset(specialtyId);
    setModalDoctorPreset(doctorId);
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setIsSendingContact(true);
    setTimeout(() => {
      setIsSendingContact(false);
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      
      // Auto close confirmation after 4s
      setTimeout(() => setContactSubmitted(false), 4000);
    }, 1200);
  };

  // Helper to resolve specialty icon component based on name string
  const getSpecialtyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-ocean" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-ocean" />;
      case 'Flame': return <Flame className="w-6 h-6 text-ocean" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-ocean" />;
      default: return <HeartPulse className="w-6 h-6 text-ocean" />;
    }
  };

  return (
    <div className="bg-fluid-gradient min-h-screen relative font-sans text-slate-700 select-none pb-0">
      
      {/* Decorative ambient blurred particles in general body background */}
      <div className="absolute top-48 left-12 w-96 h-96 rounded-full bg-cyan-glow/10 filter blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[1200px] right-24 w-[500px] h-[500px] rounded-full bg-teal-glow/10 filter blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-60 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-500/5 filter blur-[100px] pointer-events-none" />

      {/* STICKY GLASS HEADER */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/40 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo element resembling high-end clinical lettering */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ocean to-cyan-glow/40 flex items-center justify-center border border-white/40 shadow-md transform group-hover:rotate-6 transition-all duration-300">
              <span className="font-serif font-extrabold text-white text-xl">O</span>
            </div>
            <div>
              <span className="font-serif font-extrabold text-xl text-ocean tracking-tight block leading-tight">Ortho Recreio</span>
              <span className="text-[9px] uppercase tracking-widest text-[#00a896] block font-semibold leading-none font-mono">Medicina do Movimento</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-ocean-dark">
            <a href="#home" className="hover:text-cyan-glow hover:scale-105 transition-all text-ocean font-bold">Home</a>
            <a href="#specialties" className="hover:text-[#00a896] hover:scale-105 transition-all transition-all">Especialidades</a>
            <a href="#about" className="hover:text-[#00a896] hover:scale-105 transition-all">Sobre & Equipe</a>
            <a href="#testimonials" className="hover:text-[#00a896] hover:scale-105 transition-all">Depoimentos</a>
            <a href="#contact" className="hover:text-[#00a896] hover:scale-105 transition-all">Contato</a>
          </nav>

          {/* Schedule Glass-Button Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider flex items-center gap-1 leading-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Doutores Disponíveis
              </span>
              <span className="text-xs font-semibold text-ocean leading-tight">Agende seu horário online</span>
            </div>
            <button
              onClick={() => triggerBooking()}
              className="py-2.5 px-5 bg-gradient-to-r from-ocean to-ocean-light text-white font-bold rounded-2xl text-xs hover:from-ocean-light hover:to-blue-600 transition-all shadow-md shadow-ocean/15 hover:shadow-cyan-glow/20 border border-white/20 flex items-center gap-1"
            >
              <Stethoscope className="w-4 h-4 text-cyan-glow" />
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/50 border border-slate-200/50 text-ocean hover:text-cyan-glow transition-all"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-panel border-t border-white/30 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-5 pt-4 pb-6 space-y-3 flex flex-col">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl hover:bg-white/40 text-sm font-bold text-ocean"
                >
                  Home
                </a>
                <a 
                  href="#specialties" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl hover:bg-white/40 text-sm font-semibold text-slate-700"
                >
                  Especialidades
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl hover:bg-white/40 text-sm font-semibold text-slate-700"
                >
                  Sobre & Equipe
                </a>
                <a 
                  href="#testimonials" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl hover:bg-white/40 text-sm font-semibold text-slate-700"
                >
                  Depoimentos
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl hover:bg-white/40 text-sm font-semibold text-slate-700"
                >
                  Contato
                </a>
                
                <div className="pt-4 border-t border-slate-200/50 flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Agendamento Online Ativo</span>
                  </div>
                  <button
                    onClick={() => triggerBooking()}
                    className="w-full py-3 px-5 bg-gradient-to-r from-ocean to-ocean-light text-white font-bold rounded-2xl text-xs hover:shadow-cyan-glow/25 transition-all text-center flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Stethoscope className="w-4.5 h-4.5 text-cyan-glow" />
                    Fazer Agendamento Online
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 md:py-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Tagline & Description */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left relative">
              
              {/* Premium Floating Clinical Quality Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-white/80 backdrop-blur-md text-xs font-semibold text-ocean shadow-sm">
                <Award className="w-4.5 h-4.5 text-[#00a896]" />
                <span>Medicina Ortopédica Avançada no Recreio</span>
              </div>

              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ocean leading-[1.1] tracking-tight">
                Recuperando o seu <span className="text-[#0052cc] underline decoration-cyan-glow decoration-wavy decoration-3 underline-offset-4">Movimento</span>, Restando sua <span className="font-normal italic">Qualidade de Vida</span>.
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                O <strong>Ortho Recreio</strong> combina cirurgiões renomados, diagnósticos 3D precisos e gessografia termoplástica à prova d'água para guiar você desde a dor aguda até a liberdade total de movimento.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">
                <button
                  onClick={() => triggerBooking()}
                  className="py-3.5 px-8 bg-gradient-to-r from-ocean to-ocean-light hover:from-ocean-light hover:to-blue-600 text-white font-bold rounded-2xl text-xs tracking-wide shadow-lg shadow-ocean/20 border border-white/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Agendar Consulta Imediata
                  <ArrowRight className="w-4 h-4 text-cyan-glow" />
                </button>
                <a
                  href="#specialties"
                  className="py-3.5 px-8 bg-white/60 hover:bg-white text-ocean font-bold rounded-2xl text-xs tracking-wide border border-slate-200/80 hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  Conhecer Especialidades
                </a>
              </div>

              {/* Interactive micro info card counters */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/40">
                <div className="bg-white/40 border border-white/50 p-2.5 rounded-2xl backdrop-blur-md">
                  <span className="block text-xl font-extrabold text-ocean leading-tight">100%</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono mt-0.5 block leading-tight">Gesso à Prova D'água</span>
                </div>
                <div className="bg-white/40 border border-white/50 p-2.5 rounded-2xl backdrop-blur-md">
                  <span className="block text-xl font-extrabold text-ocean leading-tight">12h</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono mt-0.5 block leading-tight">Plantão de Trauma</span>
                </div>
                <div className="bg-white/40 border border-white/50 p-2.5 rounded-2xl backdrop-blur-md">
                  <span className="block text-xl font-extrabold text-[#00a896] leading-tight">+15 Mil</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono mt-0.5 block leading-tight">Vidas Restauradas</span>
                </div>
              </div>

            </div>

            {/* Hero Right: Premium Masked Clinical Image & Info Plate */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
              
              {/* Backglow layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ocean/20 to-cyan-glow/20 rounded-[4rem] filter blur-3xl transform rotate-3" />

              {/* Image Frame with soft organic frame masking & luxury drop shadows */}
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/40 transform hover:-rotate-1 hover:scale-101 transition-all duration-500">
                <img
                  src={HERO_IMAGE}
                  alt="Atendimento especializado no Ortho Recreio"
                  className="w-full h-[410px] object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Medical Info Bubble Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel-dark border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00a896] text-white flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#00f0ff] font-bold block font-mono">Destaque Clínico</span>
                    <strong className="text-white text-xs block font-serif mt-0.5 leading-normal">Medicina Esportiva Integrada ao Mar</strong>
                    <span className="text-[10px] text-slate-300 block font-medium">Reabilitação assistida para velejadores, surfistas e corredores</span>
                  </div>
                </div>
              </div>

              {/* Floating micro indicators */}
              <div className="absolute -top-4 -right-2 py-2 px-3 rounded-2xl glass-panel border border-white/60 text-[11px] font-bold text-ocean flex items-center gap-1.5 shadow-md animate-float">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Atendimento de Urgência Ativo</span>
              </div>

              <div className="absolute -bottom-3 -left-4 py-2 px-3 rounded-2xl glass-panel border border-white/60 text-[11px] font-bold text-slate-700 flex items-center gap-1.5 shadow-md animate-float-delayed">
                <ShieldCheck className="w-4 h-4 text-ocean" />
                <span>Amparo ao Surf do Recreio</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* BENTO SPECIALTIES GRID */}
      <section id="specialties" className="py-20 bg-white/20 relative border-y border-white/30 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a896] font-mono select-none">Tecnologia & Expertise</span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-ocean tracking-tight">
              Grade Bento de Especialidades Clínicas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              De diagnósticos de articulações em tempo real a reabilitações motoras aceleradas, entenda nossos principais polos de cura estrutural:
            </p>
          </div>

          {/* Bento Grid Structure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* COLUMN 1 (Traumatologia) - Grid size: md:col-span-4 */}
            <div className="md:col-span-4 rounded-3xl glass-card p-6 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl" />
              
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
                  <Flame className="w-5.5 h-5.5" />
                </div>
                
                <h3 className="font-serif font-bold text-lg text-ocean mb-2">Traumatologia Imediata</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                  Abordagem rápida contra luxações e entorses com gesso termoplástico moldável em 3D, ultra-ventilado e à prova d'água. Excelente para quem não quer parar de surfar ou praticar esportes.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/40 flex items-center justify-between">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider font-mono">Imobilização Leve 3D</span>
                <button 
                  onClick={() => triggerBooking('trauma')}
                  className="p-1 px-3 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-xl text-[10px] font-bold text-rose-600 transition-all cursor-pointer"
                >
                  Consultar Urgência
                </button>
              </div>
            </div>

            {/* COLUMN 2 (Sports Medicine / Hero Bento) - Grid size: md:col-span-8 */}
            <div className="md:col-span-8 rounded-3xl glass-card p-0 flex flex-col md:flex-row overflow-hidden group">
              {/* Left text column of sports bento */}
              <div className="p-6 md:p-8 flex flex-col justify-between md:w-1/2 relative">
                <div className="absolute top-0 left-0 -ml-12 -mt-12 w-32 h-32 bg-cyan-glow/5 rounded-full blur-2xl" />

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-200/40 text-[10px] font-bold text-ocean-light mb-4">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Destaque Esporte</span>
                  </div>
                  
                  <h3 className="font-serif font-extrabold text-xl text-ocean mb-2.5">
                    Medicina Esportiva & Performance
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nossa equipe cuida de atletas amadores e federados, restabelecendo ligamentos (LCA/LCP) e reparando lesões musculares com o uso de terapias biológicas regenerativas e exames biomecânicos computadorizados para reinserção de alto rendimento.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] text-slate-400 font-medium italic mb-3">"Cuidado focado na especificidade funcional do atleta"*</p>
                  <button
                    onClick={() => triggerBooking('sports')}
                    className="py-2 px-4 bg-gradient-to-r from-ocean to-ocean-light hover:from-ocean-light hover:to-blue-600 text-white font-bold rounded-xl text-[11px] hover:shadow-md transition-all flex items-center gap-1"
                  >
                    Marcar Planejamento Esportivo
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-glow" />
                  </button>
                </div>
              </div>

              {/* Right image/graphics column of sports bento */}
              <div className="md:w-1/2 h-56 md:h-auto min-h-[220px] relative">
                <img
                  src={SPORTS_IMAGE}
                  alt="Medicina esportiva de alta precisão"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual medical layout overlap metrics */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-mono text-cyan-glow flex items-center gap-1 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
                  <span>Mapeamento Biomecânico em Tempo Real</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3 (Saúde da Coluna com o Widget) - Grid size: md:col-span-6 */}
            <div className="md:col-span-6 rounded-3xl glass-card p-6 flex flex-col justify-between min-h-[390px]">
              
              {/* Dynamic Ergonomic Calculator Holder */}
              <ErgonomicWidget onScheduleSpine={() => triggerBooking('spine', 'dra-sofia')} />

            </div>

            {/* COLUMN 4 (Joint Reconstructive) - Grid size: md:col-span-6 */}
            <div className="md:col-span-6 rounded-3xl glass-card p-6 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-teal-glow/5 rounded-full blur-2xl" />
              
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5.5 h-5.5" />
                </div>
                
                <h3 className="font-serif font-bold text-lg text-ocean mb-2">Artropastias & Substituição de Articulações</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Referência em cirurgias minimamente invasivas de reposição articular (Quadril e Joelho) com emprego de próteses importadas de titânio de altíssima durabilidade. Nossos protocolos de reabilitação acelerada permitem que os pacientes fiquem em pé e caminhem logo no primeiro dia de seu pós-operatório.
                </p>

                {/* Facts metrics badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">Próteses Importadas</span>
                  <span className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">Reabilitação Acelerada</span>
                  <span className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">Hospital Credenciado</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/40 flex items-center justify-between">
                <span className="text-[10px] text-[#00a896] font-bold uppercase tracking-wider font-mono">Alta Durabilidade Articular</span>
                <button
                  onClick={() => triggerBooking('joints')}
                  className="py-1.5 px-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-[10px] font-bold rounded-xl hover:shadow-md transition-all flex items-center gap-1 border border-white/20"
                >
                  Conversar com Especialista
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PHILOSOPHY & ABOUT SECTION WITH INTEGRATED DOCTORS DETAIL */}
      <section id="about" className="py-20 md:py-24 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Left: Text & Bio Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">A Clínica Ortho Recreio</span>
                <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-ocean tracking-tight leading-tight">
                  Nossa Filosofia: Medicina Humana Amparada em Tecnologia de Ponta
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fundada no coração do Recreio dos Bandeirantes, nossa clínica surgiu com a ambição de ser muito mais que um consultório médico. Criamos um ecossistema integrativo focado no restabelecimento da locomoção saudável do paciente de forma célere, indolor e humanizada.
              </p>

              <div className="p-4 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-md space-y-3">
                <blockquote className="font-serif text-xs italic text-slate-500 leading-relaxed border-l-2 border-[#00a896] pl-3">
                  "Não tratamos apenas ossos ou ligamentos; tratamos o surfista que anseia pela onda, a avó que quer segurar o neto no colo com conforto e o corredor que busca bater sua meta sem medo da cartilagem do joelho."
                </blockquote>
                <div className="text-right text-[10px] text-slate-400 uppercase font-mono font-bold">— Equipe Clínico-Esportiva Ortho Recreio</div>
              </div>

              {/* Qualities bullet rows with elegant checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#00a896]/15 hover:bg-[#00a896]/30 flex items-center justify-center text-[#00a896] shrink-0 border border-[#00a896]/10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Exames Digitais e Termografia no Local</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#00a896]/15 hover:bg-[#00a896]/30 flex items-center justify-center text-[#00a896] shrink-0 border border-[#00a896]/10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Infiltrações Guiadas por Ultrassom</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#00a896]/15 hover:bg-[#00a896]/30 flex items-center justify-center text-[#00a896] shrink-0 border border-[#00a896]/10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Gesso Respirável e Lavável 3D</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#00a896]/15 hover:bg-[#00a896]/30 flex items-center justify-center text-[#00a896] shrink-0 border border-[#00a896]/10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Reabilitação Funcional Integrada</span>
                </div>
              </div>

            </div>

            {/* About Right: Distinctive overlapping clinician bio frames */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="text-center md:text-left mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/10">Corpo Clínico Certificado</span>
                <h3 className="font-serif font-bold text-lg text-ocean mt-2">Doutores e Cirurgiões Ortopédicos</h3>
              </div>

              {/* Doctors map list with micro hover glass items */}
              <div className="space-y-4">
                {DOCTORS.map((doc) => {
                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl glass-card border border-white/50 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-lg transition-all"
                    >
                      {/* Doctor avatar initials styled with deep premium details */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ocean to-cyan-glow/50 text-white font-serif font-bold text-sm select-none border border-white/20 shrink-0 shadow-sm flex items-center justify-center">
                        {doc.avatar}
                      </div>

                      <div className="flex-1 space-y-1.5 text-center sm:text-left">
                        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-1.5">
                          <div>
                            <strong className="text-sm font-serif font-bold text-ocean block leading-none">{doc.name}</strong>
                            <span className="text-[10px] text-slate-400 font-mono tracking-wide leading-none">{doc.crm}</span>
                          </div>
                          
                          <button
                            onClick={() => triggerBooking(doc.specialtyId, doc.id)}
                            className="text-[10px] py-1 px-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition-all border border-white/10"
                          >
                            Agendar Horário
                          </button>
                        </div>
                        
                        <span className="text-[10px] bg-blue-500/10 text-[#0052cc] py-0.5 px-2 rounded-full font-bold uppercase tracking-wider inline-block">
                          {doc.role}
                        </span>
                        
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {doc.bio}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section id="testimonials" className="py-20 bg-ocean/5 relative border-y border-white/30 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a896] font-mono">Dedicado a você</span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-ocean tracking-tight">
              O que dizem nossos pacientes recuperados
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Realizamos cirurgias articulares, endoscopias vertebrais minimamente invasivas e salvamentos de fraturas com as melhores avaliações do Rio:
            </p>
          </div>

          {/* Testimonial Active Slider Showcase */}
          <div className="max-w-xl mx-auto relative px-1 pt-4">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00c8cc]/10 to-[#0052cc]/10 rounded-3xl blur-2xl -z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.35, type: 'spring', damping: 20 }}
                className="rounded-3xl glass-card p-6 md:p-8 border border-white/60 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                
                {/* Visual quote accent bubble decorator */}
                <span className="absolute top-4 right-6 text-7xl font-serif text-[#00a896]/10 select-none pointer-events-none font-bold">“</span>

                <div>
                  {/* Rating Stars row */}
                  <div className="flex gap-0.5 items-center text-amber-500 mb-3.5">
                    {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current stroke-[2]" />
                    ))}
                  </div>

                  <p className="font-serif text-sm italic text-slate-700 leading-relaxed relative z-10">
                    "{TESTIMONIALS[activeTestimonialIdx].quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Generates placeholder initials avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[#00a896]/10 border border-[#00a896]/20 flex items-center justify-center font-bold text-xs text-ocean">
                      {TESTIMONIALS[activeTestimonialIdx].name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div>
                      <strong className="text-xs text-ocean font-bold block">{TESTIMONIALS[activeTestimonialIdx].name}, {TESTIMONIALS[activeTestimonialIdx].age} anos</strong>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">{TESTIMONIALS[activeTestimonialIdx].condition}</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0 select-none">
                    <button
                      onClick={prevTestimonial}
                      className="p-1 px-2 border border-slate-200 bg-white/60 hover:bg-white text-slate-600 rounded-lg transition-all"
                      aria-label="Depoimento anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-1 px-2 border border-slate-200 bg-white/60 hover:bg-white text-slate-600 rounded-lg transition-all"
                      aria-label="Próximo depoimento"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* CONTACT, LOCATION & FAST FEEDBACK PANEL */}
      <section id="contact" className="py-20 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Info & Location Map panel */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a896] font-mono">Contato & Endereço</span>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-ocean tracking-tight">Fale com Nosso Time</h2>
                <p className="text-xs text-slate-500">Estamos no Recreio esperando por você de segunda a sábado:</p>
              </div>

              {/* Physical details list */}
              <div className="space-y-3.5 pt-2 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#00a896]/10 text-[#00a896] rounded-xl shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-ocean block">Endereço de Atendimento</strong>
                    <span className="leading-relaxed">Av. das Américas, 18250 - Sl 302 • Recreio dos Bandeirantes, Rio de Janeiro - RJ</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00a896]/10 text-[#00a896] rounded-xl shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-ocean block">Horários de Funcionamento</strong>
                    <span className="leading-relaxed">Segunda a Sexta: 08:00h às 20:00h<br />Sábado: 08:00h às 14:00h • Emergências 24h em canal corporativo</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00a896]/15 text-[#00a896] rounded-xl shrink-0">
                    <Phone className="w-4 h-4 animate-bounce" />
                  </div>
                  <div>
                    <strong className="text-ocean block">Telefone e WhatsApp Corp.</strong>
                    <a href="tel:+552134567890" className="hover:underline hover:text-cyan-glow transition-all block leading-normal">(21) 3456-7890</a>
                    <a href="https://wa.me/5521999999999" target="_blank" className="hover:underline hover:text-emerald-500 transition-all font-semibold text-[#00a896] block font-mono">(21) 99999-9999 • WhatsApp Direto</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#00a896]/10 text-[#00a896] rounded-xl shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-ocean block">E-mail Clínico</strong>
                    <a href="mailto:contato@orthorecreio.com.br" className="hover:underline hover:text-cyan-glow transition-all">contato@orthorecreio.com.br</a>
                  </div>
                </div>
              </div>

              {/* High-End Clinic Location Visual Illustration (Minimal Map mockup) */}
              <div className="p-4 rounded-3xl bg-white/40 border border-white/50 backdrop-blur-md text-center space-y-3 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-500/5 -z-10" />
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase font-mono border-b pb-1">
                  <span>Coordenadas • Recreio RJ</span>
                  <span className="text-[#00a896] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Proximidade Américas Shopping
                  </span>
                </div>
                
                {/* Simulated geographic map representation styled cleanly */}
                <div className="h-28 bg-ocean/5 rounded-2xl border border-slate-200/50 relative overflow-hidden flex flex-col justify-between p-3 text-left">
                  <div className="space-y-1">
                    <div className="w-32 h-2 bg-slate-300/30 rounded-full" />
                    <div className="w-24 h-2 bg-slate-300/30 rounded-full" />
                    <div className="w-40 h-2 bg-[#00a896]/20 rounded-full" />
                  </div>
                  
                  {/* Glowing target pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="absolute w-8 h-8 rounded-full bg-blue-500/20 animate-ping" />
                    <MapPin className="w-6 h-6 text-ocean fill-cyan-glow" />
                    <span className="text-[9px] font-mono tracking-wider uppercase font-extrabold bg-ocean text-white px-2 py-0.5 rounded shadow mt-1">Ortho Recreio</span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium">Visualizador de Georreferenciamento Interno</div>
                </div>
              </div>

            </div>

            {/* Quick Consultation Form or feedback block */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-3xl glass-card border border-white/60 relative overflow-hidden h-full flex flex-col justify-between">
                
                <div>
                  <h3 className="font-serif font-bold text-lg text-ocean mb-1">Dúvidas Clínicas ou Sugestões de Agendamento</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nossos médicos responderão sua mensagem no WhatsApp ou responderão por e-mail em até 2 horas úteis.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3.5 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nome</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Pedro Henrique"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean outline-none text-slate-800 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">E-mail</label>
                      <input
                        required
                        type="email"
                        placeholder="pedro@gmail.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean outline-none text-slate-800 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sua Mensagem ou Caso Clínico</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Gostaria de saber se aceitam convênios, qual tempo médio de liberação de próteses, ou explicar sua dor local..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs focus:bg-white focus:border-ocean outline-none text-slate-800 transition-all resize-none"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {contactSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-teal-500/10 border border-teal-200 rounded-xl flex items-center gap-2 text-teal-700 text-xs"
                      >
                        <ThumbsUp className="w-4 h-4 shrink-0 text-teal-600" />
                        <span>Obrigado! Mensagem enviada. Retornaremos em instantes!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSendingContact}
                      className="w-full py-3 px-6 bg-gradient-to-r from-ocean to-ocean-light hover:from-ocean-light hover:to-blue-600 text-white font-bold rounded-xl text-xs hover:shadow-md transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      {isSendingContact ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando Mensagem...
                        </>
                      ) : (
                        <>
                          Soliciatar Informações Clínicas
                          <Send className="w-3.5 h-3.5 text-cyan-glow" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="glass-panel-dark text-slate-300 relative z-10 pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            
            {/* Column 1: Brand & location description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-ocean to-cyan-glow/50 flex items-center justify-center font-serif font-extrabold text-white text-base border border-white/10">
                  O
                </div>
                <span className="font-serif font-extrabold text-lg text-white tracking-tight">Ortho Recreio</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Centro de Atendimento Clínico e Ortopedia Avançada focado na rápida recuperação articular, mobilidade funcional e qualidade de vida na Zona Oeste do Rio de Janeiro.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                CRM-RJ: 52-CLIN-OR-RECREIO • CNPJ: 12.345.678/0001-90
              </div>
            </div>

            {/* Column 2: Specialties shortcut */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Polos de Tratamento</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => triggerBooking('sports')} className="hover:text-cyan-glow hover:underline text-left">Fisiologia & Medicina Esportiva</button></li>
                <li><button onClick={() => triggerBooking('spine')} className="hover:text-cyan-glow hover:underline text-left">Patologias e Cirurgia de Coluna</button></li>
                <li><button onClick={() => triggerBooking('trauma')} className="hover:text-cyan-glow hover:underline text-left">Traumatologia Imediata & Urgências</button></li>
                <li><button onClick={() => triggerBooking('joints')} className="hover:text-cyan-glow hover:underline text-left">Artroplastia de Quadril e Joelho</button></li>
              </ul>
            </div>

            {/* Column 3: Patient care links */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Praticidade ao Paciente</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => triggerBooking()} className="hover:text-cyan-glow hover:underline text-left">Marcar Consulta Online</button></li>
                <li><a href="#ergonomic-calculator" className="hover:text-cyan-glow hover:underline">Auto-teste de Estresse Postural</a></li>
                <li><a href="#about" className="hover:text-cyan-glow hover:underline">Ver Equipe e Médicos</a></li>
                <li><a href="mailto:ouvidoria@orthorecreio.com.br" className="hover:text-cyan-glow hover:underline">Canal de Apoio & Ouvidoria</a></li>
              </ul>
            </div>

            {/* Column 4: Hours summary & WhatsApp info */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Localização Principal</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Av. das Américas, 18250 - Sl 302 • Recreio dos Bandeirantes, Rio de Janeiro - RJ (Em frente ao Américas Shopping)
              </p>
              <div className="pt-2 text-xs">
                <strong className="text-teal-400 block font-sans font-semibold">Agendamentos 24h por WhatsApp:</strong>
                <a href="https://wa.me/5521999999999" target="_blank" className="text-[11px] text-[#00f0ff] hover:underline font-bold font-mono">
                  (21) 99999-9999
                </a>
              </div>
            </div>

          </div>

          {/* Legal / credits bottom section */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans">
            <div>
              &copy; {new Date().getFullYear()} Ortho Recreio • Todos os direitos reservados.
            </div>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-slate-300">Termos de Uso</a>
              <span>•</span>
              <a href="#home" className="hover:text-slate-300">Lei Geral de Proteção de Dados (LGPD)</a>
              <span>•</span>
              <a href="#home" className="hover:text-slate-300">Responsável Técnico: Dr. Gabriel Menezes - CRM-RJ 52.98453-2</a>
            </div>
          </div>

        </div>
      </footer>

      {/* APPOINTMENT ENGINE BOOKING DIALOG MODAL */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSpecialtyId={modalSpecialtyPreset}
        initialDoctorId={modalDoctorPreset}
      />

    </div>
  );
}
