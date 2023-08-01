export default class PromptParse {
  constructor(str: string) {
    this.prompt = str;
    this._parsePrompt();
  }
  prompt: string = "";
  text: string[] = [];
  query = new Map();
  /**
   * 增加文字描述
   * @param  {...any} str 增加的字符串参数，可多个
   */
  addText(...str: string[]) {
    this.text.push(...str);
  }
  /**
   *
   * @param  {...any} args 1到N个增加的参数
   * 例如:data.addQuery("--q 1", "--ar 16:9", "--v 5.1", "adwa", "--x");
   */
  addQuery(args: string[] | string) {
    if (typeof args === "string") args = [args];
    for (let index = 0; index < args.length; index++) {
      const item = args[index];
      if (!/--[a-z]{1,10}/.test(item)) continue;
      const data = this._parseCommand(item);
      this.query.set(data.name, data);
    }
  }
  _parseCommand(str: string) {
    const list = str.split(" ").filter((item) => item !== "");
    return {
      name: list[0],
      value: list[1] || "",
      source: list.join(" "),
    };
  }
  /**
   * 重新渲染prompt
   * @param {*} str 咒语
   */
  reStart(str?: string) {
    if (str) this.prompt = str;
    this._parsePrompt();
  }
  // 筛选内容，不建议使用
  _parsePrompt() {
    const list = this.prompt.replace(/[，、；。;]/g, ",").split(",");
    const text_list = [];
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (/--[a-z]{1,10} [a-z0-9.]/.test(item)) {
        const text = this._parseQuery(item);
        text_list.push(text);
      } else {
        text_list.push(item.trim());
      }
    }
    this.text = text_list;
  }
  // 筛选内容，不建议使用
  _parseQuery(str: string) {
    const list = str.split(" ").filter((item) => item !== "");
    let text = "";
    let isKey = false;
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!item) continue;
      if (isKey) {
        isKey = false;
        continue;
      }
      const isstart = /^--[a-z]{1,10}$/.test(item);
      if (!isstart && !isKey) {
        text += item + " ";
        continue;
      }
      if (isstart) {
        isKey = true;
        const data = this._parseCommand(item + " " + list[index + 1] || "");
        this.query.set(data.name, data);
      }
    }
    return text;
  }
  /**
   * 返回可用对象
   * @returns 可用对象，文本和参数分别使用数组返回
   */
  toData() {
    return {
      text: this.text,
      query: Array.from(this.query.values()),
    };
  }
  toString() {
    const list = Array.from(this.query.values());
    return (
      this.text.join(",") + " " + list.map((item) => item.source).join(" ")
    );
  }
}
