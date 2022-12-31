import { exists } from "fs";
import home_dir from "home_dir";
import { green, red } from "colors";
import { File } from "$/file.ts";
import { Flags } from "$/flag.ts";

export const checkConfig = async (
  is_test?: boolean,
): Promise<([string, boolean])> => {
  const homeFile = home_dir() + "/.config/juice.json";
  const dirFile = "./juice.json";

  if (is_test) {
    const configPath = dirFile;
    const haveConfig = await exists(configPath);
    return [configPath, haveConfig];
  }

  let configPath = homeFile;
  let haveConfig = await exists(configPath);

  if (!haveConfig) {
    configPath = dirFile;
    haveConfig = await exists(configPath);
  }

  return [configPath, haveConfig];
};

export const getWtFiles = async (configPath: string) => {
  const fileRaw = await Deno.readTextFile(configPath);
  const wtJson = JSON.parse(fileRaw);
  let wtPath = wtJson.config;

  if (!wtPath) {
    wtPath = await getSettingsFile();
  }

  const fileWindowsTerminal = await Deno.readTextFile(wtPath);

  return [fileWindowsTerminal, wtPath];
};

export const changeConfig = (
  flags: Flags,
  data: File,
  path: string,
): [File, string] => {
  if (!flags.terminal && !flags.t) {
    throw new Error(
      red("You need to specify the terminal to apply the config"),
    );
  }

  const name = flags.terminal ?? flags.t;

  const profiles = data.profiles.list;

  const profile = profiles?.find((p) => {
    if (!name) return;

    return p.name.includes(name);
  });

  profiles.forEach((prof) => {
    if (!name || !profile) return;

    if (!prof.name.includes(name)) return;

    if (flags.f || flags.font) {
      if (!profile.font) return;

      const font = flags.f ?? flags.font;
      profile.font.face = font;
    }

    if (flags.z || flags.fontSize) {
      if (!profile.font) return;

      const size = flags.z ?? flags.fontSize;
      profile.font.size = Number(size);
    }

    if (flags.i || flags.image) {
      const image = flags.i ?? flags.image;
      profile.backgroundImage = image;
    }

    if (flags.s || flags.scheme) {
      const scheme = flags.s ?? flags.scheme;
      profile.colorScheme = scheme;
    }

    if (flags.p || flags.padding) {
      const padding = flags.p ?? flags.padding;
      profile.padding = padding;
    }

    if (flags.c || flags.cursor) {
      const cursor = flags.c ?? flags.cursor;
      profile.cursorShape = cursor;
    }
  });

  const newConfig = JSON.stringify(data, null, "\t");

  Deno.writeTextFile(path, newConfig);

  console.log(green("Config updated!"));

  return [data, newConfig];
};

export const getSettingsFile = async () => {
  let path = home_dir() + "\\AppData\\Local\\Packages\\";
  let folderName = "";

  for await (const entry of Deno.readDir(path)) {
    if (entry.name.startsWith("Microsoft.WindowsTerminal_")) {
      folderName = entry.name;
    }
  }

  path += `${folderName}\\LocalState\\settings.json`;

  const haveSettings = await exists(path);

  if (!haveSettings) {
    throw new Error(red(`Settings.json no exists in path: ${path}`));
  }

  return path;
};
