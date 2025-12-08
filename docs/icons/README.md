# Icons

This folder contains PNG icon images for each technology stack.

## Icon Naming Convention

Icons should be named according to the stack `id` from `build-guides-data.mjs`:

- `arduino.png` - Arduino + PlatformIO
- `fastapi.png` - Python + FastAPI
- `solidity.png` - Solidity + Foundry
- `nextjs.png` - TypeScript-React + Nextjs
- `python.png` - Python
- `typescript.png` - TypeScript
- `rust.png` - Rust

## Icon Specifications

- **Format**: PNG with transparency
- **Recommended Size**: 64x64px to 128x128px
- **Aspect Ratio**: Square (1:1)
- **Background**: Transparent
- **Style**: Should work well on dark backgrounds

## Adding New Icons

When adding a new technology stack:

1. Add the icon file to this folder using the naming convention: `{stack-id}.png`
2. The icon path will automatically be set to `icons/{stack-id}.png` in the build script
3. Ensure the icon is optimized for web use
