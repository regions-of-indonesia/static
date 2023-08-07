import type { Region } from "@regions-of-indonesia/types";
import { VILLAGE } from "@regions-of-indonesia/data/village";
import { joinRegionCode, splitRegionCode } from "@regions-of-indonesia/utils";

import { __provinces__, __districts__, __subdistricts__, __villages__, write, region, select, start } from "./shared";

start("villages", async () => {
  const record: Record<string, Region[]> = {};

  let code: string, c1: string, c2: string, c3: string, pcode: string;

  for (code in VILLAGE) {
    [c1, c2, c3] = splitRegionCode(code);
    pcode = joinRegionCode([c1, c2, c3]);

    if (!(pcode in record)) record[pcode] = [];

    // /villages/:code.json
    // /region/:code.json
    record[pcode].push(await region([__villages__], select(code, VILLAGE)));
  }

  // /subdistricts/:code/villages.json
  for (code in record) await write([__subdistricts__, code, __villages__], record[code]);
});
