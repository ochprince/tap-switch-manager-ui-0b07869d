
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Power } from "lucide-react";
import { PortConfigModal } from "./port-config-modal";
import { BatchConfigModal } from "./batch-config-modal";
import { SVGPort } from "./svg-port";
import { type SwitchData, type Port } from "@/lib/mock-data";

interface SwitchPanelProps {
  switches: SwitchData[];
  selectedSwitch: SwitchData | null;
  onSwitchSelect: (switchData: SwitchData) => void;
  onSwitchUpdate: (switchData: SwitchData) => void;
}

export function SwitchPanel({ switches, selectedSwitch, onSwitchSelect, onSwitchUpdate }: SwitchPanelProps) {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [selectedPorts, setSelectedPorts] = useState<{switchId: string, portId: number}[]>([]);
  const [showPortConfig, setShowPortConfig] = useState(false);
  const [showBatchConfig, setShowBatchConfig] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const handlePortClick = (switchId: string, port: Port) => {
    if (isMultiSelect) {
      const portKey = {switchId, portId: port.id};
      setSelectedPorts(prev => {
        const exists = prev.some(p => p.switchId === switchId && p.portId === port.id);
        if (exists) {
          return prev.filter(p => !(p.switchId === switchId && p.portId === port.id));
        } else {
          return [...prev, portKey];
        }
      });
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
    // Group selected ports by switch
    const portsBySwitch = selectedPorts.reduce((acc, {switchId, portId}) => {
      if (!acc[switchId]) acc[switchId] = [];
      acc[switchId].push(portId);
      return acc;
    }, {} as Record<string, number[]>);

    // Update each affected switch
    Object.entries(portsBySwitch).forEach(([switchId, portIds]) => {
      const switchToUpdate = switches.find(s => s.id === switchId);
      if (switchToUpdate) {
        const updatedPorts = switchToUpdate.ports.map(p => 
          portIds.includes(p.id) ? { ...p, ...updates } : p
        );
        
        const updatedSwitch = { ...switchToUpdate, ports: updatedPorts };
        onSwitchUpdate(updatedSwitch);
      }
    });

    setSelectedPorts([]);
    setIsMultiSelect(false);
    setShowBatchConfig(false);
  };

  const isPortSelected = (switchId: string, portId: number) => {
    return selectedPorts.some(p => p.switchId === switchId && p.portId === portId);
  };

  // Calculate grid columns based on port count
  const getGridCols = (portCount: number) => {
    if (portCount <= 24) return 12; // 2 rows
    return 24; // 2 rows for 48 ports
  };

  return (
    <div className="space-y-6">
      {/* Global Batch Config Button */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {switches.length} 台TAP设备
        </span>
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

      {/* Switch List - One per row */}
      <div className="space-y-6">
        {switches.map((switchData) => (
          <div
            key={switchData.id}
            className={`border-2 rounded-lg transition-all ${
              selectedSwitch?.id === switchData.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Switch Header */}
            <div
              onClick={() => onSwitchSelect(switchData)}
              className="p-4 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">{switchData.name}</span>
                <Badge 
                  variant={switchData.powerStatus === "on" ? "default" : "secondary"}
                  className={switchData.powerStatus === "on" ? "bg-green-500 text-white" : ""}
                >
                  <Power className={`w-3 h-3 mr-1`} />
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{switchData.model}</span>
              </div>
            </div>

            {/* Port Grid */}
            <div className="px-4 pb-4">
              <div 
                className={`grid gap-1`}
                style={{
                  gridTemplateColumns: `repeat(${getGridCols(switchData.ports.length)}, minmax(0, 1fr))`
                }}
              >
                {switchData.ports.map((port) => (
                  <div
                    key={port.id}
                    className="flex flex-col items-center"
                  >
                    <SVGPort
                      isConnected={port.status === "connected"}
                      hasPoe={port.poeEnabled}
                      onClick={() => handlePortClick(switchData.id, port)}
                      isSelected={isPortSelected(switchData.id, port.id)}
                    />
                    <span className="text-xs text-gray-600 mt-1">
                      {port.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

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
