
## Refinement pass decisions

The attached refinement brief is treated as a visual and interaction correction to the existing implementation, not a rebuild. The hero remains a full-bleed muted looping video with eager preload and a local, low-opacity contrast wash so the motion stays visible. The warm paper / charcoal / taupe / coral system remains the source of truth, with Bebas Neue/Caveat/DM Mono/Space Grotesk providing the display, signature, metadata, and body roles.

The Breaking section now uses a GSAP ScrollTrigger scrub sequence. The original headline separates into independently transformable word groups with translate, rotate, opacity, and depth changes; outlined fragments move in 3D space; a second message reconstructs as “I TRANSFORM IDEAS INTO PRODUCTION-READY APPLICATIONS.” The timeline is reversible by scroll direction and falls back to a static readable state under `prefers-reduced-motion`. A large WebGL scene is intentionally not forced into the page because the editorial CSS fragment layer delivers the required depth with lower weight and clearer typography.
