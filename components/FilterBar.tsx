
import React, { useState } from 'react';

type Granularity = 'day' | 'week' | 'month';
type OpTimeType = 'payment' | 'shipping';

const FilterBar: React.FC = () => {
  const [granularity, setGranularity] = useState<Granularity>('month');
  const [opTimeType, setOpTimeType] = useState<OpTimeType>('payment');
  const [platform, setPlatform] = useState<string>('全部平台');
  const [site, setSite] = useState<string>('全部站点');
  const [warehouseType, setWarehouseType] = useState<string>('全部仓库');

  const renderDateInput = (id: string) => {
    switch (granularity) {
      case 'day':
        return <input key={id} type="date" className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-40" />;
      case 'week':
        return <input key={id} type="week" className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-40" />;
      case 'month':
      default:
        return <input key={id} type="month" defaultValue="2026-01" className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-40" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-6 bg-white p-4 border border-slate-200 rounded-sm shadow-sm flex-wrap">
        {/* 基础维度 */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">部门:</label>
          <select className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-32">
            <option>全部部门</option>
            <option>亚马逊运营中心</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">平台:</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-32">
            <option>全部平台</option>
            <option>Amazon</option><option>eBay</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">站点:</label>
          <select value={site} onChange={(e) => setSite(e.target.value)} className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-32">
            <option>全部站点</option>
            <option>US (美国)</option><option>UK (英国)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">仓库类型:</label>
          <select value={warehouseType} onChange={(e) => setWarehouseType(e.target.value)} className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-32">
            <option>全部仓库</option>
            <option>本地仓</option>
            <option>海外仓</option>
            <option>FBA仓</option>
          </select>
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        {/* 统计粒度 */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">统计维度:</label>
          <div className="flex bg-slate-100 p-1 rounded-md">
            {(['day', 'week', 'month'] as const).map((g) => (
              <button key={g} onClick={() => setGranularity(g)} className={`px-3 py-1 text-xs rounded-md transition-all ${granularity === g ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>{g === 'day' ? '按日' : g === 'week' ? '按周' : '按月'}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded text-sm transition-colors shadow-sm font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>搜索</button>
          <button onClick={() => { setPlatform('全部平台'); setSite('全部站点'); setWarehouseType('全部仓库'); setOpTimeType('payment'); }} className="border border-slate-300 hover:bg-slate-50 text-slate-600 px-4 py-1.5 rounded text-sm transition-colors">还原</button>
        </div>
      </div>

      {/* 时间筛选第二行：双日期选择器 */}
      <div className="flex items-center gap-8 bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
        {/* 付款/发货组 */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-md">
            <button onClick={() => setOpTimeType('payment')} className={`px-3 py-1 text-xs rounded-md transition-all ${opTimeType === 'payment' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>付款时间</button>
            <button onClick={() => setOpTimeType('shipping')} className={`px-3 py-1 text-xs rounded-md transition-all ${opTimeType === 'shipping' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>发货时间</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">选择:</span>
            {renderDateInput('op-date')}
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* 刊登时间组 */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-md border border-emerald-100">
            刊登时间
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">选择:</span>
            {renderDateInput('listing-date')}
          </div>
        </div>

        <div className="ml-auto text-[10px] text-slate-400 italic">
          * 业务时间与刊登时间可分别独立筛选
        </div>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <div className="flex gap-2">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded text-sm transition-colors flex items-center gap-2 shadow-sm font-medium"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>导出报表</button>
        </div>
        <div className="text-xs text-slate-400 italic">数据最后更新: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default FilterBar;
