import { exists } from "fs";
import home_dir from "home_dir";
import { green, red } from "colors";
import { File } from "$/file.ts";
import { Flags } from "$/flag.ts";
import { changeProfileValues } from "$/profile.ts";

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
  try {
    const fileRaw = await Deno.readTextFile(configPath);
    const wtJson = JSON.parse(fileRaw);
    let wtPath = wtJson.config;

    if (!wtPath) {
      wtPath = await getSettingsFile();
    }

    const fileWindowsTerminal = await Deno.readTextFile(wtPath);

    return [fileWindowsTerminal, wtPath];
  } catch (err) {
    throw new Error(err);
  }
};

export const changeConfig = async (
  flags: Flags,
  data: File,
  path: string,
): Promise<[File, string]> => {
  if (!flags.terminal && !flags.t) {
    throw new Error(
      red("You need to specify the terminal to apply the config"),
    );
  }

  try {
    const profiles = data.profiles.list;

    profiles.forEach((prof) => {
      changeProfileValues(prof, flags);
    });

    const newConfig = JSON.stringify(data, null, "\t");

    await Deno.writeTextFile(path, newConfig);

    console.log(green("Config updated!"));

    return [data, newConfig];
  } catch (err) {
    throw new Error(err);
  }
};

export const getSettingsFile = async () => {
  let path = home_dir() + "\\AppData\\Local\\Packages\\";
  let folderName = "";

  try {
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
  } catch (err) {
    throw new Error(err);
  }
};
