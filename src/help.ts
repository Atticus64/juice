import { blue, cyan, green, reset, yellow } from "colors";
const version = "0.2.1";

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
    `  use  <profile>  ${yellow("Set profile config of juice.json")}`,
  );
  console.log(green("Options:"));
  console.log(`  --help      -h  ${yellow("Shows help")}`);
  console.log(`  --version   -v  ${yellow("Show current version")}`);
  console.log(`  --terminal  -t  ${yellow("Terminal to apply config")}`);
  console.log(`  --scheme    -s  ${yellow("Set scheme")}`);
  console.log(`  --image     -i  ${yellow("Set background image")}`);
  console.log(`  --font      -f  ${yellow("Set font")}`);
  console.log(`  --fontSize -z  ${yellow("Set font size")}`);
  console.log(`  --cursor    -c  ${yellow("Set cursor style")}`);
  console.log(`  --padding   -p  ${yellow("Set padding")}`);

  return;
};
