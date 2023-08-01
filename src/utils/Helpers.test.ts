import { expect } from 'chai';
import {
  parseDate,
  merge,
  set,
  isEqual,
  arrayLeftRightIntersect,
  cloneDeep,
  formDataToJson,
  queryStringify,
} from './Helpers';

describe('parseDate function', () => {
  it('should parse date in format "YYYY-MM-DD HH:mm"', () => {
    const dateString = '2023-07-27 12:34';
    const expected = '2023-07-27 12:34';
    const result = parseDate(dateString);
    expect(result).to.equal(expected);
  });

  it('should handle single-digit month and day', () => {
    const dateString = '2023-5-8 7:9';
    const expected = '2023-05-08 07:09';
    const result = parseDate(dateString);
    expect(result).to.equal(expected);
  });

  it('should return "Invalid Date" for invalid date strings', () => {
    const dateString = 'invalid date';
    const result = parseDate(dateString);
    expect(result).to.equal('Invalid Date');
  });
});

describe('merge function', () => {
  it('should merge two objects with non-overlapping properties', () => {
    const lhs = { a: 1, b: 2 };
    const rhs = { c: 3, d: 4 };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should merge two objects with overlapping properties', () => {
    const lhs = { a: 1, b: 2, c: { x: 10 } };
    const rhs = { c: { y: 20 }, d: 4 };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal({ a: 1, b: 2, c: { x: 10, y: 20 }, d: 4 });
  });

  it('should recursively merge nested objects', () => {
    const lhs = { a: { x: 1, y: 2 } };
    const rhs = { a: { y: 3, z: 4 } };
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal({ a: { x: 1, y: 3, z: 4 } });
  });

  it('should handle merging empty objects', () => {
    const lhs = {};
    const rhs = {};
    const result = merge(lhs, rhs);
    expect(result).to.deep.equal({});
  });
});

describe('set function', () => {
  it('should set a value for a given path in an object', () => {
    const obj = { a: { b: 2 } };
    const path = 'a.c';
    const value = 3;
    const result = set(obj, path, value);
    expect(result).to.deep.equal({ a: { b: 2, c: 3 } });
  });

  it('should create nested objects if path does not exist', () => {
    const obj = {};
    const path = 'a.b.c';
    const value = 10;
    const result = set(obj, path, value);
    expect(result).to.deep.equal({ a: { b: { c: 10 } } });
  });

  it('should handle setting a value to the root of an empty object', () => {
    const obj = {};
    const path = '';
    const value = 42;
    const result = set(obj, path, value);
    expect(result).to.equal(42);
  });

  it('should handle merging objects if the path already exists', () => {
    const obj = { a: { b: { x: 1, y: 2 } } };
    const path = 'a.b';
    const value = { y: 3, z: 4 };
    const result = set(obj, path, value);
    expect(result).to.deep.equal({ a: { b: { x: 1, y: 3, z: 4 } } });
  });

  it('should return the object unchanged for non-object inputs', () => {
    const nonObject = 'not an object';
    const path = 'some.path';
    const value = 'value';
    const result = set(nonObject, path, value);
    expect(result).to.equal(nonObject);
  });

  it('should throw an error if the path is not a string', () => {
    const obj = {};
    const path = 123 as any;
    const value = 'value';
    expect(() => set(obj, path, value)).to.throw('path must be string');
  });
});

describe('isEqual function', () => {
  it('should correctly compare two equal objects', () => {
    const a = { x: 1, y: { z: 2 } };
    const b = { x: 1, y: { z: 2 } };
    const result = isEqual(a, b);
    expect(result).to.equal(true);
  });

  it('should correctly compare two different objects', () => {
    const a = { x: 1, y: { z: 2 } };
    const b = { x: 1, y: { z: 3 } };
    const result = isEqual(a, b);
    expect(result).to.equal(false);
  });

  it('should correctly compare functions with the same code', () => {
    const a = () => console.log('Function A');
    const b = () => console.log('Function A');
    const result = isEqual(a, b);
    expect(result).to.equal(true);
  });

  it('should correctly compare functions with different code', () => {
    const a = () => console.log('Function A');
    const b = () => console.log('Function B');
    const result = isEqual(a, b);
    expect(result).to.equal(false);
  });

  it('should return false for non-equal types', () => {
    const a = { x: 1 };
    const b: number[] = [];
    const result = isEqual(a, b);
    expect(result).to.equal(false);
  });

  it('should return false for objects with different properties', () => {
    const a = { x: 1 };
    const b = { y: 1 };
    const result = isEqual(a, b);
    expect(result).to.equal(false);
  });
});

