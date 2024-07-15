export const copyText = async (text = 'copy') => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
  }

