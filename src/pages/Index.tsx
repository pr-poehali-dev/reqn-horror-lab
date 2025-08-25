import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const glitchTimer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, Math.random() * 5000 + 2000);

    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour12: false,
      day: '2-digit',
      month: '2-digit', 
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const cameras = [
    { id: 'CAM-01', location: 'Лаборатория А', status: 'ONLINE', feed: 'img/eb75ae17-3e30-47b6-a921-f69303b8c306.jpg' },
    { id: 'CAM-02', location: 'Комната содержания', status: 'ONLINE', feed: 'img/5033c22d-cfc4-451a-9cbf-d452a8ae50d1.jpg' },
    { id: 'CAM-03', location: 'Коридор Б', status: 'OFFLINE', feed: null },
    { id: 'CAM-04', location: 'Хранилище', status: 'ERROR', feed: null }
  ];

  const incidents = [
    { id: 'INC-001', time: '03:42:15', severity: 'HIGH', description: 'Движение в лаборатории А после рабочих часов' },
    { id: 'INC-002', time: '02:15:33', severity: 'CRITICAL', description: 'Потеря связи с образцом RQ-47' },
    { id: 'INC-003', time: '01:58:12', severity: 'MEDIUM', description: 'Аномальные звуки в комнате содержания' }
  ];

  const specimens = [
    { id: 'RQ-23', name: 'Плюшевый мишка', status: 'CONTAINED', threat: 'LOW' },
    { id: 'RQ-47', name: 'Кукла "Анна"', status: 'MISSING', threat: 'HIGH' },
    { id: 'RQ-81', name: 'Игрушечный робот', status: 'ACTIVE', threat: 'MEDIUM' }
  ];

  return (
    <div className="min-h-screen bg-vhs-black text-vhs-green font-vhs">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-vhs-green opacity-20 animate-scanline"></div>
      </div>

      {/* Static overlay */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-100 ${
        glitchActive ? 'opacity-10' : 'opacity-5'
      }`}>
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGF0aWMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgogICAgICA8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC41IiBmaWxsPSIjMDBGRjAwIiBvcGFjaXR5PSIwLjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjc3RhdGljKSIvPgo8L3N2Zz4K')] animate-static"></div>
      </div>

      {/* Header */}
      <header className="border-b border-vhs-green p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`transition-transform duration-100 ${glitchActive ? 'animate-glitch' : ''}`}>
            <h1 className="text-3xl font-bold">REQN CO LABORATORY</h1>
            <p className="text-sm opacity-70">СИСТЕМА БЕЗОПАСНОСТИ v2.1.3</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-mono">{formatTime(currentTime)}</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-vhs-green text-vhs-green">
                СИСТЕМА АКТИВНА
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="cameras" className="w-full">
          <TabsList className="grid grid-cols-6 w-full mb-6 bg-vhs-black border border-vhs-green">
            <TabsTrigger value="cameras" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">КАМЕРЫ</TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">ИНЦИДЕНТЫ</TabsTrigger>
            <TabsTrigger value="specimens" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">ОБРАЗЦЫ</TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">АРХИВ</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">ДОКУМЕНТЫ</TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-vhs-green data-[state=active]:text-vhs-black">СТАТУС</TabsTrigger>
          </TabsList>

          {/* Cameras Tab */}
          <TabsContent value="cameras">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cameras.map((camera) => (
                <Card key={camera.id} className="bg-vhs-black border-vhs-green">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-mono text-lg">{camera.id}</h3>
                      <Badge 
                        variant={camera.status === 'ONLINE' ? 'default' : 'destructive'}
                        className={camera.status === 'ONLINE' ? 'bg-vhs-green text-vhs-black' : 'bg-vhs-red text-vhs-white'}
                      >
                        {camera.status}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-70">{camera.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video bg-vhs-gray mb-3 overflow-hidden">
                      {camera.feed ? (
                        <img 
                          src={camera.feed} 
                          alt={`Camera ${camera.id}`}
                          className={`w-full h-full object-cover filter contrast-125 brightness-90 ${
                            glitchActive ? 'animate-glitch' : ''
                          }`}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-vhs-red">
                          <Icon name="AlertTriangle" size={48} />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-vhs-black bg-opacity-70 px-2 py-1 text-xs">
                        {formatTime(currentTime).split(' ')[1]}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-vhs-green text-vhs-black hover:bg-vhs-white"
                      disabled={camera.status !== 'ONLINE'}
                    >
                      ДОСТУП
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <div className="space-y-3">
              {incidents.map((incident) => (
                <Card key={incident.id} className="bg-vhs-black border-vhs-green">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono">{incident.id}</span>
                          <Badge 
                            variant={incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'destructive' : 'default'}
                            className={
                              incident.severity === 'CRITICAL' ? 'bg-vhs-red text-vhs-white animate-pulse' :
                              incident.severity === 'HIGH' ? 'bg-vhs-red text-vhs-white' :
                              'bg-vhs-green text-vhs-black'
                            }
                          >
                            {incident.severity}
                          </Badge>
                          <span className="text-sm opacity-70">{incident.time}</span>
                        </div>
                        <p>{incident.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-vhs-green text-vhs-green">
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Specimens Tab */}
          <TabsContent value="specimens">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {specimens.map((specimen) => (
                <Card key={specimen.id} className="bg-vhs-black border-vhs-green">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h3 className="font-mono">{specimen.id}</h3>
                      <Badge 
                        variant={specimen.status === 'MISSING' ? 'destructive' : 'default'}
                        className={
                          specimen.status === 'MISSING' ? 'bg-vhs-red text-vhs-white animate-pulse' :
                          specimen.status === 'ACTIVE' ? 'bg-vhs-green text-vhs-black' :
                          'bg-vhs-gray text-vhs-white'
                        }
                      >
                        {specimen.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{specimen.name}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Уровень угрозы:</span>
                      <Badge 
                        variant={specimen.threat === 'HIGH' ? 'destructive' : 'default'}
                        className={
                          specimen.threat === 'HIGH' ? 'bg-vhs-red text-vhs-white' :
                          specimen.threat === 'MEDIUM' ? 'bg-yellow-500 text-vhs-black' :
                          'bg-vhs-green text-vhs-black'
                        }
                      >
                        {specimen.threat}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Archive Tab */}
          <TabsContent value="archive">
            <Card className="bg-vhs-black border-vhs-green">
              <CardContent className="p-8 text-center">
                <Icon name="FileText" size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl mb-2">АРХИВ ЗАПИСЕЙ</h3>
                <p className="opacity-70">Доступ к архивным записям требует авторизации уровня 3</p>
                <Button className="mt-4 bg-vhs-green text-vhs-black hover:bg-vhs-white">
                  ЗАПРОСИТЬ ДОСТУП
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card className="bg-vhs-black border-vhs-green">
              <CardContent className="p-8 text-center">
                <Icon name="Lock" size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl mb-2">СЕКРЕТНЫЕ ДОКУМЕНТЫ</h3>
                <p className="opacity-70">Доступ ограничен. Обратитесь к администратору системы</p>
                <Button className="mt-4 bg-vhs-red text-vhs-white hover:bg-red-600">
                  ДОСТУП ЗАПРЕЩЕН
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-vhs-black border-vhs-green">
                <CardHeader>
                  <h3 className="flex items-center gap-2">
                    <Icon name="Wifi" size={20} />
                    СОСТОЯНИЕ СИСТЕМЫ
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Камеры онлайн:</span>
                    <span className="text-vhs-green">2/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Активные инциденты:</span>
                    <span className="text-vhs-red">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Образцы под контролем:</span>
                    <span className="text-yellow-500">2/3</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-vhs-black border-vhs-green">
                <CardHeader>
                  <h3 className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={20} />
                    ПРЕДУПРЕЖДЕНИЯ
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-vhs-red animate-pulse">⚠ Образец RQ-47 отсутствует</div>
                    <div className="text-yellow-500">⚠ Камера CAM-03 офлайн</div>
                    <div className="text-vhs-red">⚠ Обнаружена аномальная активность</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;