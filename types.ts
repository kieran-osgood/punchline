// eslint-disable-next-line @typescript-eslint/ban-types
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
// eslint-disable-next-line @typescript-eslint/ban-types
type NonArrayPropertyNames<T> = { [K in keyof T]: T[K] extends Array<any> ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type NonArrayProperties<T> = Pick<T, NonArrayPropertyNames<T>>;
