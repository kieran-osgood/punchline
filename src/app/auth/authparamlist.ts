import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RouteParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: StackNavigationProp<RouteParamList, T>;
};
