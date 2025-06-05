
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Power, Wifi, WifiOff } from "lucide-react";
import { PortConfigModal } from "./port-config-modal";
import { BatchConfigModal } from "./batch-config-modal";
import { type SwitchData, type Port } from "@/lib/mock-data";

interface SwitchPanelProps {
  switches: SwitchData[];
  selectedSwitch: SwitchData | null;
  onSwitchSelect: (switchData: SwitchData) => void;
  onSwitchUpdate: (switchData: SwitchData) => void;
}

export function SwitchPanel({ switches, selectedSwitch, onSwitchSelect, onSwitchUpdate }: SwitchPanelProps) {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [selectedPorts, setSelectedPorts] = useState<number[]>([]);
  const [showPortConfig, setShowPortConfig] = useState(false);
  const [showBatchConfig, setShowBatchConfig] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const handlePortClick = (port: Port) => {
    if (!selectedSwitch) return;

    if (isMultiSelect) {
      setSelectedPorts(prev => 
        prev.includes(port.id) 
          ? prev.filter(id => id !== port.id)
          : [...prev, port.id]
      );
    } else {
      setSelectedPort(port);
      setShowPortConfig(true);
    }
  };

  const handleBatchConfig = () => {
    if (selectedPorts.length > 0) {
      setShowBatchConfig(true);
    }
  };

  const handlePortUpdate = (updatedPort: Port) => {
    if (!selectedSwitch) return;
    
    const updatedPorts = selectedSwitch.ports.map(p => 
      p.id === updatedPort.id ? updatedPort : p
    );
    
    const updatedSwitch = { ...selectedSwitch, ports: updatedPorts };
    onSwitchUpdate(updatedSwitch);
    setShowPortConfig(false);
  };

  const handleBatchUpdate = (updates: Partial<Port>) => {
    if (!selectedSwitch) return;
    
    const updatedPorts = selectedSwitch.ports.map(p => 
      selectedPorts.includes(p.id) ? { ...p, ...updates } : p
    );
    
    const updatedSwitch = { ...selectedSwitch, ports: updatedPorts };
    onSwitchUpdate(updatedSwitch);
    setSelectedPorts([]);
    setIsMultiSelect(false);
    setShowBatchConfig(false);
  };

  return (
    <div className="space-y-6">
      {/* Switch List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {switches.map((switchData) => (
          <div
            key={switchData.id}
            onClick={() => onSwitchSelect(switchData)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedSwitch?.id === switchData.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{switchData.name}</span>
                <Badge variant={switchData.powerStatus === "on" ? "default" : "secondary"}>
                  <Power className="w-3 h-3 mr-1" />
                  {switchData.powerStatus === "on" ? "在线" : "离线"}
                </Badge>
              </div>
              <span className="text-sm text-gray-500">{switchData.model}</span>
            </div>
            
            {/* Port Status Indicator */}
            <div className="grid grid-cols-12 gap-1">
              {switchData.ports.slice(0, 24).map((port) => (
                <div
                  key={port.id}
                  className={`w-3 h-3 rounded-sm ${
                    port.status === "connected" ? "bg-green-500" : "bg-gray-300"
                  }`}
                  title={`端口 ${port.id}: ${port.status === "connected" ? "已连接" : "未连接"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Switch Panel */}
      {selectedSwitch && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{selectedSwitch.name} - 端口详情</h3>
            <div className="flex gap-2">
              <Button
                variant={isMultiSelect ? "default" : "outline"}
                onClick={() => {
                  setIsMultiSelect(!isMultiSelect);
                  setSelectedPorts([]);
                }}
              >
                批量配置
              </Button>
              {isMultiSelect && selectedPorts.length > 0 && (
                <Button onClick={handleBatchConfig}>
                  确定 ({selectedPorts.length})
                </Button>
              )}
            </div>
          </div>

          {/* Port Grid */}
          <div className="grid grid-cols-8 md:grid-cols-12 gap-3">
            {selectedSwitch.ports.map((port) => (
              <div
                key={port.id}
                onClick={() => handlePortClick(port)}
                className={`relative aspect-square border-2 rounded-lg cursor-pointer transition-all hover:shadow-md flex items-center justify-center ${
                  port.status === "connected" 
                    ? "border-green-500 bg-green-100" 
                    : "border-gray-300 bg-gray-100"
                } ${
                  selectedPorts.includes(port.id) 
                    ? "ring-2 ring-blue-500" 
                    : ""
                }`}
              >
                {port.status === "connected" ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-gray-400" />
                )}
                <span className="absolute -bottom-5 text-xs text-gray-600">
                  {port.id}
                </span>
                {port.poeEnabled && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showPortConfig && selectedPort && (
        <PortConfigModal
          port={selectedPort}
          onSave={handlePortUpdate}
          onClose={() => setShowPortConfig(false)}
        />
      )}

      {showBatchConfig && (
        <BatchConfigModal
          portCount={selectedPorts.length}
          onSave={handleBatchUpdate}
          onClose={() => setShowBatchConfig(false)}
        />
      )}
    </div>
  );
}
