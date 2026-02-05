
import { TableRow, ColumnGroup } from '../types';
import React, { useMemo, useState } from 'react';

interface DataTableProps {
  groups: ColumnGroup[];
  data: TableRow[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

interface TrendDataset {
  label: string;
  data: number[];
  color: string;
}

const TrendChart: React.FC<{ datasets: TrendDataset[]; isMini?: boolean }> = ({ datasets, isMini = true }) => {
  const width = isMini ? 70 : 500;
  const height = isMini ? 24 : 300;
  const padding = isMini ? 4 : 40;
  
  if (!datasets || datasets.length === 0) return null;

  // 计算所有数据集中的全局最大最小值以对齐坐标轴
  const allValues = datasets.flatMap(d => d.data);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  return (
    <svg width={width} height={height} className={isMini ? "inline-block" : "mx-auto"}>
      {datasets.map((dataset, dsIdx) => {
        const points = dataset.data.map((val, i) => {
          const x = padding + (i * (width - 2 * padding)) / (dataset.data.length - 1);
          const y = (height - padding) - ((val - min) / range) * (height - 2 * padding);
          return `${x},${y}`;
        }).join(' ');

        return (
          <g key={dsIdx}>
            <polyline
              points={points}
              fill="none"
              stroke={dataset.color}
              strokeWidth={isMini ? 1.5 : 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
            {!isMini && dataset.data.map((val, i) => {
              const x = padding + (i * (width - 2 * padding)) / (dataset.data.length - 1);
              const y = (height - padding) - ((val - min) / range) * (height - 2 * padding);
              return (
                <g key={`${dsIdx}-${i}`}>
                  <circle cx={x} cy={y} r="4" fill={dataset.color} stroke="white" strokeWidth="1.5" />
                  {dsIdx === 0 && ( // 只在最顶层显示日期轴
                    <text x={x} y={height - 10} textAnchor="middle" fontSize="11" fill="#64748b">
                      {`1.${i+1}`}
                    </text>
                  )}
                  {/* 大图下显示数值 */}
                  <text x={x} y={dsIdx === 0 ? y - 12 : y + 20} textAnchor="middle" fontSize="10" fill={dataset.color} fontWeight="600" className="tabular-nums">
                    {val}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

const DataTable: React.FC<DataTableProps> = ({ groups, data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [activeTrend, setActiveTrend] = useState<{ name: string; title: string; datasets: TrendDataset[] } | null>(null);

  const toggleRow = (dept: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(dept)) {
      newExpanded.delete(dept);
    } else {
      newExpanded.add(dept);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    const processRows = (rows: TableRow[]): TableRow[] => {
      const totalRow = rows.find(r => r.department === '汇总');
      const normalRows = rows.filter(r => r.department !== '汇总');

      let processedNormalRows: TableRow[] = normalRows.map(row => {
        const nextLevelRows = row.subRows ? processRows(row.subRows) : [];
        return { ...row, subRows: nextLevelRows };
      });

      if (sortConfig && processedNormalRows.length > 0) {
        processedNormalRows.sort((a, b) => {
          let aValue = a[sortConfig.key];
          let bValue = b[sortConfig.key];
          const aNum = parseFloat(aValue);
          const bNum = parseFloat(bValue);
          if (!isNaN(aNum) && !isNaN(bNum)) {
            aValue = aNum;
            bValue = bNum;
          }
          if (aValue === bValue) return 0;
          if (aValue === undefined || aValue === null) return 1;
          if (bValue === undefined || bValue === null) return -1;
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return totalRow ? [...processedNormalRows, totalRow] : processedNormalRows;
    };
    return processRows(data);
  }, [data, sortConfig]);

  const formatValue = (row: TableRow, col: any) => {
    const value = row[col.key];
    const format = col.format;
    
    if (format === 'trend') {
      let trendDatasets: TrendDataset[] = [];
      
      // 处理 ASIN 转化统计的多指标趋势
      if (col.key === 'orderRateTrend' || col.key === 'activeRateTrend') {
        trendDatasets = value || [];
      } else {
        // 处理传统的订单统计单一趋势
        const trendData = [
          Number(row['jan1Orders'] || 0),
          Number(row['jan2Orders'] || 0),
          Number(row['jan3Orders'] || 0),
          Number(row['jan4Orders'] || 0),
          Number(row['jan5Orders'] || 0)
        ];
        trendDatasets = [{ label: '订单', data: trendData, color: '#3b82f6' }];
      }

      return (
        <div 
          className="cursor-zoom-in hover:scale-110 transition-transform flex justify-center py-1 group"
          onClick={() => setActiveTrend({ name: row.department, title: col.header, datasets: trendDatasets })}
        >
          <TrendChart datasets={trendDatasets} />
        </div>
      );
    }

    if (value === undefined || value === null || value === '-') return '-';
    if (format === 'number') {
      return new Intl.NumberFormat('en-US').format(Math.round(Number(value) * 100) / 100);
    }
    if (format === 'percent') {
      return `${value}%`;
    }
    return value;
  };

  const renderRow = (row: TableRow) => {
    const is汇总 = row.department === '汇总';
    const level = row.level || 0;
    const hasSubRows = !!row.subRows && row.subRows.length > 0;
    const isExpanded = expandedRows.has(row.department);

    return (
      <React.Fragment key={`${row.department}-${level}`}>
        <tr className={`${level > 0 ? 'bg-slate-50/30' : 'bg-white'} hover:bg-blue-50/50 transition-colors border-b border-slate-100`}>
          {groups.flatMap(g => g.columns).map((col, colIdx) => {
            const isDeptCol = col.key === 'department';
            const isLossCol = col.header.includes('亏损');
            const val = parseFloat(row[col.key]);
            const isProfitAlarm = (col.key === 'profitRate' || col.key === 'actualProfitRate') && !isNaN(val) && val < 15;
            const paddingLeft = isDeptCol ? `${level * 24 + 10}px` : '10px';

            return (
              <td
                key={`cell-${row.department}-${col.key}-${colIdx}`}
                style={isDeptCol ? { paddingLeft } : {}}
                className={`p-2 border-r border-slate-100 tabular-nums ${isDeptCol ? 'text-left min-w-[200px]' : 'text-center min-w-[100px]'} ${
                  is汇总 ? 'font-bold text-slate-800 bg-slate-100/30' : 'text-slate-600'
                } ${ (isLossCol || isProfitAlarm) ? 'text-red-600 font-semibold' : ''} ${!isDeptCol ? 'text-[11px] font-medium' : 'text-xs'}`}
              >
                {isDeptCol && hasSubRows ? (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleRow(row.department)}>
                    <span className="text-blue-500 font-bold w-4 h-4 flex items-center justify-center border border-blue-200 rounded-sm bg-blue-50 text-[10px] flex-shrink-0">
                      {isExpanded ? '−' : '+'}
                    </span>
                    <span className={`${level === 0 ? 'font-bold text-slate-900 underline decoration-blue-200 decoration-2 underline-offset-4' : level === 1 ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                      {row.department.includes('US') && <span className="mr-1.5">🇺🇸</span>}
                      {row.department.includes('UK') && <span className="mr-1.5">🇬🇧</span>}
                      {row.department.includes('DE') && <span className="mr-1.5">🇩🇪</span>}
                      {row.department.includes('JP') && <span className="mr-1.5">🇯🇵</span>}
                      {row.department.includes('FR') && <span className="mr-1.5">🇫🇷</span>}
                      {row.department.includes('CA') && <span className="mr-1.5">🇨🇦</span>}
                      {row.department.includes('课') && level === 0 && <span className="mr-1.5">🏢</span>}
                      {row.department}
                    </span>
                  </div>
                ) : (
                  <div className="break-words">{formatValue(row, col)}</div>
                )}
              </td>
            );
          })}
        </tr>
        {isExpanded && row.subRows?.map(subRow => renderRow(subRow))}
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="w-full overflow-x-auto border border-slate-200 rounded-sm bg-white shadow-sm custom-scrollbar">
        <table className="w-full text-sm border-collapse table-auto min-w-[2400px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
              {groups.map((group, idx) => (
                <th key={idx} colSpan={group.columns.length} className={`p-2 border-r border-slate-200 font-bold text-center text-[10px] uppercase tracking-wider ${group.bgColor || 'bg-slate-50'}`}>
                  {group.title}
                </th>
              ))}
            </tr>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
              {groups.flatMap(g => g.columns).map((col, idx) => (
                <th 
                  key={idx} 
                  onClick={() => col.sortable && handleSort(col.key)} 
                  className={`p-2 border-r border-slate-200 font-semibold text-center text-[10px] transition-colors group select-none whitespace-normal break-words leading-tight min-w-[100px] ${col.sortable ? 'cursor-pointer hover:bg-slate-200' : ''}`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <div className="flex flex-col opacity-40 group-hover:opacity-100 flex-shrink-0">
                        <svg className={`w-2 h-2 ${sortConfig?.key === col.key && sortConfig.direction === 'asc' ? 'text-blue-600 opacity-100' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-8 8h16l-8-8z"/></svg>
                        <svg className={`w-2 h-2 ${sortConfig?.key === col.key && sortConfig.direction === 'desc' ? 'text-blue-600 opacity-100' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 19l8-8H4l8 8z"/></svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map(row => renderRow(row))}
          </tbody>
        </table>
      </div>

      {activeTrend && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setActiveTrend(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative border border-slate-200" onClick={e => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeTrend.name} - {activeTrend.title}</h3>
              <div className="flex gap-4">
                {activeTrend.datasets.map((ds, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ds.color }}></span>
                    <span className="text-sm font-bold text-slate-600">{ds.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-inner">
              <TrendChart datasets={activeTrend.datasets} isMini={false} />
            </div>
            <div className="mt-8 flex justify-end">
              <button className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95" onClick={() => setActiveTrend(null)}>
                关闭详情
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
