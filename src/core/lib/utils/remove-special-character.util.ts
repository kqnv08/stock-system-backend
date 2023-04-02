export function removeSpecialCharacter(str: string): string {

  const re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
  const final = str.replace(re, "")

  return final
}
