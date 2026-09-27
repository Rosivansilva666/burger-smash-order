# Burger Smash Order

# BURGUER AMOSTRA
> Prompt gerado pela CRIE.AI a partir do modelo "Sistema para Hamburgueria". Build exactly what is described below, in this order of priority.

---

## 1. PROJECT BRIEF
- **Name:** BURGUER AMOSTRA
- **What it is:** Pedidos de hambúrgueres personalizados com adicionais e combos.
- **Problem it solves:** Pedidos errados, dificuldade de comunicar preferências.
- **Target audience:** Hamburguerias artesanais, smash burgers, food trucks.
- **Type:** Full-stack application with login, database and back-end
- **Language of every visible text:** Português (BR)

---

## 2. DESIGN SYSTEM (SOURCE OF TRUTH)
Everything visual in this project follows this section. If any later instruction conflicts with it, this section wins.

- **Visual style:** Dark mode. Dark interface with high contrast: near-black background, bold primary accents, strong typography.
- **Primary color:** #facc14
- **Secondary color:** #e31c1c
- **Display font (headings, brand, buttons):** Bebas Neue
- **Body font (paragraphs, forms):** Inter
- Implement all colors as HSL tokens in index.css (--background, --foreground, --primary, --secondary, --muted, --border) mapped in tailwind.config.ts. Never hardcode colors in components.
- Load both fonts from Google Fonts in index.html and map them as font-display and font-sans.
- Create an SVG logo for "BURGUER AMOSTRA" (initials or a simple mark) that matches this identity. Show it in the header and footer.

### BRAND DIRECTION (EDITABLE STARTING POINT)

**Arquétipo:** Smashburger americano de rua, energia Shake Shack + Smash Bros NY, masculino, suculento, sem firula.
**Referências reais a imitar:** shakeshack.com, smashburger.com, fivequys.com, bullguer.com.br

#### User-selected palette (authoritative)
- Primary: #facc14
- Secondary: #e31c1c
- Derive accessible background, foreground, muted and border tokens from these colors.

#### Tipografia OBRIGATÓRIA (Google Fonts)
- **Display (títulos, marca, CTAs):** Bebas Neue
- **Body (parágrafos, descrições, formulários):** Inter

Importe via `<link>` no `index.html` e mapeie no `tailwind.config.ts` como
`font-display` e `font-sans` respectivamente.

#### Tom de voz do copy
Direto, masculino, gírias de hambúrguer (smash, blend, ponto, suco). Sem adjetivos floreados. Frases curtas, all caps no display.

#### Copy pronto pra usar (substitua {{NOME_PROJETO}})
- **Headline do banner:** "SMASH. SUCULENTO. BRASILEIRO."
- **Subheadline:** "Blend bovino prensado na chapa, queijo derretendo, pão brioche tostado. Pedido em 2 toques."
- **CTA primário:** "BORA PEDIR"
- **CTA secundário:** "VER CARDÁPIO"
- **Banner de cupom:** "Cupom PRIMEIRACOMPRA: 10% off no seu primeiro pedido "
- **Carrinho vazio:** "Seu carrinho tá vazio. Que tal um Smash Classic?"
- **Botão final WhatsApp:** "ENVIAR PEDIDO NO WHATSAPP"

Use these user-editable texts as the source of truth while preserving the niche tone.
Nunca use emoji ou travessão (—) em nenhum desses textos.

### FLUXO OBRIGATÓRIO: "MENU FIRST" (cardápio digital)

Este é um cardápio digital de delivery/retirada, NÃO uma landing page de marketing.
O usuário entra, vê o cardápio na cara, escolhe, paga. Ponto.

**Ordem das seções na home (de cima pra baixo, single page scroll):**

1. **Header sticky compacto** (h-16, máx h-20)
 - Logo SVG + nome da marca à esquerda
 - Badge "Aberto agora" verde / "Fechado" vermelho à direita
 - Horário e endereço em texto pequeno
 - Backdrop blur sutil no scroll (NÃO glassmorphism leitoso)

