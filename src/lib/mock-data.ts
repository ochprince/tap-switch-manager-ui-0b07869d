
export interface Port {
  id: number;
  name: string;
  status: "connected" | "disconnected";
  description?: string;
  poeEnabled: boolean;
  vlanId?: number;
  vlanMode?: "access" | "trunk" | "hybrid";
  allowedVlans?: string;
  nativeVlan?: number;
  speed?: string;
  interfaceType?: string;
  poePriority?: "low" | "high" | "critical";
  poeMaxPower?: number;
  poeType?: string;
  flowControl?: boolean;
  stormControl?: boolean;
  broadcastThreshold?: number;
  multicastThreshold?: number;
  mtu?: number;
  loopDetection?: boolean;
}

export interface SwitchData {
  id: string;
  name: string;
  model: string;
  ip: string;
  mac: string;
  version: string;
  powerStatus: "on" | "off";
  maxPower: number;
  currentPower: number;
  ports: Port[];
}

// Generate ports for a switch
const generatePorts = (count: number, connectedRatio: number = 0.6): Port[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `GigabitEthernet0/0/${i + 1}`,
    status: Math.random() < connectedRatio ? "connected" : "disconnected",
    description: `端口 ${i + 1}`,
    poeEnabled: Math.random() < 0.3, // 30% have PoE enabled
    vlanId: 1,
    vlanMode: "access",
    speed: "auto",
    interfaceType: "layer2",
    poePriority: "low",
    poeMaxPower: 30,
    poeType: "auto",
    flowControl: false,
    stormControl: false,
    broadcastThreshold: 10,
    multicastThreshold: 10,
    mtu: 1500,
    loopDetection: false,
  }));
};

export const mockSwitchData: SwitchData[] = [
  {
    id: "switch-001",
    name: "核心TAP-1",
    model: "TAP-48 BUILD20240220",
    ip: "172.16.11.3",
    mac: "00-4B-CD-00-00-03",
    version: "TAP-CORE3.6 BUILD20240220",
    powerStatus: "on",
    maxPower: 3000,
    currentPower: 1500,
    ports: generatePorts(48, 0.75),
  },
  {
    id: "switch-002", 
    name: "接入TAP-2",
    model: "TAP-24 BUILD20240215",
    ip: "172.16.11.4",
    mac: "00-4B-CD-00-00-04",
    version: "TAP-ACCESS2.1 BUILD20240215",
    powerStatus: "on",
    maxPower: 1500,
    currentPower: 800,
    ports: generatePorts(24, 0.5),
  },
  {
    id: "switch-003",
    name: "汇聚TAP-3", 
    model: "TAP-32 BUILD20240210",
    ip: "172.16.11.5",
    mac: "00-4B-CD-00-00-05",
    version: "TAP-AGGREGATE1.8 BUILD20240210",
    powerStatus: "off",
    maxPower: 2500,
    currentPower: 0,
    ports: generatePorts(32, 0),
  },
  {
    id: "switch-004",
    name: "边缘TAP-4",
    model: "TAP-12 BUILD20240205", 
    ip: "172.16.11.6",
    mac: "00-4B-CD-00-00-06",
    version: "TAP-EDGE1.2 BUILD20240205",
    powerStatus: "on",
    maxPower: 800,
    currentPower: 400,
    ports: generatePorts(16, 0.4),
  },
];
