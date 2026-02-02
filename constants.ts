
import { TabType, ColumnGroup, TableRow } from './types';

export const STAFF_NAMES = ['陈银川', '陈纯羽', '杨继昆', '彭玉仪', '赵丹婷', '吴雪茹'];
export const SITES = ['US (美国)', 'UK (英国)', 'DE (德国)', 'JP (日本)', 'FR (法国)', 'CA (加拿大)'];
export const DEPARTMENTS = ['运营一课', '运营二课'];

// 原始数值生成器
const generateRawOrderStats = (multiplier: number = 1) => {
  const jan1 = Math.floor((Math.random() * 400 + 80) * multiplier);
  const jan2 = Math.floor((Math.random() * 420 + 90) * multiplier);
  const jan3 = Math.floor((Math.random() * 450 + 95) * multiplier);
  const jan4 = Math.floor((Math.random() * 500 + 100) * multiplier);
  const jan5 = Math.floor((Math.random() * 500 + 100) * multiplier);
  const lastWeekSameDay = Math.floor(jan5 * (0.7 + Math.random() * 0.4));
  return {
    jan1Orders: jan1, jan2Orders: jan2, jan3Orders: jan3, jan4Orders: jan4, jan5Orders: jan5,
    lastWeekSameDayOrders: lastWeekSameDay,
    jan5GrowthRate: (((jan5 - lastWeekSameDay) / Math.max(1, lastWeekSameDay)) * 100).toFixed(2),
    jan5LossOrders: Math.floor(jan5 * 0.15),
    jan5LossRatio: (15 + Math.random() * 5).toFixed(2),
    thisWeekOrders: jan1 + jan2 + jan3 + jan4 + jan5,
    lastWeekOrders: Math.floor((jan1 + jan2 + jan3 + jan4 + jan5) * 0.9),
    weekGrowthRate: (Math.random() * 10).toFixed(2),
    thisWeekLossOrders: Math.floor((jan1 + jan2 + jan3 + jan4 + jan5) * 0.12),
    thisWeekLossRatio: (12 + Math.random() * 3).toFixed(2),
    thisMonthOrders: (jan1 + jan2 + jan3 + jan4 + jan5) * 4,
    lastMonthOrders: (jan1 + jan2 + jan3 + jan4 + jan5) * 3.8,
    monthGrowthRate: (Math.random() * 5).toFixed(2),
    thisMonthLossOrders: Math.floor((jan1 + jan2 + jan3 + jan4 + jan5) * 4 * 0.14),
    thisMonthLossRatio: (14 + Math.random() * 2).toFixed(2),
  };
};

const generateRawProfitStats = (multiplier: number = 1) => {
  const targetSales = Math.floor((Math.random() * 200000 + 50000) * multiplier);
  const completedSales = Math.floor((Math.random() * 250000 + 20000) * multiplier);
  const targetProfit = Math.floor(targetSales * 0.4);
  const completedProfit = Math.floor(completedSales * 0.35);
  const profitProgress = ((completedProfit / Math.max(1, targetProfit)) * 100).toFixed(2);

  return {
    targetSales, completedSales, salesProgress: ((completedSales / Math.max(1, targetSales)) * 100).toFixed(2),
    salesGap: (Math.random() * 10 - 5).toFixed(2),
    estSalesProgress: (Math.random() * 100).toFixed(2),
    targetProfit, completedProfit, 
    profitProgress,
    profitGap: (parseFloat(profitProgress) - 100).toFixed(2),
    estProfitProgress: (parseFloat(profitProgress) * 1.05).toFixed(2),
    profitRate: (8 + Math.random() * 12).toFixed(2), // 保持随机性以触发红字
    actualRefundRate: (3 + Math.random() * 5).toFixed(2),
    actualAdRate: (8 + Math.random() * 7).toFixed(2),
    actualProfitRate: (8 + Math.random() * 12).toFixed(2), // 保持随机性以触发红字
  };
};