2. **Banner da marca** (h-[35vh] a h-[45vh], NUNCA maior)
 - Foto hero do produto carro-chefe gerada por IA
 - Overlay escuro com 1 headline curto + 1 subhead
 - 1 CTA único levando ao cardápio
 - Sem badges flutuantes, sem 7 elementos. Limpo.

3. **Banner de cupom ativo** (faixa h-12, cor primária da marca)
 - Texto do cupom (vem do brandCopy.couponBanner)
 - Botão "Copiar código" inline

4. **Categorias sticky horizontal** (logo abaixo do header quando o scroll passa do banner)
 - Scroll horizontal com emoji + nome
 - Categoria ativa com fundo da cor primária e texto contrastante
 - Auto-scroll do conteúdo ao clicar

5. **Grid de produtos por categoria** (sections empilhadas)
 - Mobile: 1 coluna full-bleed | Tablet: 2 colunas | Desktop: 3 colunas
 - Card: foto 4:3 grande à esquerda OU no topo, nome em display font, descrição 2 linhas, preço grande à direita, botão "+" circular pra adicionar rapidamente
 - Hover desktop: leve scale 1.02, sombra suave
 - Skeleton loader enquanto imagens carregam

6. **Modal de produto** (Dialog shadcn, max-w-lg, animação slide-up no mobile)
 - Foto 16:9 no topo, fechar X
 - Nome, descrição completa
 - Adicionais com Checkbox + preço lateral
 - Variações (tamanho/borda/leite) com RadioGroup visual
 - Campo "Observações" (Textarea, placeholder específico do nicho)
 - Stepper de quantidade (-/+)
 - Botão sticky no rodapé do modal: "Adicionar ao pedido: R$XX,XX" (preço atualiza em tempo real)

7. **Carrinho flutuante** (FAB fixed bottom-right md:bottom-6)
 - Badge com nº de itens, pulse animation ao adicionar
 - Mostra o total atual
 - Esconde quando o Sheet do carrinho está aberto

8. **Sheet do Carrinho** (Sheet shadcn, side="right" no desktop, side="bottom" no mobile com h-[90vh])
 - Lista editável (miniatura, nome, adicionais resumidos, obs, qtd ±, subtotal, lixeira)
 - Toggle Entrega/Retirada (RadioGroup visual)
 - Se Entrega: Select de bairro com taxa, campo Endereço
 - Campo cupom com botão "Aplicar" e feedback verde/vermelho
 - Resumo: subtotal, desconto, taxa, **TOTAL** em destaque
 - Form de cliente: Nome, Telefone (máscara (XX) XXXXX-XXXX), Forma de pagamento (RadioGroup: PIX, Dinheiro, Cartão), campo Troco se Dinheiro
 - Botão final cor primária full-width: "Enviar pedido no WhatsApp"
 - Ao clicar, monta o texto do pedido (formato definido em INTEGRAÇÃO WHATSAPP) e abre wa.me/<numero>?text=<texto encoded>

9. **Footer minimalista**
 - Logo + nome + endereço + horários por dia da semana
 - Ícones de redes sociais (Instagram, WhatsApp)
 - Copyright

#### SEÇÕES PROIBIDAS NESTE FLUXO
- Sem "Testimonials" / "O que dizem nossos clientes"
- Sem "About Us" / "Nossa história" longo (máximo 2 linhas no footer)
- Sem "Newsletter" / captura de email
- Sem "Features" estilo SaaS com 3 cards de benefícios
- Sem "Equipe / Nossos chefs"
- Sem múltiplos CTAs no banner: apenas 1

### PROIBIDO NESTE TEMPLATE (anti-cara-de-IA)

If an item below conflicts with a color or font the user chose explicitly, the user's choice wins. Everything else still applies.

