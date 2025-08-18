<template>
  <header :class="headerClasses" :style="headerStyles">
    <nav class="flex items-center justify-between">
      <TheHeaderBrand :brand="brand" />

      <TheHeaderNavigation :iconColor="iconColor" />

      <TheHeaderAvatar :user="user" :profileItems="profileItems" />
    </nav>
  </header>

  <AppBackdrop
    v-if="backdropState.visible"
    :z-index="backdropState.zIndex"
    @click="closeBackdrop"
  />
</template>

<script setup lang="ts">
import {ref, computed, provide} from 'vue'
import type {Brand} from '@/types'
import TheHeaderBrand from './TheHeaderBrand.vue'
import TheHeaderNavigation from './TheHeaderNavigation.vue'
import TheHeaderAvatar from './TheHeaderAvatar.vue'
import AppBackdrop from '@/components/AppBackdrop.vue'
import {useNavigationStore} from '@/composables/useNavigationStore.ts'

const navigationStore = useNavigationStore()

const backdropState = ref({
  visible: false,
  zIndex: 9999
})

function showBackdrop(zIndex = 9999) {
  backdropState.value = {
    visible: true,
    zIndex
  }
}

function closeBackdrop() {
  backdropState.value.visible = false
}

provide('headerBackdrop', {
  show: showBackdrop,
  close: closeBackdrop,
  state: backdropState
})

const brand = ref<Brand>({
  logo: 'https://eletrods.me.com.br/logo.svg',
  link: 'https://me.com.br',
  newTab: true,
  background: {
    // primaryColor: '#343434',
    // secondaryColor: '#009900',
    // iconColor: 'peachPuff'
    // repeatImage: 'https://conteudo.imguol.com.br/c/home/46/2020/03/02/balaio-do-kotscho-150-1583157444753_100x100.jpg.webp',
    // mainImage: 'https://conteudo.imguol.com.br/c/noticias/90/2019/04/01/leonardo-sakamoto-1554157201028_v2_100x100.jpg.webp',
  }
})

const user = ref({
  name: 'Renato Dias',
  role: 'Developer',
  acronym: 'RD',
  badge: {
    variant: 'danger',
    icon: 'me-icon-l icon-exclamation'
  }
})

const profileItems = ref([
  {
    label: 'Profile',
    click: () => console.log('Profile'),
    icon: {
      class: 'me-icon-l icon-user-alt',
      color: 'var(--me-primary-1)'
    }
  },
  {
    label: 'Change Password',
    url: '#',
    icon: {
      class: 'me-icon-l icon-key',
      color: 'var(--me-warning-2)'
    }
  },
  {
    label: 'Português (pt-BR)',
    active: true,
    children: [
      {label: 'Espanhol (es-MX)', url: '#'},
      {label: 'Francês (fr-FR)', click: () => console.log('French')},
      {label: 'Inglês (en-US)', url: '#'},
      {label: 'Português (pt-PT)', url: '#'}
    ]
  },
  {
    label: 'Logoff',
    url: '#'
  }
])

navigationStore.setNavigationItems([
  {
    id: '5',
    linkName: 'DASHBOARD',
    visible: true,
    label: 'Dashboard',
    icon: 'me-icon-l icon-objects-column',
    url: '/dashboard/',
    target: null,
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '6',
    linkName: null,
    visible: true,
    label: null,
    icon: null,
    url: null,
    target: null,
    active: false,
    siteMap: false,
    separator: true,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '7',
    linkName: 'HOME',
    visible: true,
    label: 'Transações',
    icon: 'me-icon-l icon-file-import',
    url: '/home',
    target: null,
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '8',
    linkName: 'SUPPLIER',
    visible: true,
    label: 'Fornecedores',
    icon: 'me-icon-l icon-store',
    url: '/supplier/search',
    target: null,
    active: true,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null,
    click: () => console.log('Fornecedores')
  },
  {
    id: '9',
    linkName: 'PRODUCT',
    visible: true,
    label: 'Catálogos',
    icon: 'me-icon-l icon-shopping-bag',
    url: '/product/',
    target: null,
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '10',
    linkName: 'USER',
    visible: true,
    label: 'Usuários',
    icon: 'me-icon-l icon-users',
    url: '/user/',
    target: null,
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '11',
    linkName: 'MORE',
    visible: true,
    label: 'Mais',
    icon: 'me-icon-l icon-ellipsis-stroke',
    url: null,
    target: null,
    active: false,
    siteMap: true,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '12',
    linkName: null,
    visible: true,
    label: null,
    icon: null,
    url: null,
    target: null,
    active: false,
    siteMap: false,
    separator: true,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '13',
    linkName: 'BOOST',
    visible: true,
    label: 'ME Boost',
    icon: 'me-icon-l icon-chart-mixed',
    url: 'https://analytics.meboost.com.br/_/boost/jbs/app/kibana#/dashboards?_g=()',
    target: '_blank',
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl: null,
    badgeEvent: null
  },
  {
    id: '14',
    linkName: 'MESSAGES',
    visible: true,
    label: 'Mensagens',
    icon: 'me-icon-l icon-comments',
    url: '/chat',
    target: null,
    active: false,
    siteMap: false,
    separator: false,
    badgeTotalUrl:
      'https://trunk.api.web.mercadoe.com/chat-api-bff/v1/messages/unread',
    badgeEvent: null
  }
])

