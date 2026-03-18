import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const specs = [
  { label: "HV Bus", value: "~160 V" },
  { label: "LV System", value: "12 V" },
  { label: "Interface", value: "CAN Bus" },
  { label: "Isolation", value: "Optocoupler" },
  { label: "Main +ve", value: "PROFET (high-side switch)" },
  { label: "Precharge", value: "P-ch FET deactivates on charge" },
  { label: "Threshold", value: "V_bat ≥ 90% V_mppt" },
];

function MiniBlockDiagram() {
  return (
    <svg viewBox="0 0 360 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="180" fill="transparent" />

      {/* Solar Panel */}
      <rect x={10} y={65} width={55} height={30} rx={4} fill="#0f172a" stroke="#3b82f6" strokeWidth={1} />
      <text x={37} y={83} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">Panel</text>

      {/* Arrow */}
      <line x1={65} y1={80} x2={82} y2={80} stroke="#3b82f6" strokeWidth={1} />
      <polygon points="82,80 77,77 77,83" fill="#3b82f6" />

      {/* MPPT */}
      <rect x={84} y={65} width={50} height={30} rx={4} fill="#0f172a" stroke="#3b82f6" strokeWidth={1} />
      <text x={109} y={78} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">MPPT</text>
      <text x={109} y={88} textAnchor="middle" fill="#94a3b8" fontSize="5">Boost</text>

      {/* ACU Box */}
      <rect x={150} y={30} width={80} height={130} rx={5} fill="#1a1207" stroke="#f59e0b" strokeWidth={1.5} />
      <text x={190} y={45} textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">ACU</text>

      {/* Precharge path inside */}
      <rect x={160} y={55} width={60} height={16} rx={3} fill="#1e293b" stroke="#475569" strokeWidth={0.8} />
      <text x={190} y={66} textAnchor="middle" fill="#e2e8f0" fontSize="5.5">Precharge R</text>

      <rect x={160} y={76} width={60} height={16} rx={3} fill="#1e293b" stroke="#f59e0b" strokeWidth={0.8} />
      <text x={190} y={86} textAnchor="middle" fill="#e2e8f0" fontSize="5.5">PROFET → Main +</text>

      <rect x={160} y={97} width={60} height={16} rx={3} fill="#1e293b" stroke="#f59e0b" strokeWidth={0.8} />
      <text x={190} y={107} textAnchor="middle" fill="#e2e8f0" fontSize="5.5">P-ch → Pre OFF</text>

      {/* Isolation label */}
      <line x1={160} y1={120} x2={220} y2={120} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="3 2" />
      <text x={190} y={130} textAnchor="middle" fill="#ef4444" fontSize="5">HV / LV Isolation</text>

      <rect x={160} y={137} width={60} height={16} rx={3} fill="#1e293b" stroke="#22c55e" strokeWidth={0.8} />
      <text x={190} y={147} textAnchor="middle" fill="#e2e8f0" fontSize="5.5">90% Comparator</text>

      {/* Arrow MPPT → ACU */}
      <line x1={134} y1={80} x2={150} y2={80} stroke="#3b82f6" strokeWidth={1} />
      <polygon points="150,80 145,77 145,83" fill="#3b82f6" />

      {/* Battery */}
      <rect x={250} y={65} width={50} height={30} rx={4} fill="#0f172a" stroke="#3b82f6" strokeWidth={1} />
      <text x={275} y={83} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">Battery</text>

      {/* Arrow ACU → Battery */}
      <line x1={230} y1={80} x2={250} y2={80} stroke="#3b82f6" strokeWidth={1} />
      <polygon points="250,80 245,77 245,83" fill="#3b82f6" />

      {/* ECU */}
      <rect x={84} y={15} width={50} height={24} rx={4} fill="#1e293b" stroke="#6366f1" strokeWidth={1} />
      <text x={109} y={30} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">ECU</text>

      {/* CAN line */}
      <line x1={134} y1={27} x2={250} y2={27} stroke="#6366f1" strokeWidth={0.8} strokeDasharray="4 2" />
      <text x={192} y={22} textAnchor="middle" fill="#818cf8" fontSize="5">CAN Bus</text>

      {/* BMS */}
      <rect x={250} y={15} width={50} height={24} rx={4} fill="#1e293b" stroke="#6366f1" strokeWidth={1} />
      <text x={275} y={30} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="600">BMS</text>

      {/* ECU enable signal to ACU */}
      <line x1={134} y1={35} x2={155} y2={55} stroke="#f59e0b" strokeWidth={0.8} strokeDasharray="3 2" />
      <polygon points="155,55 150,48 155,48" fill="#f59e0b" />
      <text x={138} y={50} fill="#fbbf24" fontSize="4.5">Enable</text>
    </svg>
  );
}

