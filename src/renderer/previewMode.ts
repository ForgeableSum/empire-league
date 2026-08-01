const previewParams = new URLSearchParams(window.location.search);

export const isPreviewMode = previewParams.get("preview") === "1";
export const isPreviewCapture = isPreviewMode && previewParams.get("capture") === "1";
export const previewPage = isPreviewMode ? previewParams.get("page") : null;
export const previewSection = isPreviewMode ? previewParams.get("section") : null;
