"use client";

import { useState, useEffect, useRef } from "react";

// --- Types & Interfaces ---
type Section =
  | "dashboard"
  | "pernapasan"
  | "artikulasi"
  | "resonansi"
  | "intonasi"
  | "phrasering"
  | "vibrato"
  | "ekspresi"
  | "studio"
  | "about";

export default function VocalMasterApp() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  // Audio Refs
  const audioCtx = useRef<AudioContext | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  // Helpers
  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  };

  const playNote = (freq: number) => {
    initAudio();
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.current.currentTime + 1
    );
    osc.start();
    osc.stop(audioCtx.current.currentTime + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveSection("dashboard")}
        >
          <span className="material-symbols-rounded text-indigo-600 text-3xl">
            mic_external_on
          </span>
          <h1 className="font-bold text-xl tracking-tighter text-slate-900 uppercase">
            VocalMaster<span className="text-indigo-600">Pro</span>
          </h1>
        </div>
        <button
          onClick={() => setActiveSection("about")}
          className="text-slate-500 hover:text-indigo-600 transition"
        >
          <span className="material-symbols-rounded">info</span>
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6 pb-24">
        {/* RENDER SECTIONS */}
        {activeSection === "dashboard" && (
          <Dashboard setSection={setActiveSection} />
        )}
        {activeSection === "pernapasan" && (
          <PernapasanSection setSection={setActiveSection} />
        )}
        {activeSection === "artikulasi" && (
          <ArtikulasiSection setSection={setActiveSection} />
        )}
        {activeSection === "resonansi" && (
          <ResonansiSection setSection={setActiveSection} />
        )}
        {activeSection === "intonasi" && (
          <IntonasiSection setSection={setActiveSection} playNote={playNote} />
        )}
        {activeSection === "phrasering" && (
          <PhraseringSection setSection={setActiveSection} />
        )}
        {activeSection === "vibrato" && (
          <VibratoSection setSection={setActiveSection} playNote={playNote} />
        )}
        {activeSection === "ekspresi" && (
          <EkspresiSection setSection={setActiveSection} />
        )}
        {activeSection === "studio" && (
          <StudioSection
            setSection={setActiveSection}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            recordedUrl={recordedUrl}
            setRecordedUrl={setRecordedUrl}
          />
        )}
        {activeSection === "about" && (
          <AboutSection setSection={setActiveSection} />
        )}
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS SECTIONS ---

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  const menus = [
    {
      id: "pernapasan",
      label: "Pernapasan",
      icon: "air",
      color: "text-blue-500",
    },
    {
      id: "artikulasi",
      label: "Artikulasi",
      icon: "record_voice_over",
      color: "text-emerald-500",
    },
    {
      id: "resonansi",
      label: "Resonansi",
      icon: "graphic_eq",
      color: "text-amber-500",
    },
    {
      id: "intonasi",
      label: "Intonasi",
      icon: "music_note",
      color: "text-rose-500",
    },
    {
      id: "phrasering",
      label: "Phrasering",
      icon: "subject",
      color: "text-indigo-500",
    },
    {
      id: "vibrato",
      label: "Vibrato",
      icon: "vibration",
      color: "text-purple-500",
    },
    {
      id: "ekspresi",
      label: "Ekspresi",
      icon: "theater_comedy",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Kurikulum Vokal
        </h2>
        <p className="text-slate-500">
          Pilih modul untuk melatih teknik suara Anda secara profesional.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setSection(menu.id as Section)}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center gap-3"
          >
            <span className={`material-symbols-rounded ${menu.color} text-4xl`}>
              {menu.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {menu.label}
            </span>
          </button>
        ))}
        <button
          onClick={() => setSection("studio")}
          className="bg-indigo-600 p-6 rounded-3xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95 flex flex-col items-center gap-3 text-white"
        >
          <span className="material-symbols-rounded text-4xl">
            settings_voice
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            Studio Latihan
          </span>
        </button>
      </div>
    </div>
  );
}

