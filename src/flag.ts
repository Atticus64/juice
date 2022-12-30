import { parse } from "https://deno.land/std@0.168.0/flags/mod.ts";

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
const help = ["help", "h"]
const cursor = ["cursor", "c"];
const padding = ["padding", "p"];

export const getFlags = () => {

  const flags: Flags = parse(Deno.args, {
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

  return flags;
};
