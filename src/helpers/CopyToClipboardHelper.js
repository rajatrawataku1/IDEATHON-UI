export class CopyToClipboardHelper {
  static copy(textToCopy) {
    function listener(e) {
      e.clipboardData.setData("text/plain", textToCopy);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  }
}