navigationStore.setSiteMapItems([
  {
    id: '2',
    name: '1',
    description: 'Painel de Controle',
    url: '',
    children: [
      {
        id: '3',
        name: '1_1',
        description: 'Compras',
        url: '/Mercado.asp',
        children: []
      },
      {
        id: '4',
        name: '1_2',
        description: 'Vendas',
        url: '/MeuMercadoVendas.asp',
        children: []
      },
      {
        id: '5',
        name: '1_5',
        description: 'Vendas (Projetos)',
        url: '/ME/PainelControleVendasProjetos.aspx',
        children: []
      }
    ]
  },
  {
    id: '6',
    name: '2',
    description: 'Usuários',
    url: '',
    children: [
      {
        id: '7',
        name: '2_0',
        description: 'Usuários',
        url: '/user/',
        children: []
      },
      {
        id: '8',
        name: '2_1',
        description: 'Perfis',
        url: '/ME/Perfil.aspx',
        children: []
      },
      {
        id: '9',
        name: '2_8',
        description: 'Perfis Planeamento',
        url: '/ME/PerfilPlaneamento.aspx',
        children: []
      },
      {
        id: '10',
        name: '2_3',
        description: 'Grupos De Usuários',
        url: '/ME/ListaGruposUsuariosWF.aspx',
        children: []
      },
      {
        id: '11',
        name: '2_6',
        description: 'Monitoramento de Usuários',
        url: '/ME/MonitoraUsuariosWF.aspx',
        children: []
      },
      {
        id: '12',
        name: '2_7',
        description: 'Histórico de Substituição',
        url: '/do/HistoricoSubstituicaoPerfil.mvc',
        children: []
      }
    ]
  },
  {
    id: '13',
    name: '3',
    description: 'Produtos',
    url: '',
    children: [
      {
        id: '14',
        name: '3_0',
        description: 'Meus Produtos',
        url: '/ListaTodosProdutosIE.asp',
        children: []
      },
      {
        id: '15',
        name: '3_1',
        description: 'Grupos de Produtos',
        url: '/ListaGruposProd.asp',
        children: []
      },
      {
        id: '16',
        name: '3_7',
        description: 'Flows de Produtos',
        url: '/ME/ListaFlows.aspx',
        children: []
      },
      {
        id: '17',
        name: '3_3',
        description: 'Catálogo de Compras',
        url: '/ListaProdutos.asp',
        children: []
      },
      {
        id: '18',
        name: '3_5',
        description: 'Catálogos Fornecedores',
        url: '/do/Suppliers.mvc/Catalogo',
        children: []
      },
      {
        id: '19',
        name: '3_10',
        description: 'Templates de Cotação',
        url: '/CotacaoTemplate.asp',
        children: []
      },
      {
        id: '20',
        name: '3_11',
        description: 'Gerenciamento de Contratos',
        url: '/ME/GerenciamentoContrato.aspx',
        children: []
      },
      {
        id: '21',
        name: '3_23',
        description: 'Categorias de Contratos',
        url: '/do/CategoriaContrato.mvc',
        children: []
      },
      {
        id: '22',
        name: '3_22',
        description: 'Grupo de Workflow',
        url: '/ME/GrupoWorkflow.aspx',
        children: []
      },
      {
        id: '23',
        name: '3_12',
        description: 'Templates de Requisição',
        url: '/ME/TemplateReq.aspx',
        children: []
      },
      {
        id: '24',
        name: '3_16',
        description: 'Taxas de ICMS',
        url: '/ME/TaxaICMS.aspx',
        children: []
      },
      {
        id: '25',
        name: '3_14',
        description: 'Exceções de ICMS',
        url: '/ME/ExcecaoICMS.aspx',
        children: []
      },
      {
        id: '26',
        name: '3_15',
        description: 'Exceções de IPI',
        url: '/ME/ExcecaoIPI.aspx',
        children: []
      },
      {
        id: '27',
        name: '3_17',
        description: 'Controle de NBM',
        url: '/do/NBM.mvc',
        children: []
      },
      {
        id: '28',
        name: '3_18',
        description: 'Fator de Conversão de Unidade',
        url: '/ME/ConversaoUnidadeSimples.aspx',
        children: []
      },
      {
        id: '29',
        name: '3_19',
        description: 'Atributos Produtos',
        url: '/Produtos.asp?action=listaAtributosProduto',
        children: []
      },
      {
        id: '30',
        name: '3_20',
        description: 'Abreviaturas',
        url: '/Produtos.asp?action=listaAbreviaturas',
        children: []
      },
      {
        id: '31',
        name: '3_21',
        description: 'Sinônimos',
        url: '/Produtos.asp?action=listaSinonimos',
        children: []
      },
      {
        id: '32',
        name: '3_25',
        description: 'Templates de Carrinho',
        url: '/ME/TemplateCarrinho.aspx',
        children: []
      },
      {
        id: '33',
        name: '3_28',
        description: 'Associação Produto X Fornecedor X Fabricante',
        url: '/do/FornecedorFabricanteProduto.mvc',
        children: []
      },
      {
        id: '34',
        name: '3_29',
        description: 'Situação de Estoque e Previsão de Demanda',
        url: '/do/SituacaoEstoque.mvc',
        children: []
      },
      {
        id: '35',
        name: '3_30',
        description: 'Associação Fornecedor X Previsão Demanda',
        url: '/do/AssociacaoFornecedorPrevisaoDemanda.mvc',
        children: []
      },
      {
        id: '36',
        name: '3_31',
        description: 'Tipos de Documento',
        url: '/DO/TipoDocumento.mvc/',
        children: []
      },
      {
        id: '37',
        name: '3_32',
        description: 'Reajustes Automáticos de Contrato',
        url: '/DO/Reajuste.mvc//Index/false',
        children: []
      }
    ]
  },
  {
    id: '38',
    name: '4',
    description: 'Fornecedores',
    url: '',
    children: [
      {
        id: '39',
        name: '4_3',
        description: 'Atributos de Fornecedores',
        url: '/ME/AtributosMeusFornecedores.aspx',
        children: []
      },
      {
        id: '40',
        name: '4_8',
        description: 'Grupos de Fornecedores',
        url: '/do/GrupoFornecedor.mvc',
        children: []
      },
      {
        id: '41',
        name: '4_5',
        description: 'Fornecedores do Workflow de Documentos',
        url: '/DO/WFD/FornecedorWFD.mvc',
        children: []
      },
      {
        id: '42',
        name: '4_6',
        description: 'Fornecedores ME',
        url: '/supplier/',
        children: []
      },
      {
        id: '43',
        name: '4_9',
        description: 'Status Homologação Fornecedor',
        url: '/DO/StatusHomologacaoFornecedor.mvc',
        children: []
      }
    ]
  },
  {
    id: '44',
    name: '5',
    description: 'Preferências',
    url: '',
    children: [
      {
        id: '45',
        name: '5_1',
        description: 'Locais',
        url: '/do/Locais.mvc',
        children: []
      },
      {
        id: '46',
        name: '5_7',
        description: 'Cia ERP',
        url: '/do/CiaERP.mvc',
        children: []
      },
      {
        id: '47',
        name: '5_2',
        description: 'Centros de Custos',
        url: '/ME/ListaCCustoWF.aspx',
        children: []
      },
      {
        id: '48',
        name: '5_3',
        description: 'Conta Contábil',
        url: '/ME/ListaContaContabilWF.aspx',
        children: []
      },
      {
        id: '49',
        name: '5_6',
        description: 'Conta Devedora',
        url: '/do/ContaDevedora.mvc',
        children: []
      },
      {
        id: '50',
        name: '5_5',
        description: 'Referências Devedora',
        url: '/do/ReferenciaDevedora.mvc',
        children: []
      },
      {
        id: '51',
        name: '5_9',
        description: 'Nomenclatura Recusar/Cancelar',
        url: '/NomenclaturaCancelarRecusarWF.asp',
        children: []
      },
      {
        id: '52',
        name: '5_8',
        description: 'FUP de Entregas',
        url: '/FUPConfiguraWF.asp',
        children: []
      },
      {
        id: '53',
        name: '5_11',
        description: 'Mapa Comparativo Excel',
        url: '/MapaComparativoExcelGenericoConfigura.asp',
        children: []
      },
      {
        id: '54',
        name: '5_10',
        description: 'FUP (Criticidade)',
        url: '/do/FUPCriticidade.mvc',
        children: []
      },
      {
        id: '55',
        name: '5_12',
        description: 'Customização de e-mails',
        url: '/CustomMail.asp',
        children: []
      },
      {
        id: '56',
        name: '5_23',
        description: 'Nova Customização de e-mails',
        url: '/ME/CustomMail.aspx',
        children: []
      },
      {
        id: '57',
        name: '5_19',
        description: 'Manutenção de Feriados',
        url: '/do/Feriadowf.mvc',
        children: []
      },
      {
        id: '58',
        name: '5_22',
        description: 'Configurações (Fornecedor)',
        url: '/ME/PreferenciasWFF.aspx',
        children: []
      },
      {
        id: '59',
        name: '5_18',
        description: 'Tipos de Tarefas',
        url: '/ME/TipoTarefa.aspx',
        children: []
      },
      {
        id: '60',
        name: '5_26',
        description: 'Cesta Índice de Reajuste',
        url: '/ME/CestaIndiceReajuste.aspx',
        children: []
      },
      {
        id: '61',
        name: '5_29',
        description: 'Configuração de Impostos',
        url: '/do/Imposto.mvc',
        children: []
      },
      {
        id: '62',
        name: '5_30',
        description: 'Associação Centro Custo/Utilizador',
        url: '/ME/ListaCCustoUsuarioBorgWF.aspx',
        children: []
      },
      {
        id: '63',
        name: '5_31',
        description: 'Justificativas de Classif. Qualitativa',
        url: '/do/RecebimentoPedidoJustificativaCQ.mvc',
        children: []
      },
      {
        id: '64',
        name: '5_34',
        description: 'Personalizar elementos do Tema',
        url: '/DO/Theme.mvc',
        children: []
      },
      {
        id: '65',
        name: '5_36',
        description: 'Personalizar Header (Cabeçalho)',
        url: '/DO/Theme.mvc/Header',
        children: []
      },
      {
        id: '66',
        name: '5_37',
        description: 'Personalizar Tela de Login',
        url: '/DO/Theme.mvc/Home',
        children: []
      },
      {
        id: '67',
        name: '5_35',
        description: 'Agendamento',
        url: '/DO/Scheduler.mvc',
        children: []
      }
    ]
  },
  {
    id: '68',
    name: '6',
    description: 'WorkFlow',
    url: '',
    children: [
      {
        id: '69',
        name: '6_1',
        description: 'Permissões',
        url: '/do/PermissaoWF.mvc',
        children: []
      },
      {
        id: '70',
        name: '6_33',
        description: 'Permissão Catálogo',
        url: '/do/PermissaoCatalogo.mvc',
        children: []
      },
      {
        id: '71',
        name: '6_2',
        description: 'Estados',
        url: '/VerEstadosWF.asp',
        children: []
      },
      {
        id: '72',
        name: '6_37',
        description: 'Validação de Regras',
        url: '/ME/ValidadorRegras.aspx',
        children: []
      },
      {
        id: '73',
        name: '6_38',
        description: 'Carga de Regras',
        url: '/ME/CargaRegras.aspx',
        children: []
      },
      {
        id: '74',
        name: '6_88',
        description: 'Automação',
        url: '/automation',
        children: []
      },
      {
        id: '75',
        name: '6_77',
        description: 'Importação / Exportação Cargas',
        url: '/dataload/LoadHistory',
        children: []
      },
      {
        id: '76',
        name: '6_3',
        description: 'Cargos',
        url: '/ME/ListaCargosWF.aspx',
        children: []
      },
      {
        id: '77',
        name: '6_4',
        description: 'Catálogo',
        url: '/ME/MarcaCatalogosWF.aspx',
        children: []
      },
      {
        id: '78',
        name: '6_5',
        description: 'Atributos Requisição',
        url: '/do/AtributoRequisicao.mvc',
        children: []
      },
      {
        id: '79',
        name: '6_10',
        description: 'Atributos Pré-Pedido',
        url: '/ME/ListaAtributosPrePedidoWF.aspx',
        children: []
      },
      {
        id: '80',
        name: '6_38',
        description: 'Atributos Pedido',
        url: '/do/AtributoPedido.mvc',
        children: []
      },
      {
        id: '81',
        name: '6_39',
        description: 'Atributos Contrato',
        url: '/do/AtributoContrato.mvc',
        children: []
      },
      {
        id: '82',
        name: '6_15',
        description: 'Atributos Cotação',
        url: '/do/AtributoCotacao.mvc',
        children: []
      },
      {
        id: '83',
        name: '6_6',
        description: 'Categorias Requisição',
        url: '/ME/ListaCategoriasWF.aspx',
        children: []
      },
      {
        id: '84',
        name: '6_11',
        description: 'Categorias Pré-Pedido',
        url: '/ME/ListaCategoriasPrePedidoWF.aspx',
        children: []
      },
      {
        id: '85',
        name: '6_53',
        description: 'Categorias de NF',
        url: '/do/CategoriaNF.mvc',
        children: []
      },
      {
        id: '86',
        name: '6_75',
        description: 'Tipo de Documento de NF',
        url: '/do/TipoDocumentoNF.mvc',
        children: []
      },
      {
        id: '87',
        name: '6_14',
        description: 'Categorias Cotação',
        url: '/ME/ListaCategoriasCotacao.aspx',
        children: []
      },
      {
        id: '88',
        name: '6_18',
        description: 'Categorias Anexo',
        url: '/do/CategoriaAnexo.mvc',
        children: []
      },
      {
        id: '89',
        name: '6_21',
        description: 'Templates Anexo',
        url: '/do/Anexo.mvc',
        children: []
      },
      {
        id: '90',
        name: '6_8',
        description: 'Substituições de Usuário',
        url: '/do/Substituicao.mvc',
        children: []
      },
      {
        id: '91',
        name: '6_97',
        description: 'Setor Industrial',
        url: '/DO/SetorIndustrial.mvc',
        children: []
      },
      {
        id: '92',
        name: '6_98',
        description: 'Grupo de Contas',
        url: '/DO/GrupoConta.mvc',
        children: []
      },
      {
        id: '93',
        name: '6_35',
        description: 'Ver Histórico de Substituição de Aprovador',
        url: '/do/HistoricoSubstituicaoAprovador.mvc',
        children: []
      },
      {
        id: '94',
        name: '6_9',
        description: 'Conta Corrente',
        url: '/ME/ContaCorrenteWF.aspx',
        children: []
      },
      {
        id: '95',
        name: '6_12',
        description: 'Compras / Centros De Custo',
        url: '/do/GastoCCWF.mvc',
        children: []
      },
      {
        id: '96',
        name: '6_13',
        description: 'Verba',
        url: '/ME/EditaVerbasWF.aspx',
        children: []
      },
      {
        id: '97',
        name: '6_16',
        description: 'Cadastrar Taxa de Conversão',
        url: '/ME/EditaTaxaDolarWF.aspx',
        children: []
      },
      {
        id: '98',
        name: '6_17',
        description: 'Relatórios de Workflow',
        url: '/RelatLinksRelatoriosWF.asp',
        children: []
      },
      {
        id: '99',
        name: '6_22',
        description: 'Informações de Compras',
        url: '/InformacaoCompras.asp',
        children: []
      },
      {
        id: '100',
        name: '6_24',
        description: 'Material de Treinamento',
        url: '/MaterialTreinamento.asp',
        children: []
      },
      {
        id: '101',
        name: '6_25',
        description: 'Unid. Req. de Cotação',
        url: '/ME/VerUnidReqCotWF.aspx',
        children: []
      },
      {
        id: '102',
        name: '6_30',
        description: 'Manutenção Aplicação',
        url: '/ME/ManutencaoAplicacao.aspx',
        children: []
      },
      {
        id: '103',
        name: '6_29',
        description: 'Manutenção IVA',
        url: '/ME/ManutencaoIVA.aspx',
        children: []
      },
      {
        id: '104',
        name: '6_31',
        description: 'Relatório de Verba por Ordem Interna',
        url: '/ME/RelatorioVerbasOI.aspx',
        children: []
      },
      {
        id: '105',
        name: '6_32',
        description: 'Motivo da recusa',
        url: '/DO/MotivoRecusa.mvc',
        children: []
      },
      {
        id: '106',
        name: '6_40',
        description: 'Monitor de Requisição',
        url: '/MonitoraReqIntegracao.asp',
        children: []
      },
      {
        id: '107',
        name: '6_41',
        description: 'Área Funcional',
        url: '/ME/CadastroAreaFuncional.aspx',
        children: []
      },
      {
        id: '108',
        name: '6_48',
        description: 'Cadastro de gestão de frete',
        url: '/Cadastros.asp',
        children: []
      },
      {
        id: '109',
        name: '6_99',
        description: 'Cadastro de Frete',
        url: '/DO/Frete.mvc',
        children: []
      },
      {
        id: '110',
        name: '6_52',
        description: 'Alertas',
        url: '/do/ManutencaoAlerta.mvc',
        children: []
      },
      {
        id: '111',
        name: '6_56',
        description: 'Marketplace',
        url: '/PlanoEmpresa.asp',
        children: []
      },
      {
        id: '112',
        name: '6_55',
        description: 'Critérios de Avaliação',
        url: '/do/CriterioAvaliacao.mvc',
        children: []
      },
      {
        id: '113',
        name: '6_59',
        description: 'Condições de Pagamento',
        url: '/do/CondicaoPagamento.mvc',
        children: []
      },
      {
        id: '114',
        name: '6_61',
        description: 'Condições de Fornecimento',
        url: '/do/CondicaoFornecimento.mvc',
        children: []
      },
      {
        id: '115',
        name: '6_63',
        description: 'Categoria de Item de Requisição',
        url: '/ME/CategoriasItemWF.aspx',
        children: []
      },
      {
        id: '116',
        name: '6_64',
        description: 'Categoria de Ordem',
        url: '/ME/CategoriasOrdemWF.aspx',
        children: []
      },
      {
        id: '117',
        name: '7_01',
        description: 'Moedas',
        url: '/DO/Currency/Currency.mvc',
        children: []
      },
      {
        id: '118',
        name: '7_02',
        description: 'Cadastro de Origem de Material',
        url: '/do/OrigemMaterial/OrigemMaterial.mvc',
        children: []
      },
      {
        id: '119',
        name: '7_03',
        description: 'Cadastro de Unidades',
        url: '/DO/Unit/Unit.mvc',
        children: []
      },
      {
        id: '120',
        name: '6_67',
        description: 'Tipo Conta de Consumo',
        url: '/ME/TipoContaConsumo.aspx',
        children: []
      },
      {
        id: '121',
        name: '6_70',
        description: 'Cadastro de Grupo de Compras',
        url: '/ME/GrupoCompraWF.aspx',
        children: []
      },
      {
        id: '122',
        name: '6_80',
        description: 'Cadastro de Roteamento',
        url: '/ME/CadastroRoteamento.aspx',
        children: []
      },
      {
        id: '123',
        name: '6_112',
        description: 'Configuração Mapa Comparativo Hipster',
        url: '/comparative-panel/config',
        children: []
      },
      {
        id: '124',
        name: '6_71',
        description: 'Cadastro de Categoria do Material',
        url: '/ME/CategoriaMaterial.aspx',
        children: []
      },
      {
        id: '125',
        name: '6_72',
        description: 'Cadastro de Classificação do Serviço',
        url: '/ME/ClassificacaoFiscalServico.aspx',
        children: []
      },
      {
        id: '126',
        name: '6_74',
        description: 'Textos Genéricos',
        url: '/ME/TextoGenerico.aspx',
        children: []
      },
      {
        id: '127',
        name: '6_75',
        description: 'Cadastro de Elemento PEP',
        url: '/ME/ElementoPEP.aspx',
        children: []
      },
      {
        id: '128',
        name: '6_81',
        description: 'Administração de Macro Áreas',
        url: '/ME/MacroAreas.aspx',
        children: []
      },
      {
        id: '129',
        name: '6_86',
        description: 'REIDI',
        url: '/do/Reidi.mvc',
        children: []
      },
      {
        id: '130',
        name: '6_87',
        description: 'Anexo Fornecedor',
        url: '/ME/AnexoFornecedor.aspx',
        children: []
      },
      {
        id: '131',
        name: '6_90',
        description: 'Regras de Follow UP (Novo Motor)',
        url: '/DO/FUP/Configuration.mvc',
        children: []
      },
      {
        id: '132',
        name: '6_91',
        description: 'Cadastro de Tipo de Entidade',
        url: '/do/TipoEntidade.mvc',
        children: []
      },
      {
        id: '133',
        name: '6_93',
        description: 'Cadastro de Operações Comerciais',
        url: '/DO/OperacaoComercial.mvc',
        children: []
      },
      {
        id: '134',
        name: '6_94',
        description: 'Cadastro de Diagramas de Rede',
        url: '/DO/DiagramaRede.mvc',
        children: []
      },
      {
        id: '135',
        name: '6_97',
        description: 'Tipos de Fornecedor Parceiro',
        url: '/DO/TipoFornecedorParceiro.mvc/',
        children: []
      },
      {
        id: '136',
        name: '6_98',
        description: 'Formas de Pagamento',
        url: '/DO/FormaPagamento.mvc/',
        children: []
      },
      {
        id: '137',
        name: '6_99',
        description: 'Catálogo de Traduções',
        url: '/DO/CatalogoTraducao.mvc',
        children: []
      },
      {
        id: '138',
        name: '6_100',
        description: 'Categoria FRS',
        url: '/DO/CategoriaFRS.mvc',
        children: []
      },
      {
        id: '139',
        name: '6_101',
        description: 'Cadastro de Regionais',
        url: '/DO/Regional.mvc',
        children: []
      },
      {
        id: '140',
        name: '6_105',
        description: 'Pacotes e Condições de Melhor Compra',
        url: '/DO/PacoteMelhorCompra.mvc',
        children: []
      },
      {
        id: '141',
        name: '6_108',
        description: 'Cadastro de Tipo de Exportação',
        url: '/do/TipoExportacao.mvc',
        children: []
      },
      {
        id: '142',
        name: '6_92',
        description: 'Cadastro de Comunicados',
        url: '/ME/CadastroComunicado.aspx',
        children: []
      },
      {
        id: '143',
        name: '6_93',
        description: 'Gerenciar o cadastro de Determinação de IVA',
        url: '/do/DeterminacaoIVA.mvc',
        children: []
      },
      {
        id: '144',
        name: '2_8',
        description: 'Cadastro de Ordem',
        url: '/do/OrdemWF.mvc',
        children: []
      }
    ]
  },
  {
    id: '145',
    name: '7',
    description: 'Relatórios',
    url: '',
    children: [
      {
        id: '146',
        name: '7_1',
        description: 'Ver gráficos',
        url: '/Graficos.asp',
        children: []
      },
      {
        id: '147',
        name: '7_5',
        description: 'Relatório Gerencial',
        url: '/RelatorioGestaoPedidos.asp',
        children: []
      },
      {
        id: '148',
        name: '7_6',
        description: 'Acompanhamento de Relatórios',
        url: '/ME/ListaExtracaoRelatorio.aspx',
        children: []
      },
      {
        id: '149',
        name: '7_7',
        description: 'Extração de Relatório',
        url: '/ME/ExtracaoRelatorio.aspx',
        children: []
      },
      {
        id: '150',
        name: '7_2',
        description: 'Relatórios de Workflow',
        url: '/RelatLinksRelatoriosWF.asp',
        children: []
      },
      {
        id: '151',
        name: '27_1',
        description: 'Relatórios e-Business Intelligence',
        url: '/MERG.asp',
        children: []
      }
    ]
  },
  {
    id: '152',
    name: '9',
    description: 'WorkFlow Central',
    url: '',
    children: []
  },
  {
    id: '153',
    name: '12',
    description: 'Contas Pagas',
    url: '',
    children: []
  },
  {
    id: '154',
    name: '25',
    description: 'Notas Fiscais',
    url: '',
    children: [
      {
        id: '155',
        name: '25_1',
        description: 'Lista de Notas Fiscais',
        url: '/NF.asp?action=lista',
        children: []
      },
      {
        id: '156',
        name: '25_3',
        description: 'Período Fiscal',
        url: '/do/PeriodoFiscal.mvc',
        children: []
      }
    ]
  },
  {
    id: '157',
    name: '14',
    description: 'RoundTrip',
    url: '',
    children: [
      {
        id: '158',
        name: '14_1',
        description: 'Catálogos',
        url: '/do/RoundTripWF.mvc',
        children: []
      },
      {
        id: '159',
        name: '14_2',
        description: 'Usuários',
        url: '/do/RoundTripUser.mvc',
        children: []
      }
    ]
  },
  {
    id: '160',
    name: '18',
    description: 'Monitor de Integração',
    url: '',
    children: []
  },
  {
    id: '161',
    name: '19',
    description: 'Amarrações',
    url: '',
    children: [
      {
        id: '162',
        name: '19_1',
        description: 'Conta Razão x Ordem Interna',
        url: '/do/ContaRazaoOrdemInterna.mvc',
        children: []
      },
      {
        id: '163',
        name: '19_2',
        description: 'Conta Razão x Centro de Custo',
        url: '/ME/ContaRazaoCentroCusto.aspx',
        children: []
      },
      {
        id: '164',
        name: '19_3',
        description: 'Conta Razão x Área Funcional',
        url: '/ME/ContaRazaoAreaFuncional.aspx',
        children: []
      },
      {
        id: '165',
        name: '19_4',
        description: 'Conta Razão x Ordem',
        url: '/do/ContaRazaoOrdem.mvc',
        children: []
      },
      {
        id: '166',
        name: '19_5',
        description: 'Centro de Custo x Área Funcional',
        url: '/do/AreaFuncionalCentroCusto.mvc',
        children: []
      },
      {
        id: '167',
        name: '19_6',
        description: 'Usuário x Área Funcional',
        url: '/do/AreaFuncionalUsuario.mvc',
        children: []
      }
    ]
  },
  {
    id: '168',
    name: '21',
    description: 'Links Personalizados',
    url: '',
    children: []
  },
  {
    id: '169',
    name: '23',
    description: 'Consulta Serasa',
    url: '',
    children: []
  },
  {
    id: '170',
    name: '29',
    description: 'Motor de Regras 3',
    url: '',
    children: [
      {
        id: '171',
        name: '29_1',
        description: 'Tabelas',
        url: '/ME/ConsultarTabelas.aspx',
        children: []
      },
      {
        id: '172',
        name: '29_2',
        description: 'Regras',
        url: '/ME/CadastroRegras.aspx',
        children: []
      }
    ]
  },
  {
    id: '173',
    name: '32',
    description: 'Integração',
    url: '',
    children: [
      {
        id: '174',
        name: '32_1',
        description: 'Enviar Arquivo',
        url: '/do/Integracao.mvc/SendFile',
        children: []
      },
      {
        id: '175',
        name: '32_2',
        description: 'Visão Geral',
        url: '/do/Integracao.mvc/FilaVisao',
        children: []
      },
      {
        id: '176',
        name: '32_3',
        description: 'Processos',
        url: '/do/Integracao.mvc/Fila',
        children: []
      }
    ]
  },
  {
    id: '177',
    name: '33',
    description: 'Log',
    url: '',
    children: [
      {
        id: '178',
        name: '33_1',
        description: 'Cadastro de Produto',
        url: '/do/Log/Produto.mvc',
        children: []
      },
      {
        id: '179',
        name: '33_2',
        description: 'Flags de Preferências',
        url: '/do/Log/Flags.mvc/Index/Workflow',
        children: []
      }
    ]
  },
  {
    id: '180',
    name: '34',
    description: 'Minha Conta',
    url: '',
    children: [
      {
        id: '181',
        name: '34_1',
        description: 'Meus Dados',
        url: '/RegEdit.asp',
        children: []
      },
      {
        id: '182',
        name: '34_2',
        description: 'Relatórios',
        url: '/ME/ExtracaoRelatorio.aspx',
        children: []
      },
      {
        id: '183',
        name: '34_5',
        description: 'Acompanhamento de Relatórios',
        url: '/ME/ListaExtracaoRelatorio.aspx',
        children: []
      },
      {
        id: '184',
        name: '34_3',
        description: 'Notas / Boletos / Extratos',
        url: '/do/Fornecedor.mvc/ListaFornecedorFinanceiro',
        children: []
      }
    ]
  },
  {
    id: '185',
    name: '40',
    description: 'Links úteis',
    url: '',
    children: [
      {
        id: '186',
        name: '40_0',
        description: 'Pedidos para Enviar',
        url: '/ListaPedidosProntosWF.asp',
        children: []
      },
      {
        id: '187',
        name: '41_1',
        description: 'Meus Pré-Pedidos para Enviar',
        url: '/ListaPedidosProntosWF.asp',
        children: []
      },
      {
        id: '188',
        name: '41_2',
        description: 'Pendências de Contrato',
        url: '/DO/RFQ/Create.mvc/Contract',
        children: []
      },
      {
        id: '189',
        name: '41_3',
        description: 'Pendência de Reaproveitamento de SO',
        url: '/DO/ReaproveitamentoCotacao.mvc',
        children: []
      },
      {
        id: '190',
        name: '41_7',
        description: 'Pendências de alteração de data de entrega',
        url: '/DO/Orders/Pendency.mvc',
        children: []
      },
      {
        id: '191',
        name: '41_8',
        description: 'Aprovação de Produtos PDM',
        url: '/PDM/AprovarProdutos.aspx',
        children: []
      },
      {
        id: '192',
        name: '41_9',
        description: 'Aprovação de Tarefas',
        url: '/ME/ListarTarefas.aspx',
        children: []
      },
      {
        id: '193',
        name: '41_10',
        description: 'Solicitações de Orçamento',
        url: '/ListaRequisicoesWF.asp?Oper=so',
        children: []
      },
      {
        id: '194',
        name: '41_11',
        description: 'Requisições Emergenciais',
        url: '/ListaRequisicoesWF.asp?Emergencial=2',
        children: []
      },
      {
        id: '195',
        name: '41_12',
        description: 'Mapa Comparativo',
        url: '/do/MapaComparativo.mvc/ListaMapaComparativo',
        children: []
      },
      {
        id: '196',
        name: '41_13',
        description: 'Relatório de Acompanhamento',
        url: '/RelatAcompanhamentoWF.asp',
        children: []
      },
      {
        id: '197',
        name: '41_15',
        description: 'Documentos ME',
        url: '/do/RepositorioDocumentoME/Home.mvc',
        children: []
      },
      {
        id: '198',
        name: '41_17',
        description: 'Gestão de Compras',
        url: '/do/ControleDeCompras.mvc/Backlog',
        children: []
      },
      {
        id: '199',
        name: '41_18',
        description: 'Substituir Usuário',
        url: '/do/ChangeUser.mvc',
        children: []
      },
      {
        id: '200',
        name: '41_20',
        description: 'Substituir Usuário do Mesmo Perfil',
        url: '/TrocaUsuarioPerfilWF.asp',
        children: []
      },
      {
        id: '201',
        name: '41_27',
        description: 'Substituição de Workflow',
        url: '/do/Usuario.mvc/SubstituirWorkflow',
        children: []
      },
      {
        id: '202',
        name: '41_23',
        description: 'Recebimento',
        url: '/ME/RecebimentoWF.aspx',
        children: []
      },
      {
        id: '203',
        name: '41_24',
        description: 'Pedidos Agendados',
        url: '/PedidosAgendadosWF.asp',
        children: []
      },
      {
        id: '204',
        name: '41_26',
        description: 'Evento Online',
        url: '/do/Leilao/CriarLeilao.mvc/listaEventos',
        children: []
      },
      {
        id: '205',
        name: '41_28',
        description: 'Importação / Exportação Cargas',
        url: '/dataload/LoadHistory',
        children: []
      }
    ]
  }
])

