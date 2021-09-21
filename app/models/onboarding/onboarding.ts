import { ApiStoreType, CategoryModel } from "app/graphql"
import { RootStore as RootStoreTree } from "app/models"
import { getRoot, getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const OnboardingModel = types
  .model("Onboarding")
  .views((self) => ({
    get root(): RootStoreTree {
      return getRoot(self)
    },
    get api(): ApiStoreType {
      return this.root.api
    },
  }))
  .views((self) => ({
    get randomCategoriesBlocked() {
      return [...self.api.categories.values()]
        .map((x) => {
          const category = CategoryModel.create(getSnapshot(x))
          category.update(Math.random() < 0.4)
          return category
        })
        .slice(0, 12)
    },
  }))
/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type OnboardingType = Instance<typeof OnboardingModel>
export interface Onboarding extends OnboardingType {}
type OnboardingSnapshotType = SnapshotOut<typeof OnboardingModel>
export interface OnboardingSnapshot extends OnboardingSnapshotType {}
export const createOnboardingDefaultModel = () => types.optional(OnboardingModel, {})
