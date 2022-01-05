import { graphql } from "msw"
import { isAuthed } from "test/msw/utils/auth"
// import { factory, primaryKey } from '@mswjs/data';
// import { datatype, name } from 'faker';

// export const db = factory({
//   user: {
//     id: primaryKey(datatype.uuid),
//     firstName: name.firstName,
//     lastName: name.lastName,
//   },
// });

// for (let i = 0; i < 20; i++) {
//   db.user.create();
// }

export const handlers = [
  graphql.query("jokes", (req, res, ctx) => {
    const authed = isAuthed(req, "jokes")

    if (authed.isErr()) {
      return res(ctx.data(authed.error.data), ctx.errors([authed.error.errors]))
    }

    return res(
      ctx.data({
        jokes: { nodes: [{}] },
      }),
    )
  }),
]
