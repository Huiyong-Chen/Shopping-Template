import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const htmlDir = resolve(import.meta.dirname, "../src/source-htmls");
const targetHtmlDir = resolve(import.meta.dirname, "../src");
const indexPath = resolve(import.meta.dirname, "../src/index.mts");

const htmlMatch = /<a\b[^>]*?\shref=(["'])(.*?)\1[\s\S]*?>/i;
const cssLinkMatch = /<link\s+[^>]*?rel=["']stylesheet["'][^>]*?>/gi;
const cssHrefMatch = /href=(["'])(.*?)\1/i;
const scriptMatch = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const scriptSrcMatch = /src=(["'])(.*?)\1/i;
const imgMatch = /<img\s+[^>]*?src=(["'])(.*?)\1[^>]*?>/gi;

// 读取文件内容并更改相关内容
function readAllHtmlPaths(
  path: string,
  filePaths: {
    htmlPaths: {
      [path: string]: string;
    };
    cssPaths: string[];
    jsPaths: string[];
    jsContent: string[];
  } = {
    htmlPaths: {},
    cssPaths: [],
    jsPaths: [],
    jsContent: [],
  }
) {
  const htmlPath = resolve(htmlDir, path);
  const fileContent = readFileSync(htmlPath, { encoding: "utf-8" });
  const fileLines = fileContent.split("\n");

  let newContent = "";
  for (const line of fileLines) {
    let newLine = line;
    // 提取a链接href
    const aHrefMatch = line.match(htmlMatch);
    if (aHrefMatch) {
      const htmlRef = aHrefMatch[2].trim() as string;
      if (htmlRef.endsWith(".html") && !(htmlRef in filePaths.htmlPaths)) {
        filePaths.htmlPaths[htmlRef] = "";
        readAllHtmlPaths(htmlRef, filePaths);
      }
    }
    // 替换图片路径
    if (line.match(imgMatch)) {
      newLine = line.replace(imgMatch, (match, quote, src) => {
        const newSrc = `../src/${src}`;
        return match.replace(src, newSrc);
      });
    }
    // 是否是css link，如果是的话，则提取出来
    newLine = translationContent(
      newLine,
      cssLinkMatch,
      (link) => {
        const linkSrc = link.match(cssHrefMatch);
        if (linkSrc && !filePaths.cssPaths.includes(linkSrc[2])) {
          filePaths.cssPaths.push(linkSrc[2]);
        }
      },
      ""
    );

    // 是否是script，如果是的话，则提取出来
    newLine = translationContent(
      newLine,
      scriptMatch,
      (script) => {
        const scriptSrc = script.match(scriptSrcMatch);
        if (scriptSrc && !filePaths.jsPaths.includes(scriptSrc[2])) {
          filePaths.jsPaths.push(scriptSrc[2]);
        }
      },
      ""
    );
    newContent += newLine + "\n";
  }

  // 是否是内联script，如果是的话，则提取出来
  newContent = translationContent(
    newContent,
    scriptMatch,
    (script) => {
      const srcMatch = script.match(scriptSrcMatch);
      if (!srcMatch) {
        // 内联脚本，提取内容
        const contentMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        const scriptContent = contentMatch ? contentMatch[1].trim() : "";
        if (scriptContent) {
          filePaths.jsContent.push(scriptContent);
        }
      }
    },
    ""
  );
  filePaths.htmlPaths[path] = newContent;

  return filePaths;
}

// 转换内容
function translationContent(
  content: string,
  re: RegExp,
  matchCallback: (matchContent: string) => void,
  replace?: string
) {
  const matchs = content.match(re) ?? [];
  if (matchs.length) {
    matchs.forEach(matchCallback);
    if (replace !== undefined && replace !== null) {
      content = content.replace(re, "");
    }
  }
  return content;
}

function saveContent(path, content) {
  writeFileSync(path, content);
}

function generateIndex(paths: {
  cssPaths: string[];
  jsPaths: string[];
  jsContent: string[];
}) {
  // **注意** super-slide不规范 package，没有导出
  let content = `import "jquery";
import "super-slide/jquery.SuperSlide.2.1.3.js";
import "flexslider";
  `;

  for (const jsPath of paths.jsPaths) {
    if (!jsPath.includes("jquery") && !jsPath.includes("flexslider")) {
      content += `import './${jsPath}';` + "\n";
    }
  }
  content += "\n\n";
  for (const cssPath of paths.cssPaths) {
    content += `import './${cssPath}';` + "\n";
  }

  content += "\n\n";
  for (const jsContent of paths.jsContent) {
    content += jsContent + "\n";
  }
  return content;
}

function generateWebpackConfig(htmls: string[]) {
  return `import HtmlWebpackPlugin from "html-webpack-plugin";
    import { resolve } from "path";
    import Webpack from "webpack";
    
    console.log(import.meta);
    
    const config: Webpack.Configuration = {
      mode: "development",
      entry: {
        bundle: "./src/index.mts",
      },
      output: {
        path: resolve(import.meta.dirname, "dist"),
        filename: "js/[name].[hash:6].js",
      },
      module: {
        rules: [
          { test: /\.css$/i, use: ["style-loader", "css-loader"] },
          {
            test: /\.(jpg|png|jpeg|gif|svg)$/i,
            type: "asset/resource",
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024,
              },
            },
            generator: {
              filename: "assets/images/[name].[hash:6][ext]",
            },
          },
          { test: /\.([cm]?ts)$/i, loader: "ts-loader" },
        ],
      },
      plugins: [
      ${htmls
        .map(
          (htmlName) => `new HtmlWebpackPlugin({
          filename: "${htmlName}",
          template: "./src/${htmlName}",
        })`
        )
        .join(",\n")},
        new Webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
        }),
      ],
    };
    
    export default config;
    `;
}

(() => {
  const paths = readAllHtmlPaths("index.html");
  console.log(Object.keys(paths.htmlPaths));

  //   拷贝并更新html
  for (const htmlPath in paths.htmlPaths) {
    saveContent(resolve(targetHtmlDir, htmlPath), paths.htmlPaths[htmlPath]);
  }
  // 添加入index.mts
  saveContent(indexPath, generateIndex(paths));
  // 更新webpack config
  saveContent(
    resolve(import.meta.dirname, "../webpack.config.ts"),
    generateWebpackConfig(Object.keys(paths.htmlPaths))
  );
})();
