import { Specialty, Doctor, Testimonial, PostureQuestion } from './types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'sports',
    title: 'Medicina Esportiva',
    shortDesc: 'Performance e reabilitação avançada para atletas.',
    longDesc: 'Focalizado em restaurar a performance atlética máxima e prevenir novas lesões. Tratamento especializado de ligamentos (LCA/LCP), tendinopatias crônicas, terapia regenerativa e fisiologia do movimento adaptável.',
    iconName: 'Activity',
    tags: ['Regeneração', 'Alta Performance', 'Atletas']
  },
  {
    id: 'spine',
    title: 'Saúde da Coluna',
    shortDesc: 'Abordagens modernas para dores e disfunções vertebrais.',
    longDesc: 'Tratamentos minimamente invasivos (como endoscopia de coluna e bloqueios facetários) para hérnias de disco, escoliose e dor lombar crônica. Cuidado integrado focado em evitar grandes cirurgias tradicionais.',
    iconName: 'Sparkles',
    tags: ['Endoscopia', 'Lombalgia', 'Não-Invasivo']
  },
  {
    id: 'trauma',
    title: 'Traumatologia de Urgência',
    shortDesc: 'Atendimento imbatível para fraturas e lesões agudas.',
    longDesc: 'Resolução ortopédica ágil para fraturas, luxações e lesões articulares de início abrupto. Dispomos de imobilizações termoplásticas modernas (à prova d\'água, leves e respiráveis) de última geração.',
    iconName: 'Flame',
    tags: ['Gesso Moderno', 'Fraturas', 'Plantão']
  },
  {
    id: 'joints',
    title: 'Próteses & Articulações',
    shortDesc: 'Artroplastia reconstrutiva e substituição de quadris e joelhos.',
    longDesc: 'Artroplastias de quadril e joelho com próteses importadas de altíssima durabilidade. Protocolos de rápida recuperação cirúrgica para que o paciente caminhe logo no primeiro dia pós-operatório.',
    iconName: 'ShieldAlert',
    tags: ['Artroplastia', 'Prótese Importada', 'Mobilidade']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-gabriel',
    name: 'Dr. Gabriel Menezes',
    role: 'Especialista em Joelho & Medicina Esportiva',
    crm: 'CRM-RJ 52.98453-2',
    specialtyId: 'sports',
    avatar: 'GM',
    bio: 'Ex-médico do departamento de alto rendimento de futebol profissional, mestre em reconstruções ligamentares complexas com pós-graduação nos EUA.',
    availableDays: ['Seg', 'Qua', 'Sex'],
    availableHours: ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00']
  },
  {
    id: 'dra-sofia',
    name: 'Dra. Sofia Alencar',
    role: 'Especialista em Endoscopia de Coluna & Escoliose',
    crm: 'CRM-RJ 52.87114-5',
    specialtyId: 'spine',
    avatar: 'SA',
    bio: 'Pioneira em cirurgias vertebrais por vídeo minimamente invasivas na Zona Oeste. Dedicada a restaurar a postura natural e eliminar dores na coluna lombar e cervical.',
    availableDays: ['Ter', 'Qui'],
    availableHours: ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30']
  },
  {
    id: 'dr-lucas',
    name: 'Dr. Lucas Castanhari',
    role: 'Especialista em Quadril, Joelho e Trauma Complexo',
    crm: 'CRM-RJ 52.45612-9',
    specialtyId: 'joints',
    avatar: 'LC',
    bio: 'Doutor em Ortopedia Reconstrutiva e referência em artroplastias primárias e de revisão. Especialista na aplicação de gesso termoplástico 3D respirável em fraturas esportivas.',
    availableDays: ['Seg', 'Ter', 'Qui'],
    availableHours: ['08:30', '10:00', '11:30', '15:00', '16:30']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Júlia Mendes',
    age: 34,
    condition: 'Reconstrução de LCA (Joelho)',
    quote: 'Depois da cirurgia com o Dr. Gabriel, achei que não voltaria a correr maratonas. Sete meses depois, completei os 21km na Barra da Tijuca totalmente livre de dor. O acolhimento é de outro mundo!',
    avatarSeed: 'julia',
    rating: 5
  },
  {
    id: 't2',
    name: 'Ronaldo Albuquerque',
    age: 63,
    condition: 'Artroplastia Total de Quadril',
    quote: 'Eu não conseguia andar da sala para a cozinha sem tomar remédios fortes. O processo cirúrgico com Dr. Lucas foi tão tecnológico que me levantei no dia seguinte. Hoje curto minhas caminhadas no Recreio normalmente.',
    avatarSeed: 'ronaldo',
    rating: 5
  },
  {
    id: 't3',
    name: 'Patrícia Soares',
    age: 47,
    condition: 'Hérnia de Disco Lombar',
    quote: 'Sofria de dores de cabeça e crises que travavam minha perna. Dra. Sofia realizou uma endoscopia de coluna sem dor, com apenas um pontinho nas costas. Voltei para casa no mesmo dia. Espetacular!',
    avatarSeed: 'patricia',
    rating: 5
  },
  {
    id: 't4',
    name: 'Thiago Nogueira',
    age: 26,
    condition: 'Fratura de Punho (Kitesurf)',
    quote: 'Quebrei o rádio velejando no Recreio. Fui atendido de imediato e me apresentaram a imobilização de plástico moderna, leve e que permite tomar banho de mar sem estragar o gesso. Salvou minhas férias!',
    avatarSeed: 'thiago',
    rating: 5
  }
];

export const POSTURE_QUESTIONS: PostureQuestion[] = [
  {
    id: 'q1',
    text: 'Permaneço sentado na frente do computador ou na mesma posição por mais de 5 horas diariamente.',
    scoreImpact: 20
  },
  {
    id: 'q2',
    text: 'Sinto dores localizadas ou sensação de rigidez na lombar ou pescoço ao me levantar pela manhã.',
    scoreImpact: 25
  },
  {
    id: 'q3',
    text: 'Costumo utilizar o celular com a cabeça bastante inclinada para baixo por longos períodos.',
    scoreImpact: 15
  },
  {
    id: 'q4',
    text: 'Pratico atividades físicas físicas (musculação, pilates, cárdio) menos de 2 vezes por semana.',
    scoreImpact: 20
  },
  {
    id: 'q5',
    text: 'Carrego mochilas, malas pesadas ou bolsas apoiadas em apenas um ombro no dia a dia.',
    scoreImpact: 20
  }
];
