import { Input } from '../components/Input/input';
import { Container } from '../components/Containers/containers';
import Block from './Block';

export const findInputs = (obj: any): Container[] => {
  let elements: Container[] = [];

  function traverseObject(obj: any) {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'inputs') {
        const inputs = value as Container[];
        elements = [...elements, ...inputs];
      }

      if (typeof value === 'object' && value !== null && key === 'children') {
        traverseObject(value); // Recursively traverse nested objects
      } else if (Array.isArray(value) && key === 'content') {
        value.forEach((item) => {
          if (typeof item === 'object' && item !== null) {
            traverseObject(item); // Recursively traverse nested objects within arrays
          }
        });
      }
    });
  }

  traverseObject(obj);
  return elements;
};

export const validateForm = (form: Block): boolean => {
  const inputContainers = findInputs(form);
  const inputs = inputContainers.map((container) => {
    const content = container.children.content as Input[];
    return content[1];
  });
  // validate each input on regex
  const inputsData = inputs.map((i) => validateInput(i));
  const invalidData = inputsData.filter((d) => !d.valid);
  if (invalidData.length > 0) {
    const warnings = invalidData.map((d) => `* ${d.warning}`).join('\n');
    alert(warnings);
    return false;
  }

  return true;
};

export const validateInput = (inp: Input) => {
  const regex = inp.getProps('regex');
  const value = inp.getValue();
  return {
    name: inp.getName(),
    valid: regex.test(value),
    value: inp.getValue(),
    warning: inp.getProps('warning'),
  };
};