const headerClasses = computed(() => {
  const baseClasses = 'shadow-lg'
  return `${baseClasses} text-white`
})

const headerStyles = computed(() => {
  const styles: Record<string, string> = {}
  const bg = brand.value.background || {}

  const hasMainImage = Boolean(bg.mainImage)
  const hasRepeatImage = Boolean(bg.repeatImage)
  const hasPrimaryColor = Boolean(bg.primaryColor)
  const hasSecondaryColor = Boolean(bg.secondaryColor)

  if (hasMainImage && hasRepeatImage && bg.mainImage && bg.repeatImage) {
    // Cenário 2: Imagem principal + imagem repetida
    styles.backgroundImage = `url(${bg.mainImage}), url(${bg.repeatImage})`
    styles.backgroundSize = 'cover, auto'
    styles.backgroundPosition = 'center, center'
    styles.backgroundRepeat = 'no-repeat, repeat'
  } else if (
    hasMainImage &&
    hasPrimaryColor &&
    bg.mainImage &&
    bg.primaryColor
  ) {
    // Cenário 3: Imagem principal + cor primária
    styles.backgroundColor = bg.primaryColor
    styles.backgroundImage = `url(${bg.mainImage})`
    styles.backgroundSize = 'contain'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  } else if (hasRepeatImage && !hasMainImage && bg.repeatImage) {
    // Cenário 4: Apenas imagem repetida
    styles.backgroundImage = `url(${bg.repeatImage})`
    styles.backgroundSize = 'auto'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'repeat'
  } else if (
    hasPrimaryColor &&
    hasSecondaryColor &&
    !hasMainImage &&
    !hasRepeatImage &&
    bg.primaryColor &&
    bg.secondaryColor
  ) {
    // Cenário 1: Gradiente com cores primária e secundária
    styles.background = `linear-gradient(135deg, ${bg.primaryColor} 0%, ${bg.secondaryColor} 100%)`
  } else if (
    hasPrimaryColor &&
    !hasSecondaryColor &&
    !hasMainImage &&
    !hasRepeatImage &&
    bg.primaryColor
  ) {
    // Cenário 5: Apenas cor primária
    styles.backgroundColor = bg.primaryColor
  } else {
    styles.backgroundColor = 'var(--ui-primary)'
  }

  return styles
})

const iconColor = computed(() => {
  return brand.value.background?.iconColor || 'white'
})
</script>
