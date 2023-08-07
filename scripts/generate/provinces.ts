import type { Region } from "@regions-of-indonesia/types";
import { PROVINCE } from "@regions-of-indonesia/data/province";

import { __provinces__, write, region, select, start } from "./shared";

start("provinces", async () => {
  const regions: Region[] = [];

  let code: string;

  for (code in PROVINCE) {
    // /provinces/:code.json
    // /region/:code.json
    regions.push(await region([__provinces__], select(code, PROVINCE)));
  }

  // /provinces.json
  await write([__provinces__], regions);
});
