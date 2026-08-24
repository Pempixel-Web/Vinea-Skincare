import { useState } from "react";
import "./ProductImage.css";

export default function ProductImage({
  src,
  alt,
  className = "",
  ratio = "4 / 5",
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`product-image product-image--placeholder ${className}`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt}
      >
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src="/images/product.png"
      alt="Vinea Scalp Health & Hair Growth Oil"
      className={`product-image ${className}`}
      style={{ aspectRatio: ratio }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// import { useState } from 'react';
// import './ProductImage.css';

// /**
//  * Renders an image if it loads successfully; otherwise renders a quiet
//  * placeholder block so the page never shows a broken-image icon before
//  * real Vinea photography is dropped into /public/images.
//  */
// export default function ProductImage({ src, alt, className = '', ratio = '4 / 5' }) {
//   const [failed, setFailed] = useState(false);

//   if (failed) {
//     return (
//       <div
//         className={`product-image product-image--placeholder ${className}`}
//         style={{ aspectRatio: ratio }}
//         role="img"
//         aria-label={alt}
//       >

//         <span>{alt}</span>
//       </div>
//     );
//   }

//   return (
//     <img
//      src="/images/product.png"
//      alt="Vinea Scalp Health & Hair Growth Oil"
//       className={`product-image ${className}`}
//       style={{ aspectRatio: ratio }}
//       loading="lazy"
//       onError={() => setFailed(true)}
//     />
//   );
// }
