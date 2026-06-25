# Brief de Referência — MedPro (Webflow)

> Análise do template médico **MedPro** (`https://medpro-medical-template.webflow.io/`) com foco em padrões de UI/UX, seções, componentes, cores, tipografia e interações aplicáveis ao site **Ortho Recreio** (React + Tailwind).  
> **Nenhum código do Ortho Recreio foi alterado** — este documento é apenas pesquisa e referência.

---

## 1. Visão Geral do Site

- **Propósito:** Template de hospital/clínica médica com forte apelo institucional e conversão de agendamentos.
- **Estilo visual:** “Medical modern” — limpo, arejado, confiável, com bastante *white space*, cantos arredondados, fotos profissionais e ícones lineares.
- **Tom de voz:** Formal mas acolhedor. “Cuidado”, “humanidade”, “segurança” e “tecnologia de ponta”.
- **Hierarquia clara:** topo com contato → navegação → hero com CTA → tratamentos → serviços → diferenciais → planos → depoimentos → formulário → rodapé.

---

## 2. Paleta de Cores Extraída

As cores abaixo foram lidas via `getComputedStyle` no Chrome headless:

| Token | Valor | Uso observado |
|-------|-------|---------------|
| `--brand-primary` | `rgb(0, 160, 170)` — **teal/ciano** | botões primários, links ativos, ícones de destaque |
| `--brand-dark` | `rgb(0, 71, 86)` — **verde-petróleo escuro** | fundos de seções (why-us, depoimentos, footer), texto do footer |
| `--text-primary` | `rgb(8, 30, 41)` — **azul-petróleo muito escuro** | títulos H1-H6 |
| `--text-body` | `rgb(51, 51, 51)` / `rgb(52, 69, 79)` | corpo de texto e links de navegação |
| `--bg-soft` | `rgb(212, 255, 252)` — **menta bem claro**, `rgba(212,255,252,0.7)` | fundo geral da página e seção de contato |
| `--bg-section` | `rgb(240, 255, 254)` — **menta quase branco** | seção de serviços e planos |
| `--white` | `rgb(255, 255, 255)` | cards, navbar, texto sobre fundos escuros |
| `--muted` | `rgb(170, 173, 176)` | divisórias, detalhes |

### Gradientes utilizados
- Hero/superior: `linear-gradient(rgb(212, 255, 252), rgb(201, 249, 246) 75%)`.
- Sutil em seções: `linear-gradient(to right, rgb(240,255,254), rgba(255,255,255,0))`.

### Adaptação para Ortho Recreio
- Substituir o teal institucional por uma cor da identidade do consultório (ex.: azul-ortodontia, verde-água ou verde-clínica).
- Manter o **verde-petróleo escuro** como cor de contraste para seções de autoridade (depoimentos, footer, diferenciais).
- Preservar os fundos claros de menta para manter sensação de higiene e tranquilidade.

---

## 3. Tipografia

- **Família:** `Satoshi, sans-serif` (geometric sans moderna).
- **Para Tailwind:** usar `font-sans` com a fonte da marca ou intercambiar por **Inter / Geist / Satoshi** via `@import`/`next/font`.

| Nível | Tamanho | Peso | Altura de linha | Uso |
|-------|---------|------|-----------------|-----|
| H1 display | `70px` | 700 | `90px` | hero — título principal |
| H2 | `46px` | 700 | `64px` | títulos de seção |
| H3 (`.h3`) | `32px` | 700 | `46px` | subseções |
| H3 (`.h4`) | `26px` | 700 | `38px` | cards/destaques |
| H3 (`.h5`) | `20px` | 700 | `32px` | títulos menores de card |
| Corpo | `14-16px` | 400 | `20-22px` | parágrafos e navegação |
| Botões | `15-17px` | 700 | — | CTA |

### Padrões de hierarquia
- **Overline em caixa alta e teal:** “SERVICES & TREATMENTS”, “APPOINTMENT”.
- **Título escuro e pesado** logo abaixo.
- **Body em cinza** com leitura confortável.

