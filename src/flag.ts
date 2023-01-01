import { parse } from "flags";
import { red } from "colors";
import { checkConfig } from "$/config.ts";
import { getProfilesConfig } from "$/profile.ts";
import { Cursor, Profile } from "$/profile.ts";

interface layoutFlags {
  scheme?: string;
  s?: string;
  c?: Cursor;
  cursor?: Cursor;
  p?: string;
  padding?: string;
}

interface imageFlags {
  i?: string;
  image?: string;
}

interface fontsFlags {
  f?: string;
  font?: string;
  fontSize?: number;
  z?: number;
}

interface generalFlags {
  h?: boolean;
  help?: boolean;
  t?: string;
  terminal?: string;
  v?: boolean;
  version?: boolean;
}

export interface Flags
  extends layoutFlags, fontsFlags, generalFlags, imageFlags {
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
    ],
  });

  const haveUse = Deno.args.some((a) => a === "use");

  if (haveUse) {
    flags = await getProfileFlags(flags);
  }

  return flags;
};

const getProfileFlags = async (flags: Flags) => {
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

  return flags;
};
