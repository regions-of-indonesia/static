import fs from "fs-jetpack";

import type { Region } from "@regions-of-indonesia/types";

import { base } from "../config";

const outDir = fs.cwd(`dist/${base}`);

export const __provinces__ = "provinces";
export const __districts__ = "districts";
export const __subdistricts__ = "subdistricts";
export const __villages__ = "villages";
export const __region__ = "region";

export const write = async <T>(paths: string[], data: T) => {
  await outDir.writeAsync(`${paths.join("/")}.json`, JSON.stringify(data));
  return data;
};

export const region = async (paths: string[], region: Region) => {
  await Promise.all([write(paths.concat(region.code), region), write([__region__, region.code], region)]);
  return region;
};

export const select = (code: string, record: Record<string, string>): Region => ({ code, name: record[code] });

export const start = async (name: string, fn: () => Promise<void>) => {
  try {
    await fn();
    console.log(`[generated]: ${name}`);
  } catch (error) {
    console.error(error);
  }
};
