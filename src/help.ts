import { blue, cyan, green, reset, yellow } from "colors";
import { Flags } from "$/flag.ts";
const version = "0.3.3";

export const showVersion = () => {
  console.log(`juice ${version}`);
};

export const showHelp = () => {
  console.log(cyan(`juice ${reset("[options]")}`));
  console.log(
    reset("  A sweet and fresh script to configure windows terminal easily"),
  );
  console.log(blue("Subcommands:"));
  console.log(
    `  use <profile>   ${yellow("Set profile config of juice.json")}`,
  );
  console.log(green("Options:"));
  console.log(`  --help      -h  ${yellow("Shows help")}`);
  console.log(`  --version   -v  ${yellow("Show current version")}`);
  console.log(`  --terminal  -t  ${yellow("Terminal to apply config")}`);
  console.log(`  --scheme    -s  ${yellow("Set scheme")}`);
  console.log(`  --image     -i  ${yellow("Set background image")}`);
  console.log(`  --font      -f  ${yellow("Set font")}`);
  console.log(`  --fontSize  -z  ${yellow("Set font size")}`);
  console.log(`  --cursor    -c  ${yellow("Set cursor style")}`);
  console.log(`  --padding   -p  ${yellow("Set padding")}`);
  console.log(`  --opacity   -o  ${yellow("Set opacity")}`);

  return;
};

export const checkHelp = (flags: Flags) => {
  let needHelp = flags.help || flags.h;

  if (needHelp || Deno.args.length === 0) {
    showHelp();
    needHelp = true;
  }

  return Boolean(needHelp);
};

export const askVersion = (flags: Flags) => {
  const needVersion = flags.version || flags.v;

  if (needVersion) {
    showVersion();
  }

  return Boolean(needVersion);
};
