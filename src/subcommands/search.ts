export const hasSubCommand = (command: string, args: string[]) => {
  return args.some((cmd) => cmd === command);
};
