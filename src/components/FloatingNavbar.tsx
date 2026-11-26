import React from 'react';
import { ARAAK_IDENTITY, SCENE_META, SceneId } from '../data/araakPortalData';

interface FloatingNavbarProps {
  activeScene: SceneId;
  isElevated: boolean;
  onSelectScene: (scene: SceneId) => void;
  onQuickRouting: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  activeScene,
  isElevated,
  onSelectScene,
  onQuickRouting,
}) => {
  return (
    <header
      dir="rtl"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl rounded-2xl transition-all duration-500 ${
        isElevated
          ? 'bg-[#07181D]/65 backdrop-blur-2xl border border-[#C99E4C]/25 shadow-[0_20px_50px_rgba(0,0,0,0.55)] py-2.5 px-5'
          : 'bg-[#06161A]/35 backdrop-blur-md border border-white/10 py-3.5 px-6'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onSelectScene('sovereign')}
          className="flex items-center gap-3 text-right shrink-0 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C99E4C]/50 bg-[#C99E4C]/15 text-xs font-bold text-[#F3D89B] group-hover:bg-[#C99E4C] group-hover:text-[#06161A] transition">
            أ
          </span>
          <div>
            <div className="text-sm sm:text-base font-bold text-white tracking-tight">
              {ARAAK_IDENTITY.groupName}
            </div>
            <div className="hidden sm:block text-[10px] text-[#C99E4C]">
              {ARAAK_IDENTITY.tagline}
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1.5">
          {SCENE_META.map((scene) => {
            const active = activeScene === scene.id;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSelectScene(scene.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#C99E4C] text-[#06161A] shadow-md'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {scene.shortTitle}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onQuickRouting}
          className="rounded-xl border border-[#C99E4C]/50 bg-[#C99E4C]/15 px-4 py-2 text-xs font-bold text-[#F3D89B] transition hover:bg-[#C99E4C] hover:text-[#06161A] shrink-0"
        >
          تحويل فوري
        </button>
      </div>

      <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pt-2.5 mt-2.5 border-t border-white/10">
        {SCENE_META.map((scene) => {
          const active = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelectScene(scene.id)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${
                active ? 'bg-[#C99E4C] text-[#06161A]' : 'bg-white/5 text-slate-200'
              }`}
            >
              {scene.shortTitle}
            </button>
          );
        })}
      </div>
    </header>
  );
};
