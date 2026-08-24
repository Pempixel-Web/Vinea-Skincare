import { useEffect, useRef, useState } from 'react';
import { UGC_VIDEOS, IMAGES, ANALYTICS_EVENTS } from '../config/site';
import { track } from '../lib/analytics';
import './UGCSection.css';

// const FALLBACK_VIDEO_SRC = '/videos/scalp-application.mp4';

const PLACEHOLDER_SLOTS = [
  {
    id: 'slot-1',
    src: 'https://res.cloudinary.com/hylynzpo/video/upload/v1787582234/ugc001.mp4',
    poster: '/images/ugc-1-poster.png',
    name: '@ada.wears.locs',
    description: 'Nightly scalp routine, two weeks in \u2014 one drop per section.',
  },
  {
    id: 'https://res.cloudinary.com/hylynzpo/video/upload/v1787582158/ugc002.mp4',
    src: '/videos/ugc002.mp4.mp4',
    poster: '/images/ugc-2-poster.png',
    name: '@keisha.curls',
    description: 'How I actually apply Vinea before bed.',
  },
  {
    id: 'slot-3',
    src: 'https://res.cloudinary.com/hylynzpo/video/upload/v1787582239/ugc003.mp4',
    poster: '/images/ugc-3-poster.png',
    name: '@marcus.fades',
    description: 'First impressions after unboxing \u2014 no filter.',
  },
  {
    id: 'slot-4',
    src: 'https://res.cloudinary.com/hylynzpo/video/upload/v1787582265/ugc004.mp4',
    poster: '/images/ugc-4-poster.png',
    name: '@amara.glow',
    description: '3-week scalp check-in, morning routine.',
  },
  {
    id: 'slot-5',
    src: 'https://res.cloudinary.com/hylynzpo/video/upload/v1787582156/ugc005.mp4',
    poster: '/images/ugc-5-poster.png',
    name: '@joel.grooms',
    description: 'Part, drop, massage \u2014 my Sunday reset.',
  },
];

  function StarRating() {
  return (
    <div className="ugc__rating" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="ugc__star" aria-hidden="true">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.9l-5.18 2.54.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function UGCSection() {
  const hasVideos = UGC_VIDEOS.length > 0;
  const items = hasVideos
    ? UGC_VIDEOS.map((v) => ({
        id: v.id,
        src: v.src,
        poster: v.poster,
        name: v.name || 'Vinea community',
        description: v.description || v.caption || '',
      }))
    : PLACEHOLDER_SLOTS;

  // The track renders the item list twice back-to-back so the marquee can
  // scroll continuously and loop seamlessly, regardless of viewport width
  // or how many real videos end up in UGC_VIDEOS.
  const loopItems = [...items, ...items];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playingKey, setPlayingKey] = useState(null);
  const [useTransition, setUseTransition] = useState(false);

  const posRef = useRef(0); // current horizontal offset in px
  const setWidthRef = useRef(0); // width of ONE full set of items (px)
  const dragState = useRef({ startX: 0, startPos: 0, moved: false });
  const videoRefs = useRef({});

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
    }
  };

  // Measure how wide a single set of items is, so we know when to loop.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll('.ugc__card');
      if (cards.length < items.length) return;
      const first = cards[0];
      const lastOfFirstSet = cards[items.length - 1];
      const gap = 16;
      setWidthRef.current =
        lastOfFirstSet.offsetLeft + lastOfFirstSet.offsetWidth - first.offsetLeft + gap;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);

  // Continuous auto-scroll marquee, running on both desktop and phone.
  // Pauses only while the user is hovering (desktop), dragging, or a video
  // is playing.
  useEffect(() => {
    let frameId;
    const speed = 0.7; // px per frame, drifts left
    const step = () => {
      if (!isPaused && !isDragging && setWidthRef.current > 0) {
        posRef.current += speed;
        if (posRef.current >= setWidthRef.current) {
          posRef.current -= setWidthRef.current;
        }
        applyTransform();
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setUseTransition(false);
    dragState.current = { startX: e.clientX, startPos: posRef.current, moved: false };
    viewportRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    const width = setWidthRef.current || 1;
    let next = dragState.current.startPos - dx;
    next = ((next % width) + width) % width;
    posRef.current = next;
    applyTransform();
  };

  const endDrag = () => setIsDragging(false);

  const nudge = (direction) => {
    const width = setWidthRef.current;
    if (!width) return;
    const track = trackRef.current;
    const card = track?.querySelector('.ugc__card');
    const step = card ? card.getBoundingClientRect().width + 16 : 220;
    setUseTransition(true);
    let next = posRef.current + direction * step;
    next = ((next % width) + width) % width;
    posRef.current = next;
    applyTransform();
    window.setTimeout(() => setUseTransition(false), 380);
  };

  const togglePlay = (key) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    const videoEl = videoRefs.current[key];
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      setPlayingKey(key);
      setIsPaused(true);
      track(ANALYTICS_EVENTS.UGC_INTERACTION, { videoId: key });
    } else {
      videoEl.pause();
      setPlayingKey(null);
      setIsPaused(false);
    }
  };

  return (
    <section className="section ugc" id="see-it-in-use">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">See it in a real routine</span>
          <h2 className="h-display-2">See how Vinea fits into a real scalp care routine.</h2>
          <p className="lede">
            As we get closer to launch, this is where creator videos of the real Vinea routine
            will live {"\u2014"} filmed the way it{"\u2019"}s actually used, not staged as a commercial.
          </p>
        </div>

        <div
          className="ugc__carousel-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!playingKey) setIsPaused(false);
            endDrag();
          }}
        >
          <div
            className={`ugc__viewport${isDragging ? ' is-dragging' : ''}`}
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={`ugc__track${useTransition ? ' has-transition' : ''}`}
              ref={trackRef}
            >
              {loopItems.map((item, index) => {
                const key = `${item.id}::${index}`;
                const isPlaying = playingKey === key;
                return (
                  <div className="ugc__card" key={key}>
                    <div className="ugc__media" onClick={() => togglePlay(key)}>
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[key] = el;
                        }}
                        src={item.src}
                        poster={item.poster}
                        preload="none"
                        playsInline
                        onPause={() => {
                          if (isPlaying) {
                            setPlayingKey(null);
                            setIsPaused(false);
                          }
                        }}
                        onEnded={() => {
                          setPlayingKey(null);
                          setIsPaused(false);
                        }}
                      />

                      <StarRating />

                      <button
                        type="button"
                        className={`ugc__play-btn${isPlaying ? ' is-hidden' : ''}`}
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(key);
                        }}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5.5v13l11-6.5-11-6.5z" />
                        </svg>
                      </button>

                      <div className="ugc__overlay">
                        <p className="ugc__name">{item.name}</p>
                        {item.description && <p className="ugc__desc">{item.description}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ugc__nav">
            <button
              type="button"
              className="ugc__nav-btn"
              aria-label="Scroll videos left"
              onClick={() => nudge(-1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="ugc__nav-btn"
              aria-label="Scroll videos right"
              onClick={() => nudge(1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}



// import { useEffect, useRef, useState } from 'react';
// import { UGC_VIDEOS, IMAGES, ANALYTICS_EVENTS } from '../config/site';
// import { track } from '../lib/analytics';
// import './UGCSection.css';

// const FALLBACK_VIDEO_SRC = '/videos/scalp-application.mp4.mp4';

// const PLACEHOLDER_SLOTS = [
//   {
//     id: 'slot-1',
//     src: FALLBACK_VIDEO_SRC,
//     poster: IMAGES.ugcCreatorFemale,
//     name: '@ada.wears.locs',
//     description: 'Nightly scalp routine, two weeks in \u2014 one drop per section.',
//   },
//   {
//     id: 'slot-2',
//     src: FALLBACK_VIDEO_SRC,
//     poster: IMAGES.scalpApplication,
//     name: '@keisha.curls',
//     description: 'How I actually apply Vinea before bed.',
//   },
//   {
//     id: 'slot-3',
//     src: FALLBACK_VIDEO_SRC,
//     poster: IMAGES.ugcCreatorMale,
//     name: '@marcus.fades',
//     description: 'First impressions after unboxing \u2014 no filter.',
//   },
//   {
//     id: 'slot-4',
//     src: FALLBACK_VIDEO_SRC,
//     poster: IMAGES.productCloseUp,
//     name: '@amara.glow',
//     description: '3-week scalp check-in, morning routine.',
//   },
//   {
//     id: 'slot-5',
//     src: FALLBACK_VIDEO_SRC,
//     poster: IMAGES.ingredientTexture,
//     name: '@joel.grooms',
//     description: 'Part, drop, massage \u2014 my Sunday reset.',
//   },
// ];

// function StarRating() {
//   return (
//     <div className="ugc__rating" aria-label="5 out of 5 stars">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <svg key={i} viewBox="0 0 20 20" className="ugc__star" aria-hidden="true">
//           <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.9l-5.18 2.54.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

// export default function UGCSection() {
//   const hasVideos = UGC_VIDEOS.length > 0;
//   const items = hasVideos
//     ? UGC_VIDEOS.map((v) => ({
//         id: v.id,
//         src: v.src,
//         poster: v.poster,
//         name: v.name || 'Vinea community',
//         description: v.description || v.caption || '',
//       }))
//     : PLACEHOLDER_SLOTS;

//   // The track renders the item list twice back-to-back so the marquee can
//   // scroll continuously and loop seamlessly, regardless of viewport width
//   // or how many real videos end up in UGC_VIDEOS.
//   const loopItems = [...items, ...items];

//   const viewportRef = useRef(null);
//   const trackRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [playingKey, setPlayingKey] = useState(null);
//   const [useTransition, setUseTransition] = useState(false);

//   const posRef = useRef(0); // current horizontal offset in px
//   const setWidthRef = useRef(0); // width of ONE full set of items (px)
//   const dragState = useRef({ startX: 0, startPos: 0, moved: false });
//   const videoRefs = useRef({});

//   const applyTransform = () => {
//     if (trackRef.current) {
//       trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
//     }
//   };

//   // Measure how wide a single set of items is, so we know when to loop.
//   useEffect(() => {
//     const measure = () => {
//       const track = trackRef.current;
//       if (!track) return;
//       const cards = track.querySelectorAll('.ugc__card');
//       if (cards.length < items.length) return;
//       const first = cards[0];
//       const lastOfFirstSet = cards[items.length - 1];
//       const gap = 16;
//       setWidthRef.current =
//         lastOfFirstSet.offsetLeft + lastOfFirstSet.offsetWidth - first.offsetLeft + gap;
//     };
//     measure();
//     window.addEventListener('resize', measure);
//     return () => window.removeEventListener('resize', measure);
//   }, [items.length]);

//   // Continuous auto-scroll marquee, running on both desktop and phone.
//   // Pauses only while the user is hovering (desktop), dragging, or a video
//   // is playing.
//   useEffect(() => {
//     let frameId;
//     const speed = 0.7; // px per frame, drifts left
//     const step = () => {
//       if (!isPaused && !isDragging && setWidthRef.current > 0) {
//         posRef.current += speed;
//         if (posRef.current >= setWidthRef.current) {
//           posRef.current -= setWidthRef.current;
//         }
//         applyTransform();
//       }
//       frameId = requestAnimationFrame(step);
//     };
//     frameId = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(frameId);
//   }, [isPaused, isDragging]);

//   const handlePointerDown = (e) => {
//     setIsDragging(true);
//     setUseTransition(false);
//     dragState.current = { startX: e.clientX, startPos: posRef.current, moved: false };
//     viewportRef.current?.setPointerCapture?.(e.pointerId);
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging) return;
//     const dx = e.clientX - dragState.current.startX;
//     if (Math.abs(dx) > 3) dragState.current.moved = true;
//     const width = setWidthRef.current || 1;
//     let next = dragState.current.startPos - dx;
//     next = ((next % width) + width) % width;
//     posRef.current = next;
//     applyTransform();
//   };

//   const endDrag = () => setIsDragging(false);

//   const nudge = (direction) => {
//     const width = setWidthRef.current;
//     if (!width) return;
//     const track = trackRef.current;
//     const card = track?.querySelector('.ugc__card');
//     const step = card ? card.getBoundingClientRect().width + 16 : 220;
//     setUseTransition(true);
//     let next = posRef.current + direction * step;
//     next = ((next % width) + width) % width;
//     posRef.current = next;
//     applyTransform();
//     window.setTimeout(() => setUseTransition(false), 380);
//   };

//   const togglePlay = (key) => {
//     if (dragState.current.moved) {
//       dragState.current.moved = false;
//       return;
//     }
//     const videoEl = videoRefs.current[key];
//     if (!videoEl) return;
//     if (videoEl.paused) {
//       videoEl.play();
//       setPlayingKey(key);
//       setIsPaused(true);
//       track(ANALYTICS_EVENTS.UGC_INTERACTION, { videoId: key });
//     } else {
//       videoEl.pause();
//       setPlayingKey(null);
//       setIsPaused(false);
//     }
//   };

//   return (
//     <section className="section ugc" id="see-it-in-use">
//       <div className="container">
//         <div className="section-head">
//           <span className="eyebrow">See it in a real routine</span>
//           <h2 className="h-display-2">See how Vinea fits into a real scalp care routine.</h2>
//           <p className="lede">
//             As we get closer to launch, this is where creator videos of the real Vinea routine
//             will live {"\u2014"} filmed the way it{"\u2019"}s actually used, not staged as a commercial.
//           </p>
//         </div>

//         <div
//           className="ugc__carousel-wrap"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => {
//             if (!playingKey) setIsPaused(false);
//             endDrag();
//           }}
//         >
//           <div
//             className={`ugc__viewport${isDragging ? ' is-dragging' : ''}`}
//             ref={viewportRef}
//             onPointerDown={handlePointerDown}
//             onPointerMove={handlePointerMove}
//             onPointerUp={endDrag}
//             onPointerCancel={endDrag}
//           >
//             <div
//               className={`ugc__track${useTransition ? ' has-transition' : ''}`}
//               ref={trackRef}
//             >
//               {loopItems.map((item, index) => {
//                 const key = `${item.id}::${index}`;
//                 const isPlaying = playingKey === key;
//                 return (
//                   <div className="ugc__card" key={key}>
//                     <div className="ugc__media" onClick={() => togglePlay(key)}>
//                       <video
//                         ref={(el) => {
//                           if (el) videoRefs.current[key] = el;
//                         }}
//                         src={item.src}
//                         poster={item.poster}
//                         preload="none"
//                         playsInline
//                         onPause={() => {
//                           if (isPlaying) {
//                             setPlayingKey(null);
//                             setIsPaused(false);
//                           }
//                         }}
//                         onEnded={() => {
//                           setPlayingKey(null);
//                           setIsPaused(false);
//                         }}
//                       />

//                       <StarRating />

//                       <button
//                         type="button"
//                         className={`ugc__play-btn${isPlaying ? ' is-hidden' : ''}`}
//                         aria-label={isPlaying ? 'Pause video' : 'Play video'}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           togglePlay(key);
//                         }}
//                       >
//                         <svg viewBox="0 0 24 24" aria-hidden="true">
//                           <path d="M8 5.5v13l11-6.5-11-6.5z" />
//                         </svg>
//                       </button>

//                       <div className="ugc__overlay">
//                         <p className="ugc__name">{item.name}</p>
//                         {item.description && <p className="ugc__desc">{item.description}</p>}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="ugc__nav">
//             <button
//               type="button"
//               className="ugc__nav-btn"
//               aria-label="Scroll videos left"
//               onClick={() => nudge(-1)}
//             >
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M15 18l-6-6 6-6" />
//               </svg>
//             </button>
//             <button
//               type="button"
//               className="ugc__nav-btn"
//               aria-label="Scroll videos right"
//               onClick={() => nudge(1)}
//             >
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 18l6-6-6-6" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {!hasVideos && (
//           <p className="ugc__footnote">
//             Video placeholders {"\u2014"} real creator content will be added here as it{"\u2019"}s produced.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }
