import { describe, expect, it } from "vitest";

import { isRegion, isRegions } from "@regions-of-indonesia/utils";

import { base } from "../config";

import create from "./app";

const app = create();

type FetchCallback = (response: Response) => Promise<void>;

const FETCH = {
  GET: (pathname: string, callback: (response: Response) => Promise<void>) => {
    const input = `/${base}${pathname}.json`;

    it(`GET ${input}`, async () => {
      const res = await app.request(input, { method: "GET" });
      expect(res.status).toEqual(200);
      await callback(res);
    });
  },
};

const callback = {
  region: (async (response) => expect(isRegion(await response.json())).toEqual(true)) satisfies FetchCallback,
  regions: (async (response) => expect(isRegions(await response.json())).toEqual(true)) satisfies FetchCallback,
};

describe("requests", () => {
  FETCH.GET("/provinces", callback.regions);
  FETCH.GET("/provinces/11/districts", callback.regions);
  FETCH.GET("/districts/11.01/subdistricts", callback.regions);
  FETCH.GET("/subdistricts/11.01.01/villages", callback.regions);

  FETCH.GET("/provinces/11", callback.region);
  FETCH.GET("/districts/11.01", callback.region);
  FETCH.GET("/subdistricts/11.01.01", callback.region);
  FETCH.GET("/villages/11.01.01.2001", callback.region);

  FETCH.GET("/region/11", callback.region);
  FETCH.GET("/region/11.01", callback.region);
  FETCH.GET("/region/11.01.01", callback.region);
  FETCH.GET("/region/11.01.01.2001", callback.region);
});
