// ─── Upload Service ────────────────────────────────────────────────────────────
// Mock upload pipeline. Mirrors the real flow that will use SharePoint
// and Azure Document Intelligence in production.
//
// Real implementation will:
//   1. Call sharepointService.uploadFile() to push the PDF
//   2. Trigger Azure Document Intelligence to extract VIN + record data
//   3. Create or update the calibration record in the database
//
// Duplicate detection checks:
//   - Filename contains an existing record ID (e.g. ADAS-2024-03847)
//   - Filename contains a VIN that matches an existing record

import { documents } from "../data/mockDocuments";

// ─── Extract record ID from filename ──────────────────────────────────────────
// Looks for the ADAS-YYYY-NNNNN pattern in the filename.
function extractRecordId(filename) {
  const match = filename.match(/ADAS-\d{4}-\d{5}/i);
  return match ? match[0].toUpperCase() : null;
}

// ─── Extract VIN from filename ────────────────────────────────────────────────
// VINs are 17 alphanumeric characters (no I, O, Q).
function extractVin(filename) {
  const match = filename.match(/[A-HJ-NPR-Z0-9]{17}/i);
  return match ? match[0].toUpperCase() : null;
}

// ─── Check a single file for duplicates ───────────────────────────────────────
export function checkForDuplicate(file) {
  const name      = file.name;
  const recordId  = extractRecordId(name);
  const vin       = extractVin(name);

  // Check by record ID
  if (recordId) {
    const existing = documents.find((d) => d.id === recordId);
    if (existing) return { isDuplicate: true, existingRecord: existing, matchType: "filename" };
  }

  // Check by VIN
  if (vin) {
    const existing = documents.find((d) => d.vin.toUpperCase() === vin);
    if (existing) return { isDuplicate: true, existingRecord: existing, matchType: "vin" };
  }

  return { isDuplicate: false };
}

// ─── Simulate upload with async delay ─────────────────────────────────────────
// Resolves with the outcome after a realistic delay.
// In production, replace with sharepointService.uploadFile(file).
export async function simulateUpload(file, isOverwrite = false) {
  // Simulate network latency
  const delay = 800 + Math.random() * 1200;
  await new Promise((res) => setTimeout(res, delay));

  // Simulate occasional upload error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Network error — please try again.");
  }

  const recordId = extractRecordId(file.name);
  const vin      = extractVin(file.name);

  return {
    success:     true,
    isOverwrite,
    recordId:    recordId ?? `ADAS-2024-0${Math.floor(Math.random() * 9000 + 1000)}`,
    vin:         vin ?? null,
  };
}