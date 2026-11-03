# Alter X V1.0

A dark, responsive interface shell for the Alter X image enhancement project.

## Current implementation

- Responsive Imagine, Author, and About pages.
- Single-image selection by file picker or drag and drop.
- Local image preview.
- Image dimensions, file size, and format inspection.
- Device and Cloud mode selection with explanatory status text.
- Responsive layouts and reduced-motion support.

## Not implemented

- AI image enhancement or upscaling.
- NCNN/Vulkan device processing.
- Replicate cloud processing.
- Model execution.
- Custom output resolution calculations.
- Actual before-and-after output.
- Export of enhanced images.
- Persistent history or queue.

Processing controls remain disabled. This is intentional. The original JADX source and verified processing integration are still required.

## Run locally

Open `index.html` in a modern browser. For browser testing, serve this directory through a local static HTTP server.

## WZH workflow

This archive contains an editable web source project. Import compatibility depends on the WZH project's accepted ZIP structure and runtime. This package does not claim compatibility with undocumented WZH-specific manifests or import conventions.

## Project structure

- `index.html`: application entry point.
- `css/styles.css`: visual system and responsive layout.
- `js/app.js`: navigation and image selection behavior.
- `docs/`: implementation status and limitations.
