# AI的prompt解析工具

> prompt主要构成是关键词和参数。这个工具主要完成了将关键词跟进逗号分隔成一个一个的参数项，并且将最后的参数解析成对一个对象。后面的参数会覆盖前面的参数。
> 分隔符兼容中英文逗号，中文顿号，中英文分号等。

## 使用方式

``` javascript
const PromptParse = require("prompt-parse-js");

const promptstr = `geisha woman in ink on white matte vinyl wall sticker， in the style of anton mauve、 flowing fabrics, traditional costumes  --s    750 --v 5.2`;

const data = new PromptParse(promptstr);

// 后增加参数，会覆盖前面的参数
data.addQuery(["--q   1", " --ar 16:9", "--v 5.1 ", "adwa", "--x"]);
// 参数单独增加一条
data.addQuery("--iw 2");
// 增加文字，会自动补充在文字的最后部分
data.addText("测试一下");

// 获取可使用的对象
console.log(data.toData());
// 获取转化之后的字符串，可以直接进行请求
console.log(data.toString());

```

## 安装

```
npm install -S prompt-parse-js
```