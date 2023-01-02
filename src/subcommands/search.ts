
export const haveSubCommand = (command: string, args: string[]) => {
  return args.some(cmd => cmd === command);
}
