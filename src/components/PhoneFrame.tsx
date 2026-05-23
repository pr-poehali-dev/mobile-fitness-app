import { useEffect, useState } from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #e8ede8 0%, #d4ddd0 40%, #c8d4c4 100%)",
      }}
    >
      {/* Фоновый декор */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #a8c5a0 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #8fb589 0%, transparent 70%)" }}
        />
      </div>

      {/* Телефон */}
      <div className="relative z-10 flex items-center gap-12">

        {/* Боковая подпись */}
        <div className="hidden xl:block text-right">
          <p
            className="text-stone-500 text-sm font-light tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            Фитнес-приложение
          </p>
          <h2
            className="text-stone-700 text-4xl font-light leading-tight italic"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Движение<br />— жизнь
          </h2>
          <div className="mt-6 flex flex-col gap-2 items-end">
            {["Тренировки", "Прогресс", "Мотивация"].map((item) => (
              <span
                key={item}
                className="text-stone-400 text-xs tracking-wider uppercase"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Корпус телефона */}
        <div
          className="relative"
          style={{ width: 390, height: 844 }}
        >
          {/* Тень */}
          <div
            className="absolute inset-0 rounded-[54px]"
            style={{
              boxShadow: "0 60px 120px rgba(0,0,0,0.35), 0 20px 40px rgba(0,0,0,0.2)",
              transform: "translateY(8px) scale(0.98)",
            }}
          />

          {/* Корпус */}
          <div
            className="absolute inset-0 rounded-[54px]"
            style={{
              background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)",
            }}
          />

          {/* Боковые кнопки — левая */}
          <div
            className="absolute rounded-r-sm"
            style={{
              left: -3,
              top: 140,
              width: 4,
              height: 36,
              background: "#222",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />
          <div
            className="absolute rounded-r-sm"
            style={{
              left: -3,
              top: 192,
              width: 4,
              height: 64,
              background: "#222",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />
          <div
            className="absolute rounded-r-sm"
            style={{
              left: -3,
              top: 268,
              width: 4,
              height: 64,
              background: "#222",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />

          {/* Боковая кнопка — правая */}
          <div
            className="absolute rounded-l-sm"
            style={{
              right: -3,
              top: 192,
              width: 4,
              height: 96,
              background: "#222",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />

          {/* Экран — внешняя рамка */}
          <div
            className="absolute overflow-hidden"
            style={{
              inset: 10,
              borderRadius: 46,
              background: "#000",
            }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute z-20 left-1/2 -translate-x-1/2"
              style={{
                top: 12,
                width: 120,
                height: 34,
                background: "#000",
                borderRadius: 20,
              }}
            />

            {/* Бликовое стекло */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
                borderRadius: 46,
              }}
            />

            {/* Контент приложения */}
            <div
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{
                borderRadius: 46,
                WebkitOverflowScrolling: "touch",
              }}
            >
              {children}
            </div>
          </div>

          {/* Внешнее стекло-блик */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 10,
              borderRadius: 46,
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Правая подпись */}
        <div className="hidden xl:block">
          <div className="flex flex-col gap-4">
            {[
              { num: "4", label: "тренировки\nв неделю" },
              { num: "185", label: "минут\nактивности" },
              { num: "1 240", label: "калорий\nсожжено" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 w-32 text-center">
                <p
                  className="text-stone-800 text-2xl font-light"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-stone-500 text-xs leading-tight mt-1 whitespace-pre-line"
                  style={{ fontFamily: "'Golos Text', sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
