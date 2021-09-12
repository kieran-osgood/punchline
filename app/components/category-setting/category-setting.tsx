import { categoryModelPrimitives, CategoryModelType, nodes, useQuery } from "app/graphql"
import { SortEnumType } from "app/graphql/SortEnumTypeEnum"
import { useStores } from "app/models"
import { Blocked, SIZE } from "assets/images/blocked"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { SvgUri } from "react-native-svg"
import { Text, ThemeManager, View } from "react-native-ui-lib"
import { color, spacing, typography } from "../../theme"

export interface CategorySettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}
export const CategorySetting = observer(function CategorySetting(props: CategorySettingProps) {
  const { data } = useQuery((store) =>
    store.queryCategories(
      {
        order: [{ name: SortEnumType.ASC }],
      },
      nodes(categoryModelPrimitives),
    ),
  )

  if (!data?.categories) return null

  return <CategoryMapping categories={[...data.categories.nodes.values()]} {...props} />
})
export interface OnboardingCategorySettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}
export const OnboardingCategorySetting = observer(function OnboardingCategorySetting(
  props: CategorySettingProps,
) {
  const stores = useStores()

  if (stores.onboarding.randomCategoriesBlocked.length === 0) return null

  return (
    <CategoryMapping
      categories={stores.onboarding.randomCategoriesBlocked}
      categoriesOnly
      {...props}
    />
  )
})

export interface CategoryMappingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  categories?: CategoryModelType[]
  categoriesOnly?: boolean
}
export default CategorySetting
/**
 * List of category buttons for the user to pick what type of jokes they want to see
 */
export const CategoryMapping = observer(function CategoryMapping(props: CategoryMappingProps) {
  const { style, categories, categoriesOnly = false } = props

  return (
    <View style={[CONTAINER, style]} center>
      {categoriesOnly === false && (
        <>
          <Text text60 bold center>
            {"Category Filter"}
          </Text>
          <Text center marginV-s2 highlightString="don't" highlightStyle={HIGHLIGHT_STYLE}>
            {"Select categories you don't wish to see"}
          </Text>
        </>
      )}

      <View style={CATEGORIES}>
        {categories?.map((category) => (
          <Category key={category.id} {...{ category }} />
        ))}
      </View>
    </View>
  )
})

const HIGHLIGHT_STYLE: TextStyle = {
  fontWeight: "bold",
  color: ThemeManager.titleColor,
}
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  paddingTop: spacing[3],
}

const CATEGORIES: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

const SVG_SIZE = 40
type CategoryProps = {
  category: CategoryModelType
}
const Category = observer(function Category({ category }: CategoryProps) {
  const { store } = useQuery()

  if (!category.image) return null
  const { id, isActive, name, image } = category
  const uri = image.length > 0 ? image : " "
  const activeTextStyle = { color: isActive ? color.dim : color.primary }

  const onPress = () => store.categories.get(id)?.update(!isActive)

  return (
    <TouchableOpacity style={CATEGORY_CONTAINER} activeOpacity={0.6} {...{ onPress }}>
      <View style={IMAGE_CONTAINER}>
        <SvgUri
          style={isActive ? CATEGORY_ICON : {}}
          width={SVG_SIZE}
          height={SVG_SIZE}
          {...{ uri }}
        />
        {isActive && <Blocked scale={SVG_SIZE / SIZE} style={BLOCKED} />}
      </View>
      <View>
        <Text style={{ ...TEXT, ...activeTextStyle }}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
})

const CATEGORY_ICON: ViewStyle = {
  opacity: 0.55,
}

const IMAGE_CONTAINER: ViewStyle = {
  minHeight: SVG_SIZE,
  minWidth: SVG_SIZE,
}

const BLOCKED: ViewStyle = {
  position: "absolute",
  zIndex: 10,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  paddingTop: spacing[2],
  fontWeight: "500",
}

const CATEGORY_CONTAINER: ViewStyle = {
  borderRadius: 200,
  marginTop: spacing[3],
  width: "32%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing[2],
  marginRight: spacing[1],
}
