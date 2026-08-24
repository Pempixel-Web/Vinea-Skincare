// ============================================================================
// VINEA CONFIGURATION
// Single source of truth for anything you'll need to swap before launch:
// the Instagram group URL, product/UGC imagery, and brand copy constants.
// Nothing below should be hardcoded elsewhere in the app — import from here.
// ============================================================================

// --- Instagram Priority Waitlist -------------------------------------------
// Paste your real Instagram group invite link here. Every Instagram CTA
// in the app reads from this single constant.
export const INSTAGRAM_PRIORITY_WAITLIST_URL =
  import.meta.env.VITE_INSTAGRAM_WAITLIST_URL || 'https://instagram.com/vineaskincare';

// --- Brand -------------------------------------------------------------------
export const BRAND = {
  name: 'Vinea',
  fullProductName: 'Vinea Scalp Health & Hair Growth Oil',
  size: 'Each bottle contains 1 fluid ounce (30 ml)',
  priceAfterLaunch: 50,
  currency: 'USD',
};

// --- Images ------------------------------------------------------------------
// Drop real asset paths in /public/images and update these. Every <img> in
// the app falls back gracefully if a path 404s (see components/ProductImage.jsx).
export const IMAGES = {
  heroProduct: 'https://res.cloudinary.com/hylynzpo/image/upload/v1787587046/product.png',
  productCloseUp: '/images/product-closeup.jpg',
  ugcCreatorMale: '/images/ugc-male.jpg',
  ugcCreatorFemale: '/images/ugc-female.jpg',
  scalpApplication: '/images/scalp-application.jpg',
  ingredientTexture: '/images/ingredient-texture.jpg',
  ogSocialPreview: '/og/vinea-social-preview.jpg',
};

// --- UGC videos ----------------------------------------------------------------
// Add video URLs (mp4, or embeddable links) as they're produced. Leave empty
// and the section renders placeholder slots instead — the page never breaks.
export const UGC_VIDEOS = [
  // { id: 'ugc-1', src: '/videos/ugc-1.mp4', poster: '/images/ugc-male.jpg', caption: 'Real routine, real scalp care' },
  // { id: 'ugc-2', src: '/videos/ugc-2.mp4', poster: '/images/ugc-female.jpg', caption: 'Part, drop, massage' },
  // { id: 'ugc-3', src: '/videos/ugc-3.mp4', poster: '/images/product-closeup.jpg', caption: 'What is actually in the bottle' },
];

// --- Analytics (optional, no-op if unconfigured) ------------------------------
export const ANALYTICS_EVENTS = {
  WAITLIST_FORM_VIEW: 'waitlist_form_view',
  WAITLIST_SIGNUP: 'waitlist_signup',
  INSTAGRAM_CLICK: 'instagram_waitlist_click',
  UGC_INTERACTION: 'ugc_video_interaction',
};
