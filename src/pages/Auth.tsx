/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c79ec5d9-7f1d-4fc3-a1ee-1f3cb89b439a/files/dc122765-4b40-4141-9d95-0619335e6731.jpg";
const REGISTER_IMAGE = "https://cdn.poehali.dev/projects/c79ec5d9-7f1d-4fc3-a1ee-1f3cb89b439a/files/2b5368bc-77dc-4b74-8008-de35a2c4da37.jpg";

type Screen = "welcome" | "login" | "register";

interface AuthProps {
  onAuth: (user: { name: string; email: string }) => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div className="min-h-screen bg-background">
      {screen === "welcome" && <WelcomeScreen onLogin={() => setScreen("login")} onRegister={() => setScreen("register")} />}
      {screen === "login" && <LoginScreen onBack={() => setScreen("welcome")} onAuth={onAuth} onRegister={() => setScreen("register")} />}
      {screen === "register" && <RegisterScreen onBack={() => setScreen("welcome")} onAuth={onAuth} onLogin={() => setScreen("login")} />}
    </div>
  );
}

function WelcomeScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Фитнес"
          className="w-full h-full object-cover object-center animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

        <div className="absolute top-14 left-6">
          <span className="font-display text-3xl text-white italic tracking-wide">Движение</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <p className="opacity-0-start animate-fade-up delay-100 font-body text-white/60 text-xs tracking-widest uppercase mb-3">
            Твой личный фитнес
          </p>
          <h1 className="opacity-0-start animate-fade-up delay-200 font-display text-white text-5xl font-light leading-tight mb-4">
            Начни путь<br />к себе<br /><em>сегодня</em>
          </h1>
          <p className="opacity-0-start animate-fade-up delay-300 font-body text-white/70 text-sm mb-8 leading-relaxed">
            Тренировки, прогресс и мотивация — всё в одном месте
          </p>

          <div className="opacity-0-start animate-fade-up delay-400 flex flex-col gap-3">
            <button
              onClick={onRegister}
              className="w-full py-4 bg-white text-stone-800 rounded-2xl font-body font-semibold text-base transition-all active:scale-[0.98] shadow-lg"
            >
              Создать аккаунт
            </button>
            <button
              onClick={onLogin}
              className="w-full py-4 bg-white/15 backdrop-blur-sm text-white border border-white/25 rounded-2xl font-body font-semibold text-base transition-all active:scale-[0.98]"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onBack, onAuth, onRegister }: { onBack: () => void; onAuth: AuthProps["onAuth"]; onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    if (!email.includes("@")) {
      setError("Введите корректный email");
      return;
    }
    const name = email.split("@")[0];
    onAuth({ name, email });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background" />
        <button
          onClick={onBack}
          className="absolute top-12 left-5 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={16} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-6">
          <h2 className="font-display text-3xl text-white font-light italic">Добро пожаловать</h2>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-10">
        <p className="font-body text-sm text-muted-foreground mb-8">
          Войдите, чтобы продолжить тренировки
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-11 pr-4 py-4 bg-white border border-border rounded-2xl font-body text-sm text-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Пароль</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Icon name="Lock" size={16} className="text-muted-foreground" />
              </div>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-4 bg-white border border-border rounded-2xl font-body text-sm text-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Icon name={showPass ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
              <Icon name="AlertCircle" size={15} className="text-rose-500 flex-shrink-0" />
              <p className="font-body text-sm text-rose-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-2xl font-body font-semibold text-base mt-2 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
          >
            Войти
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="font-body text-sm text-muted-foreground">Нет аккаунта? </span>
          <button onClick={onRegister} className="font-body text-sm text-primary font-semibold">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onAuth, onLogin }: { onBack: () => void; onAuth: AuthProps["onAuth"]; onLogin: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const goals = [
    { id: "lose", label: "Похудеть", icon: "TrendingDown", desc: "Сжигание жира и калорий" },
    { id: "tone", label: "Подтянуться", icon: "Zap", desc: "Рельеф и тонус мышц" },
    { id: "endurance", label: "Выносливость", icon: "Wind", desc: "Кардио и дыхание" },
    { id: "relax", label: "Расслабиться", icon: "Leaf", desc: "Йога и растяжка" },
  ];

  const levels = [
    { id: "beginner", label: "Начинающий", icon: "Sprout", desc: "До 6 месяцев опыта" },
    { id: "middle", label: "Средний", icon: "Flame", desc: "6 месяцев — 2 года" },
    { id: "advanced", label: "Продвинутый", icon: "Trophy", desc: "Более 2 лет" },
  ];

  const handleStep1 = () => {
    setError("");
    if (!name.trim()) { setError("Введите ваше имя"); return; }
    if (!email.includes("@")) { setError("Введите корректный email"); return; }
    if (password.length < 6) { setError("Пароль — минимум 6 символов"); return; }
    setStep(2);
  };

  const handleStep2 = () => {
    setError("");
    if (!goal) { setError("Выберите вашу цель"); return; }
    setStep(3);
  };

  const handleFinish = () => {
    setError("");
    if (!level) { setError("Выберите уровень подготовки"); return; }
    onAuth({ name: name.trim(), email });
  };

  const stepBack = () => {
    setError("");
    if (step === 1) onBack();
    else if (step === 2) setStep(1);
    else setStep(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* Hero фото — только на шаге 1 */}
      {step === 1 && (
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img src={REGISTER_IMAGE} alt="" className="w-full h-full object-cover object-top animate-fade-in" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background" />
          <button
            onClick={stepBack}
            className="absolute top-12 left-5 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={16} className="text-white" />
          </button>
        </div>
      )}

      {/* Шаги 2 и 3 — компактный хедер */}
      {step !== 1 && (
        <div className="relative pt-14 pb-5 px-6 bg-gradient-to-b from-[hsl(142,28%,38%,0.08)] to-background flex-shrink-0">
          <button
            onClick={stepBack}
            className="absolute top-12 left-5 w-9 h-9 bg-white border border-border rounded-full flex items-center justify-center shadow-sm"
          >
            <Icon name="ArrowLeft" size={16} className="text-stone-600" />
          </button>
        </div>
      )}

      {/* Прогресс-бар */}
      <div className="px-6 flex-shrink-0" style={{ marginTop: step === 1 ? "-2px" : "0" }}>
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
          Шаг {step} из 3
        </p>
      </div>

      {/* Контент */}
      <div className="flex-1 px-6 pb-10 overflow-y-auto">

        {/* ШАГ 1 — данные */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-4xl text-foreground font-light leading-tight mb-1">
              Создай<br /><em className="text-primary">аккаунт</em>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Пара минут — и ты внутри</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Как тебя зовут?</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Имя"
                    className="w-full pl-11 pr-4 py-4 bg-white border border-border rounded-2xl font-body text-sm text-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-4 bg-white border border-border rounded-2xl font-body text-sm text-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Пароль</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Icon name="Lock" size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    className="w-full pl-11 pr-12 py-4 bg-white border border-border rounded-2xl font-body text-sm text-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              {error && <ErrorBanner text={error} />}

              <button
                onClick={handleStep1}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-body font-semibold text-base mt-1 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
              >
                Продолжить
              </button>

              <div className="text-center">
                <span className="font-body text-sm text-muted-foreground">Уже есть аккаунт? </span>
                <button onClick={onLogin} className="font-body text-sm text-primary font-semibold">
                  Войти
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ШАГ 2 — цель */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-4xl text-foreground font-light leading-tight mb-1">
              Какая<br />у тебя <em className="text-primary">цель?</em>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Подберём тренировки специально для тебя</p>

            <div className="flex flex-col gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.99] ${
                    goal === g.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    goal === g.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon name={g.icon as any} size={18} />
                  </div>
                  <div className="text-left">
                    <p className={`font-body font-semibold text-sm transition-all ${goal === g.id ? "text-primary" : "text-foreground"}`}>{g.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{g.desc}</p>
                  </div>
                  {goal === g.id && (
                    <div className="ml-auto">
                      <Icon name="CheckCircle2" size={18} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {error && <div className="mt-3"><ErrorBanner text={error} /></div>}

            <button
              onClick={handleStep2}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-body font-semibold text-base mt-5 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* ШАГ 3 — уровень */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-4xl text-foreground font-light leading-tight mb-1">
              Уровень<br /><em className="text-primary">подготовки</em>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Честно — мы подстроимся</p>

            <div className="flex flex-col gap-3">
              {levels.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.99] ${
                    level === l.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    level === l.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon name={l.icon as any} size={18} />
                  </div>
                  <div className="text-left">
                    <p className={`font-body font-semibold text-sm transition-all ${level === l.id ? "text-primary" : "text-foreground"}`}>{l.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{l.desc}</p>
                  </div>
                  {level === l.id && (
                    <div className="ml-auto">
                      <Icon name="CheckCircle2" size={18} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Мотивационная карточка */}
            <div className="mt-5 p-4 bg-primary/8 rounded-2xl border border-primary/15 flex gap-3 items-start">
              <Icon name="Sparkles" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="font-body text-xs text-primary/80 leading-relaxed">
                Привет, <strong>{name.trim().split(" ")[0]}</strong>! Программа будет составлена под тебя. Начнём с малого — и дойдём до результата.
              </p>
            </div>

            {error && <div className="mt-3"><ErrorBanner text={error} /></div>}

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-body font-semibold text-base mt-5 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
            >
              Начать тренироваться 🏃‍♀️
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function ErrorBanner({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
      <Icon name="AlertCircle" size={15} className="text-rose-500 flex-shrink-0" />
      <p className="font-body text-sm text-rose-600">{text}</p>
    </div>
  );
}