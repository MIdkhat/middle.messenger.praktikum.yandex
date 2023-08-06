import { Routes } from '../../index';

type btnAwesomeProps = {
  url: Routes;
  message?: string;
  action?: () => void;
};

export const redirect = ({ url, action = undefined }: btnAwesomeProps) => {
  if (url) window.location.href = url;
  if (action) action();
  // alert('No such route')
};

export const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return date.toString();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};

export const setStyles = (el: HTMLElement, attrs: Record<string, string>) => {
  const style = Object.entries(attrs)
    .map((a) => `${a[0]}: ${a[1]};`)
    .join(' ');
  el.setAttribute('style', style);
};

export const warningStyles = {
  pending: {
    display: 'none',
  },
  valid: {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    border: '1px solid green',
  },
  invalid: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    border: '1px solid red',
  },
};

export type Indexed<T = any> = {
  [key in string]: T;
};

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (!path) return value;

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object as Indexed, result);
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.entries(rhs).forEach(([p, value]) => {
    try {
      if (value.constructor === Object) {
        value = merge(lhs[p] as Indexed, value as Indexed);
      } else {
        lhs[p] = value;
      }
    } catch (e) {
      lhs[p] = value;
    }
  });

  return lhs;
}

export function isEqual(aa: object, bb: object): boolean {
  if (typeof aa !== typeof bb) return false;

  if (typeof aa === 'function' && typeof bb === 'function') {
    if (aa.toString() === bb.toString()) return true;
    return false;
  }

  const a = JSON.parse(JSON.stringify(aa));
  const b = JSON.parse(JSON.stringify(bb));
  if (a instanceof SyntaxError || b instanceof SyntaxError) {
    return false;
  }

  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;
  const areObjectsEqual = keys1.every((key) => {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    const obj1 = (a as any)[key] as object;
    const obj2 = (b as any)[key] as object;
    return isEqual(obj1, obj2);
  });

  if (!areObjectsEqual) {
    // If any object property is not equal, return false
    return false;
  }

  return true;
}

export function arrayLeftRightIntersect(
  arr1: number[],
  arr2: number[]
): [number[], number[], number[]] {
  const intersection: number[] = [];
  const leftOnly = arr1.filter((element) => !arr2.includes(element));
  const rightOnly = arr2.filter((element) => !arr1.includes(element));
  arr2.forEach((element) => {
    if (arr1.includes(element)) {
      intersection.push(element);
    }
  });

  return [leftOnly, rightOnly, intersection];
}

export const cloneDeep = (value: unknown): any => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item));
  }

  if (value instanceof Map) {
    const clonedMap = new Map();
    value.forEach((innerValue, key) => {
      clonedMap.set(key, cloneDeep(innerValue));
    });
    return clonedMap;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    value.forEach((innerValue) => {
      clonedSet.add(cloneDeep(innerValue));
    });
    return clonedSet;
  }

  if (typeof value === 'function') {
    return value;
  }

  const clonedObj: { [key: string]: any } = {}; // Specify the index signature
  Object.keys(value).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const innerValue: { [key: string]: any } = value;
      clonedObj[key] = cloneDeep(innerValue[key]);
    }
  });
  return clonedObj;
};

export const formDataToObject = (formData: FormData): Record<string, any> => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    // If the value is a File object, keep it as is
    if (value instanceof File) {
      obj[key] = value;
    } else {
      // Convert other values to strings
      obj[key] = value.toString();
    }
  });

  return obj;
};

export const clearFormInputs = (form: HTMLFormElement) => {
  const { elements } = form;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const inputElement = element as HTMLInputElement;
      inputElement.value = '';
    } else if (element.tagName === 'SELECT') {
      const selectElement = element as HTMLSelectElement;
      selectElement.selectedIndex = 0;
    }
  }
};

export const queryStringify = (data: Record<string, any>): string | never => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Input must be an object');
  }

  const queryStrings: string[] = [];

  const encode = (str: any) => str.toString().trim().replace(' ', '%20');

  function processValue(key: string, value: unknown) {
    const stack: { key: string; value: unknown }[] = [{ key, value }];

    while (stack.length > 0) {
      const { key: currentKey, value: currentValue } = stack.pop()!;

      if (Array.isArray(currentValue)) {
        currentValue.forEach((item, index) => {
          stack.push({
            key: `${currentKey}[${index}]`,
            value: encode(item),
          });
        });
      } else if (typeof currentValue === 'object' && currentValue !== null) {
        Object.entries(currentValue).forEach(([innerKey, innerValue]) => {
          stack.push({
            key: `${currentKey}[${innerKey}]`,
            value: encode(innerValue),
          });
        });
      } else {
        const stringvalue: string = currentValue as string;
        queryStrings.push(`${currentKey}=${encode(stringvalue)}`);
      }
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    processValue(key, value);
  });

  return queryStrings.join('&');
};

export const formDataToJson = (formData: FormData): Record<string, unknown> =>
  Object.fromEntries(formData.entries());
