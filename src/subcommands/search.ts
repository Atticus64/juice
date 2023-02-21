const subcomands = ["use", "add", "install"]

export const hasSubCommand = (command: string, args: string[]) => {
  return args.some((cmd) => cmd === command);
};

export const checkSubCommands = (args: string[]) => {
  let flag = false;

  subcomands.forEach(cmd => {
    if (args.includes(cmd)) {
      flag = true
    }
  })

  return flag
}

export const getSubCommand = (args: string[]) => {
  let subCommand = '';

  subcomands.forEach(cmd => {
    if (args.includes(cmd)) {
      subCommand = cmd
    }
  })

  return subCommand
}