- NUNCA usar gradiente roxo/azul. Paleta é preto + amarelo mostarda + vermelho ketchup.
- NUNCA usar fonte serifada elegante. Display é Anton (condensada, all caps).
- NUNCA usar seção Testimonials, About Us, Newsletter. É cardápio, não landing page.
- NUNCA usar hero >50vh com texto poético. Banner é compacto (≤40vh), cardápio na cara.
- NUNCA usar ícones genéricos Lucide pra ilustrar produtos. SEMPRE foto gerada.
- NUNCA usar glassmorphism leitoso. O fundo é preto profundo, contraste duro.
- Emoji em qualquer lugar do copy ou como ícone de interface.
- Travessão (—) em qualquer texto visível.

**Regra de ouro:** se isso aqui ficar com cara de "site gerado por IA genérico
(roxo + gradient + Inter + glassmorphism + emoji + travessão)", está ERRADO.
Tem que ter cara de smashburger americano de rua, energia shake shack + smash bros ny, masculino, suculento, sem firula..

### PADRÕES DE EXECUÇÃO (cross-template)

- Tokens HSL em `index.css` + mapeamento em `tailwind.config.ts`. NUNCA cores hardcoded em componente.
- Componentes pequenos (≤150 linhas).
- Imagens importadas como ES6 modules de `src/assets/`.
- Preços via `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`.
- Animações via Framer Motion: fade+slide ao entrar viewport (stagger 0.05s).
- Skeleton loaders durante carregamento de listas e imagens.
- Touch targets ≥44px no mobile.
- WhatsApp via `https://wa.me/<numero>?text=<encoded>`, nunca `api.whatsapp.com`.
- Logo SVG inline no header (gerar geométrico/iniciais coerente com a marca).
- Nunca use emoji como ícone ou decoração. Nunca use travessão (—) no copy visível, use ponto, vírgula ou dois-pontos.

---

## 3. CONTENT
Use these texts exactly as written.
- **Headline:** "SMASH. SUCULENTO. BRASILEIRO."
- **Subheadline:** "Blend bovino prensado na chapa, queijo derretendo, pão brioche tostado. Pedido em 2 toques."
- **Primary button:** "BORA PEDIR"
- **Secondary button:** "VER CARDÁPIO"
- Never use emoji or em dashes in any visible text.

---

## 4. SCREENS AND FLOW
### ARQUITETURA DE INTERFACE

**Layout Single Page (scroll contínuo):**

1. **Header sticky** (z-50, glassmorphism):
 - Logo (ícone + nome com gradiente fire)
 - Horário de funcionamento (18:00 - 23:00)
 - Badge "Aberto" / "Fechado" (verde/vermelho)

2. **Hero Banner** (min-h-[70vh]):
 - Imagem de fundo: hambúrguer artesanal hiper-realista gerada por IA
 - Overlay gradiente escuro (legibilidade)
 - Título impactante com gradiente fire
 - Subtítulo descritivo
 - Banner de cupom animado
 - CTA "Ver Cardápio" com seta bounce

3. **Navegação de categorias** (sticky abaixo do header):
 - Scroll horizontal com ícones: Lanches | Combos | Acompanhamentos | Bebidas | Sobremesas
 - Categoria ativa com gradiente e glow

4. **Grid de produtos** (responsivo):
 - Mobile (< 640px): 1 coluna | Tablet: 2 colunas | Desktop: 3-4 colunas
 - Cards com hover lift + shadow + imagem apetitosa

5. **Modal de produto** (Dialog, max-w-lg):
 - Imagem 16:9 no topo
 - Nome, descrição, preço base
 - Adicionais com checkbox + preço individual
 - Campo observações ("Ex: sem cebola, mal passado...")
 - Seletor quantidade (+/-)
 - Botão "Adicionar ao Carrinho" com preço total em tempo real
 - Animação de confirmação (check verde)

6. **Carrinho flutuante** (fixed bottom-right):
 - Badge com contagem animada
 - Pulse ao adicionar item
 - Valor total atualizado

