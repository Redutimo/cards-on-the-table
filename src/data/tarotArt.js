// Tarot Major Arcana artwork definitions
// Each card returns the <svg> inner content for a 340x520 viewBox.
// Use currentColor for all strokes/fills so ink color can be themed.
// Shared frame + corner ornaments + title are added by a wrapper so each
// card only provides its unique figure content.

export const TAROT = {};

  // Shared frame + corner ornaments — wraps each card's unique content
  function frame(numeral, title, inner) {
    return `
      <g stroke="currentColor" fill="none" color="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
        <!-- double frame -->
        <rect x="10" y="10" width="320" height="500" rx="12"/>
        <rect x="16" y="16" width="308" height="488" rx="9"/>
        <!-- corner star accents -->
        <g transform="translate(26 26)"><path d="M-6 0 L6 0 M0 -6 L0 6 M-4 -4 L4 4 M-4 4 L4 -4"/></g>
        <g transform="translate(314 26)"><path d="M-6 0 L6 0 M0 -6 L0 6 M-4 -4 L4 4 M-4 4 L4 -4"/></g>
        <g transform="translate(26 494)"><path d="M-6 0 L6 0 M0 -6 L0 6 M-4 -4 L4 4 M-4 4 L4 -4"/></g>
        <g transform="translate(314 494)"><path d="M-6 0 L6 0 M0 -6 L0 6 M-4 -4 L4 4 M-4 4 L4 -4"/></g>
        <!-- corner numerals -->
        <g font-family="'Cormorant Garamond','Times New Roman',serif" font-weight="500" stroke="none" fill="currentColor">
          <text x="32" y="56" font-size="20" font-style="italic">${numeral}</text>
          <g transform="translate(308 478) rotate(180)"><text x="0" y="0" font-size="20" font-style="italic">${numeral}</text></g>
        </g>
        ${inner}
        <!-- Title banner -->
        <g font-family="'Cormorant Garamond','Times New Roman',serif" fill="currentColor" stroke="none" text-anchor="middle">
          <text x="170" y="492" font-size="12" letter-spacing="6" font-style="italic">${title}</text>
        </g>
        <!-- tiny scattered stars -->
        <g stroke="none" fill="currentColor">
          <circle cx="46" cy="110" r="1"/>
          <circle cx="294" cy="110" r="1"/>
          <circle cx="40" cy="360" r="1"/>
          <circle cx="300" cy="360" r="1"/>
        </g>
      </g>
    `;
  }

  // ============================================================
  // I — THE MAGICIAN
  // ============================================================
  TAROT.magician = frame('I', 'THE · MAGICIAN', `
    <!-- Infinity lemniscate at top -->
    <g transform="translate(170 88)" stroke-width="1.1" fill="none">
      <path d="M -22 0 C -22 -14 -8 -14 0 0 C 8 14 22 14 22 0 C 22 -14 8 -14 0 0 C -8 14 -22 14 -22 0 Z"/>
      <g stroke="none" fill="currentColor"><circle cx="-22" cy="0" r="1.6"/><circle cx="22" cy="0" r="1.6"/><circle cx="0" cy="0" r="1.4"/></g>
    </g>
    <!-- Central star (the magician) with radiating dotted rays -->
    <g transform="translate(170 240)" fill="none" stroke-width=".8">
      ${(() => { let s=''; const N=12; for(let i=0;i<N;i++){const a=(i/N)*Math.PI*2;const x1=Math.cos(a)*30,y1=Math.sin(a)*30,x2=Math.cos(a)*70,y2=Math.sin(a)*70;s+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-dasharray="1 3"/>`;} return s;})()}
      <circle r="22"/>
      <g stroke="none" fill="currentColor">
        <path d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z"/>
      </g>
    </g>
    <!-- Four suits arranged on altar — cup, sword, pentacle, wand -->
    <g transform="translate(170 380)" fill="none" stroke-width=".9">
      <line x1="-110" y1="0" x2="110" y2="0"/>
      <g stroke="none" fill="currentColor"><circle cx="-110" cy="0" r="1.8"/><circle cx="110" cy="0" r="1.8"/></g>
      <!-- cup -->
      <g transform="translate(-75 -18)"><path d="M -8 0 Q -8 10 0 12 Q 8 10 8 0 Z"/><line x1="0" y1="12" x2="0" y2="18"/></g>
      <!-- sword -->
      <g transform="translate(-25 -22)" stroke-width="1"><line x1="0" y1="-4" x2="0" y2="18"/><line x1="-6" y1="0" x2="6" y2="0"/><g stroke="none" fill="currentColor"><circle cx="0" cy="-6" r="1.6"/></g></g>
      <!-- pentacle -->
      <g transform="translate(25 -10)"><circle r="9"/><polygon points="0,-7 2,-2 7,-2 3,1 4.5,6 0,3 -4.5,6 -3,1 -7,-2 -2,-2"/></g>
      <!-- wand -->
      <g transform="translate(75 -22)" stroke-width="1"><line x1="-6" y1="16" x2="6" y2="-2"/><g stroke="none" fill="currentColor"><circle cx="6" cy="-2" r="2"/></g></g>
    </g>
    <!-- Two flourishes (roses/lilies as simple floral dots) -->
    <g transform="translate(170 440)" fill="none" stroke-width=".8">
      <path d="M -90 0 Q -60 -10 -30 0"/>
      <path d="M 30 0 Q 60 -10 90 0"/>
      <g stroke="none" fill="currentColor">
        <circle cx="-90" cy="0" r="1.4"/><circle cx="-60" cy="-8" r="1.4"/><circle cx="-30" cy="0" r="1.4"/>
        <circle cx="30" cy="0" r="1.4"/><circle cx="60" cy="-8" r="1.4"/><circle cx="90" cy="0" r="1.4"/>
      </g>
    </g>
  `);

  // ============================================================
  // II — THE HIGH PRIESTESS
  // ============================================================
  TAROT.highPriestess = frame('II', 'THE · HIGH · PRIESTESS', `
    <!-- Two pillar-constellations: left (B) and right (J), built of stars linked by thin lines -->
    <g stroke-width=".7" fill="none">
      <!-- left pillar -->
      <g transform="translate(70 260)">
        <line x1="0" y1="-160" x2="0" y2="160"/>
        ${[-160,-112,-64,-16,32,80,128,160].map(y => `<circle cx="0" cy="${y}" r="2.2" fill="currentColor" stroke="none"/>`).join('')}
        <!-- B glyph as two stacked half-circles of dots -->
        <g transform="translate(-2 0)" stroke="none" fill="currentColor">
          <circle cx="6" cy="-12" r="1.2"/><circle cx="9" cy="-6" r="1.2"/><circle cx="9" cy="0" r="1.2"/><circle cx="6" cy="6" r="1.2"/>
          <circle cx="9" cy="12" r="1.2"/><circle cx="6" cy="18" r="1.2"/>
        </g>
      </g>
      <!-- right pillar -->
      <g transform="translate(270 260)">
        <line x1="0" y1="-160" x2="0" y2="160"/>
        ${[-160,-112,-64,-16,32,80,128,160].map(y => `<circle cx="0" cy="${y}" r="2.2" fill="currentColor" stroke="none"/>`).join('')}
        <!-- J glyph of dots -->
        <g transform="translate(2 0)" stroke="none" fill="currentColor">
          <circle cx="0" cy="-12" r="1.2"/><circle cx="0" cy="-4" r="1.2"/><circle cx="0" cy="4" r="1.2"/>
          <circle cx="-3" cy="12" r="1.2"/><circle cx="-8" cy="10" r="1.2"/>
        </g>
      </g>
    </g>

    <!-- Moon crown: triple circle above, anchored by thin verticals to the figure-column -->
    <g transform="translate(170 132)" stroke-width="1" fill="none">
      <circle cx="-26" cy="6" r="10"/>
      <circle cx="0" cy="-2" r="14"/>
      <circle cx="26" cy="6" r="10"/>
      <!-- crescent inside central circle -->
      <path d="M 6 -10 A 10 10 0 1 0 6 6 A 7 7 0 1 1 6 -10 Z" fill="currentColor" stroke="none"/>
      <g stroke="none" fill="currentColor">
        <circle cx="-26" cy="6" r="1.2"/>
        <circle cx="26" cy="6" r="1.2"/>
      </g>
    </g>

    <!-- Veil as diamond lattice of dots between pillars -->
    <g transform="translate(170 290)" stroke="none" fill="currentColor">
      ${(() => {
        let s = '';
        const rows = 7, cols = 5;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = -80 + c * 40 + (r % 2 ? 20 : 0);
            const y = -120 + r * 34;
            s += `<circle cx="${x}" cy="${y}" r="1.4"/>`;
          }
        }
        return s;
      })()}
    </g>
    <!-- Thin diamond outline containing the veil -->
    <g transform="translate(170 290)" stroke-width=".7" fill="none" opacity=".9">
      <path d="M 0 -130 L 92 0 L 0 130 L -92 0 Z"/>
    </g>

    <!-- Central glyph: circle-with-crescent (the figure, reduced to emblem) -->
    <g transform="translate(170 290)" stroke-width="1" fill="none">
      <circle r="22"/>
      <path d="M 6 -16 A 16 16 0 1 0 6 16 A 11 11 0 1 1 6 -16 Z" fill="currentColor" stroke="none"/>
      <!-- small cross below -->
      <g transform="translate(0 38)" stroke-width=".8">
        <line x1="0" y1="-6" x2="0" y2="6"/>
        <line x1="-6" y1="0" x2="6" y2="0"/>
      </g>
    </g>

    <!-- Crescent at base of composition (the moon at her feet) -->
    <g transform="translate(170 420)" stroke-width="1">
      <path d="M -18 0 A 18 18 0 1 0 -18 -1 A 12 12 0 1 1 -18 -1 Z" fill="currentColor" stroke="none"/>
    </g>
  `);

  // ============================================================
  // III — THE EMPRESS
  // ============================================================
  TAROT.empress = frame('III', 'THE · EMPRESS', `
    <!-- Crown: 12-star halo (Empress is crowned with 12 stars) -->
    <g transform="translate(170 110)" fill="none" stroke-width=".7">
      <ellipse cx="0" cy="0" rx="44" ry="22" stroke-dasharray="1 3"/>
      ${(() => { let s=''; for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2;const x=Math.cos(a)*44,y=Math.sin(a)*22;s+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" stroke="none" fill="currentColor"><path d="M 0 -3 L 1 -1 L 3 0 L 1 1 L 0 3 L -1 1 L -3 0 L -1 -1 Z"/></g>`;} return s;})()}
    </g>
    <!-- Empress emblem: Venus glyph inside soft shield of dots -->
    <g transform="translate(170 260)" fill="none" stroke-width="1">
      <!-- cushion outline in dotted curves -->
      <path d="M -90 40 Q -90 -40 -50 -60 Q 0 -70 50 -60 Q 90 -40 90 40" stroke-dasharray="1 4"/>
      <g stroke="none" fill="currentColor">
        <circle cx="-90" cy="40" r="1.6"/><circle cx="90" cy="40" r="1.6"/>
        <circle cx="0" cy="-70" r="1.6"/>
      </g>
      <!-- Venus glyph -->
      <g stroke-width="1.1">
        <circle cx="0" cy="-14" r="18"/>
        <line x1="0" y1="4" x2="0" y2="40"/>
        <line x1="-14" y1="22" x2="14" y2="22"/>
      </g>
    </g>
    <!-- Wheat field as dotted stalks — rhythmic, gardenlike -->
    <g transform="translate(170 420)" fill="none" stroke-width=".7">
      ${(() => { let s=''; for(let i=0;i<11;i++){const x=-120+i*24;s+=`<line x1="${x}" y1="20" x2="${x}" y2="-30"/>`;} return s;})()}
      <g stroke="none" fill="currentColor">
        ${(() => { let s=''; for(let i=0;i<11;i++){const x=-120+i*24;s+=`<circle cx="${x}" cy="-32" r="1.6"/><circle cx="${x-3}" cy="-24" r="1"/><circle cx="${x+3}" cy="-24" r="1"/>`;} return s;})()}
      </g>
    </g>
    <!-- Soft forest horizon — two dotted arcs -->
    <g fill="none" stroke-width=".7">
      <path d="M 30 370 Q 90 340 150 370" stroke-dasharray="1 4"/>
      <path d="M 190 370 Q 250 340 310 370" stroke-dasharray="1 4"/>
    </g>
  `);

  // ============================================================
  // IV — THE EMPEROR
  // ============================================================
  TAROT.emperor = frame('IV', 'THE · EMPEROR', `
    <!-- Mountains as dotted horizon -->
    <g fill="none" stroke-width=".7">
      <path d="M 40 160 L 90 110 L 130 150 L 170 100 L 210 150 L 250 110 L 300 160" stroke-dasharray="1 3"/>
      <g stroke="none" fill="currentColor">
        <circle cx="90" cy="110" r="1.8"/><circle cx="170" cy="100" r="2.2"/><circle cx="250" cy="110" r="1.8"/>
      </g>
    </g>
    <!-- Throne: a solid rectangle (Emperor=structure, authority) -->
    <g transform="translate(170 290)" fill="none" stroke-width=".9">
      <rect x="-80" y="-50" width="160" height="130" rx="2"/>
      <rect x="-70" y="-40" width="140" height="110"/>
      <!-- ram-head corner dots -->
      <g stroke="none" fill="currentColor">
        <circle cx="-80" cy="-50" r="3"/><circle cx="80" cy="-50" r="3"/>
        <circle cx="-80" cy="80" r="2"/><circle cx="80" cy="80" r="2"/>
      </g>
      <!-- Aries glyph (ram/ruler sign) -->
      <g stroke-width="1.1" transform="translate(0 -10)">
        <path d="M -14 -4 Q -14 -14 -6 -14 Q 0 -14 0 -4 Q 0 -14 6 -14 Q 14 -14 14 -4"/>
        <line x1="0" y1="-6" x2="0" y2="26"/>
      </g>
      <!-- ankh glyph below -->
      <g stroke-width="1" transform="translate(0 40)">
        <circle cx="0" cy="-6" r="6"/>
        <line x1="0" y1="0" x2="0" y2="20"/>
        <line x1="-6" y1="6" x2="6" y2="6"/>
      </g>
    </g>
    <!-- Four corner marks (four square, the Emperor's number) -->
    <g stroke="none" fill="currentColor">
      <rect x="55" y="230" width="4" height="4"/>
      <rect x="281" y="230" width="4" height="4"/>
      <rect x="55" y="390" width="4" height="4"/>
      <rect x="281" y="390" width="4" height="4"/>
    </g>
  `);

  // ============================================================
  // V — THE HIEROPHANT
  // ============================================================
  TAROT.hierophant = frame('V', 'THE · HIEROPHANT', `
    <!-- Two pillars (star-columns) -->
    <g fill="none" stroke-width=".7">
      <line x1="64" y1="90" x2="64" y2="400"/>
      <line x1="276" y1="90" x2="276" y2="400"/>
      <g stroke="none" fill="currentColor">
        ${[90,160,230,300,370,400].map(y=>`<circle cx="64" cy="${y}" r="1.8"/><circle cx="276" cy="${y}" r="1.8"/>`).join('')}
      </g>
    </g>
    <!-- Triple crown: three stacked circles stepping up -->
    <g transform="translate(170 130)" fill="none" stroke-width=".9">
      <circle cx="0" cy="20" r="14"/>
      <circle cx="0" cy="6" r="10"/>
      <circle cx="0" cy="-6" r="7"/>
      <g stroke="none" fill="currentColor"><circle cx="0" cy="-14" r="1.6"/></g>
      <line x1="0" y1="-14" x2="0" y2="-22"/>
    </g>
    <!-- Central emblem: triple cross within a dotted mandorla -->
    <g transform="translate(170 270)" fill="none" stroke-width=".9">
      <path d="M 0 -60 Q 40 -30 40 0 Q 40 30 0 60 Q -40 30 -40 0 Q -40 -30 0 -60 Z" stroke-dasharray="1 3"/>
      <g stroke-width="1.1">
        <line x1="0" y1="-40" x2="0" y2="44"/>
        <line x1="-8" y1="-24" x2="8" y2="-24"/>
        <line x1="-12" y1="-10" x2="12" y2="-10"/>
        <line x1="-16" y1="4" x2="16" y2="4"/>
      </g>
    </g>
    <!-- Crossed keys at base, simplified -->
    <g transform="translate(170 410)" fill="none" stroke-width="1">
      <g transform="rotate(-20)">
        <circle cx="-22" cy="0" r="5"/>
        <line x1="-17" y1="0" x2="24" y2="0"/>
        <line x1="20" y1="0" x2="20" y2="6"/>
      </g>
      <g transform="rotate(20)">
        <circle cx="-22" cy="0" r="5"/>
        <line x1="-17" y1="0" x2="24" y2="0"/>
        <line x1="20" y1="0" x2="20" y2="6"/>
      </g>
    </g>
    <!-- Two small star acolytes at the feet -->
    <g stroke="none" fill="currentColor">
      <path d="M 130 460 l 2 -5 l 5 -2 l -5 -2 l -2 -5 l -2 5 l -5 2 l 5 2 Z"/>
      <path d="M 210 460 l 2 -5 l 5 -2 l -5 -2 l -2 -5 l -2 5 l -5 2 l 5 2 Z"/>
    </g>
  `);

  // ============================================================
  // VI — THE LOVERS
  // ============================================================
  TAROT.lovers = frame('VI', 'THE · LOVERS', `
    <!-- Sun disc with dotted halo at top (the angel reduced to radiance) -->
    <g transform="translate(170 115)" fill="none" stroke-width=".7">
      <circle r="22"/>
      <circle r="34" stroke-dasharray="1 3"/>
      ${(() => { let s=''; const N=16; for(let i=0;i<N;i++){const a=(i/N)*Math.PI*2;const x1=Math.cos(a)*42,y1=Math.sin(a)*42,x2=Math.cos(a)*52,y2=Math.sin(a)*52;s+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;} return s;})()}
      <g stroke="none" fill="currentColor"><circle r="2"/></g>
    </g>
    <!-- Two linked stars below — the lovers -->
    <g fill="none" stroke-width=".9">
      <!-- connecting line -->
      <line x1="110" y1="300" x2="230" y2="300" stroke-dasharray="1 3"/>
      <!-- left -->
      <g transform="translate(110 300)">
        <circle r="22" stroke-dasharray="1 3"/>
        <g stroke="none" fill="currentColor">
          <path d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"/>
        </g>
      </g>
      <!-- right -->
      <g transform="translate(230 300)">
        <circle r="22" stroke-dasharray="1 3"/>
        <g stroke="none" fill="currentColor">
          <path d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"/>
        </g>
      </g>
    </g>
    <!-- Tree of knowledge (serpent/dot-spiral) and Tree of fire -->
    <g fill="none" stroke-width=".8">
      <!-- knowledge: spiral -->
      <g transform="translate(80 410)">
        <path d="M 0 0 Q 6 -8 0 -12 Q -8 -14 -8 -6 Q -8 4 4 4 Q 14 4 14 -8" stroke-width="1"/>
        <line x1="0" y1="0" x2="0" y2="20"/>
      </g>
      <!-- fire: three peaks -->
      <g transform="translate(260 410)">
        <path d="M -10 0 L -4 -14 L 0 -6 L 4 -14 L 10 0"/>
        <line x1="0" y1="0" x2="0" y2="20"/>
      </g>
    </g>
    <!-- Mountain peak between them -->
    <g transform="translate(170 380)" fill="none" stroke-width=".9">
      <path d="M -20 40 L 0 -20 L 20 40 Z" stroke-dasharray="1 3"/>
      <g stroke="none" fill="currentColor"><circle cx="0" cy="-20" r="1.8"/></g>
    </g>
  `);

  // ============================================================
  // VII — THE CHARIOT
  // ============================================================
  TAROT.chariot = frame('VII', 'THE · CHARIOT', `
    <!-- Starry canopy: dotted arc between two anchor stars, with a line of stars beneath -->
    <g fill="none" stroke-width=".8">
      <path d="M 80 140 Q 170 100 260 140" stroke-dasharray="1 4"/>
      <g stroke="none" fill="currentColor">
        <circle cx="80" cy="140" r="2.4"/>
        <circle cx="260" cy="140" r="2.4"/>
        ${(() => { let s=''; for(let i=0;i<5;i++){const x=110+i*30;const y=134-Math.sin((i+0.5)/5*Math.PI)*28;s+=`<circle cx="${x}" cy="${y.toFixed(1)}" r="1.3"/>`;} return s;})()}
      </g>
    </g>

    <!-- Crown — single 4-point star above the charioteer column -->
    <g transform="translate(170 180)" stroke="none" fill="currentColor">
      <path d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"/>
    </g>

    <!-- Charioteer reduced to a vertical axis of three stars -->
    <g transform="translate(170 260)" fill="none" stroke-width=".8">
      <line x1="0" y1="-40" x2="0" y2="58"/>
      <g stroke="none" fill="currentColor">
        <circle cx="0" cy="-40" r="2.6"/>
        <circle cx="0" cy="8" r="3.2"/>
        <circle cx="0" cy="58" r="2.6"/>
      </g>
    </g>

    <!-- Chariot body as a wide rectangle of dotted corners -->
    <g transform="translate(170 350)" stroke-width=".9" fill="none">
      <rect x="-70" y="-22" width="140" height="44"/>
      <g stroke="none" fill="currentColor">
        <circle cx="-70" cy="-22" r="2"/><circle cx="70" cy="-22" r="2"/>
        <circle cx="-70" cy="22" r="2"/><circle cx="70" cy="22" r="2"/>
        <circle cx="0" cy="-22" r="1.4"/><circle cx="0" cy="22" r="1.4"/>
        <circle cx="-35" cy="0" r="1.4"/><circle cx="35" cy="0" r="1.4"/>
      </g>
    </g>

    <!-- Reins — two diagonal dotted lines from body outward, like trajectory vectors -->
    <g stroke="currentColor" stroke-width=".7" fill="none" stroke-dasharray="1 4">
      <line x1="100" y1="350" x2="50" y2="418"/>
      <line x1="240" y1="350" x2="290" y2="418"/>
    </g>

    <!-- Two wheels as opposing constellations -->
    <g transform="translate(110 418)" fill="none" stroke-width=".8">
      <circle r="20"/>
      <g stroke="none" fill="currentColor">
        ${(() => { let s=''; for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;const x=Math.cos(a)*20,y=Math.sin(a)*20;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%2?1.3:1.8}"/>`;} return s;})()}
        <circle r="2"/>
      </g>
    </g>
    <g transform="translate(230 418)" fill="none" stroke-width=".8">
      <circle r="20"/>
      <g stroke="none" fill="currentColor">
        ${(() => { let s=''; for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2+Math.PI/8;const x=Math.cos(a)*20,y=Math.sin(a)*20;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%2?1.3:1.8}"/>`;} return s;})()}
        <circle r="2"/>
      </g>
    </g>

    <!-- Directional chevron of dots pointing forward (up), behind the charioteer axis -->
    <g transform="translate(170 270)" stroke="none" fill="currentColor" opacity=".85">
      ${(() => {
        let s = '';
        for (let row = 0; row < 4; row++) {
          const y = -10 - row * 16;
          const spread = 18 + row * 14;
          for (let i = -1; i <= 1; i++) {
            if (i === 0) s += `<circle cx="0" cy="${y - 6}" r="1.3"/>`;
            else s += `<circle cx="${i * spread}" cy="${y}" r="1.3"/>`;
          }
        }
        return s;
      })()}
    </g>
  `);

  // ============================================================
  // IX — THE HERMIT
  // ============================================================
  TAROT.hermit = frame('IX', 'THE · HERMIT', `
    <!-- Mountain peak as dotted outline -->
    <g fill="none" stroke-width=".7">
      <path d="M 50 370 L 110 220 L 170 310 L 230 200 L 290 370" stroke-dasharray="1 3"/>
      <g stroke="none" fill="currentColor">
        <circle cx="110" cy="220" r="1.8"/>
        <circle cx="230" cy="200" r="2.2"/>
      </g>
    </g>
    <!-- Single bright star above — the lantern, held aloft -->
    <g transform="translate(170 130)" fill="none" stroke-width=".8">
      ${(() => { let s=''; const N=8; for(let i=0;i<N;i++){const a=(i/N)*Math.PI*2;const x1=Math.cos(a)*18,y1=Math.sin(a)*18,x2=Math.cos(a)*34,y2=Math.sin(a)*34;s+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;} return s;})()}
      <g stroke="none" fill="currentColor">
        <path d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z"/>
      </g>
      <!-- Hexagram (Seal of Solomon) around it — the lantern's emblem -->
      <g stroke-width=".6">
        <polygon points="0,-22 19,11 -19,11"/>
        <polygon points="0,22 19,-11 -19,-11"/>
      </g>
    </g>
    <!-- Staff: long vertical line on the right -->
    <g fill="none" stroke-width="1">
      <line x1="250" y1="180" x2="210" y2="410"/>
      <g stroke="none" fill="currentColor">
        <circle cx="250" cy="180" r="2"/>
        <circle cx="210" cy="410" r="2"/>
      </g>
    </g>
    <!-- Hermit as dotted cloak silhouette -->
    <g transform="translate(170 330)" fill="none" stroke-width=".8">
      <path d="M -40 80 Q -56 -10 -20 -50 Q 0 -60 20 -50 Q 56 -10 40 80 Z" stroke-dasharray="1 3"/>
      <g stroke="none" fill="currentColor"><circle cx="0" cy="-40" r="1.6"/></g>
    </g>
    <!-- Scattered snow-stars -->
    <g stroke="none" fill="currentColor">
      <circle cx="70" cy="100" r="1"/>
      <circle cx="270" cy="90" r="1"/>
      <circle cx="100" cy="70" r=".8"/>
      <circle cx="240" cy="60" r=".8"/>
      <circle cx="60" cy="250" r=".8"/>
      <circle cx="280" cy="250" r=".8"/>
    </g>
  `);

  // ============================================================
  // X — WHEEL OF FORTUNE
  // ============================================================
  TAROT.wheel = frame('X', 'WHEEL · OF · FORTUNE', `
    <!-- Four corner glyphs: cardinal living creatures as small letter-marks in dotted rings -->
    <g fill="none" stroke-width=".8">
      <g transform="translate(62 82)">
        <circle r="14" stroke-dasharray="1 3"/>
        <text x="0" y="4" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="14" fill="currentColor" stroke="none" text-anchor="middle">A</text>
      </g>
      <g transform="translate(278 82)">
        <circle r="14" stroke-dasharray="1 3"/>
        <text x="0" y="4" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="14" fill="currentColor" stroke="none" text-anchor="middle">E</text>
      </g>
      <g transform="translate(62 438)">
        <circle r="14" stroke-dasharray="1 3"/>
        <text x="0" y="4" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="14" fill="currentColor" stroke="none" text-anchor="middle">T</text>
      </g>
      <g transform="translate(278 438)">
        <circle r="14" stroke-dasharray="1 3"/>
        <text x="0" y="4" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="14" fill="currentColor" stroke="none" text-anchor="middle">L</text>
      </g>
    </g>
    <!-- The wheel: concentric orbits + spokes of stars -->
    <g transform="translate(170 260)" fill="none" stroke-width=".8">
      <circle r="110"/>
      <circle r="90" stroke-dasharray="1 3"/>
      <circle r="50" stroke-dasharray="1 3"/>
      <circle r="18"/>
      <!-- eight spokes as dotted lines -->
      ${(() => { let s=''; for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;const x=Math.cos(a)*108,y=Math.sin(a)*108;s+=`<line x1="0" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke-dasharray="1 4"/>`;} return s;})()}
      <!-- stars at each spoke end -->
      <g stroke="none" fill="currentColor">
        ${(() => { let s=''; for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;const x=Math.cos(a)*108,y=Math.sin(a)*108;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%2?2.4:1.6}"/>`;} return s;})()}
        <!-- hub star -->
        <path d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z"/>
      </g>
      <!-- T A R O letters at cardinal points -->
      <g font-family="'Cormorant Garamond',serif" font-size="14" font-style="italic" stroke="none" fill="currentColor" text-anchor="middle">
        <text x="0" y="-68">T</text>
        <text x="68" y="5">A</text>
        <text x="0" y="78">R</text>
        <text x="-68" y="5">O</text>
      </g>
    </g>
    <!-- Descending and ascending traces on either side (simplified) -->
    <g fill="none" stroke-width=".8" stroke-dasharray="1 4">
      <path d="M 60 200 Q 60 260 60 340"/>
      <path d="M 280 200 Q 280 260 280 340"/>
      <g stroke="none" fill="currentColor">
        <circle cx="60" cy="200" r="1.6"/><circle cx="60" cy="340" r="1.6"/>
        <circle cx="280" cy="200" r="1.6"/><circle cx="280" cy="340" r="1.6"/>
      </g>
    </g>
  `);

  // ============================================================
  // XVI — THE TOWER
  // ============================================================
  TAROT.tower = frame('XVI', 'THE · TOWER', `
    <!-- Jagged mountain base as dotted horizon -->
    <g fill="none" stroke-width=".7">
      <path d="M 30 430 L 80 400 L 130 420 L 170 390 L 210 420 L 260 400 L 310 430" stroke-dasharray="1 3"/>
    </g>
    <!-- Lightning bolt descending from a top-right star -->
    <g stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round">
      <path d="M 260 80 L 210 140 L 230 150 L 170 230"/>
    </g>
    <g stroke="none" fill="currentColor">
      <!-- source star -->
      <path d="M 260 80 l 3 -8 l 8 -3 l -8 -3 l -3 -8 l -3 8 l -8 3 l 8 3 Z"/>
    </g>
    <!-- Tower as a simple monolith of rectangles, shaken -->
    <g transform="translate(170 290)" fill="none" stroke-width=".9">
      <!-- base platform -->
      <rect x="-48" y="38" width="96" height="44" rx="2"/>
      <!-- main shaft -->
      <rect x="-34" y="-84" width="68" height="122"/>
      <!-- two windows with flame-dots inside -->
      <rect x="-8" y="-50" width="16" height="16"/>
      <rect x="-8" y="-14" width="16" height="16"/>
      <g stroke="none" fill="currentColor">
        <circle cx="0" cy="-42" r="2"/>
        <circle cx="0" cy="-6" r="2"/>
      </g>
      <!-- crenellated top as dotted squares -->
      <g stroke="none" fill="currentColor">
        <rect x="-34" y="-90" width="8" height="6"/>
        <rect x="-18" y="-90" width="8" height="6"/>
        <rect x="-2" y="-90" width="8" height="6"/>
        <rect x="14" y="-90" width="8" height="6"/>
      </g>
      <!-- crown tumbling -->
      <g transform="translate(-14 -112)">
        <path d="M -12 0 L -8 -8 L 0 -2 L 8 -8 L 12 0 Z"/>
        <g stroke="none" fill="currentColor">
          <circle cx="-12" cy="0" r="1.4"/>
          <circle cx="12" cy="0" r="1.4"/>
          <circle cx="0" cy="-2" r="1.4"/>
        </g>
      </g>
    </g>
    <!-- Two falling figures reduced to radial star-bursts -->
    <g fill="none" stroke-width=".8">
      <g transform="translate(90 340)">
        <circle r="6" stroke-dasharray="1 3"/>
        <g stroke="none" fill="currentColor"><circle r="1.8"/></g>
        <g stroke="currentColor" stroke-dasharray="1 3">
          <line x1="0" y1="-14" x2="0" y2="-22"/>
          <line x1="0" y1="14" x2="0" y2="22"/>
          <line x1="-14" y1="0" x2="-22" y2="0"/>
          <line x1="14" y1="0" x2="22" y2="0"/>
        </g>
      </g>
      <g transform="translate(250 360)">
        <circle r="6" stroke-dasharray="1 3"/>
        <g stroke="none" fill="currentColor"><circle r="1.8"/></g>
        <g stroke="currentColor" stroke-dasharray="1 3">
          <line x1="0" y1="-14" x2="0" y2="-22"/>
          <line x1="0" y1="14" x2="0" y2="22"/>
          <line x1="-14" y1="0" x2="-22" y2="0"/>
          <line x1="14" y1="0" x2="22" y2="0"/>
        </g>
      </g>
    </g>
    <!-- Falling yod-sparks (stars raining down) -->
    <g stroke="none" fill="currentColor">
      ${(() => { let s=''; const pts=[[60,180],[110,220],[260,200],[220,160],[70,110],[290,130],[100,150],[240,240],[130,180],[210,200],[80,280],[260,290]]; for(const [x,y] of pts){s+=`<circle cx="${x}" cy="${y}" r="1.4"/>`;} return s;})()}
    </g>
  `);

  // Card order for "next/prev"
  TAROT.__order = [
    'magician','highPriestess','empress','emperor','hierophant',
    'lovers','chariot','hermit','wheel','tower'
  ];
  TAROT.__titles = {
    magician: 'The Magician',
    highPriestess: 'The High Priestess',
    empress: 'The Empress',
    emperor: 'The Emperor',
    hierophant: 'The Hierophant',
    lovers: 'The Lovers',
    chariot: 'The Chariot',
    hermit: 'The Hermit',
    wheel: 'Wheel of Fortune',
    tower: 'The Tower',
  };

function buildBackSVG() {
  let s = `<g stroke="currentColor" fill="none" color="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="312" height="492" rx="16" stroke-width="4"/>
    <rect x="24" y="24" width="292" height="472" rx="11" stroke-width="1.2"/>`;

  for (const [x, y] of [[34,34],[306,34],[34,486],[306,486]]) {
    s += `<g transform="translate(${x} ${y})" stroke-width="1.4"><path d="M 0 -7 L 2 -2 L 7 0 L 2 2 L 0 7 L -2 2 L -7 0 L -2 -2 Z" fill="currentColor"/></g>`;
  }

  s += `<g transform="translate(170 260)"><g stroke-width="3" stroke-linecap="round">`;
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const deg = (a * 180 / Math.PI + 360) % 360;
    const nearVertical = (deg > 80 && deg < 100) || (deg > 260 && deg < 280);
    const r1 = nearVertical ? 175 : 92;
    const r2 = i % 3 === 0 ? 205 : (nearVertical ? 210 : 176);
    s += `<line x1="${(Math.cos(a)*r1).toFixed(1)}" y1="${(Math.sin(a)*r1).toFixed(1)}" x2="${(Math.cos(a)*r2).toFixed(1)}" y2="${(Math.sin(a)*r2).toFixed(1)}"/>`;
  }
  s += `</g></g>`;

  s += `<g transform="translate(170 260)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="-140" r="8" fill="currentColor"/>
    <rect x="-4" y="-132" width="8" height="26" fill="currentColor" stroke="none"/>
    <path d="M -86 -106 C -60 -114 -30 -108 0 -108 C 30 -108 60 -114 86 -106" stroke-width="3"/>
    <path d="M -86 -106 C -94 -104 -96 -96 -90 -90 C -84 -86 -78 -92 -80 -98" stroke-width="2"/>
    <path d="M  86 -106 C  94 -104  96 -96  90 -90 C  84 -86  78 -92  80 -98" stroke-width="2"/>
    <path d="M -5 -106 L -3 140 L 0 150 L 3 140 L 5 -106 Z" fill="currentColor" stroke="currentColor"/>
    <g stroke-width="1.2" stroke-linecap="round" fill="none">
      <path d="M -66 -106 L -66 -58"/>
      <path d="M -46 -106 L -58 -58"/>
      <path d="M  66 -106 L  66 -58"/>
      <path d="M  46 -106 L  58 -58"/>
    </g>
    <g transform="translate(-62 -52)">
      <path d="M -24 0 C -22 14 -12 22 0 22 C 12 22 22 14 24 0 Z" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path d="M -24 0 L 24 0" stroke-width="1.6"/>
      <g transform="translate(0 10)"><path d="M -6 -4 A 7 7 0 1 0 -6 4 A 5 5 0 1 1 -6 -4 Z" stroke="none" fill="currentColor"/></g>
    </g>
    <g transform="translate(62 -52)">
      <path d="M -24 0 C -22 14 -12 22 0 22 C 12 22 22 14 24 0 Z" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path d="M -24 0 L 24 0" stroke-width="1.6"/>
      <g transform="translate(0 9)" fill="none" stroke-width="1.3">
        <path d="M -8 2 A 8 8 0 0 1 8 2 Z" fill="currentColor"/>
        <path d="M -11 -2 L -14 -5 M -8 -6 L -9 -10 M 0 -8 L 0 -12 M 8 -6 L 9 -10 M 11 -2 L 14 -5"/>
      </g>
    </g>
  </g>`;

  s += `<g stroke-width="1.3" stroke-linecap="round">`;
  for (const [x, y] of [[82,80],[258,80],[70,160],[270,160],[80,360],[260,360],[90,440],[250,440],[140,90],[200,90],[150,440],[190,440]]) {
    s += `<g transform="translate(${x} ${y})"><path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill="currentColor"/></g>`;
  }
  s += `</g></g>`;
  return s;
}

export const CARD_BACK_SVG = buildBackSVG();

const ID_MAP = { high_priestess: 'highPriestess', wheel_of_fortune: 'wheel' };

export function getCardArt(id) {
  const base = id.replace(/^s_/, '');
  return TAROT[ID_MAP[base] || base] || '';
}
