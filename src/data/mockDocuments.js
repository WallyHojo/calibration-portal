// ─── Mock Documents ────────────────────────────────────────────────────────────
// ADAS calibration records for the portal.
// Each record tracks a vehicle, the ADAS system calibrated, the performing
// technician, and the associated documentation. Records are permanent.
//
// Document IDs follow the format:  ADAS-YYYY-NNNNN
// Vehicle IDs follow the format:   VH-NNNN

// ─── ADAS system types ─────────────────────────────────────────────────────────
// Common reference for system names used across records.
export const adasSystems = [
  "Front Forward Camera",
  "Front Radar (ACC)",
  "Rear Radar (BLIS)",
  "Surround View / 360° Camera",
  "Lane Departure Camera",
  "Night Vision Camera",
  "Head-Up Display (HUD) Alignment",
  "EyeSight Forward Camera",       // Subaru
  "ProPilot Assist Camera",        // Nissan
  "Honda Sensing Camera",          // Honda
  "Pre-Collision System (PCS)",    // Toyota
  "Blind Spot Information (BLIS)", // Ford / Lincoln
];

// ─── Full calibration record catalogue ────────────────────────────────────────
export const documents = [
  {
    id: "ADAS-2024-03847",
    vehicleId: "VH-1042",
    year: 2023,
    make: "Honda",
    model: "CR-V",
    vin: "2HKRW2H85PH623041",
    adasSystem: "Front Forward Camera",
    calibrationType: "Dynamic",
    customerId: "CUST-001",
    customer: "Prestige Collision Center",
    technician: "M. Thornton",
    calibrationDate: "2024-11-15",
    status: "complete",
    invoiceRef: "INV-24-8812",
    uploadedAt: "2024-11-15T14:32:00Z",
    notes: "Post-repair — windshield replacement.",
  },
  {
    id: "ADAS-2024-03846",
    vehicleId: "VH-1041",
    year: 2022,
    make: "Ford",
    model: "F-150",
    vin: "1FTFW1ET4NFA04872",
    adasSystem: "Front Radar (ACC)",
    calibrationType: "Static",
    customerId: "CUST-002",
    customer: "Metro Collision & Auto",
    technician: "D. Salinas",
    calibrationDate: "2024-11-15",
    status: "complete",
    invoiceRef: "INV-24-8811",
    uploadedAt: "2024-11-15T11:18:00Z",
    notes: "Routine post-alignment calibration.",
  },
  {
    id: "ADAS-2024-03845",
    vehicleId: "VH-1040",
    year: 2024,
    make: "Toyota",
    model: "Camry",
    vin: "4T1C11AK0RU849302",
    adasSystem: "Pre-Collision System (PCS)",
    calibrationType: "Static",
    customerId: "CUST-003",
    customer: "Sunrise Auto Body",
    technician: "M. Thornton",
    calibrationDate: "2024-11-14",
    status: "complete",
    invoiceRef: "INV-24-8810",
    uploadedAt: "2024-11-14T16:47:00Z",
    notes: "Post front bumper repair.",
  },
  {
    id: "ADAS-2024-03844",
    vehicleId: "VH-1039",
    year: 2023,
    make: "Subaru",
    model: "Outback",
    vin: "4S4BTAPC4P3198847",
    adasSystem: "EyeSight Forward Camera",
    calibrationType: "Static",
    customerId: "CUST-004",
    customer: "Lakewood Auto Body",
    technician: "R. Okafor",
    calibrationDate: "2024-11-13",
    status: "complete",
    invoiceRef: "INV-24-8809",
    uploadedAt: "2024-11-13T15:30:00Z",
    notes: "Windshield replaced. Both EyeSight cameras recalibrated.",
  },
  {
    id: "ADAS-2024-03843",
    vehicleId: "VH-1038",
    year: 2022,
    make: "BMW",
    model: "3 Series",
    vin: "3MW5R7J07N8C28741",
    adasSystem: "Lane Departure Camera",
    calibrationType: "Dynamic",
    customerId: "CUST-001",
    customer: "Prestige Collision Center",
    technician: "D. Salinas",
    calibrationDate: "2024-11-13",
    status: "complete",
    invoiceRef: "INV-24-8808",
    uploadedAt: "2024-11-13T10:05:00Z",
    notes: "Post side mirror repair. Dynamic drive completed on I-270.",
  },
  {
    id: "ADAS-2024-03842",
    vehicleId: "VH-1037",
    year: 2024,
    make: "Kia",
    model: "Sorento",
    vin: "5XYPG4A5XKG382910",
    adasSystem: "Surround View / 360° Camera",
    calibrationType: "Static",
    customerId: "CUST-004",
    customer: "Lakewood Auto Body",
    technician: "R. Okafor",
    calibrationDate: "2024-11-12",
    status: "complete",
    invoiceRef: "INV-24-8807",
    uploadedAt: "2024-11-12T14:20:00Z",
    notes: "All four surround cameras recalibrated post-repair.",
  },
  {
    id: "ADAS-2024-03841",
    vehicleId: "VH-1036",
    year: 2023,
    make: "Toyota",
    model: "RAV4",
    vin: "2T3RWRFV0PW204561",
    adasSystem: "Pre-Collision System (PCS)",
    calibrationType: "Static",
    customerId: "CUST-003",
    customer: "Sunrise Auto Body",
    technician: "M. Thornton",
    calibrationDate: "2024-11-11",
    status: "complete",
    invoiceRef: "INV-24-8806",
    uploadedAt: "2024-11-11T09:45:00Z",
    notes: null,
  },
  {
    id: "ADAS-2024-03840",
    vehicleId: "VH-1035",
    year: 2023,
    make: "Honda",
    model: "Pilot",
    vin: "5FNYF6H07PB028834",
    adasSystem: "Honda Sensing Camera",
    calibrationType: "Static",
    customerId: "CUST-005",
    customer: "Westside Collision Center",
    technician: "D. Salinas",
    calibrationDate: "2024-11-10",
    status: "complete",
    invoiceRef: "INV-24-8805",
    uploadedAt: "2024-11-10T13:22:00Z",
    notes: "Post windshield replacement.",
  },
  {
    id: "ADAS-2024-03839",
    vehicleId: "VH-1034",
    year: 2022,
    make: "Chevrolet",
    model: "Silverado 1500",
    vin: "1GCUYDED4NZ173840",
    adasSystem: "Front Forward Camera",
    calibrationType: "Static",
    customerId: "CUST-006",
    customer: "Summit Collision & Glass",
    technician: "R. Okafor",
    calibrationDate: "2024-11-09",
    status: "complete",
    invoiceRef: "INV-24-8804",
    uploadedAt: "2024-11-09T15:50:00Z",
    notes: null,
  },
  {
    id: "ADAS-2024-03838",
    vehicleId: "VH-1033",
    year: 2024,
    make: "Subaru",
    model: "Forester",
    vin: "JF2SKAGC1RH400192",
    adasSystem: "EyeSight Forward Camera",
    calibrationType: "Static",
    customerId: "CUST-007",
    customer: "Capital Auto Body",
    technician: "M. Thornton",
    calibrationDate: "2024-11-08",
    status: "complete",
    invoiceRef: "INV-24-8803",
    uploadedAt: "2024-11-08T11:10:00Z",
    notes: "Scheduled maintenance calibration verify.",
  },
  {
    id: "ADAS-2024-03837",
    vehicleId: "VH-1032",
    year: 2023,
    make: "Ford",
    model: "Explorer",
    vin: "1FM5K8GC3PGA52910",
    adasSystem: "Blind Spot Information (BLIS)",
    calibrationType: "Dynamic",
    customerId: "CUST-002",
    customer: "Metro Collision & Auto",
    technician: "D. Salinas",
    calibrationDate: "2024-11-07",
    status: "pending",
    invoiceRef: "INV-24-8802",
    uploadedAt: "2024-11-07T16:30:00Z",
    notes: "Dynamic run pending — weather delay.",
  },
  {
    id: "ADAS-2024-03836",
    vehicleId: "VH-1031",
    year: 2022,
    make: "Nissan",
    model: "Rogue",
    vin: "JN8AT3BB7NW412037",
    adasSystem: "ProPilot Assist Camera",
    calibrationType: "Static",
    customerId: "CUST-006",
    customer: "Summit Collision & Glass",
    technician: "R. Okafor",
    calibrationDate: "2024-11-06",
    status: "complete",
    invoiceRef: "INV-24-8801",
    uploadedAt: "2024-11-06T10:00:00Z",
    notes: null,
  },
];

// ─── Dashboard views ───────────────────────────────────────────────────────────
// Pre-filtered slices consumed by dashboard widgets.

// Six most recently uploaded records
export const recentDocuments = [...documents]
  .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  .slice(0, 6);

// Records with status "pending" — need attention
export const pendingDocuments = documents.filter((d) => d.status === "pending");

// ─── Lookup helpers ────────────────────────────────────────────────────────────
export function getDocumentById(id) {
  return documents.find((d) => d.id === id) ?? null;
}

export function getDocumentsByCustomer(customerId) {
  return documents.filter((d) => d.customerId === customerId);
}

export function getDocumentsByVehicle(vin) {
  return documents.filter((d) => d.vin === vin);
}