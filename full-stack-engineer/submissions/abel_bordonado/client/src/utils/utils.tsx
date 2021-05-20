export const EnumKeys = (enumType: {}) => {
  return Object.keys(enumType).filter((o: string) => isNaN(o as any));
};

export type Dictionary<T> = { [key: string]: T };

export const EnumToFilter = (
  enumType: {},
  enumToLabel: { [enumValue: string]: string }
) => {
  return EnumKeys(enumType).map((key) => {
    const type = enumType[key];
    return {
      text: enumToLabel[type],
      value: type,
    };
  });
};

export const isValidUrl = (value: string) => {
  if (!value) {
    return false;
  }

  const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  return value.match(new RegExp(urlRegex));
};

export function hasValue(array: Dictionary<any> | undefined, index: string) {
  if (!array) {
    return false;
  }
  return array[index] !== undefined;
}
export function getValue(array: Dictionary<any> | undefined, index: string) {
  if (!array) {
    return undefined;
  }
  return array[index];
}
