
import { TabType, ColumnGroup, TableRow } from './types';

export const STAFF_NAMES = ['陈银川', '陈纯羽', '杨继昆', '彭玉仪', '赵丹婷', '吴雪茹'];
export const SITES = ['US (美国)', 'UK (英国)', 'DE (德国)', 'JP (日本)', 'FR (法国)', 'CA (加拿大)'];
export const DEPARTMENTS = ['运营一课', '运营二课'];

// -------------------------------------------------------------------------
// 1. 基础数据生成器
// -------------------------------------------------------------------------

const calcGrowth = (c: number, p: number) => (((c - p) / Math.max(1, p)) * 100).toFixed(2);

const generateRawOrderStats = (multiplier: number = 1) => {
  const jan1 = Math.floor((Math.random() * 400 + 80) * multiplier);
  const jan2 = Math.floor((Math.random() * 420 + 90) * multiplier);
  const jan3 = Math.floor((Math.random() * 450 + 95) * multiplier);
  const jan4 = Math.floor((Math.random() * 500 + 100) * multiplier);
  const jan5 = Math.floor((Math.random() * 500 + 100) * multiplier);
  const lastWeekSameDay = Math.floor(jan5 * (0.8 + Math.random() * 0.3));
  return {
    jan1Orders: jan1, jan2Orders: jan2, jan3Orders: jan3, jan4Orders: jan4, jan5Orders: jan5,
    lastWeekSameDayOrders: lastWeekSameDay,
    jan5GrowthRate: calcGrowth(jan5, lastWeekSameDay),
    jan5LossOrders: Math.floor(jan5 * 0.1),
    jan5LossRatio: (8 + Math.random() * 5).toFixed(2),
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
    profitRate: (10 + Math.random() * 12).toFixed(2), 
    actualRefundRate: (3 + Math.random() * 5).toFixed(2),
    actualAdRate: (8 + Math.random() * 7).toFixed(2),
    actualProfitRate: (10 + Math.random() * 12).toFixed(2), 
  };
};

