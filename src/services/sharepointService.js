// ─── SharePoint Service ───────────────────────────────────────────────────────
// All interactions with the SharePoint document library.
// Uses Microsoft Graph API via graphClient.js.
//
// ENVIRONMENT VARIABLES REQUIRED (.env):
//   VITE_SHAREPOINT_SITE_ID    — found via /sites?search=yoursite Graph call
//   VITE_SHAREPOINT_DRIVE_ID   — found via /sites/{siteId}/drives Graph call
//
// See SHAREPOINT_SETUP.md for how to find these values.

import { graphFetch } from "./graphClient";

const SITE_ID  = import.meta.env.VITE_SHAREPOINT_SITE_ID;
const DRIVE_ID = import.meta.env.VITE_SHAREPOINT_DRIVE_ID;

// ─── List all PDF files in the calibration records library ────────────────────
// Returns an array of file metadata objects.
export async function listCalibrationFiles() {
  const data = await graphFetch(
    `/sites/${SITE_ID}/drives/${DRIVE_ID}/root/children` +
    `?$select=id,name,size,lastModifiedDateTime,webUrl` +
    `&$filter=endswith(name,'.pdf')`
  );
  return data.value ?? [];
}

// ─── Get a single file's metadata by SharePoint item ID ───────────────────────
export async function getFileMetadata(itemId) {
  return graphFetch(
    `/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${itemId}` +
    `?$select=id,name,size,lastModifiedDateTime,webUrl`
  );
}

// ─── Get a temporary download URL for a file ─────────────────────────────────
// Returns a pre-authenticated URL valid for a short period.
// Use this to either stream a PDF preview or trigger a download.
export async function getDownloadUrl(itemId) {
  const data = await graphFetch(
    `/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${itemId}` +
    `?$select=@microsoft.graph.downloadUrl`
  );
  return data["@microsoft.graph.downloadUrl"] ?? null;
}

// ─── Download a file as a Blob ────────────────────────────────────────────────
// Use for triggering a browser download.
export async function downloadFile(itemId) {
  const blob = await graphFetch(
    `/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${itemId}/content`,
    { responseType: "blob" }
  );
  return blob;
}

// ─── Trigger a browser download from a Blob ───────────────────────────────────
// Call after downloadFile() to prompt the user's browser to save the file.
export function triggerBrowserDownload(blob, fileName) {
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─── Find a file by calibration record ID ────────────────────────────────────
// Searches the document library for a file whose name contains the record ID.
// Assumes naming convention like: ADAS-2024-03847_Honda_CRV.pdf
export async function findFileByRecordId(recordId) {
  const data = await graphFetch(
    `/sites/${SITE_ID}/drives/${DRIVE_ID}/root/search(q='${recordId}')` +
    `?$select=id,name,size,webUrl`
  );
  const results = data.value ?? [];
  return results.find((f) => f.name.includes(recordId)) ?? null;
}