const generateRawListingStats = (multiplier: number = 1) => {
  const total = Math.floor((Math.random() * 1000 + 200) * multiplier);
  const self = Math.floor(total * (0.3 + Math.random() * 0.2));
  const auto = total - self;
  const autoFailed = Math.floor(auto * (Math.random() * 0.05));
  const totalSales = Math.floor((Math.random() * 500000 + 100000) * multiplier);
  const selfSales = Math.floor(totalSales * (0.4 + Math.random() * 0.2));
  const autoSales = totalSales - selfSales;

  return {
    totalListingCount: total,
    selfListingCount: self,
    autoListingCount: auto,
    selfListingRatio: ((self / total) * 100).toFixed(2),
    autoListingRatio: ((auto / total) * 100).toFixed(2),
    autoFailedCount: autoFailed,
    autoFailureRatio: ((autoFailed / Math.max(1, auto)) * 100).toFixed(2),
    totalListingSales: totalSales,
    selfListingSales: selfSales,
    autoListingSales: autoSales,
    selfSalesRatio: ((selfSales / totalSales) * 100).toFixed(2),
    autoSalesRatio: ((autoSales / totalSales) * 100).toFixed(2),
  };
};

const generateRawConversionStats = (multiplier: number = 1) => {
  const totalAsin = Math.floor((Math.random() * 500 + 100) * multiplier);
  const selfAsin = Math.floor(totalAsin * (0.3 + Math.random() * 0.4));
  const autoAsin = totalAsin - selfAsin;

  const totalOrders = Math.floor((Math.random() * 1000 + 200) * multiplier);
  const selfOrders = Math.floor(totalOrders * 0.4);
  const autoOrders = totalOrders - selfOrders;
  const lastTotalOrders = Math.floor(totalOrders * 0.9);
  const lastSelfOrders = Math.floor(selfOrders * 0.9);
  const lastAutoOrders = Math.floor(autoOrders * 0.85);

  const orderAsinSelf = Math.floor(selfAsin * 0.6);
  const orderAsinAuto = Math.floor(autoAsin * 0.4);
  const orderAsinTotal = orderAsinSelf + orderAsinAuto;

  const activeAsinSelf = Math.floor(selfAsin * 0.3);
  const activeAsinAuto = Math.floor(autoAsin * 0.15);
  const activeAsinTotal = activeAsinSelf + activeAsinAuto;

  return {
    totalAsin, selfAsin, autoAsin,
    totalOrders, lastTotalOrders,
    totalGrowth: (((totalOrders - lastTotalOrders) / Math.max(1, lastTotalOrders)) * 100).toFixed(2),
    selfOrders, autoOrders,
    lastSelfOrders, lastAutoOrders,
    selfGrowth: (((selfOrders - lastSelfOrders) / Math.max(1, lastSelfOrders)) * 100).toFixed(2),
    autoGrowth: (((autoOrders - lastAutoOrders) / Math.max(1, lastAutoOrders)) * 100).toFixed(2),
    orderAsinTotal, orderAsinSelf, orderAsinAuto,
    orderAsinTotalRatio: ((orderAsinTotal / Math.max(1, totalAsin)) * 100).toFixed(2),
    orderAsinSelfRatio: ((orderAsinSelf / Math.max(1, selfAsin)) * 100).toFixed(2),
    orderAsinAutoRatio: ((orderAsinAuto / Math.max(1, autoAsin)) * 100).toFixed(2),
    activeAsinTotal, activeAsinSelf, activeAsinAuto,
    activeAsinTotalRatio: ((activeAsinTotal / Math.max(1, totalAsin)) * 100).toFixed(2),
    activeAsinSelfRatio: ((activeAsinSelf / Math.max(1, selfAsin)) * 100).toFixed(2),
    activeAsinAutoRatio: ((activeAsinAuto / Math.max(1, autoAsin)) * 100).toFixed(2),
  };
};

const generateAccountSubRows = (parentName: string, level: number, type: 'profit' | 'order' | 'listing' | 'conversion' = 'order'): TableRow[] => {
  return [1, 2].map(i => ({
    department: `${parentName}-账号${i}`,
    level,
    headcountOrAccounts: 1,
    ...(type === 'order' ? generateRawOrderStats(0.4) : type === 'profit' ? generateRawProfitStats(0.4) : type === 'conversion' ? generateRawConversionStats(0.4) : generateRawListingStats(0.4)),
    jan5Rank: '-', salesTargetRank: '-', profitRank: '-', listingSalesRank: '-',
    isSubRow: true
  }));
};

