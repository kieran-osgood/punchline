import { ApiRootStoreType } from "app/graphql"
import { JokeModel } from "app/graphql/JokeModel"
import { RootStore, SettingsType } from "app/models"
import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const JokeApiStoreModel = types
  .model("JokeApiStore")
  .props({
    deepLinkJoke: types.maybe(types.reference(JokeModel)),
  })
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
    get settings(): SettingsType {
      return this.root.settings
    },
    get api(): ApiRootStoreType {
      return this.root.apiStore.api
    },
  }))
  .actions((self) => ({
    fetchJokes(deepLinkedJokeId?: string) {
      const query = self.api.queryJokes(
        {
          input: {
            blockedCategoryIds: self.root.settings.blockedCategoryIds,
            jokeLengths: self.root.settings.jokeLengthsEnumArr,
            profanityFilter: self.root.settings.profanityFilter,
            deepLinkedJokeId,
          },
        },
        (j) =>
          j.nodes((n) =>
            n.id.body.title.length.negativeRating.positiveRating.categories((c) => c.id.image.name),
          ),
        { fetchPolicy: "no-cache" },
      )
      return query
    },
  }))
  .views((self) => ({
    get nonViewedJokes() {
      const preferences = [...self.settings.jokeLengthPreferences.entries()]
      return (
        [...self.api.jokes.values()]
          .filter((x) => !x.viewed)
          // y[0] is keyof JokeLength - so if it is of the j.length type and the value (y[1]) is true, return it
          .filter((x) => preferences.some((y) => y[0] === x.length && y[1]))
          .filter((x) => !(self.settings.profanityFilter && x.explicitContent))
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          .filter((x) => x?.categories?.some((y) => !y.isFiltered && self.api.categories.has(y.id)))
          .filter(Boolean)
      )
    },
    get topOfDeckJoke() {
      if (this.nonViewedJokes.length <= 10) {
        self.fetchJokes()
      }
      if (this.nonViewedJokes.length === 0) {
        return JokeModel.create({ id: "unc9872q34hf8q2nbq24897" })
      }

      return this.nonViewedJokes[this.nonViewedJokes.length - 1]
    },
    get deck() {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return [this.nonViewedJokes?.[this.nonViewedJokes.length - 2], this.topOfDeckJoke].filter(
        Boolean,
      )
    },
  }))
  .actions((self) => ({
    setDeepLinkJoke: async (deepLinkInitialJokeId: string): Promise<void> => {
      if (!self.api.jokes.has(deepLinkInitialJokeId)) {
        try {
          await self.fetchJokes(deepLinkInitialJokeId).promise
        } catch (err) {}
      }

      if (
        self.api.jokes.has(deepLinkInitialJokeId) &&
        !self.api.jokes.get(deepLinkInitialJokeId)?.viewed
      ) {
        self.deepLinkJoke = self.api.jokes.get(deepLinkInitialJokeId)
      }
    },
  }))

types.snapshotProcessor(JokeApiStoreModel, {
  postProcessor(snapshot: JokeApiStoreSnapshotType) {
    return {
      ...snapshot,
      deepLinkJoke: false,
    }
  },
})

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 */

type JokeApiStoreType = Instance<typeof JokeApiStoreModel>
export interface JokeApiStore extends JokeApiStoreType {}
type JokeApiStoreSnapshotType = SnapshotOut<typeof JokeApiStoreModel>
export interface JokeApiStoreSnapshot extends JokeApiStoreSnapshotType {}
export const createJokeApiStoreDefaultModel = () => types.optional(JokeApiStoreModel, {})
