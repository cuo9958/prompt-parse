const PromptParse = require("./dist").default;

const promptstr = `geisha woman in ink on white matte vinyl wall sticker， in the style of anton mauve、 light pink and red, gabriele dell'otto, presentation of human form, traditional animation, flowing fabrics, traditional costumes  --s    750 --v 5.2`;

const data = new PromptParse(promptstr);

data.addQuery(["--q   1", " --ar 16:9", "--v 5.1 ", "adwa", "--x"]);
data.addQuery("--iw 2");
data.addText("测试一下");

console.log(data.toData());
// {
//     text: [
//       'geisha woman in ink on white matte vinyl wall sticker',
//       'in the style of anton mauve',
//       'light pink and red',
//       "gabriele dell'otto",
//       'presentation of human form',
//       'traditional animation',
//       'flowing fabrics',
//       'traditional costumes ',
//       '测试一下'
//     ],
//     query: [
//       { name: '--s', value: '750', source: '--s 750' },
//       { name: '--v', value: '5.1', source: '--v 5.1' },
//       { name: '--q', value: '1', source: '--q 1' },
//       { name: '--ar', value: '16:9', source: '--ar 16:9' },
//       { name: '--x', value: '', source: '--x' },
//       { name: '--iw', value: '2', source: '--iw 2' }
//     ]
//   }
console.log(data.toString());
//   geisha woman in ink on white matte vinyl wall sticker,in the style of anton mauve,light pink and red,gabriele dell'otto,presentation of human form,traditional animation,flowing fabrics,traditional costumes ,测试一下 --s 750 --v 5.1 --q 1 --ar 16:9 --x --iw 2
