/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum RatingValue {
  SKIP = "SKIP",
  GOOD = "GOOD",
  REPORTED = "REPORTED",
  BAD = "BAD",
}

/**
 * RatingValue
 */
export const RatingValueEnumType = types.enumeration("RatingValue", [
  "SKIP",
  "GOOD",
  "REPORTED",
  "BAD",
])
