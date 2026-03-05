import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, Instagram, Linkedin, Twitter, Phone, Menu, X, Zap, Circle } from 'lucide-react';

const Navbar = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <nav className="flex justify-end items-center px-6 py-4 fixed top-0 left-0 right-0 z-40 pointer-events-none">
    <button 
      onClick={onMenuOpen}
      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 group cursor-pointer pointer-events-auto hover:bg-gray-50 transition-colors"
    >
      <Menu size={20} strokeWidth={1.5} className="text-brand-black" />
    </button>
  </nav>
);

const FullMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const clubs = [
    {
      name: "Фитнес Мастер Первомайский",
      phone: "+7 (8152) 53-97-25",
      address: "пр. Кольский 178, 4 этаж"
    },
    {
      name: "Фитнес Мастер Ленинский",
      phone: "+7 (8152) 41-25-88",
      address: "ул. Хлобыстова 41А, 2 этаж"
    },
    {
      name: "Леди Фитнес",
      phone: "+7 (8152) 45-78-57",
      address: "ул. Воровского 15A, 4 этаж"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 bg-brand-white flex flex-col"
        >
          <div className="flex justify-end items-center px-6 py-4">
            <button 
              onClick={onClose} 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 hover:bg-gray-50 transition-colors"
            >
              <X size={20} strokeWidth={1.5} className="text-brand-black" />
            </button>
          </div>
          
          <div className="flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
              {clubs.map((club, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl md:text-2xl font-black tracking-tighter leading-none">{club.name}</h3>
                  <div className="space-y-1">
                    <a href={`tel:${club.phone.replace(/\D/g, '')}`} className="block text-xl font-medium hover:underline underline-offset-4">{club.phone}</a>
                    <p className="text-sm text-black/60">{club.address}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-24 flex flex-col items-start text-xs font-bold uppercase tracking-widest"
            >
              <div className="flex flex-col gap-4">
                <a href="#" onClick={onClose} className="hover:underline underline-offset-8">Вакансии</a>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-8">Группа ВК</a>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-black/40 mt-4">Сеть спортивных клубов в Мурманске <span className="italic">с 1991</span></div>
            </motion.div>
          </div>
          
          <div className="px-6 py-12">
            {/* Empty footer space since text moved up */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const slides = [
  {
    title: <>Элитный <br /> Фитнес.</>,
    description: <>Силовые тренировки и кондиционирование <br /> для трансформации тела и разума.</>,
    bgColor: '#F8C8DC'
  },
  {
    title: <>Пиковая <br /> Мощь.</>,
    description: <>Раскройте свой потенциал с нашими <br /> продвинутыми программами тренировок.</>,
    bgColor: '#E2E8F0'
  },
  {
    title: <>Полная <br /> Гармония.</>,
    description: <>Найдите баланс и мобильность на занятиях <br /> йогой и восстановительных сессиях.</>,
    bgColor: '#D1FAE5'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const SLIDE_DURATION = 5000;

  React.useEffect(() => {
    let startTime = Date.now();
    let animationFrame: number;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / SLIDE_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(0);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setProgress(newProgress);
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [currentSlide]);

  return (
    <section 
      className="px-6 pt-32 pb-20 md:p-0 md:aspect-video relative min-h-[80vh] md:min-h-0 flex items-center overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: slides[currentSlide].bgColor }}
    >
      {/* Progress Indicators */}
      <div className="absolute top-4 left-6 right-6 flex gap-2 z-10 max-w-7xl mx-auto">
        {slides.map((_, index) => (
          <div key={index} className="h-1 flex-grow bg-black/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-black"
              initial={{ width: 0 }}
              animate={{ 
                width: index === currentSlide ? `${progress}%` : index < currentSlide ? '100%' : '0%' 
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter mb-8">
              {slides[currentSlide].title}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <p className="text-lg md:text-xl font-medium max-w-md leading-tight">
                {slides[currentSlide].description}
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-brand-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors"
              >
                Записаться
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="marquee-container py-4 bg-white border-y border-black/5">
    <div className="marquee-content flex gap-12 text-sm font-bold uppercase tracking-widest">
      {[...Array(10)].map((_, i) => (
        <span key={i}>
          СПОРТИВНЫЙ КЛУБ В ТВОЕМ РАЙОНЕ✌️ #ФИТНЕСМАСТЕР #ПЕРВОМАЙСКИЙ #ЛЕНИНСКИЙ #ЛЕДИФИТНЕС #ОКТЯБРЬСКИЙ •
        </span>
      ))}
    </div>
  </div>
);

const FirstClub = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTrainerTab, setActiveTrainerTab] = useState<'group' | 'gym'>('group');
  const [activeScheduleTab, setActiveScheduleTab] = useState<'group' | 'gym'>('group');

  const pricingData = [
    {
      period: "1 месяц",
      unlimited: "5400 ₽",
      day: "4500 ₽",
    },
    {
      period: "3 месяца",
      unlimited: "13000 ₽",
      day: "10800 ₽",
    },
    {
      period: "6 месяцев",
      unlimited: "24000 ₽",
      day: "20300 ₽",
    }
  ];

  const trainingPacks = [
    { count: "4 тренировки", price: "2400 ₽" },
    { count: "8 тренировок", price: "4100 ₽" }
  ];

  const trainers = [
    { name: "Арина Кузнецова", role: "Инструктор групповых программ", category: 'group', image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Софья Калинина", role: "Инструктор групповых программ", category: 'group', image: "https://images.unsplash.com/photo-1548690312-e3b507d17a4d?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Елена Шумилова", role: "Инструктор групповых программ", category: 'group', image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Клавдия Прокофьева", role: "Инструктор групповых программ", category: 'group', image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Надежда Палиенко", role: "Инструктор групповых программ", category: 'group', image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Александр Бердников", role: "Персональный тренер", category: 'gym', image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Николай Марук", role: "Персональный тренер", category: 'gym', image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Александр Кублицкий", role: "Персональный тренер", category: 'gym', image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=500&auto=format&fit=crop&crop=faces" },
    { name: "Роза Соловьева", role: "Персональный тренер", category: 'gym', image: "https://images.unsplash.com/photo-1518611012118-29617b0ccdfe?q=80&w=500&auto=format&fit=crop&crop=faces" }
  ];

  const schedules = {
    group: [
      { title: "Зал 1 - ПН-СР-ПТ", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=800&auto=format&fit=crop" },
      { title: "Зал 1 - ВТ-ЧТ-СБ", image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop" },
      { title: "Зал 2 - Основное", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop" },
      { title: "Йога и Пилатес", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" }
    ],
    gym: [
      { title: "Кардио зона", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
      { title: "Свободные веса", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" },
      { title: "Функциональный тренинг", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop" },
      { title: "Зона растяжки", image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800&auto=format&fit=crop" }
    ]
  };

  const classDescriptions = [
    { title: "Super Sculpt", type: "active", description: "Короткая разминка и силовая работа над всеми группами мышц" },
    { title: "New Power", type: "active", description: "Глубокая проработка всех мышечных групп с использованием степ-платформы и различного оборудования" },
    { title: "Round Power", type: "active", description: "Непрерывное выполнение ряда упражнений на все тело с короткими периодами отдыха" },
    { title: "Stretching", type: "soft", description: "Комплекс упражнений на растяжку" },
    { title: "Здоровая спина", type: "soft", description: "Коррекция мышц спины и улучшение осанки" },
    { title: "Fitball", type: "soft", description: "Занятие c использованием большого гимнастического мяча" }
  ];

  const accordionItems = [
    {
      title: "О клубе",
      content: (
        <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Режим работы</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-black/5 pb-2">
                <span className="text-xs font-bold uppercase">ПН-ПТ</span>
                <span className="text-sm font-black tracking-tight">9:00-22:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/5 pb-2">
                <span className="text-xs font-bold uppercase">СБ-ВС</span>
                <span className="text-sm font-black tracking-tight">9:00-18:00</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Инфраструктура</div>
            <ul className="space-y-2">
              {["Два зала групповых программ", "Тренажерный зал", "Душевые", "Студия Кинезис", "Кабинет диагностики"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1 h-1 bg-black rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Стоимость карт",
      content: (
        <div className="pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingData.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-black/5 hover:border-black/20 transition-all">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4">{item.period}</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase mb-1">Безлимит</div>
                    <div className="text-2xl font-black tracking-tighter">{item.unlimited}</div>
                  </div>
                  <div className="pt-4 border-t border-black/5">
                    <div className="text-[10px] font-bold uppercase mb-1 text-black/60">Дневной <span className="lowercase font-medium">(9:00 - 16:00)</span></div>
                    <div className="text-lg font-bold tracking-tight">{item.day}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingPacks.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-black/5 flex justify-between items-center">
                <div className="text-xs font-bold uppercase tracking-widest">{item.count}</div>
                <div className="text-xl font-black tracking-tighter">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Расписание тренировок",
      content: (
        <div className="pb-8 space-y-8">
          <div className="flex gap-4 border-b border-black/5">
            <button 
              onClick={() => setActiveScheduleTab('group')}
              className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeScheduleTab === 'group' ? 'text-black' : 'text-black/40'}`}
            >
              Групповые программы
              {activeScheduleTab === 'group' && (
                <motion.div layoutId="activeScheduleTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button 
              onClick={() => setActiveScheduleTab('gym')}
              className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeScheduleTab === 'gym' ? 'text-black' : 'text-black/40'}`}
            >
              Тренажерный зал
              {activeScheduleTab === 'gym' && (
                <motion.div layoutId="activeScheduleTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>
          
          <div key={activeScheduleTab} className="overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory">
            {schedules[activeScheduleTab].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-shrink-0 w-72 snap-start group cursor-pointer"
              >
                <div className="aspect-[1.414/1] overflow-hidden rounded-2xl mb-3 bg-gray-100 border border-black/5">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.title}</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Описание классов</div>
            <div className="grid grid-cols-2 gap-4">
              {classDescriptions.map((cls, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-black/5">
                  <h5 className="text-xs font-bold uppercase mb-1 tracking-tight flex items-center gap-1.5">
                    {cls.type === 'active' ? (
                      <Zap size={12} className="text-brand-black fill-brand-black" />
                    ) : (
                      <Circle size={12} className="text-brand-black fill-brand-black" />
                    )}
                    {cls.title}
                  </h5>
                  <p className="text-[11px] text-black/60 leading-tight">{cls.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Тренеры",
      content: (
        <div className="pb-8 space-y-8">
          <div className="flex gap-4 border-b border-black/5">
            <button 
              onClick={() => setActiveTrainerTab('group')}
              className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTrainerTab === 'group' ? 'text-black' : 'text-black/40'}`}
            >
              Групповые программы
              {activeTrainerTab === 'group' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button 
              onClick={() => setActiveTrainerTab('gym')}
              className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTrainerTab === 'gym' ? 'text-black' : 'text-black/40'}`}
            >
              Тренажерный зал
              {activeTrainerTab === 'gym' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>
          
          <div key={activeTrainerTab} className="overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory">
            {trainers.filter(t => t.category === activeTrainerTab).map((trainer, i) => (
              <motion.div 
                key={trainer.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-shrink-0 w-36 snap-start group"
              >
                <div className="aspect-[9/16] overflow-hidden rounded-2xl mb-4 bg-gray-100">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-base font-bold uppercase tracking-tight leading-tight mb-1">{trainer.name}</h4>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">{trainer.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0L24.4903 15.5097L40 20L24.4903 24.4903L20 40L15.5097 24.4903L0 20L15.5097 15.5097L20 0Z" fill="currentColor"/>
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">Фитнес Мастер Первомайский</h3>
          <div className="space-y-1">
            <a href="tel:+78152539725" className="block text-xl font-medium hover:underline underline-offset-4">+7 (8152) 53-97-25</a>
            <p className="text-sm text-black/60 uppercase tracking-widest font-bold">пр. Кольский 178, 4 этаж</p>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl mb-12"
      >
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop" 
          alt="Фитнес Мастер Первомайский" 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-black/10">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-lg font-bold uppercase tracking-tight">{item.title}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus size={24} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProgramCard = ({ title, description, image, linkText }: { title: string, description: string, image: string, linkText: string }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
    <h3 className="text-xl font-bold mb-1">{title}</h3>
    <p className="text-sm text-black/60 mb-4">{description}</p>
    <a href="#" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all border-b border-black w-fit pb-1">
      {linkText} <ArrowRight size={12} />
    </a>
  </div>
);

const Programs = () => (
  <section className="px-6 py-24 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
      <div>
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-6">
          Наши <br /> Программы.
        </h2>
        <p className="text-lg max-w-sm font-medium leading-tight">
          Результаты наших тренировок говорят сами за себя.
        </p>
      </div>
      <button className="px-8 py-3 border border-brand-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors">
        Все программы
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <ProgramCard 
        title="Сила и Мощь"
        description="Освойте основы тяжелой атлетики и взрывных движений."
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        linkText="Подробнее"
      />
      <ProgramCard 
        title="Осознанный Поток"
        description="Баланс интенсивности, мобильности и ментальной ясности."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
        linkText="Исследовать"
      />
      <ProgramCard 
        title="Лаборатория Выносливости"
        description="Высокоинтенсивный метаболический тренинг для пиковых результатов."
        image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
        linkText="Присоединиться"
      />
    </div>
  </section>
);

interface AccordionItemProps {
  key?: React.Key;
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps) => (
  <div className="border-b border-white/20">
    <button 
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
    >
      <span className="text-lg font-medium tracking-tight">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Plus size={24} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-white/60 text-sm max-w-xl">
            {content}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Philosophy = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "Научный подход",
      content: "Каждая тренировка разработана с использованием последних исследований в области физиологии упражнений и биомеханики."
    },
    {
      title: "Сила сообщества",
      content: "Мы верим в силу коллектива. Наши участники поддерживают друг друга, создавая среду, в которой каждый процветает."
    },
    {
      title: "Целостный подход",
      content: "Фитнес — это не только зал. Мы даем рекомендации по питанию, восстановлению и ментальной устойчивости."
    },
    {
      title: "Ориентация на результат",
      content: "Мы тщательно отслеживаем прогресс: от состава тела до показателей производительности."
    },
    {
      title: "Доступность везде",
      content: "Получите доступ к коучингу мирового уровня из любой точки мира с нашей цифровой платформой."
    }
  ];

  return (
    <section className="bg-[#1a1a1a] text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {items.map((item, index) => (
            <AccordionItem 
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="px-6 py-12 border-t border-black/10 max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 items-start md:items-center">
      <div className="flex flex-col md:flex-row gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
        <a href="#" className="hover:text-black transition-colors">Политика конфиденциальности</a>
        <a href="#" className="hover:text-black transition-colors">Правила клуба</a>
      </div>
      <div className="hidden md:block"></div>
      <div className="flex gap-6 justify-start md:justify-end">
        <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="currentColor"/>
            <path d="M12.8732 16.5C7.45664 16.5 4.37042 12.7841 4.2402 7.5H6.94692C7.03676 11.375 8.74432 13.017 10.1024 13.3551V7.5H12.6455V10.8494C14.204 10.683 15.602 9.17159 16.1562 7.5H18.6994C18.2849 9.56534 16.7629 11.0767 15.6791 11.7074C16.7629 12.2102 18.5046 13.5142 19.2974 16.5H16.5034C15.881 14.5653 14.3468 13.0682 12.6455 12.8977V16.5H12.8732Z" fill="white"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

const FloatingPhoneButton = () => (
  <motion.a
    href="tel:+1234567890"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-brand-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-black/90 transition-colors"
    aria-label="Call us"
  >
    <Phone size={24} />
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute inset-0 rounded-full border-2 border-brand-black/20"
    />
  </motion.a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <FullMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <FirstClub />
        <Philosophy />
      </main>
      <Footer />
      <FloatingPhoneButton />
    </div>
  );
}
