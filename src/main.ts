import { Flags, getFlags } from "$/flag.ts";
import {
  changeConfig,
  checkConfig,
  getSettings,
  configureWindowsTerminal
} from "$/config.ts";
import { checkHelp, askVersion } from '$/help.ts';

const main = async () => {
  const flags: Flags = await getFlags();

  if (checkHelp(flags) || askVersion(flags)) {
    return;
  }

  const [configPath, hasJuiceConfig] = await checkConfig();

  if (!hasJuiceConfig) {
    const [settingsJson, path] = await getSettings();
    changeConfig(flags, settingsJson, path)
    return;
  }

  await configureWindowsTerminal(flags, configPath);
};

if (import.meta.main) main();
