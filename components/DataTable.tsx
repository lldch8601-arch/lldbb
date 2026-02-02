
import React, { useState, useMemo } from 'react';
import { ColumnGroup, TableRow } from '../types';

interface DataTableProps {
  groups: ColumnGroup[];
  data: TableRow[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

const TrendChart: React.FC<{ data: number[]; isMini?: boolean }> = ({ data, isMini = true }) => {
  const width = isMini ? 70 : 500;
  const height = isMini ? 24 : 300;
  const padding = isMini ? 4 : 40;
  
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = (height - padding) - ((val - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = ` ${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg width={width} height={height} className={isMini ? "inline-block" : "mx-auto"}>
      <polyline
        points={areaPoints}
        fill={isMini ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.05)"}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={isMini ? 1.5 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!isMini && data.map((val, i) => {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = (height - padding) - ((val - min) / range) * (height - 2 * padding);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
            <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">
              {val}
            </text>
            <text x={x} y={height - 10} textAnchor="middle" fontSize="11" fill="#64748b">
              {`1.${i+1}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const DataTable: React.FC<DataTableProps> = ({ groups, data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [activeTrend, setActiveTrend] = useState<{ name: string; values: number[] } | null>(null);

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
      const trendData = [
        Number(row['jan1Orders'] || 0),
        Number(row['jan2Orders'] || 0),
        Number(row['jan3Orders'] || 0),
        Number(row['jan4Orders'] || 0),
        Number(row['jan5Orders'] || 0)
      ];
      return (
        <div 
          className="cursor-zoom-in hover:scale-110 transition-transform flex justify-center py-1 group"
          onClick={() => setActiveTrend({ name: row.department, values: trendData })}
        >
          <TrendChart data={trendData} />
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
                className={`p-2 border-r border-slate-100 truncate relative ${isDeptCol ? 'text-left' : 'text-center'} ${
                  is汇总 ? 'font-bold text-slate-800 bg-slate-100/30' : 'text-slate-600'
                } ${ (isLossCol || isProfitAlarm) ? 'text-red-500 font-bold' : ''} ${!isDeptCol ? 'font-mono text-xs' : ''}`}
              >
                {isDeptCol && hasSubRows ? (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleRow(row.department)}>
                    <span className="text-blue-500 font-bold w-4 h-4 flex items-center justify-center border border-blue-200 rounded-sm bg-blue-50 text-[10px]">
                      {isExpanded ? '−' : '+'}
                    </span>
                    <span className={`${level === 0 ? 'font-bold text-slate-800 underline decoration-blue-200 decoration-2 underline-offset-4' : level === 1 ? 'font-semibold text-slate-700' : 'text-slate-600'}`}>
                      {/* 根据文本内容显示图标 */}
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
                  <div>{formatValue(row, col)}</div>
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
        <table className="w-full text-sm border-collapse table-fixed min-w-[2400px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
              {groups.map((group, idx) => (
                <th key={idx} colSpan={group.columns.length} className={`p-2 border-r border-slate-200 font-semibold text-center text-[10px] uppercase tracking-wider ${group.bgColor || 'bg-slate-50'}`}>
                  {group.title}
                </th>
              ))}
            </tr>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
              {groups.flatMap(g => g.columns).map((col, idx) => (
                <th 
                  key={idx} 
                  onClick={() => col.sortable && handleSort(col.key)} 
                  className={`p-2 border-r border-slate-200 font-medium text-center truncate text-[10px] transition-colors group select-none ${col.sortable ? 'cursor-pointer hover:bg-slate-200' : ''}`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="truncate">{col.header}</span>
                    {col.sortable && (
                      <div className="flex flex-col opacity-40 group-hover:opacity-100">
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
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative border border-slate-200" onClick={e => e.stopPropagation()}>
            <div className="mb-6"><h3 className="text-2xl font-black text-slate-900">{activeTrend.name} - 趋势详情</h3></div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-inner"><TrendChart data={activeTrend.values} isMini={false} /></div>
            <div className="mt-8 flex justify-end"><button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800" onClick={() => setActiveTrend(null)}>关闭</button></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
