// ─────────────────────────────────────────────────────────────
// Array Control Unit (ACU) Module Data
//
// Solar vehicle HV precharge controller with isolated
// hardware verification. In-progress, specs TBD.
// ─────────────────────────────────────────────────────────────

export const modules = [
  {
    id: "acu-precharge",
    name: "Array Control Unit",
    shortName: "ACU",
    tabOrder: 0,
    status: "in-progress",

    modelPath: null,
    gerberFiles: [],
    layoutPath: null,
    schematicPath: null,
    photoPath: null,

    blockDiagrams: ["system", "hw-verification"],

    comparison: {
      dutyCycle: "Transitory",
      current: "TBD",
      thermalPriority: "TBD",
    },

    purpose:
      "Array control unit for a solar vehicle HV system. Manages the precharge sequence between the solar array MPPT boost converter and the battery pack. The precharge contactor closes first, charging the bus through a current-limiting resistor. When the battery voltage reaches 90% of the MPPT output voltage, a comparator on the HV side fires. The signal crosses the isolation barrier via optocoupler, passes through a CMOS AND gate (combined with ECU enable), then simultaneously a PROFET activates the main +ve contactor and a P-channel MOSFET deactivates the precharge contactor. No negative contactor is used. The separated HV/LV ground planes keep the LV control circuitry from ever referencing the HV floating ground.",

    electrical: [
      { label: "HV Bus Voltage", value: "~160 V (nominal)" },
      { label: "LV System", value: "12 V (chassis ground)" },
      { label: "CAN Interface", value: "BMS voltage + MPPT voltage readings" },
      { label: "Isolation Method", value: "Optocouplers (HV to LV signal crossing)" },
      { label: "HV-Side 5 V Supply", value: "1:1 isolated buck converter (LV to HV)" },
      { label: "Ground Separation", value: "HV floating ground / LV chassis ground" },
      { label: "Precharge Resistor", value: "TBD (limits inrush current)" },
      { label: "Main Contactor", value: "Positive only (PROFET-driven)" },
      { label: "Precharge Contactor", value: "P-ch FET deactivated on bus charge" },
      { label: "Threshold", value: "V_bat ≥ 90% of V_mppt" },
    ],

    calculations: [],

    designConsiderations: [
      "HV bus uses a floating ground, LV 12 V system is referenced to chassis ground (0 V). These two ground domains can't connect anywhere on the PCB.",
      "Separate ground planes on the ACU board with an optocoupler isolation barrier at the boundary. Signals pass optically so there's no galvanic path.",
      "Comparator on the HV side is powered by a 1:1 isolated buck converter. Takes 12 V from the LV rail, drops it to 5 V, and delivers it onto the HV floating ground plane with full galvanic isolation. Less lossy than a linear reg.",
      "Voltage dividers scale MPPT+ (reference) and Battery+ down to comparator input levels. Comparator fires when V_bat hits 90% of V_mppt. The divider ratio sets this threshold.",
      "CMOS AND gate on the LV side combines the opto signal with ECU enable. Both have to be HIGH before the PROFET and P-ch FET can switch.",
      "PROFET (smart high-side switch) drives the main +ve contactor. Picked it for the built-in overcurrent protection and diagnostic feedback.",
      "P-channel MOSFET deactivates the precharge contactor when the AND gate goes HIGH. Precharge opens as main closes at the same time. Complementary topology.",
      "No negative contactor. Determined it wasn't needed for this topology, which simplifies the design and cuts down on contactor count.",
      "Precharge path goes fuse, precharge resistor, precharge contactor. Limits inrush current to the capacitive loads on the HV bus.",
      "Fail-safe behaviour: if the comparator output drops (voltage drift, sensor fault), the AND gate de-asserts. PROFET turns off (main opens), P-ch FET re-activates precharge. All done in hardware, no software involved.",
    ],

    improvements: [],

    tradeoff: {
      title: "Hardware vs. Software Verification",
      text:
        "The ECU already has BMS and MPPT voltage readings over CAN, so it could just drive the PROFET and precharge FET directly from software. Adding a hardware verification layer (comparator + optocoupler + AND gate) on the ACU board adds more components and makes routing harder, but it means even if the ECU firmware has a bug or CAN drops out, the hardware will block the contactors from switching until the battery actually reaches 90% of MPPT voltage. The PROFET/P-ch topology where one activates main and the other deactivates precharge at the same time is clean but needs careful gate drive design to avoid any shoot-through during the transition.",
    },
  },
];

export const getModuleById = (id) => modules.find((m) => m.id === id);
export default modules;
