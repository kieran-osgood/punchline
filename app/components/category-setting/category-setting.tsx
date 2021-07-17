import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { useQuery, nodes, categoryModelPrimitives, CategoryModelType } from "app/graphql"
import { SvgUri } from "react-native-svg"
import { SortEnumType } from "app/graphql/SortEnumTypeEnum"

export interface CategorySettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * List of category buttons for the user to pick what type of jokes they want to see
 */
export const CategorySetting = observer(function CategorySetting(props: CategorySettingProps) {
  const { style } = props
  const { data } = useQuery((store) =>
    store.queryCategories(
      {
        order: [{ name: SortEnumType.ASC }],
      },
      nodes(categoryModelPrimitives),
    ),
  )

  return (
    <View style={[CONTAINER, style]}>
      <Text h3 bold text="Category Filter" />
      <Text>
        <Text text="Select categories you " />
        <Text bold text="don't " />
        <Text text="wish to see" />
      </Text>

      <View style={CATEGORIES}>
        {data?.categories.nodes.map((category) => (
          <Category key={category.id} {...{ category }} />
        ))}
      </View>
    </View>
  )
})

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
  if (!category || !category.image) return null
  const { store } = useQuery()
  const onPress = () => {
    store.categories.get(category.id)?.update(!category.isActive)
  }
  // TODO: convert this to use an animated SVG ⛔️ to show blocked categories
  return (
    <TouchableOpacity
      style={[
        CATEGORY_CONTAINER,
        { backgroundColor: category.isActive ? "lightgrey" : "transparent" },
      ]}
      activeOpacity={0.6}
      {...{ onPress }}
    >
      <View style={IMAGE_CONTAINER}>
        <SvgUri
          width={SVG_SIZE}
          height={SVG_SIZE}
          uri={
            category.image.length > 0
              ? category.image
              : "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png"
          }
        />
      </View>
      <View>
        <Text style={TEXT} text={category.name} />
      </View>
    </TouchableOpacity>
  )
})

const IMAGE_CONTAINER: ViewStyle = {
  minHeight: SVG_SIZE,
  minWidth: SVG_SIZE,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const CATEGORY_CONTAINER: ViewStyle = {
  borderRadius: 200,
  marginTop: spacing[3],
  width: "32%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing[5],
  marginRight: spacing[1],
}