7. **Cart Sheet** (Sheet lateral direita):
 - Lista de itens editáveis com miniatura, adicionais, obs, qtd, subtotal
 - Toggle Entrega/Retirada
 - Dropdown bairro com taxa
 - Campo cupom com validação visual
 - Subtotal + desconto + taxa = **TOTAL**
 - Botão "Enviar pelo WhatsApp"

8. **Checkout** (dentro do Sheet):
 - Nome, telefone (máscara), endereço, bairro, pagamento (PIX/Dinheiro/Cartão)
 - Campo "Troco para" (se Dinheiro)
 - Resumo final
 - Tempo estimado total

---

## 5. FEATURES
1. **Monte seu hambúrguer**
2. **Ponto da carne**
3. **Adicionais ilimitados**
4. **Combos promocionais**
5. **Painel da cozinha**
6. **Programa fidelidade**

Each feature is fully working, with realistic sample data. No placeholders, no "coming soon".

#### PRODUTOS CADASTRADOS

#### Lanches (6)
| ID | Nome | Descrição | Preço | Tempo |
|----|------|-----------|-------|-------|
| smash-classic | Smash Classic | Blend bovino 120g smash style, queijo cheddar, cebola, picles e molho especial | R$28,90 | 15min |
| smash-bacon | Smash Bacon | Blend bovino 120g, bacon crocante, queijo cheddar derretido e molho barbecue | R$32,90 | 15min |
| smash-bbq | Smash BBQ | Blend bovino 120g, onion rings, queijo cheddar, bacon e molho barbecue defumado | R$34,90 | 18min |
| monster-smash | Monster Smash | Duplo blend 240g, duplo cheddar, bacon crocante, cebola crispy e molho monster | R$42,90 | 20min |
| smash-trufado | Smash Trufado | Blend bovino 120g, queijo brie, cogumelos salteados e azeite trufado | R$38,90 | 18min |
| smash-picante | Smash Picante | Blend bovino 120g, pimenta biquinho, jalapeño, queijo pepper jack e molho sriracha | R$33,90 | 15min |

#### Combos (4)
| ID | Nome | Descrição | Preço | Tempo |
|----|------|-----------|-------|-------|
| combo-classic | Combo Classic | Smash Classic + Batata Frita + Refrigerante 350ml | R$45,90 | 18min |
| combo-bacon | Combo Bacon | Smash Bacon + Batata Frita com Cheddar + Refrigerante 350ml | R$52,90 | 18min |
| combo-duplo | Combo Duplo | 2x Smash Classic + Batata Grande + 2 Refrigerantes 350ml | R$79,90 | 22min |
| combo-monster | Combo Monster | Monster Smash + Batata com Bacon e Cheddar + Milkshake | R$69,90 | 25min |

#### Acompanhamentos (4)
| ID | Nome | Descrição | Preço | Tempo |
|----|------|-----------|-------|-------|
| batata-frita | Batata Frita | Porção de batata frita crocante com sal e temperos especiais | R$16,90 | 10min |
| batata-bacon | Batata com Bacon e Cheddar | Batata frita coberta com cheddar derretido e bacon crocante | R$24,90 | 12min |
| onion-rings | Onion Rings | Anéis de cebola empanados super crocantes com molho especial | R$19,90 | 10min |
| queijo-empanado | Queijo Empanado | Sticks de queijo mussarela empanados e fritos na hora | R$21,90 | 8min |

#### Bebidas (6)
| ID | Nome | Descrição | Preço | Tempo |
|----|------|-----------|-------|-------|
| coca-350 | Coca-Cola 350ml | Lata gelada | R$7,90 | 1min |
| coca-600 | Coca-Cola 600ml | Garrafa gelada | R$10,90 | 1min |
| guarana | Guaraná 350ml | Lata gelada | R$6,90 | 1min |
| milkshake-choc | Milkshake Chocolate | Cremoso com chantilly | R$18,90 | 5min |
| milkshake-mor | Milkshake Morango | Cremoso com calda e chantilly | R$18,90 | 5min |
| milkshake-ovo | Milkshake Ovomaltine | Cremoso com pedaços crocantes | R$19,90 | 5min |