describe('arrayLeftRightIntersect function', () => {
  it('should correctly find left array, right array, intersection elements', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [3, 4, 5, 6];
    const [leftOnly, rightOnly, intersection] = arrayLeftRightIntersect(
      arr1,
      arr2
    );
    expect(leftOnly).to.deep.equal([1, 2]);
    expect(intersection).to.deep.equal([3, 4]);
    expect(rightOnly).to.deep.equal([5, 6]);
  });

  it('should handle empty arrays', () => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    const [leftOnly, rightOnly, intersection] = arrayLeftRightIntersect(
      arr1,
      arr2
    );
    expect(leftOnly).to.deep.equal([]);
    expect(rightOnly).to.deep.equal([]);
    expect(intersection).to.deep.equal([]);
  });

  it('should handle arrays with no common elements', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const [leftOnly, rightOnly, intersection] = arrayLeftRightIntersect(
      arr1,
      arr2
    );
    expect(leftOnly).to.deep.equal([1, 2, 3]);
    expect(rightOnly).to.deep.equal([4, 5, 6]);
    expect(intersection).to.deep.equal([]);
  });
});

describe('cloneDeep function', () => {
  it('should clone an object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = cloneDeep(obj);
    expect(clonedObj).to.deep.equal(obj);
    expect(clonedObj).not.to.equal(obj);
  });

  it('should clone an array', () => {
    const arr = [1, [2, 3], { a: 4 }];
    const clonedArr = cloneDeep(arr);
    expect(clonedArr).to.deep.equal(arr);
    expect(clonedArr).not.to.equal(arr);
  });

  it('should clone a Map', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', { c: 2 });
    const clonedMap = cloneDeep(map);
    expect(clonedMap).to.deep.equal(map);
    expect(clonedMap).not.to.equal(map);
  });

  it('should clone a Set', () => {
    const set = new Set();
    set.add(1);
    set.add([2, 3]);
    const clonedSet = cloneDeep(set);
    expect(clonedSet).to.deep.equal(set);
    expect(clonedSet).not.to.equal(set);
  });

  it('should return a function as is', () => {
    const func = () => console.log('Hello, world!');
    const clonedFunc = cloneDeep(func);
    expect(clonedFunc).to.equal(func);
  });

  it('should clone a primitive value', () => {
    const primitive = 42;
    const clonedPrimitive = cloneDeep(primitive);
    expect(clonedPrimitive).to.equal(primitive);
  });
});

describe('queryStringify function', () => {
  it('should correctly convert a simple object to a query string', () => {
    const data = { name: 'John Doe', age: 30, active: true };
    const queryString = queryStringify(data);
    expect(queryString).to.equal('name=John%20Doe&age=30&active=true');
  });

  it('should correctly handle nested objects', () => {
    const data = {
      person: { name: 'John Doe', age: 30 },
      address: { city: 'New York' },
    };
    const queryString = queryStringify(data);
    expect(queryString).to.equal(
      'person[age]=30&person[name]=John%20Doe&address[city]=New%20York'
    );
  });

  it('should correctly handle arrays', () => {
    const data = { fruits: ['apple', 'banana', 'orange'] };
    const queryString = queryStringify(data);
    expect(queryString).to.equal(
      'fruits[2]=orange&fruits[1]=banana&fruits[0]=apple'
    );
  });

  it('should handle empty objects', () => {
    const data = {};
    const queryString = queryStringify(data);
    expect(queryString).to.equal('');
  });
});

describe('formDataToJson function', () => {
  it('should convert FormData with simple values to JSON', () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('age', '30');
    const result = formDataToJson(formData);
    expect(result).to.deep.equal({ name: 'John Doe', age: '30' });
  });

  it('should handle File objects as is', () => {
    const file = new File(['file contents'], 'example.txt', {
      type: 'text/plain',
    });
    const formData = new FormData();
    formData.append('file', file);
    const result = formDataToJson(formData);
    expect(result.file).to.equal(file);
  });

  it('should handle empty FormData', () => {
    const formData = new FormData();
    const result = formDataToJson(formData);
    expect(result).to.deep.equal({});
  });
});
