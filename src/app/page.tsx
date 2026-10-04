"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations";
import { FloatingHearts } from "@/components/floating-hearts";
import { SectionDivider } from "@/components/section-divider";
import { FoldCard, FoldSection } from "@/components/fold-card";
import { ImageModal } from "@/components/image-modal";
import Image from "next/image";



/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR TIMELINE HERE                    ║
  ║  Each object = one card on the page.            ║
  ║  Change title, time, date, description freely.  ║
  ╚══════════════════════════════════════════════════╝
*/

interface TimelineItem {
  emoji: string;
  time: string;
  date: string;
  title: string;
  description: string;
  image: string | null;
}

const TIMELINE: TimelineItem[] = [
  {
    emoji: "💬",
    time: "2:06 PM",
    date: "12 Aug 2026",
    title: "The First Message",
    description:
      "This was the moment it all began. The time you reached out to me, the first spark of our story. This was when you introduced yourself as 'rora, danewin =P' then i told you to save me back as your boyfriend as a joke.",
    image: "/images/first.png",
  },
  {
    emoji: "💘",
    time: "6:14 PM",
    date: "04 Sept 2026",
    title: "The Confession",
    description:
      "Actually i was quite nervous receiving your confession, but i was happy that you confessed to me. I was happy that you liked me, and i was happy that it was you. If we turn back time, i would confess to you first.",
    image: "/images/ohyulhaum.jpg",
  },
  {
    emoji: "💍",
    time: "12:56 PM",
    date: "05 Sept 2026",
    title: "The Start Of Our Journey",
    description:
      "Literally the next day after your confession, we started our journey together. Though i was very nervous getting into this space but i really did want to meet you at the same eye level.",
    image: "/images/anime1.jpg",
  },
  {
    emoji: "💕",
    time: "6:54 PM",
    date: "10 Sept 2026",
    title: "First \"I Love You\"",
    description:
      "Well i thinkk this was the first time we said 'I love you' to each other. I remember we did not exchange ILY for a few days because we were trying to get to know each other first but then the ILY's came naturally when both of us knew that we loved each other for who we are and personally i don't say ILY to people i'm not sure of but i knew what i had for you was already real by then.",
    image: "/images/anime2.jpg",
  },
  {
    emoji: "🦋",
    time: "7:00 PM",
    date: "13 Sept 2026",
    title: "Getting to Know Each Other",
    description:
      "I have a starred message of this day where the both of us was just sharing about our love for each other grows with time and admitting that there is no such thing as a perfect couple but we were determined to choose each other even when time gets a litttle rough or even when time is stealing us away from each other.",
    image: "/images/anime3.jpg",
  },
  {
    emoji: "🧸",
    time: "00:00 AM",
    date: "05 Oct 2026",
    title: "Making It Official ♥",
    description:
      "If you noticed, the date is today. Exactly one month ago, we started exploring this journey together.",
    image: "/images/anime4.jpg",
  },
];

/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR "YOU & ME" WORDS HERE            ║
  ║  These float around the centre piece.           ║
  ╚══════════════════════════════════════════════════╝
*/
const FLOATING_WORDS = [
  "forever",
  "us",
  "home",
  "dream",
  "always",
  "together",
  "yours",
  "heart",
];