### Adaptação
- Reduzir H1 para `text-4xl md:text-5xl lg:text-6xl` para mobile-first.
- Manter H2 em `text-3xl md:text-4xl`.
- Usar `uppercase tracking-widest text-sm text-brand` para overlines.

---

## 4. Seções e Componentes Identificados

A página possui aproximadamente **6.322 px** de altura total e as seguintes seções principais (extraídas via DOM):

### 4.1 Top utility bar
- **Conteúdo:** endereço físico, e-mail e WhatsApp com ícones pequenos.
- **Estilo:** barra fina, ícones SVG, texto pequeno (`14px`), provavelmente com fundo branco ou transparente.
- **Uso Ortho:** ideal para telefone, endereço e WhatsApp fixos no topo.

### 4.2 Header / Navbar
- **Layout:** fixo ou sticky, container branco arredondado, sombra sutil.
- **Componentes:**
  - Logo (ícone + texto “Medpro”).
  - Links: Home, About, Health Checkup, Doctors, Departments.
  - Link de telefone + botão “Appointment” (`primary-btn`).
- **Estado ativo:** link ativo em teal (`rgb(0,160,170)`), peso 700.
- **Botão primário:** `bg-[rgb(0,160,170)] text-white rounded-[3px] px-[15px] py-[8px] font-bold`.
- **Adaptação:**
  - Usar `sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm`.
  - Botão de agendamento no navbar: `bg-brand text-white hover:bg-brand-dark transition`.

### 4.3 Hero Section
- **Layout:** 2 colunas — texto à esquerda, foto profissional à direita sobrepondo um círculo/cápsula de fundo gradiente.
- **Elementos:**
  - Overline: “Welcome to Medpro Healthcare” (teal).
  - H1: “The hospital that cares for life and humanity”.
  - CTA primário: “Discover More”.
  - CTA secundário: “FOR APPOINTMENT 1800-657-876”.
  - Badge flutuante: “More than 20K Patients treated!” com ícone de coração.
- **Foto:** médico de jaleco branco, sorrindo, com estetoscópio.
- **Adaptação:**
  - Substituir por foto da clínica/ortodontista.
  - Badge pode virar “+X pacientes atendidos” ou “Desde 20XX”.
  - CTA principal: “Conheça os Tratamentos” / “Agende sua Consulta”.

### 4.4 Treatment Section (cards de especialidade)
- **Fundo:** teal sólido (`rgb(0,160,170)`).
- **Título branco:** “Medpro Healthcare is dedicated to provide best treatment.”
- **Cards:** grade de 3 cards verticais com imagem arredondada + caixa branca flutuante sobrepondo a parte inferior.
  - Cada card: mini overline, título da especialidade, botão “Discover More”.
  - Especialidades: Pediatrician, Cardiologist, Dermatologist.
- **Interação:** provável hover com scale/sombra.
- **Adaptação:**
  - Especialidades odontológicas: Ortodontia, Implantes, Estética Dental, Endodontia, etc.
  - Card com `rounded-2xl overflow-hidden shadow-lg`.
  - Overlay de texto com `bg-white` arredondado e `shadow`.

### 4.5 Services Section
- **Fundo:** menta quase branco (`rgb(240,255,254)`).
- **Overline:** “SERVICES & TREATMENTS”.
- **Título:** “More than 40 specialty and health care services”.
- **Componente:** ícones circulares/rounded + rótulo de serviço em grade (General Health, Mental Health, Vaccination, Eye Diseases, Cardiology…).
- **CTA:** botão “See all Services”.
- **Adaptação:**
  - Criar grade de ícones para serviços odontológicos ( Clareamento, Aparelho, Lente de Contato, Prótese, etc.).
  - Ícones podem ser SVG simples ou Lucide (`Stethoscope`, `Smile`, `Scan`, etc.).

