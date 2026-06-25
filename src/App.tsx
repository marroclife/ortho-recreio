import React, { useState, useEffect } from 'react';
import {
  Activity, Sparkles, Flame, ShieldAlert, MapPin, Clock, Phone, Mail,
  ChevronRight, Award, Star, HeartPulse, Stethoscope,
  Menu, X, Check, ArrowRight, Send,
  Building2, Calendar, ChevronDown, Info, ThumbsUp,
  ArrowUpRight, Quote, PhoneCall, MessageCircle, Facebook, Instagram, Linkedin,
  MoveRight, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import ErgonomicWidget from './components/ErgonomicWidget';
import BookingModal from './components/BookingModal';

// Static Data & Types
import { SPECIALTIES, DOCTORS, TESTIMONIALS } from './data';
import { Specialty, Doctor } from './types';

import HERO_IMAGE from './assets/images/dr-jorge-hero.png';
import DOCTOR_PORTRAIT from './assets/images/doctor-portrait.png';
import LOGO_IMAGE from './assets/images/logo-orthorecreio.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSpecialtyPreset, setModalSpecialtyPreset] = useState('');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('adulto');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactType, setContactType] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Footer accordion state (mobile) — start collapsed on mobile, expanded on desktop
  const [openFooterSections, setOpenFooterSections] = useState<Record<string, boolean>>({
    services: false,
    checkup: false,
    links: false,
  });

  // Set page title and metadata on mount
  useEffect(() => {
    document.title = 'Ortho Recreio • Ortopedia & Reabilitação';
  }, []);

  // Open booking helper
  const triggerBooking = (specialtyId = '') => {
    setModalSpecialtyPreset(specialtyId);
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

    const phone = '5521967691358';
    const greeting = `Olá, meu nome é ${contactName}.`;
    const body = encodeURIComponent(`${greeting}\n\n${contactMsg}\n\nE-mail: ${contactEmail}${contactPhone ? `\nTelefone: ${contactPhone}` : ''}${contactType ? `\nInteresse: ${contactType}` : ''}`);
    const whatsappUrl = `https://wa.me/${phone}?text=${body}`;

    window.open(whatsappUrl, '_blank');

    setContactSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactType('');
    setContactMsg('');

    setTimeout(() => setContactSubmitted(false), 6000);
  };

  // Helper to resolve specialty icon component based on name string
  const getSpecialtyIcon = (iconName: string, className = 'w-7 h-7 text-primary') => {
    switch (iconName) {
      case 'Activity': return <Activity className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      default: return <HeartPulse className={className} />;
    }
  };

  const currentTestimonial = TESTIMONIALS[activeTestimonialIdx];

  // Carousel items for Services & Treatments
  const SERVICES_CAROUSEL = [
    ...SPECIALTIES.map(spec => ({ id: spec.id, title: spec.title, icon: spec.iconName })),
    { id: 'fisioterapia', title: 'Fisioterapia', icon: 'HeartPulse' },
    { id: 'reabilitacao', title: 'Reabilitação', icon: 'Activity' },
    { id: 'dor-cronica', title: 'Dor Crônica', icon: 'ShieldAlert' }
  ];
  const TREATMENT_PLANS = [
    {
      id: 'adulto',
      label: 'Ortopedia Adulto',
      title: 'Tratamento Ortopédico Adulto',
      icon: Stethoscope,
      image: DOCTOR_PORTRAIT,
      points: [
        'Avaliação clínica e diagnóstico por imagem integrado',
        'Tratamento conservador e cirurgia minimamente invasiva',
        'Fisioterapia e reabilitação funcional pós-cirurgia'
      ]
    },
    {
      id: 'esportiva',
      label: 'Medicina Esportiva',
      title: 'Reabilitação Esportiva',
      icon: Activity,
      image: HERO_IMAGE,
      points: [
        'Recuperação de lesões ligamentares e musculares',
        'Protocolos de retorno à performance atlética',
        'Prevenção de lesões e fortalecimento específico'
      ]
    },
    {
      id: 'coluna',
      label: 'Saúde da Coluna',
      title: 'Tratamento da Coluna',
      icon: Sparkles,
      image: DOCTOR_PORTRAIT,
      points: [
        'Avaliação postural e diagnóstico de hérnias de disco',
        'Endoscopia de coluna e bloqueios facetários',
        'Reabilitação para dor lombar e cervical crônica'
      ]
    }
  ];

  const activePlan = TREATMENT_PLANS.find(p => p.id === activeTab) || TREATMENT_PLANS[0];

  return (
    <div className="min-h-screen bg-cream font-sans text-body overflow-x-hidden">

      {/* TOP UTILITY BAR — MedPro style: white/translucent, dark text */}
      <div className="hidden sm:block bg-white border-b border-[rgba(0,71,86,0.08)] text-body text-sm py-2.5">
        <div className="container-medpro flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Av. das Américas, 18250 - Sl 302, Recreio</span>
            </a>
            <a href="mailto:contato@orthorecreio.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span>contato@orthorecreio.com.br</span>
            </a>
          </div>
          <a href="https://wa.me/5521967691358" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="font-semibold">WhatsApp da Clínica</span>
          </a>
        </div>
      </div>

      {/* STICKY HEADER / NAVBAR */}
      <div className="sticky top-0 z-40 w-full pt-2 lg:pt-4 pb-2 lg:pb-4 px-2 lg:px-4">
        <div className="container-medpro">
          <header className="bg-white rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-[70px] px-4 lg:px-6 flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12">
                <img
                  src={LOGO_IMAGE}
                  alt="Ortho Recreio"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-heading tracking-tight">Ortho Recreio</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#especialidades" className="nav-link">Especialidades</a>
              <a href="#servicos" className="nav-link">Serviços</a>
              <a href="#sobre" className="nav-link">Sobre</a>
              <a href="#depoimentos" className="nav-link">Depoimentos</a>
              <a href="#contato" className="nav-link">Contato</a>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="tel:+5521967691358" className="flex items-center gap-2 text-heading font-bold hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                (21) 96769-1358
              </a>
              <button
                onClick={() => triggerBooking()}
                className="btn-primary h-[44px] w-[133px] text-[15px]"
              >
                Appointment
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-slate-200 text-heading hover:text-primary"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden container-medpro mt-2 bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-5 space-y-1">
                {['Home', 'Especialidades', 'Serviços', 'Sobre', 'Depoimentos', 'Contato'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-primary/10 text-heading font-semibold"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-slate-100">
                  <button onClick={() => triggerBooking()} className="btn-primary w-full justify-center">
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-2 lg:pt-4 pb-4 lg:pb-6 overflow-hidden">
        {/* MedPro hero gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#d4fffc] via-[#c9f9f6] to-[#f0fffe]" />

        <div className="container-medpro relative z-10">
          {/* Mobile compact hero */}
          <div className="lg:hidden flex flex-col items-center text-center pt-0 pb-2">
            <div className="text-[11px] font-semibold text-primary mb-1 tracking-wide">Bem-vindo à Ortho Recreio</div>
            <h1 className="text-[1.35rem] leading-[1.15] mb-2 max-w-[300px]">
              A clínica que cuida da sua vida em movimento
            </h1>

            <div className="flex flex-col items-center gap-2 mb-2 w-full">
              <button
                onClick={() => triggerBooking()}
                className="btn-primary h-[44px] w-[170px] text-[15px]"
              >
                Saiba Mais
              </button>
              <a href="tel:+5521967691358" className="flex items-center gap-2 text-heading">
                <div className="text-[11px] uppercase tracking-wider text-body text-left leading-tight">
                  <div>Para agendamento</div>
                  <div className="flex items-center gap-1.5 font-bold text-heading text-base">
                    <Phone className="w-4 h-4 text-primary" />
                    (21) 96769-1358
                  </div>
                </div>
              </a>
            </div>

            <div className="relative w-[180px] h-[180px] mb-2">
              <img
                src={HERO_IMAGE}
                alt="Dr. Jorge Mendonça — Ortopedista e Traumatologista"
                className="relative z-10 w-full h-full object-contain hero-glow"
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-white rounded-full shadow-md px-3 py-1.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs font-bold text-heading leading-tight text-left">
                Mais de 1.500 pacientes atendidos!
              </div>
            </div>
          </div>

          {/* Desktop hero */}
          <div className="hidden lg:flex flex-row items-end justify-between gap-6 h-[300px] pb-0">
            {/* Text content */}
            <div className="w-full max-w-[440px] text-left pb-8 pl-1">
              <div className="text-sm font-semibold text-primary mb-2 tracking-wide">Bem-vindo à Ortho Recreio</div>
              <h1 className="display-title text-[1.5rem] leading-[1.05] mb-4">
                A clínica que cuida da sua vida em movimento
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
                <button
                  onClick={() => triggerBooking()}
                  className="btn-primary h-[44px] px-10 text-[15px]"
                >
                  Saiba Mais
                </button>
                <a href="tel:+5521967691358" className="flex items-center gap-2 text-heading hover:text-primary transition-colors">
                  <div className="text-[11px] uppercase tracking-wider text-body text-left leading-tight">
                    <div>Para agendamento</div>
                    <div className="flex items-center gap-2 font-bold text-heading text-base">
                      <Phone className="w-4 h-4 text-primary" />
                      (21) 96769-1358
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative w-[420px] h-[300px] shrink-0 self-end overflow-visible">
              {/* Radial glow behind doctor */}
              <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[85%] h-[90%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] blur-sm pointer-events-none" />

              <img
                src={HERO_IMAGE}
                alt="Dr. Jorge Mendonça — Ortopedista e Traumatologista"
                className="relative z-10 w-full h-full object-cover object-bottom hero-glow"
              />

              {/* Floating badge */}
              <div className="absolute bottom-16 -left-2 z-20 bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-3 flex items-center gap-2 animate-float">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs font-bold text-heading leading-tight">
                  Mais de 1.500<br />pacientes atendidos!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TREATMENT / SPECIALTIES SECTION */}
      <section id="especialidades" className="py-4 lg:py-24 bg-primary relative overflow-hidden">
        <div className="container-medpro relative z-10">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 items-start">
            {/* Left text */}
            <div className="lg:max-w-[380px]">
              <h2 className="h2 text-white mb-1 text-[1.35rem] lg:text-[2.2rem] leading-snug">
                A Ortho Recreio se dedica a oferecer o melhor tratamento.
              </h2>
              <p className="text-white/80 text-sm lg:text-lg leading-snug hidden lg:block">
                Ortopedia avançada, reabilitação funcional e tecnologia de ponta.
              </p>
            </div>

            {/* Cards - MedPro style: image background + floating white box at bottom */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 h-auto">
              {[
                { spec: SPECIALTIES[0], image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop' },
                { spec: SPECIALTIES[1], image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=500&fit=crop' },
                { spec: SPECIALTIES[2], image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop' }
              ].map(({ spec, image }) => (
                <button
                  key={spec.id}
                  onClick={() => triggerBooking(spec.id)}
                  className="group relative h-[130px] lg:h-[220px] rounded-[12px] lg:rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[92%] bg-white rounded-[10px] lg:rounded-[12px] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-center transition-transform duration-300 group-hover:-translate-y-2">
                    <span className="text-[10px] lg:text-xs text-primary block mb-0 font-semibold">{spec.tags[0]}</span>
                    <h3 className="text-[11px] lg:text-sm font-bold text-heading leading-tight">{spec.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES MARQUEE SECTION — MedPro style: right-to-left carousel */}
      <section id="servicos" className="py-8 lg:py-16 bg-cream">
        <div className="container-medpro mb-4">
          <div className="text-center max-w-[570px] mx-auto">
            <div className="section-label justify-center mb-1">
              <span>Services & Treatments</span>
            </div>
            <h2 className="text-lg lg:text-[2.2rem] font-bold text-heading mb-1">
              Mais de 20 especialidades e serviços de saúde
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden mb-4 group">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            <div className="marquee-content">
              {[...SERVICES_CAROUSEL, ...SERVICES_CAROUSEL, ...SERVICES_CAROUSEL, ...SERVICES_CAROUSEL].map((item, idx) => (
                <button
                  key={`${item.title}-${idx}`}
                  onClick={() => triggerBooking(item.id)}
                  className="marquee-item group"
                >
                  <div className="service-icon-circle group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {getSpecialtyIcon(item.icon, 'w-6 h-6')}
                  </div>
                  <span className="text-xs font-bold text-heading group-hover:text-primary transition-colors text-center">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => triggerBooking()} className="btn-primary h-10 px-5 text-sm">
            Ver todos os Serviços
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="sobre" className="py-6 lg:py-10 bg-light-high text-white relative overflow-hidden">
        <div className="container-medpro">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch">
            {/* Differentials card */}
            <div className="card-white p-4 lg:p-6 lg:max-w-[400px]">
              <h3 className="text-base font-bold text-heading mb-3">Por que nos escolher?</h3>

              <div className="space-y-1.5">
                {[
                  { title: 'Segurança em primeiro lugar', desc: 'Protocolos rigorosos de biossegurança e esterilização.' },
                  { title: 'Foco no paciente', desc: 'Atendimento humanizado e acompanhamento próximo.' },
                  { title: 'Tecnologia de ponta', desc: 'Equipamentos modernos para diagnóstico preciso.' },
                  { title: 'Preço transparente', desc: 'Orçamento claro e honesto, sem surpresas.' },
                  { title: 'Cuidado coordenado', desc: 'Equipe multidisciplinar alinhada no plano de tratamento.' },
                  { title: 'Recuperação acelerada', desc: 'Fisioterapia integrada para você voltar a se mover.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <img
                      src="https://cdn.prod.website-files.com/6426aa53f075ab6c61341787/6426aa53f075abfad43417b3_Checkmark.svg"
                      alt="check"
                      className="w-5 h-5 mt-0.5 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-heading text-sm mb-0">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <h2 className="text-lg lg:text-2xl font-bold text-white mb-2">
                Dedicados a oferecer o melhor tratamento ortopédico.
              </h2>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-3">
                Na Ortho Recreio, unimos experiência clínica, tecnologia avançada e um ambiente acolhedor
                para cuidar da sua saúde articular, muscular e do seu bem-estar geral.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => triggerBooking()}
                  className="btn-secondary"
                >
                  Agendar Consulta
                </button>
                <a
                  href="https://wa.me/5521967691358"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  WhatsApp da Clínica
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH CHECKUP PLANS / TABS SECTION — MedPro style: vertical tabs left, content right */}
      <section className="py-6 lg:py-10 bg-light-low">
        <div className="container-medpro">
          <div className="text-center max-w-[600px] mx-auto mb-4">
            <h2 className="text-xl lg:text-[2.2rem] font-bold text-heading mb-1">Planos de Tratamento</h2>
            <p className="text-sm text-body">
              Protocolos personalizados para cada fase da sua recuperação.
            </p>
          </div>

          {/* Vertical tabs layout */}
          <div className="max-w-[900px] mx-auto bg-white rounded-[16px] lg:rounded-[20px] p-3 lg:p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              {/* Tabs — grid on mobile, vertical on desktop */}
              <div className="lg:w-[220px] grid grid-cols-2 gap-2">
                {TREATMENT_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setActiveTab(plan.id)}
                    className={`text-left px-2.5 lg:px-3 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                      activeTab === plan.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-[#f0fffe] text-heading hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <plan.icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs lg:text-sm">{plan.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-center">
                  <div className="lg:w-[40%]">
                    <img
                      src={activePlan.image}
                      alt={activePlan.title}
                      className="w-full h-[140px] lg:h-[220px] object-cover rounded-[12px] lg:rounded-[14px]"
                    />
                  </div>
                  <div className="lg:w-[60%]">
                    <h3 className="text-base lg:text-lg font-bold text-heading mb-1 lg:mb-2">{activePlan.title}</h3>
                    <p className="text-xs lg:text-sm text-body mb-2">
                      Cuidado completo do diagnóstico à reabilitação para você recuperar a mobilidade com segurança.
                    </p>
                    <div className="space-y-1 lg:space-y-2 mb-3 lg:mb-4">
                      {activePlan.points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-heading flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-xs lg:text-sm text-body">{point}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => triggerBooking()}
                      className="btn-primary h-9 px-4 text-sm"
                    >
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="depoimentos" className="py-5 lg:py-10 bg-light-high text-white relative overflow-hidden">
        <div className="container-medpro">
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-8">
            {/* Testimonial text */}
            <div className="lg:w-[55%]">
              <img
                src="https://cdn.prod.website-files.com/6426aa53f075ab6c61341787/6426aa53f075ab590b3417b7_Testimonial%20Quote.svg"
                alt="quote"
                className="w-7 h-7 mb-2 opacity-80"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <blockquote className="text-base lg:text-xl leading-snug mb-2 font-serif">
                    “{currentTestimonial.quote}”
                  </blockquote>
                  <div className="text-xs lg:text-sm">
                    <span className="font-bold text-white">{currentTestimonial.name}</span>
                    <span className="text-white/60"> — {currentTestimonial.age} anos • {currentTestimonial.condition}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={prevTestimonial}
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonialIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${activeTestimonialIdx === idx ? 'bg-primary' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Testimonial image/video placeholder */}
            <div className="lg:w-[45%] relative">
              <div className="relative w-[150px] h-[150px] lg:w-[260px] lg:h-[260px] mx-auto rounded-full overflow-hidden border-[3px] lg:border-[4px] border-white/20 shadow-2xl">
                <img
                  src={DOCTOR_PORTRAIT}
                  alt="Depoimento Ortho Recreio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contato" className="py-5 lg:py-10 bg-light-low">
        <div className="container-medpro">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-start">
            {/* Contact info */}
            <div className="lg:max-w-[420px]">
              <div className="section-label-light mb-1">Agendamento</div>
              <h2 className="text-base lg:text-2xl font-bold text-heading mb-1">Entre em contato para agendar sua consulta</h2>
              <p className="text-xs lg:text-sm text-body mb-2">
                Estamos no Recreio esperando por você de segunda a sábado.
              </p>

              <div className="space-y-2">
                <a href="tel:+5521967691358" className="flex items-center gap-3 text-heading hover:text-primary transition-colors">
                  <img
                    src="https://cdn.prod.website-files.com/6426aa53f075ab6c61341787/6426aa53f075ab29bc3417bd_Phone%20icon.svg"
                    alt="phone"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">(21) 96769-1358</span>
                </a>
                <a href="mailto:contato@orthorecreio.com.br" className="flex items-center gap-3 text-heading hover:text-primary transition-colors">
                  <img
                    src="https://cdn.prod.website-files.com/6426aa53f075ab6c61341787/6426aa53f075ab700c3417bc_mail%20Icon.svg"
                    alt="mail"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">contato@orthorecreio.com.br</span>
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="flex-1 w-full bg-white rounded-[16px] lg:rounded-[20px] p-3 lg:p-8 shadow-sm relative overflow-hidden">
              <form onSubmit={handleContactSubmit} className="space-y-2 relative z-10">
                <input
                  required
                  type="text"
                  placeholder="Nome"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="form-input h-10"
                />
                <input
                  required
                  type="tel"
                  placeholder="Telefone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="form-input h-10"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-input h-10"
                />
                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value)}
                  className="form-input h-10"
                >
                  <option value="">Tipo de Atendimento</option>
                  <option value="Ortopedia Adulto">Ortopedia Adulto</option>
                  <option value="Medicina Esportiva">Medicina Esportiva</option>
                  <option value="Saúde da Coluna">Saúde da Coluna</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                  <option value="Traumatologia">Traumatologia</option>
                </select>
                <textarea
                  rows={2}
                  placeholder="Mensagem"
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="form-input resize-none"
                />

                <AnimatePresence mode="wait">
                  {contactSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2 text-primary text-xs"
                    >
                      <ThumbsUp className="w-4 h-4 shrink-0" />
                      <span>Você será direcionado para o WhatsApp.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center h-10 text-sm"
                >
                  Enviar Mensagem
                </button>
              </form>
              {/* Decorative circle */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-primary/5" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — MedPro multi-column style */}
      <footer className="bg-light-high text-white py-6 lg:py-10">
        <div className="container-medpro">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <a href="#home" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={LOGO_IMAGE}
                    alt="Ortho Recreio"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">Ortho Recreio</span>
              </a>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => triggerBooking()}
                  className="btn-ghost justify-start py-2 px-3 text-sm"
                >
                  Agendar Consulta
                </button>
                <a
                  href="https://wa.me/5521967691358"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost justify-start py-2 px-3 text-sm"
                >
                  WhatsApp da Clínica
                </a>
              </div>
            </div>

            {/* Services — mobile accordion */}
            <div>
              <button
                onClick={() => setOpenFooterSections(prev => ({ ...prev, services: !prev.services }))}
                className="footer-heading w-full flex items-center justify-between lg:cursor-default"
              >
                Services
                <ChevronDown className="w-4 h-4 lg:hidden transition-transform" style={{ transform: openFooterSections.services ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${openFooterSections.services ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 lg:max-h-60 lg:opacity-100 lg:mt-0'}`}>
                {['Ortopedia Adulto', 'Medicina Esportiva', 'Saúde da Coluna', 'Traumatologia', 'Fisioterapia'].map((link) => (
                  <li key={link}>
                    <a href="#servicos" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health Checkup — mobile accordion */}
            <div>
              <button
                onClick={() => setOpenFooterSections(prev => ({ ...prev, checkup: !prev.checkup }))}
                className="footer-heading w-full flex items-center justify-between lg:cursor-default"
              >
                Health Checkup
                <ChevronDown className="w-4 h-4 lg:hidden transition-transform" style={{ transform: openFooterSections.checkup ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${openFooterSections.checkup ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 lg:max-h-60 lg:opacity-100 lg:mt-0'}`}>
                {['Check-up Ortopédico', 'Avaliação Postural', 'Reabilitação', 'Cirurgia Minimamente Invasiva', 'Terapia da Dor'].map((link) => (
                  <li key={link}>
                    <a href="#servicos" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links — mobile accordion */}
            <div>
              <button
                onClick={() => setOpenFooterSections(prev => ({ ...prev, links: !prev.links }))}
                className="footer-heading w-full flex items-center justify-between lg:cursor-default"
              >
                Quick Links
                <ChevronDown className="w-4 h-4 lg:hidden transition-transform" style={{ transform: openFooterSections.links ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${openFooterSections.links ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 lg:max-h-60 lg:opacity-100 lg:mt-0'}`}>
                {['Home', 'Especialidades', 'Sobre', 'Depoimentos', 'Contato'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Ortho Recreio. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSpecialtyId={modalSpecialtyPreset}
      />

    </div>
  );
}
