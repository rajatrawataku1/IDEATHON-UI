export class TextHelper {
  static trimTitle(title = '') {
    let text = '';
    text = title.replace(/^(.{12}[^\s]*).*/, "$1");
    if (text.length < title.length) {
      text += '...';
    }
    return text;
  }
}