// -------------------------------------------------------------------------
// 组织架构视角 (Org Perspective)
// -------------------------------------------------------------------------
export const generateSalesProfitData = (): TableRow[] => {
  const staffRawData = STAFF_NAMES.map(name => ({ name, stats: generateRawProfitStats(1) }));
  const salesSorted = [...staffRawData].sort((a, b) => b.stats.completedSales - a.stats.completedSales);
  const profitSorted = [...staffRawData].sort((a, b) => b.stats.completedProfit - a.stats.completedProfit);
  const staffRows = staffRawData.map(item => ({
    department: item.name, level: 1, headcountOrAccounts: 2, ...item.stats,
    salesTargetRank: salesSorted.findIndex(s => s.name === item.name) + 1,
    profitRank: profitSorted.findIndex(p => p.name === item.name) + 1,
    subRows: generateAccountSubRows(item.name, 2, 'profit')
  }));
  const dept1: any = { department: '亚马逊运营部', level: 0, headcountOrAccounts: STAFF_NAMES.length, ...generateRawProfitStats(STAFF_NAMES.length), salesTargetRank: '-', profitRank: '-', subRows: staffRows };
  return [dept1, { ...dept1, department: '汇总', subRows: [] }];
};

export const generateOrgOrderData = (): TableRow[] => {
  const staffRawData = STAFF_NAMES.map(name => ({ name, stats: generateRawOrderStats(1) }));
  const jan5Sorted = [...staffRawData].sort((a, b) => b.stats.jan5Orders - a.stats.jan5Orders);
  const staffRows = staffRawData.map(item => ({
    department: item.name, level: 1, headcountOrAccounts: 2, ...item.stats,
    jan5Rank: jan5Sorted.findIndex(s => s.name === item.name) + 1,
    subRows: generateAccountSubRows(item.name, 2, 'order')
  }));
  const dept1: any = { department: '亚马逊运营部', level: 0, headcountOrAccounts: STAFF_NAMES.length, ...generateRawOrderStats(STAFF_NAMES.length), jan5Rank: '-', subRows: staffRows };
  return [dept1, { ...dept1, department: '汇总', subRows: [] }];
};

export const generateOrgListingData = (): TableRow[] => {
  const staffRawData = STAFF_NAMES.map(name => ({ name, stats: generateRawListingStats(1) }));
  const salesSorted = [...staffRawData].sort((a, b) => b.stats.totalListingSales - a.stats.totalListingSales);
  const staffRows = staffRawData.map(item => ({
    department: item.name, level: 1, headcountOrAccounts: 2, ...item.stats,
    listingSalesRank: salesSorted.findIndex(s => s.name === item.name) + 1,
    subRows: generateAccountSubRows(item.name, 2, 'listing')
  }));
  const dept1: any = { department: '亚马逊运营部', level: 0, headcountOrAccounts: STAFF_NAMES.length, ...generateRawListingStats(STAFF_NAMES.length), listingSalesRank: '-', subRows: staffRows };
  return [dept1, { ...dept1, department: '汇总', subRows: [] }];
};

export const generateOrgConversionData = (): TableRow[] => {
  const staffRows = STAFF_NAMES.map(name => ({
    department: name, level: 1, headcountOrAccounts: 2, ...generateRawConversionStats(1),
    subRows: generateAccountSubRows(name, 2, 'conversion')
  }));
  const dept1: any = { department: '亚马逊运营部', level: 0, headcountOrAccounts: STAFF_NAMES.length, ...generateRawConversionStats(STAFF_NAMES.length), subRows: staffRows };
  return [dept1, { ...dept1, department: '汇总', subRows: [] }];
};

// -------------------------------------------------------------------------
// 国家站点视角 (Site Perspective) - 新顺序: 部门 -> 站点国家 -> 人名 -> 账号
// -------------------------------------------------------------------------
const generateSitePerspectiveData = (type: 'profit' | 'order' | 'listing' | 'conversion') => {
  const getRaw = (multiplier: number) => {
    if (type === 'profit') return generateRawProfitStats(multiplier);
    if (type === 'order') return generateRawOrderStats(multiplier);
    if (type === 'listing') return generateRawListingStats(multiplier);
    return generateRawConversionStats(multiplier);
  };

  return DEPARTMENTS.map(dept => ({
    department: dept,
    level: 0,
    headcountOrAccounts: SITES.length * 3 * 2,
    ...getRaw(SITES.length * 2),
    salesTargetRank: '-', profitRank: '-', jan5Rank: '-', listingSalesRank: '-',
    subRows: SITES.map(site => ({
      department: site,
      level: 1,
      headcountOrAccounts: 3 * 2,
      ...getRaw(3),
      salesTargetRank: '-', profitRank: '-', jan5Rank: '-', listingSalesRank: '-',
      subRows: STAFF_NAMES.slice(0, 3).map(staff => ({
        department: staff,
        level: 2,
        headcountOrAccounts: 2,
        ...getRaw(1),
        salesTargetRank: '-', profitRank: '-', jan5Rank: '-', listingSalesRank: '-',
        subRows: generateAccountSubRows(staff, 3, type)
      }))
    }))
  }));
};