#### Sobremesas (3)
| ID | Nome | Descrição | Preço | Tempo |
|----|------|-----------|-------|-------|
| brownie | Brownie com Sorvete | Brownie quentinho com sorvete de creme e calda | R$22,90 | 8min |
| churros | Churros Recheado | Churros crocante recheado com doce de leite e canela | R$14,90 | 6min |
| petit | Petit Gâteau | Bolo de chocolate com coração derretido e sorvete | R$26,90 | 10min |

#### Adicionais disponíveis por item
| Adicional | Preço |
|-----------|-------|
| Bacon Crocante | +R$5,00 |
| Queijo Cheddar Extra | +R$4,00 |
| Ovo | +R$3,00 |
| Cebola Caramelizada | +R$4,00 |
| Molho Especial | +R$3,00 |
| Jalapeño | +R$3,00 |

### INTEGRAÇÃO WHATSAPP

**Número configurável:** `5511999999999`

**Formato da mensagem:**
```
 *NOVO PEDIDO: {{NOME_PROJETO}}*

 *Cliente:* [Nome]
 *Telefone:* [Telefone]
 *Tipo:* [Entrega / Retirada]
 *Endereço:* [Endereço completo]
 *Bairro:* [Bairro] (Taxa: R$X,XX)

━━━━━━━━━━━━━━━━━
 *ITENS DO PEDIDO:*

1⃣ *[Produto]* x[Qtd]
 [Adicional 1] (+R$X,XX)
 Obs: [observação]
 Subtotal: R$XX,XX

━━━━━━━━━━━━━━━━━
 *Subtotal:* R$XX,XX
 *Cupom:* [CÓDIGO] (-X%)
 *Taxa de entrega:* R$X,XX
 *TOTAL: R$XX,XX*

 *Pagamento:* [Forma]
 *Tempo estimado:* ~XXmin
```

### CUPONS DISPONÍVEIS

| Código | Desconto |
|--------|----------|
| PRIMEIRACOMPRA | 10% |
| FOME15 | 15% |
| MEGA20 | 20% |
| LIVE10 | 10% |

### TAXAS DE ENTREGA POR BAIRRO

| Bairro | Taxa |
|--------|------|
| Centro | R$5,00 |
| Jardins | R$7,00 |
| Moema | R$12,00 |
| Pinheiros | R$8,00 |
| Vila Madalena | R$9,00 |
| Itaim Bibi | R$10,00 |
| Brooklin | R$11,00 |
| Vila Olímpia | R$10,00 |

---

## 6. IMAGES
- **Image style:** Fotos reais. Photorealistic photography with natural light.
### IMAGE DIRECTION

- Requested style: Fotos reais.
- Use relevant, inspectable imagery of the actual product, service, place or outcome; avoid generic atmospheric stock imagery.
- Additional direction: hyperreal food photography, smashburger close-up, 50mm f/2.8, dark moody studio lighting, shallow DOF, melted American cheese drip on the side, sesame-brioche bun, charred crust beef patty, parchment paper, no plate, top-down 3/4 angle, contrast pop, no human hands, no text

### PRODUCT IMAGES (CRITICAL)

Todas as imagens DEVEM ser geradas por IA seguindo o estilo fotográfico do nicho.

- **Prompt-base (use literalmente, trocando apenas o item):**
 `hyperreal food photography, smashburger close-up, 50mm f/2.8, dark moody studio lighting, shallow DOF, melted American cheese drip on the side, sesame-brioche bun, charred crust beef patty, parchment paper, no plate, top-down 3/4 angle, contrast pop, no human hands, no text`
