import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

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

  const playCreepyAudio = () => {
    setAudioPlaying(true);
    
    // Создаем звуковой эффект "поедания" через Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Последовательность звуков: хрустящие, жевательные, глотательные
    const playSound = (frequency: number, duration: number, type: OscillatorType, delay: number) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }, delay);
    };
    
    // Хрустящие звуки (кости)
    playSound(200, 0.3, 'square', 0);
    playSound(180, 0.2, 'square', 300);
    playSound(220, 0.4, 'square', 600);
    
    // Жевательные звуки
    playSound(100, 0.8, 'sawtooth', 1000);
    playSound(90, 0.6, 'sawtooth', 1500);
    
    // Глотательные звуки
    playSound(50, 1.2, 'sine', 2200);
    
    // Тишина и последний хруст
    playSound(150, 0.5, 'square', 4000);
    
    setTimeout(() => setAudioPlaying(false), 5000);
  };

  const playScreamAndFleshAudio = () => {
    setAudioPlaying(true);
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Функция для создания модулированного звука с искажениями
    const playDistortedSound = (baseFreq: number, duration: number, delay: number, modFreq: number = 0) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const modOscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const modGainNode = audioContext.createGain();
        
        // Основной генератор
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
        
        // Модулятор для искажений
        if (modFreq > 0) {
          modOscillator.type = 'square';
          modOscillator.frequency.setValueAtTime(modFreq, audioContext.currentTime);
          modGainNode.gain.setValueAtTime(50, audioContext.currentTime);
          
          modOscillator.connect(modGainNode);
          modGainNode.connect(oscillator.frequency);
          modOscillator.start(audioContext.currentTime);
          modOscillator.stop(audioContext.currentTime + duration);
        }
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Envelope для создания крика
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }, delay);
    };

    // Функция для создания звука разрывания плоти
    const playFleshTearSound = (delay: number) => {
      setTimeout(() => {
        const whiteNoise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        // Генерируем белый шум
        for (let i = 0; i < audioContext.sampleRate * 0.5; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        
        whiteNoise.buffer = noiseBuffer;
        
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        whiteNoise.start(audioContext.currentTime);
      }, delay);
    };
    
    // Последовательность звуков для CAM-05:
    
    // Искаженный крик высокой тональности
    playDistortedSound(800, 1.5, 0, 30);
    playDistortedSound(600, 1.2, 200, 25);
    
    // Звуки разрывания плоти
    playFleshTearSound(500);
    playFleshTearSound(800);
    playFleshTearSound(1200);
    
    // Низкий искаженный стон
    playDistortedSound(150, 2.0, 1500, 8);
    playDistortedSound(120, 1.8, 1700, 12);
    
    // Еще звуки разрывания
    playFleshTearSound(2000);
    playFleshTearSound(2300);
    
    // Финальный искаженный крик
    playDistortedSound(900, 2.5, 3000, 40);
    playDistortedSound(700, 2.0, 3200, 35);
    
    // Последние звуки плоти
    playFleshTearSound(4000);
    playFleshTearSound(4500);
    
    setTimeout(() => setAudioPlaying(false), 6000);
  };

  const openCamera = (camera: any) => {
    setSelectedCamera(camera);
    setCameraDialogOpen(true);
    
    // Если открывается CAM-03, проигрываем звуки поедания
    if (camera.id === 'CAM-03') {
      setTimeout(() => {
        playCreepyAudio();
      }, 1500);
    }
    
    // Если открывается CAM-05, проигрываем крики и разрывание плоти
    if (camera.id === 'CAM-05') {
      setTimeout(() => {
        playScreamAndFleshAudio();
      }, 1200);
    }
  };

  const cameras = [
    { id: 'CAM-01', location: 'Лаборатория А', status: 'ONLINE', feed: 'img/eb75ae17-3e30-47b6-a921-f69303b8c306.jpg', description: 'Основная исследовательская зона. Мониторинг экспериментов.', lastActivity: '23:42' },
    { id: 'CAM-02', location: 'Комната содержания', status: 'ONLINE', feed: 'img/5033c22d-cfc4-451a-9cbf-d452a8ae50d1.jpg', description: 'Зона хранения активных образцов. Повышенная безопасность.', lastActivity: '02:15' },
    { id: 'CAM-03', location: 'Коридор Б', status: 'OFFLINE', feed: null, description: 'Соединительный коридор. ВНИМАНИЕ: Зафиксированы подозрительные звуки.', lastActivity: '18:33' },
    { id: 'CAM-04', location: 'Хранилище', status: 'ERROR', feed: null, description: 'Архивное хранилище. ОШИБКА СИСТЕМЫ.', lastActivity: 'НЕИЗВЕСТНО' },
    { id: 'CAM-05', location: 'Испытательная камера', status: 'ONLINE', feed: 'https://cdn.poehali.dev/files/f317b2ac-fec7-4fa2-9b78-655d91a0f390.jpg', description: 'Тестирование образца RQ-23. КРИТИЧНО: Аномальная агрессия!', lastActivity: '00:15' }
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
                      onClick={() => openCamera(camera)}
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
                    <span className="text-vhs-green">3/5</span>
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

      {/* Camera Detail Dialog */}
      <Dialog open={cameraDialogOpen} onOpenChange={setCameraDialogOpen}>
        <DialogContent className="bg-vhs-black border-vhs-green text-vhs-green max-w-4xl font-vhs">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono flex items-center gap-3">
              <Icon name="Camera" size={24} />
              {selectedCamera?.id} - {selectedCamera?.location}
              <Badge 
                variant={selectedCamera?.status === 'ONLINE' ? 'default' : 'destructive'}
                className={selectedCamera?.status === 'ONLINE' ? 'bg-vhs-green text-vhs-black' : 'bg-vhs-red text-vhs-white'}
              >
                {selectedCamera?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera Feed */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video bg-vhs-gray overflow-hidden mb-4 border border-vhs-green">
                {selectedCamera?.feed ? (
                  <img 
                    src={selectedCamera.feed} 
                    alt={`Camera ${selectedCamera.id}`}
                    className={`w-full h-full object-cover filter contrast-125 brightness-90 ${
                      glitchActive ? 'animate-glitch' : ''
                    }`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-vhs-red">
                    <div className="text-center">
                      <Icon name="AlertTriangle" size={64} className="mx-auto mb-2" />
                      <p>СИГНАЛ ПОТЕРЯН</p>
                    </div>
                  </div>
                )}
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 space-y-1 text-xs">
                    <div className="bg-vhs-black bg-opacity-70 px-2 py-1">
                      REC ● {formatTime(currentTime)}
                    </div>
                    <div className="bg-vhs-black bg-opacity-70 px-2 py-1">
                      {selectedCamera?.id} | {selectedCamera?.location}
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-xs">
                    <div className="bg-vhs-black bg-opacity-70 px-2 py-1">
                      ZOOM: 1.0x
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-xs">
                    <div className="bg-vhs-black bg-opacity-70 px-2 py-1">
                      ПОСЛЕДНЯЯ АКТИВНОСТЬ: {selectedCamera?.lastActivity}
                    </div>
                  </div>
                  
                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border border-vhs-green border-opacity-50">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-vhs-green opacity-30"></div>
                      <div className="absolute left-1/2 top-0 w-px h-full bg-vhs-green opacity-30"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className="border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black">
                  <Icon name="ZoomIn" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black">
                  <Icon name="ZoomOut" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black">
                  <Icon name="RotateCcw" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>
            
            {/* Camera Info */}
            <div className="space-y-4">
              <Card className="bg-vhs-black border-vhs-green">
                <CardHeader className="pb-2">
                  <h3 className="font-mono text-sm">ИНФОРМАЦИЯ</h3>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div>
                    <span className="opacity-70">ID:</span> {selectedCamera?.id}
                  </div>
                  <div>
                    <span className="opacity-70">Локация:</span> {selectedCamera?.location}
                  </div>
                  <div>
                    <span className="opacity-70">Статус:</span> {selectedCamera?.status}
                  </div>
                  <div>
                    <span className="opacity-70">Описание:</span> {selectedCamera?.description}
                  </div>
                  <div>
                    <span className="opacity-70">Последняя активность:</span> {selectedCamera?.lastActivity}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-vhs-black border-vhs-green">
                <CardHeader className="pb-2">
                  <h3 className="font-mono text-sm">ЖУРНАЛ СОБЫТИЙ</h3>
                </CardHeader>
                <CardContent className="text-xs space-y-1">
                  {selectedCamera?.id === 'CAM-03' ? (
                    <>
                      <div className="text-vhs-red animate-pulse">18:45 - АУДИО: Хрустящие звуки</div>
                      <div className="text-vhs-red animate-pulse">18:42 - АУДИО: Жевательные движения</div>
                      <div className="text-vhs-red">18:40 - ПОТЕРЯ СИГНАЛА</div>
                      <div className="text-vhs-red">18:33 - Последний кадр: тень в коридоре</div>
                      <div className="opacity-70">18:30 - Освещение норма</div>
                    </>
                  ) : selectedCamera?.id === 'CAM-05' ? (
                    <>
                      <div className="text-vhs-red animate-pulse">00:18 - АУДИО: Искаженный крик</div>
                      <div className="text-vhs-red animate-pulse">00:17 - ЗВУК: Разрывание ткани/плоти</div>
                      <div className="text-vhs-red">00:15 - RQ-23 ПРОЯВИЛ АГРЕССИЮ</div>
                      <div className="text-vhs-red">00:12 - Образец вышел из-под контроля</div>
                      <div className="text-vhs-red">00:10 - ТРЕВОГА: Аномальное поведение</div>
                    </>
                  ) : (
                    <>
                      <div className="opacity-70">00:15 - Движение обнаружено</div>
                      <div className="opacity-70">23:42 - Активность прекращена</div>
                      <div className="opacity-70">22:18 - Свет выключен</div>
                      <div className="text-vhs-red">21:33 - Аномальный звук</div>
                      <div className="opacity-70">20:15 - Система активна</div>
                    </>
                  )}
                  {audioPlaying && selectedCamera?.id === 'CAM-03' && (
                    <div className="text-vhs-red animate-pulse font-bold">
                      &gt;&gt;&gt; АУДИО В ПРЯМОМ ЭФИРЕ &lt;&lt;&lt;
                    </div>
                  )}
                  {audioPlaying && selectedCamera?.id === 'CAM-05' && (
                    <div className="text-vhs-red animate-pulse font-bold">
                      &gt;&gt;&gt; КРИКИ И РАЗРЫВАНИЕ В ПРЯМОМ ЭФИРЕ &lt;&lt;&lt;
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-vhs-black border-vhs-green">
                <CardHeader className="pb-2">
                  <h3 className="font-mono text-sm">НАСТРОЙКИ</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black text-xs">
                    ЗАПИСЬ
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-vhs-green text-vhs-green hover:bg-vhs-green hover:text-vhs-black text-xs">
                    УВЕДОМЛЕНИЯ
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-vhs-red text-vhs-red hover:bg-vhs-red hover:text-vhs-white text-xs">
                    ОТКЛЮЧИТЬ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;