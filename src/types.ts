import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

type RouteParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
};

export type NavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: BottomTabNavigationProp<RouteParamList, T>;
};
