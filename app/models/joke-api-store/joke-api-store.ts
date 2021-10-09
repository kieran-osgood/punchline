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
    deepLinkJokeId: types.maybe(types.string),
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
    setDeepLinkJoke(deepLinkInitialJoke: string | undefined) {
      self.deepLinkJokeId = deepLinkInitialJoke
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
      )
    },
    get topOfDeckJoke() {
      if (this.nonViewedJokes.length <= 10) {
        self.api.queryJokes(
          {
            input: {
              blockedCategoryIds: self.root.settings.blockedCategoryIds,
              jokeLengths: self.root.settings.jokeLengthsEnumArr,
              deepLinkedJokeId: self.deepLinkJokeId,
              profanityFilter: self.root.settings.profanityFilter,
            },
          },
          (j) =>
            j.nodes((n) =>
              n.id.body.title.length.negativeRating.positiveRating.categories(
                (c) => c.id.image.name,
              ),
            ),
          { fetchPolicy: "no-cache" },
        )
      }
      if (this.nonViewedJokes.length === 0) {
        return JokeModel.create({ id: "unc9872q34hf8q2nbq24897" })
      }
      if (self.deepLinkJokeId) {
        const id = self.deepLinkJokeId
        self.setDeepLinkJoke(undefined)
        const deepJoke = self.api.jokes.get(id)
        return deepJoke ?? this.nonViewedJokes[this.nonViewedJokes.length - 1]
      }

      return this.nonViewedJokes[this.nonViewedJokes.length - 1]
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type JokeApiStoreType = Instance<typeof JokeApiStoreModel>
export interface JokeApiStore extends JokeApiStoreType {}
type JokeApiStoreSnapshotType = SnapshotOut<typeof JokeApiStoreModel>
export interface JokeApiStoreSnapshot extends JokeApiStoreSnapshotType {}
export const createJokeApiStoreDefaultModel = () => types.optional(JokeApiStoreModel, {})
