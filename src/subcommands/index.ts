import { Subcommands } from "../flag.ts"
import { Flags } from '../flag.ts';
import { useProfileFlags } from './use.ts';
import { addScheme } from './add.ts';


export const executeSubCommand = async (flags: Flags, subCommand: string) => {

  if (subCommand === Subcommands.add) {
    const schemeRaw = Deno.args[1]

    flags = await addScheme(schemeRaw, flags)

  } else if (subCommand === Subcommands.use) {
    flags = await useProfileFlags(flags)
  }

  return flags

}

