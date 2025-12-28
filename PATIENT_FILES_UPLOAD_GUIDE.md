# Patient Files Upload Implementation

## Overview

This implementation allows patients to upload their medical files (images, PDFs, documents) to the backend with the patient ID, similar to how doctor files are handled during registration.

## Files Created/Modified

### 1. **apiPatientFiles.js** (NEW)

Location: `src/services/apiPatientFiles.js`

**Functions:**

- `uploadPatientFiles(patientId, files)` - Uploads files using FormData
- `getPatientFiles(patientId)` - Retrieves all files for a patient
- `deletePatientFile(patientId, fileId)` - Deletes a specific file

**How it works:**

```javascript
const payload = new FormData();
payload.append("patientId", patientId);

// Append each file
files.forEach((fileData, index) => {
  payload.append("files", fileData.file);
  payload.append(`fileMetadata[${index}][name]`, fileData.name);
  payload.append(`fileMetadata[${index}][type]`, fileData.type);
  // ... more metadata
});

// Send to backend
await axiosClient.post(`/api/patients/${patientId}/files`, payload, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

### 2. **useUploadPatientFiles.js** (NEW)

Location: `src/features/Patients/useUploadPatientFiles.js`

Custom React hook that manages upload state:

- `isUploading` - Loading state
- `uploadError` - Error messages
- `uploadSuccess` - Success state
- `uploadFiles(patientId, files)` - Function to trigger upload

### 3. **UploadPatientsFiles.jsx** (MODIFIED)

Location: `src/features/Patients/UploadPatientsFiles.jsx`

**Changes:**

- Added `pendingFiles` state to track files waiting for upload
- Stores actual `File` object alongside preview data
- Added `handleUploadToBackend()` function
- Added UI elements:
  - Success/Error messages
  - Pending upload badge with file count
  - "Upload Files to Server" button
  - Loading spinner during upload

## Backend API Expectations

The backend should have an endpoint that accepts:

**Endpoint:** `POST /api/patients/:patientId/files`

**Expected FormData Structure:**

```
patientId: "PAT-2024-001"
files: [File, File, ...]  // Array of actual file objects
fileMetadata[0][name]: "x-ray-chest.jpg"
fileMetadata[0][type]: "image/jpeg"
fileMetadata[0][uploadDate]: "Dec 23, 2024"
fileMetadata[0][requestedBy]: "Dr. Sarah Chen"
fileMetadata[1][name]: "blood-test.pdf"
fileMetadata[1][type]: "application/pdf"
// ... more metadata
```

**Backend Example (Node.js/Express with Multer):**

```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/patient-files/" });

router.post(
  "/patients/:patientId/files",
  authenticate,
  upload.array("files"),
  async (req, res) => {
    const { patientId } = req.params;
    const files = req.files; // Array of uploaded files
    const metadata = req.body.fileMetadata; // File metadata

    // Save to database with patientId reference
    // Return success response
  }
);
```

## Usage Flow

1. **User selects files** → Files are added to local state with preview
2. **Files appear in UI** → Shown in grid with pending upload badge
3. **User clicks "Upload Files to Server"** → Triggers `handleUploadToBackend()`
4. **Function extracts patient ID** from `localStorage.getItem("user")`
5. **Files sent via FormData** → Backend receives files + metadata
6. **Success/Error feedback** → UI updates with status messages

## Patient ID Retrieval

Currently retrieves from localStorage:

```javascript
const userData = JSON.parse(localStorage.getItem("user") || "{}");
const patientId = userData.id || userData._id || "PAT-2024-001";
```

**Adjust based on your auth setup:**

- If using React Context, get from context provider
- If using React Auth Kit, extract from auth state
- If passed as prop, use the prop value

## Key Features

✅ **FormData Upload** - Similar to doctor registration
✅ **Patient ID Included** - Sent with each upload
✅ **Multiple File Types** - Supports images, PDFs, documents
✅ **File Metadata** - Name, type, date, requesting doctor
✅ **Loading States** - Visual feedback during upload
✅ **Error Handling** - Displays error messages
✅ **Success Feedback** - Confirmation messages
✅ **Pending Queue** - Shows files waiting for upload

## Testing Checklist

- [ ] Upload single file
- [ ] Upload multiple files at once
- [ ] Upload different file types (JPG, PNG, PDF)
- [ ] Verify patient ID is sent correctly
- [ ] Check FormData structure in browser DevTools
- [ ] Test error handling (disconnect network)
- [ ] Verify success message appears
- [ ] Check pending files badge updates correctly
- [ ] Test delete functionality
- [ ] Verify files are stored with correct patient ID in backend

## Next Steps

1. **Backend Implementation** - Create the endpoint to receive files
2. **Database Schema** - Store file references with patient ID
3. **File Storage** - Configure storage (local disk, AWS S3, etc.)
4. **Retrieve Files** - Implement `getPatientFiles()` to load existing files
5. **Delete Functionality** - Connect delete button to backend
6. **Authentication** - Ensure only authorized users can upload

## Notes

- Files are stored in state with the actual File object preserved
- Preview URLs are generated using FileReader for display
- FormData automatically handles file encoding
- Backend receives files via `req.files` (with Multer) or similar
- Patient ID ensures files are associated with the correct patient
