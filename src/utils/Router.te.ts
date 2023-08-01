// // import { expect } from 'chai';
// import sinon, { SinonFakeXMLHttpRequestStatic } from 'sinon';
// import { Router } from './Router';
// import Block from './Block';
// import { template } from './dummy.templ.js';

// describe('Router test', () => {
//   let xhr: SinonFakeXMLHttpRequestStatic;
//   let router: Router;
//   const rootQuery = '#app';

//   beforeEach(() => {
//     xhr = sinon.useFakeXMLHttpRequest();
//     (global as any).XMLHttpRequest = xhr;

//     router = new Router(rootQuery);
//     router.start();
//   });

//   afterEach(() => {
//     xhr.restore();
//   });

//   it('should navigate to the correct route', () => {
//     class DummyBlock extends Block {
//       render() {
//         return this.compile(template, {});
//       }
//     }

//     const pathname = '/test-route';
//     router.use(pathname, DummyBlock);

//     // const root = document.createElement('div');
//     // root.id = 'app';
//     // document.body.appendChild(root);

//     router.go(pathname);
//     console.log(pathname);

//     // const contentElement = DummyBlock.get

//     // expect(contentElement).to.exist;
//     // expect(contentElement?.textContent).to.equal('Dummy Block Content');
//   });

//   //   it('should call the leave() method when navigating away from a route', () => {
//   //     let leaveCalled = false;

//   //     // Define a dummy Block class with a leave method for testing
//   //     class DummyBlockWithLeave extends Block {
//   //       render() {
//   //         return this.compile(template, {});
//   //       }

//   //       leave(): void {
//   //         leaveCalled = true;
//   //       }
//   //     }

//   //     const pathname1 = '/route1';
//   //     router.use(pathname1, DummyBlockWithLeave);
//   //     router.go(pathname1);

//   //     expect(leaveCalled).to.be.false;

//   //     const pathname2 = '/route2';
//   //     router.use(pathname2, DummyBlockWithLeave);
//   //     router.go(pathname2);

//   //     expect(leaveCalled).to.be.true;
//   //   });
// });
