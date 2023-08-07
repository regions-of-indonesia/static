import { describe, expect, it } from "vitest";

import { isRegion, isRegions } from "@regions-of-indonesia/utils";

import { base } from "../config";

import app from "./app";

const json = async (response: Response) => {
  const value = await response.json();

  return {
    message: () => {
      expect(typeof value).toBeTypeOf("object");
      expect(value).toHaveProperty("message");
      expect(typeof value.message).toBeTypeOf("string");
    },
    region: () => {
      expect(isRegion(value)).toBeTruthy();
    },
    regions: () => {
      expect(isRegions(value)).toBeTruthy();
    },
  };
};

const FETCH = {
  GET: (pathname: string, status: number, callback: (response: Response) => Promise<void>) => {
    const input = `/${base}${pathname}.json`;

    it(`GET ${input}`, async () => {
      const res = await app.request(input, { method: "GET" });
      expect(res.status).toEqual(status);
      await callback(res);
    });
  },
};

describe("requests", () => {
  FETCH.GET("/provinces", 200, async (res) => {
    (await json(res)).regions();
  });

  FETCH.GET("/provinces/11/districts", 200, async (res) => {
    (await json(res)).regions();
  });

  FETCH.GET("/districts/11.01/subdistricts", 200, async (res) => {
    (await json(res)).regions();
  });

  FETCH.GET("/subdistricts/11.01.01/villages", 200, async (res) => {
    (await json(res)).regions();
  });

  FETCH.GET("/provinces/11", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/districts/11.01", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/subdistricts/11.01.01", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/villages/11.01.01.2001", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/region/11", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/region/11.01", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/region/11.01.01", 200, async (res) => {
    (await json(res)).region();
  });

  FETCH.GET("/region/11.01.01.2001", 200, async (res) => {
    (await json(res)).region();
  });
});
