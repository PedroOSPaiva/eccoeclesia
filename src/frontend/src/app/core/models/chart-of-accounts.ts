export interface ChartAccountOption {
  code: string;
  name: string;
  nature: 'INCOME' | 'EXPENSE';
}

export const CHART_OF_ACCOUNTS: ChartAccountOption[] = [
  // --- RECEITAS (1.x.xx) ---
  { code: '1.1.01', name: '1.1.01 - Dízimos Paroquiais', nature: 'INCOME' },
  { code: '1.1.02', name: '1.1.02 - Ofertas de Missa e Culto', nature: 'INCOME' },
  { code: '1.1.03', name: '1.1.03 - Contribuição Mensal de Fiéis', nature: 'INCOME' },
  { code: '1.1.04', name: '1.1.04 - Campanhas Paroquiais', nature: 'INCOME' },
  { code: '1.1.05', name: '1.1.05 - Intenções de Missa', nature: 'INCOME' },
  { code: '1.1.06', name: '1.1.06 - Batizados e Celebrações', nature: 'INCOME' },
  { code: '1.1.07', name: '1.1.07 - Casamentos e Matrimônios', nature: 'INCOME' },
  { code: '1.1.08', name: '1.1.08 - Catequese e Inscrições', nature: 'INCOME' },
  { code: '1.1.09', name: '1.1.09 - Coletas Especiais da Diocese', nature: 'INCOME' },
  { code: '1.1.10', name: '1.1.10 - Doações Diversas', nature: 'INCOME' },
  { code: '1.2.01', name: '1.2.01 - Festas, Quermesses e Bingos', nature: 'INCOME' },
  { code: '1.2.02', name: '1.2.02 - Almoços, Jantares e Cantina', nature: 'INCOME' },
  { code: '1.2.03', name: '1.2.03 - Eventos e Encontros Paroquiais', nature: 'INCOME' },
  { code: '1.3.01', name: '1.3.01 - Aluguéis e Cessão de Espaço', nature: 'INCOME' },
  { code: '1.4.01', name: '1.4.01 - Subvenções e Doações de Entidades', nature: 'INCOME' },
  { code: '1.5.01', name: '1.5.01 - Serviços Pastorais (Bênçãos, Exéquias)', nature: 'INCOME' },
  { code: '1.7.01', name: '1.7.01 - Outras Receitas / Ressarcimentos', nature: 'INCOME' },

  // --- DESPESAS (2.x.xx) ---
  { code: '2.1.01', name: '2.1.01 - Água, Energia, Gás e Internet', nature: 'EXPENSE' },
  { code: '2.1.02', name: '2.1.02 - Material de Escritório e Impressos', nature: 'EXPENSE' },
  { code: '2.1.03', name: '2.1.03 - Tarifas Bancárias e Taxas de Cartão', nature: 'EXPENSE' },
  { code: '2.1.04', name: '2.1.04 - Licenças de Software e Suporte de TI', nature: 'EXPENSE' },
  { code: '2.2.01', name: '2.2.01 - Salários de Funcionários e Pró-labore', nature: 'EXPENSE' },
  { code: '2.2.02', name: '2.2.02 - Encargos Sociais e Trabalhistas (INSS/FGTS)', nature: 'EXPENSE' },
  { code: '2.2.03', name: '2.2.03 - Benefícios (Vale Transporte, Alimentação)', nature: 'EXPENSE' },
  { code: '2.3.01', name: '2.3.01 - Materiais Litúrgicos (Hóstias, Vinho, Velas)', nature: 'EXPENSE' },
  { code: '2.3.02', name: '2.3.02 - Pastoral da Música e Liturgia', nature: 'EXPENSE' },
  { code: '2.3.03', name: '2.3.03 - Catequese, Bíblia e Evangelização', nature: 'EXPENSE' },
  { code: '2.4.01', name: '2.4.01 - Ação Social e Caridade (Cestas Básicas)', nature: 'EXPENSE' },
  { code: '2.5.01', name: '2.5.01 - Manutenção Predial e Pequenos Reparos', nature: 'EXPENSE' },
  { code: '2.5.02', name: '2.5.02 - Limpeza, Conservação e Jardinagem', nature: 'EXPENSE' },
  { code: '2.6.01', name: '2.6.01 - Combustível e Transporte Pastoral', nature: 'EXPENSE' },
  { code: '2.7.01', name: '2.7.01 - Custos de Festas, Quermesses e Alimentos', nature: 'EXPENSE' },
  { code: '2.8.01', name: '2.8.01 - Tributos, Taxas Municipais e Alvarás', nature: 'EXPENSE' },
  { code: '2.9.01', name: '2.9.01 - Obras, Reformas e Pinturas', nature: 'EXPENSE' },
  { code: '2.10.01', name: '2.10.01 - Comunicação, Pastoral da Comunicação e Site', nature: 'EXPENSE' }
];
