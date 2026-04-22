// src/components/FixedTable.tsx
import React from 'react';

export default function FixedTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto my-4">
      <style dangerouslySetInnerHTML={{ __html: `
        .fixed-table-wrapper table {
          width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
        }
        .fixed-table-wrapper td {
          border: 1px solid #ddd;
          text-align: center;
          padding: 4px;
          font-size: 0.75rem;
          word-break: break-all;
        }
      `}} />
      <div className="fixed-table-wrapper">
        {children}
      </div>
    </div>
  );
}