
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { type SwitchData } from "@/lib/mock-data";
import { Activity, Zap, Shield, Settings } from "lucide-react";

interface SwitchDetailsProps {
  switchData: SwitchData;
  onUpdate: (switchData: SwitchData) => void;
}

export function SwitchDetails({ switchData }: SwitchDetailsProps) {
  const connectedPorts = switchData.ports.filter(p => p.status === "connected").length;
  const portUtilization = (connectedPorts / switchData.ports.length) * 100;
  const powerUtilization = (switchData.currentPower / switchData.maxPower) * 100;

  // Mock time series data
  const performanceData = [
    { time: "00:00", cpu: 15, memory: 45, traffic: 234 },
    { time: "04:00", cpu: 12, memory: 42, traffic: 189 },
    { time: "08:00", cpu: 28, memory: 55, traffic: 567 },
    { time: "12:00", cpu: 35, memory: 62, traffic: 789 },
    { time: "16:00", cpu: 42, memory: 68, traffic: 892 },
    { time: "20:00", cpu: 25, memory: 48, traffic: 445 },
    { time: "24:00", cpu: 18, memory: 44, traffic: 267 },
  ];

  const trafficData = [
    { time: "00:00", inbound: 125, outbound: 98 },
    { time: "04:00", inbound: 89, outbound: 67 },
    { time: "08:00", inbound: 445, outbound: 334 },
    { time: "12:00", inbound: 678, outbound: 556 },
    { time: "16:00", inbound: 789, outbound: 623 },
    { time: "20:00", inbound: 345, outbound: 278 },
    { time: "24:00", inbound: 156, outbound: 123 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-800">{switchData.name}</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          switchData.powerStatus === "on" 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {switchData.powerStatus === "on" ? "在线" : "离线"}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">端口使用</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">{connectedPorts}/{switchData.ports.length}</div>
              <Progress value={portUtilization} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">功耗</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">{switchData.currentPower}W</div>
              <Progress value={powerUtilization} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">安全状态</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-600">正常</div>
              <div className="text-xs text-gray-600">无异常检测</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">运行时间</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">15天</div>
              <div className="text-xs text-gray-600">4小时32分</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="security">运行安全</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
          <TabsTrigger value="quality">业务质量</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">设备信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">IP地址:</span>
                  <span className="font-medium">{switchData.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MAC地址:</span>
                  <span className="font-medium">{switchData.mac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">设备型号:</span>
                  <span className="font-medium">{switchData.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">软件版本:</span>
                  <span className="font-medium">{switchData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">堆叠启用状态:</span>
                  <span className="font-medium">启用</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">多主检测状态:</span>
                  <span className="font-medium">正常</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">电源状态</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">总电源功率:</span>
                  <span className="font-medium">{switchData.maxPower}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">当前功耗:</span>
                  <span className="font-medium">{switchData.currentPower}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">剩余可分配功率:</span>
                  <span className="font-medium">{switchData.maxPower - switchData.currentPower}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PoE端口数:</span>
                  <span className="font-medium">{switchData.ports.filter(p => p.poeEnabled).length}</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>功耗使用率</span>
                    <span>{Math.round(powerUtilization)}%</span>
                  </div>
                  <Progress value={powerUtilization} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">安全监控</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">访问控制</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SSH状态:</span>
                      <span className="text-green-600 font-medium">已启用</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">HTTPS状态:</span>
                      <span className="text-green-600 font-medium">已启用</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SNMP状态:</span>
                      <span className="text-blue-600 font-medium">v3启用</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">威胁检测</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">异常流量:</span>
                      <span className="text-green-600 font-medium">正常</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">端口扫描:</span>
                      <span className="text-green-600 font-medium">无检测</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">DDoS防护:</span>
                      <span className="text-green-600 font-medium">已启用</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">系统性能</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU使用率%" />
                    <Line type="monotone" dataKey="memory" stroke="#10B981" name="内存使用率%" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">流量统计</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="inbound" stackId="1" stroke="#8884d8" fill="#8884d8" name="入站流量 (Mbps)" />
                    <Area type="monotone" dataKey="outbound" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="出站流量 (Mbps)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">服务质量 (QoS)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">带宽分配</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>高优先级</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>中优先级</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>低优先级</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">延迟统计</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">平均延迟:</span>
                      <span className="font-medium">2.1ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最大延迟:</span>
                      <span className="font-medium">8.7ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">抖动:</span>
                      <span className="font-medium">0.3ms</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">丢包统计</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">丢包率:</span>
                      <span className="font-medium text-green-600">0.01%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">错误包:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">重传包:</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
