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
    profitRate: (8 + Math.random() * 12).toFixed(2), 
    actualRefundRate: (3 + Math.random() * 5).toFixed(2),
    actualAdRate: (8 + Math.random() * 7).toFixed(2),
    actualProfitRate: (8 + Math.random() * 12).toFixed(2), 
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
  const lastTotalOrders = Math.floor(totalOrders * 0.9);
  return {
    totalAsin, selfAsin, autoAsin,
    totalOrders, lastTotalOrders,
    totalGrowth: (((totalOrders - lastTotalOrders) / Math.max(1, lastTotalOrders)) * 100).toFixed(2),
    selfOrders: Math.floor(totalOrders * 0.4),
    autoOrders: Math.floor(totalOrders * 0.6),
    lastSelfOrders: Math.floor(totalOrders * 0.35),
    lastAutoOrders: Math.floor(totalOrders * 0.55),
    selfGrowth: (Math.random() * 10).toFixed(2),
    autoGrowth: (Math.random() * 10).toFixed(2),
    orderAsinTotal: Math.floor(totalAsin * 0.5),
    orderAsinSelf: Math.floor(selfAsin * 0.6),
    orderAsinAuto: Math.floor(autoAsin * 0.4),
    orderAsinTotalRatio: (50).toFixed(2),
    orderAsinSelfRatio: (60).toFixed(2),
    orderAsinAutoRatio: (40).toFixed(2),
    activeAsinTotal: Math.floor(totalAsin * 0.2),
    activeAsinSelf: Math.floor(selfAsin * 0.25),
    activeAsinAuto: Math.floor(autoAsin * 0.15),
    activeAsinTotalRatio: (20).toFixed(2),
    activeAsinSelfRatio: (25).toFixed(2),
    activeAsinAutoRatio: (15).toFixed(2),
  };
};

const generateAccountSubRows = (parentName: string, level: number, type: TabType): TableRow[] => {
  return [1, 2].map(i => ({
    department: `${parentName}-账号${i}`,
    level,
    headcountOrAccounts: 1,
    ...(type === 'profit' ? generateRawProfitStats(0.4) : type === 'order' ? generateRawOrderStats(0.4) : type === 'conversion' ? generateRawConversionStats(0.4) : generateRawListingStats(0.4)),
    isSubRow: true
  }));
};

// 国家站点视角 - 四级扩展: 部门 -> 站点国家 -> 人名 -> 账号
const generateSitePerspectiveData = (type: TabType) => {
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
    subRows: SITES.map(site => ({
      department: site,
      level: 1,
      headcountOrAccounts: 3 * 2,
      ...getRaw(3),
      subRows: STAFF_NAMES.slice(0, 3).map(staff => ({
        department: staff,
        level: 2,
        headcountOrAccounts: 2,
        ...getRaw(0.4),
        subRows: generateAccountSubRows(staff, 3, type)
      }))
    }))
  }));
};

// 组织架构视角 - 基础数据（适配MOCK_DATA的Tab映射）
const generateOrgPerspectiveData = (type: TabType) => {
  // 简化的组织视角数据，和站点视角结构一致，保证DataTable组件能通用
  return DEPARTMENTS.map(dept => ({
    department: dept,
    level: 0,
    headcountOrAccounts: STAFF_NAMES.length * 2,
    ...(type === 'profit' ? generateRawProfitStats(STAFF_NAMES.length) : type === 'order' ? generateRawOrderStats(STAFF_NAMES.length) : type === 'listing' ? generateRawListingStats(STAFF_NAMES.length) : generateRawConversionStats(STAFF_NAMES.length)),
    subRows: STAFF_NAMES.map(staff => ({
      department: staff,
      level: 1,
      headcountOrAccounts: 2,
      ...(type === 'profit' ? generateRawProfitStats(1) : type === 'order' ? generateRawOrderStats(1) : type === 'listing' ? generateRawListingStats(1) : generateRawConversionStats(1)),
      subRows: generateAccountSubRows(staff, 2, type),
      isSubRow: true
    }))
  }));
};

// 🔴 补全缺失项1：TABS - 对应App.tsx的标签页列表，和TabType完全匹配
export const TABS: TabType[] = [
  TabType.SALES_PROFIT,
  TabType.ORDER_STATS,
  TabType.SELF_LISTING,
  TabType.LISTING_CONVERSION
];

// 🔴 补全缺失项2：TAB_COLUMN_CONFIGS - 列配置（基础结构，你可根据需求补充具体列）
export const TAB_COLUMN_CONFIGS: Record<TabType, ColumnGroup[]> = {
  [TabType.SALES_PROFIT]: [{ title: '利润统计', columns: [{ key: 'department', title: '部门/员工' }, { key: 'targetProfit', title: '目标利润' }, { key: 'completedProfit', title: '完成利润' }, { key: 'profitProgress', title: '完成率(%)' }] }],
  [TabType.ORDER_STATS]: [{ title: '订单统计', columns: [{ key: 'department', title: '部门/员工' }, { key: 'jan5Orders', title: '当日订单' }, { key: 'thisWeekOrders', title: '本周订单' }, { key: 'weekGrowthRate', title: '周增长率(%)' }] }],
  [TabType.SELF_LISTING]: [{ title: '自铺Listing统计', columns: [{ key: 'department', title: '部门/员工' }, { key: 'selfListingCount', title: '自铺数量' }, { key: 'selfListingSales', title: '自铺销售额' }, { key: 'selfSalesRatio', title: '自铺占比(%)' }] }],
  [TabType.LISTING_CONVERSION]: [{ title: 'Listing转化统计', columns: [{ key: 'department', title: '部门/员工' }, { key: 'totalOrders', title: '总订单' }, { key: 'totalGrowth', title: '总增长率(%)' }, { key: 'orderAsinTotalRatio', title: '出单ASIN占比(%)' }] }]
};

// 🔴 补全缺失项3：MOCK_DATA - 组织视角的各Tab数据，和App.tsx的使用逻辑匹配
export const MOCK_DATA: Record<TabType, TableRow[]> = {
  [TabType.SALES_PROFIT]: generateOrgPerspectiveData(TabType.SALES_PROFIT),
  [TabType.ORDER_STATS]: generateOrgPerspectiveData(TabType.ORDER_STATS),
  [TabType.SELF_LISTING]: generateOrgPerspectiveData(TabType.SELF_LISTING),
  [TabType.LISTING_CONVERSION]: generateOrgPerspectiveData(TabType.LISTING_CONVERSION)
};

// ✅ 原有已补的4个站点视角mock数据
export const SITE_PROFIT_MOCK_DATA = generateSitePerspectiveData(TabType.SALES_PROFIT);
export const SITE_ORDER_MOCK_DATA = generateSitePerspectiveData(TabType.ORDER_STATS);
export const SITE_LISTING_MOCK_DATA = generateSitePerspectiveData(TabType.SELF_LISTING);
export const SITE_CONVERSION_MOCK_DATA = generateSitePerspectiveData(TabType.LISTING_CONVERSION);
