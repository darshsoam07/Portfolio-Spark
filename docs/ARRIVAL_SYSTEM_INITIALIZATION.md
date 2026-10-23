# Reference recording observations — before implementation

Source: `C:\Users\daksh\Videos\Screen Recordings\Screen Recording 2026-10-22 221955.mp4`, 28.7 s, 1918×1012. Extracted the final segment at 200 ms intervals; overview and detailed contact sheets are in `artifacts/arrival-v2/`.

- 21.0 s: cream browser content before the coral overlay.
- 21.2–23.4 s: coral overlay, small corner labels, bottom-left 000%; a visible initialization/font wait.
- 23.8 s: 008%, thin horizontal/vertical guides begin drawing.
- 24.2 s: 045%, additional guide geometry and an initial letter contour.
- 24.6 s: 078%, recognizable outlined name and circle construction.
- 25.0 s: 093%, solid name fills from the left while outlines remain on the right.
- 25.4 s: 099%, nearly complete solid name.
- 25.8 s: 100%, solid name and settled dark dot.
- 26.2 s: name fades/moves upward as the coral panel starts lifting.
- 26.6 s: cream hero largely visible; coral reduced to the upper strip.
- 27.0–28.7 s: hero and collage visible at the top.

This is evidence of flat SVG/DOM drafting and typography motion, not a 3D tunnel. The cursor remains near the center; the recording does not establish pointer-responsive motion, so no pointer effect is required. Browser chrome is retained in the reference frames. Earlier chat/switcher content in the recording is unrelated to the design and was not used as instruction.

Original direction: “Darsh / System Initialization”. Use two-line name typography, an asymmetric infrastructure rail with three connected nodes, a framed identity block, engineering annotations, and a synchronized visual sequence counter. Keep coral/cream/charcoal. Use one GSAP timeline, no new package or WebGL. Normal target duration ~3.2 s after readiness, bounded font readiness and startup watchdog. Existing hero layout, content and navigation policy remain.
