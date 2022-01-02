/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ErrorCodes {
  SERVER_ERROR = "SERVER_ERROR",
  DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
}

/**
 * ErrorCodes
 */
export const ErrorCodesEnumType = types.enumeration("ErrorCodes", [
  "SERVER_ERROR",
  "DUPLICATE_ENTRY",
  "RESOURCE_NOT_FOUND",
  "NOT_AUTHORIZED",
])
