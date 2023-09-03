import type { Region } from "@regions-of-indonesia/types";
import DISTRICT from "@regions-of-indonesia/data/district";
import { joinRegionCode, splitRegionCode } from "@regions-of-indonesia/utils";

import { __provinces__, __districts__, write, region, select, start } from "./shared";

start("districts", async () => {
  const record: Record<string, Region[]> = {};

  let code: string, c1: string, pcode: string;

  for (code in DISTRICT) {
    [c1] = splitRegionCode(code);
    pcode = joinRegionCode([c1]);

    if (!(pcode in record)) record[pcode] = [];

    // /districts/:code.json
    // /region/:code.json
    record[pcode].push(await region([__districts__], select(code, DISTRICT)));
  }

  // /provinces/:code/districts.json
  for (code in record) await write([__provinces__, code, __districts__], record[code]);
});
