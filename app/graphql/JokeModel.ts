import { RatingValue, RootStoreType } from "app/graphql"
import { CategoryModelType } from "app/graphql/CategoryModel"
import { RootStore as RootStoreTree } from "app/models"
import { IObservableArray } from "mobx"
import { getRoot, Instance, types } from "mobx-state-tree"
import { JokeModelBase } from "./JokeModel.base"
/* The TypeScript type of an instance of JokeModel */
export interface JokeModelType extends Instance<typeof JokeModel.Type> {}

/* A graphql query fragment builders for JokeModel */
export { jokeModelPrimitives, JokeModelSelector, selectFromJoke } from "./JokeModel.base"

/**
 * JokeModel
 */
export const JokeModel = JokeModelBase.props({
  viewed: types.optional(types.boolean, false),
})
  .views((self) => ({
    get root(): RootStoreTree {
      return getRoot(self)
    },
    get api(): RootStoreType {
      return this.root.apiStore.api
    },
  }))
  .actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
    setCategories(categories: IObservableArray<CategoryModelType>) {
      self.categories = categories
    },
    markViewed() {
      self.viewed = true
    },
  }))
  .actions((self) => ({
    rate(rating: RatingValue, bookmarked: boolean) {
      setTimeout(() => {
        // Allows time for the swipeable.translateX animation to occur
        self.markViewed()
      }, 300)
      const query = self.api.mutateRateJoke(
        {
          input: {
            // joke.id not needed to pass in? self.joke.id
            jokeId: self.id,
            rating: rating,
            bookmarked,
          },
        },
        undefined,
      )
      return query
    },
  }))

types.snapshotProcessor(JokeModel, {
  preProcessor(snapshot: JokeModelType) {
    return {
      ...snapshot,
      viewed: false,
    }
  },
})
