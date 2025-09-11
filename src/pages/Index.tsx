import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<any>(null);
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [secretKeySequence, setSecretKeySequence] = useState('');
  const [secretTabVisible, setSecretTabVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('cameras');
  const [selectedRQ, setSelectedRQ] = useState<any>(null);
  const [rqDialogOpen, setRqDialogOpen] = useState(false);
  const [systemError, setSystemError] = useState(false);
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [secretInputOpen, setSecretInputOpen] = useState(false);

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = secretKeySequence + e.key;
      
      if ('88JURKEYOPEN'.startsWith(newSequence)) {
        setSecretKeySequence(newSequence);
        
        if (newSequence === '88JURKEYOPEN') {
          setSecretTabVisible(true);
          setActiveTab('unknown');
          setSecretKeySequence('');
          
          // Звук разблокировки
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        }
      } else {
        setSecretKeySequence('');
      }
    };

    if (isAuthenticated) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [secretKeySequence, isAuthenticated]);

  const handleSecretCodeSubmit = () => {
    if (secretCodeInput === '88JURKEYOPEN') {
      setSecretTabVisible(true);
      setActiveTab('unknown');
      setSecretInputOpen(false);
      setSecretCodeInput('');
      
      // Звук разблокировки
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else {
      setSecretCodeInput('');
    }
  };

  const handleLogin = () => {
    // Список авторизованных сотрудников
    const authorizedPersonnel = [
      { name: 'Dr. Petrov', password: 'reqn2024' },
      { name: 'Scientist Volkov', password: 'experiment47' },
      { name: 'Agent Smith', password: 'security01' },
      { name: 'Dr. Kozlov', password: 'laboratory' },
      { name: 'Researcher Ivanov', password: 'specimen23' },
    ];

    const user = authorizedPersonnel.find(
      person => person.name.toLowerCase() === employeeName.toLowerCase() && 
                person.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ОШИБКА: Неверные данные авторизации');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

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

  const openRQDetails = (rq: any) => {
    setSelectedRQ(rq);
    setRqDialogOpen(true);
    
    // Специальная логика для секретных RQ
    if (rq.id === 'RQ-000' || rq.id === 'RQ00-1') {
      setTimeout(() => {
        setSystemError(true);
        setRqDialogOpen(false);
        
        // Звук системной ошибки
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Разные частоты для разных RQ
        if (rq.id === 'RQ-000') {
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          oscillator.frequency.linearRampToValueAtTime(50, audioContext.currentTime + 1);
        } else {
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 1);
        }
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        
        // Сброс ошибки через 5 секунд
        setTimeout(() => setSystemError(false), 5000);
      }, 3000);
    }
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

  const artificialBeings = {
    lower: [
      { id: 'RQ-001', name: 'Светящийся Слизень', status: 'STABLE', description: 'Биолюминесцентное создание, питается светом' },
      { id: 'RQ-002', name: 'Кристальный Паук', status: 'DORMANT', description: 'Прозрачное существо, создаёт кристаллические нити' }
    ],
    mediumness: [
      { id: 'RQ-047', name: 'Психический Червь', status: 'ACTIVE', description: 'Читает мысли на расстоянии до 10 метров' },
      { id: 'RQ-081', name: 'Мутант-Хамелеон', status: 'CONTAINED', description: 'Меняет ДНК по собственному желанию' }
    ],
    dangerer: [
      { id: 'RQ-666', name: 'Пожиратель Теней', status: 'CLASSIFIED', description: 'СУЩЕСТВО ПОГЛОЩАЕТ СВЕТ И МАТЕРИЮ' },
      { id: 'RQ-999', name: 'Безымянный Ужас', status: 'ESCAPED', description: 'ПОБЕГ 72 ЧАСА НАЗАД. МЕСТОПОЛОЖЕНИЕ НЕИЗВЕСТНО' }
    ]
  };

  const allRQBeings = [
    ...artificialBeings.lower.map(being => ({...being, category: 'lower'})),
    ...artificialBeings.mediumness.map(being => ({...being, category: 'mediumness'})),
    ...artificialBeings.dangerer.map(being => ({...being, category: 'dangerer'})),
  ];

  const unknownBeings = [
    { 
      id: 'RQ-000', 
      name: 'РОЗИМ', 
      status: 'ORIGIN', 
      description: 'ПРАРОДИТЕЛЬ ВСЕХ RQ. Чёрное человекоподобное существо с красными глазами, зубами и длинным острым хвостом. ПРОИСХОЖДЕНИЕ И ЦЕЛИ НЕИЗВЕСТНЫ',
      fullDescription: `КЛАССИФИКАЦИЯ: APOCALIPTIC

ВНЕШНИЙ ВИД: Антропоморфное существо ростом 2.3 метра. Кожа абсолютно чёрная, поглощающая свет. Красные глаза излучают собственное свечение. Зубы острые, металлического оттенка. Длинный хвост с костяными шипами способен пробивать металл.

СПОСОБНОСТИ:
• Создание других RQ-существ из неизвестного материала
• Телепортация между измерениями
• Контроль над всеми созданными им существами
• Искажение реальности в радиусе 50 метров
• Регенерация любых повреждений

ПОВЕДЕНИЕ: Крайне агрессивен к человеческому присутствию. Демонстрирует высокий интеллект и способность к планированию. Цель создания RQ-существ неизвестна. Предположительно готовит масштабную атаку на человечество.

ПРОТОКОЛ СДЕРЖИВАНИЯ: НЕ УСТАНОВЛЕН. Местоположение неизвестно.

ПОСЛЕДНЕЕ НАБЛЮДЕНИЕ: [ДАННЫЕ УДАЛЕНЫ]

ОТНОШЕНИЕ К RQ00-1: Отец Мёрсая. Отношение к потомству неизвестно.

ПРИМЕЧАНИЕ: Существование RQ-000 ставит под угрозу весь проект. Рекомендуется немедленная эвакуация всего персонала при любых признаках его присутствия.`
    },
    {
      id: 'RQ00-1',
      name: 'МЁРСАЙ',
      status: 'PROTECTED',
      description: 'ПОЛУЧЕЛОВЕК-ГИБРИД. Сын Розима и д-ра Албиревны. Возраст 6 месяцев. ПОЛНАЯ ПОЛЯРНОСТЬ ПО ОТНОШЕНИЮ К ОТЦУ',
      fullDescription: `КЛАССИФИКАЦИЯ: REVERSER

БИОЛОГИЧЕСКИЕ ДАННЫЕ:
• Возраст: 6 месяцев
• Отец: RQ-000 "Розим"
• Мать: Д-р Албиревна (главный исследователь)
• Вид: 50% человек, 50% неизвестный вид Розима

ВНЕШНИЙ ВИД: Подобен отцу, но с критичными отличиями:
• Кожа тёмно-серая, не поглощающая свет
• Глаза ярко-голубого цвета, излучают тёплое свечение
• Зубы обычной формы, но голубоватого оттенка
• Рост около 1.2 метра (соответствует возрасту)
• Короткий хвост, без шипов

УНИКАЛЬНЫЕ СПОСОБНОСТИ:
• ОБРАЩЕНИЕ АНОМАЛИЙ: Может обращать любое вредное RQ-воздействие в полезное
• АНТИ-АГРЕССИЯ: Присутствие успокаивает агрессивные RQ-существа
• ЛЕЧЕНИЕ: Может снимать психические травмы, нанесённые другими RQ
• ЭМПАТИЯ: Особо чувствителен к эмоциям людей
• ОБУЧАЕМОСТЬ: Может освоить любой навык крайне быстро

ПОВЕДЕНИЕ: Кардинально противоположно отцу:
• Миролюбив и доброжелателен
• Любознателен и сообразителен
• Проявляет сочувствие к страданиям людей
• Очень привязан к матери

ОТНОШЕНИЕ К ОТЦУ: Очень сложно. Не испытывает страха, но проявляет удивление его поведением.

ПРОТОКОЛ СОДЕРЖАНИЯ: МАКСИМАЛЬНАЯ ЗАЩИТА.
• Отдельная комната с матерью
• Круглосуточная охрана (5 человек)
• Приоритет безопасности: АБСОЛЮТНЫЙ
• При любой угрозе - немедленная эвакуация

ПОТЕНЦИАЛЬНОЕ ПРИМЕНЕНИЕ:
• Нейтрализация агрессивных RQ
• Лечение последствий RQ-воздействий
• Возможно - обращение аномалий в пользу человечества

ПРИМЕЧАНИЕ: Мёрсай - потенциальный ключ к разрешению кризиса RQ-существ. Однако его безопасность является критично важной для проекта.`
    },
    { 
      id: 'RQ-???', 
      name: 'Шёпчущая Тень', 
      status: 'OBSERVED', 
      description: 'Неопределимая сущность в коридоре Б-7. Появляется каждую полночь',
      fullDescription: 'КЛАССИФИКАЦИЯ: ЕВКЛИД\n\nВНЕШНИЙ ВИД: Бесформенная тёмная масса, постоянно меняющая очертания. Высота варьируется от 0.5 до 3 метров.\n\nСПОСОБНОСТИ:\n• Появление строго в 00:00 в коридоре Б-7\n• Издаёт неразборчивый шёпот на неизвестном языке\n• Не реагирует на физическое воздействие\n• Исчезает через 47 минут после появления\n\nПОВЕДЕНИЕ: Нейтрально к персоналу. Движется по коридору медленно, останавливается у каждой двери на 3-4 минуты. Шёпот усиливается при приближении людей.\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: Коридор Б-7 закрывается с 23:45 до 01:00 ежедневно.'
    },
    { 
      id: 'RQ-X01', 
      name: 'Зеркальный Двойник', 
      status: 'STUDYING', 
      description: 'Копирует внешность персонала. Происхождение неизвестно',
      fullDescription: 'КЛАССИФИКАЦИЯ: ЕВКЛИД\n\nВНЕШНИЙ ВИД: Точная копия любого человека в радиусе 100 метров. Единственное отличие - отсутствие отражения в зеркалах.\n\nСПОСОБНОСТИ:\n• Мгновенное копирование внешности\n• Имитация голоса и манер поведения\n• Доступ к поверхностным воспоминаниям копируемого\n• Сохранение облика до 72 часов\n\nПОВЕДЕНИЕ: Пытается интегрироваться в коллектив. Ведёт себя как копируемый человек, но с небольшими отклонениями в поведении.\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: Обязательная проверка всего персонала зеркалами каждые 4 часа.'
    },
    { 
      id: 'RQ-∞', 
      name: 'Бесконечный Лабиринт', 
      status: 'ANOMALY', 
      description: 'Пространственная аномалия в секторе C. ВХОД ЗАПРЕЩЕН',
      fullDescription: 'КЛАССИФИКАЦИЯ: КЕТЕР\n\nОПИСАНИЕ: Пространственная аномалия, превращающая сектор C в бесконечно повторяющиеся коридоры.\n\nЭФФЕКТЫ:\n• Искажение пространства внутри сектора\n• Невозможность найти выход обычными способами\n• Появление "призрачных" копий исследователей\n• Постоянно меняющаяся планировка\n\nВОЗДЕЙСТВИЕ НА ПЕРСОНАЛ:\n• Потеря ориентации в пространстве\n• Галлюцинации через 2+ часа\n• Полная дезориентация через 6+ часов\n• [ЗАСЕКРЕЧЕНО] через 12+ часов\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: Сектор C полностью изолирован. Доступ запрещён всему персоналу без исключения.'
    }
  ];

  // Экран авторизации
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-vhs-black text-vhs-white font-vhs flex items-center justify-center">
        {/* Scanline effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-vhs-crimson opacity-30 animate-scanline"></div>
        </div>

        {/* Static overlay */}
        <div className={`fixed inset-0 pointer-events-none transition-opacity duration-100 ${
          glitchActive ? 'opacity-10' : 'opacity-5'
        }`}>
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGF0aWMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgogICAgICA8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC41IiBmaWxsPSIjREMxNDNDIiBvcGFjaXR5PSIwLjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjc3RhdGljKSIvPgo8L3N2Zz4K')] animate-static"></div>
        </div>

        <Card className="w-full max-w-md bg-vhs-black border-vhs-crimson">
          <CardHeader className="text-center pb-2">
            <div className={`mb-4 ${glitchActive ? 'animate-glitch' : ''}`}>
              <h1 className="text-3xl font-bold mb-2 text-[#0500ed]">REQN CO</h1>
              <h2 className="text-xl text-[#0500ff]">LABORATORY</h2>
              <div className="text-xs opacity-70 mt-2 bg-[#24ff00]">СИСТЕМА БЕЗОПАСНОСТИ v2.1.3</div>
            </div>
            <div className="border-t border-vhs-crimson pt-4">
              <Icon name="Shield" size={32} className="mx-auto mb-2 text-vhs-crimson" />
              <h3 className="text-lg font-mono text-slate-50">АВТОРИЗАЦИЯ ПЕРСОНАЛА</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="employee" className="text-xs opacity-70">ИМЯ СОТРУДНИКА:</Label>
              <Input
                id="employee"
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-vhs-black border-vhs-crimson text-vhs-white placeholder-vhs-gray focus:border-vhs-red mt-1 font-mono"
                placeholder="Введите ваше имя"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-xs opacity-70">ПАРОЛЬ:</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-vhs-black border-vhs-crimson text-vhs-white placeholder-vhs-gray focus:border-vhs-red mt-1 font-mono"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <div className="text-vhs-red text-xs animate-pulse font-mono text-center">
                {loginError}
              </div>
            )}

            <Button 
              onClick={handleLogin}
              className="w-full bg-vhs-crimson text-vhs-white hover:bg-vhs-darkred font-mono"
            >
              ВОЙТИ В СИСТЕМУ
            </Button>

            <div className="text-xs opacity-50 text-center space-y-1">
              <div>УРОВЕНЬ ДОСТУПА: ОГРАНИЧЕННЫЙ</div>
              <div className="text-vhs-red">⚠ НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП ЗАПРЕЩЕН</div>
            </div>

            <div className="border-t border-vhs-crimson pt-2 text-xs opacity-40">
              <div className="text-center">
                <div>Тестовые данные:</div>
                <div>Dr. Petrov / reqn2024</div>
                <div>Agent Smith / security01</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vhs-black text-vhs-white font-vhs">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-vhs-crimson opacity-30 animate-scanline"></div>
      </div>

      {/* Static overlay */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-100 ${
        glitchActive ? 'opacity-10' : 'opacity-5'
      }`}>
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGF0aWMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgogICAgICA8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC41IiBmaWxsPSIjREMxNDNDIiBvcGFjaXR5PSIwLjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjc3RhdGljKSIvPgo8L3N2Zz4K')] animate-static"></div>
      </div>

      {/* Header */}
      <header className="border-b border-vhs-crimson p-3 sm:p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className={`transition-transform duration-100 ${glitchActive ? 'animate-glitch' : ''} text-center sm:text-left`}>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3b00ff]">REQN CO LABORATORY</h1>
            <p className="text-xs sm:text-sm opacity-70 text-[#24ff00]">СИСТЕМА БЕЗОПАСНОСТИ v2.1.3</p>
          </div>
          <div className="text-center sm:text-right flex flex-col gap-2">
            <div className="text-lg sm:text-xl font-mono">{formatTime(currentTime)}</div>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <Badge variant="outline" className="border-vhs-crimson text-vhs-crimson text-xs">
                СИСТЕМА АКТИВНА
              </Badge>
              <Button
                size="sm"
                onClick={() => setSecretInputOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-xs px-2 py-1"
              >
                <Icon name="Keyboard" size={14} className="mr-1" />
                КОД
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid ${secretTabVisible ? 'grid-cols-3 lg:grid-cols-7' : 'grid-cols-2 lg:grid-cols-6'} w-full mb-4 sm:mb-6 bg-vhs-black border border-vhs-crimson`}>
            <TabsTrigger value="cameras" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">КАМЕРЫ</TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">ИНЦИДЕНТЫ</TabsTrigger>
            <TabsTrigger value="specimens" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">ЭКСПЕРИМЕНТЫ</TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">АРХИВ</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">ДОКУМЕНТЫ</TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">СТАТУС</TabsTrigger>
            {secretTabVisible && (
              <TabsTrigger value="unknown" className="data-[state=active]:bg-purple-600 data-[state=active]:text-vhs-white text-purple-400 animate-pulse text-xs sm:text-sm p-1 sm:p-2 col-span-2 lg:col-span-1">НЕИЗВЕСТНЫЕ RQ</TabsTrigger>
            )}
          </TabsList>

          {/* Cameras Tab */}
          <TabsContent value="cameras">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-transparent">
              {cameras.map((camera) => (
                <Card key={camera.id} className="bg-vhs-black border-vhs-crimson">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-mono text-base sm:text-lg text-slate-50">{camera.id}</h3>
                      <Badge 
                        variant={camera.status === 'ONLINE' ? 'default' : 'destructive'}
                        className={`text-xs ${camera.status === 'ONLINE' ? 'bg-vhs-crimson text-vhs-white' : 'bg-vhs-red text-vhs-white'}`}
                      >
                        {camera.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm opacity-70 text-slate-50">{camera.location}</p>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="relative aspect-video bg-vhs-gray mb-2 sm:mb-3 overflow-hidden">
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
                      <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-[#ffffffb3]">
                        {formatTime(currentTime).split(' ')[1]}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-vhs-crimson text-vhs-white hover:bg-vhs-darkred"
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
                <Card key={incident.id} className="bg-vhs-black border-vhs-crimson">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-gray-50">{incident.id}</span>
                          <Badge 
                            variant={incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'destructive' : 'default'}
                            className={
                              incident.severity === 'CRITICAL' ? 'bg-vhs-red text-vhs-white animate-pulse' :
                              incident.severity === 'HIGH' ? 'bg-vhs-red text-vhs-white' :
                              'bg-vhs-crimson text-vhs-white'
                            }
                          >
                            {incident.severity}
                          </Badge>
                          <span className="text-sm opacity-70">{incident.time}</span>
                        </div>
                        <p>{incident.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-vhs-crimson text-vhs-white">
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Artificial Beings Tab */}
          <TabsContent value="specimens">
            <div className="space-y-6">
              {/* Lower - Safest */}
              <div className="space-y-3">
                <h3 className="text-lg font-mono flex items-center gap-2 text-[#db14b5]">
                  <Icon name="Heart" size={18} className="text-green-400" />
                  LOWER - Безопасные существа
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {artificialBeings.lower.map((being) => (
                    <Card key={being.id} className="bg-vhs-black border-green-400">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-sm text-slate-50">{being.id}</h4>
                          <Badge className={being.status === 'STABLE' ? 'bg-green-400 text-vhs-black' : 'bg-gray-400 text-vhs-black'}>
                            {being.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-slate-50">{being.name}</p>
                        <p className="text-xs text-gray-300">{being.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => openRQDetails({...being, fullDescription: `КЛАССИФИКАЦИЯ: БЕЗОПАСНЫЙ\n\nОПИСАНИЕ: ${being.description}\n\nПОВЕДЕНИЕ: Неагрессивное. Подходит для базовых исследований.\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: Стандартный контейнмент.`})}
                          size="sm" 
                          className="w-full bg-green-600 hover:bg-green-500 text-vhs-white text-xs"
                        >
                          <Icon name="FileText" size={14} className="mr-1" />
                          ПОДРОБНЕЕ
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Mediumness - Medium Danger */}
              <div className="space-y-3">
                <h3 className="text-lg font-mono flex items-center gap-2 text-[#addb14]">
                  <Icon name="Eye" size={18} className="text-yellow-400" />
                  MEDIUMNESS - Опасные существа
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {artificialBeings.mediumness.map((being) => (
                    <Card key={being.id} className="bg-vhs-black border-yellow-400">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-sm text-slate-50">{being.id}</h4>
                          <Badge className={
                            being.status === 'ACTIVE' ? 'bg-yellow-400 text-vhs-black animate-pulse' :
                            'bg-yellow-400 text-vhs-black'
                          }>
                            {being.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-slate-50">{being.name}</p>
                        <p className="text-xs text-gray-300">{being.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => openRQDetails({...being, fullDescription: `КЛАССИФИКАЦИЯ: ОПАСНЫЙ\n\nОПИСАНИЕ: ${being.description}\n\nПОВЕДЕНИЕ: Умеренно агрессивное. Требует осторожности при обращении.\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: Усиленный контейнмент. Постоянный мониторинг.`})}
                          size="sm" 
                          className="w-full bg-yellow-600 hover:bg-yellow-500 text-vhs-black text-xs"
                        >
                          <Icon name="FileText" size={14} className="mr-1" />
                          ПОДРОБНЕЕ
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dangerer - Most Dangerous */}
              <div className="space-y-3">
                <h3 className="text-lg font-mono flex items-center gap-2 text-[#000ecc]">
                  <Icon name="Skull" size={18} className="text-vhs-red animate-pulse" />
                  DANGERER - Смертельно опасные существа
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {artificialBeings.dangerer.map((being) => (
                    <Card key={being.id} className="bg-vhs-black border-vhs-red">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-sm text-slate-50">{being.id}</h4>
                          <Badge className={
                            being.status === 'CLASSIFIED' ? 'bg-vhs-red text-vhs-white animate-pulse' :
                            being.status === 'ESCAPED' ? 'bg-red-800 text-vhs-white animate-pulse' :
                            'bg-vhs-red text-vhs-white'
                          }>
                            {being.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-slate-50">{being.name}</p>
                        <p className="text-xs text-gray-300">{being.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => openRQDetails({...being, fullDescription: `КЛАССИФИКАЦИЯ: КРИТИЧЕСКАЯ УГРОЗА\n\nОПИСАНИЕ: ${being.description}\n\nПОВЕДЕНИЕ: КРАЙНЕ АГРЕССИВНОЕ. ПРЕДСТАВЛЯЕТ МАКСИМАЛЬНУЮ ОПАСНОСТЬ.\n\nПРОТОКОЛ СДЕРЖИВАНИЯ: МАКСИМАЛЬНЫЕ МЕРЫ БЕЗОПАСНОСТИ. ПРИ НАРУШЕНИИ - НЕМЕДЛЕННАЯ ЭВАКУАЦИЯ.`})}
                          size="sm" 
                          className="w-full bg-vhs-red hover:bg-red-600 text-vhs-white text-xs animate-pulse"
                        >
                          <Icon name="AlertTriangle" size={14} className="mr-1" />
                          КРИТИЧНО
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Archive Tab */}
          <TabsContent value="archive">
            <Card className="bg-vhs-black border-vhs-crimson">
              <CardContent className="p-8 text-center">
                <Icon name="FileText" size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl mb-2 text-slate-50">АРХИВ ЗАПИСЕЙ</h3>
                <p className="opacity-70 text-[#ff0000]">Доступ к архивным записям требует авторизации уровня 3</p>
                <Button className="mt-4 bg-vhs-crimson text-vhs-white hover:bg-vhs-darkred">
                  ЗАПРОСИТЬ ДОСТУП
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card className="bg-vhs-black border-vhs-crimson">
              <CardContent className="p-8 text-center">
                <Icon name="Lock" size={64} className="mx-auto mb-4 opacity-50 text-red-500" />
                <h3 className="text-xl mb-2 text-[#ff0000]">СЕКРЕТНЫЕ ДОКУМЕНТЫ</h3>
                <p className="opacity-70 text-[#ff0000]">Доступ ограничен. Обратитесь к администратору системы</p>
                <Button className="mt-4 bg-vhs-red text-vhs-white hover:bg-red-600">
                  ДОСТУП ЗАПРЕЩЕН
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-vhs-black border-vhs-crimson">
                <CardHeader>
                  <h3 className="flex items-center gap-2 text-[#ffffff]">
                    <Icon name="Wifi" size={20} />
                    СОСТОЯНИЕ СИСТЕМЫ
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Камеры онлайн:</span>
                    <span className="text-vhs-white">3/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Активные инциденты:</span>
                    <span className="text-vhs-red">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Существа под контролем:</span>
                    <span className="text-yellow-500">3/6</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-vhs-black border-vhs-crimson">
                <CardHeader>
                  <h3 className="flex items-center gap-2 text-[#ff0000]">
                    <Icon name="AlertTriangle" size={20} />
                    ПРЕДУПРЕЖДЕНИЯ
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-vhs-red animate-pulse">⚠ RQ-666 Пожиратель Теней засекречен</div>
                    <div className="text-yellow-500">⚠ Камера CAM-03 офлайн</div>
                    <div className="text-vhs-red">⚠ RQ-999 СБЕЖАЛО! Поиск продолжается</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Unknown Beings Secret Tab */}
          {secretTabVisible && (
            <TabsContent value="unknown">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-mono text-purple-400 animate-pulse mb-2">НЕИЗВЕСТНЫЕ И НЕИЗУЧЕННЫЕ RQ</h2>
                  <p className="text-sm opacity-70 text-purple-300">ДОСТУП ПОЛУЧЕН ПО СЕКРЕТНОМУ КОДУ</p>
                  <div className="border-t border-purple-500 mt-2"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unknownBeings.map((being) => (
                    <Card key={being.id} className={
                      being.id === 'RQ-000' ? 'bg-black border-red-600 hover:border-red-500 transition-colors shadow-red-900/50 shadow-lg' :
                      'bg-vhs-black border-purple-500 hover:border-purple-400 transition-colors'
                    }>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className={`font-mono text-sm ${being.id === 'RQ-000' ? 'text-red-200' : 'text-slate-50'}`}>
                            {being.id}
                          </h4>
                          <Badge className={
                            being.status === 'ORIGIN' ? 'bg-red-800 text-vhs-white animate-pulse border border-red-600' :
                            being.status === 'OBSERVED' ? 'bg-purple-600 text-vhs-white animate-pulse' :
                            being.status === 'STUDYING' ? 'bg-blue-600 text-vhs-white' :
                            being.status === 'ANOMALY' ? 'bg-red-800 text-vhs-white animate-pulse' :
                            'bg-purple-500 text-vhs-white'
                          }>
                            {being.status}
                          </Badge>
                        </div>
                        <p className={`text-sm font-semibold ${
                          being.id === 'RQ-000' ? 'text-red-300 font-bold animate-pulse' : 'text-purple-200'
                        }`}>
                          {being.name}
                        </p>
                        <p className={`text-xs ${
                          being.id === 'RQ-000' ? 'text-red-100' :
                          being.id === 'RQ00-1' ? 'text-blue-100' :
                          'text-gray-300'
                        }`}>
                          {being.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => openRQDetails(being)}
                          size="sm" 
                          className={`w-full text-xs ${
                            being.id === 'RQ-000' 
                              ? 'bg-red-800 hover:bg-red-700 text-red-100 border border-red-600 animate-pulse' 
                            : being.id === 'RQ00-1'
                              ? 'bg-blue-800 hover:bg-blue-700 text-blue-100 border border-blue-600'
                              : 'bg-purple-600 hover:bg-purple-500 text-vhs-white'
                          }`}
                        >
                          <Icon 
                            name={being.id === 'RQ-000' ? 'Skull' : being.id === 'RQ00-1' ? 'Heart' : 'FileText'} 
                            size={14} 
                            className="mr-1" 
                          />
                          {being.id === 'RQ-000' ? 'ПОЛНОЕ ДОСЬЕ' : 
                           being.id === 'RQ00-1' ? 'СОКРОВИЩЕ' :
                           'ПОДРОБНЕЕ'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-vhs-black border-purple-500">
                  <CardHeader>
                    <h3 className="flex items-center gap-2 text-purple-400">
                      <Icon name="AlertTriangle" size={20} className="animate-pulse" />
                      КРИТИЧЕСКИЕ ПРЕДУПРЕЖДЕНИЯ
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="text-red-500 animate-pulse font-bold border border-red-600 p-2 bg-red-950/20">
                      🔴 RQ-000 "РОЗИМ" - АБСОЛЮТНАЯ УГРОЗА. СОЗДАТЕЛЬ ВСЕХ RQ. МЕСТОПОЛОЖЕНИЕ НЕИЗВЕСТНО. ПРИ ОБНАРУЖЕНИИ НЕМЕДЛЕННО ПОКИНУТЬ ОБЪЕКТ
                    </div>
                    <div className="text-blue-400 animate-pulse font-bold border border-blue-600 p-2 bg-blue-950/20">
                      💙 RQ00-1 "МЁРСАЙ" - НАДЕЖДА ЧЕЛОВЕЧЕСТВА. ГИБРИД РОЗИМА И Д-РА АЛБИРЕВНЫ. ВОЗРАСТ 6 МЕС. МАКСИМАЛЬНАЯ ЗАЩИТА. МОЖЕТ ОБРАТИТЬ АНОМАЛИИ
                    </div>
                    <div className="text-purple-300 animate-pulse">⚠ RQ-??? появляется строго в полночь - избегайте коридора Б-7</div>
                    <div className="text-red-400 animate-pulse">⚠ RQ-X01 может принимать облик любого сотрудника - требуется двойная проверка личности</div>
                    <div className="text-red-500 animate-pulse font-bold">⚠ RQ-∞ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕН ВХОД В СЕКТОР C - ПРОСТРАНСТВЕННАЯ АНОМАЛИЯ АКТИВНА</div>
                    <div className="border-t border-purple-500 pt-2 text-purple-200">
                      Данные существа не входят в официальную классификацию. Информация строго конфиденциальна.
                      <br/>
                      <span className="text-red-300 font-bold">RQ-000 является источником всех остальных RQ-объектов.</span>
                      <br/>
                      <span className="text-blue-300 font-bold">RQ00-1 Мёрсай - единственная надежда на спасение.</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Camera Detail Dialog */}
      <Dialog open={cameraDialogOpen} onOpenChange={setCameraDialogOpen}>
        <DialogContent className="bg-vhs-black border-vhs-crimson text-vhs-white max-w-4xl font-vhs">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono flex items-center gap-3">
              <Icon name="Camera" size={24} className="animate-rotate-camera text-vhs-crimson" />
              {selectedCamera?.id} - {selectedCamera?.location}
              <Badge 
                variant={selectedCamera?.status === 'ONLINE' ? 'default' : 'destructive'}
                className={selectedCamera?.status === 'ONLINE' ? 'bg-vhs-crimson text-vhs-white' : 'bg-vhs-red text-vhs-white'}
              >
                {selectedCamera?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera Feed */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video bg-vhs-gray overflow-hidden mb-4 border border-vhs-crimson">
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
                    <div className="w-8 h-8 border border-vhs-crimson border-opacity-50">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-vhs-crimson opacity-30"></div>
                      <div className="absolute left-1/2 top-0 w-px h-full bg-vhs-crimson opacity-30"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className="border-vhs-crimson text-vhs-crimson hover:bg-vhs-crimson hover:text-vhs-white">
                  <Icon name="ZoomIn" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-crimson text-vhs-crimson hover:bg-vhs-crimson hover:text-vhs-white">
                  <Icon name="ZoomOut" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-crimson text-vhs-crimson hover:bg-vhs-crimson hover:text-vhs-white">
                  <Icon name="RotateCcw" size={16} />
                </Button>
                <Button variant="outline" className="border-vhs-crimson text-vhs-crimson hover:bg-vhs-crimson hover:text-vhs-white">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>
            
            {/* Camera Info */}
            <div className="space-y-4">
              <Card className="bg-vhs-black border-vhs-crimson">
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
              
              <Card className="bg-vhs-black border-vhs-crimson">
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
              
              <Card className="bg-vhs-black border-vhs-crimson">
                <CardHeader className="pb-2">
                  <h3 className="font-mono text-sm">НАСТРОЙКИ</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-vhs-crimson text-vhs-white hover:bg-vhs-crimson hover:text-vhs-black text-xs">
                    ЗАПИСЬ
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-vhs-crimson text-vhs-white hover:bg-vhs-crimson hover:text-vhs-black text-xs">
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

      {/* RQ Details Dialog */}
      <Dialog open={rqDialogOpen} onOpenChange={setRqDialogOpen}>
        <DialogContent className={`font-vhs max-w-4xl ${
          selectedRQ?.id === 'RQ-000' 
            ? 'bg-black border-red-600 text-red-100' 
          : selectedRQ?.id === 'RQ00-1'
            ? 'bg-black border-blue-600 text-blue-100'
            : 'bg-vhs-black border-purple-500 text-vhs-white'
        }`}>
          <DialogHeader>
            <DialogTitle className={`text-2xl font-mono flex items-center gap-3 ${
              selectedRQ?.id === 'RQ-000' ? 'text-red-200' :
              selectedRQ?.id === 'RQ00-1' ? 'text-blue-200' :
              'text-purple-200'
            }`}>
              <Icon 
                name={selectedRQ?.id === 'RQ-000' ? 'Skull' : selectedRQ?.id === 'RQ00-1' ? 'Heart' : 'FileText'} 
                size={24} 
                className={selectedRQ?.id === 'RQ-000' ? 'text-red-400' : selectedRQ?.id === 'RQ00-1' ? 'text-blue-400' : 'text-purple-400'} 
              />
              {selectedRQ?.id} - {selectedRQ?.name}
              <Badge className={
                selectedRQ?.id === 'RQ-000' ? 'bg-red-800 text-red-100 animate-pulse border border-red-600' :
                selectedRQ?.id === 'RQ00-1' ? 'bg-blue-800 text-blue-100 border border-blue-600' :
                selectedRQ?.status === 'OBSERVED' ? 'bg-purple-600 text-vhs-white animate-pulse' :
                selectedRQ?.status === 'STUDYING' ? 'bg-blue-600 text-vhs-white' :
                selectedRQ?.status === 'ANOMALY' ? 'bg-red-800 text-vhs-white animate-pulse' :
                selectedRQ?.status === 'ACTIVE' ? 'bg-yellow-400 text-vhs-black animate-pulse' :
                selectedRQ?.status === 'ESCAPED' ? 'bg-red-800 text-vhs-white animate-pulse' :
                selectedRQ?.status === 'PROTECTED' ? 'bg-green-800 text-green-100 border border-green-600' :
                'bg-gray-600 text-vhs-white'
              }>
                {selectedRQ?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className={`space-y-4 max-h-96 overflow-y-auto ${
            selectedRQ?.id === 'RQ-000' ? 'text-red-100' :
            selectedRQ?.id === 'RQ00-1' ? 'text-blue-100' :
            'text-gray-200'
          }`}>
            <div className={`p-4 rounded border ${
              selectedRQ?.id === 'RQ-000' 
                ? 'bg-red-950/30 border-red-600' 
              : selectedRQ?.id === 'RQ00-1'
                ? 'bg-blue-950/30 border-blue-600'
                : 'bg-purple-950/30 border-purple-500'
            }`}>
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                {selectedRQ?.fullDescription || 'Нет доступных данных.'}
              </pre>
            </div>
            
            {(selectedRQ?.id === 'RQ-000' || selectedRQ?.id === 'RQ00-1') && (
              <div className="text-center space-y-2">
                <div className={`animate-pulse text-lg font-bold ${
                  selectedRQ?.id === 'RQ-000' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {selectedRQ?.id === 'RQ-000' 
                    ? '⚠ КОНФИДЕНЦИАЛЬНАЯ ИНФОРМАЦИЯ ⚠'
                    : '🔒 СОКРОВИЩЕ - МАКСИМАЛЬНАЯ ЗАЩИТА 🔒'
                  }
                </div>
                <div className={`text-sm ${
                  selectedRQ?.id === 'RQ-000' ? 'text-red-300' : 'text-blue-300'
                }`}>
                  {selectedRQ?.id === 'RQ-000'
                    ? 'Автоматическое закрытие через 3 секунды...'
                    : 'Ограниченный доступ. Автозакрытие через 3 сек...'
                  }
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Secret Code Input Dialog */}
      <Dialog open={secretInputOpen} onOpenChange={setSecretInputOpen}>
        <DialogContent className="bg-vhs-black border-purple-500 max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-purple-400 font-mono text-center">
              🔐 ВВОД СЕКРЕТНОГО КОДА
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-purple-300 text-sm">
              Введите код доступа к засекреченным данным
            </div>
            <Input
              type="text"
              value={secretCodeInput}
              onChange={(e) => setSecretCodeInput(e.target.value.toUpperCase())}
              placeholder="ВВЕДИТЕ КОД..."
              className="bg-purple-950/30 border-purple-600 text-purple-200 font-mono text-center uppercase"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setSecretInputOpen(false)}
                variant="outline"
                className="flex-1 border-purple-600 text-purple-300 hover:bg-purple-900/30"
              >
                ОТМЕНА
              </Button>
              <Button
                onClick={handleSecretCodeSubmit}
                className="flex-1 bg-purple-600 text-vhs-white hover:bg-purple-700"
              >
                ВВЕСТИ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* System Error Screen */}
      {systemError && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center font-vhs">
          <div className="text-center space-y-4 animate-pulse">
            <div className="text-4xl md:text-6xl text-red-500 font-bold">
              ☠ SYSTEM ERROR ☠
            </div>
            <div className="text-xl md:text-2xl text-red-400">
              ACCESS DENIED
            </div>
            <div className="text-base md:text-lg text-red-300 px-4">
              UNAUTHORIZED DATA BREACH DETECTED
            </div>
            <div className="text-sm text-red-200 opacity-70 px-4">
              RQ-000 INFORMATION IS CLASSIFIED
            </div>
            <div className="text-xs text-red-100 opacity-50 px-4">
              Система будет восстановлена через 5 секунд...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;