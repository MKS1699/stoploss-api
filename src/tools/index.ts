import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// hashing a given string
export const stringHash = async (data: string): Promise<string> => {
  const hashedStr = await bcrypt
    .hash(data, 8)
    .then((res) => res)
    .catch((err) => err);

  return hashedStr;
};

// token creating
export const createToken = async (payload: string): Promise<string> => {
  const key = process.env.JWT_KEY;
  const token = jwt.sign({ payload }, key, {
    expiresIn: "1h",
  });

  return token;
};

// duplicate value find in array
export async function checkForDuplicate(
  value: any,
  arr: any[]
): Promise<boolean> {
  let result = false;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      result = true;
    }
  }
  return result;
}

// get all keys of the object
export function listAllKeys<T>(obj: T, prefix = ""): string[] {
  let keys: string[] = [];

  for (let key in obj) {
    let value = obj[key];
    let fullKey = prefix ? `${prefix}.${key}` : key;

    // if (Array.isArray(value)) {
    //   if (
    //     value.length > 0 &&
    //     typeof value[0] === "object" &&
    //     value[0] !== null
    //   ) {
    //     const arrayKeys = listAllKeys(value[0], `${fullKey}[0]`);
    //     keys.push(...arrayKeys);
    //   } else {
    //     keys.push(fullKey);
    //   }
    // } else
    if (typeof value === "object" && value !== null) {
      keys = [...keys, ...listAllKeys(value, fullKey)];
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// getting value of path
// checking a path is defined or not
// the path is provided by listAllKeys
// function on an object {a : {b : c}}
// => [a, a.b]
// so this fn now list the value of paths
// which are "a" and "a.b" also taking a
// object (obj) value to start looking into

export function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
