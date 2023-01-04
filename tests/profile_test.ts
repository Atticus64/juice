import { changeProfileValues, getProfilesConfig } from "$/profile.ts";
import { checkConfig } from "$/config.ts";
import { assertEquals, assertRejects } from "testing";
import { Flags, getFlags } from "$/flag.ts";
import { Profile } from "$/profile.ts";

Deno.test("getProfilesConfig Should throws an error when config has not profiles", async () => {
  const newContent = {
    config: "./example-settings.json",
  };
  const [configPath, _] = await checkConfig(true);

  await Deno.writeTextFile(configPath, JSON.stringify(newContent, null, "\t"));

  assertRejects(
    async () => await getProfilesConfig(configPath),
    Error,
    "Not found profiles in configuration file juice.json",
  );
});

Deno.test("getProfilesConfig should return profiles if path.exists", async () => {
  const newContent = {
    profiles: {
      fresh: {
        backgroundImage: "C://Users//Admin//Desktop/deno.jpg",
        colorScheme: "Dracula",
        cursorShape: "filledBox",
        font: {
          face: "JetBrainsMono NF",
          size: 14,
        },
        opacity: 10,
        padding: "4",
        useAcrylic: false,
      },
    },
  };

  const profiles = {
    fresh: {
      backgroundImage: "C://Users//Admin//Desktop/deno.jpg",
      colorScheme: "Dracula",
      cursorShape: "filledBox",
      font: {
        face: "JetBrainsMono NF",
        size: 14,
      },
      opacity: 10,
      padding: "4",
      useAcrylic: false,
    },
  };

  const [configPath, _] = await checkConfig(true);

  await Deno.writeTextFile(configPath, JSON.stringify(newContent, null, "\t"));

  const result = await getProfilesConfig(configPath);

  assertEquals(result, profiles);
});

Deno.test("changeProfileValues Should change profile props", async () => {
  const flags: Flags = await getFlags();
  flags.font = "Minecraft Font";
  flags.image = "creeper.jpg";
  flags.scheme = "Dracula";
  flags.terminal = "Hacker";

  const some_profile: Profile = {
    name: "cmd",
    backgroundImage: "C://Users//Admin//Desktop/deno.jpg",
    colorScheme: "Dracula",
    cursorShape: "filledBox",
    font: {
      face: "JetBrainsMono NF",
      size: 14,
    },
    opacity: 10,
    padding: "30",
    useAcrylic: false,
  };

  changeProfileValues(some_profile, flags);
});
