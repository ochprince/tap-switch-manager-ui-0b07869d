
import { useState, useEffect } from "react";
import { SwitchPanel } from "./switch-panel";
import { StatisticsOverview } from "./statistics-overview";
import { SwitchDetails } from "./switch-details";
import { mockSwitchData, type SwitchData } from "@/lib/mock-data";

export function SwitchDashboard() {
  const [switches, setSwitches] = useState<SwitchData[]>([]);
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchData | null>(null);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const savedData = localStorage.getItem("switchData");
    if (savedData) {
      setSwitches(JSON.parse(savedData));
    } else {
      setSwitches(mockSwitchData);
      localStorage.setItem("switchData", JSON.stringify(mockSwitchData));
    }
  }, []);

  const handleSwitchSelect = (switchData: SwitchData) => {
    setSelectedSwitch(switchData);
  };

  const updateSwitchData = (updatedSwitch: SwitchData) => {
    const updatedSwitches = switches.map(sw => 
      sw.id === updatedSwitch.id ? updatedSwitch : sw
    );
    setSwitches(updatedSwitches);
    localStorage.setItem("switchData", JSON.stringify(updatedSwitches));
    setSelectedSwitch(updatedSwitch);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">交换机概览</h1>
          <p className="text-gray-600 mt-1">实时监控和管理网络交换机设备</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Panel - Switch Physical View */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">设备面板</h2>
              <SwitchPanel 
                switches={switches}
                selectedSwitch={selectedSwitch}
                onSwitchSelect={handleSwitchSelect}
                onSwitchUpdate={updateSwitchData}
              />
            </div>

            {/* Right Panel - Statistics or Details */}
            <div className="space-y-4">
              {selectedSwitch ? (
                <SwitchDetails 
                  switchData={selectedSwitch}
                  onUpdate={updateSwitchData}
                />
              ) : (
                <StatisticsOverview switches={switches} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
