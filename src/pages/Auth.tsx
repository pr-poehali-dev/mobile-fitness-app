/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c79ec5d9-7f1d-4fc3-a1ee-1f3cb89b439a/files/dc122765-4b40-4141-9d95-0619335e6731.jpg";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");

  const goals = [
    { id: "lose", label: "Похудеть", icon: "TrendingDown" },
    { id: "tone", label: "Подтянуться", icon: "Zap" },
    { id: "endurance", label: "Выносливость", icon: "Wind" },
    { id: "relax", label: "Расслабиться", icon: "Leaf" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Введите ваше имя"); return; }
    if (!email.includes("@")) { setError("Введите корректный email"); return; }
    if (password.length < 6) { setError("Пароль — минимум 6 символов"); return; }
    onAuth({ name: name.trim(), email });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background" />
        <button
          onClick={onBack}
          className="absolute top-12 left-5 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={16} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-6">
          <h2 className="font-display text-3xl text-white font-light italic">Создать аккаунт</h2>
        </div>
      </div>

      <div className="flex-1 px-6 pt-5 pb-10 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Имя</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Icon name="User" size={16} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Как вас зовут?"
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
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Icon name={showPass ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3 block">Ваша цель</label>
            <div className="grid grid-cols-2 gap-2">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border font-body text-sm font-medium transition-all ${
                    goal === g.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white text-stone-600"
                  }`}
                >
                  <Icon name={g.icon as any} size={16} />
                  {g.label}
                </button>
              ))}
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
            className="w-full py-4 bg-primary text-white rounded-2xl font-body font-semibold text-base mt-1 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
          >
            Начать тренироваться
          </button>
        </form>

        <div className="mt-5 text-center">
          <span className="font-body text-sm text-muted-foreground">Уже есть аккаунт? </span>
          <button onClick={onLogin} className="font-body text-sm text-primary font-semibold">
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}
