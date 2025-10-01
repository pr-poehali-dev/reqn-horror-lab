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
  const [unlockedSecrets, setUnlockedSecrets] = useState({
    incident1999: false,
    labMap: false,
    camera767: false
  });
  const [incidentDocOpen, setIncidentDocOpen] = useState(false);
  const [labMapOpen, setLabMapOpen] = useState(false);
  const [camera767Open, setCamera767Open] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [archivePassword, setArchivePassword] = useState('');
  const [archiveError, setArchiveError] = useState('');
  const [archiveUnlocked, setArchiveUnlocked] = useState(false);
  const [rozimReadAttempts, setRozimReadAttempts] = useState(0);
  const [showWarningImage, setShowWarningImage] = useState(false);

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
      
      // Проверяем все возможные секретные коды
      const secretCodes = ['88JURKEYOPEN', '1999Ince', 'IMISSYOU', 'LOSSCAM'];
      let foundMatch = false;
      
      for (const code of secretCodes) {
        if (code.startsWith(newSequence)) {
          foundMatch = true;
          setSecretKeySequence(newSequence);
          
          if (newSequence === code) {
            // Выполняем соответствующее действие
            if (code === '88JURKEYOPEN') {
              setSecretTabVisible(true);
              setActiveTab('unknown');
            } else if (code === '1999Ince') {
              setUnlockedSecrets(prev => ({ ...prev, incident1999: true }));
              setIncidentDocOpen(true);
            } else if (code === 'IMISSYOU') {
              setUnlockedSecrets(prev => ({ ...prev, labMap: true }));
              setLabMapOpen(true);
            } else if (code === 'LOSSCAM') {
              setUnlockedSecrets(prev => ({ ...prev, camera767: true }));
              setCamera767Open(true);
            }
            
            setSecretKeySequence('');
            playUnlockSound();
          }
          break;
        }
      }
      
      if (!foundMatch) {
        setSecretKeySequence('');
      }
    };

    if (isAuthenticated) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [secretKeySequence, isAuthenticated]);

  const playUnlockSound = () => {
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
  };

  const handleArchiveAccess = () => {
    if (!currentUser || currentUser.level < 5) {
      setArchiveError('ОШИБКА: Недостаточный уровень допуска');
      setTimeout(() => setArchiveError(''), 3000);
      return;
    }
    setArchiveDialogOpen(true);
  };

  const handleArchivePasswordSubmit = () => {
    if (archivePassword === currentUser.archivePassword) {
      setArchiveUnlocked(true);
      setArchiveError('');
      setArchivePassword('');
      setArchiveDialogOpen(false);
      setActiveTab('deceased');
      playUnlockSound();
    } else {
      setArchiveError('ОШИБКА: Неверный пароль доступа к архиву');
      setArchivePassword('');
      setTimeout(() => setArchiveError(''), 3000);
    }
  };

  const handleLogin = () => {
    // Список авторизованных сотрудников с уровнями доступа и паролями архива
    const authorizedPersonnel = [
      { name: 'Dr. Petrov', password: 'reqn2024', level: 8, archivePassword: 'archives_petrov_8' },
      { name: 'Scientist Volkov', password: 'experiment47', level: 4, archivePassword: '' },
      { name: 'Agent Smith', password: 'security01', level: 10, archivePassword: 'smith_classified_10' },
      { name: 'Dr. Kozlov', password: 'laboratory', level: 6, archivePassword: 'kozlov_lab_6' },
      { name: 'Researcher Ivanov', password: 'specimen23', level: 3, archivePassword: '' },
      { name: 'Director Sokolov', password: 'director2024', level: 12, archivePassword: 'sokolov_director_12' },
      { name: 'Technician Morozov', password: 'tech2024', level: 2, archivePassword: '' },
      { name: 'Security Chief Orlov', password: 'security_chief', level: 9, archivePassword: 'orlov_security_9' },
      { name: 'Dr. Lebedeva', password: 'research_lead', level: 7, archivePassword: 'lebedeva_research_7' },
      { name: 'Intern Kuznetsov', password: 'intern2024', level: 1, archivePassword: '' },
      { name: 'Analyst Sergeev', password: 'data_analysis', level: 5, archivePassword: 'sergeev_data_5' },
      { name: 'Unknown Entity', password: 'ERROR_404', level: -1, archivePassword: '' },
    ];

    const user = authorizedPersonnel.find(
      person => person.name.toLowerCase() === employeeName.toLowerCase() && 
                person.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
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
    // Проверяем если это Розим (RQ-000)
    if (rq.id === 'RQ-000') {
      const newAttempts = rozimReadAttempts + 1;
      setRozimReadAttempts(newAttempts);
      
      // На 7-ой попытке показываем страшную картинку
      if (newAttempts >= 7) {
        setShowWarningImage(true);
        playErrorSound();
        // Скрываем через 5 секунд
        setTimeout(() => setShowWarningImage(false), 5000);
        return; // Не открываем карточку
      }
    }
    
    setSelectedRQ(rq);
    setRqDialogOpen(true);
    
    // Специальная логика только для RQ-000 (Розим)
    if (rq.id === 'RQ-000') {
      setTimeout(() => {
        setSystemError(true);
        setRqDialogOpen(false);
        
        // Звук системной ошибки для RQ-000
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(50, audioContext.currentTime + 1);
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

  const playErrorSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.5);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
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
      { 
        id: 'RQ-001', 
        name: 'Светящийся Слизень', 
        status: 'STABLE', 
        classification: 'LOWER',
        description: 'Биолюминесцентное создание, питается светом',
        fullDescription: `КЛАССИФИКАЦИЯ: LOWER

ОПИСАНИЕ: Безопасное биолюминесцентное существо. Питается светом любого спектра. Не проявляет агрессии.

ПОВЕДЕНИЕ: Мирное, любопытное. Может служить естественным освещением.

ПРОТОКОЛ СДЕРЖИВАНИЯ: Стандартная камера с освещением.`
      },
      { 
        id: 'RQ-002', 
        name: 'Кристальный Паук', 
        status: 'DORMANT', 
        classification: 'LOWER',
        description: 'Прозрачное существо, создаёт кристаллические нити',
        fullDescription: `КЛАССИФИКАЦИЯ: LOWER

ОПИСАНИЕ: Полупрозрачное паукообразное существо. Производит сверхпрочные кристаллические волокна.

ПОВЕДЕНИЕ: Мирное, полусонное состояние. Используется для производства сверхматериалов.

ПРОТОКОЛ СДЕРЖИВАНИЯ: Комфортная камера с повышенной влажностью.`
      }
    ],
    mediumness: [
      { 
        id: 'RQ-047', 
        name: 'Психический Червь', 
        status: 'ACTIVE', 
        classification: 'MEDIUMNESS',
        description: 'Читает мысли на расстоянии до 10 метров',
        fullDescription: `КЛАССИФИКАЦИЯ: MEDIUMNESS

ОПИСАНИЕ: Червообразное существо с развитыми психическими способностями. Может считывать мысли и эмоции.

ОПАСНОСТЬ: Может вызвать психические атаки и получать конфиденциальную информацию.

ПРОТОКОЛ СДЕРЖИВАНИЯ: Психозащищённая камера. Персонал должен соблюдать ментальную гигиену.`
      },
      { 
        id: 'RQ-081', 
        name: 'Мутант-Хамелеон', 
        status: 'CONTAINED', 
        classification: 'MEDIUMNESS',
        description: 'Меняет ДНК по собственному желанию',
        fullDescription: `КЛАССИФИКАЦИЯ: MEDIUMNESS

ОПИСАНИЕ: Гибридное существо, способное к молекулярным мутациям своей ДНК. Может принимать вид любого живого организма.

ОПАСНОСТЬ: Может имитировать людей для побега и инфильтрации.

ПРОТОКОЛ СДЕРЖИВАНИЯ: Укреплённая камера с ДНК-сканированием. Постоянный мониторинг.`
      }
    ],
    dangerer: [
      { 
        id: 'RQ-666', 
        name: 'Пожиратель Теней', 
        status: 'CLASSIFIED', 
        classification: 'DANGERER',
        description: 'СУЩЕСТВО ПОГЛОЩАЕТ СВЕТ И МАТЕРИЮ',
        fullDescription: `КЛАССИФИКАЦИЯ: DANGERER

ОПИСАНИЕ: [ДАННЫЕ ЗАСЕКРЕЧЕНЫ] Теневая сущность, поглощающая свет и органическую материю.

ОПАСНОСТЬ: КРАЙНЕ ВЫСОКАЯ. Может поглощать живых существ и увеличивать свою массу.

ПРОТОКОЛ СДЕРЖИВАНИЯ: МАКСИМАЛЬНО УКРЕПЛЁННАЯ КАМЕРА. Абсолютное запрещение на открытие камеры.`
      },
      { 
        id: 'RQ-999', 
        name: 'Безымянный Ужас', 
        status: 'ESCAPED', 
        classification: 'DANGERER',
        description: 'ПОБЕГ 72 ЧАСА НАЗАД. МЕСТОПОЛОЖЕНИЕ НЕИЗВЕСТНО',
        fullDescription: `КЛАССИФИКАЦИЯ: DANGERER

СОСТОЯНИЕ: ПОБЕГ - 72 ЧАСА НАЗАД

ОПИСАНИЕ: [ЧАСТО УДАЛЕНО] Неописуемое существо, вызывающее панику и массовые галлюцинации.

ОПАСНОСТЬ: КРИТИЧЕСКАЯ. Способно к массовому поражению психики.

ПОСЛЕДНИЕ НАБЛЮДЕНИЕ: Окраины города, район заброшенного завода.

ПРОТОКОЛ: НЕМЕДЛЕННОЕ ОПОВЕЩЕНИЕ МЕСТНЫХ ВЛАСТЕЙ ПРИ ЛЮБЫХ ПРИЗНАКАХ ПОЯВЛЕНИЯ.`
      }
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
    },
    {
      id: 'RQ-209b',
      name: 'Детёныш Лисы-броненосца (Самка)',
      status: 'JUVENILE',
      description: 'Потомок RQ-209. Возраст 3 месяца. Проявляет уникальные способности',
      fullDescription: `КЛАССИФИКАЦИЯ: БЕЗОПАСНЫЙ (наблюдение)

БИОЛОГИЧЕСКИЕ ДАННЫЕ:
• Возраст: 3 месяца
• Мать: RQ-209 "Лиса-броненосец" (списана)
• Отец: Неизвестен
• Пол: Самка

ВНЕШНИЙ ВИД: 
• Длина тела: 35 см (растёт быстро)
• Броня: Мягкая, светло-серая, укрепляется
• Морда: Лисья, с большими любопытными глазами
• Хвост: Пушистый с бронированными пластинами

СПОСОБНОСТИ:
• Частичное затвердевание брони при опасности
• Невероятная скорость обучения
• Способность чувствовать эмоции людей
• Издаёт успокаивающие звуки при стрессе

ПОВЕДЕНИЕ: Крайне игрива и дружелюбна. Тоскует по матери. Привязана к д-ру Петрову, который заботится о детёнышах. Часто спит свернувшись калачиком с братом.

ПРОТОКОЛ СОДЕРЖАНИЯ: Содержится в специальной детской камере с братом RQ-209c. Круглосуточный уход. Диета: смесь мяса и специальных минералов для укрепления брони.

ПРИМЕЧАНИЕ: Не демонстрирует агрессии матери. Возможно, обучение и социализация предотвратят трагический сценарий.`
    },
    {
      id: 'RQ-209c',
      name: 'Детёныш Лисы-броненосца (Самец)',
      status: 'JUVENILE',
      description: 'Потомок RQ-209. Возраст 3 месяца. Более агрессивен чем сестра',
      fullDescription: `КЛАССИФИКАЦИЯ: БЕЗОПАСНЫЙ (усиленное наблюдение)

БИОЛОГИЧЕСКИЕ ДАННЫЕ:
• Возраст: 3 месяца
• Мать: RQ-209 "Лиса-броненосец" (списана)
• Отец: Неизвестен
• Пол: Самец

ВНЕШНИЙ ВИД:
• Длина тела: 38 см (крупнее сестры)
• Броня: Тёмно-серая, более твёрдая
• Морда: Лисья, более хищные черты
• Хвост: Пушистый с острыми шипами на пластинах

СПОСОБНОСТИ:
• Полное затвердевание брони (зафиксировано дважды)
• Укус сильнее, чем у сестры
• Повышенная реакция на угрозы
• Может издавать предупреждающее рычание

ПОВЕДЕНИЕ: Защищает сестру. Более осторожен с людьми, но доверяет д-ру Петрову. Проявляет признаки материнской агрессии при разделении с сестрой. Часто обнюхивает клетку, где содержалась мать.

ПРОТОКОЛ СОДЕРЖАНИЯ: Содержится в специальной детской камере с сестрой RQ-209b. Усиленное наблюдение за агрессией. Диета: больше мяса, дополнительные минералы.

⚠️ ПРЕДУПРЕЖДЕНИЕ: При проявлении агрессии, подобной матери, рассмотреть изоляцию от сестры.

ПРИМЕЧАНИЕ: Д-р Петров считает, что детёныш просто защищает сестру и не опасен. Рекомендуется продолжить социализацию.`
    }
  ];

  const deceasedRQ = [
    {
      id: 'RQ-012',
      name: 'Плазменный Элементаль',
      status: 'TERMINATED',
      cause: 'Самоуничтожение при попытке побега',
      date: '15.03.2023',
      method: 'Энергетическая перегрузка',
      description: 'Существо из чистой плазмы. Было стабильно до инцидента 2023.',
      fullDescription: `СТАТУС: СПИСАНО (TERMINATED)

ДАТА СПИСАНИЯ: 15 марта 2023, 14:47

ПРИЧИНА: Самоуничтожение при попытке побега из камеры сдерживания.

ОПИСАНИЕ: Плазменный Элементаль представлял собой сгусток энергии, способный изменять свою форму и температуру. Достигал температуры до 15000°C.

ИНЦИДЕНТ: RQ-012 предпринял попытку побега, вызвав энергетическую перегрузку сдерживающего поля. Перегрузка привела к критическому выбросу энергии и полному распаду структуры существа.

ПОТЕРИ: 2 охранника получили ожоги 2-й степени. Камера сдерживания выведена из строя на 6 месяцев.

ОСТАНКИ: Отсутствуют. Полный энергетический распад.`
    },
    {
      id: 'RQ-034',
      name: 'Костяной Паразит',
      status: 'ELIMINATED',
      cause: 'Устранён специальной группой',
      date: '02.07.2022',
      method: 'Термическое уничтожение',
      description: 'Паразитическое существо, питающееся костным мозгом.',
      fullDescription: `СТАТУС: УСТРАНЕНО (ELIMINATED)

ДАТА УСТРАНЕНИЯ: 02 июля 2022, 03:22

ПРИЧИНА: Активная угроза персоналу. Заражение 4 сотрудников.

ОПИСАНИЕ: Многоножкообразное существо длиной до 60 см. Способно проникать в человеческое тело и питаться костным мозгом изнутри.

МЕТОД УСТРАНЕНИЯ: Специальная группа реагирования применила криогенную заморозку с последующим термическим уничтожением при 2000°C.

ПОТЕРИ: 4 сотрудника заражены (2 погибли, 2 прошли успешное лечение).

ОСТАНКИ: Кремированы и захоронены в специальном контейнере на глубине 200м.`
    },
    {
      id: 'RQ-058',
      name: 'Призрачный Охотник',
      status: 'DECEASED',
      cause: 'Угасание энергии',
      date: '21.11.2021',
      method: 'Естественная смерть',
      description: 'Полупрозрачная сущность, охотящаяся на живых существ.',
      fullDescription: `СТАТУС: УМЕР (DECEASED)

ДАТА СМЕРТИ: 21 ноября 2021, 23:15

ПРИЧИНА: Естественное угасание энергии после 3 лет сдерживания.

ОПИСАНИЕ: Полупрозрачная теневая сущность, способная проходить сквозь стены. Охотилась на мелких животных, высасывая их жизненную энергию.

ОБСТОЯТЕЛЬСТВА: После 3 лет сдерживания энергия существа начала угасать. Несмотря на попытки подпитки энергией, RQ-058 полностью рассеялся.

ПОТЕРИ: Отсутствуют.

ОСТАНКИ: Не обнаружены. Полная энергетическая диссипация.`
    },
    {
      id: 'RQ-077',
      name: 'Биомасса "Голод"',
      status: 'TERMINATED',
      cause: 'Инцидент сдерживания',
      date: '08.09.2020',
      method: 'Кислотное растворение',
      description: 'Разумная биомасса, постоянно увеличивающаяся в размерах.',
      fullDescription: `СТАТУС: СПИСАНО (TERMINATED)

ДАТА СПИСАНИЯ: 08 сентября 2020, 19:33

ПРИЧИНА: Критическое нарушение протокола сдерживания. Разрастание до опасных размеров.

ОПИСАНИЕ: Живая биомасса, непрерывно растущая при наличии органической пищи. Достигла массы 2.7 тонны до терминации.

ИНЦИДЕНТ: RQ-077 прорвал первичное сдерживание и начал поглощать все органические материалы в секторе D. Было принято решение о немедленном уничтожении.

МЕТОД УСТРАНЕНИЯ: Весь сектор D был затоплен промышленной кислотой. Процесс растворения занял 14 часов.

ПОТЕРИ: 7 сотрудников сектора D не успели эвакуироваться.

ОСТАНКИ: Кислотный ил утилизирован как биоопасные отходы уровня 4.`
    },
    {
      id: 'RQ-103',
      name: 'Ментальный Паразит "Шёпот"',
      status: 'ELIMINATED',
      cause: 'Угроза психического заражения',
      date: '14.05.2019',
      method: 'Электромагнитный импульс',
      description: 'Нематериальная сущность, заражающая сознание людей.',
      fullDescription: `СТАТУС: УСТРАНЕНО (ELIMINATED)

ДАТА УСТРАНЕНИЯ: 14 мая 2019, 11:08

ПРИЧИНА: Массовое психическое заражение персонала. 23 заражённых.

ОПИСАНИЕ: Бесплотная психическая сущность, способная внедряться в сознание человека через слуховой канал. Заражённые слышали постоянный шёпот и теряли контроль над действиями.

ИНЦИДЕНТ: RQ-103 прорвал психозащиту и заразил 23 сотрудника за 48 часов. Заражённые пытались освободить других RQ-существ.

МЕТОД УСТРАНЕНИЯ: Использован экспериментальный электромагнитный импульс частоты 7.83 Гц (резонанс Шумана). Импульс нарушил энергетическую структуру сущности.

ПОТЕРИ: 23 заражённых проходят психиатрическое лечение. 5 из них с постоянными психическими нарушениями.

ОСТАНКИ: Сущность полностью дезинтегрирована.`
    },
    {
      id: 'RQ-142',
      name: 'Механический Рой',
      status: 'DEACTIVATED',
      cause: 'Системный сбой',
      date: '30.12.2018',
      method: 'ЭМИ деактивация',
      description: 'Самовоспроизводящиеся наномашины неизвестного происхождения.',
      fullDescription: `СТАТУС: ДЕАКТИВИРОВАНО (DEACTIVATED)

ДАТА ДЕАКТИВАЦИИ: 30 декабря 2018, 06:45

ПРИЧИНА: Неконтролируемое саморепликация. Угроза поглощения всей лаборатории.

ОПИСАНИЕ: Рой самовоспроизводящихся наномашин размером 0.1 мм. Способны поглощать любой металл для создания копий.

ИНЦИДЕНТ: RQ-142 вышел за пределы сдерживающей камеры и начал поглощать металлические конструкции здания. Популяция выросла в 10000 раз за 4 часа.

МЕТОД УСТРАНЕНИЯ: Мощный ЭМИ импульс вывел из строя все наномашины одновременно.

ПОТЕРИ: Повреждена вся электроника в секторе B. Восстановление заняло 3 месяца.

ОСТАНКИ: Собраны и хранятся в защищённом контейнере как неактивная масса.`
    },
    {
      id: 'RQ-209',
      name: 'Лиса-броненосец',
      status: 'ELIMINATED',
      cause: 'Защита новорождённых детёнышей',
      date: '23.08.2024',
      method: 'Огнестрельное оружие',
      description: 'Гибрид лисы и броненосца. Была беременна. Крайне агрессивна после родов.',
      fullDescription: `СТАТУС: УСТРАНЕНО (ELIMINATED)

ДАТА УСТРАНЕНИЯ: 23 августа 2024, 03:17

ПРИЧИНА: Смертельная угроза персоналу после родов двоих детёнышей.

ОПИСАНИЕ: Уникальный гибрид рыжей лисы и гигантского броненосца. Длина тела 1.8 метра. Вес около 90 кг. Обладала острыми когтями, мощными челюстями и сегментированной бронёй на спине и боках.

СПОСОБНОСТИ:
• Мгновенное затвердевание брони (выдерживала пули калибра 9мм)
• Скорость атаки до 60 км/ч
• Укус силой 380 кг/см²
• Территориальная агрессия в радиусе 50 метров

ИСТОРИЯ: RQ-209 была обнаружена беременной в секторе D-12 в мае 2024. Изначально вела себя спокойно, позволяла проводить исследования. 22 августа родила двоих детёнышей (RQ-209b и RQ-209c).

ИНЦИДЕНТ: Сразу после родов RQ-209 проявила крайнюю материнскую агрессию. Атаковала д-ра Соколова, который пытался осмотреть детёнышей. Нанесла смертельные ранения. Заблокировала выход из камеры. Охрана пыталась усмирить существо, но броня не пробивалась.

МЕТОД УСТРАНЕНИЯ: Агент Орлов использовал бронебойные патроны калибра .338 Lapua Magnum. Потребовалось 7 выстрелов в незащищённые участки (шея, живот).

ПОТЕРИ: 
• Д-р Соколов (смертельное ранение, скончался до прибытия медиков)
• 2 охранника (тяжёлые ранения, выжили)
• Камера содержания (полностью разрушена)

ОСТАНКИ: Тело кремировано. Броня сохранена для исследований. Показатели прочности: твёрдость 8 по шкале Мооса, эквивалент закалённой стали.

ДЕТЁНЫШИ: RQ-209b (самка) и RQ-209c (самец) были изъяты и переведены в детскую камеру. Под наблюдением д-ра Петрова. Пока не проявляют агрессии матери.

⚠️ ПРЕДУПРЕЖДЕНИЕ: Инцидент подчеркивает опасность работы с беременными RQ-существами. Обновлён протокол: немедленная изоляция при обнаружении беременности.

ПРИМЕЧАНИЕ ДИРЕКТОРА: "Соколов был хорошим учёным. Его смерть - напоминание, что мы работаем с непредсказуемыми созданиями. Детёныши остаются под наблюдением, но при малейшем признаке материнской агрессии будут устранены."`
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
              <div className="text-center space-y-1">
                <div className="font-bold">Тестовые данные:</div>
                <div className="space-y-0.5">
                  <div>Dr. Petrov / reqn2024 <span className="text-blue-400">(LVL 8)</span></div>
                  <div>Agent Smith / security01 <span className="text-red-400">(LVL 10)</span></div>
                  <div>Scientist Volkov / experiment47 <span className="text-gray-400">(LVL 4)</span></div>
                  <div>Analyst Sergeev / data_analysis <span className="text-blue-400">(LVL 5)</span></div>
                  <div>Unknown Entity / ERROR_404 <span className="text-purple-400">(LVL -1)</span></div>
                </div>
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
            {currentUser && (
              <div className="flex flex-col gap-1 items-center sm:items-end">
                <div className="text-xs opacity-70">Пользователь: <span className="text-vhs-crimson font-mono">{currentUser.name}</span></div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs font-mono ${
                    currentUser.level >= 10 ? 'border-red-500 text-red-400 animate-pulse' :
                    currentUser.level >= 7 ? 'border-yellow-500 text-yellow-400' :
                    currentUser.level >= 5 ? 'border-blue-500 text-blue-400' :
                    currentUser.level >= 1 ? 'border-green-500 text-green-400' :
                    'border-purple-500 text-purple-400 animate-pulse'
                  }`}>
                    {currentUser.level >= 0 ? `LVL ${currentUser.level}` : `АНОМАЛИЯ ${currentUser.level}`}
                  </Badge>
                  <Badge variant="outline" className="border-vhs-crimson text-vhs-crimson text-xs">
                    ONLINE
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        <Tabs value={activeTab} onValueChange={(value) => {
          if (value === 'deceased') {
            // Проверка уровня доступа перед открытием вкладки
            if (!currentUser || currentUser.level < 5) {
              setArchiveError('ОШИБКА: Недостаточный уровень допуска (требуется 5+)');
              setTimeout(() => setArchiveError(''), 3000);
              return;
            }
            // Если архив не разблокирован, открываем диалог пароля
            if (!archiveUnlocked) {
              setArchiveDialogOpen(true);
              return;
            }
          }
          setActiveTab(value);
        }} className="w-full">
          <TabsList className={`grid ${secretTabVisible ? 'grid-cols-3 lg:grid-cols-8' : 'grid-cols-3 lg:grid-cols-7'} w-full mb-4 sm:mb-6 bg-vhs-black border border-vhs-crimson`}>
            <TabsTrigger value="cameras" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">КАМЕРЫ</TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">ИНЦИДЕНТЫ</TabsTrigger>
            <TabsTrigger value="specimens" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">ЭКСПЕРИМЕНТЫ</TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-vhs-crimson data-[state=active]:text-vhs-white text-xs sm:text-sm p-1 sm:p-2">АРХИВ</TabsTrigger>
            <TabsTrigger 
              value="deceased"
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-vhs-white text-yellow-400 text-xs sm:text-sm p-1 sm:p-2"
            >
              <Icon name="Skull" size={14} className="inline mr-1" />
              СПИСАННЫЕ
            </TabsTrigger>
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
              
              {/* Quick access buttons for unlocked secrets - show only if unlocked */}
              {(unlockedSecrets.incident1999 || unlockedSecrets.labMap || unlockedSecrets.camera767) && (
                <Card className="bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border-purple-500">
                  <CardHeader>
                    <h3 className="text-lg font-mono flex items-center gap-2 text-purple-400">
                      <Icon name="Unlock" size={18} className="text-purple-500" />
                      🔓 РАЗБЛОКИРОВАННЫЕ СЕКРЕТЫ
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {unlockedSecrets.incident1999 && (
                        <Button
                          size="sm"
                          onClick={() => setIncidentDocOpen(true)}
                          className="bg-red-600/20 border border-red-500 text-red-300 hover:bg-red-600/30"
                        >
                          <Icon name="FileText" size={14} className="mr-1" />
                          Документ 1999
                        </Button>
                      )}
                      {unlockedSecrets.labMap && (
                        <Button
                          size="sm"
                          onClick={() => setLabMapOpen(true)}
                          className="bg-blue-600/20 border border-blue-500 text-blue-300 hover:bg-blue-600/30"
                        >
                          <Icon name="Map" size={14} className="mr-1" />
                          Карта лабораторий
                        </Button>
                      )}
                      {unlockedSecrets.camera767 && (
                        <Button
                          size="sm"
                          onClick={() => setCamera767Open(true)}
                          className="bg-red-600/20 border border-red-500 text-red-300 hover:bg-red-600/30"
                        >
                          <Icon name="Camera" size={14} className="mr-1" />
                          Камера 767
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
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
                          onClick={() => openRQDetails(being)}
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
                          onClick={() => openRQDetails(being)}
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
                          onClick={() => openRQDetails(being)}
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

          {/* Deceased RQ Tab - Requires Level 5+ and Password */}
          <TabsContent value="deceased">
            {archiveUnlocked ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-mono text-yellow-400 mb-2 flex items-center justify-center gap-2">
                    <Icon name="Skull" size={28} className="text-yellow-500" />
                    АРХИВ СПИСАННЫХ RQ
                    <Icon name="Skull" size={28} className="text-yellow-500" />
                  </h2>
                  <p className="text-sm opacity-70 text-yellow-300">УРОВЕНЬ ДОСТУПА: {currentUser.level} | СТАТУС: РАЗРЕШЁН</p>
                  <div className="border-t border-yellow-500 mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deceasedRQ.map((rq) => (
                    <Card key={rq.id} className="bg-vhs-black border-yellow-600 hover:border-yellow-500 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-sm text-slate-50">{rq.id}</h4>
                          <Badge className={
                            rq.status === 'TERMINATED' ? 'bg-red-700 text-white' :
                            rq.status === 'ELIMINATED' ? 'bg-red-800 text-white' :
                            rq.status === 'DECEASED' ? 'bg-gray-600 text-white' :
                            'bg-gray-700 text-white'
                          }>
                            {rq.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-yellow-200">{rq.name}</p>
                        <p className="text-xs text-gray-300">{rq.description}</p>
                        <div className="text-xs opacity-70 mt-2 space-y-1">
                          <div><span className="text-yellow-400">Причина:</span> {rq.cause}</div>
                          <div><span className="text-yellow-400">Дата:</span> {rq.date}</div>
                          <div><span className="text-yellow-400">Метод:</span> {rq.method}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => {
                            setSelectedRQ(rq);
                            setRqDialogOpen(true);
                          }}
                          size="sm" 
                          className="w-full bg-yellow-700 hover:bg-yellow-600 text-white text-xs"
                        >
                          <Icon name="FileText" size={14} className="mr-1" />
                          ПОЛНЫЙ ОТЧЁТ
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-yellow-950/30 to-red-950/30 border-yellow-600">
                  <CardHeader>
                    <h3 className="flex items-center gap-2 text-yellow-400">
                      <Icon name="AlertTriangle" size={20} />
                      ПРЕДУПРЕЖДЕНИЕ
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-300">
                      Данная информация является строго конфиденциальной. Доступ разрешён только персоналу с уровнем 5 и выше. 
                      Все перечисленные RQ-существа были списаны в результате инцидентов или по соображениям безопасности.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center text-yellow-400 mt-10">
                <Icon name="Lock" size={64} className="mx-auto mb-4 text-yellow-500" />
                <p className="text-xl font-mono">ДОСТУП ЗАПРЕЩЁН</p>
                <p className="text-sm opacity-70 mt-2">Требуется уровень 5+ и ввод пароля доступа</p>
                {archiveError && (
                  <p className="text-red-500 text-sm mt-4 animate-pulse">{archiveError}</p>
                )}
              </div>
            )}
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
            
            {selectedRQ?.id === 'RQ-000' && (
              <div className="text-center space-y-2">
                <div className="text-red-400 animate-pulse text-lg font-bold">
                  ⚠ КОНФИДЕНЦИАЛЬНАЯ ИНФОРМАЦИЯ ⚠
                </div>
                <div className="text-red-300 text-sm">
                  Автоматическое закрытие через 3 секунды...
                </div>
              </div>
            )}
            {selectedRQ?.id === 'RQ00-1' && (
              <div className="text-center space-y-2">
                <div className="text-blue-400 animate-pulse text-lg font-bold">
                  🔒 СОКРОВИЩЕ - МАКСИМАЛЬНАЯ ЗАЩИТА 🔒
                </div>
                <div className="text-blue-300 text-sm">
                  Полный доступ к данным. Надежда человечества.
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Archive Password Dialog */}
      <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <DialogContent className="bg-vhs-black border-yellow-500 max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 font-mono text-center flex items-center justify-center gap-2">
              <Icon name="Lock" size={20} />
              🔐 ДОСТУП К АРХИВУ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-yellow-300 text-sm space-y-2">
              <p>Требуется личный пароль доступа к архиву</p>
              <p className="text-xs opacity-70">Пользователь: {currentUser?.name}</p>
              <p className="text-xs opacity-70">Уровень доступа: {currentUser?.level}</p>
            </div>
            {archiveError && (
              <div className="text-red-400 text-xs text-center animate-pulse font-mono">
                {archiveError}
              </div>
            )}
            <Input
              type="password"
              value={archivePassword}
              onChange={(e) => setArchivePassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleArchivePasswordSubmit();
                }
              }}
              placeholder="ВВЕДИТЕ ПАРОЛЬ АРХИВА..."
              className="bg-yellow-950/30 border-yellow-600 text-yellow-200 font-mono text-center"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setArchiveDialogOpen(false);
                  setArchivePassword('');
                  setArchiveError('');
                }}
                variant="outline"
                className="flex-1 border-yellow-600 text-yellow-300 hover:bg-yellow-900/30"
              >
                ОТМЕНА
              </Button>
              <Button
                onClick={handleArchivePasswordSubmit}
                className="flex-1 bg-yellow-600 text-vhs-black hover:bg-yellow-700"
                disabled={!archivePassword.trim()}
              >
                <Icon name="Unlock" size={16} className="mr-1" />
                ОТКРЫТЬ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Incident 1999 Document Dialog */}
      <Dialog open={incidentDocOpen} onOpenChange={setIncidentDocOpen}>
        <DialogContent className="bg-black border-red-600 text-red-200 max-w-4xl font-mono">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-400 flex items-center gap-3">
              <Icon name="FileX" size={24} className="text-red-500" />
              🔥 СЕКРЕТНЫЙ ДОКУМЕНТ - ИНЦИДЕНТ 1999 🔥
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <img 
                src="/img/9d472cb8-6842-456d-abbb-736f8955e67f.jpg" 
                alt="Засекреченный документ об инциденте 1999 года"
                className="w-full max-w-2xl mx-auto border-2 border-red-600 shadow-lg shadow-red-900/50"
              />
            </div>
            <div className="bg-red-950/30 border border-red-600 p-4 text-sm space-y-2">
              <div className="text-red-400 font-bold">ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ:</div>
              <div>📅 ДАТА: 15 октября 1999 года, 03:47</div>
              <div>📍 ЛОКАЦИЯ: Подземный комплекс Б-7, уровень -12</div>
              <div>☠️ ЖЕРТВЫ: 47 сотрудников, 12 охранников</div>
              <div>🔥 СТАТУС: Локация запечатана бетоном</div>
              <div className="text-red-300 pt-2">
                ⚠️ ПРИМЕЧАНИЕ: Объект RQ-███ прорвал сдерживание. 
                Весь персонал 12-го уровня был потерян. 
                Аварийные протоколы сработали через 17 минут после нарушения.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lab Map Dialog */}
      <Dialog open={labMapOpen} onOpenChange={setLabMapOpen}>
        <DialogContent className="bg-black border-blue-600 text-blue-200 max-w-6xl font-mono">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400 flex items-center gap-3">
              <Icon name="Map" size={24} className="text-blue-500" />
              🗺️ КАРТА МИРОВЫХ ЛАБОРАТОРИЙ 🗺️
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-blue-300 text-sm mb-4">
              РАСПОЛОЖЕНИЕ ИССЛЕДОВАТЕЛЬСКИХ КОМПЛЕКСОВ КОРПОРАЦИИ
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* World Map Visual */}
              <div className="bg-blue-950/20 border border-blue-600 p-6 aspect-video flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="text-6xl">🌍</div>
                  <div className="text-blue-400 font-bold">ГЛОБАЛЬНАЯ СЕТЬ</div>
                  <div className="text-xs text-blue-300">47 АКТИВНЫХ ОБЪЕКТОВ</div>
                </div>
              </div>
              
              {/* Lab Locations List */}
              <div className="space-y-3 text-sm">
                <div className="bg-blue-950/30 border border-blue-600 p-3">
                  <div className="text-blue-400 font-bold">🇷🇺 РОССИЯ</div>
                  <div>• Сибирь-1 (АКТИВЕН) - Координаты: [ЗАСЕКРЕЧЕНО]</div>
                  <div>• Урал-База (АКТИВЕН) - RQ-объекты: 23</div>
                  <div>• Арктика-7 (ЗАМОРОЖЕН) - Статус: Консервация</div>
                </div>
                
                <div className="bg-blue-950/30 border border-blue-600 p-3">
                  <div className="text-blue-400 font-bold">🇺🇸 США</div>
                  <div>• Невада-51 (АКТИВЕН) - Уровень: МАКСИМУМ</div>
                  <div>• Аляска-Альфа (АКТИВЕН) - RQ-объекты: 31</div>
                  <div>• Подземка-TX (ПОТЕРЯН) - Последний сигнал: 2019</div>
                </div>
                
                <div className="bg-blue-950/30 border border-blue-600 p-3">
                  <div className="text-blue-400 font-bold">🌍 ДРУГИЕ</div>
                  <div>• Антарктида-Омега (АКТИВЕН) - Глубина: 3.2км</div>
                  <div>• Марианская-Б (АКТИВЕН) - Подводный комплекс</div>
                  <div>• Сахара-Дельта (РАЗРУШЕН) - Дата потери: 2001</div>
                </div>
                
                <div className="text-center text-blue-500 text-xs pt-3 border-t border-blue-600">
                  ⚠️ КООРДИНАТЫ ЗАСЕКРЕЧЕНЫ • ДОСТУП ТОЛЬКО ДЛЯ РУКОВОДСТВА
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera 767 Dialog */}
      <Dialog open={camera767Open} onOpenChange={setCamera767Open}>
        <DialogContent className="bg-black border-red-600 text-red-200 max-w-4xl font-mono">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-400 flex items-center gap-3 animate-pulse">
              <Icon name="Camera" size={24} className="text-red-500" />
              📹 КАМЕРА 767 - ПОДЗЕМНЫЙ УРОВЕНЬ 📹
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Camera Feed Simulation */}
            <div className="bg-red-950/20 border border-red-600 aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/20 to-red-950/40"></div>
              
              {/* Static/Noise Overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-red-900/10 animate-pulse"></div>
              </div>
              
              {/* Camera UI */}
              <div className="absolute top-4 left-4 text-xs text-red-400">
                <div>CAM-767 • ПОДЗЕМНЫЙ УРОВЕНЬ -15</div>
                <div>🔴 LIVE • {currentTime.toLocaleTimeString()}</div>
              </div>
              
              {/* Horror Scene */}
              <div className="flex items-center justify-center h-full text-center space-y-4">
                <div className="space-y-6">
                  <div className="text-6xl animate-bounce">👁️</div>
                  <div className="text-red-400 font-bold text-lg animate-pulse">
                    НЕЧТО В ТЕМНОТЕ
                  </div>
                  <div className="text-red-300 text-sm">
                    Движение зарегистрировано в секторе C-12
                  </div>
                </div>
              </div>
              
              {/* Timestamp */}
              <div className="absolute bottom-4 right-4 text-xs text-red-400">
                ГЛУБИНА: 847 МЕТРОВ
              </div>
            </div>
            
            {/* Audio Controls and Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-red-950/30 border border-red-600 p-4">
                <div className="text-red-400 font-bold mb-2">🔊 АУДИО ПОТОК</div>
                <div className="space-y-2 text-sm">
                  <div className="text-red-300 animate-pulse">
                    👂 Слышны нечеловеческие крики...
                  </div>
                  <div className="text-red-300 animate-pulse">
                    🎵 Низкочастотное рычание - 18.5 Гц
                  </div>
                  <div className="text-red-300 animate-pulse">
                    💀 Скрежет когтей по металлу
                  </div>
                  <div className="text-red-500 font-bold animate-bounce">
                    ⚠️ НЕЧТО ПРИБЛИЖАЕТСЯ К КАМЕРЕ
                  </div>
                </div>
              </div>
              
              <div className="bg-red-950/30 border border-red-600 p-4">
                <div className="text-red-400 font-bold mb-2">📋 ЖУРНАЛ СОБЫТИЙ</div>
                <div className="space-y-1 text-xs">
                  <div>23:47 - Движение в секторе C-12</div>
                  <div>23:51 - Температура упала до -5°C</div>
                  <div>23:54 - Обнаружены царапины на стенах</div>
                  <div className="text-red-400">23:58 - ГРОМКИЙ ВОЙ</div>
                  <div className="text-red-500 font-bold">00:01 - СВЯЗЬ ПОТЕРЯНА</div>
                  <div className="text-red-600 font-bold animate-pulse">00:03 - КАМЕРА ПОВРЕЖДЕНА</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-red-500 text-sm font-bold animate-pulse border-t border-red-600 pt-3">
              ⚠️ ВНИМАНИЕ: ОБЪЕКТ НА СВОБОДЕ • НЕ ПРИБЛИЖАЙТЕСЬ К УРОВНЮ -15 ⚠️
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
              RQ-000 РОЗИМ INFORMATION IS CLASSIFIED
            </div>
            <div className="text-xs text-red-100 opacity-50 px-4">
              Система будет восстановлена через 5 секунд...
            </div>
          </div>
        </div>
      )}

      {/* Warning Image Dialog */}
      {showWarningImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[110] animate-pulse">
          <div className="text-center space-y-6 font-mono p-4 md:p-8 max-w-4xl w-full">
            <div className="text-vhs-red text-2xl md:text-3xl font-bold animate-pulse mb-6">
              ⚠️ ПРЕДУПРЕЖДЕНИЕ ⚠️
            </div>
            <div className="border-4 border-vhs-red">
              <img 
                src="/img/746ebcfa-8f45-474d-a540-526b1a9ef858.jpg" 
                alt="Warning" 
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-3 text-vhs-red">
              <p className="text-xl md:text-2xl font-bold">ПРЕКРАТИТЕ ПОПЫТКИ ДОСТУПА</p>
              <p className="text-lg md:text-xl">ВОТ ЧТО ПРОИСХОДИТ СО СЛИШКОМ ЛЮБОПЫТНЫМИ</p>
              <p className="text-base md:text-lg animate-pulse">ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ</p>
              <p className="text-sm opacity-70">Попытка #{rozimReadAttempts}</p>
            </div>
            <Button 
              onClick={() => setShowWarningImage(false)}
              className="mt-6 bg-vhs-red text-vhs-white hover:bg-red-700 text-lg md:text-xl font-bold px-6 md:px-8 py-3 md:py-4"
            >
              Я ПОНЯЛ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;