
export function streamEnum<T extends Record<string, string>>(myEnum: T): string[] {
  return Object.keys(myEnum).map(key => key);
}

export function streamEnumMetadata<T extends Record<string, string>, M>(myEnum: T, metadata: Record<keyof T, M>) {
  return streamEnum(myEnum).map(key => ({ key: key as keyof T, value: metadata[key] }));
}
