import { GraphQLRequest, GraphQLVariables } from "msw"
import { err, ok, Result } from "neverthrow"

export const isAuthed = (
  req: GraphQLRequest<GraphQLVariables>,
  path: string,
): Result<null, ErrorsObject> => {
  if (!req.headers.has("Authorization")) {
    return err(createAuthError(path))
  }

  return ok(null)
}

export type ErrorsObject = ReturnType<typeof createAuthError>
export const createAuthError = (path: string) => {
  return {
    data: UnauthorisedData(path),
    errors: UnauthorisedErrors(path),
  }
}
const UnauthorisedData = (path: string) => ({ data: { [path]: null } })
const UnauthorisedErrors = (path: string) => {
  return {
    message: "The current user is not authorized to access this resource.",
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: [path],
    extensions: {
      code: "AUTH_NOT_AUTHENTICATED",
    },
  }
}
