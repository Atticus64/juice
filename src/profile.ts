import { red } from "colors";

export interface Profile {
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  colorScheme?: string;
  commandline?: string;
  cursorShape?: string;
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
