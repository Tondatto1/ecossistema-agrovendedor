import { DeliveryItem } from '../types/ecosystem';

export const CORE_ECOSYSTEM_INFO = {
  title: 'ECOSSISTEMA AGROVENDEDOR',
  subtitle: 'Educação e Tecnologia',
  tagline: 'O organismo vivo que integra tecnologia, metodologia, capacitação contínua e inteligência para transformar o agronegócio em máquinas previsíveis de vendas.',
  pillars: [
    'Inteligência Artificial Ativa',
    'Metodologia Comercial Validada',
    'Educação Contínua e Escala',
    'Direcionamento Executivo Estratégico',
  ],
};

export const DELIVERIES_DATA: DeliveryItem[] = [
  {
    id: 'agente-cerutti',
    code: 'AC-01',
    name: 'Agente Cerutti',
    tagline: 'Inteligência Artificial & Automação Comercial 24/7',
    category: 'ai',
    shortDescription: 'Agente cognitivo com IA especializado em vendas para qualificar, atender instantaneamente e nutrir oportunidades em tempo real.',
    fullDescription: 'O Agente Cerutti é a ponta de lança tecnológica do ecossistema. Desenvolvido com algoritmos avançados de processamento de linguagem natural e treinado na metodologia proprietária de vendas, ele atua no primeiro contato com o lead em menos de 3 segundos. Qualifica critérios técnicos e orçamentários, agenda reuniões automaticamente e municia os closers humanos com diagnósticos prévios completos.',
    color: {
      primary: '#0284c7', // Sky Blue
      accent: '#10b981',  // Emerald Green
      badgeBg: 'rgba(2, 132, 199, 0.15)',
      glow: 'rgba(56, 189, 248, 0.45)',
    },
    iconName: 'Bot',
    metrics: [
      { label: 'Tempo de Resposta', value: '< 3s', detail: 'Atendimento instantâneo no WhatsApp e Web' },
      { label: 'Aumento na Conversão', value: '+42%', detail: 'Aproveitamento de leads de topo e meio de funil' },
      { label: 'Disponibilidade', value: '24/7/365', detail: 'Sem filas, pausas ou perda de oportunidades noturnas' },
    ],
    keyFeatures: [
      'Qualificação automatizada através de critérios metodológicos (SPIN & BANT)',
      'Integração nativa com CRMs corporativos e plataformas de mensageria',
      'Agendamento automático sincronizado com a agenda dos closers',
      'Follow-up inteligente e cadenciado com tom de voz humanizado e persuasivo',
      'Dossiê executivo enviado ao consultor antes de cada reunião',
    ],
    deliverables: [
      {
        title: 'Implementação e Treinamento do Agente',
        description: 'Mapeamento do tom de voz institucional, matriz de objeções frequentes e parametrização nos canais de entrada da empresa.',
      },
      {
        title: 'Integração de Pipeline & Webhooks',
        description: 'Conexão direta com CRM, gerando atualização em tempo real de status, anotações de conversa e gravação de histórico.',
      },
      {
        title: 'Dashboard de Performance de IA',
        description: 'Métricas de taxa de resposta, volume de qualificados, retenção em conversa e tempo médio até o fechamento de agenda.',
      },
    ],
    synergies: ['campeao-vendas', 'plataforma-ead', 'programa-campeao'],
    idealFor: 'Empresas com volume constante de leads que perdem vendas pela lentidão no primeiro contato ou sobrecarga da equipe comercial.',
    businessImpact: 'Elimina o desperdício de investimento em mídia e garante que todo lead qualificado chegue quente à mão do closer.',
    redirectUrl: 'https://lp.ceruti.ia.br',
    orbitPosition: { x: -340, y: -70 },
    pipelinePosition: { x: -440, y: -60 },
    synapsePosition: { x: -380, y: -160 },
  },
  {
    id: 'programa-campeao',
    code: 'PC-02',
    name: 'Incompany - Campeão em Vendas',
    tagline: 'Capacitação Intensiva & Alinhamento de Equipes Comerciais',
    category: 'program',
    shortDescription: 'Programa prático de aceleração in-company que alinha discurso, postura e rituais operacionais para transformar equipes comuns em campeãs.',
    fullDescription: 'O programa Incompany - Campeão em Vendas é a esteira prática de transformação de times. Não se trata de uma palestra motivacional genérica, mas de um programa imersivo estruturado em sprints táticas. A metodologia é aplicada no dia a dia da operação com roleplays gravados, auditoria de ligações reais e estabelecimento de rituais de liderança que geram disciplina e tração contínua.',
    color: {
      primary: '#059669', // Emerald
      accent: '#38bdf8',  // Light Blue
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      glow: 'rgba(16, 185, 129, 0.45)',
    },
    iconName: 'Target',
    metrics: [
      { label: 'Crescimento de Faturamento', value: '+35%', detail: 'Aumento médio de faturamento após os primeiros 90 dias' },
      { label: 'Redução de Ciclo de Venda', value: '-28%', detail: 'Diminuição do tempo entre o primeiro contato e o fechamento' },
      { label: 'Taxa de Retenção do Time', value: '92%', detail: 'Engajamento de profissionais e redução de turnover comercial' },
    ],
    keyFeatures: [
      'Treinamento imersivo com dinâmicas de roleplay em cenários reais da empresa',
      'Padronização da cadência de prospecção, qualificação e fechamento',
      'Módulo de liderança comercial para coordenadores, gerentes e diretores',
      'Matriz de contorno de objeções customizada para o nicho de mercado',
      'Plano de incentivos, rituais diários (dailies) e semanais de pipeline',
    ],
    deliverables: [
      {
        title: 'Workshops Práticos e Imersivos',
        description: 'Sessões executivas ao vivo com foco em simulações, quebra de objeções complexas e refinamento de pitch comercial.',
      },
      {
        title: 'Cadência Operacional de Vendas',
        description: 'Estruturação dos rituais de acompanhamento: matinais de alinhamento, 1on1 de funil e retrospectivas de conversão.',
      },
      {
        title: 'Manual de Execução da Equipe',
        description: 'Documentação prática com checklists diários de atividades e critérios de passagem de bastão entre pré-vendas e vendas.',
      },
    ],
    synergies: ['campeao-vendas', 'plataforma-ead', 'mentoria-individual'],
    idealFor: 'Empresas com equipes de vendas que oscilam em performance, dependem de 1 ou 2 vendedores estrela e precisam de consistência coletiva.',
    businessImpact: 'Transforma o talento individual em processo repetível, aumentando a receita média por vendedor de forma sustentável.',
    redirectUrl: 'https://lp-pdc.agrovendedor.com.br/',
    isFlagship: true,
    flagshipLabel: 'Carro-Chefe',
    orbitPosition: { x: -280, y: 135 },
    pipelinePosition: { x: -160, y: 80 },
    synapsePosition: { x: -260, y: 190 },
  },
  {
    id: 'campeao-vendas',
    code: 'CV-03',
    name: 'Campeão em Vendas',
    tagline: 'O Método Proprietário & Playbook Estratégico Definitivo',
    category: 'methodology',
    shortDescription: 'O framework comercial consolidado: scripts validados, matrizes de decisão, gatilhos de fechamento e processos comprovados.',
    fullDescription: 'Campeão em Vendas é a espinha dorsal científica do ecossistema. É o método proprietário testado e validado em centenas de negociações de alto valor. Ele estrutura cada segundo da interação com o cliente: desde a abordagem inicial até a negociação final. Transforma o processo de vendas de um ato intuitivo e imprevisível em uma ciência exata de condução do cliente até a decisão de compra.',
    color: {
      primary: '#1d4ed8', // Royal Blue
      accent: '#10b981',  // Emerald Green
      badgeBg: 'rgba(29, 78, 216, 0.15)',
      glow: 'rgba(59, 130, 246, 0.45)',
    },
    iconName: 'Award',
    metrics: [
      { label: 'Conversão em Proposta', value: '48%', detail: 'Taxa média de fechamento sobre propostas apresentadas' },
      { label: 'Previsibilidade de Caixa', value: '94%', detail: 'Acurácia de previsão no fechamento mensal de pipeline' },
      { label: 'Ticket Médio', value: '+40%', detail: 'Valorização da proposta sem ceder a descontos predatórios' },
    ],
    keyFeatures: [
      'Playbook comercial completo em formato digital editável e vivo',
      'Matriz de perguntas estratégicas para diagnóstico de dores latentes',
      'Framework de negociação baseada em valor percebido e ancoragem',
      'Gatilhos psicológicos de urgência e escassez éticos e profissionais',
      'Scripts cirúrgicos para mais de 30 tipos diferentes de objeções de preço e prazo',
    ],
    deliverables: [
      {
        title: 'Playbook Comercial Customizado',
        description: 'Documento mestre contendo todas as etapas da jornada comercial, roteiros detalhados e diretrizes inegociáveis.',
      },
      {
        title: 'Biblioteca de Scripts & Matrizes de Objeções',
        description: 'Roteiros de quebra de objeções mapeados especificamente para o posicionamento e diferenciais da empresa.',
      },
      {
        title: 'Critérios de Qualificação Rígidos',
        description: 'Regras claras para desqualificação ágil de leads sem fit, poupando centenas de horas da equipe de vendas.',
      },
    ],
    synergies: ['agente-cerutti', 'programa-campeao', 'plataforma-ead', 'mentoria-individual'],
    idealFor: 'Negócios que querem profissionalizar o setor comercial e eliminar o improviso, criando uma máquina de vendas replicável.',
    businessImpact: 'Garante margem de lucro saudável ao eliminar a guerra de descontos e colocar a empresa em posição de autoridade.',
    redirectUrl: 'https://lp-21em7.agrovendedor.com.br/',
    orbitPosition: { x: 0, y: -215 },
    pipelinePosition: { x: 0, y: -120 },
    synapsePosition: { x: 0, y: -240 },
  },
  {
    id: 'plataforma-ead',
    code: 'EAD-04',
    name: 'Plataforma EAD',
    tagline: 'Ecossistema Digital de Aprendizagem & Treinamento Contínuo',
    category: 'platform',
    shortDescription: 'Ambiente digital exclusivo com trilhas gamificadas, microlearning e certificações para garantir treinamento escalável e onboarding rápido.',
    fullDescription: 'A Plataforma EAD é o pilar de perenidade do ecossistema. Permite que o conhecimento e os padrões da empresa permaneçam vivos mesmo com o crescimento ou rotatividade da equipe. Novos vendedores concluem o processo de onboarding em tempo recorde, enquanto veteranos consom pílulas de reciclagem e atualizações de produtos sem interromper a rotina produtiva.',
    color: {
      primary: '#0d9488', // Teal
      accent: '#38bdf8',  // Cyan
      badgeBg: 'rgba(13, 148, 136, 0.15)',
      glow: 'rgba(20, 184, 166, 0.45)',
    },
    iconName: 'GraduationCap',
    metrics: [
      { label: 'Ramp-up de Vendedores', value: '21 dias', detail: 'Redução de 90 para 21 dias até a primeira venda consistente' },
      { label: 'Retenção de Aprendizado', value: '84%', detail: 'Metodologia de microlearning com fixação comprovada' },
      { label: 'Acesso Multi-dispositivo', value: '100%', detail: 'Mobile, tablet e desktop disponível a qualquer momento' },
    ],
    keyFeatures: [
      'Trilhas de conhecimento customizadas por função (SDR, BDR, Closer, Gestor)',
      'Aulas objetivas de 5 a 12 minutos focadas em aplicação prática',
      'Simulados interativos com feedback de desempenho imediato',
      'Certificação com emissão de selo interno de competência',
      'Dashboard gerencial de progresso para monitoramento pela liderança',
    ],
    deliverables: [
      {
        title: 'Ambiente EAD Parametrizado',
        description: 'Plataforma com identidade visual corporativa, acessos individuais e organização de módulos estruturados.',
      },
      {
        title: 'Acervo de Módulos & Casos de Sucesso',
        description: 'Conteúdo em vídeo, materiais complementares em PDF, checklists e gravações de negociações modelo.',
      },
      {
        title: 'Relatórios de Engajamento e Conclusão',
        description: 'Visão executiva das notas, tempo dedicado e taxas de conclusão de cada membro do time comercial.',
      },
    ],
    synergies: ['programa-campeao', 'campeao-vendas', 'mentoria-individual'],
    idealFor: 'Empresas em expansão que precisam contratar e treinar novos vendedores de forma rápida sem sobrecarregar os líderes.',
    businessImpact: 'Escala a capacitação a custo marginal zero e protege o patrimônio intelectual de vendas da organização.',
    redirectUrl: 'https://lp-ead.agrovendedor.com.br/',
    orbitPosition: { x: 280, y: 135 },
    pipelinePosition: { x: 220, y: 80 },
    synapsePosition: { x: 260, y: 190 },
  },
  {
    id: 'mentoria-individual',
    code: 'MI-05',
    name: 'Mentoria Individual',
    tagline: 'Acompanhamento Executivo One-on-One & Estratégia de Alto Impacto',
    category: 'mentorship',
    shortDescription: 'Orientação executiva direta e personalizada para auditar o funil, calibrar metas, resolver gargalos complexos e acelerar decisões.',
    fullDescription: 'A Mentoria Individual é o mais alto nível de profundidade do ecossistema. Voltada para fundadores, diretores comerciais e líderes-chave, consiste em sessões individuais e confidenciais de diagnóstico tático e estratégico. O mentor analisa dados reais de CRM, ouve reuniões com grandes contas, calibra modelos de comissionamento e atua como conselheiro tático para ultrapassar barreiras de crescimento.',
    color: {
      primary: '#2563eb', // Indigo Blue
      accent: '#10b981',  // Emerald Green
      badgeBg: 'rgba(37, 99, 235, 0.15)',
      glow: 'rgba(99, 102, 241, 0.45)',
    },
    iconName: 'UserCheck',
    metrics: [
      { label: 'Diagnóstico de Funil', value: '48h', detail: 'Mapeamento minucioso dos 3 maiores vazamentos de receita' },
      { label: 'Retorno sobre Investimento', value: '8.4x', detail: 'Média de ROI reportada pelos líderes mentorados em 6 meses' },
      { label: 'Acesso Direto', value: 'VIP', detail: 'Canal prioritário para alinhamento de negociações estratégicas' },
    ],
    keyFeatures: [
      'Sessões one-on-one com foco estrito em metas de faturamento e margem',
      'Auditoria de pipeline e diagnóstico de perdas ocultas no CRM',
      'Análise crítica e escuta de gravações de negociações de alto ticket',
      'Estruturação de planos de remuneração variável e metas desafiadoras',
      'Canal de suporte tático para dúvidas em fechamentos complexos',
    ],
    deliverables: [
      {
        title: 'Diagnóstico Executivo 360°',
        description: 'Relatório completo de maturidade comercial com plano de ação prioritário em 30, 60 e 90 dias.',
      },
      {
        title: 'Sessões Estratégicas Periódicas',
        description: 'Reuniões executivas com pautas orientadas a metas, destravamento de contas-chave e governança.',
      },
      {
        title: 'Plano de Aceleração e KPI Scorecard',
        description: 'Painel com indicadores essenciais de tração, previsibilidade e margem operacional ajustada.',
      },
    ],
    synergies: ['campeao-vendas', 'programa-campeao', 'agente-cerutti'],
    idealFor: 'Líderes e empresários que precisam de um olhar externo experiente para desbloquear o próximo estágio de escala da empresa.',
    businessImpact: 'Evita erros de milhões de reais e acelera em anos a maturidade da gestão comercial do negócio.',
    redirectUrl: 'https://agrovendedor.com.br/',
    orbitPosition: { x: 340, y: -70 },
    pipelinePosition: { x: 440, y: -60 },
    synapsePosition: { x: 380, y: -160 },
  },
];

export const SYNERGY_COMBOS = [
  {
    title: 'Aceleração de Topo a Fundo (IA + Execução)',
    components: ['agente-cerutti', 'campeao-vendas', 'programa-campeao'],
    multiplier: '+165%',
    highlight: 'Volume de oportunidades qualificadas multiplicado por vendedores treinados para converter sem desconto.',
  },
  {
    title: 'Máquina Escalável de Equipe (EAD + Programa + Método)',
    components: ['plataforma-ead', 'programa-campeao', 'campeao-vendas'],
    multiplier: '+210%',
    highlight: 'Onboarding 4x mais rápido com alinhamento contínuo da equipe e método padronizado.',
  },
  {
    title: 'Ecossistema Integral 360° (Todos os 5 Componentes)',
    components: ['agente-cerutti', 'programa-campeao', 'campeao-vendas', 'plataforma-ead', 'mentoria-individual'],
    multiplier: '+320%',
    highlight: 'Organismo comercial autônomo, previsível e altamente lucrativo com IA, cultura e direcionamento executivo.',
  },
];