export const SITE_PROFIT_MOCK_DATA = generateSitePerspectiveData('profit');
export const SITE_ORDER_MOCK_DATA = generateSitePerspectiveData('order');
export const SITE_LISTING_MOCK_DATA = generateSitePerspectiveData('listing');
export const SITE_CONVERSION_MOCK_DATA = generateSitePerspectiveData('conversion');

// -------------------------------------------------------------------------
// 其他统计 (Account/Warehouse Stats)
// -------------------------------------------------------------------------
const generateSimpleTabRows = (multiplier: number): TableRow[] => {
  const dept1: any = {
    department: '亚马逊运营部', level: 0, headcountOrAccounts: STAFF_NAMES.length, ...generateRawOrderStats(multiplier),
    headcount: STAFF_NAMES.length, perCapitaSales: Math.floor(Math.random() * 50000), totalAccounts: STAFF_NAMES.length * 2, activeAccounts: STAFF_NAMES.length * 1.5,
    newListingCount: Math.floor(Math.random() * 500), selfListingCount: Math.floor(Math.random() * 300),
    localSales: Math.floor(Math.random() * 20000), overseasSales: Math.floor(Math.random() * 30000), fbaSales: Math.floor(Math.random() * 50000), totalWarehouseSales: Math.floor(Math.random() * 100000),
    subRows: STAFF_NAMES.map(name => ({ department: name, level: 1, headcountOrAccounts: 2, ...generateRawOrderStats(multiplier / 5) }))
  };
  return [dept1, { ...dept1, department: '汇总', subRows: [] }];
};

export const TABS = [TabType.SALES_PROFIT, TabType.ORDER_STATS, TabType.ACCOUNT_STATS, TabType.SELF_LISTING, TabType.LISTING_CONVERSION, TabType.WAREHOUSE_SALES];

export const MOCK_DATA: Record<TabType, TableRow[]> = {
  [TabType.SALES_PROFIT]: generateSalesProfitData(),
  [TabType.ORDER_STATS]: generateOrgOrderData(),
  [TabType.ACCOUNT_STATS]: generateSimpleTabRows(5),
  [TabType.SELF_LISTING]: generateOrgListingData(),
  [TabType.LISTING_CONVERSION]: generateOrgConversionData(),
  [TabType.WAREHOUSE_SALES]: generateSimpleTabRows(4),
};

