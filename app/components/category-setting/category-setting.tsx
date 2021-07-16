import * as React from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"

export interface CategorySettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const CategorySetting = observer(function CategorySetting(props: CategorySettingProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Text h3 bold text="Categories" />
      <View style={CATEGORIES}>
        {categories.map(({ id, image, name }) => (
          <Category key={id} {...{ image, name }} />
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
  flexWrap: 'wrap'
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const CATEGORY_CONTAINER: ViewStyle = {
  marginTop: spacing[3],
  borderRadius: 25,
  borderWidth: 1,
  width: "32%",
  minHeight: 70,
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing[3],
  marginRight: spacing[1]
}

const categories = [
  { id: "1", name: "Tech", image: " " },
  { id: "2", name: "Tech", image: " " },
  { id: "3", name: "Tech", image: " " },
  { id: "4", name: "Tech", image: " " },
]

type CategoryProps = {
  image: string
  name: string
}
const Category = ({ image: uri, name: text }: CategoryProps) => {
  return (
    <View style={CATEGORY_CONTAINER}>
      <Image source={{ uri }} />
      <View>
        <Text style={TEXT} {...{ text }} />
      </View>
    </View>
  )
}
