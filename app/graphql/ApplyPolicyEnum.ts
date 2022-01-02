/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ApplyPolicy {
  BEFORE_RESOLVER = "BEFORE_RESOLVER",
  AFTER_RESOLVER = "AFTER_RESOLVER",
}

/**
 * ApplyPolicy
 */
export const ApplyPolicyEnumType = types.enumeration("ApplyPolicy", [
  "BEFORE_RESOLVER",
  "AFTER_RESOLVER",
])
