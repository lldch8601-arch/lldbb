
import React, { useState } from 'react';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import { TabType } from './types';
import { TABS, TAB_COLUMN_CONFIGS, MOCK_DATA, SITE_LISTING_MOCK_DATA, SITE_ORDER_MOCK_DATA, SITE_CONVERSION_MOCK_DATA, SITE_PROFIT_MOCK_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SALES_PROFIT);
  const [perspective, setPerspective] = useState<'org' | 'site'>('org');

  // 根据当前Tab和视角获取数据
  const currentData = (() => {
    if (perspective === 'site') {
      if (activeTab === TabType.SALES_PROFIT) return SITE_PROFIT_MOCK_DATA;
      if (activeTab === TabType.SELF_LISTING) return SITE_LISTING_MOCK_DATA;
      if (activeTab === TabType.ORDER_STATS) return SITE_ORDER_MOCK_DATA;
      if (activeTab === TabType.LISTING_CONVERSION) return SITE_CONVERSION_MOCK_DATA;
    }
    // 默认返回组织视角数据
    return MOCK_DATA[activeTab];
  })();

  const showPerspectiveSwitcher = 
    activeTab === TabType.SALES_PROFIT ||
    activeTab === TabType.ORDER_STATS || 
    activeTab === TabType.SELF_LISTING || 
    activeTab === TabType.LISTING_CONVERSION;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">业绩统计仪表盘</h1>
            
            {showPerspectiveSwitcher && (
              <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200 shadow-sm">
                <button
                  onClick={() => setPerspective('org')}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    perspective === 'org' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  组织架构视角
                </button>
                <button
                  onClick={() => setPerspective('site')}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    perspective === 'site' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.657M7 20h11a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
                  国家站点视角
                </button>
              </div>
            )}
          </div>
          <FilterBar />
        </header>

        <main className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="flex items-center border-b border-slate-200 bg-slate-50/50 overflow-x-auto custom-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // 如果切换到的Tab不支持站点视角，强制回到组织架构视角
                  if (tab !== TabType.SALES_PROFIT && tab !== TabType.ORDER_STATS && tab !== TabType.SELF_LISTING && tab !== TabType.LISTING_CONVERSION) {
                    setPerspective('org');
                  }
                }}
                className={`px-6 py-3 text-sm font-medium transition-all relative border-r border-slate-200 whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-600 bg-white border-b-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                当前统计：{activeTab} 
                <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] border border-blue-100">
                  {perspective === 'org' ? '部门/员工架构' : '全球站点分布'}
                </span>
              </div>
            </div>
            <DataTable 
              groups={TAB_COLUMN_CONFIGS[activeTab]} 
              data={currentData} 
            />
          </div>
        </main>
        <footer className="mt-8 text-center text-slate-400 text-xs">© 2026 E-commerce Performance Tracking System. 所有数据均为随机生成的演示数据。</footer>
      </div>
    </div>
  );
};

export default App;
