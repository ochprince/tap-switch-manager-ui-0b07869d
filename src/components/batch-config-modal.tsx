
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Port } from "@/lib/mock-data";

interface BatchConfigModalProps {
  portCount: number;
  onSave: (config: Partial<Port>) => void;
  onClose: () => void;
}

export function BatchConfigModal({ portCount, onSave, onClose }: BatchConfigModalProps) {
  const [config, setConfig] = useState<Partial<Port>>({});

  const handleSave = () => {
    onSave(config);
  };

  const updateConfig = (field: keyof Port, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>批量配置端口属性 ({portCount} 个端口)</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本设置</TabsTrigger>
            <TabsTrigger value="vlan">VLAN属性</TabsTrigger>
            <TabsTrigger value="poe">PoE属性</TabsTrigger>
            <TabsTrigger value="advanced">高级选项</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select 
                  value={config.status || ""} 
                  onValueChange={(value) => updateConfig('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connected">启用</SelectItem>
                    <SelectItem value="disconnected">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interfaceType">接口类型</Label>
                <Select 
                  value={config.interfaceType || ""} 
                  onValueChange={(value) => updateConfig('interfaceType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择接口类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="layer2">二层接口</SelectItem>
                    <SelectItem value="layer3">三层接口</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="speed">端口速率</Label>
                <Select 
                  value={config.speed || ""} 
                  onValueChange={(value) => updateConfig('speed', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择速率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">自动协商</SelectItem>
                    <SelectItem value="10M">10Mbps</SelectItem>
                    <SelectItem value="100M">100Mbps</SelectItem>
                    <SelectItem value="1G">1Gbps</SelectItem>
                    <SelectItem value="10G">10Gbps</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述前缀</Label>
                <Input
                  id="description"
                  value={config.description || ""}
                  onChange={(e) => updateConfig('description', e.target.value)}
                  placeholder="批量端口描述"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vlan" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portMode">端口模式</Label>
                <Select 
                  value={config.vlanMode || ""} 
                  onValueChange={(value) => updateConfig('vlanMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择VLAN模式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="access">Access</SelectItem>
                    <SelectItem value="trunk">Trunk</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vlanId">VLAN ID</Label>
                <Input
                  id="vlanId"
                  type="number"
                  value={config.vlanId || ""}
                  onChange={(e) => updateConfig('vlanId', parseInt(e.target.value))}
                  placeholder="1-4094"
                  min="1"
                  max="4094"
                />
              </div>

              {config.vlanMode === "trunk" && (
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="allowedVlans">允许的VLAN</Label>
                  <Input
                    id="allowedVlans"
                    value={config.allowedVlans || ""}
                    onChange={(e) => updateConfig('allowedVlans', e.target.value)}
                    placeholder="例: 1,10-20,30"
                  />
                </div>
              )}

              <div className="col-span-2 space-y-2">
                <Label htmlFor="nativeVlan">Native VLAN</Label>
                <Input
                  id="nativeVlan"
                  type="number"
                  value={config.nativeVlan || ""}
                  onChange={(e) => updateConfig('nativeVlan', parseInt(e.target.value))}
                  placeholder="1-4094"
                  min="1"
                  max="4094"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="poe" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="poeEnabled"
                  checked={config.poeEnabled || false}
                  onCheckedChange={(checked) => updateConfig('poeEnabled', checked)}
                />
                <Label htmlFor="poeEnabled">启用PoE供电</Label>
              </div>

              {config.poeEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="poePriority">优先级</Label>
                    <Select 
                      value={config.poePriority || ""} 
                      onValueChange={(value) => updateConfig('poePriority', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低</SelectItem>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="critical">关键</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="poeMaxPower">功率上限 (W)</Label>
                    <Input
                      id="poeMaxPower"
                      type="number"
                      value={config.poeMaxPower || ""}
                      onChange={(e) => updateConfig('poeMaxPower', parseFloat(e.target.value))}
                      placeholder="最大功率"
                      min="0"
                      max="90"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="poeType">PoE类型</Label>
                    <Select 
                      value={config.poeType || ""} 
                      onValueChange={(value) => updateConfig('poeType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择PoE类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">自动 (默认)</SelectItem>
                        <SelectItem value="ieee802.3af">IEEE 802.3af</SelectItem>
                        <SelectItem value="ieee802.3at">IEEE 802.3at</SelectItem>
                        <SelectItem value="ieee802.3bt">IEEE 802.3bt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="flowControl"
                  checked={config.flowControl || false}
                  onCheckedChange={(checked) => updateConfig('flowControl', checked)}
                />
                <Label htmlFor="flowControl">启用流量控制</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="stormControl"
                  checked={config.stormControl || false}
                  onCheckedChange={(checked) => updateConfig('stormControl', checked)}
                />
                <Label htmlFor="stormControl">启用风暴抑制</Label>
              </div>

              {config.stormControl && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="broadcastThreshold">广播阈值 (%)</Label>
                    <Input
                      id="broadcastThreshold"
                      type="number"
                      value={config.broadcastThreshold || ""}
                      onChange={(e) => updateConfig('broadcastThreshold', parseInt(e.target.value))}
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="multicastThreshold">组播阈值 (%)</Label>
                    <Input
                      id="multicastThreshold"
                      type="number"
                      value={config.multicastThreshold || ""}
                      onChange={(e) => updateConfig('multicastThreshold', parseInt(e.target.value))}
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="mtu">MTU 大小</Label>
                <Input
                  id="mtu"
                  type="number"
                  value={config.mtu || ""}
                  onChange={(e) => updateConfig('mtu', parseInt(e.target.value))}
                  placeholder="1500"
                  min="64"
                  max="9216"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="loopDetection"
                  checked={config.loopDetection || false}
                  onCheckedChange={(checked) => updateConfig('loopDetection', checked)}
                />
                <Label htmlFor="loopDetection">启用环路检测</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>
            提交配置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
