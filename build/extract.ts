import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import SVGO from "svgo";
import svgoPlugins from "./svgoPlugins.js";
const svgo = new SVGO(svgoPlugins);

const SOURCE_PATH = "../seti-ui/styles/components/icons/mapping.less";
const BASE_PATH = "../seti-ui/icons";

const source = readFileSync(resolve(__dirname, SOURCE_PATH), "utf-8");

const iconsTable = {};

const definitions = source.split("\n").reduce(
  (definitions, line) => {
    const match = line.match(
      /\.icon-(partial|set)\(("|')(.*)\2, ("|')(.*)\4, @(.*)\);/
    );
    if (match !== null) {
      const [, type, , extension, , icon] = match;
      let [, , , , , , color] = match;
      if (color === "seti-primary") {
        color = "blue";
      }
      iconsTable[icon] = true;
      if (type === "partial") {
        definitions.partials.unshift([extension, [icon, color]]);
      } else if (type === "set") {
        // match a file extension
        if (extension[0] === ".") {
          definitions.extensions[extension] = [icon, color];
        } else {
          definitions.files[extension] = [icon, color];
        }
      }
    }
    return definitions;
  },
  {
    files: {},
    extensions: {},
    partials: [],
    default: ["default", "white"],
  }
);

writeFileSync(
  resolve(__dirname, "../src/definitions.json"),
  JSON.stringify(definitions)
);

// optimize svgs
const trim = async (svg: string): Promise<string> => {
  return (await svgo.optimize(svg)).data;
};

// icons used for file types
const usedIcons = Object.keys(iconsTable);
(async (): Promise<void> => {
  const optimizedIcons = await Promise.all(
    usedIcons.map(async (icon) => {
      try {
        const content = readFileSync(
          resolve(__dirname, BASE_PATH, `${icon}.svg`),
          "utf-8"
        );
        const optimized = await trim(content);
        return [icon, optimized];
      } catch (e) {
        console.log(`Skipping ${icon}.`);
        return null;
      }
    })
  );

  const icons = optimizedIcons
    .filter((icon) => icon !== null)
    .reduce((icons, [icon, content]) => {
      icons[icon] = content;
      return icons;
    }, {});
  writeFileSync(resolve(__dirname, "../src/icons.json"), JSON.stringify(icons));
})();
