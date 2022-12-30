import { exists } from "https://deno.land/std@0.74.0/fs/mod.ts";
import home_dir from "https://deno.land/x/dir@1.5.1/home_dir/mod.ts";
import { green, red } from "https://deno.land/std@0.170.0/fmt/colors.ts";
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
  const wtPath: string = wtJson.config;
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