export const TAB_COLUMN_CONFIGS: Record<TabType, ColumnGroup[]> = {
  [TabType.SALES_PROFIT]: [
    { title: '', columns: [{ header: '名称/部门', key: 'department', sortable: true }] },
    { title: '销售目标进度', bgColor: 'bg-emerald-50', columns: [{ header: '目标额$', key: 'targetSales', format: 'number', sortable: true }, { header: '已完成$', key: 'completedSales', format: 'number', sortable: true }, { header: '销售排名', key: 'salesTargetRank', format: 'string', sortable: true }, { header: '进度', key: 'salesProgress', format: 'percent', sortable: true }, { header: '进度偏差', key: 'salesGap', format: 'percent', sortable: true }, { header: '预估进度', key: 'estSalesProgress', format: 'percent', sortable: true }] },
    { 
      title: '利润及实际数据分析', 
      bgColor: 'bg-yellow-50', 
      columns: [
        { header: '目标利润¥', key: 'targetProfit', format: 'number', sortable: true }, 
        { header: '已完成¥', key: 'completedProfit', format: 'number', sortable: true }, 
        { header: '利润排名', key: 'profitRank', format: 'string', sortable: true },
        { header: '进度', key: 'profitProgress', format: 'percent', sortable: true },
        { header: '进度偏差', key: 'profitGap', format: 'percent', sortable: true },
        { header: '预估月进度', key: 'estProfitProgress', format: 'percent', sortable: true },
        { header: '系统利润率', key: 'profitRate', format: 'percent', sortable: true }, 
        { header: '实际退款率', key: 'actualRefundRate', format: 'percent', sortable: true }, 
        { header: '实际广告率', key: 'actualAdRate', format: 'percent', sortable: true }, 
        { header: '实际利润率', key: 'actualProfitRate', format: 'percent', sortable: true }
      ] 
    }
  ],
  [TabType.ORDER_STATS]: [
    { title: '基础信息', columns: [{ header: '名称/维度', key: 'department', sortable: true }, { header: '账号数', key: 'headcountOrAccounts', format: 'number', sortable: true }] },
    { title: '趋势详情 (1.1 - 1.5)', bgColor: 'bg-[#FFEB3B]/20', columns: [{ header: '1月1日', key: 'jan1Orders', format: 'number', sortable: true }, { header: '1月2日', key: 'jan2Orders', format: 'number', sortable: true }, { header: '1月3日', key: 'jan3Orders', format: 'number', sortable: true }, { header: '1月4日', key: 'jan4Orders', format: 'number', sortable: true }, { header: '1月5日', key: 'jan5Orders', format: 'number', sortable: true }, { header: '排名', key: 'jan5Rank', format: 'string', sortable: true }, { header: '趋势', key: 'trend', format: 'trend' }, { header: '上周同天', key: 'lastWeekSameDayOrders', format: 'number', sortable: true }, { header: '同比增长', key: 'jan5GrowthRate', format: 'percent', sortable: true }, { header: '今日亏损', key: 'jan5LossOrders', format: 'number', sortable: true }, { header: '亏损占比', key: 'jan5LossRatio', format: 'percent', sortable: true }] },
    { title: '周统计', bgColor: 'bg-[#C8E6C9]/40', columns: [{ header: '本周订单', key: 'thisWeekOrders', format: 'number', sortable: true }, { header: '上周总计', key: 'lastWeekOrders', format: 'number', sortable: true }, { header: '同比增长', key: 'weekGrowthRate', format: 'percent', sortable: true }, { header: '周亏损订单', key: 'thisWeekLossOrders', format: 'number', sortable: true }, { header: '亏损占比', key: 'thisWeekLossRatio', format: 'percent', sortable: true }] },
    { title: '月统计', bgColor: 'bg-indigo-50', columns: [{ header: '本月订单', key: 'thisMonthOrders', format: 'number', sortable: true }, { header: '上月总计', key: 'lastMonthOrders', format: 'number', sortable: true }, { header: '环比增长', key: 'monthGrowthRate', format: 'percent', sortable: true }, { header: '本月亏损订单', key: 'thisMonthLossOrders', format: 'number', sortable: true }, { header: '本月亏损占比', key: 'thisMonthLossRatio', format: 'percent', sortable: true }] }
  ],
  [TabType.ACCOUNT_STATS]: [{ title: '', columns: [{ header: '部门', key: 'department', sortable: true }] }, { title: '人效分析', bgColor: 'bg-cyan-50', columns: [{ header: '部门人数', key: 'headcount', format: 'number', sortable: true }, { header: '人均$', key: 'perCapitaSales', format: 'number', sortable: true }] }, { title: '账号分析', bgColor: 'bg-yellow-50', columns: [{ header: '全部账号', key: 'totalAccounts', format: 'number', sortable: true }, { header: '在运营账号', key: 'activeAccounts', format: 'number', sortable: true }] }],
  [TabType.SELF_LISTING]: [
    { title: '维度信息', columns: [{ header: '部门/名称', key: 'department', sortable: true }] },
    { title: '刊登数量分析', bgColor: 'bg-blue-50', columns: [
      { header: '总刊登数量', key: 'totalListingCount', format: 'number', sortable: true },
      { header: '自主刊登数量', key: 'selfListingCount', format: 'number', sortable: true },
      { header: '自动刊登数量', key: 'autoListingCount', format: 'number', sortable: true },
      { header: '自主刊登占比', key: 'selfListingRatio', format: 'percent', sortable: true },
      { header: '自动刊登占比', key: 'autoListingRatio', format: 'percent', sortable: true },
    ]},
    { title: '自动刊登质量', bgColor: 'bg-red-50', columns: [
      { header: '自动刊登失败数量', key: 'autoFailedCount', format: 'number', sortable: true },
      { header: '自动刊登失败占比', key: 'autoFailureRatio', format: 'percent', sortable: true },
    ]},
    { title: '销售额分析', bgColor: 'bg-emerald-50', columns: [
      { header: '排名', key: 'listingSalesRank', format: 'string', sortable: true },
      { header: '刊登销售额$', key: 'totalListingSales', format: 'number', sortable: true },
      { header: '自主刊登销售额$', key: 'selfListingSales', format: 'number', sortable: true },
      { header: '自动刊登销售额$', key: 'autoListingSales', format: 'number', sortable: true },
      { header: '自主销售额占比', key: 'selfSalesRatio', format: 'percent', sortable: true },
      { header: '自动销售额占比', key: 'autoSalesRatio', format: 'percent', sortable: true },
    ]}
  ],
  [TabType.LISTING_CONVERSION]: [
    { title: '维度', columns: [{ header: '部门/国家', key: 'department', sortable: true }] },
    { 
      title: 'ASIN与基础出单', 
      bgColor: 'bg-cyan-50', 
      columns: [
        { header: 'ASIN刊登数量', key: 'totalAsin', format: 'number', sortable: true },
        { header: '自主刊登ASIN数量', key: 'selfAsin', format: 'number', sortable: true },
        { header: '自动刊登ASIN数量', key: 'autoAsin', format: 'number', sortable: true },
        { header: '总出单量', key: 'totalOrders', format: 'number', sortable: true },
        { header: '上期总出单量', key: 'lastTotalOrders', format: 'number', sortable: true },
        { header: '总出单同比增长', key: 'totalGrowth', format: 'percent', sortable: true },
        { header: '自主出单量', key: 'selfOrders', format: 'number', sortable: true },
        { header: '自动出单量', key: 'autoOrders', format: 'number', sortable: true },
        { header: '上期自主出单量', key: 'lastSelfOrders', format: 'number', sortable: true },
        { header: '上期自动出单量', key: 'lastAutoOrders', format: 'number', sortable: true },
        { header: '自主同比增长', key: 'selfGrowth', format: 'percent', sortable: true },
        { header: '自动同比增长', key: 'autoGrowth', format: 'percent', sortable: true },
      ]
    },
    {
      title: '出单率分析 (出单>1)',
      bgColor: 'bg-blue-50',
      columns: [
        { header: '出单ASIN个数', key: 'orderAsinTotal', format: 'number', sortable: true },
        { header: '出单自主ASIN个数', key: 'orderAsinSelf', format: 'number', sortable: true },
        { header: '出单自动ASIN个数', key: 'orderAsinAuto', format: 'number', sortable: true },
        { header: '出单ASIN占比', key: 'orderAsinTotalRatio', format: 'percent', sortable: true },
        { header: '自主出单占比', key: 'orderAsinSelfRatio', format: 'percent', sortable: true },
        { header: '自动出单占比', key: 'orderAsinAutoRatio', format: 'percent', sortable: true },
      ]
    },
    {
      title: '动销率分析 (出单>=3)',
      bgColor: 'bg-indigo-50',
      columns: [
        { header: '动销ASIN个数', key: 'activeAsinTotal', format: 'number', sortable: true },
        { header: '动销自主ASIN个数', key: 'activeAsinSelf', format: 'number', sortable: true },
        { header: '动销自动ASIN个数', key: 'activeAsinAuto', format: 'number', sortable: true },
        { header: '动销ASIN占比', key: 'activeAsinTotalRatio', format: 'percent', sortable: true },
        { header: '自主动销占比', key: 'activeAsinSelfRatio', format: 'percent', sortable: true },
        { header: '自动动销占比', key: 'activeAsinAutoRatio', format: 'percent', sortable: true },
      ]
    }
  ],
  [TabType.WAREHOUSE_SALES]: [{ title: '', columns: [{ header: '部门', key: 'department', sortable: true }] }, { title: '仓位分布销量', columns: [{ header: '本地仓', key: 'localSales', format: 'number', sortable: true }, { header: '海外仓', key: 'overseasSales', format: 'number', sortable: true }, { header: 'FBA仓', key: 'fbaSales', format: 'number', sortable: true }, { header: '总销量', key: 'totalWarehouseSales', format: 'number', sortable: true }] }]
};
