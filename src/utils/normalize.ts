export const normalizePhone = (str: string): string => {
  if (!str) return "";

  const normalizeStr = str
    .trim()
    .replace(
      /\s*(?:ext(?:ension)?\.?|extn\.?|x|доб\.?)\s*[:#\-]?\s*\d+\s*$/i,
      ""
    );

  return normalizeStr.replace(/\D+/g, "");
};