### 4.6 Why Choose Us / Diferenciais
- **Layout:** duas áreas:
  - **Card branco flutuante** com “Why Choose Us?” + lista de checkmarks (Safety First, Patient-Centric, Cutting-Edge, Transparent Pricing, Coordinated Care).
  - **Seção escura** abaixo/ao lado com H1 branco e CTA secundário.
- **Ícones:** círculos teal com checkmark branco.
- **Fundo escuro:** `rgb(0,71,86)`.
- **Adaptação:**
  - Lista de diferenciais do Ortho Recreio: atendimento humanizado, tecnologia digital, equipe especializada, ambiente confortável, preço transparente.

### 4.7 Health Checkup Plans (abas)
- **Layout:** 2 colunas — abas à esquerda, conteúdo à direita.
- **Abas:** “Woman Health”, “Cancer Screening”, “Kids Vaccines”.
- **Conteúdo ativo:** imagem da categoria + H2 + parágrafo + lista com checkmarks + CTA.
- **Interação:** tabs com transição suave.
- **Adaptação:**
  - Transformar em “Planos de Tratamento” ou “Fases do Tratamento Ortodôntico”.
  - Tabs: Aparelho Fixo, Aparelho Invisível, Alinhadores, Infantil.

### 4.8 Testimonial Section
- **Fundo escuro** (`rgb(0,71,86)`).
- **Carrossel/slider** de depoimentos com:
  - Ícone de aspas grande.
  - Foto do paciente (circular).
  - Citação, nome e tipo de paciente (“Mr. Williams — Diabetes Patient”).
- **Adaptação:**
  - Usar depoimentos de pacientes reais do Ortho Recreio com fotos.
  - Componente `TestimonialSlider` simples com `useState`.

### 4.9 Contact Section / Formulário de Agendamento
- **Fundo:** menta claro (`rgb(212,255,252)`).
- **Layout 2 colunas:**
  - Esquerda: overline “APPOINTMENT”, H2, parágrafo, telefone e e-mail com ícones.
  - Direita: card branco com formulário (Name, Phone, Email, Select Appointment Type, Message, Submit Now).
- **Formulário:** inputs com bordas claras, cantos arredondados, sombra no card.
- **Adaptação:**
  - Formulário de contato do Ortho Recreio com campos: nome, telefone, e-mail, especialidade de interesse, mensagem.
  - Integração futura com WhatsApp ou backend.

### 4.10 Footer
- **Fundo escuro** (`rgb(0,71,86)`).
- **Colunas:**
  - Logo branco + 2 CTAs ghost (“Take an Appointment”, “Connect on Whatsapp”).
  - Links agrupados: SERVICES, HEALTH CHECKUP, DEPARTMENTS, QUICK LINKS.
- **Bottom bar:** copyright + ícones sociais (Facebook, Pinterest, Twitter, Instagram).
- **Adaptação:**
  - CTAs ghost: “Agende pelo WhatsApp” e “Marque uma Avaliação”.
  - Grupos de links: Serviços, Tratamentos, Departamentos, Institucional.

---

## 5. Componentes Reutilizáveis (React + Tailwind)

| Componente | Descrição rápida |
|------------|------------------|
| `<TopBar />` | Barra fina com endereço, e-mail, WhatsApp e ícones. |
| `<Navbar />` | Sticky, logo, links de navegação, telefone, botão CTA. |
| `<HeroSection />` | 2 colunas, overline, H1, CTA, imagem profissional, badge flutuante. |
| `<SpecialtyCards />` | Grid de cards com imagem + overlay de texto + CTA. |
| `<ServicesGrid />` | Ícones + labels em grid responsivo. |
| `<WhyUsSection />` | Card branco com lista de diferenciais + fundo escuro com CTA. |
| `<TabsPlans />` | Abas verticais/horizontais com imagem e lista de benefícios. |
| `<TestimonialSlider />` | Carrossel de depoimentos com foto, aspas, nome. |
| `<ContactForm />` | Card com formulário + coluna de contato. |
| `<Footer />` | Multi-colunas, CTAs ghost, links, social, copyright. |
| `<PrimaryButton />` | `bg-brand text-white rounded font-bold hover:bg-brand-dark`. |
| `<GhostButton />` | `border border-current text-white hover:bg-white/10`. |
| `<IconCheck />` | Círculo brand com checkmark branco para listas. |

