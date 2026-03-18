// ─────────────────────────────────────────────────────────────
// Clean SVG block diagrams for the ACU project.
// "system": high-level precharge flow
// "hw-verification": isolated hardware verification
//
// Topology:
//   No negative contactor, only main +ve + precharge contactor
//   PROFET activates main +ve contactor (12V coil drive)
//   CMOS AND gate combines opto signal + ECU enable
//   P-ch MOSFET deactivates precharge contactor
//   Comparator fires at V_bat >= 90% V_mppt
//   1:1 isolated buck provides 5V to HV-side comparator
// ─────────────────────────────────────────────────────────────

function Arrow({ x1, y1, x2, y2, color = "#64748b", dashed = false }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  const ux = dx / len;
  const uy = dy / len;
  const tipLen = 8;
  const tipW = 4;
  const ex = x2 - ux * 2;
  const ey = y2 - uy * 2;

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={ex} y2={ey}
        stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "6 3" : "none"}
      />
      <polygon
        points={`${x2},${y2} ${ex - ux * tipLen + uy * tipW},${ey - uy * tipLen - ux * tipW} ${ex - ux * tipLen - uy * tipW},${ey - uy * tipLen + ux * tipW}`}
        fill={color}
      />
    </g>
  );
}

function Block({ x, y, w, h, label, sublabel, fill = "#1e293b", stroke = "#475569", textColor = "#e2e8f0", fontSize = 11 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text
        x={x + w / 2} y={sublabel ? y + h / 2 - 6 : y + h / 2}
        textAnchor="middle" dominantBaseline="central"
        fill={textColor} fontSize={fontSize} fontWeight="600"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2} y={y + h / 2 + 10}
          textAnchor="middle" dominantBaseline="central"
          fill="#94a3b8" fontSize={9}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Label({ x, y, text, color = "#94a3b8", fontSize = 9, anchor = "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" fill={color} fontSize={fontSize}>
      {text}
    </text>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SYSTEM DIAGRAM
   ═══════════════════════════════════════════════════════════════ */

function SystemDiagram() {
  return (
    <svg viewBox="0 0 760 360" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="760" height="360" fill="transparent" />

      <text x="380" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="700">
        System-Level Precharge Block Diagram
      </text>

      {/* ── CAN Bus Row (top, no vertical taps to avoid clutter) ── */}
      <Block x={30} y={46} w={120} h={40} label="ECU" sublabel="Vehicle Controller" fill="#1e293b" stroke="#6366f1" />

      <line x1={150} y1={66} x2={560} y2={66} stroke="#6366f1" strokeWidth={1.5} strokeDasharray="6 3" />
      <Label x={360} y={56} text="CAN Bus (BMS + MPPT voltage readings)" color="#818cf8" fontSize={9} />

      <Block x={560} y={46} w={120} h={40} label="BMS" sublabel="Battery Voltage" fill="#1e293b" stroke="#6366f1" />

      {/* ECU Enable: clean L-shaped route, above the power path */}
      <line x1={90} y1={86} x2={90} y2={108} stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 3" />
      <Arrow x1={90} y1={108} x2={340} y2={108} color="#f59e0b" dashed />
      <Label x={210} y={100} text="Enable Signal" color="#fbbf24" fontSize={9} />

      {/* ── HV Power Path (clean horizontal) ── */}
      <Block x={15} y={162} w={110} h={48} label="Solar Panel" fill="#0f172a" stroke="#3b82f6" fontSize={12} />
      <Arrow x1={125} y1={186} x2={165} y2={186} color="#3b82f6" />

      <Block x={165} y={157} w={130} h={58} label="MPPT" sublabel="Boost Converter" fill="#0f172a" stroke="#3b82f6" fontSize={13} />
      <Arrow x1={295} y1={186} x2={340} y2={186} color="#3b82f6" />

      {/* ── ACU Box ── */}
      <rect x={340} y={98} width={185} height={220} rx={8} fill="#1a1207" stroke="#f59e0b" strokeWidth={2} />
      <text x={432} y={120} textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700">ACU</text>

      {/* Internal blocks with breathing room */}
      <Block x={358} y={132} w={150} h={28} label="Fuse" fill="#1e293b" stroke="#475569" fontSize={11} />

      <Arrow x1={433} y1={160} x2={433} y2={170} color="#475569" />
      <Block x={358} y={170} w={150} h={28} label="Precharge Resistor" fill="#1e293b" stroke="#475569" fontSize={11} />

      <Arrow x1={433} y1={198} x2={433} y2={208} color="#475569" />
      <Block x={358} y={208} w={150} h={30} label="Precharge Contactor" fill="#1e293b" stroke="#f59e0b" fontSize={10} />
      <Label x={433} y={244} text="P-ch MOSFET deactivates" color="#fbbf24" fontSize={7} />

      <Block x={358} y={256} w={150} h={30} label="Main +ve Contactor" fill="#1e293b" stroke="#f59e0b" fontSize={10} />
      <Label x={433} y={292} text="PROFET activates (12V coil drive)" color="#fbbf24" fontSize={7} />

      {/* ACU to Battery */}
      <Arrow x1={525} y1={186} x2={568} y2={186} color="#3b82f6" />
      <Block x={568} y={162} w={120} h={48} label="Battery Pack" fill="#0f172a" stroke="#3b82f6" fontSize={12} />

      {/* ── Legend ── */}
      <g transform="translate(30, 340)">
        <line x1={0} y1={0} x2={25} y2={0} stroke="#3b82f6" strokeWidth={2} />
        <Label x={30} y={0} text="HV Power Path" color="#93c5fd" fontSize={9} anchor="start" />

        <line x1={150} y1={0} x2={175} y2={0} stroke="#6366f1" strokeWidth={2} strokeDasharray="6 3" />
        <Label x={180} y={0} text="CAN / Signal" color="#a5b4fc" fontSize={9} anchor="start" />

        <line x1={290} y1={0} x2={315} y2={0} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" />
        <Label x={320} y={0} text="ACU Control" color="#fcd34d" fontSize={9} anchor="start" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HW VERIFICATION DIAGRAM
   Wider canvas, more spacing, 12V feeds PROFET for coil drive
   Isolation boundary at x=450
   OPTO + Iso Buck centred on boundary
   5V rail at x=285, well left of OPTO (no crossing)
   ═══════════════════════════════════════════════════════════════ */

function HWVerificationDiagram() {
  const ISO = 450;

  return (
    <svg viewBox="0 0 940 460" className="w-full max-h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="940" height="460" fill="transparent" />

      <text x={ISO} y="24" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="700">
        Hardware Verification: HV / LV Isolation
      </text>

      {/* Isolation boundary */}
      <line x1={ISO} y1={40} x2={ISO} y2={370} stroke="#ef4444" strokeWidth={2} strokeDasharray="10 5" />

      {/* Zone headers */}
      <rect x={20} y={38} width={ISO - 28} height={22} rx={3} fill="#1e1e2e" />
      <text x={(20 + ISO - 8) / 2} y={52} textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="600">
        TS: Tractive System (HV Floating Ground)
      </text>

      <rect x={ISO + 8} y={38} width={912 - ISO} height={22} rx={3} fill="#1a2e1a" />
      <text x={(ISO + 8 + 912) / 2} y={52} textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="600">
        LV: Low Voltage (Chassis Ground, 0 V)
      </text>

      {/* ═══ ROW 1: Power Supply ═══ */}

      {/* 12V source (LV side, positioned above PROFET area) */}
      <Block x={620} y={72} w={80} h={30} label="12 V" sublabel="LV rail" fill="#0f172a" stroke="#22c55e" fontSize={12} />

      {/* 12V left to Iso Buck */}
      <Arrow x1={620} y1={87} x2={ISO + 55} y2={87} color="#22c55e" />

      {/* 1:1 Iso Buck centred on isolation line */}
      <rect x={ISO - 55} y={72} width={110} height={32} rx={6} fill="#27171a" stroke="#ef4444" strokeWidth={1.5} />
      <text x={ISO} y={85} textAnchor="middle" fill="#fca5a5" fontSize={10} fontWeight="600">1:1 Iso Buck</text>
      <text x={ISO} y={98} textAnchor="middle" fill="#fca5a5" fontSize={7}>12 V to 5 V isolated</text>

      {/* 5V output left into HV side */}
      <Arrow x1={ISO - 55} y1={87} x2={290} y2={87} color="#a78bfa" />
      <Label x={350} y={78} text="5 V" color="#c4b5fd" fontSize={10} />

      {/* 5V rail down to comparator Vcc */}
      <line x1={290} y1={87} x2={290} y2={192} stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 2" />
      <Label x={298} y={130} text="Vcc" color="#c4b5fd" fontSize={9} anchor="start" />
      <Label x={298} y={145} text="GND: HV plane" color="#93c5fd" fontSize={7} anchor="start" />

      {/* 12V down to PROFET (coil drive) */}
      <line x1={660} y1={102} x2={660} y2={148} stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 2" />
      <Arrow x1={660} y1={148} x2={730} y2={165} color="#22c55e" />
      <Label x={668} y={130} text="coil drive" color="#86efac" fontSize={7} anchor="start" />

      {/* ═══ ROW 2: Signal Chain ═══ */}

      {/* MPPT+ voltage sense */}
      <Block x={25} y={160} w={90} h={40} label="MPPT+" sublabel="~160 V" fill="#0f172a" stroke="#3b82f6" fontSize={12} />
      <Arrow x1={115} y1={180} x2={148} y2={180} color="#3b82f6" />

      <Block x={148} y={166} w={90} h={30} label="V. Divider" fill="#1e293b" stroke="#475569" fontSize={10} />
      <Arrow x1={238} y1={180} x2={270} y2={200} color="#f59e0b" />
      <Label x={240} y={168} text="REF (90%)" color="#fbbf24" fontSize={8} anchor="start" />

      {/* Battery+ voltage sense */}
      <Block x={25} y={260} w={90} h={40} label="Battery+" sublabel="~160 V" fill="#0f172a" stroke="#3b82f6" fontSize={12} />
      <Arrow x1={115} y1={280} x2={148} y2={280} color="#3b82f6" />

      <Block x={148} y={266} w={90} h={30} label="V. Divider" fill="#1e293b" stroke="#475569" fontSize={10} />
      <Arrow x1={238} y1={280} x2={270} y2={245} color="#64748b" />
      <Label x={240} y={292} text="Scaled V_bat" color="#94a3b8" fontSize={8} anchor="start" />

      {/* Comparator */}
      <Block x={270} y={195} w={120} h={55} label="Comparator" sublabel="V_bat >= 90% V_mppt" fill="#1e293b" stroke="#10b981" fontSize={11} />

      {/* Vcc dot on comparator */}
      <circle cx={290} cy={195} r={3} fill="#a78bfa" />

      {/* Threshold callout */}
      <rect x={25} y={210} width={105} height={26} rx={4} fill="#1a1207" stroke="#f59e0b" strokeWidth={1} />
      <text x={77} y={226} textAnchor="middle" fill="#fbbf24" fontSize={9} fontWeight="600">Threshold: 90%</text>

      {/* Comparator output to OPTO */}
      <Arrow x1={390} y1={222} x2={ISO - 35} y2={222} color="#10b981" />
      <Label x={395} y={212} text="HIGH" color="#6ee7b7" fontSize={9} anchor="start" />

      {/* OPTO centred on isolation line */}
      <rect x={ISO - 35} y={208} width={70} height={30} rx={6} fill="#27171a" stroke="#ef4444" strokeWidth={1.5} />
      <text x={ISO} y={226} textAnchor="middle" fill="#fca5a5" fontSize={11} fontWeight="600">OPTO</text>

      {/* OPTO output to CMOS AND */}
      <Arrow x1={ISO + 35} y1={222} x2={540} y2={222} color="#10b981" />

      {/* ECU Enable */}
      <Block x={540} y={145} w={105} h={32} label="ECU Enable" fill="#1e293b" stroke="#6366f1" fontSize={11} />
      <Arrow x1={592} y1={177} x2={592} y2={208} color="#6366f1" dashed />

      {/* CMOS AND */}
      <Block x={540} y={208} w={105} h={32} label="CMOS AND" fill="#1e293b" stroke="#22c55e" fontSize={11} />

      {/* AND output to split */}
      <Arrow x1={645} y1={224} x2={690} y2={224} color="#22c55e" />
      <circle cx={690} cy={224} r={4} fill="#22c55e" />

      {/* Path A: PROFET activates main +ve */}
      <line x1={690} y1={224} x2={690} y2={175} stroke="#22c55e" strokeWidth={1.5} />
      <Arrow x1={690} y1={175} x2={720} y2={175} color="#22c55e" />

      <Block x={720} y={160} w={95} h={32} label="PROFET" sublabel="high-side switch" fill="#1e293b" stroke="#22c55e" fontSize={11} />
      <Arrow x1={815} y1={176} x2={845} y2={176} color="#22c55e" />

      <Block x={845} y={160} w={80} h={32} label="Main +ve" sublabel="Contactor" fill="#0f172a" stroke="#22c55e" fontSize={10} />
      <Label x={885} y={200} text="ACTIVATES" color="#86efac" fontSize={8} fontWeight="600" />

      {/* Path B: P-ch MOSFET deactivates precharge */}
      <line x1={690} y1={224} x2={690} y2={278} stroke="#f59e0b" strokeWidth={1.5} />
      <Arrow x1={690} y1={278} x2={720} y2={278} color="#f59e0b" />

      <Block x={720} y={262} w={95} h={32} label="P-ch MOSFET" fill="#1e293b" stroke="#f59e0b" fontSize={11} />
      <Arrow x1={815} y1={278} x2={845} y2={278} color="#f59e0b" />

      <Block x={845} y={262} w={80} h={32} label="Precharge" sublabel="Contactor" fill="#0f172a" stroke="#f59e0b" fontSize={10} />
      <Label x={885} y={302} text="DEACTIVATES" color="#fbbf24" fontSize={8} fontWeight="600" />

      {/* ═══ ROW 3: Switching Sequence + Legend ═══ */}

      <rect x={25} y={325} width={890} height={60} rx={6} fill="#111827" stroke="#374151" strokeWidth={1} />
      <text x={ISO} y={340} textAnchor="middle" fill="#d1d5db" fontSize={10} fontWeight="600">Switching Sequence</text>
      <text x={35} y={356} fill="#94a3b8" fontSize={8}>
        {"1. Precharge contactor closes \u2192 bus charges through precharge R \u2192 V_bat rises toward V_mppt"}
      </text>
      <text x={35} y={369} fill="#94a3b8" fontSize={8}>
        {"2. V_bat hits 90% of V_mppt \u2192 comparator fires \u2192 opto crosses isolation \u2192 CMOS AND (with ECU enable) goes HIGH"}
      </text>
      <text x={35} y={382} fill="#94a3b8" fontSize={8}>
        {"3. PROFET activates main +ve contactor \u2194 P-ch MOSFET deactivates precharge contactor (simultaneous)"}
      </text>

      {/* Legend */}
      <g transform="translate(25, 410)">
        <rect x={0} y={-5} width={10} height={10} rx={2} fill="#0f172a" stroke="#3b82f6" strokeWidth={1.5} />
        <Label x={16} y={0} text="HV Sense" color="#93c5fd" fontSize={8} anchor="start" />

        <rect x={100} y={-5} width={10} height={10} rx={2} fill="#1e293b" stroke="#22c55e" strokeWidth={1.5} />
        <Label x={116} y={0} text="LV Control / 12V" color="#86efac" fontSize={8} anchor="start" />

        <rect x={230} y={-5} width={10} height={10} rx={2} fill="#27171a" stroke="#ef4444" strokeWidth={1.5} />
        <Label x={246} y={0} text="Isolation (opto / iso buck)" color="#fca5a5" fontSize={8} anchor="start" />

        <line x1={430} y1={0} x2={445} y2={0} stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="3 2" />
        <Label x={451} y={0} text="Isolated 5V rail" color="#c4b5fd" fontSize={8} anchor="start" />

        <rect x={570} y={-5} width={10} height={10} rx={2} fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5} />
        <Label x={586} y={0} text="Precharge ctrl" color="#fcd34d" fontSize={8} anchor="start" />

        <rect x={690} y={-5} width={10} height={10} rx={2} fill="#1e293b" stroke="#10b981" strokeWidth={1.5} />
        <Label x={706} y={0} text="Comparator" color="#6ee7b7" fontSize={8} anchor="start" />
      </g>
    </svg>
  );
}

export default function BlockDiagram({ diagramId }) {
  if (diagramId === "system") return <SystemDiagram />;
  if (diagramId === "hw-verification") return <HWVerificationDiagram />;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-500 text-sm">Under Development</p>
    </div>
  );
}
