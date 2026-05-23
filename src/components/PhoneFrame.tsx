import { useEffect, useRef, useState } from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

// Соотношение iPhone 15 Pro: 393 × 852
const PHONE_W = 393;
const PHONE_H = 852;

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 768);

      // Телефон занимает 92vh по высоте, но не выходит за ширину
      const scaleH = (h * 0.92) / PHONE_H;
      const scaleW = (w * 0.42) / PHONE_W; // макс 42% ширины экрана для телефона
      setScale(Math.min(scaleH, scaleW, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile) return <>{children}</>;

  const phoneW = PHONE_W * scale;
  const phoneH = PHONE_H * scale;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #dce8dc 0%, #ccd8c8 40%, #bfcfbb 100%)",
      }}
    >
      {/* Фоновые блики */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #a8c5a0 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #8fb589 0%, transparent 65%)" }} />
      </div>

      {/* Контент: телефон + боковые надписи */}
      <div className="relative z-10 flex items-center" style={{ gap: 40 * scale }}>

        {/* Левый текст */}
        <div
          className="hidden lg:flex flex-col items-end gap-3"
          style={{ transform: `scale(${scale})`, transformOrigin: "right center" }}
        >
          <p className="text-stone-400 text-xs tracking-[0.2em] uppercase font-body">
            Фитнес-приложение
          </p>
          <h2 className="text-stone-700 text-5xl font-display font-light leading-tight italic text-right">
            Движение<br />— жизнь
          </h2>
          <div className="flex flex-col gap-1.5 items-end mt-3">
            {["Тренировки", "Прогресс", "Мотивация"].map((t) => (
              <span key={t} className="text-stone-400 text-xs tracking-widest uppercase font-body">{t}</span>
            ))}
          </div>
        </div>

        {/* Телефон */}
        <div
          ref={wrapRef}
          className="relative flex-shrink-0"
          style={{ width: phoneW, height: phoneH }}
        >
          {/* Тень */}
          <div className="absolute inset-0 rounded-[54px]" style={{
            boxShadow: `0 ${60 * scale}px ${120 * scale}px rgba(0,0,0,0.4), 0 ${20 * scale}px ${40 * scale}px rgba(0,0,0,0.2)`,
            transform: "translateY(2%) scale(0.97)",
          }} />

          {/* Корпус */}
          <div className="absolute inset-0" style={{
            borderRadius: 54 * scale,
            background: "linear-gradient(160deg, #2c2c2c 0%, #1a1a1a 50%, #0f0f0f 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.09), 0 0 0 1px rgba(0,0,0,0.6)",
          }} />

          {/* Кнопки — левые */}
          {[
            { top: 0.165, h: 0.042 },
            { top: 0.226, h: 0.075 },
            { top: 0.315, h: 0.075 },
          ].map((b, i) => (
            <div key={i} className="absolute rounded-r-sm" style={{
              left: -3 * scale,
              top: phoneH * b.top,
              width: 4 * scale,
              height: phoneH * b.h,
              background: "#1e1e1e",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }} />
          ))}

          {/* Кнопка — правая */}
          <div className="absolute rounded-l-sm" style={{
            right: -3 * scale,
            top: phoneH * 0.226,
            width: 4 * scale,
            height: phoneH * 0.113,
            background: "#1e1e1e",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }} />

          {/* Экран */}
          <div className="absolute overflow-hidden" style={{
            inset: 10 * scale,
            borderRadius: 46 * scale,
            background: "#000",
          }}>
            {/* Dynamic Island */}
            <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{
              top: 12 * scale,
              width: 120 * scale,
              height: 34 * scale,
              background: "#000",
              borderRadius: 20 * scale,
            }} />

            {/* Блик стекла */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, transparent 45%)",
              borderRadius: 46 * scale,
            }} />

            {/* Контент — масштабируем внутри */}
            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 46 * scale }}>
              <div
                style={{
                  width: PHONE_W,
                  height: PHONE_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  overflowY: "auto",
                  overflowX: "hidden",
                  WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
                }}
              >
                {children}
              </div>
            </div>
          </div>

          {/* Внешний блик корпуса */}
          <div className="absolute pointer-events-none" style={{
            inset: 10 * scale,
            borderRadius: 46 * scale,
            background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 35%)",
          }} />
        </div>

        {/* Правые карточки */}
        <div
          className="hidden lg:flex flex-col gap-3"
          style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
        >
          {[
            { num: "4", label: "тренировки\nв неделю" },
            { num: "185", label: "минут\nактивности" },
            { num: "1 240", label: "калорий\nсожжено" },
          ].map((s) => (
            <div key={s.label} className="bg-white/35 backdrop-blur-sm rounded-2xl p-4 w-32 text-center border border-white/20">
              <p className="font-display text-stone-800 text-3xl font-light">{s.num}</p>
              <p className="font-body text-stone-500 text-xs leading-snug mt-1 whitespace-pre-line">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
