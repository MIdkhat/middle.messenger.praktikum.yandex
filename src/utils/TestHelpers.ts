import { formDataToJson } from './Helpers';
type EventType = 'click' | 'submit';

export const mockConsoleLog = (
  element: HTMLElement,
  event: EventType
): string => {
  // Mock the console.log method to capture the output
  let consoleOutput = '';
  const originalConsoleLog = console.log;
  console.log = (output: string) => {
    consoleOutput += output;
  };

  if (event === 'submit') {
    const submitEvent = new window.Event('submit');
    element.dispatchEvent(submitEvent);
  }

  if (event === 'click') {
    const clickEvent = new window.MouseEvent('click');
    element.dispatchEvent(clickEvent);
  }

  console.log = originalConsoleLog;
  return consoleOutput;
};

// const submitForm = async (e: Event) => {
//   e.preventDefault();
//   const form = e.currentTarget as HTMLFormElement;
//   if (!form) return;
//   const formData = new FormData(form);
//   const data = formDataToJson(formData);
//   console.log(data);
//   return;
// };
