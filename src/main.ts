import { red } from "colors";
import { Flags, getFlags } from "$/flag.ts";
import { changeConfig, checkConfig, getWtFiles } from "$/config.ts";
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
    throw Error(
      red(
        "You need to have a config file juice.json in current dir or in $HOME/config/juice.json",
      ),
    );
  }

  const [fileWindowsTerminal, wtPath] = await getWtFiles(configPath);

  const fileWtJson = JSON.parse(fileWindowsTerminal);

  changeConfig(flags, fileWtJson, wtPath);
};

if (import.meta.main) main();
