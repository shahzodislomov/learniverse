/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as courses from "../courses.js";
import type * as ctfChallenges from "../ctfChallenges.js";
import type * as lessons from "../lessons.js";
import type * as news from "../news.js";
import type * as resources from "../resources.js";
import type * as seed from "../seed.js";
import type * as siteSettings from "../siteSettings.js";
import type * as storage from "../storage.js";
import type * as userProfiles from "../userProfiles.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  courses: typeof courses;
  ctfChallenges: typeof ctfChallenges;
  lessons: typeof lessons;
  news: typeof news;
  resources: typeof resources;
  seed: typeof seed;
  siteSettings: typeof siteSettings;
  storage: typeof storage;
  userProfiles: typeof userProfiles;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