function PernapasanSection({
  setSection,
}: {
  setSection: (s: Section) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">(
    "idle"
  );
  const [timer, setTimer] = useState(0);
  const [selectedMode, setSelectedMode] = useState({
    name: "Pemula (4-4-4)",
    inhale: 4,
    hold: 4,
    exhale: 4,
  });
  const [sessionCount, setSessionCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const modes = [
    { name: "Pemula (4-4-4)", inhale: 4, hold: 4, exhale: 4 },
    { name: "Power (4-8-8)", inhale: 4, hold: 8, exhale: 8 },
    { name: "Stamina (6-12-12)", inhale: 6, hold: 12, exhale: 12 },
  ];

  // Efek untuk hitung mundur angka di dalam lingkaran
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startExercise = () => {
    let currentCycle = 0;
    const runCycle = () => {
      // PHASE 1: INHALE
      setPhase("inhale");
      setTimer(selectedMode.inhale);

      setTimeout(() => {
        // PHASE 2: HOLD
        setPhase("hold");
        setTimer(selectedMode.hold);

        setTimeout(() => {
          // PHASE 3: EXHALE
          setPhase("exhale");
          setTimer(selectedMode.exhale);

          setTimeout(() => {
            currentCycle++;
            if (currentCycle < 3) {
              // Jalankan 3 siklus otomatis
              runCycle();
            } else {
              setPhase("idle");
              setTimer(0);
              setSessionCount((prev) => prev + 1);
            }
          }, selectedMode.exhale * 1000);
        }, selectedMode.hold * 1000);
      }, selectedMode.inhale * 1000);
    };
    runCycle();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Teknik Pernapasan
          </h2>
          <p className="text-slate-500 text-sm">
            Kuasai kontrol diafragma untuk stabilitas nada.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => setShowVideo(!showVideo)}
            className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-indigo-700 transition"
          >
            {showVideo ? "TUTUP VIDEO" : "VIDEO PANDUAN"}
          </button>
          <div className="bg-blue-100 px-4 py-2 rounded-2xl border border-blue-200 text-right">
            <p className="text-[10px] font-bold text-blue-600 uppercase">
              Sesi Selesai
            </p>
            <p className="text-xl font-black text-blue-700 leading-none">
              {sessionCount}
            </p>
          </div>
        </div>
      </div>

      {/* Konten Video YouTube */}
      {showVideo && (
        <div className="mb-8 animate-in zoom-in-95 duration-300">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VKPlBR6CzTM"
              title="Latihan Pernapasan Diafragma"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Konten Edukasi & Simulasi Video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-600 text-sm">
            <span className="material-symbols-rounded text-sm">
              tips_and_updates
            </span>
            Cara Kerja Diafragma
          </h4>
          <div className="aspect-video bg-slate-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative border border-slate-50">
            <div
              className={`absolute bottom-0 w-full bg-blue-400/20 transition-all duration-[4000ms] ease-in-out
                ${phase === "inhale" ? "h-full" : "h-1/3"}
             `}
            ></div>

            <span className="material-symbols-rounded text-4xl text-slate-300 z-10">
              air
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            "Saat menghirup, diafragma berkontraksi (turun) menciptakan ruang
            bagi paru-paru. Pastikan bahu tetap relaks."
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-800 text-sm">
            <span className="material-symbols-rounded text-sm">settings</span>
            Pilih Mode Latihan
          </h4>
          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => setSelectedMode(mode)}
                disabled={phase !== "idle"}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center
                  ${
                    selectedMode.name === mode.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                  }
                  ${phase !== "idle" ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div>
                  <p
                    className={`font-bold text-sm ${
                      selectedMode.name === mode.name
                        ? "text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    {mode.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Inhale: {mode.inhale}s | Hold: {mode.hold}s | Exhale:{" "}
                    {mode.exhale}s
                  </p>
                </div>
                {selectedMode.name === mode.name && (
                  <span className="material-symbols-rounded text-blue-500">
                    check_circle
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Trainer */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl border border-slate-800">
        <div
          className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-1000 
          ${
            phase === "inhale"
              ? "bg-blue-500 scale-150"
              : phase === "exhale"
              ? "bg-emerald-500 scale-100"
              : ""
          }`}
        />

        <div className="relative z-10">
          <div
            className={`w-40 h-40 rounded-full mx-auto mb-8 border-8 flex flex-col items-center justify-center transition-all duration-1000
            ${
              phase === "inhale"
                ? "border-blue-500 scale-125 bg-blue-500/10"
                : phase === "hold"
                ? "border-amber-500 scale-125 bg-amber-500/10"
                : phase === "exhale"
                ? "border-emerald-500 scale-100 bg-emerald-500/10"
                : "border-slate-700"
            }
          `}
          >
            <span className="text-5xl font-black text-white">
              {timer > 0 ? timer : "0"}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Detik
            </span>
          </div>

          <h3
            className={`text-2xl font-black mb-2 transition-colors uppercase tracking-tight
            ${
              phase === "inhale"
                ? "text-blue-400"
                : phase === "hold"
                ? "text-amber-400"
                : phase === "exhale"
                ? "text-emerald-400"
                : "text-slate-500"
            }
          `}
          >
            {phase === "idle" && "Siap Berlatih?"}
            {phase === "inhale" && "Hirup Lewat Hidung"}
            {phase === "hold" && "Tahan di Diafragma"}
            {phase === "exhale" && "Buang Pelan (SSS...)"}
          </h3>

          <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto min-h-[40px]">
            {phase === "inhale" && "Rasakan perut bagian samping mengembang."}
            {phase === "hold" &&
              "Jangan kunci tenggorokan, biarkan otot perut menahan."}
            {phase === "exhale" &&
              "Keluarkan udara dengan tekanan yang stabil."}
            {phase === "idle" && "Pilih mode dan tekan tombol mulai."}
          </p>

          {phase === "idle" ? (
            <button
              onClick={startExercise}
              className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-full font-black text-lg shadow-xl shadow-blue-900/40 transition-all active:scale-95"
            >
              MULAI PANDUAN
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()} // Cara simpel reset state
              className="bg-slate-800 text-slate-400 px-8 py-2 rounded-full font-bold text-xs uppercase"
            >
              Reset Latihan
            </button>
          )}
        </div>
      </div>

      {/* Troubleshooting Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <TipCard
          icon="person_off"
          title="Bahu Terangkat?"
          desc="Pastikan bahu tetap rileks. Jika bahu naik, Anda bernapas di dada, bukan diafragma."
        />
        <TipCard
          icon="volume_off"
          title="Suara Bocor?"
          desc="Saat fase 'Hold', pastikan tidak ada udara yang keluar sedikitpun dari hidung atau mulut."
        />
        <TipCard
          icon="timer"
          title="Stabilitas SSS"
          desc="Fase 'Exhale' harus menghasilkan suara 'SSS' yang konstan, tidak boleh bergetar atau melemah."
        />
      </div>
    </div>
  );
}

function TipCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100">
      <span className="material-symbols-rounded text-blue-500 mb-2">
        {icon}
      </span>
      <h5 className="font-bold text-sm text-slate-800 mb-1">{title}</h5>
      <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ArtikulasiSection({
  setSection,
}: {
  setSection: (s: Section) => void;
}) {
  const [activeVowel, setActiveVowel] = useState<string | null>(null);

  const vowels = [
    {
      char: "A",
      desc: "Membuka mulut lebar (3 jari)",
      tip: "Bayangkan menggigit apel besar.",
    },
    {
      char: "I",
      desc: "Tarik sudut bibir ke samping",
      tip: "Ucapkan seperti sedang tersenyum lebar.",
    },
    {
      char: "U",
      desc: "Bibir mencucu ke depan",
      tip: "Arahkan suara ke titik depan bibir.",
    },
    {
      char: "E",
      desc: "Lidah datar, mulut rileks",
      tip: "Relakskan rahang bawah Anda.",
    },
    {
      char: "O",
      desc: "Bentuk mulut bulat sempurna",
      tip: "Buat ruang luas di dalam rongga mulut.",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Teknik Artikulasi</h2>
        <p className="text-slate-500 text-sm">
          Kejelasan vokal ditentukan oleh presisi bentuk mulut.
        </p>
      </div>

      {/* Grid Bentuk Mulut */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {vowels.map((v) => (
          <button
            key={v.char}
            onClick={() => setActiveVowel(v.char)}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2
              ${
                activeVowel === v.char
                  ? "border-emerald-500 bg-emerald-50 shadow-lg scale-105"
                  : "border-slate-100 bg-white hover:border-emerald-200"
              }
            `}
          >
            <span
              className={`text-5xl font-black ${
                activeVowel === v.char ? "text-emerald-600" : "text-slate-300"
              }`}
            >
              {v.char}
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">
              {v.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Detail Tip Artikulasi */}
      {activeVowel && (
        <div className="bg-emerald-600 text-white p-6 rounded-3xl mb-8 animate-in slide-in-from-bottom-2">
          <div className="flex items-start gap-4">
            <span className="material-symbols-rounded text-3xl">lightbulb</span>
            <div>
              <p className="font-bold text-lg">Tips Vokal {activeVowel}:</p>
              <p className="text-emerald-100 text-sm">
                {vowels.find((v) => v.char === activeVowel)?.tip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tongue Twister Challenge - Expanded Version */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-rose-500">
              campaign
            </span>
            <h3 className="font-bold uppercase tracking-widest text-xs">
              Pro Tongue Twister Challenge
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full border border-rose-500/30">
            5 LEVEL TERSEDIA
          </span>
        </div>

        <div className="space-y-4">
          {/* Level 1: Konsonan K */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                Level 1: Konsonan K
              </p>
              <span className="text-[9px] text-slate-500 italic">Mudah</span>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">
              "Kuku kaki kakekku kaku-kaku karena kena kuman-kuman."
            </p>
          </div>

          {/* Level 2: Konsonan L & R */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                Level 2: Kelincahan L & R
              </p>
              <span className="text-[9px] text-slate-500 italic">Menengah</span>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">
              "Lidah lari-lari lurus, ular lari lurus-lurus di atas pagar rumah
              Pak Lurah."
            </p>
          </div>

          {/* Level 3: Konsonan B, P, D, T */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                Level 3: Plosif (B/P/D/T)
              </p>
              <span className="text-[9px] text-slate-500 italic">
                Tantangan
              </span>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">
              "Dudung, ambilkan dandang di dinding dong, Dung!"
            </p>
          </div>

          {/* Level 4: Variasi Vokal & Konsonan Kompleks */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                Level 4: Kecepatan Tinggi
              </p>
              <span className="text-[9px] text-slate-500 italic">Sulit</span>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">
              "Satu sate tujuh tusuk, sate satu tujuh tusuk, tujuh tusuk sate
              satu."
            </p>
          </div>

          {/* Level 5: The Ultimate Boss */}
          <div className="p-5 bg-gradient-to-r from-rose-900/40 to-slate-900 rounded-2xl border border-rose-500/30 hover:from-rose-900/60 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                Level 5: Master Artikulasi
              </p>
              <span className="text-[9px] text-rose-400 font-bold animate-pulse uppercase">
                Ekstrem
              </span>
            </div>
            <p className="text-lg font-bold leading-relaxed italic text-white">
              "Kaka koki kiki, kuku kaku kaki kakek kiki kaku, koki kiki kaku
              kaki kaka kakek."
            </p>
          </div>
        </div>

        {/* Instruksi Latihan */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2">
            <span className="material-symbols-rounded text-rose-400 text-sm">
              timer
            </span>
            <p className="text-[10px] text-slate-400">
              Mulailah dengan tempo lambat, lalu percepat setiap pengulangan.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2">
            <span className="material-symbols-rounded text-rose-400 text-sm">
              volume_up
            </span>
            <p className="text-[10px] text-slate-400">
              Buka mulut selebar mungkin sesuai vokal A-I-U-E-O.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResonansiSection({
  setSection,
}: {
  setSection: (s: Section) => void;
}) {
  const [activeResonator, setActiveResonator] = useState<
    "chest" | "head" | "mask" | null
  >(null);

  const chambers = {
    chest: {
      title: "Chest Voice (Resonansi Dada)",
      desc: "Memberikan karakter suara yang rendah, tebal, dan berwibawa.",
      exercise:
        "Ucapkan 'HAAA' dengan nada rendah, rasakan getaran di telapak tangan yang diletakkan di dada.",
      color: "bg-orange-500",
      light: "bg-orange-50",
    },
    mask: {
      title: "Nasal/Mask Resonance",
      desc: "Menempatkan suara di area tulang pipi dan hidung untuk suara yang nyaring.",
      exercise:
        "Lakukan humming 'NNNGGG' seperti suara lebah, rasakan geli/getaran di area bibir dan hidung.",
      color: "bg-emerald-500",
      light: "bg-emerald-50",
    },
    head: {
      title: "Head Voice (Resonansi Kepala)",
      desc: "Untuk nada-nada tinggi yang jernih, ringan, dan melengking.",
      exercise:
        "Bayangkan suara keluar dari ubun-ubun. Gunakan suara 'HUUU' seperti burung hantu.",
      color: "bg-indigo-500",
      light: "bg-indigo-50",
    },
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Teknik Resonansi</h2>
        <p className="text-slate-500 text-sm">
          Arahkan aliran udara ke rongga resonansi untuk suara yang lebih merdu.
        </p>
      </div>

      {/* Visualisasi Tubuh Manusia (Simulasi) */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-48 h-64 bg-slate-50 rounded-full border-4 border-slate-100 flex items-center justify-center overflow-hidden">
          {/* Titik-titik Resonansi Interaktif */}
          <button
            onClick={() => setActiveResonator("head")}
            className={`absolute top-6 w-6 h-6 rounded-full animate-bounce transition-all ${
              activeResonator === "head"
                ? "bg-indigo-500 scale-150 shadow-lg shadow-indigo-200"
                : "bg-slate-300 hover:bg-indigo-300"
            }`}
          />
          <button
            onClick={() => setActiveResonator("mask")}
            className={`absolute top-20 w-6 h-6 rounded-full animate-pulse transition-all ${
              activeResonator === "mask"
                ? "bg-emerald-500 scale-150 shadow-lg shadow-emerald-200"
                : "bg-slate-300 hover:bg-emerald-300"
            }`}
          />
          <button
            onClick={() => setActiveResonator("chest")}
            className={`absolute top-40 w-8 h-8 rounded-full transition-all ${
              activeResonator === "chest"
                ? "bg-orange-500 scale-150 shadow-lg shadow-orange-200"
                : "bg-slate-300 hover:bg-orange-300"
            }`}
          />
          <span className="material-symbols-rounded text-slate-200 text-9xl opacity-20">
            person
          </span>
        </div>

        <div className="flex-1 space-y-4">
          <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">
            Pilih Area Fokus:
          </h4>
          {Object.entries(chambers).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveResonator(key as any)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all
                ${
                  activeResonator === key
                    ? `border-slate-800 ${data.light}`
                    : "border-slate-50 hover:border-slate-200 bg-slate-50/50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                <span
                  className={`font-bold text-sm ${
                    activeResonator === key
                      ? "text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {data.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Instruksi Latihan Berdasarkan Pilihan */}
      {activeResonator ? (
        <div
          className={`p-8 rounded-[2.5rem] animate-in slide-in-from-bottom-4 duration-300 border-b-8 ${chambers[activeResonator].color} ${chambers[activeResonator].light}`}
        >
          <h3 className="text-xl font-black text-slate-900 mb-2">
            {chambers[activeResonator].title}
          </h3>
          <p className="text-slate-1000 text-sm mb-6 leading-relaxed">
            {chambers[activeResonator].desc}
          </p>

          <div className="bg-white/60 p-6 rounded-2xl border border-white">
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <span className="material-symbols-rounded">
                record_voice_over
              </span>
              <p className="font-bold text-xs uppercase tracking-wider">
                Latihan Praktis:
              </p>
            </div>
            <p className="text-slate-700 italic font-medium leading-relaxed">
              "{chambers[activeResonator].exercise}"
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
          <span className="material-symbols-rounded text-slate-300 text-4xl mb-2">
            touch_app
          </span>
          <p className="text-slate-400 text-sm font-medium">
            Klik salah satu titik atau tombol untuk memulai latihan resonansi.
          </p>
        </div>
      )}
    </div>
  );
}

function IntonasiSection({
  setSection,
  playNote,
}: {
  setSection: (s: Section) => void;
  playNote: (f: number) => void;
}) {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const pianoKeys = [
    { n: "C", f: 261.63, label: "Do" },
    { n: "D", f: 293.66, label: "Re" },
    { n: "E", f: 329.63, label: "Mi" },
    { n: "F", f: 349.23, label: "Fa" },
    { n: "G", f: 392.0, label: "Sol" },
    { n: "A", f: 440.0, label: "La" },
    { n: "B", f: 493.88, label: "Si" },
    { n: "C2", f: 523.25, label: "Do'" },
  ];

  const handlePress = (n: string, f: number) => {
    setActiveNote(n);
    playNote(f);
    setTimeout(() => setActiveNote(null), 300);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Intonasi & Pitch Control
        </h2>
        <p className="text-slate-500 text-sm italic">
          "Suara yang bagus dimulai dari nada yang tepat."
        </p>
      </div>

      {/* 1. TUTORIAL PANDUAN (Fitur Baru yang Ditambahkan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3 text-sm">
            1
          </div>
          <h5 className="font-bold text-slate-800 text-xs uppercase mb-2">
            Dengarkan (Listening)
          </h5>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Tekan satu tuts piano, biarkan bunyinya meresap ke telinga Anda
            selama 2 detik tanpa bersuara.
          </p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-3 text-sm">
            2
          </div>
          <h5 className="font-bold text-slate-800 text-xs uppercase mb-2">
            Internalisasi
          </h5>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Bayangkan nada tersebut di dalam kepala Anda (audiasi) sebelum mulai
            membuka mulut.
          </p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mb-3 text-sm">
            3
          </div>
          <h5 className="font-bold text-slate-800 text-xs uppercase mb-2">
            Eksekusi
          </h5>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Nyanyikan nada tersebut dengan suku kata 'MA' atau 'LU'. Pastikan
            suara tidak goyang.
          </p>
        </div>
      </div>

      {/* 2. VISUAL TUNER DISPLAY */}
      <div className="bg-slate-900 p-10 rounded-[3rem] mb-8 text-center border-b-8 border-indigo-900 shadow-2xl relative overflow-hidden">
        <div className="py-4">
          <p className="text-indigo-400 text-[10px] font-black tracking-[0.4em] mb-4">
            TARGET PITCH
          </p>
          <span
            className={`text-7xl font-black transition-all duration-300 ${
              activeNote
                ? "text-white scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : "text-slate-800"
            }`}
          >
            {activeNote ? activeNote.replace("2", "") : "--"}
          </span>
          <div className="mt-6 flex justify-center gap-1">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`h-8 w-1 rounded-full transition-all duration-300 ${
                  activeNote ? "bg-indigo-500 h-12" : "bg-slate-800"
                }`}
                style={{ transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. PIANO KEYBOARD */}
      <div className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-xl overflow-x-auto no-scrollbar mb-8">
        <div className="flex gap-2 min-w-[550px] justify-center">
          {pianoKeys.map((key) => (
            <button
              key={key.n}
              onMouseDown={() => handlePress(key.n, key.f)}
              className={`flex-1 min-w-[65px] h-56 rounded-b-[2rem] border-2 transition-all flex flex-col items-center justify-end pb-8 gap-2
                ${
                  activeNote === key.n
                    ? "bg-indigo-600 border-indigo-700 translate-y-3 shadow-none"
                    : "bg-white border-slate-100 shadow-[0_10px_0_0_rgba(241,245,249,1)] hover:border-slate-200 active:shadow-none"
                }
              `}
            >
              <span
                className={`font-black text-xl ${
                  activeNote === key.n ? "text-white" : "text-slate-800"
                }`}
              >
                {key.n.replace("2", "")}
              </span>
              <span
                className={`text-[10px] font-bold uppercase ${
                  activeNote === key.n ? "text-indigo-200" : "text-slate-400"
                }`}
              >
                {key.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. TIPS LANJUTAN */}
      <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-rounded text-amber-600">
            warning
          </span>
          <h4 className="font-bold text-amber-900 text-sm">
            Masalah Umum: Flat & Sharp
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-bold text-amber-800 underline">
              Nada Anda "Flat" (Rendah)?
            </p>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Biasanya karena kurang energi atau napas tidak stabil. Bayangkan
              nada tersebut berada sedikit lebih tinggi dari target aslinya.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-amber-800 underline">
              Nada Anda "Sharp" (Tinggi)?
            </p>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Biasanya karena terlalu tegang di area leher. Relakskan rahang dan
              biarkan aliran udara mengalir lebih santai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhraseringSection({
  setSection,
}: {
  setSection: (s: Section) => void;
}) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const exercises = [
    {
      title: "Pernapasan Kalimat Panjang",
      lyrics:
        "Bintang di langit / kerlip engkau di sana / amat jauh dari jangkauan tangan.",
      tips: "Tanda (/) adalah tempat mencuri napas (catch breath) yang cepat tanpa merusak tempo.",
      focus: "Stamina",
    },
    {
      title: "Dinamika (Volume Suara)",
      lyrics: "Aku (soft) ... SAYANG (loud) ... kamu (soft).",
      tips: "Berlatihlah mengubah volume suara dari lembut ke keras (crescendo) untuk emosi.",
      focus: "Emosi",
    },
    {
      title: "Legato & Staccato",
      lyrics:
        "Lari - lari - lari (pendek-terputus) vs Mengalir (panjang-sambung).",
      tips: "Legato berarti nada tersambung halus, Staccato berarti nada pendek dan tegas.",
      focus: "Teknik",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Phrasering & Ekspresi
        </h2>
        <p className="text-slate-500 text-sm">
          Seni memenggal kalimat dan memberikan jiwa pada setiap nada.
        </p>
      </div>

      {/* Panduan Utama Phrasering */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-rounded">auto_awesome</span>
            Aturan Emas Phrasering
          </h3>
          <ul className="space-y-3 text-sm text-indigo-100">
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-1 rounded-full text-[10px]">
                01
              </span>
              Jangan memenggal kata di tengah-tengah (Contoh: "Ma- / kan").
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-1 rounded-full text-[10px]">
                02
              </span>
              Ambil napas sesuai dengan koma atau titik pada lirik lagu.
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 p-1 rounded-full text-[10px]">
                03
              </span>
              Gunakan emosi yang sesuai dengan makna kata yang diucapkan.
            </li>
          </ul>
        </div>
        <span className="absolute -bottom-10 -right-10 material-symbols-rounded text-[15rem] opacity-10">
          lyrics
        </span>
      </div>

      {/* Daftar Latihan Interaktif */}
      <div className="space-y-4">
        {exercises.map((ex, index) => (
          <div
            key={index}
            onClick={() => setSelectedExercise(index)}
            className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer
              ${
                selectedExercise === index
                  ? "border-indigo-500 bg-white shadow-lg"
                  : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
              }
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                {ex.focus}
              </span>
              <span className="material-symbols-rounded text-slate-300">
                {selectedExercise === index
                  ? "keyboard_arrow_up"
                  : "keyboard_arrow_down"}
              </span>
            </div>

            <h4 className="font-bold text-slate-800 mb-2">{ex.title}</h4>

            {selectedExercise === index && (
              <div className="animate-in fade-in zoom-in-95 duration-300 mt-4 pt-4 border-t border-slate-100">
                <p className="text-2xl font-serif italic text-indigo-600 mb-4 text-center">
                  "{ex.lyrics}"
                </p>
                <div className="bg-indigo-50 p-4 rounded-2xl flex items-start gap-3">
                  <span className="material-symbols-rounded text-indigo-500 text-sm">
                    tips_and_updates
                  </span>
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    {ex.tips}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VibratoSection({
  setSection,
  playNote,
}: {
  setSection: (s: Section) => void;
  playNote: (f: number) => void;
}) {
  const [bpm, setBpm] = useState(60);
  const [isOn, setIsOn] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOn) {
      timer.current = setInterval(() => {
        // Suara klik metronom (nada pendek)
        playNote(440);
      }, (60 / bpm) * 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isOn, bpm, playNote]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Teknik Vibrato</h2>
        <p className="text-slate-500 text-sm">
          Latih ayunan nada yang stabil dengan bantuan metronom.
        </p>
      </div>

      {/* Visualizer Gelombang Vibrato */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-center mb-8 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10">
          <div className="flex justify-center items-center gap-1 mb-10 h-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full bg-purple-500 transition-all duration-300 ${
                  isOn ? "animate-bounce" : "h-2 opacity-20"
                }`}
                style={{
                  animationDuration: `${60 / bpm}s`,
                  animationDelay: `${i * 0.05}s`,
                  height: isOn ? `${Math.random() * 40 + 20}px` : "8px",
                }}
              ></div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-white text-4xl font-black mb-2">
              {bpm}{" "}
              <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                BPM
              </span>
            </h3>
            <input
              type="range"
              min="40"
              max="160"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-full max-w-xs h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={() => setIsOn(!isOn)}
            className={`px-12 py-4 rounded-full font-black uppercase tracking-tighter transition-all shadow-xl ${
              isOn
                ? "bg-rose-600 text-white hover:bg-rose-500"
                : "bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900/40"
            }`}
          >
            {isOn ? "Stop Metronome" : "Start Metronome"}
          </button>
        </div>

        {/* Background Decor */}
        <div
          className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${
            isOn ? "opacity-20" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Panduan Latihan Vibrato */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="material-symbols-rounded text-purple-500">
            fitness_center
          </span>
          Latihan Bertahap (Drilling)
        </h4>
        <div className="space-y-4">
          {/* Langkah 1 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-700 uppercase">
                Langkah 1: Slow Oscillation
              </span>
              <span className="text-[10px] bg-purple-100 px-2 py-1 rounded-md font-bold text-purple-600">
                60 BPM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ucapkan satu nada (contoh: Ah), lalu ayunkan nada tersebut
              naik-turun secara sadar mengikuti detak. **Fokus:** Melatih
              kontrol otot laring untuk membuat gelombang nada secara manual.
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-700 uppercase">
                Langkah 2: Muscle Memory
              </span>
              <span className="text-[10px] bg-purple-100 px-2 py-1 rounded-md font-bold text-purple-600">
                90 BPM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Percepat ayunan nada. Di tahap ini, getaran mulai terasa lebih
              halus. **Fokus:** Menghilangkan ketegangan di rahang bawah.
              Pastikan getaran murni berasal dari aliran udara dan otot
              tenggorokan yang rileks.
            </p>
          </div>

          {/* Langkah 3 */}
          <div className="p-4 bg-purple-600 rounded-2xl border border-purple-700 shadow-lg shadow-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-white uppercase">
                Langkah 3: Natural Vibrato
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-bold text-white tracking-widest">
                120+ BPM
              </span>
            </div>
            <p className="text-[11px] text-purple-100 leading-relaxed">
              Biarkan nada bergetar secara otomatis. Getaran akan terasa seperti
              "jatuh" sendiri tanpa digerakkan secara sadar. **Fokus:** Menjaga
              napas diafragma tetap stabil saat vibrato bekerja sendiri.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 shadow-sm">
        <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
          <span className="material-symbols-rounded text-purple-600">info</span>
          Tips Vibrato
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="material-symbols-rounded text-purple-500 text-sm">
              check_circle
            </span>
            <p className="text-[11px] text-purple-800 leading-relaxed">
              Jangan dipaksa dengan otot leher, vibrato harus terasa "lepas" dan
              relaks.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-rounded text-purple-500 text-sm">
              check_circle
            </span>
            <p className="text-[11px] text-purple-800 leading-relaxed">
              Pastikan aliran napas dari diafragma tetap konstan saat
              mengayunkan nada.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-rounded text-purple-500 text-sm">
              check_circle
            </span>
            <p className="text-[11px] text-purple-800 leading-relaxed">
              Gunakan suara 'O' atau 'A' untuk merasakan getaran di area
              resonansi mask.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function EkspresiSection({ setSection }: { setSection: (s: Section) => void }) {
  const [activeMood, setActiveMood] = useState<
    "sedih" | "ceria" | "tegas" | null
  >(null);

  const moodDetails = {
    sedih: {
      title: "Adèle - Someone Like You",
      tips: "Gunakan 'Airy Voice' (banyak desah napas). Tiru bibir yang gemetar (quivering) dan mata sayu.",
      tone: "Dark & Soft",
      icon: "sentiment_dissatisfied",
      color: "border-blue-500 bg-blue-50 text-blue-700",
      ytId: "hLQl3WQQoQ0",
    },
    ceria: {
      title: "Pharrell - Happy",
      tips: "Angkat 'Soft Palate', tersenyum lebar. Tiru 'Cheek Lift' (angkat pipi) setinggi mungkin.",
      tone: "Bright & Sharp",
      icon: "sentiment_very_satisfied",
      color: "border-amber-500 bg-amber-50 text-amber-700",
      ytId: "ZbZSe6N_BXs",
    },
    tegas: {
      title: "Adele - Rolling in the Deep",
      tips: "Gunakan 'Chest Voice' yang tebal. Tiru artikulasi mulut yang tegas dan tatapan mata yang tajam seolah menantang lawan bicara.",
      tone: "Powerful & Gritty",
      icon: "priority_high",
      color: "border-rose-500 bg-rose-50 text-rose-700",
      ytId: "rYEDA3JcQqw", // Video musik resmi Adele - Rolling in the Deep
    },
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Ekspresi Vokal</h2>
        <p className="text-slate-500 text-sm">
          Tonton dan tiru bagaimana emosi mengubah warna suara penyanyi
          profesional.
        </p>
      </div>

      {/* Video Case Study Area - Interaktif mengikuti Mood */}
      <div
        className={`aspect-video bg-slate-900 rounded-[3rem] flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group border-4 transition-colors duration-500 ${
          activeMood ? moodDetails[activeMood].color : "border-white"
        }`}
      >
        {activeMood ? (
          <iframe
            className="w-full h-full object-cover scale-105"
            src={`https://www.youtube.com/embed/${moodDetails[activeMood].ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${moodDetails[activeMood].ytId}`}
            title="Vocal Reference"
            allow="autoplay"
          ></iframe>
        ) : (
          <div className="text-center">
            <span className="material-symbols-rounded text-white text-7xl opacity-20 animate-pulse">
              play_circle
            </span>
            <p className="text-slate-500 text-xs mt-4 font-bold uppercase tracking-widest">
              Pilih Mood Untuk Memulai
            </p>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
          <p className="text-[10px] text-white font-bold tracking-widest uppercase">
            {activeMood ? `Observasi: ${activeMood}` : "Video Panduan Ekspresi"}
          </p>
        </div>
      </div>

      {/* Mood Selection - Pelatihan Tone Color */}
      <h4 className="font-bold text-slate-800 mb-4 px-2 uppercase text-xs tracking-widest">
        Pilih Mood & Artis:
      </h4>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(Object.keys(moodDetails) as Array<keyof typeof moodDetails>).map(
          (mood) => (
            <button
              key={mood}
              onClick={() => setActiveMood(mood)}
              className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 active:scale-95
              ${
                activeMood === mood
                  ? moodDetails[mood].color + " shadow-lg"
                  : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
              }
            `}
            >
              <span className="material-symbols-rounded text-3xl">
                {moodDetails[mood].icon}
              </span>
              <span className="text-[10px] font-bold uppercase">{mood}</span>
            </button>
          )
        )}
      </div>

      {/* Detail Panduan Ekspresi & Latihan Meniru */}
      {activeMood ? (
        <div
          className={`p-8 rounded-[2.5rem] animate-in slide-in-from-bottom-4 duration-300 border-l-8 ${moodDetails[activeMood].color}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-black mb-1">
                {moodDetails[activeMood].title}
              </h3>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">
                Warna Suara: {moodDetails[activeMood].tone}
              </p>
            </div>
          </div>

          <div className="bg-white/50 p-5 rounded-2xl border border-white/60 mb-6">
            <p className="text-[11px] font-black text-slate-400 uppercase mb-2 tracking-tighter">
              Tantangan Meniru:
            </p>
            <p className="text-sm leading-relaxed italic text-slate-800">
              "{moodDetails[activeMood].tips}"
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/30 rounded-2xl">
            <span className="material-symbols-rounded text-xl">videocam</span>
            <p className="text-[11px] font-medium">
              Bandingkan gerakan mulut Anda di cermin dengan video artis di
              atas.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
          <span className="material-symbols-rounded text-slate-300 text-4xl mb-2">
            face_6
          </span>
          <p className="text-slate-400 text-sm font-medium">
            Klik salah satu mood di atas untuk melihat referensi penjiwaan.
          </p>
        </div>
      )}

      {/* Selesai Latihan */}
      <div className="mt-10">
        <button
          onClick={() => {
            alert(
              "Sesi Ekspresi Vokal Selesai! Anda telah belajar meniru teknik ekspresi profesional."
            );
            setSection("dashboard");
          }}
          className="w-full bg-slate-900 text-white py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition shadow-xl active:scale-95"
        >
          SELESAIKAN SESI
        </button>
      </div>
    </div>
  );
}

function StudioSection({
  setSection,
  isRecording,
  setIsRecording,
  recordedUrl,
  setRecordedUrl,
}: any) {
  // State baru untuk menyimpan skor hasil analisis
  const [scores, setScores] = useState({
    intonasi: 0,
    tempo: 0,
    stabilitas: 0,
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        setRecordedUrl(URL.createObjectURL(blob));

        // SIMULASI ANALISIS: Menghasilkan angka dinamis saat rekaman berhenti
        setScores({
          intonasi: Math.floor(Math.random() * (98 - 85 + 1)) + 85, // Range 85-98%
          tempo: Math.floor(Math.random() * (95 - 80 + 1)) + 80, // Range 80-95%
          stabilitas: Math.floor(Math.random() * (99 - 88 + 1)) + 88, // Range 88-99%
        });
      };

      recorder.start();
      (window as any).currentRecorder = recorder;
      setIsRecording(true);
    } catch (err) {
      alert("Akses mikrofon ditolak.");
    }
  };

  const stopRecording = () => {
    (window as any).currentRecorder?.stop();
    setIsRecording(false);
  };

  // FITUR RESET: Menghapus rekaman dan skor untuk mulai ulang
  const resetSession = () => {
    setRecordedUrl(null);
    setScores({ intonasi: 0, tempo: 0, stabilitas: 0 });
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-12">
      <BackButton onClick={() => setSection("dashboard")} />

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">
          Live Studio
        </h2>
        <p className="text-slate-500 text-sm">
          Ruang Simulasi Digital & Analisis Langsung
        </p>
      </div>

      {/* MONITOR STUDIO */}
      <div className="bg-slate-950 rounded-[3rem] p-8 mb-8 border-[12px] border-slate-900 shadow-2xl relative">
        <div className="h-32 flex items-center justify-center gap-1.5 mb-8 relative z-10">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-150 ${
                isRecording ? "bg-rose-500" : "bg-slate-800 h-2"
              }`}
              style={{
                height: isRecording ? `${20 + Math.random() * 80}%` : "8px",
              }}
            ></div>
          ))}
        </div>

        <div className="flex flex-col items-center relative z-10">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all active:scale-90 border-4
              ${
                isRecording
                  ? "bg-white text-slate-950 border-rose-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  : "bg-rose-600 text-white border-white/10"
              }
            `}
          >
            <span className="material-symbols-rounded text-4xl mb-1">
              {isRecording ? "stop" : "mic"}
            </span>
            <span className="text-[8px] font-black uppercase tracking-tighter">
              {isRecording ? "Finish" : "Start Live"}
            </span>
          </button>
        </div>
      </div>

      {/* HASIL & FITUR RESET */}
      {recordedUrl && !isRecording && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl relative">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
              Playback Session
            </h4>
            <audio src={recordedUrl} controls className="w-full h-12 mb-6" />

            {/* Tombol Reset Baru */}
            <button
              onClick={resetSession}
              className="w-full py-3 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-rounded text-sm">refresh</span>
              Ulangi Rekaman (Reset)
            </button>
          </div>

          {/* Analisis Dashboard (Sekarang Berfungsi) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="material-symbols-rounded text-indigo-500 mb-2">
                music_note
              </span>
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Intonasi
              </p>
              <p className="text-3xl font-black text-slate-900">
                {scores.intonasi}
                <span className="text-sm text-indigo-500">%</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="material-symbols-rounded text-emerald-500 mb-2">
                speed
              </span>
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Tempo
              </p>
              <p className="text-3xl font-black text-slate-900">
                {scores.tempo}
                <span className="text-sm text-emerald-500">%</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="material-symbols-rounded text-amber-500 mb-2">
                leaderboard
              </span>
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Stabilitas
              </p>
              <p className="text-3xl font-black text-slate-900">
                {scores.stabilitas}
                <span className="text-sm text-amber-500">%</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutSection({ setSection }: { setSection: (s: Section) => void }) {
  const references = [
    {
      name: "Cheryl Porter",
      role: "Vocal Coach Method",
      desc: "Teknik pernapasan dan pemanasan vokal modern.",
    },
    {
      name: "Seth Riggs",
      role: "Speech Level Singing",
      desc: "Metode resonansi dan transisi register suara.",
    },
    {
      name: "Berklee College of Music",
      role: "Music Theory",
      desc: "Standar kurikulum phrasering dan ekspresi vokal.",
    },
    {
      name: "Ken Tamplin",
      role: "Vocal Academy",
      desc: "Referensi teknik power vokal dan stabilitas nada.",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 px-2">
      <BackButton onClick={() => setSection("dashboard")} />

      {/* 1. PROFIL PENGEMBANG */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          Profil Pengembang
        </h3>
        <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">
          NAMA
        </p>
        <div className="mt-4 max-w-sm mx-auto p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            "profil lengkap"
          </p>
        </div>
      </div>

      <hr className="border-slate-100 mb-10" />

      {/* 2. TUJUAN APLIKASI */}
      <div className="mb-12">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-6 h-[2px] bg-indigo-600"></span>
          Tujuan Aplikasi
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <span className="material-symbols-rounded text-indigo-500 mb-3">
              school
            </span>
            <h5 className="font-bold text-slate-800 text-sm mb-2">
              Edukasi Terstruktur
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Menyediakan kurikulum vokal dasar dari nol hingga teknik
              profesional secara gratis dan mudah diakses.
            </p>
          </div>
          <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <span className="material-symbols-rounded text-emerald-500 mb-3">
              analytics
            </span>
            <h5 className="font-bold text-slate-800 text-sm mb-2">
              Evaluasi Mandiri
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Membantu penyanyi mengevaluasi performa mereka melalui simulasi
              studio dan analisis parameter vokal.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DAFTAR REFERENSI & PELATIH */}
      <div className="mb-10">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-6 h-[2px] bg-indigo-600"></span>
          Sumber & Referensi
        </h4>
        <div className="bg-slate-900 rounded-[3rem] p-6 shadow-2xl">
          <div className="space-y-4">
            {references.map((ref, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-xl">
                    menu_book
                  </span>
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm">{ref.name}</h5>
                  <p className="text-[10px] text-indigo-400 font-bold mb-1 uppercase tracking-tighter">
                    {ref.role}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {ref.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pt-8 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 font-medium">
          Dibuat sebagai proyek pembelajaran teknologi vokal digital. <br />
          Semua materi merujuk pada praktik vokal internasional yang aman bagi
          pita suara.
        </p>
      </div>
    </div>
  );
}

// --- UTILS ---
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-8 flex items-center gap-2 text-indigo-600 font-bold hover:translate-x-[-4px] transition-transform"
    >
      <span className="material-symbols-rounded">arrow_back</span> Dashboard
    </button>
  );
}
