# Empire League landing page

This folder is a static site. You can open `index.html` directly or serve it with
any static file server:

```powershell
npx serve landing
```

The embedded app preview is built from the real React renderer. Rebuild it after
renderer changes with:

```powershell
npm run build:landing-preview
```

Before publishing, replace the `href="#"` value on both elements marked `data-download`
in `index.html` with the final installer URL.
