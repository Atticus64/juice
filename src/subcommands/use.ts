import { red } from "colors";
import { checkConfig } from "$/config.ts";
import { getProfilesConfig } from "$/profile.ts";
import { Profile } from "$/profile.ts";
import { Flags } from "$/flag.ts";

export const useProfileFlags = async (flags: Flags) => {
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
