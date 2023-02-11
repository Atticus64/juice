import * as path from "fs";
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
    const hasConfig = await path.exists(configPath);
    return [configPath, hasConfig];
  }

  let configPath = homeFile;
  let hasConfig = await path.exists(configPath);

  if (!hasConfig) {
    configPath = dirFile;
    hasConfig = await path.exists(configPath);
  }

  return [configPath, hasConfig];
};

export const getWtFiles = async (
  configPath: string,
): Promise<[string, string]> => {
  try {
    const fileRaw = await Deno.readTextFile(configPath);
    const wtJson = JSON.parse(fileRaw);
    let wtPath = wtJson.config;

    if (!wtPath) {
      wtPath = await getSettingspath();
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
      const terminalProfile = flags.t ?? flags.terminal
      if (prof.name === terminalProfile)
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

export const getSettingspath = async () => {
  let settingsPath = home_dir() + "\\AppData\\Local\\Packages\\";
  let folderName = "";

  try {
    for await (const entry of Deno.readDir(settingsPath)) {
      if (entry.name.startsWith("Microsoft.WindowsTerminal_")) {
        folderName = entry.name;
      }
    }

    settingsPath += `${folderName}\\LocalState\\settings.json`;

    const hasSettings: boolean = await path.exists(settingsPath);

    if (!hasSettings) {
      throw new Error(red(`Settings.json no path.exists in path: ${path}`));
    }

    return settingsPath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSettings = async (): Promise<[File, string]> => {
  try {
    const settingsPath = await getSettingspath();

    const fileWindowsTerminal = await Deno.readTextFile(settingsPath);

    const fileWtJson: File = JSON.parse(fileWindowsTerminal);

    return [fileWtJson, settingsPath];
  } catch (err) {
    throw new Error(err);
  }
};

export const configureWindowsTerminal = async (
  flags: Flags,
  configPath: string,
) => {
  try {
    const [fileWindowsTerminal, wtPath] = await getWtFiles(configPath);

    const fileWtJson = JSON.parse(fileWindowsTerminal);

    changeConfig(flags, fileWtJson, wtPath);
  } catch (err) {
    throw new Error(err);
  }
};
