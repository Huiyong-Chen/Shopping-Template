import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

const targetDirName = "native";
const sourceDir = resolve(import.meta.dirname, "../source");
const targetDir = resolve(import.meta.dirname, `../src/${targetDirName}`);

const aHrefMatch = /<a\s+[^>]*href=(["'])(.*?)\1[^>]*>[\s\S]*?<\/a>/gi;
const cssLinkMatch =
  /<link\b(?=[^>]*\brel=(["'])stylesheet\1)(?=[^>]*\bhref=(["'])(.*?)\2)[^>]*\/?>/gi;
const cssLinkHrefMatch = /\bhref=(["'])(.*?)\1/i;

const scriptMatch = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const scriptExternalMatch = /\bsrc=(["'])(.*?)\1/i;

// 读取文件内容并更改相关内容
function readAllHtmlPaths(
  path: string,
  filesInfo: {
    [path: string]: {
      content: string;
      cssUrlList: string[];
      jsSrcList: string[];
      jsContentList: string[];
    };
  } = {}
) {
  if (filesInfo[path] === undefined) {
    filesInfo[path] = {
      content: "",
      cssUrlList: [],
      jsSrcList: [],
      jsContentList: [],
    };
  }

  const htmlPath = resolve(sourceDir, path);
  let fileContent = readFileSync(htmlPath, { encoding: "utf-8" });

  // 提取a标签的href
  const aHrefList = extractContent(fileContent, aHrefMatch).extract.filter(
    (href) => href.endsWith(".html")
  );
  if (aHrefList.length) {
    for (const htmlHref of aHrefList) {
      if (filesInfo[htmlHref] === undefined) {
        readAllHtmlPaths(htmlHref, filesInfo);
      }
    }
  }
  // 提取css link
  const { content: afterCssNewContent, extract: cssUrlList } = extractContent(
    fileContent,
    cssLinkMatch,
    cssLinkHrefMatch,
    ""
  );
  fileContent = afterCssNewContent;
  // 提取js（包括内联js）
  const {
    content: afterJSNewContent,
    jsSrcList,
    jsContentList,
  } = extractScriptContent(fileContent, scriptMatch, scriptExternalMatch, "");
  fileContent = afterJSNewContent;

  // 处理图片路径
  fileContent = fixImgSrc(fileContent);

  filesInfo[path] = {
    content: fileContent,
    cssUrlList,
    jsSrcList,
    jsContentList,
  };

  return filesInfo;
}

/**
 * 提取内容
 * @param content 内容
 * @param regex 匹配 正则
 * @param extractRegex 提取正则
 * @returns
 */
function extractContent(
  content: string,
  regex: RegExp,
  extractRegex?: RegExp,
  replaceText?: string
) {
  const results: string[] = [];

  if (extractRegex === undefined || extractRegex === null) {
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      results.push(match[2]);
    }
  } else {
    content = content.replace(regex, (matchContent) => {
      const hrefMatch = matchContent.match(extractRegex);
      if (hrefMatch) {
        results.push(hrefMatch[2]);
      }
      return replaceText ?? matchContent;
    });
  }

  return {
    content,
    extract: results,
  };
}

/**
 * 提取内容
 * @param content 内容
 * @param regex 匹配 正则
 * @param extractRegex 提取正则
 * @returns
 */
function extractScriptContent(
  content: string,
  regex: RegExp,
  extractRegex?: RegExp,
  replaceText?: string
) {
  const jsSrcList: string[] = [];
  const jsContentList: string[] = [];

  // replace 方法同时提取并移除
  content = content.replace(regex, (matchText, attrText, innerContent) => {
    const srcMatch = attrText.match(extractRegex);
    if (srcMatch) {
      // 外部 JS
      jsSrcList.push(srcMatch[2]);
    } else {
      // 内联 JS
      const code = innerContent.trim();
      if (code) {
        jsContentList.push(code);
      }
    }
    return replaceText ?? matchText;
  });

  return {
    content,
    jsSrcList,
    jsContentList,
  };
}

function fixImgSrc(content: string) {
  // 匹配 img 标签的 src 属性
  const regex = /<img\b([^>]*)>/gi;

  content = content.replace(regex, (_, attrText) => {
    // 提取 src
    const srcMatch = attrText.match(/\bsrc=(["'])(.*?)\1/i);
    const dataSrcMatch = attrText.match(/\bdata-src=(["'])(.*?)\1/i);

    let newAttrText = attrText;

    // 处理 src
    if (srcMatch) {
      let src = srcMatch[2];
      if (!src.startsWith("assets/images/")) {
        src = `assets/images/${src.replace(/^\.?\/?img\//, "")}`;
      }
      newAttrText = newAttrText.replace(
        srcMatch[0],
        `src=${srcMatch[1]}${src}${srcMatch[1]}`
      );
    }

    // 处理 data-src
    if (dataSrcMatch) {
      let dataSrc = dataSrcMatch[2];
      if (dataSrc.startsWith("assets/images/")) {
        dataSrc = `assets/images/${dataSrc.replace(/^\.?\/?img\//, "")}`;
      }
      newAttrText = newAttrText.replace(
        dataSrcMatch[0],
        `data-src=${dataSrcMatch[1]}${dataSrc}${dataSrcMatch[1]}`
      );
    }

    return `<img${newAttrText}>`;
  });

  return content;
}

// 保存
function saveContent(path: string, content: string) {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path, content, {});
}

function generateJS(
  cssUrlList: string[],
  jsSrcList: string[],
  jsContentList: string[]
) {
  // **注意** super-slide不规范 package，没有导出
  let content = "";

  for (const jsPath of jsSrcList) {
    if (/(?:.*\/)?jquery-([\d.]+)(?:\.min)?\.js$/i.test(jsPath)) {
      content += `import "jquery";\n`;
    } else if (/(?:.*\/)?jquery\.flexslider(?:-min)?\.js$/i.test(jsPath)) {
      content += `import "flexslider";\n`;
    } else if (/(?:.*\/)?jquery\.SuperSlide\.([\d.]+)\.js$/i.test(jsPath)) {
      content += `import "super-slide/jquery.SuperSlide.2.1.3.js";\n`;
    } else {
      content += `import './${jsPath}';` + "\n";
    }
  }
  content += "\n\n";
  for (const cssPath of cssUrlList) {
    content += `import './${cssPath}';` + "\n";
  }

  content += "\n\n";
  for (const jsContent of jsContentList) {
    content += jsContent + "\n";
  }
  return content;
}

function generateWebpackConfig(entries: string[]) {
  return `import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join, resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";
import Webpack from "webpack";

const config: Webpack.Configuration | Webpack.WebpackOptionsNormalized = {
  mode: "development",
  devServer: {
    static: {
      directory: join(import.meta.dirname, "../dist/${targetDirName}"),
    },
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
  entry: {
    ${entries
      .map((entry) => {
        const name = entry.slice(0, -5);
        return `${name}: "./src/${targetDirName}/${name}.mts"`;
      })
      .join(",\n\t\t")}
  },
  output: {
    clean: true,
    path: resolve(import.meta.dirname, "../dist/${targetDirName}"),
    filename: "js/[name].[hash:6].js",
  },
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
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
  ${entries
    .map(
      (entry) => `\tnew HtmlWebpackPlugin({
      filename: "${entry}",
      template: "./src/${targetDirName}/${entry}",
      chunks: ["${entry.slice(0, -5)}"],
    })`
    )
    .join(",\n\t")},
    new Webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(import.meta.dirname, "../src/${targetDirName}/img"),
          to: resolve(import.meta.dirname, "../dist/${targetDirName}/assets/images"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash:6].css",
      chunkFilename: "styles/[name].[hash:6].chunk.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};

export default config;
    `;
}

(() => {
  const pathsInfo = readAllHtmlPaths("index.html");

  for (const path in pathsInfo) {
    const { content, cssUrlList, jsSrcList, jsContentList } = pathsInfo[path];
    // 生成html
    saveContent(resolve(targetDir, path), content);
    // 生成js
    saveContent(
      resolve(targetDir, `${path.slice(0, -4)}mts`),
      generateJS(cssUrlList, jsSrcList, jsContentList)
    );
  }
  // 更新webpack配置
  saveContent(
    resolve(
      import.meta.dirname,
      `../webpack-configs/webpack.${targetDirName}.config.ts`
    ),
    generateWebpackConfig(Object.keys(pathsInfo))
  );
})();
