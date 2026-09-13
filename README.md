# Fruitfly Acid

A local-in-your-browser acid instrument by Pixel Records, driven by a small extract of measured fruit-fly connectivity.

**Play:** https://tomislavrupic.github.io/fruitfly-acid/

Press Play to enable audio. Drag knobs vertically; Shift-drag gives fine control. Arrow keys also work. Generate makes a new pattern; lock steps to preserve them. Keep saves pattern slots. Session files and browser storage preserve patterns, learned weights and tone.

- Sawtooth acid synth with continuous 10 ms attack, adjustable decay, resonance and slides that land at the next note's onset.
- Delay Time, Feedback and Wet/Dry controls.
- Four-on-the-floor kick with independent level and mute.
- AAAB splits 16 steps into A (1–8) and B (9–16), then plays A/A/A/B. A 32-step pattern splits into two 16-step halves.
- MIDI import trains an experimental musical readout. Export MIDI exports the editable acid pattern; hardware MIDI depends on browser support. Kick and delay are built-in audio only.

All synthesis and learning run in the browser. No cloud model, account, analytics or API key is required. Browser storage is origin-specific: sessions on localhost do not automatically appear on the public site. Use Save/Load Session to transfer them. Download delivery and hardware MIDI support vary by browser.

## What is real, modeled and learned

The fixed graph contains 80 measured neurons and 1,296 directed connections. Signs, normalization, rate dynamics and rhythmic inputs are engineering choices. A separate 210-weight readout learns notes and articulation. Training loss measures in-sample fit, not musical quality or biological learning. No advantage over synthetic wiring has been demonstrated. The detailed fly illustration is AI-generated concept art; the graph overlay uses measured coordinates and modeled activity.

## Data credits

MaleCNS v1.0: FlyEM / HHMI Janelia, University of Cambridge, MRC LMB and Google Research. [Dataset](https://male-cns.janelia.org/download/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Circuit selection: [Mert Cobanov / Fly Dino](https://github.com/cobanov/flyjump), pinned commit and SHA-256 in `data/provenance.json`. The data extract is unmodified. `data/upstream-notices.md` is the preserved upstream notice and describes additional materials in that upstream project, which are not included here. No game code, sprites or meshes are reused.

Inspired by [Iftah's Sting](https://www.if-tah.com/devices/sting/) and [Fly Lab](https://github.com/Apolotary/fly-lab). Original application code and sound engine; no affiliation or endorsement implied.

## Development

`npm start` serves the project on http://127.0.0.1:8787 (Python 3 required).

`npm test` runs the Node tests. `npm run build` creates a standalone static `dist/` folder for GitHub Pages. No npm dependencies.

This is an experimental browser instrument, not a packaged DAW plug-in. Code availability does not change the separate CC BY data license.

Pattern changes keep playback running. Loop uses the edited pattern on upcoming scheduled steps; AAAB picks up changes at the next half-pattern boundary. Tone, delay and kick controls remain live.