- Aspect ratio: 16:9 para hero, 4:3 para cards de produto, 1:1 para thumbs do carrinho.
- NUNCA use ilustrações, cartoon, 3D estilizado, clip-art ou ícones Lucide pra ilustrar produtos.
- NUNCA peça fotos com mãos humanas, texto na imagem ou marca d'água.
- Cada produto recebe sua própria imagem gerada, não reutilize a mesma foto.

---

## 7. BACK-END
- **Authentication:** email and password, with separate client (/app) and admin (/admin) areas. Redirect each user type after login and block cross access.
- **Database:** one table per core entity (Monte seu hambúrguer, Ponto da carne, Adicionais ilimitados, Combos promocionais, Painel da cozinha, Programa fidelidade), plus `profiles` (id, name, email, role, created_at) and `settings` (key, value, updated_at).
- **Security:** Row Level Security on every table. Users only read and write their own rows; admins manage everything.
- **Scope:** Sistema completo com personalização e painel admin.
- Seed each table with realistic demo data so the first login already looks alive.

---

## 8. TECHNICAL SPECIFICATIONS
- **Platform:** Lovable
- React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React icons, Sonner toasts.
- Supabase (Auth, Database, RLS) with React Query for data.
- Small focused components (up to about 150 lines). Prices with toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }). Dates as DD/MM/AAAA.

---

## 9. QUALITY BAR
- Fully responsive from 375px phones to wide desktops.
- Loading, empty and error states on every list, form and async action.
- Real-time form validation with clear messages next to each field.
- Visual feedback on every interaction: hover, press, success toast.
- Friendly error handling: no raw errors, always a next step for the user.
- Accessible: semantic HTML, visible focus, 4.5:1 text contrast, 44px touch targets.

### DELIVERY QUALITY STANDARD

- Build the actual site or application described above, not a marketing explanation of it.
- Treat every explicit user choice as authoritative. Precedence: user customization > template suggestion > generic default.
- Keep all visible copy in Português (BR); technical implementation instructions may remain in English.
- Use semantic design tokens for colors, spacing, radii and shadows. Do not scatter hardcoded colors across components.
- Use a cohesive type scale, accessible contrast, semantic HTML, keyboard navigation and visible focus states.
- Mobile-first at 375px, then validate tablet and desktop. No horizontal overflow, clipped values or overlapping controls.
- Every interaction must have complete default, hover, focus, loading, empty, success, error and disabled states when applicable.
- Use real domain-specific content. Never use lorem ipsum, fake controls, dead buttons or “coming soon”.
- Prefer focused reusable components and preserve the platform's existing project conventions.
- Never use emoji anywhere in visible copy or as interface icons. Use a proper icon component (e.g. Lucide) instead.
- Never use em dashes (—) in visible copy. Use a period, comma or colon instead, whichever reads most naturally.
- Write plain, direct sentences. Avoid generic marketing filler and avoid inventing testimonials, ratings or claims that were not provided.

### SECURITY AND DATA REQUIREMENTS

- Enforce authentication and authorization server-side for every sensitive operation.
- Enable RLS on every user or organization data table; scope access with auth.uid() and never trust a client-supplied user_id.
- Keep roles in a separate role table and validate privileged actions server-side.
- Validate and bound all server inputs; sanitize rendered user content and keep secrets server-side only.
- Add rate limiting to authentication, AI, invitation, checkout and webhook endpoints.
- Webhooks require signature validation, replay protection and idempotency.
- Record security-relevant actions in an audit log without secrets or sensitive payloads.

---

## 10. ACCEPTANCE CHECKLIST
- [ ] All 5 screens exist and the main flow works end to end
- [ ] All 6 features work with realistic sample data
- [ ] Design matches the design system: colors as tokens, both fonts loaded, logo in header and footer
- [ ] Headline, subheadline and buttons use the exact texts from the content section
- [ ] Looks right at 375px, 768px and 1440px
- [ ] No emoji, no em dashes, no placeholder text anywhere
- [ ] Login works, RLS is on for every table, each user sees only their data

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ffcbf218-e37f-44fc-bd8f-f5bc3c7e11be).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
