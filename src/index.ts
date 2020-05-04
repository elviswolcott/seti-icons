import rawDefinitions = require("./definitions.json");
import rawIcons = require("./icons.json");

type IconDetails = [string, string];

interface SetiTheme {
  blue: string;
  grey: string;
  "grey-light": string;
  green: string;
  orange: string;
  pink: string;
  purple: string;
  red: string;
  white: string;
  yellow: string;
  ignore: string;
}

type Color = keyof SetiTheme;

interface Icon {
  svg: string;
  color: Color;
}

interface ThemedIcon {
  svg: string;
  color: string;
}

const definitions = (rawDefinitions as unknown) as {
  default: IconDetails;
  extensions: { [extension: string]: IconDetails };
  files: { [file: string]: IconDetails };
  partials: [string, IconDetails][];
};
const icons = (rawIcons as unknown) as {
  [icon: string]: string;
};

const getDetails = (fileName: string): IconDetails => {
  if (definitions.files.hasOwnProperty(fileName)) {
    return definitions.files[fileName];
  }
  let extension = fileName.slice(fileName.indexOf("."));
  while (extension !== "") {
    if (definitions.extensions.hasOwnProperty(extension)) {
      return definitions.extensions[extension];
    }
    // look for next "."
    extension = extension.slice(1);
    extension = extension.slice(extension.indexOf("."));
  }
  for (const partial of definitions.partials) {
    if (fileName.indexOf(partial[0]) > -1) {
      return partial[1];
    }
  }
  return definitions.default;
};

const getIcon = (fileName: string): Icon => {
  const [icon, color] = getDetails(fileName);
  return {
    svg: icons[icon],
    color,
  } as Icon;
};

const themeIcons = (theme: SetiTheme) => {
  return (fileName: string): ThemedIcon => {
    const icon = getIcon(fileName);
    return {
      ...icon,
      color: theme[icon.color],
    };
  };
};

export { getIcon, themeIcons };
