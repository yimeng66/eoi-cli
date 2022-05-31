const r = /-(\w)/g;

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, $1: string) => $1.toUpperCase());
}

export function bigCamelize(str: string) {
  str = camelize(str);
  const firstChat = str.charAt(0);
  return str.replace(firstChat, firstChat.toUpperCase());
}
