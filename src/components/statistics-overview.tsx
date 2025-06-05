
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type SwitchData } from "@/lib/mock-data";
import { Network, Zap, HardDrive, Activity } from "lucide-react";

interface StatisticsOverviewProps {
  switches: SwitchData[];
}

export function StatisticsOverview({ switches }: StatisticsOverviewProps) {
  const onlineCount = switches.filter(s => s.powerStatus === "on").length;
  const offlineCount = switches.length - onlineCount;
  
  const connectedPorts = switches.reduce((acc, s) => 
    acc + s.ports.filter(p => p.status === "connected").length, 0
  );
  const totalPorts = switches.reduce((acc, s) => acc + s.ports.length, 0);
  
  const pieData = [
    { name: "在线", value: onlineCount, color: "#10B981" },
    { name: "离线", value: offlineCount, color: "#EF4444" },
  ];

  const utilizationData = switches.map(s => ({
    name: s.name,
    utilization: Math.round((s.ports.filter(p => p.status === "connected").length / s.ports.length) * 100),
    power: Math.round((s.currentPower / s.maxPower) * 100),
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">系统概览</h2>
      
      {/* Status Cards - Single Column */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在线设备</CardTitle>
            <Network className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onlineCount}</div>
            <p className="text-xs text-muted-foreground">
              共 {switches.length} 台设备
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">端口使用率</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((connectedPorts / totalPorts) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {connectedPorts}/{totalPorts} 端口
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均功耗</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(switches.reduce((acc, s) => acc + (s.currentPower / s.maxPower), 0) / switches.length * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              系统平均负载
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">存储使用</CardTitle>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">73%</div>
            <p className="text-xs text-muted-foreground">
              配置存储空间
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Single Column Layout */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>设备状态分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>设备利用率</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#3B82F6" name="端口利用率%" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Information */}
      <Card>
        <CardHeader>
          <CardTitle>设备详细信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {switches.map((switchData) => (
              <div key={switchData.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{switchData.name}</h4>
                    <p className="text-sm text-gray-600">{switchData.ip}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">MAC: {switchData.mac}</p>
                    <p className="text-sm">版本: {switchData.version}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-600">端口使用率</p>
                    <Progress 
                      value={(switchData.ports.filter(p => p.status === "connected").length / switchData.ports.length) * 100} 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">功耗使用率</p>
                    <Progress 
                      value={(switchData.currentPower / switchData.maxPower) * 100} 
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