---

## 6. Interações e Micro-interações Sugeridas

- **Hover em botões primários:** escurecer cor (`hover:bg-[rgb(0,71,86)]`) + `transition-colors duration-200`.
- **Hover em cards:** `hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow`.
- **Navbar sticky:** `bg-white/90 backdrop-blur-md` ao rolar (use `useScroll` ou listener simples).
- **Tabs:** transição de opacidade/altura ao trocar abas.
- **Depoimentos:** botões de navegação ou autoplay pausável.
- **Badge flutuante no hero:** leve animação de “float” com `animate-bounce` sutil ou `@keyframes` custom.
- **Links do menu:** underline ou mudança de cor no hover; link ativo em brand.

---

## 7. Imagens e Screenshots Capturadas

Screenshots full-page foram geradas via Chrome headless (browser-harness) e estão em:

```
/home/nexo-operator/.openclaw/workspace/ortho-recreio/screenshots/
```

Arquivos principais:

| Arquivo | Posição | Conteúdo visível |
|---------|---------|------------------|
| `medpro_scroll_01_y0.png` | Topo | Top bar, navbar, hero com médico e badge |
| `medpro_scroll_02_y1200.png` | ~1.200 px | Treatment section (cards de especialidades) |
| `medpro_scroll_03_y2400.png` | ~2.400 px | Why Choose Us + fundo escuro com CTA |
| `medpro_scroll_04_y3600.png` | ~3.600 px | Health Checkup Plans (tabs) |
| `medpro_scroll_05_y4800.png` | ~4.800 px | Depoimentos + início do formulário |
| `medpro_scroll_06_y5600.png` | ~5.600 px | Formulário de contato + footer |

> Os screenshots podem ser visualizados localmente; eles servem como prova visual dos padrões descritos acima e podem ser usados pela equipe de design/dev do Ortho Recreio.

---

## 8. Checklist de Implementação Prática

- [ ] Definir paleta Tailwind no `tailwind.config.js` (`brand`, `brand-dark`, `bg-soft`, `text-heading`).
- [ ] Importar fonte sans moderna (Inter/Geist/Satoshi).
- [ ] Criar tokens de tipografia (`text-display`, `text-section`, `text-body`).
- [ ] Implementar `<TopBar />` e `<Navbar />` sticky.
- [ ] Refatorar hero com foto da clínica e CTA de agendamento.
- [ ] Criar componente de cards de especialidades com hover.
- [ ] Criar grid de serviços com ícones SVG/Lucide.
- [ ] Criar seção “Por que escolher Ortho Recreio” com lista de diferenciais.
- [ ] Criar componente de tabs para planos/tratamentos.
- [ ] Criar slider de depoimentos.
- [ ] Criar formulário de contato em card branco.
- [ ] Criar footer multi-colunas com CTAs ghost e links.
- [ ] Adicionar micro-interações (hover, scroll, transições).

---

## 9. Notas Finais

- O site MedPro é um template Webflow pronto para uso; os padrões são simples, bem estruturados e facilmente replicáveis em React + Tailwind.
- A maior oportunidade para Ortho Recreio é **manter a sensação clínica/limpa** (cores claras, fotos profissionais, hierarquia tipográfica forte) enquanto **substitui conteúdo médico-hospitalar por conteúdo odontológico/ortodôntico**.
- A conversão é guiada por CTAs repetidos (“Appointment”, “Take an Appointment”, “Connect on WhatsApp”) — recomenda-se replicar essa estratégia em múltiplos pontos da página.

---

*Brief gerado em 19/06/2026 por análise automatizada do site MedPro com browser-harness + visão computacional.*