export default function ACUProjectCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-6 py-16 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-2">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          In Development
        </p>
        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          In Progress
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-tight mb-3">
        Array Control Unit (ACU)
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mb-10">
        HV precharge controller for a solar vehicle. Handles the connection
        sequence between the solar array MPPT boost converter and the battery
        pack. The precharge contactor closes first through a current-limiting
        resistor, and once the battery reaches 90% of the MPPT voltage a
        comparator on the HV side fires through an optocoupler back to the LV
        domain. A CMOS AND gate combines this with the ECU enable signal, then
        a PROFET activates the main +ve contactor while a P-channel MOSFET
        simultaneously deactivates the precharge contactor. The whole
        verification layer sits on isolated ground planes (HV floating, LV
        chassis ground) with a 1:1 isolated buck powering the HV-side
        comparator, so even if the software fails the hardware won't let the
        contactors switch.
      </p>

      <Link
        to="/projects/array-control-unit"
        className="block rounded-xl border border-gray-800 bg-gray-900/30 p-4 transition-all duration-300 hover:border-gray-600 hover:bg-gray-900/60 group cursor-pointer"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Mini block diagram tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="border border-gray-800/60 rounded-lg overflow-hidden bg-gray-900/40"
          >
            <div className="px-4 pt-3 pb-2">
              <p className="text-[11px] uppercase tracking-wider text-gray-500">
                System Block Diagram
              </p>
            </div>
            <div className="h-52 sm:h-56 p-4">
              <MiniBlockDiagram />
            </div>
          </motion.div>

          {/* Key specs tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border border-gray-800/60 rounded-lg p-4 bg-gray-900/40"
          >
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
              Key Specifications
            </p>
            <ul className="space-y-2">
              {specs.map((s) => (
                <li key={s.label} className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500 flex-shrink-0 w-[120px]">
                    {s.label}
                  </span>
                  <span className="text-gray-300 font-mono text-xs bg-gray-800/50 px-1.5 py-0.5 rounded">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Design highlights tile, full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:col-span-2 border border-gray-800/60 rounded-lg p-4 bg-gray-900/40"
          >
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
              Design Highlights
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-md bg-gray-800/30 border border-gray-800/40">
                <p className="text-xs font-semibold text-blue-400 mb-1">HV/LV Isolation</p>
                <p className="text-xs text-gray-400">HV side floats, LV side is chassis ground. Optocouplers sit on the boundary so there's no galvanic path between the two planes.</p>
              </div>
              <div className="p-3 rounded-md bg-gray-800/30 border border-gray-800/40">
                <p className="text-xs font-semibold text-amber-400 mb-1">Hardware Verification</p>
                <p className="text-xs text-gray-400">Comparator checks the bus voltage independently of the ECU. Even if the software misbehaves, the hardware won't let the contactors switch until the threshold is met.</p>
              </div>
              <div className="p-3 rounded-md bg-gray-800/30 border border-gray-800/40">
                <p className="text-xs font-semibold text-green-400 mb-1">PROFET + P-ch Topology</p>
                <p className="text-xs text-gray-400">PROFET closes the main contactor, P-ch MOSFET opens the precharge contactor. Both switch at the same time so there's no need for a negative contactor.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-gray-100 transition-colors">
          View Full Engineering Breakdown
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </Link>
    </motion.section>
  );
}
