/**
 * Vinea's signature visual: a single line-art dropper releasing one drop
 * onto a parted-scalp diagram — a literal illustration of the product's
 * actual usage instruction ("one drop per section"), used as the page's
 * recurring motif instead of a generic icon or stock photo.
 */

// Image
// export default function DropletMotif({ className = '' }) {
//   return (
//     <img
//       src="/images/scalp-application.jpg"
//       alt="Person applying Vinea Scalp Health & Hair Growth Oil to the scalp"
//       className={`droplet-motif ${className}`}
//     />
//   );
// }

// Video
export default function DropletMotif({ className = "" }) {
  return (
    <video
      className={`droplet-motif ${className}`}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      aria-label="Person applying Vinea Scalp Health & Hair Growth Oil"
    >
      <source src="https://res.cloudinary.com/hylynzpo/video/upload/v1787587048/HeyGen_-_AI_Spokesperson_Video_Creator_6.mp4" type="video/mp4" />
    </video>
  );
}
// export default function DropletMotif({ className = '', animated = true }) {
//   return (
//     <svg
//       viewBox="0 0 200 200"
//       className={`droplet-motif ${className}`}
//       xmlns="http://www.w3.org/2000/svg"
//       role="presentation"
//       aria-hidden="true"
//     >
//       {/* parted scalp / hair sections */}
//       <path d="M20 150 Q100 110 180 150" stroke="var(--stone-line)" strokeWidth="1.5" fill="none" />
//       <path d="M30 165 Q100 128 170 165" stroke="var(--stone-line)" strokeWidth="1.5" fill="none" />
//       <path d="M40 180 Q100 146 160 180" stroke="var(--stone-line)" strokeWidth="1.5" fill="none" />
//       <line x1="100" y1="108" x2="100" y2="184" stroke="var(--moss)" strokeWidth="1.5" strokeDasharray="2 4" />

//       {/* dropper body */}
//       <g stroke="var(--forest)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M78 20h44l-6 46a16 16 0 01-32 0z" />
//         <rect x="86" y="8" width="28" height="14" rx="3" />
//         <line x1="100" y1="66" x2="100" y2="86" />
//       </g>

//       {/* falling drop */}
//       <path
//         className={animated ? 'droplet-motif__drop' : ''}
//         d="M100 96c6 7 10 12.5 10 17.5a10 10 0 01-20 0c0-5 4-10.5 10-17.5z"
//         fill="var(--moss)"
//       />
//     </svg>
//   );
// }
