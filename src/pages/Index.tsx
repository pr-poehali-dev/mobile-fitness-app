/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c79ec5d9-7f1d-4fc3-a1ee-1f3cb89b439a/files/dc122765-4b40-4141-9d95-0619335e6731.jpg";

const WORKOUTS = [
  {
    id: 1,
    title: "Утренняя пробежка",
    category: "Кардио",
    level: "Начинающий",
    duration: "30 мин",
    calories: "280 ккал",
    description: "Лёгкая пробежка для бодрого начала дня. Чередование ходьбы и бега в комфортном темпе.",
    steps: [
      "5 мин — разминка, быстрая ходьба",
      "10 мин — лёгкий бег в разговорном темпе",
      "5 мин — ускорение, средний темп",
      "5 мин — возврат к лёгкому бегу",
      "5 мин — заминка, медленная ходьба",
    ],
    videoThumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    id: 2,
    title: "Йога для баланса",
    category: "Растяжка",
    level: "Средний",
    duration: "45 мин",
    calories: "180 ккал",
    description: "Плавная последовательность асан для развития гибкости, баланса и внутреннего спокойствия.",
    steps: [
      "Приветствие солнцу — 3 цикла",
      "Воин I и Воин II — по 5 дыханий каждая сторона",
      "Поза дерева — 30 секунд каждая сторона",
      "Кошка-Корова — 10 повторений",
      "Шавасана — 5 минут",
    ],
    videoThumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    id: 3,
    title: "Силовая тренировка",
    category: "Сила",
    level: "Продвинутый",
    duration: "60 мин",
    calories: "420 ккал",
    description: "Полноценная тренировка всего тела с акцентом на крупные группы мышц.",
    steps: [
      "Приседания — 4 × 12",
      "Отжимания — 3 × 15",
      "Планка — 3 × 45 сек",
      "Выпады — 3 × 10 каждая нога",
      "Скручивания — 3 × 20",
    ],
    videoThumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
  },
  {
    id: 4,
    title: "Медитативная ходьба",
    category: "Восстановление",
    level: "Начинающий",
    duration: "20 мин",
    calories: "90 ккал",
    description: "Осознанная прогулка для снижения стресса и восстановления после интенсивных тренировок.",
    steps: [
      "Выберите тихое место на природе",
      "Сделайте 5 глубоких вдохов перед началом",
      "Идите медленно, чувствуя каждый шаг",
      "Замечайте звуки и запахи вокруг",
      "Завершите несколькими минутами тишины",
    ],
    videoThumb: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
  },
];

const QUICK_LINKS = [
  { icon: "Dumbbell", label: "Тренировки", bg: "bg-emerald-100", text: "text-emerald-700" },
  { icon: "Apple", label: "Питание", bg: "bg-orange-100", text: "text-orange-700" },
  { icon: "BarChart2", label: "Прогресс", bg: "bg-violet-100", text: "text-violet-700" },
  { icon: "Calendar", label: "Расписание", bg: "bg-sky-100", text: "text-sky-700" },
];

const LEVEL_COLOR: Record<string, string> = {
  "Начинающий": "bg-emerald-100 text-emerald-700",
  "Средний": "bg-amber-100 text-amber-700",
  "Продвинутый": "bg-rose-100 text-rose-700",
};

type Workout = typeof WORKOUTS[0];

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "library">("home");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [filter, setFilter] = useState("Все");

  const categories = ["Все", "Кардио", "Растяжка", "Сила", "Восстановление"];
  const filtered = filter === "Все" ? WORKOUTS : WORKOUTS.filter(w => w.category === filter);

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="fixed top-0 left-0 right-0 z-50 px-5">
        <div className="flex items-center justify-between py-4">
          <span className="font-display text-2xl text-stone-700 tracking-wide italic">
            Движение
          </span>
          <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Icon name="User" size={16} className="text-stone-600" />
          </button>
        </div>
      </nav>

      <div className="pb-24">
        {activeTab === "home" && (
          <HomeTab onOpenLibrary={() => setActiveTab("library")} />
        )}
        {activeTab === "library" && !selectedWorkout && (
          <LibraryTab
            workouts={filtered}
            categories={categories}
            filter={filter}
            onFilter={setFilter}
            onSelect={setSelectedWorkout}
          />
        )}
        {activeTab === "library" && selectedWorkout && (
          <WorkoutDetail workout={selectedWorkout} onBack={() => setSelectedWorkout(null)} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border">
        <div className="flex">
          {[
            { id: "home", icon: "Home", label: "Главная" },
            { id: "library", icon: "BookOpen", label: "Тренировки" },
            { id: "progress", icon: "BarChart2", label: "Прогресс" },
            { id: "profile", icon: "Settings", label: "Профиль" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "home" || tab.id === "library") {
                  setActiveTab(tab.id as "home" | "library");
                  setSelectedWorkout(null);
                }
              }}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon name={tab.icon as any} size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeTab({ onOpenLibrary }: { onOpenLibrary: () => void }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";

  return (
    <div>
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Бег на природе"
          className="w-full h-full object-cover object-center animate-fade-in"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <p className="opacity-0-start animate-fade-up delay-100 font-body text-white/70 text-sm font-light tracking-widest uppercase mb-2">
            {greeting}
          </p>
          <h1 className="opacity-0-start animate-fade-up delay-200 font-display text-white text-5xl font-light leading-tight mb-3">
            Твой день<br />начинается<br /><em>здесь</em>
          </h1>
          <p className="opacity-0-start animate-fade-up delay-300 font-body text-white/80 text-sm font-light max-w-xs">
            Каждый шаг — это шаг к лучшей версии себя
          </p>
        </div>
      </div>

      <div className="px-5 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="opacity-0-start animate-fade-up delay-400 font-body text-xs text-muted-foreground uppercase tracking-widest font-medium mb-4">
            Быстрый доступ
          </p>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_LINKS.map((item, i) => (
              <button
                key={item.label}
                onClick={item.label === "Тренировки" ? onOpenLibrary : undefined}
                className={`opacity-0-start animate-fade-up flex flex-col items-center gap-2 p-2 rounded-xl transition-transform active:scale-95`}
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <Icon name={item.icon as any} size={20} className={item.text} />
                </div>
                <span className="font-body text-xs font-medium text-stone-700 text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <div className="opacity-0-start animate-fade-up delay-500">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">
            Тренировка дня
          </p>
          <div
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 card-hover cursor-pointer"
            onClick={onOpenLibrary}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="tag-badge bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                  Кардио
                </span>
                <h3 className="font-display text-2xl text-stone-800 mt-2 font-medium">
                  Утренняя пробежка
                </h3>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-sm">
                <Icon name="Play" size={20} className="text-white" />
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: "Clock", label: "30 мин" },
                { icon: "Flame", label: "280 ккал" },
                { icon: "TrendingUp", label: "Начинающий" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <Icon name={item.icon as any} size={14} className="text-muted-foreground" />
                  <span className="font-body text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 mb-4">
        <div className="opacity-0-start animate-fade-up delay-600">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">
            Эта неделя
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Тренировок", value: "4", icon: "Dumbbell" },
              { label: "Минут", value: "185", icon: "Clock" },
              { label: "Калорий", value: "1 240", icon: "Flame" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 text-center border border-border">
                <Icon name={stat.icon as any} size={18} className="text-primary mx-auto mb-2" />
                <div className="font-display text-2xl text-stone-800 font-medium">{stat.value}</div>
                <div className="font-body text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LibraryTab({
  workouts,
  categories,
  filter,
  onFilter,
  onSelect,
}: {
  workouts: Workout[];
  categories: string[];
  filter: string;
  onFilter: (c: string) => void;
  onSelect: (w: Workout) => void;
}) {
  return (
    <div className="pt-20 px-5">
      <div className="mb-6 animate-fade-up">
        <h2 className="font-display text-4xl text-stone-800 font-light mb-1">Библиотека</h2>
        <p className="font-body text-sm text-muted-foreground">{workouts.length} тренировок</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
              filter === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-stone-600 border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {workouts.map((workout, i) => (
          <div
            key={workout.id}
            className="opacity-0-start animate-slide-up bg-white rounded-2xl overflow-hidden border border-border card-hover cursor-pointer active:scale-[0.98] transition-transform"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => onSelect(workout)}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={workout.videoThumb}
                alt={workout.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="tag-badge bg-white/90 text-stone-700 px-2.5 py-1 rounded-full">
                  {workout.category}
                </span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Icon name="Play" size={16} className="text-primary" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-xl text-stone-800 font-medium">{workout.title}</h3>
                <span className={`tag-badge px-2 py-1 rounded-full ${LEVEL_COLOR[workout.level]}`}>
                  {workout.level}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
                {workout.description}
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <Icon name="Clock" size={13} className="text-muted-foreground" />
                  <span className="font-body text-xs text-muted-foreground">{workout.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Flame" size={13} className="text-muted-foreground" />
                  <span className="font-body text-xs text-muted-foreground">{workout.calories}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutDetail({ workout, onBack }: { workout: Workout; onBack: () => void }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="relative h-72 overflow-hidden">
        <img
          src={workout.videoThumb}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-16 left-5 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <Icon name="ArrowLeft" size={16} className="text-stone-700" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <span className="tag-badge bg-white/90 text-stone-700 px-2.5 py-1 rounded-full mb-2 inline-block">
            {workout.category}
          </span>
          <h1 className="font-display text-4xl text-white font-light">{workout.title}</h1>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="flex gap-3 mb-5">
          {[
            { icon: "Clock", value: workout.duration },
            { icon: "Flame", value: workout.calories },
            { icon: "BarChart2", value: workout.level },
          ].map((item) => (
            <div key={item.value} className="flex-1 bg-white rounded-xl p-3 border border-border flex flex-col items-center gap-1">
              <Icon name={item.icon as any} size={16} className="text-primary" />
              <span className="font-body text-xs text-stone-700 font-medium text-center leading-tight">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <h3 className="font-display text-xl text-stone-800 mb-2">О тренировке</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{workout.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-display text-xl text-stone-800 mb-3">Программа</h3>
          <div className="flex flex-col gap-2">
            {workout.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-border">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-body text-xs font-semibold text-primary">{i + 1}</span>
                </div>
                <p className="font-body text-sm text-stone-700 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStarted(!started)}
          className={`w-full py-4 rounded-2xl font-body font-semibold text-base transition-all active:scale-[0.98] mb-6 ${
            started
              ? "bg-stone-200 text-stone-700"
              : "bg-primary text-white shadow-md"
          }`}
        >
          {started ? "Завершить тренировку" : "Начать тренировку"}
        </button>
      </div>
    </div>
  );
}