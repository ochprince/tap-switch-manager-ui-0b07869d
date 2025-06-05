
import React from 'react';

interface SVGPortProps {
  isConnected: boolean;
  hasPoe?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export function SVGPort({ isConnected, hasPoe = false, onClick, isSelected = false }: SVGPortProps) {
  return (
    <div 
      className={`relative cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <svg width="32" height="20" viewBox="0 0 32 20" className="border rounded">
        {/* 网口外框 */}
        <rect 
          x="1" 
          y="1" 
          width="30" 
          height="18" 
          rx="2" 
          fill={isConnected ? "#10b981" : "#6b7280"}
          stroke="#374151"
          strokeWidth="0.5"
        />
        
        {/* 内部连接器 */}
        <rect 
          x="3" 
          y="4" 
          width="26" 
          height="4" 
          rx="1" 
          fill={isConnected ? "#065f46" : "#374151"}
        />
        <rect 
          x="3" 
          y="12" 
          width="26" 
          height="4" 
          rx="1" 
          fill={isConnected ? "#065f46" : "#374151"}
        />
        
        {/* 中间分隔 */}
        <rect 
          x="4" 
          y="9" 
          width="24" 
          height="2" 
          fill={isConnected ? "#047857" : "#4b5563"}
        />
        
        {/* 连接指示灯 */}
        {isConnected && (
          <>
            <circle cx="7" cy="6" r="0.8" fill="#fbbf24" />
            <circle cx="25" cy="6" r="0.8" fill="#34d399" />
          </>
        )}
        
        {/* PoE指示 */}
        {hasPoe && (
          <circle cx="28" cy="3" r="1.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.5" />
        )}
      </svg>
    </div>
  );
}
