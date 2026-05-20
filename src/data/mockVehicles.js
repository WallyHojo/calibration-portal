// ─── Mock Vehicles ─────────────────────────────────────────────────────────────
// Unique vehicle records derived from mockDocuments.js.
// Each vehicle groups all calibration records performed on that VIN.
// In production this will come from the database / SharePoint metadata.

import { documents } from "./mockDocuments";

// ─── Build unique vehicle list ─────────────────────────────────────────────────
function buildVehicles() {
  const map = new Map();

  documents.forEach((doc) => {
    if (!map.has(doc.vin)) {
      map.set(doc.vin, {
        vehicleId:  doc.vehicleId,
        vin:        doc.vin,
        year:       doc.year,
        make:       doc.make,
        model:      doc.model,
        customerId: doc.customerId,
        customer:   doc.customer,
        records:    [],
      });
    }
    map.get(doc.vin).records.push(doc);
  });

  // Sort records within each vehicle by date desc
  map.forEach((vehicle) => {
    vehicle.records.sort(
      (a, b) => new Date(b.calibrationDate) - new Date(a.calibrationDate)
    );
  });

  return Array.from(map.values());
}

export const vehicles = buildVehicles();

// ─── Derived helpers ───────────────────────────────────────────────────────────
export function getVehicleByVin(vin) {
  return vehicles.find((v) => v.vin === vin) ?? null;
}

export function getVehiclesByCustomer(customerId) {
  return vehicles.filter((v) => v.customerId === customerId);
}

// Unique makes for filter dropdown
export const vehicleMakes = [...new Set(vehicles.map((v) => v.make))].sort();

// Unique ADAS systems across all records
export const adasSystemOptions = [
  ...new Set(vehicles.flatMap((v) => v.records.map((r) => r.adasSystem))),
].sort();