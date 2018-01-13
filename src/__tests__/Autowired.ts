import * as assert from 'assert';
import { Autowired } from '../decorator/Autowired';
import { Registry } from '../Registry';

describe('Autowired', () => {
  it('should be pass Test instance into property instance Test2', function () {
    let state = false;
    const registry = new Registry();

    class Test {
      public run() {
        state = true;
      }
    }

    class Test2 {
      @Autowired
      private test: Test;

      constructor() {
        this.test.run();
      }
    }

    registry.get(Test2);

    assert(state);

  });

});