
## Refinement pass decisions

The attached refinement brief is treated as a visual and interaction correction to the existing implementation, not a rebuild. The hero remains a full-bleed muted looping video with eager preload and a local, low-opacity contrast wash so the motion stays visible. The warm paper / charcoal / taupe / coral system remains the source of truth, with Bebas Neue/Caveat/DM Mono/Space Grotesk providing the display, signature, metadata, and body roles.

The Breaking section now uses a pinned GSAP ScrollTrigger scrub sequence on one sentence only: “I LIKE BREAKING THINGS, LEARNING THEM.” The sentence is split into word and character spans; the track travels horizontally while individual characters enter from controlled Y offsets, rotate slightly, and settle with restrained Z-depth. The timeline is reversible by scroll direction, uses smaller responsive travel on mobile, and falls back to a static readable state under `prefers-reduced-motion`. The geometric fragments participate in the same timeline rather than running as unrelated decoration.
