const previewParams = new URLSearchParams(window.location.search);

export const isPreviewMode = previewParams.get("preview") === "1";
export const isPreviewCapture = isPreviewMode && previewParams.get("capture") === "1";
