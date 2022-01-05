import { CategoryModel, JokeLength } from "app/graphql"
import { RootStore } from "app/models"
import { JokeLengths, VerticalCheckboxesProps } from "components"
import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import Toast from "react-native-toast-message"

/**
 * Model description here for TypeScript hints.
 */
export const SettingsModel = types
  .model("Settings", {
    jokeLengthPreferences: types.map(types.boolean),
    blockedCategories: types.array(types.reference(CategoryModel)),
    profanityFilter: types.boolean,
    notifications: types.model({
      push: types.boolean,
      email: types.boolean,
      team: types.boolean,
    }),
  })
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
  }))
  .actions((self) => ({
    setProfanityFilter(value: boolean) {
      self.profanityFilter = value
    },
    setNotification(key: keyof SnapshotOut<typeof self.notifications>, value: boolean) {
      self.notifications[key] = value
    },
  }))
  .views((self) => ({
    get blockedCategoryIds(): string[] {
      const root = [...self.root.apiStore.api.categories.values()]
        .filter((x) => x.isFiltered)
        .map((x) => x.id)
      return root
    },
    get jokeLengthMax(): number {
      let largestJoke = 1
      self.jokeLengthPreferences.forEach((x, b) => {
        if (!x) return

        switch (b) {
          case JokeLength.LARGE:
            largestJoke = largestJoke <= 3 ? 3 : largestJoke
            break
          case JokeLength.MEDIUM:
            largestJoke = largestJoke <= 2 ? 2 : largestJoke
            break
          case JokeLength.SMALL:
            largestJoke = largestJoke <= 1 ? 1 : largestJoke
            break
        }
      })

      return largestJoke
    },
    get jokeLengthMaxEnum(): JokeLength {
      switch (this.jokeLengthMax) {
        case 3:
          return JokeLength.LARGE
        case 2:
          return JokeLength.MEDIUM
        case 1:
          return JokeLength.SMALL
      }

      return JokeLength.SMALL
    },
    get jokeLengthsEnumArr(): Array<JokeLength> {
      const enumArr: Array<JokeLength> = []
      self.jokeLengthPreferences.forEach((x, b) => {
        if (!x) return

        enumArr.push(b as JokeLength)
      })
      return enumArr
    },
    get checkboxMap(): VerticalCheckboxesProps["data"] {
      return JokeLengths.map((x, idx) => ({
        label: x.slice(0, 1) + x.slice(1).toLowerCase(),
        value: x,
        isChecked: self.jokeLengthPreferences.get(x) ?? idx === 0,
      }))
    },
    get anySelected(): boolean {
      return this.blockedCategoryIds.length > 0
    },
  }))
  .actions((self) => ({
    toggleJokeLength: (value: JokeLength, isChecked?: boolean) => {
      const oneJokeLengthIsTrue =
        [...self.jokeLengthPreferences.values()].reduce((a, b) => Number(a) + Number(b), 0) === 1
      if (oneJokeLengthIsTrue && self.jokeLengthPreferences.get(value) === true) {
        return Toast.show({
          type: "error",
          text1: "Woops!",
          text2: "You must have at least (1) length selected.",
          position: "bottom",
        })
      }
      self.jokeLengthPreferences.set(value, isChecked ?? false)
    },
    unselectAllBlockedCategories() {
      self.root.apiStore.api.categories.forEach((x) => x.update(false))
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

export interface SettingsType extends Instance<typeof SettingsModel> {}
export interface Settings extends SettingsType {}
type SettingsSnapshotType = SnapshotOut<typeof SettingsModel>
export interface SettingsSnapshot extends SettingsSnapshotType {}
export function createSettingsDefaultModel() {
  return types.optional(SettingsModel, {
    blockedCategories: [],
    profanityFilter: true,
    notifications: {
      email: false,
      push: false,
      team: false,
    },
    jokeLengthPreferences: {
      [JokeLength.SMALL]: true,
      [JokeLength.MEDIUM]: true,
      [JokeLength.LARGE]: true,
    },
  })
}
