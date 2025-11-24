# Local Testing Guide

This guide explains how to test the GitHub Pages frontend locally before deploying.

## Prerequisites

- Node.js 20.10.0+ (managed via asdf - `.tool-versions` file is included)
- npm (comes with Node.js)

## Quick Start

### Option 1: Build and Serve (Recommended)

```bash
# Build the guides data and start the server in one command
npm run dev
```

This will:
1. Build `docs/data/guides.json` from all `.mdc` files
2. Start a local server on `http://localhost:8080`
3. Open your browser to view the site

### Option 2: Build and Serve Separately

```bash
# Step 1: Build the guides data
npm run build

# Step 2: Start the server
npm run serve
```

Then open `http://localhost:8080` in your browser.

## What Gets Built

The build script (`scripts/build-guides-data.mjs`) does the following:

1. **Scans Stack Directories**: Reads all stack folders (Arduino + PlatformIO, Python + FastAPI, etc.)
2. **Parses .mdc Files**: Extracts frontmatter and content from each guide file
3. **Generates JSON**: Creates `docs/data/guides.json` with:
   - Stack metadata (name, icon, summary, focus)
   - README content for each stack
   - All guides with frontmatter, content, and metadata
4. **Output**: Saves to `docs/data/guides.json` (~750KB)

## Testing the Frontend

Once the server is running:

1. **Homepage**: View all stacks with statistics
2. **Stack Cards**: Click any stack card to see all guides
3. **Guide Viewer**: Click individual guides to read full content
4. **Modal**: Guides open in a modal overlay for easy reading

## Making Changes

### Updating Guides

1. Edit `.mdc` files in the stack directories
2. Run `npm run build` to regenerate the data
3. Refresh your browser (the server auto-reloads)

### Updating Frontend

1. Edit files in `docs/` directory:
   - `index.html` - Structure and content
   - `styles.css` - Styling
   - `app.js` - Functionality
2. Refresh your browser to see changes

## Troubleshooting

### "No version is set for command node"

If you see this error, make sure `.tool-versions` exists (it should be in the repo root). If using asdf:

```bash
asdf install nodejs 20.10.0
asdf local nodejs 20.10.0
```

### Build Fails

- Check that all stack directories exist
- Verify `.mdc` files are readable
- Check Node.js version: `node --version` (should be 20.10.0)

### Server Won't Start

- Check if port 8080 is already in use
- Set a different port: `PORT=3000 npm run serve`
- Check file permissions on `docs/` directory

### Data Not Loading

- Ensure `docs/data/guides.json` exists (run `npm run build`)
- Check browser console for errors
- Verify the file is readable: `ls -la docs/data/guides.json`

## Alternative Testing Methods

### Using Python

```bash
npm run build
cd docs
python3 -m http.server 8000
# Open http://localhost:8000
```

### Using PHP

```bash
npm run build
cd docs
php -S localhost:8000
# Open http://localhost:8000
```

### Using npx serve

```bash
npm run build
npx serve docs
# Follow the URL shown in terminal
```

## Next Steps

Once local testing is successful:

1. Commit your changes
2. Push to GitHub
3. GitHub Actions will automatically build and deploy to GitHub Pages
4. Your site will be live at `https://[username].github.io/vibe-coding-rules/`

## Development Tips

- Keep the server running while developing
- Use browser DevTools to debug JavaScript
- Check Network tab to verify `guides.json` loads correctly
- Test on different screen sizes (responsive design)
- Try clicking through different stacks and guides

