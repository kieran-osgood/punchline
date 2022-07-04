import { ApiRootStoreType } from "app/graphql"
import { RootStore, SettingsType } from "app/models"
import { getRoot, Instance, types } from "mobx-state-tree"
import Toast from "react-native-toast-message"
import { CategoryModelBase } from "./CategoryModel.base"

/* The TypeScript type of an instance of CategoryModel */
export interface CategoryModelType extends Instance<typeof CategoryModel.Type> {}

/* A graphql query fragment builders for CategoryModel */
export {
  categoryModelPrimitives,
  CategoryModelSelector,
  selectFromCategory,
} from "./CategoryModel.base"

/**
 * CategoryModel
 */
export const CategoryModel = CategoryModelBase.props({
  isFiltered: types.optional(types.boolean, false),
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
    update(val: boolean) {
      const catLen = [...self.api.categories.values()].length
      const setCatLen = self.settings.blockedCategoryIds.length
      const unselectedCategories = catLen - setCatLen <= 1

      if (val && unselectedCategories) {
        return Toast.show({
          type: "error",
          text1: "Woops!",
          text2: "You must have at least (1) category selected.",
          position: "bottom",
        })
      }

      self.isFiltered = val
    },
  }))
