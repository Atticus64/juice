import { Flags, getFlags } from "$/flag.ts";
import {
  changeConfig,
  checkConfig,
  getSettingsFile,
  getWtFiles,
} from "$/config.ts";
import { showHelp, showVersion } from "$/help.ts";

const main = async () => {
  const flags: Flags = await getFlags();

  const needHelp = flags.help || flags.h;

  const versionAsk = flags.version || flags.v;

  if (needHelp || Deno.args.length === 0) {
    showHelp();
    return;
  }

  if (versionAsk) {
    showVersion();
    return;
  }

  const [configPath, haveConfig] = await checkConfig();

  if (!haveConfig) {
    try {
      const settingsPath = await getSettingsFile();

      const fileWindowsTerminal = await Deno.readTextFile(settingsPath);

      const fileWtJson = JSON.parse(fileWindowsTerminal);

      changeConfig(flags, fileWtJson, settingsPath);

      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  try {
    const [fileWindowsTerminal, wtPath] = await getWtFiles(configPath);

    const fileWtJson = JSON.parse(fileWindowsTerminal);

    changeConfig(flags, fileWtJson, wtPath);
  } catch (err) {
    throw new Error(err);
  }
};

if (import.meta.main) main();