export default function Home() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
        setMusicError(null);
      } catch {
        setMusicError("Music could not be played. Check that /music/song.mp3 exists.");
      }
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  }

  return (
    <main className="relative overflow-x-hidden">
      <FloatingHearts />
      <audio
        ref={audioRef}
        src="/music/song.mp3"
        loop
        preload="none"
        onError={() => {
          setIsMusicPlaying(false);
          setMusicError("Music could not be loaded. Check that /music/song.mp3 exists.");
        }}
      />
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={isMusicPlaying}
          className="rounded-full border border-orchid/30 bg-[#0e0b16]/90 px-4 py-2 text-sm text-plum shadow-lg backdrop-blur transition hover:border-orchid/60 hover:bg-orchid/20"
        >
          {isMusicPlaying ? "Pause music ♪" : "Play music ♫"}
        </button>
        {musicError && (
          <p role="alert" className="mt-2 max-w-56 rounded-lg bg-[#0e0b16]/90 p-2 text-xs text-white/80">
            {musicError}
          </p>
        )}
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6"
      >
        {/* Gradient orbs — smaller on mobile */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-orchid/20 blur-[80px] sm:h-96 sm:w-96 sm:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-plum/15 blur-[60px] sm:h-80 sm:w-80 sm:blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-powder/10 blur-[50px] sm:h-64 sm:w-64 sm:blur-[80px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10"
        >
          <Reveal variant="fadeDown" duration={0.8}>
            <motion.p
              className="text-xs font-medium tracking-[0.3em] uppercase text-plum sm:text-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Our First Monthsary
            </motion.p>
          </Reveal>

          <Reveal variant="scaleUp" delay={0.2} duration={1}>
            <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight sm:mt-6 sm:text-8xl md:text-9xl">
              <motion.span
                className="bg-gradient-to-r from-plum via-saffron to-powder bg-[length:300%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Laelia Danewin
              </motion.span>
            </h1>
          </Reveal>

          <Reveal variant="blur" delay={0.5}>
            <p className="mx-auto mt-4 max-w-sm font-signature text-xl text-plum/70 sm:mt-6 sm:max-w-lg sm:text-2xl md:text-3xl">
              the jukyung to my suho
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.7}>
            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-white/50 sm:mt-6 sm:max-w-md sm:text-sm">
              Just a walk down memory lane, to celebrate the day we met and the journey we&apos;ve started together. A little corner of the internet, just for us.
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.9}>
            <motion.a
              href="#our-story"
              className="animate-pulse-glow group mt-8 inline-flex items-center gap-2 rounded-full border border-orchid/30 bg-orchid/10 px-6 py-2.5 text-xs font-medium text-plum backdrop-blur-sm transition-all duration-300 hover:border-orchid/60 hover:bg-orchid/20 sm:mt-10 sm:px-8 sm:py-3 sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Story
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.a>
          </Reveal>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e0b16] to-transparent sm:h-32" />
      </section>

      {/* ═══════════ TIMELINE — folding cards ═══════════ */}
      <section id="our-story" className="relative px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="fadeUp">
            <h2 className="text-center font-heading text-3xl tracking-wide text-plum sm:text-4xl md:text-5xl">
              <motion.span
                whileInView={{ backgroundSize: ["0% 2px", "100% 2px"] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FFAAEA, #98C1D9)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                  backgroundSize: "0% 2px",
                  paddingBottom: 4,
                }}
              >
                Our Story
              </motion.span>
            </h2>
            <p className="mt-3 text-center text-xs text-white/40 sm:mt-4 sm:text-sm">
              Two crackheads. Friends to Lovers. A cute story.
            </p>
          </Reveal>

          {/* Timeline with fold-in cards */}
          <div className="relative mt-8 sm:mt-20">
            {/* Vertical line — desktop only */}
            <motion.div
              className="absolute left-1/2 top-0 hidden h-full w-px sm:block"
              style={{ background: "linear-gradient(to bottom, rgba(99,29,118,0.6), rgba(255,170,234,0.3), transparent)", transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {TIMELINE.map((item, i) => (
              <FoldCard key={i} index={i} className="relative mb-5 last:mb-0 sm:mb-16">
                <div
                  className={`flex items-start sm:gap-16 ${
                    i % 2 === 0
                      ? "sm:flex-row"
                      : "sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  {/* Dot on timeline — desktop only */}
                  <div className="absolute left-1/2 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex">
                    <motion.span
                      className="absolute h-4 w-4 rounded-full border-2 border-orchid bg-[#0e0b16]"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                    <motion.span
                      className="absolute h-2 w-2 rounded-full bg-plum"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:border-orchid/20 hover:bg-white/[0.06] sm:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "" : "sm:ml-auto"
                    }`}
                  >
                    {/* Text content */}
                    <div className="p-4 sm:p-6">
                      <div
                        className={`flex items-center gap-2 sm:gap-3 ${
                          i % 2 !== 0 ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <motion.span
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-orchid/20 text-base sm:h-8 sm:w-8"
                          whileInView={{ rotate: [0, 10, -10, 0] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                          {item.emoji}
                        </motion.span>
                        <div className="flex items-center gap-2">
                          <time className="text-[10px] font-medium tracking-wider text-saffron/70 uppercase sm:text-xs">
                            {item.time}
                          </time>
                          <span className="text-[9px] text-white/20 sm:text-[10px]">•</span>
                          <span className="text-[9px] text-white/25 sm:text-[10px]">
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50 sm:mt-2 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Chat screenshot — tap to open modal */}
                    {item.image && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: item.image!, alt: item.title })}
                        className="block w-full border-t border-white/5 active:opacity-80"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full object-cover"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </FoldCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ YOU & ME ═══════════ */}
      <FoldSection className="relative px-4 py-16 sm:px-6 sm:py-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orchid/8 blur-[80px] sm:h-96 sm:w-96 sm:blur-[120px]" />
          <div className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-tomato/5 blur-[60px] sm:h-48 sm:w-48" />
          <div className="absolute right-1/3 bottom-1/3 h-32 w-32 rounded-full bg-plum/5 blur-[60px] sm:h-48 sm:w-48" />
        </div>

        <div className="relative mx-auto max-w-lg text-center">
          {/* Floating words orbit */}
          <div className="relative mx-auto mb-8 h-48 w-48 sm:mb-12 sm:h-64 sm:w-64">
            {FLOATING_WORDS.map((word, i) => {
              const angle = (360 / FLOATING_WORDS.length) * i;
              const radius = 38;
              return (
                <motion.span
                  key={word}
                  className="absolute left-1/2 top-1/2 font-signature text-xs text-white/15 sm:text-sm"
                  style={{
                    x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * radius}%)`,
                    y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * radius}%)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.35, 0.1],
                    scale: [0.9, 1.05, 0.9],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}

            {/* Centre heart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-5xl sm:text-6xl"
                animate={{
                  scale: [1, 1.15, 1],
                  filter: [
                    "drop-shadow(0 0 8px rgba(255,170,234,0.3))",
                    "drop-shadow(0 0 20px rgba(255,170,234,0.6))",
                    "drop-shadow(0 0 8px rgba(255,170,234,0.3))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💕
              </motion.span>
            </div>
          </div>

          {/* Main text */}
          <Reveal variant="fadeUp">
            <h2 className="font-heading text-3xl tracking-wide text-plum sm:text-4xl md:text-5xl">
              <motion.span
                whileInView={{ backgroundSize: ["0% 2px", "100% 2px"] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FB4D3D, #FFAAEA)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                  backgroundSize: "0% 2px",
                  paddingBottom: 4,
                }}
              >
                Rafe & Danewin
              </motion.span>
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.15}>
            <p className="mt-4 font-signature text-lg text-white/30 sm:mt-5 sm:text-xl">
              to the most beautiful girl in the world
            </p>
          </Reveal>

          {/* Verse */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                I don&apos;t know what tomorrow looks like,
              </p>
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                but I know who I want next to me when it comes.
              </p>
              <motion.p
                className="pt-2 font-signature text-lg text-plum/60 sm:text-xl"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                it&apos;s you. it was always you.
              </motion.p>
            </div>
          </Reveal>

          {/* Day 1 badge */}
          <Reveal variant="scaleUp" delay={0.5}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-5 py-2.5 sm:mt-10 sm:px-6 sm:py-3">
              <motion.span
                className="text-sm text-saffron/70 sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
              <span className="text-xs tracking-widest text-white/40 uppercase sm:text-sm">
                Day 1 of Forever
              </span>
              <motion.span
                className="text-sm text-saffron/70 sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ✦
              </motion.span>
            </div>
          </Reveal>
        </div>
      </FoldSection>

      <SectionDivider />

      {/* ═══════════ LETTER — folds open ═══════════ */}
      <FoldSection className="px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:rounded-3xl sm:p-10 md:p-14"
            whileInView={{
              boxShadow: [
                "0 0 0px rgba(99,29,118,0)",
                "0 0 60px rgba(99,29,118,0.15)",
              ],
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Animated border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent sm:rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,170,234,0.1), transparent) border-box",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner decorations */}
            <motion.div
              className="absolute right-4 top-4 text-2xl text-orchid/10 sm:right-6 sm:top-6 sm:text-4xl"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-xl text-plum/10 sm:bottom-6 sm:left-6 sm:text-3xl"
              animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute left-4 top-4 text-lg text-saffron/5 sm:left-6 sm:top-6 sm:text-2xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✶
            </motion.div>

            <Reveal variant="fadeUp">
              <p className="font-signature text-2xl text-plum sm:text-3xl md:text-4xl">
                Dear Danewin,
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.2}>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/60 sm:mt-6 sm:space-y-4 sm:text-sm">
                <p>
                  I'm writing this letter to you because I want to be honest about my feelings. I want to tell you how much you mean to me, and how much I care about you. I have known you long enough to notice the hard working person you are that drew me to you. You are so much more than a person with a kind heart to me, you are honestly beyond exquisite. It would be such a shame to lose somebody as compassionate as you who is always trying her best to make the people around her happy. I want to be that person for you, and I want to be the one who makes you feel loved and appreciated every single day.
                </p>
                <p>
                  You are a scent of comfort with a warmth of an angel. A beauty that speaks with her soul. A woman who is so much more than what meets the eye. Softer than the petals of a flower, yet stronger than the roots that holds it in place. A day without the sun is a day without you. A life without you is a life without love. Come lean on me, and I will hold you gently.
                </p>
                <p>
                  There is nothing more that I want than to see you thrive as a person that you want to become. I want to create a relationship where we can both help each other out physically and mentally. I want you to be free and explore the world knowing that you have somebody who supports your dreams and visions. While I am also building myself to be a better person than yesterday and be able to hold onto you when I need to. I want a future where the both of us can sit back and realize that what we have created together is more than just a romance relationship but a partnership that is built on trust, honesty, and love. You are an extraordinary woman, and I know that you are capable of so many things. I am here to support that dream.
                </p>
                <p>
                  And finally, I love you. I love you for who you are, and I love you for who you are becoming. I love you for the way you make me feel, and I love you for the way you make me want to be a better person. I love you for the way you make me laugh, and I love you for the way you make me cry. I love you for the way you make me feel alive, and I love you for the way you make me feel whole. I love you for the way you make me feel loved, and I love you for the way you make me feel like I am enough. I love you for the way you make me feel like I am home.
                </p>
                <p className="text-white/80">
                  Rafe || 05 Oct 2026
                </p>
              </div>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.4}>
              <p className="mt-6 font-signature text-xl text-saffron/60 sm:mt-8 sm:text-2xl">
                Forever yours && Forever Mine ♥
              </p>
            </Reveal>
          </motion.div>
        </div>
      </FoldSection>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative border-t border-white/5 py-12 text-center sm:py-16">
        <Reveal variant="fadeUp">
          <motion.p
            className="font-signature text-xl text-plum/40 sm:text-2xl"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
          >
            Made with{" "}
            <motion.span
              className="inline-block text-tomato/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ♥
            </motion.span>
            {" "}for someone special
          </motion.p>
          <p className="mt-3 text-xs text-white/30 sm:mt-4 sm:text-sm">
            your little corner of the internet
          </p>
          <p className="mt-2 text-[10px] text-white/15 sm:text-xs">
            [05 Oct 2026] ♥ the night everything began
          </p>
        </Reveal>
      </footer>
      {/* Image lightbox modal */}
      <ImageModal
        src={modalImage?.src ?? null}
        alt={modalImage?.alt ?? ""}
        onClose={() => setModalImage(null)}
      />
    </main>
  );
}
