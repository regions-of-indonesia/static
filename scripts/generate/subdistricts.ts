import type { Region } from "@regions-of-indonesia/types";
import SUBDISTRICT from "@regions-of-indonesia/data/subdistrict";
import { joinRegionCode, splitRegionCode } from "@regions-of-indonesia/utils";

import { __provinces__, __districts__, __subdistricts__, write, region, select, start } from "./shared";

start("subdistricts", async () => {
  const record: Record<string, Region[]> = {};

  let code: string, c1: string, c2: string, pcode: string;

  for (code in SUBDISTRICT) {
    [c1, c2] = splitRegionCode(code);
    pcode = joinRegionCode([c1, c2]);

    if (!(pcode in record)) record[pcode] = [];

    // /subdistricts/:code.json
    // /region/:code.json
    record[pcode].push(await region([__subdistricts__], select(code, SUBDISTRICT)));
  }

  // /districts/:code/subdistricts.json
  for (code in record) await write([__districts__, code, __subdistricts__], record[code]);
});
