import { assertEquals, assertThrows } from "testing";
import { checkConfig, getWtFiles, changeConfig } from "$/config.ts";
import { getFlags, Flags } from '$/flag.ts';

Deno.test("The checkConfig return true if path exists and return configFile path", async () => {
  const result = await checkConfig(true)
  assertEquals(result, ["./juice.json", true]);
});


Deno.test('getWtFiles function should return the content and path of settings file', async () => {

  const [path, _] = await checkConfig(true)
  const [content, configPath] = await getWtFiles(path)

  const jsonContent = await Deno.readTextFile('./example-settings.json')


  assertEquals(content, jsonContent)
  assertEquals(configPath, './example-settings.json')

})



Deno.test('changeConfig should change the options in config file', async () => {

  const [path, _] = await checkConfig(true)
  const [content, configPath] = await getWtFiles(path)
  const flags: Flags = getFlags()
  flags.font = 'Minecraft Font'
  flags.image = 'creeper.jpg'
  flags.scheme = 'Dracula'
  flags.terminal = 'Hacker'

  const jsonContent = JSON.parse(content)

  const [data, _configString] = changeConfig(flags, jsonContent, configPath)

  const profiles = data.profiles.list

  const hackerProfile = profiles.find(p => p.name === 'Hacker');


  assertEquals(hackerProfile?.font?.face, 'Minecraft Font')
  assertEquals(hackerProfile?.colorScheme, 'Dracula')
  assertEquals(hackerProfile?.backgroundImage, 'creeper.jpg')

})

Deno.test('if dont especify the terminal should return error', async () => {

  const [path, _] = await checkConfig(true)
  const [content, configPath] = await getWtFiles(path)
  const flags: Flags = getFlags()
  flags.font = 'Minecraft Font'
  flags.image = 'creeper.jpg'
  flags.scheme = 'Dracula'

  const jsonContent = JSON.parse(content);

  assertThrows(
    () => changeConfig(flags, jsonContent, configPath),
    Error,
    "You need to specify the terminal to apply the config",
  );

})