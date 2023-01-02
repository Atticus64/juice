import { parse } from "flags";
import { useProfileFlags } from "$/subcommands/use.ts";
import { Cursor } from "$/profile.ts";
import { haveSubCommand } from '$/subcommands/search.ts';

interface LayoutFlags {
  scheme?: string;
  s?: string;
  c?: Cursor;
  cursor?: Cursor;
  p?: string;
  padding?: string;
  o?: number;
  opacity?: number;
}

interface ImageFlags {
  i?: string;
  image?: string;
}

interface FontsFlags {
  f?: string;
  font?: string;
  fontSize?: number;
  z?: number;
}

interface GeneralFlags {
  h?: boolean;
  help?: boolean;
  t?: string;
  terminal?: string;
  v?: boolean;
  version?: boolean;
}

export interface Flags
  extends LayoutFlags, FontsFlags, GeneralFlags, ImageFlags {
  _: (string | number)[];
}

const terminal = ["terminal", "t"];
const scheme = ["scheme", "s"];
const font = ["font", "f"];
const fontSize = ["fontSize", "z"];
const help = ["help", "h"];
const cursor = ["cursor", "c"];
const padding = ["padding", "p"];
const version = ["version", "v"];
const opacity = ["opacity", "o"];

export const getFlags = async () => {
  let flags: Flags = parse(Deno.args, {
    boolean: [...help, ...version],
    string: [
      ...terminal,
      ...font,
      ...fontSize,
      ...scheme,
      ...cursor,
      ...padding,
      ...opacity
    ],
  });

  const haveUse = haveSubCommand('use', Deno.args)

  if (haveUse) {
    flags = await useProfileFlags(flags);
  }

  return flags;
};
