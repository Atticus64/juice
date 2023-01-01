import { red } from "colors";
import { Flags } from "$/flag.ts";

export type Cursor =
  | "bar"
  | "filledBox"
  | "underscore"
  | "doubleUnderscore"
  | "emptyBox";

export interface Profile {
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  colorScheme?: string;
  commandline?: string;
  cursorShape?: Cursor;
  font?: {
    face?: string;
    size?: number;
  };
  guid?: string;
  hidden?: boolean;
  name: string;
  opacity?: number;
  source?: string;
  padding?: string;
  useAcrylic?: boolean;
}

export const getProfilesConfig = async (configPath: string) => {
  const fileRaw = await Deno.readTextFile(configPath);

  const wtJson = JSON.parse(fileRaw);

  const profiles = wtJson.profiles;

  if (!profiles || Object.keys(profiles).length === 0) {
    throw new Error(red("Not found profiles in configuration file juice.json"));
  }

  return profiles;
};

export const changeProfileValues = (profile: Profile, flags: Flags) => {
  if (!profile.font) return;

  try {
    if (flags.f || flags.font) {
      const font = flags.f ?? flags.font;
      profile.font.face = font;
    }

    if (flags.z || flags.fontSize) {
      const size = flags.z ?? flags.fontSize;
      profile.font.size = Number(size);
    }

    if (flags.i || flags.image) {
      const image = flags.i ?? flags.image;
      profile.backgroundImage = image;
    }

    if (flags.s || flags.scheme) {
      const scheme = flags.s ?? flags.scheme;
      profile.colorScheme = scheme;
    }

    if (flags.p || flags.padding) {
      const padding = flags.p ?? flags.padding;
      profile.padding = padding;
    }

    if (flags.c || flags.cursor) {
      const cursor = flags.c ?? flags.cursor;
      profile.cursorShape = cursor;
    }

    if (flags.o || flags.opacity) {
      const opacity = flags.o ?? flags.opacity;
      profile.opacity = Number(opacity);
    }

    return profile;
  } catch (err) {
    throw new Error(err);
  }
};
