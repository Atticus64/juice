import { parse } from "https://deno.land/std@0.168.0/flags/mod.ts";
import { red } from "colors";
import { checkConfig } from "$/config.ts";
import { getProfilesConfig } from "$/profile.ts";
import { Profile } from "$/profile.ts";

export interface Flags {
  terminal?: string;
  scheme?: string;
  image?: string;
  help?: boolean;
  font?: string;
  fontSize?: number;
  cursor?: string;
  padding?: string;
  t?: string;
  s?: string;
  i?: string;
  h?: boolean;
  f?: string;
  z?: number;
  c?: string;
  p?: string;
}

const terminal = ["terminal", "t"];
const scheme = ["scheme", "s"];
const font = ["font", "f"];
const fontSize = ["fontSize", "z"];
const help = ["help", "h"];
const cursor = ["cursor", "c"];
const padding = ["padding", "p"];

export const getFlags = async () => {
  let flags: Flags = parse(Deno.args, {
    boolean: ["help", "h"],
    string: [
      ...help,
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
