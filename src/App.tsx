import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Music, Volume2, VolumeX, Copy, Check, ExternalLink, Settings, Camera, ChevronDown } from "lucide-react";
import { Routes, Route, useSearchParams, Link } from "react-router-dom";
import { EnvelopeOpening } from "./components/EnvelopeOpening";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Naween & Nadeesha
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const mandalaImage = "/images/mandala_gold.png";


type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="mandala-corner mandala-corner-tr">
        <InviteImage src={mandalaImage} alt="" className="mandala-art" eager />
      </div>
      {!minimal && (
        <>
          <div className="mandala-corner mandala-corner-bl mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-tl is-soft mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-br is-soft mandala-mobile-hidden">
            <InviteImage src={mandalaImage} alt="" className="mandala-art" />
          </div>
        </>
      )}
    </div>
  );
}

function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#b48c36", "#9a7629", "#805f1d", "#d4af37"];
    const petalCount = isMobile ? 24 : 40;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("December 03, 2026 16:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-4 md:mt-16 z-20 px-1">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[5.5rem] h-[7.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-3xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-4 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[7px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WeddingTimeline() {
  const schedule = [
    { time: "04:00 PM", event: "Church Ceremony", icon: <Clock className="w-4 h-4" /> },
    { time: "06:00 PM", event: "Reception Start", icon: <Sparkles className="w-4 h-4" /> },
    { time: "07:00 PM", event: "Dinner Service", icon: <Sparkles className="w-4 h-4" /> },
    { time: "11:00 PM", event: "Going Down", icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <section 
      className="cv-auto py-24 md:py-36 relative overflow-hidden flex flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/ChatGPT Image Jun 8, 2026, 02_48_38 PM.png')" }}
    >
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="max-w-4xl w-full px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-theme-600 font-bold mb-4 block">The Schedule</span>
          <h2 className="font-playball text-[3.5rem] md:text-[5.5rem] text-theme-900 leading-none">Wedding Timeline</h2>
        </div>

        <div className="relative">
          {/* Vertical line with gradient */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-theme-200 via-theme-400 to-theme-200 md:-translate-x-1/2 opacity-30" />

          <div className="space-y-12 md:space-y-24">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 w-3.5 h-3.5 bg-theme-500 rounded-full border-4 border-white shadow-md md:-translate-x-1/2 z-20" />

                {/* Content Card */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`inline-block p-4 sm:p-6 bg-[#faf9f6]/80 backdrop-blur-sm border border-theme-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow max-w-sm w-full ${index % 2 === 0 ? "md:mr-[-10px]" : "md:ml-[-10px]"}`}>
                    <div className={`flex items-center gap-4 mb-2 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                      <div className="p-2 bg-theme-100 rounded-lg text-theme-600">
                        {item.icon}
                      </div>
                      <span className="text-[10px] md:text-[12px] font-bold text-theme-700 tracking-[0.2em] font-cinzel">{item.time}</span>
                    </div>
                    <h4 className="text-lg md:text-2xl font-playball text-stone-800">{item.event}</h4>
                  </div>
                </div>

                {/* Empty space for desktop layout symmetry */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WeddingInvitation() {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get("to");

  const [rsvpData, setRsvpData] = useState({ name: guestName || "", attending: "yes", guests: "1", dietary: "" });
  const [wishData, setWishData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState({ rsvp: false, wish: false });
  const [submitted, setSubmitted] = useState({ rsvp: false, wish: false });

  // IMPORTANT: Replace this with your actual Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0NXiffl9ZbdxazeBRBodSFu9Z6EHWF0QiVQWsOew3mHAKbb5jZ0zXeRbCDdDMvO6JnQ/exec";

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!SCRIPT_URL) {
      throw new Error("Missing SCRIPT_URL");
    }

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.rsvp || submitted.rsvp) return;

    if (!rsvpData.name.trim()) return;

    setIsSubmitting({ ...isSubmitting, rsvp: true });
    try {
      await submitToGoogleSheet({
        action: "rsvp",
        day: "1",
        name: rsvpData.name.trim(),
        attending: rsvpData.attending,
        guests: rsvpData.attending === "yes" ? rsvpData.guests : "0",
        dietaryNotes: rsvpData.dietary,
      });
      setSubmitted({ ...submitted, rsvp: true });
      setRsvpData({ ...rsvpData, name: "", attending: "yes", guests: "1", dietary: "" });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting({ ...isSubmitting, rsvp: false });
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.wish || submitted.wish) return;

    if (!wishData.name.trim() || !wishData.message.trim()) return;

    setIsSubmitting({ ...isSubmitting, wish: true });
    try {
      await submitToGoogleSheet({
        action: "wish",
        day: "1",
        name: wishData.name.trim(),
        message: wishData.message.trim(),
      });
      setSubmitted({ ...submitted, wish: true });
      setWishData({ name: "", message: "" });
    } catch (error) {
      console.error('Error submitting wish:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting({ ...isSubmitting, wish: false });
    }
  };

  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! < 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#faf9f6] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio
        ref={audioRef}
        src="/Ed Sheeran - Perfect (Lyrics)_256k.mp3"
        loop
        autoPlay
      />

      {/* Music Toggle Button */}
      {isOpened && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={toggleMusic}
          className="fixed bottom-6 left-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      )}
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <EnvelopeOpening
            key="envelope"
            onComplete={() => {
              setIsOpened(true);
            }}
            onMusicStart={() => {
              if (audioRef.current && !isPlaying) {
                audioRef.current.play().catch(e => console.log("Music play blocked", e));
                setIsPlaying(true);
              }
            }}
          />
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            {/* Hero Section */}
            <section 
              className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/ChatGPT Image Jun 8, 2026, 02_19_21 PM.png')" }}
            >
              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0"
              >
                P&N
              </motion.div>

              {/* Central Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[600px] flex flex-col items-center p-6 pt-12 md:p-10 md:pt-16"
              >
                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    <span className="block text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-theme-700 font-bold mb-2">
                      Please join us
                    </span>
                  </motion.div>

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5.5rem] text-stone-800 leading-[1.1] drop-shadow-sm"
                    >
                      Nipuni
                    </motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-playball text-3xl md:text-5xl text-theme-500 italic font-light my-2 md:my-4 tracking-widest"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-stone-800 leading-[1.1] drop-shadow-sm"
                    >
                      Praveen
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-12 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-300 to-theme-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-theme-300 to-theme-400" />
                    </div>
                    <div className="font-cinzel space-y-1">
                      <p className="text-2xl md:text-4xl text-stone-700 tracking-[0.2em] md:tracking-[0.3em] font-bold">03 DEC 2026</p>
                      <p className="text-xs md:text-sm text-theme-600 tracking-[0.2em] uppercase font-bold">Infant Jesus Church, Colombo 02</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>



            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                {/* Top-left: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-10 top-8 w-[460px] h-auto mix-blend-multiply opacity-55 -rotate-[8deg]" alt="" />
                {/* Top-right: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-10 top-2 w-[430px] h-auto mix-blend-multiply opacity-50 rotate-[12deg]" alt="" />
                {/* Bottom-left: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -left-6 bottom-8 w-[420px] h-auto mix-blend-multiply opacity-40 rotate-[180deg]" alt="" />
                {/* Bottom-right: mandala on desktop only */}
                <InviteImage src={mandalaImage} className="hidden md:block absolute -right-8 bottom-14 w-[470px] h-auto mix-blend-multiply opacity-45 -rotate-[170deg]" alt="" />
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-theme-400 mb-6 md:mb-10" />
                  <p className="text-theme-700 text-[9px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-center leading-loose">
                    {guestName ? (
                      <>
                        <span className="text-theme-900 border-b border-theme-400 pb-1 mb-2 inline-block">{guestName}</span>
                        <br />
                        you are cordially invited to celebrate the union of
                      </>
                    ) : (
                      "You are cordially invited to celebrate the union of"
                    )}
                  </p>
                </motion.div>



                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Nimmi's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved daughter of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. & Mrs. Ariyarathna</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Nipuni</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-[#fdfaf5]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Rishan's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved son of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. & Mrs. Kulendra Kumar</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Praveen</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Events Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-8 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  {/* Date section */}
                  <div className="flex flex-col items-center mb-6">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                    <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">THURSDAY, 03 DECEMBER</p>
                    <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 w-full max-w-5xl px-4">
                    {/* Church Ceremony Card */}
                    <div className="relative flex-1 flex flex-col items-center text-center p-10 md:p-12 bg-white/60 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-theme-100 rounded-tr-[4rem] rounded-bl-[4rem] group hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(212,175,55,0.15)] transition-all duration-700 overflow-hidden">
                      <div className="absolute inset-2 border border-theme-200/40 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/60" />
                      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-theme-50 to-theme-100 shadow-sm border border-theme-200 mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Clock className="w-6 h-6 text-theme-600" />
                        </div>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-2">Sacred Vows</span>
                        <h4 className="font-playball text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm group-hover:text-theme-700 transition-colors">Church Ceremony</h4>
                        
                        <div className="flex items-center gap-3 w-full justify-center my-6 opacity-60">
                          <div className="h-px w-12 bg-theme-300" />
                          <div className="w-1.5 h-1.5 rotate-45 bg-theme-400" />
                          <div className="h-px w-12 bg-theme-300" />
                        </div>

                        <p className="font-cinzel text-lg md:text-xl text-theme-700 tracking-[0.2em] font-bold mb-8">1600 LT</p>
                        
                        <div className="space-y-3 mt-auto">
                          <p className="text-stone-800 text-sm md:text-base tracking-wide font-medium uppercase font-cinzel">Infant Jesus Church</p>
                          <p className="text-stone-500 text-xs md:text-sm tracking-[0.2em] uppercase">Colombo 02</p>
                        </div>
                      </div>
                    </div>

                    {/* Reception Card */}
                    <div className="relative flex-1 flex flex-col items-center text-center p-10 md:p-12 bg-white/60 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-theme-100 rounded-tl-[4rem] rounded-br-[4rem] group hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(212,175,55,0.15)] transition-all duration-700 overflow-hidden">
                      <div className="absolute inset-2 border border-theme-200/40 rounded-tl-[3.5rem] rounded-br-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/60" />
                      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-theme-50 to-theme-100 shadow-sm border border-theme-200 mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Sparkles className="w-6 h-6 text-theme-600" />
                        </div>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-2">Celebration</span>
                        <h4 className="font-playball text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm group-hover:text-theme-700 transition-colors">The Reception</h4>
                        
                        <div className="flex items-center gap-3 w-full justify-center my-6 opacity-60">
                          <div className="h-px w-12 bg-theme-300" />
                          <div className="w-1.5 h-1.5 rotate-45 bg-theme-400" />
                          <div className="h-px w-12 bg-theme-300" />
                        </div>

                        <p className="font-cinzel text-lg md:text-xl text-theme-700 tracking-[0.2em] font-bold mb-8">1800 LT - 2300 LT</p>
                        
                        <div className="space-y-3 mt-auto">
                          <p className="text-stone-800 text-sm md:text-base tracking-wide font-medium uppercase font-cinzel">Hotel Greencourt</p>
                          <p className="text-stone-600 text-xs md:text-sm tracking-[0.1em] italic">Emperors Court</p>
                          <p className="text-stone-500 text-xs md:text-sm tracking-[0.2em] uppercase">Homagama</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <WeddingTimeline />

            {/* Countdown Section */}
            <section 
              className="cv-auto py-16 md:py-36 relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/ChatGPT Image Jun 8, 2026, 02_46_46 PM.png')" }}
            >
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Save the <span className="font-playball text-theme-700 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">Date</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#faf9f6] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Church Ceremony Venue */}
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 md:mb-48 relative">
                  {/* Church Watermark */}
                  <div className="absolute top-1/2 left-0 md:-left-24 -translate-y-1/2 w-full md:w-[120%] opacity-[0.15] pointer-events-none mix-blend-multiply z-0 hidden md:flex justify-center md:justify-start overflow-hidden">
                    <img src="https://i0.wp.com/churchwonders.com/wp-content/uploads/2022/09/65f48-ij_exterior_9885c2.jpg" alt="" className="w-full max-w-[700px] h-auto object-cover grayscale" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start relative z-10 bg-[url('https://i0.wp.com/churchwonders.com/wp-content/uploads/2022/09/65f48-ij_exterior_9885c2.jpg')] md:bg-none bg-cover bg-center bg-white/85 md:bg-transparent bg-blend-overlay backdrop-blur-[2px] md:backdrop-blur-none p-8 md:p-0 rounded-3xl md:rounded-none border border-theme-100 md:border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] md:shadow-none w-full overflow-hidden"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">Church Ceremony</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Infant Jesus Church
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          Colombo 02
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        Join us as we exchange our vows and begin our new life together.
                        <div className="mt-2 text-theme-800 font-medium">Time: 04:00 PM (1600 LT)</div>
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Infant+Jesus+Church+Colombo+02', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Infant%20Jesus%20Church%20Colombo%2002&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Reception Venue */}
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center relative">
                  {/* Reception Watermark */}
                  <div className="absolute top-1/2 right-0 md:-right-24 -translate-y-1/2 w-full md:w-[120%] opacity-[0.15] pointer-events-none mix-blend-multiply z-0 hidden md:flex justify-center md:justify-end overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtpS9JaNpwV8C-m-iiHXOnbILb9AxgBn0I0dXMk-EJHUTP5KGG8aIwxmg5&s=10" alt="" className="w-full max-w-[700px] h-auto object-cover grayscale" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start md:order-2 relative z-10 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtpS9JaNpwV8C-m-iiHXOnbILb9AxgBn0I0dXMk-EJHUTP5KGG8aIwxmg5&s=10')] md:bg-none bg-cover bg-center bg-white/85 md:bg-transparent bg-blend-overlay backdrop-blur-[2px] md:backdrop-blur-none p-8 md:p-0 rounded-3xl md:rounded-none border border-theme-100 md:border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] md:shadow-none w-full overflow-hidden"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Reception</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Hotel Greencourt
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          Emperors Court,<br /> Homagama.
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        We look forward to welcoming you to celebrate our special day amidst nature's elegance.
                        <div className="mt-2 text-theme-800 font-medium">Time: 06:00 PM – 11:00 PM (1800 LT - 2300 LT)</div>
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Hotel+Greencourt+Homagama', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group md:order-1"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Hotel%20Greencourt%20Homagama&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-[#fdfaf5]/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[0.5px] border-[#d4af37]/40 flex flex-col items-center pt-4 pb-12 px-6 md:px-10"
                  >
                    {/* Premium inner frame */}
                    <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#d4af37]/20 pointer-events-none" />

                    <div className="w-full flex flex-col items-center mt-6 relative z-10 px-2 md:px-6">


                      <div className="flex items-center justify-center gap-4 w-full mb-8">
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                        <h3 className="font-alex text-5xl md:text-7xl bg-gradient-to-r from-[#b48c36] via-[#ebd197] to-[#b48c36] bg-clip-text text-transparent whitespace-nowrap leading-[0.8] drop-shadow-sm px-2">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                      </div>

                      <form className="w-full space-y-8 text-left max-w-sm mt-4" onSubmit={handleRSVPSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="M.................................................."
                            value={rsvpData.name}
                            onChange={(e) => {
                              setSubmitted((prev) => ({ ...prev, rsvp: false }));
                              setRsvpData((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>

                        <div className="space-y-5 pt-6">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Will you attend?
                          </label>

                          <div className="flex flex-col gap-3 font-serif italic text-lg md:text-xl text-slate-700">
                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpData.attending === "yes" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpData.attending === "yes" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpData.attending === "yes"} onChange={() => { setSubmitted((prev) => ({ ...prev, rsvp: false })); setRsvpData((prev) => ({ ...prev, attending: "yes" })); }} />
                              <span>Delightfully accepts</span>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpData.attending === "no" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpData.attending === "no" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpData.attending === "no"} onChange={() => { setSubmitted((prev) => ({ ...prev, rsvp: false })); setRsvpData((prev) => ({ ...prev, attending: "no" })); }} />
                              <span>Regretfully declines</span>
                            </label>
                          </div>
                        </div>

                        {rsvpData.attending === "yes" && (
                          <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpData.guests}
                                onChange={(e) => {
                                  setSubmitted((prev) => ({ ...prev, rsvp: false }));
                                  setRsvpData((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {submitted.rsvp && (
                          <p className="text-[10px] text-center font-semibold tracking-widest uppercase mt-4 text-emerald-700">
                            Thank you! RSVP sent successfully.
                          </p>
                        )}

                        <div className="pt-8">
                          <button
                            type="submit"
                            disabled={isSubmitting.rsvp}
                            className="w-full border-[0.5px] border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-white py-4 rounded-sm font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] uppercase disabled:opacity-50"
                          >
                            {isSubmitting.rsvp ? "SENDING..." : "CONFIRM ATTENDANCE"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#faf9f6]">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <InviteImage src={mandalaImage} alt="" className="absolute top-0 right-0 w-[40vw] max-w-[500px] opacity-[0.04] mix-blend-multiply translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <InviteImage src={mandalaImage} alt="" className="absolute bottom-16 left-1/2 w-[38vw] max-w-[360px] opacity-[0.08] mix-blend-multiply -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100/50 mb-8 mt-4 shadow-sm border border-theme-200/50">
                      <Sparkles className="w-8 h-8 text-theme-500" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-800 mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-theme-400 to-transparent mb-8" />

                    <p className="text-stone-500 text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-wide px-4">
                      Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Premium Wishing Form */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-100/50 rounded-tr-[4rem] rounded-bl-[4rem] relative group">
                      {/* Decorative internal lines */}
                      <div className="absolute inset-2 md:inset-4 border-[0.5px] border-theme-200/50 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/80" />

                      {submitted.wish ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 flex flex-col items-center gap-6 relative z-10"
                        >
                          <div className="w-16 h-16 bg-theme-600 rounded-full flex items-center justify-center text-white text-2xl">✓</div>
                          <h3 className="font-playball text-4xl text-theme-900">Sweet Wishes Received!</h3>
                          <p className="text-stone-500 font-light tracking-wide text-sm">Thank you for your beautiful message.</p>
                        </motion.div>
                      ) : (
                        <form className="space-y-8 text-left relative z-10" onSubmit={handleWishSubmit}>
                          <div className="space-y-3">
                            <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Name</label>
                            <input
                              type="text"
                              required
                              value={wishData.name}
                              onChange={(e) => setWishData({ ...wishData, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-t-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Message</label>
                            <textarea
                              rows={4}
                              required
                              value={wishData.message}
                              onChange={(e) => setWishData({ ...wishData, message: e.target.value })}
                              placeholder="Wishing you a lifetime of happiness..."
                              className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide resize-none rounded-t-lg"
                            />
                          </div>
                          <div className="pt-6 flex justify-center">
                            <button
                              type="submit"
                              disabled={isSubmitting.wish}
                              className={`bg-theme-800 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-300 group/btn inline-flex items-center gap-4 ${isSubmitting.wish ? "opacity-50 cursor-not-allowed" : "hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20"}`}
                            >
                              <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                              {isSubmitting.wish ? "Sending Love..." : "Send Wishes"}
                              <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="mt-32 md:mt-48 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="font-cinzel text-sm md:text-lg text-stone-600 text-center px-4 leading-relaxed max-w-lg mx-auto relative z-10 mb-2 italic">
                        You're invited not just as a guest,<br />
                        but as someone dear to our hearts.
                      </p>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#faf9f6] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm mt-4">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Praveen & Nipuni</h3>

                      <motion.img
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        src={mandalaImage}
                        alt=""
                        className="relative z-10 mt-8 w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-multiply drop-shadow-[0_12px_24px_rgba(212,175,55,0.2)] mandala-gold-filter"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>



              {/* Footer */}
              <footer className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-4">
                <div className="flex flex-col items-center gap-2 mb-6 text-stone-500 font-cinzel tracking-widest text-xs md:text-sm">
                  <p className="uppercase">Shimi / Manendra <span className="hidden md:inline mx-2">|</span><br className="md:hidden block my-1" /> <a href="tel:+94703450264" className="hover:text-theme-600 transition-colors">+94 70 345 0264</a></p>
                </div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                  © 2026 Praveen & Nipuni. <span className="hidden md:inline">|</span><br className="md:hidden block mt-2" /> All rights reserved.
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #faf9f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}

function AdminPage() {
  const [prefix, setPrefix] = useState("Mr.");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const guestName = `${prefix} ${name}`.trim();
  const baseUrl = window.location.origin;
  const generatedLink = `${baseUrl}/?to=${encodeURIComponent(guestName)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 relative overflow-hidden">
      <MandalaFrame minimal />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[2rem] border border-theme-200 shadow-xl relative z-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-theme-100 rounded-2xl text-theme-600">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl text-stone-800">Link Generator</h1>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Personalized Invitation</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-stone-50 border border-theme-100 p-4 rounded-xl focus:outline-none focus:border-theme-400 font-cinzel text-sm"
              >
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Mr. & Mrs.</option>
                <option>Dr.</option>
                <option>Family</option>
              </select>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Guest Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter guest name"
                className="w-full bg-stone-50 border border-theme-100 p-4 rounded-xl focus:outline-none focus:border-theme-400 font-cinzel"
              />
            </div>
          </div>

          <div className="p-6 bg-theme-50 rounded-2xl border border-theme-100 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase font-bold text-theme-600 tracking-widest">Live Preview</p>
              <span className="text-[8px] uppercase text-stone-400">Appearance on Front Screen</span>
            </div>
            <div className="text-center space-y-2 py-4 bg-white/50 rounded-xl border border-white/80">
              <p className="text-[10px] text-theme-700 font-bold uppercase tracking-[0.4em]">Specially For You</p>
              <h3 className="font-cinzel text-xl text-stone-800">{guestName || "Guest Name"}</h3>
              <p className="text-[9px] text-stone-500 tracking-[0.2em] uppercase font-light">Are Cordially Invited</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Unique Invitation Link</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={name ? generatedLink : "Enter name above..."}
                className="flex-1 bg-stone-50 border border-theme-100 p-4 rounded-xl text-xs text-stone-500 overflow-hidden text-ellipsis"
              />
              <button
                onClick={handleCopy}
                disabled={!name}
                className={`p-4 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-theme-800 text-white hover:bg-theme-900 disabled:opacity-50'}`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => window.open(generatedLink, '_blank')}
              disabled={!name}
              className="flex-1 border border-theme-300 text-theme-700 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-theme-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" />
              Preview Page
            </button>
            <Link
              to="/"
              className="flex-1 bg-white border border-stone-200 text-stone-500 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-all flex items-center justify-center"
            >
              Back to site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WeddingInvitation />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

// End of file