const generateRawListingStats = (multiplier: number = 1) => {
  const total = Math.floor((Math.random() * 2000 + 1000) * multiplier);
  const self = Math.floor(total * (0.3 + Math.random() * 0.2));
  const auto = total - self;
  
  const daysInMonth = 30;
  const targetSelf = Math.floor(30 * daysInMonth * multiplier); 
  const diff = auto - targetSelf; 
  
  const autoFailed = Math.floor(auto * (Math.random() * 0.05));
  const totalSales = Math.floor((Math.random() * 500000 + 100000) * multiplier);
  const selfSales = Math.floor(totalSales * (0.4 + Math.random() * 0.2));
  const autoSales = totalSales - selfSales;

  return {
    totalListingCount: total,
    selfListingCount: self,
    autoListingCount: auto,
    targetSelfListingCount: targetSelf,
    autoTargetDiff: diff,
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

  const generateTrend = (base: number) => Array.from({ length: 5 }, () => Number((base + Math.random() * 10 - 5).toFixed(2)));

  return {
    totalAsin, selfAsin, autoAsin,
    totalOrders, lastTotalOrders,
    totalGrowth: calcGrowth(totalOrders, lastTotalOrders),
    selfOrders, autoOrders,
    lastSelfOrders, lastAutoOrders,
    selfGrowth: calcGrowth(selfOrders, lastSelfOrders),
    autoGrowth: calcGrowth(autoOrders, lastAutoOrders),
    orderAsinTotal, orderAsinSelf, orderAsinAuto,
    orderAsinTotalRatio: ((orderAsinTotal / Math.max(1, totalAsin)) * 100).toFixed(2),
    orderAsinSelfRatio: ((orderAsinSelf / Math.max(1, selfAsin)) * 100).toFixed(2),
    orderAsinAutoRatio: ((orderAsinAuto / Math.max(1, autoAsin)) * 100).toFixed(2),
    activeAsinTotal, activeAsinSelf, activeAsinAuto,
    activeAsinTotalRatio: ((activeAsinTotal / Math.max(1, totalAsin)) * 100).toFixed(2),
    activeAsinSelfRatio: ((activeAsinSelf / Math.max(1, selfAsin)) * 100).toFixed(2),
    activeAsinAutoRatio: ((activeAsinAuto / Math.max(1, autoAsin)) * 100).toFixed(2),
    orderRateTrend: [
      { label: '自主', data: generateTrend(50), color: '#ef4444' },
      { label: '自动', data: generateTrend(35), color: '#3b82f6' }
    ],
    activeRateTrend: [
      { label: '自主', data: generateTrend(30), color: '#ef4444' },
      { label: '自动', data: generateTrend(15), color: '#3b82f6' }
    ],
    jan1Orders: Math.floor(Math.random() * 100),
    jan2Orders: Math.floor(Math.random() * 100),
    jan3Orders: Math.floor(Math.random() * 100),
    jan4Orders: Math.floor(Math.random() * 100),
    jan5Orders: Math.floor(Math.random() * 100),
  };
};

const generateRawAccountAndEfficiencyStats = (multiplier: number = 1) => {
  const headcount = Math.max(1, Math.floor(5 * multiplier));
  const totalAccounts = Math.max(1, Math.floor(headcount * 2.5));
  const activeAccounts = Math.floor(totalAccounts * 0.85);
  
  return {
    headcount,
    jan5SalesPC: Math.floor(Math.random() * 4000 + 800),
    lastWeekSameDaySalesPC: Math.floor(Math.random() * 3800 + 700),
    jan5SalesPCGrowth: (Math.random() * 12 - 4).toFixed(2),
    weekSalesPC: Math.floor(Math.random() * 20000 + 4000),
    lastWeekSalesPC: Math.floor(Math.random() * 19000 + 3500),
    weekSalesPCGrowth: (Math.random() * 10 - 2).toFixed(2),
    monthSalesPC: Math.floor(Math.random() * 80000 + 15000),
    lastMonthSalesPC: Math.floor(Math.random() * 75000 + 12000),
    monthSalesPCGrowth: (Math.random() * 8 - 1).toFixed(2),
    jan5OrdersPC: Math.floor(Math.random() * 150 + 30),
    lastWeekSameDayOrdersPC: Math.floor(Math.random() * 140 + 25),
    jan5OrdersPCGrowth: (Math.random() * 15 - 5).toFixed(2),
    weekOrdersPC: Math.floor(Math.random() * 800 + 200),
    lastWeekOrdersPC: Math.floor(Math.random() * 750 + 180),
    weekOrdersPCGrowth: (Math.random() * 12 - 3).toFixed(2),
    monthOrdersPC: Math.floor(Math.random() * 3500 + 800),
    lastMonthOrdersPC: Math.floor(Math.random() * 3200 + 700),
    monthOrdersPCGrowth: (Math.random() * 9 - 2).toFixed(2),
    totalAccounts,
    activeAccounts,
    avgSalesTotalAcc: Math.floor(Math.random() * 2500),
    avgOrdersTotalAcc: Math.floor(Math.random() * 120),
    avgSalesActiveAcc: Math.floor(Math.random() * 3200),
    avgOrdersActiveAcc: Math.floor(Math.random() * 160),
  };
};

const getStatsByType = (type: string, m: number) => {
  if (type === 'profit') return generateRawProfitStats(m);
  if (type === 'order') return generateRawOrderStats(m);
  if (type === 'listing') return generateRawListingStats(m);
  if (type === 'conversion') return generateRawConversionStats(m);
  if (type === 'efficiency') return generateRawAccountAndEfficiencyStats(m);
  return {};
};

// -------------------------------------------------------------------------
// 2. 层级构建逻辑 (四级钻取)
// -------------------------------------------------------------------------

const genLevel3Accounts = (staffName: string, type: string) => [1, 2].map(i => ({
  department: `${staffName}-账号${i}`,
  level: 3,
  ...getStatsByType(type, 0.4),
  isSubRow: true
}));

const genLevel2Staff = (siteName: string, type: string) => STAFF_NAMES.slice(0, 3).map((name, idx) => ({
  department: name,
  level: 2,
  ...getStatsByType(type, 1),
  salesTargetRank: idx + 1,
  profitRank: idx + 1,
  jan5Rank: idx + 1,
  listingSalesRank: idx + 1,
  jan5SalesRankPC: idx + 1,
  jan5OrdersRankPC: idx + 1,
  subRows: genLevel3Accounts(name, type)
}));

const genLevel1Sites = (deptName: string, type: string) => SITES.map((site, idx) => ({
  department: site,
  level: 1,
  ...getStatsByType(type, 2),
  salesTargetRank: idx + 1,
  profitRank: idx + 1,
  jan5Rank: idx + 1,
  listingSalesRank: idx + 1,
  jan5SalesRankPC: idx + 1,
  jan5OrdersRankPC: idx + 1,
  subRows: genLevel2Staff(site, type)
}));

const generateSitePerspectiveData = (type: string): TableRow[] => {
  return DEPARTMENTS.map((dept, idx) => ({
    department: dept,
    level: 0,
    ...getStatsByType(type, SITES.length * 3),
    salesTargetRank: idx + 1,
    profitRank: idx + 1,
    jan5Rank: idx + 1,
    listingSalesRank: idx + 1,
    jan5SalesRankPC: idx + 1,
    jan5OrdersRankPC: idx + 1,
    subRows: genLevel1Sites(dept, type)
  }));
};

const generateOrgPerspectiveData = (type: string): TableRow[] => {
  return DEPARTMENTS.map((dept, idx) => ({
    department: dept,
    level: 0,
    ...getStatsByType(type, STAFF_NAMES.length),
    salesTargetRank: idx + 1,
    profitRank: idx + 1,
    jan5Rank: idx + 1,
    listingSalesRank: idx + 1,
    jan5SalesRankPC: idx + 1,
    jan5OrdersRankPC: idx + 1,
    subRows: STAFF_NAMES.map((name, sIdx) => ({
      department: name,
      level: 1,
      ...getStatsByType(type, 1),
      salesTargetRank: sIdx + 1,
      profitRank: sIdx + 1,
      jan5Rank: sIdx + 1,
      listingSalesRank: sIdx + 1,
      jan5SalesRankPC: sIdx + 1,
      jan5OrdersRankPC: sIdx + 1,
      subRows: genLevel3Accounts(name, type)
    }))
  }));
};

export const SITE_PROFIT_MOCK_DATA = generateSitePerspectiveData('profit');
export const SITE_ORDER_MOCK_DATA = generateSitePerspectiveData('order');
export const SITE_LISTING_MOCK_DATA = generateSitePerspectiveData('listing');
export const SITE_CONVERSION_MOCK_DATA = generateSitePerspectiveData('conversion');
export const SITE_EFFICIENCY_MOCK_DATA = generateSitePerspectiveData('efficiency');

// -------------------------------------------------------------------------
// 3. Tab 数据映射
// -------------------------------------------------------------------------

export const TABS = [TabType.SALES_PROFIT, TabType.ORDER_STATS, TabType.ACCOUNT_STATS, TabType.SELF_LISTING, TabType.LISTING_CONVERSION, TabType.WAREHOUSE_SALES];

export const MOCK_DATA: Record<TabType, TableRow[]> = {
  [TabType.SALES_PROFIT]: generateOrgPerspectiveData('profit'),
  [TabType.ORDER_STATS]: generateOrgPerspectiveData('order'),
  [TabType.ACCOUNT_STATS]: generateOrgPerspectiveData('efficiency'),
  [TabType.SELF_LISTING]: generateOrgPerspectiveData('listing'),
  [TabType.LISTING_CONVERSION]: generateOrgPerspectiveData('conversion'),
  [TabType.WAREHOUSE_SALES]: [
    { department: '亚马逊运营部', level: 0, localSales: 30000, overseasSales: 45000, fbaSales: 80000, totalWarehouseSales: 155000, ...generateRawOrderStats(5),
      subRows: STAFF_NAMES.map(name => ({ department: name, level: 1, localSales: 6000, overseasSales: 9000, fbaSales: 16000, totalWarehouseSales: 31000 }))
    },
    { department: '汇总', level: 0, localSales: 200000, overseasSales: 300000, fbaSales: 500000, totalWarehouseSales: 1000000 }
  ],
};

// -------------------------------------------------------------------------
// 4. 列配置
// -------------------------------------------------------------------------

export const TAB_COLUMN_CONFIGS: Record<TabType, ColumnGroup[]> = {
  [TabType.SALES_PROFIT]: [
    { title: '', columns: [{ header: '名称/部门', key: 'department', sortable: true }] },
    { title: '销售目标进度', bgColor: 'bg-emerald-50', columns: [
      { header: '目标额$', key: 'targetSales', format: 'number', sortable: true }, 
      { header: '已完成$', key: 'completedSales', format: 'number', sortable: true }, 
      { header: '销售排名', key: 'salesTargetRank', format: 'string', sortable: true }, 
      { header: '进度', key: 'salesProgress', format: 'percent', sortable: true }, 
      { header: '进度偏差', key: 'salesGap', format: 'percent', sortable: true }, 
      { header: '预估进度', key: 'estSalesProgress', format: 'percent', sortable: true }
    ]},
    { title: '利润及实际数据分析', bgColor: 'bg-yellow-50', columns: [
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
    ]}
  ],
  [TabType.ORDER_STATS]: [
    { title: '基础信息', columns: [{ header: '名称/维度', key: 'department', sortable: true }, { header: '账号数', key: 'headcountOrAccounts', format: 'number', sortable: true }] },
    { title: '趋势详情 (1.1 - 1.5)', bgColor: 'bg-[#FFEB3B]/20', columns: [
      { header: '1月1日', key: 'jan1Orders', format: 'number', sortable: true }, 
      { header: '1月2日', key: 'jan2Orders', format: 'number', sortable: true }, 
      { header: '1月3日', key: 'jan3Orders', format: 'number', sortable: true }, 
      { header: '1月4日', key: 'jan4Orders', format: 'number', sortable: true }, 
      { header: '1月5日', key: 'jan5Orders', format: 'number', sortable: true }, 
      { header: '排名', key: 'jan5Rank', format: 'string', sortable: true }, 
      { header: '趋势', key: 'trend', format: 'trend' }, 
      { header: '上周同天', key: 'lastWeekSameDayOrders', format: 'number', sortable: true }, 
      { header: '同比增长', key: 'jan5GrowthRate', format: 'percent', sortable: true }, 
      { header: '今日亏损', key: 'jan5LossOrders', format: 'number', sortable: true }, 
      { header: '亏损占比', key: 'jan5LossRatio', format: 'percent', sortable: true }
    ]},
    { title: '周统计', bgColor: 'bg-[#C8E6C9]/40', columns: [
      { header: '本周订单', key: 'thisWeekOrders', format: 'number', sortable: true }, 
      { header: '上周总计', key: 'lastWeekOrders', format: 'number', sortable: true }, 
      { header: '同比增长', key: 'weekGrowthRate', format: 'percent', sortable: true }, 
      { header: '周亏损订单', key: 'thisWeekLossOrders', format: 'number', sortable: true }, 
      { header: '亏损占比', key: 'thisWeekLossRatio', format: 'percent', sortable: true }
    ]},
    { title: '月统计', bgColor: 'bg-indigo-50', columns: [
      { header: '本月订单', key: 'thisMonthOrders', format: 'number', sortable: true }, 
      { header: '上月总计', key: 'lastMonthOrders', format: 'number', sortable: true }, 
      { header: '环比增长', key: 'monthGrowthRate', format: 'percent', sortable: true }, 
      { header: '本月亏损订单', key: 'thisMonthLossOrders', format: 'number', sortable: true }, 
      { header: '本月亏损占比', key: 'thisMonthLossRatio', format: 'percent', sortable: true }
    ]}
  ],
  [TabType.ACCOUNT_STATS]: [
    { title: '维度', columns: [{ header: '部门/账号', key: 'department', sortable: true }] },
    { title: '人效分析 (销售额)', bgColor: 'bg-indigo-50/80', columns: [
      { header: '部门人数', key: 'headcount', format: 'number' },
      { header: '1.5号人均销售额', key: 'jan5SalesPC', format: 'number' },
      { header: '人均销售排名', key: 'jan5SalesRankPC', format: 'string', sortable: true },
      { header: '上周同天人均销售额', key: 'lastWeekSameDaySalesPC', format: 'number' },
      { header: '同比增长', key: 'jan5SalesPCGrowth', format: 'percent' },
      { header: '当周人均销售额', key: 'weekSalesPC', format: 'number' },
      { header: '上周人均销售额', key: 'lastWeekSalesPC', format: 'number' },
      { header: '同比增长', key: 'weekSalesPCGrowth', format: 'percent' },
      { header: '单月人均销售额', key: 'monthSalesPC', format: 'number' },
      { header: '上月人均销售额', key: 'lastMonthSalesPC', format: 'number' },
      { header: '同比增加', key: 'monthSalesPCGrowth', format: 'percent' },
    ]},
    { title: '人效分析 (订单)', bgColor: 'bg-emerald-50/80', columns: [
      { header: '1.5号人均订单', key: 'jan5OrdersPC', format: 'number' },
      { header: '人均订单排名', key: 'jan5OrdersRankPC', format: 'string', sortable: true },
      { header: '上周同天人均订单', key: 'lastWeekSameDayOrdersPC', format: 'number' },
      { header: '同比增长', key: 'jan5OrdersPCGrowth', format: 'percent' },
      { header: '当周人均订单', key: 'weekOrdersPC', format: 'number' },
      { header: '上周人均订单', key: 'lastWeekOrdersPC', format: 'number' },
      { header: '同比增长', key: 'weekOrdersPCGrowth', format: 'percent' },
      { header: '单月人均订单', key: 'monthOrdersPC', format: 'number' },
      { header: '上月人均订单', key: 'lastMonthOrdersPC', format: 'number' },
      { header: '同比增加', key: 'monthOrdersPCGrowth', format: 'percent' },
    ]},
    { title: '账号统计', bgColor: 'bg-orange-50/80', columns: [
      { header: '全部账号', key: 'totalAccounts', format: 'number' },
      { header: '在运营账号', key: 'activeAccounts', format: 'number' },
      { header: '全部账号平均销售额', key: 'avgSalesTotalAcc', format: 'number' },
      { header: '全部账号平均订单', key: 'avgOrdersTotalAcc', format: 'number' },
      { header: '在运营账号平均销售额', key: 'avgSalesActiveAcc', format: 'number' },
      { header: '在运营账号平均订单', key: 'avgOrdersActiveAcc', format: 'number' },
    ]}
  ],
  [TabType.SELF_LISTING]: [
    { title: '维度信息', columns: [{ header: '部门/名称', key: 'department', sortable: true }] },
    { title: '刊登数量分析', bgColor: 'bg-blue-50', columns: [
      { header: '总刊登数量', key: 'totalListingCount', format: 'number', sortable: true },
      { header: '自主刊登数量', key: 'selfListingCount', format: 'number', sortable: true },
      { header: '自动刊登数量', key: 'autoListingCount', format: 'number', sortable: true },
      { header: '自主刊登占比', key: 'selfListingRatio', format: 'percent', sortable: true },
      { header: '自动刊登占比', key: 'autoListingRatio', format: 'percent', sortable: true },
      { header: '目标自主刊登数', key: 'targetSelfListingCount', format: 'number', sortable: true },
      { header: '刊登差额', key: 'autoTargetDiff', format: 'number', sortable: true },
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
    },
    {
      title: '趋势分析', 
      bgColor: 'bg-slate-50',
      columns: [
        { header: '出单率趋势 (红:自主 蓝:自动)', key: 'orderRateTrend', format: 'trend' },
        { header: '动销率趋势 (红:自主 蓝:自动)', key: 'activeRateTrend', format: 'trend' }
      ]
    }
  ],
  [TabType.WAREHOUSE_SALES]: [
    { title: '部门维度', columns: [{ header: '部门', key: 'department', sortable: true }] },
    { title: '仓位销量分布', bgColor: 'bg-rose-50/30', columns: [
      { header: '本地仓', key: 'localSales', format: 'number', sortable: true }, 
      { header: '海外仓', key: 'overseasSales', format: 'number', sortable: true }, 
      { header: 'FBA仓', key: 'fbaSales', format: 'number', sortable: true }, 
      { header: '总销量', key: 'totalWarehouseSales', format: 'number', sortable: true }
    ]}
  ]
};
