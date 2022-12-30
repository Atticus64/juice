import { parse } from "https://deno.land/std@0.168.0/flags/mod.ts";

export interface Flags {
  terminal?: string;
  scheme?: string;
  image?: string;
  help?: boolean;
  font?: string;
  t?: string;
  s?: string;
  i?: string;
  h?: boolean;
  f?: string;
}

export const getFlags = () => {
  const flags = parse(Deno.args, {
    boolean: ["help", "h"],
    string: ["terminal", "t", "scheme", "s", "i", "image", "font", "f"],
  });

  return flags;
};
