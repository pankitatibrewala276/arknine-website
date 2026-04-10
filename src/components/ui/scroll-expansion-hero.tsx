'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  titleLines?: string[];
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  titleLines = [],
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Use vw-based sizing so it scales on all screens
  const startW = isMobileState ? 70 : 24;  // vw
  const endW = 100;                         // vw
  const startH = isMobileState ? 50 : 50;  // vh
  const endH = isMobileState ? 70 : 85;    // vh

  const mediaWidthVw = startW + scrollProgress * (endW - startW);
  const mediaHeightVh = startH + scrollProgress * (endH - startH);

  // Each line gets a different drift direction and speed
  const getLineTransform = (index: number) => {
    const directions = [-1, 1, -0.6, 0.8, -1.2];
    const dir = directions[index % directions.length];
    const drift = scrollProgress * (isMobileState ? 80 : 100) * dir;
    return `translateX(${drift}vw)`;
  };

  // Scroll hint fades out as user starts scrolling
  const hintOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden -mt-[60px]'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {/* Background image — fades out as media expands */}
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-full h-full object-cover'
              priority
            />
            <div className='absolute inset-0 bg-[var(--color-charcoal)]/40' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              {/* Expanding media container */}
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none'
                style={{
                  width: `${mediaWidthVw}vw`,
                  height: `${mediaHeightVh}vh`,
                  maxWidth: '100vw',
                  maxHeight: '90vh',
                  borderRadius: `${Math.max(0, 16 - scrollProgress * 16)}px`,
                  boxShadow: `0px ${8 + scrollProgress * 20}px ${40 + scrollProgress * 40}px rgba(22, 22, 26, ${0.15 + scrollProgress * 0.2})`,
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full'
                        style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-[var(--color-charcoal)]/30'
                        style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: Math.max(0, 0.4 - scrollProgress * 0.35) }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover'
                        style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-[var(--color-charcoal)]/30'
                        style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: Math.max(0, 0.4 - scrollProgress * 0.35) }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt='Media content'
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover'
                      style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                    />
                    <motion.div
                      className='absolute inset-0 bg-[var(--color-charcoal)]/50'
                      style={{ borderRadius: `${Math.max(4, 16 - scrollProgress * 12)}px` }}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              {/* Title lines — each drifts in a different direction */}
              <div
                className={`flex items-center justify-center text-center gap-2 md:gap-3 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className='block text-2xl sm:text-3xl md:text-5xl lg:text-[4rem] font-normal uppercase font-[family-name:var(--font-display)] text-[var(--color-off-white)] transition-none leading-[1.25] tracking-[0.01em]'
                    style={{ transform: getLineTransform(i) }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              {/* Scroll hint — fixed at bottom, fades on scroll */}
              <div
                className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-none'
                style={{ opacity: hintOpacity }}
              >
                {scrollToExpand && (
                  <p className='text-[var(--color-mist)] text-sm font-medium tracking-wide uppercase font-[family-name:var(--font-body)]'>
                    {scrollToExpand}
                  </p>
                )}
                <div className='scroll-hint-arrow' aria-hidden='true'>
                  <svg width='16' height='24' viewBox='0 0 16 24' fill='none' stroke='var(--color-mist)' strokeWidth='1.5' strokeLinecap='round'>
                    <path d='M8 0v20M1 15l7 7 7-7' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Children content — reveals after full expansion */}
            <motion.section
              className='flex flex-col w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
