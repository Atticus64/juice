
export const haveSubcommand = (command: string, args: string[]) => {
  return args.some(cmd => cmd === command);
}
