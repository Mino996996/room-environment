import {FirebaseService} from "./firebase.service";

describe('firebase.service', () => {
  const service = new FirebaseService();
  it('return hello service', () => {
    expect(service.hello()).toBe('hello service');
  })
})

