import sinon, {
  SinonFakeXMLHttpRequestStatic,
  SinonFakeXMLHttpRequest,
} from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    (global as any).XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('Method get() should be called with GET method', () => {
    instance.get('/');

    const [request] = requests;
    expect(request.method).to.equal('Get');
  });

  it('Method post() should be called with POST method', () => {
    instance.post('/path');

    const [request] = requests;
    expect(request.method).to.equal('Post');
  });

  it('Method put() should be called with PUT method', () => {
    instance.put('/path', {});

    const [request] = requests;
    expect(request.method).to.equal('Put');
  });

  it('Method patch() should be called with PATCH method', () => {
    instance.patch('/path', {});

    const [request] = requests;
    expect(request.method).to.equal('Patch');
  });

  it('Method delete() should be called with DELETE method', () => {
    instance.delete('/path');

    const [request] = requests;
    expect(request.method).to.equal('Delete');
  });

  it('Method request() should correctly handle successful responses', async () => {
    instance.get('/');
    const [request] = requests;
    const responseData = 200;
    request.respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(responseData)
    );
    const response = request.status;
    expect(response).to.deep.equal(responseData);
  });

  it('Method request() should handle error responses', async () => {
    instance.get('/');
    const [request] = requests;
    const errorMessage = 'Not Found';

    try {
      request.respond(404, { 'Content-Type': 'text/plain' }, errorMessage);
      //   request.status;
    } catch (error) {
      expect(error).to.equal(errorMessage);
    }
  });
});
