import { parse } from "flags";
import { red } from "colors";
import { checkConfig } from "$/config.ts";
import { getProfilesConfig } from "$/profile.ts";
import { Cursor, Profile } from "$/profile.ts";
import { haveSubcommand } from '$/subcommands/search.ts';

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

  const haveUse = haveSubcommand('use', Deno.args)

  if (haveUse) {
    flags = await useProfileFlags(flags);
  }

  return flags;
};

const useProfileFlags = async (flags: Flags) => {
  const idx = Deno.args.findIndex((a) => a === "use");
  const profileName: string | undefined = Deno.args[idx + 1];

  if (!profileName) {
    throw Error(red("You need to write a profile name: use <profile>"));
  }

  const [pathConfig, _exists] = await checkConfig();

  const profiles = await getProfilesConfig(pathConfig);

  const profile: Profile = profiles[profileName];

  if (!profile) {
    throw Error(red("Profile dont exist in profiles"));
  }

  flags.cursor = profile.cursorShape ?? flags.cursor;
  flags.image = profile.backgroundImage ?? flags.image;
  flags.font = profile.font?.face ?? flags.font;
  flags.fontSize = profile.font?.size ?? flags.fontSize;
  flags.scheme = profile.colorScheme ?? flags.scheme;
  flags.padding = profile.padding ?? flags.padding;
  flags.opacity = profile.opacity ?? flags.opacity;

  return flags;
};
