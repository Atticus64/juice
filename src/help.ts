import { cyan, green, reset, yellow } from "colors";

export const showHelp = () => {
  console.log(cyan(`juice ${reset("[options]")}`));
  console.log(reset("  A sweet and fresh script to configure windows terminal easily"));
  console.log(green("Options:"));
  console.log(`  --help     -h  ${yellow("Shows help")}`);
  console.log(`  --terminal -t  ${yellow("Terminal to apply config")}`);
  console.log(`  --scheme   -s  ${yellow("Set scheme")}`);
  console.log(`  --image    -i  ${yellow("Set background image")}`);
  console.log(`  --font     -f  ${yellow("Set font")}`);

  return;
};