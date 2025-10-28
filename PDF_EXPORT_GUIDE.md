# PDF Export Guide

## How to Generate a PDF of the Presentation

### Method 1: Using the Export Button (Easiest)

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the presentation** in your browser (usually http://localhost:5173)

3. **Switch to English** using the language switcher in the top-right (EN button)

4. **Click the "Export PDF" button** in the bottom-right corner

5. **In the print dialog:**
   - **Destination**: Select "Save as PDF"
   - **Layout**: Landscape
   - **Paper size**: Custom (16in x 9in) or A4 Landscape
   - **Margins**: None
   - **Options**: 
     - ✅ Background graphics
     - ✅ Headers and footers (optional)
   - **Scale**: 100% or "Fit to page"

6. **Click "Save"** and choose your location

### Method 2: Using Browser Print (Alternative)

1. Open the presentation in your browser
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows/Linux)
3. Follow the same print settings as above

### Method 3: Using Chromium-based Browser (Best Quality)

For the best PDF quality, use Chrome, Edge, or Brave:

1. Open the presentation
2. Press `Cmd+P` or `Ctrl+P`
3. Configure settings as above
4. Click "More settings" and ensure:
   - Scale: 100%
   - Headers and footers: Off (cleaner look)
   - Background graphics: On
   - Margins: None

### Tips for Best Results

- **Wait for all content to load** before printing (especially charts)
- **Check the preview** before saving
- The PDF will include all slides in sequence
- Charts and visualizations will be included
- The language switcher and export button will be hidden in the PDF

### Troubleshooting

**If charts don't appear:**
- Scroll through all slides once before printing
- Wait a few seconds after the page loads
- Refresh the page and try again

**If layout looks wrong:**
- Check that you selected "Landscape" orientation
- Try adjusting the scale to "Fit to page"
- Ensure "Background graphics" is enabled

**If some slides are cut off:**
- Try selecting "Letter" or "A4" paper size in Landscape
- Adjust margins to "Minimum" instead of "None"

### File Size

The generated PDF will be approximately 5-15 MB depending on the number of charts and images.

### Recommended Settings Summary

```
Format: PDF
Orientation: Landscape
Paper: 16x9 (or A4 Landscape)
Margins: None
Scale: 100% or Fit to page
Background graphics: ✅ On
Headers/footers: ❌ Off
```

---

## For Production Build

If you want to deploy and generate PDFs from the production build:

```bash
npm run build
npm run preview
```

Then follow the same export process.
