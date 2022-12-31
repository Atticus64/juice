import { assertEquals, assertRejects } from "testing";
import {
  changeConfig,
  checkConfig,
  getSettingsFile,
  getWtFiles,
} from "$/config.ts";
import { Flags, getFlags } from "$/flag.ts";
import home_dir from "home_dir";

Deno.test("The checkConfig return true if path exists and return configFile path", async () => {
  const baseConf = {
    config: "./example-settings.json",
  };

  await Deno.writeTextFile(
    "./juice.json",
    JSON.stringify(baseConf, null, "\t"),
  );
  const result = await checkConfig(true);
  assertEquals(result, ["./juice.json", true]);
});

Deno.test("getWtFiles function should return the content and path of settings file", async () => {
  const baseConf = {
    config: "./example-settings.json",
  };

  const [path, _] = await checkConfig(true);
  await Deno.writeTextFile(path, JSON.stringify(baseConf, null, "\t"));
  const [content, configPath] = await getWtFiles(path);

  const jsonContent = await Deno.readTextFile("./example-settings.json");

  assertEquals(content, jsonContent);
  assertEquals(configPath, "./example-settings.json");
});

Deno.test("changeConfig should change the options in config file", async () => {
  const baseConf = {
    config: "./example-settings.json",
  };

  const [path, _] = await checkConfig(true);
  await Deno.writeTextFile(path, JSON.stringify(baseConf, null, "\t"));
  const [content, configPath] = await getWtFiles(path);
  const flags: Flags = await getFlags();
  flags.font = "Minecraft Font";
  flags.image = "creeper.jpg";
  flags.scheme = "Dracula";
  flags.terminal = "Hacker";
  flags.cursor = "bar";
  flags.fontSize = 16;
  flags.padding = "6";

  const jsonContent = JSON.parse(content);

  const [data, _configString] = await changeConfig(
    flags,
    jsonContent,
    configPath,
  );

  const profiles = data.profiles.list;

  const hackerProfile = profiles.find((p) => p.name === "Hacker");

  assertEquals(hackerProfile?.font?.face, "Minecraft Font");
  assertEquals(hackerProfile?.colorScheme, "Dracula");
  assertEquals(hackerProfile?.backgroundImage, "creeper.jpg");
  assertEquals(hackerProfile?.cursorShape, "bar");
  assertEquals(hackerProfile?.font?.size, 16);
  assertEquals(hackerProfile?.padding, "6");
});

Deno.test("changeConfig should modify in config file", async () => {
  const data = {
    config: "./example-settings.json",
  };

  const [path, _] = await checkConfig(true);
  await Deno.writeTextFile(path, JSON.stringify(data, null, "\t"));

  const [content, configPath] = await getWtFiles(path);
  const flags: Flags = await getFlags();
  flags.font = "Minecraft Font";
  flags.image = "creeper.jpg";
  flags.scheme = "Dracula";
  flags.terminal = "Hacker";

  const jsonContent = JSON.parse(content);

  const jsonString = JSON.stringify(jsonContent, null, "\t");

  const [_data, configString] = await changeConfig(
    flags,
    jsonContent,
    configPath,
  );

  assertEquals(configString, jsonString);
});

Deno.test("if dont especify the terminal should return error", async () => {
  const data = {
    config: "./example-settings.json",
  };

  const [path, _] = await checkConfig(true);
  await Deno.writeTextFile(path, JSON.stringify(data, null, "\t"));
  const [content, configPath] = await getWtFiles(path);
  const flags: Flags = await getFlags();
  flags.font = "Minecraft Font";
  flags.image = "creeper.jpg";
  flags.scheme = "Dracula";

  const jsonContent = JSON.parse(content);

  assertRejects(
    async () => await changeConfig(flags, jsonContent, configPath),
    Error,
    "You need to specify the terminal to apply the config",
  );
});

Deno.test("getSettingsFile should return a path of settings.json", async () => {
  const base = {
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

  Deno.writeTextFile("./juice.json", JSON.stringify(base, null, "\t"));

  const basePath = home_dir() + "\\AppData\\Local\\Packages\\";
  const endPath = "\\LocalState\\settings.json";

  const path = await getSettingsFile();

  assertEquals(path.startsWith(basePath), true);
  assertEquals(path.endsWith(endPath), true);
});
