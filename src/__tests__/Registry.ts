import * as assert from 'assert';
import { Registry, RegistryScopeType } from '../Registry';
import { Metadata } from '../decorator/Metadata';

describe('Registry', () => {
  let registry = null;

  beforeEach(() => {
    registry = new Registry();
  });

  it('should be register factory class', () => {
    class Test {
      public prop: number = 0;
    }

    registry.register(Test);

    const test = registry.get(Test);

    assert(test instanceof Test, 'test instanceof Test');
  });

  it('should be return many instances', () => {
    class Test {
      public prop: number = 0;
    }

    registry.register(Test);

    const test = registry.get(Test);
    const test2 = registry.get(Test);
    test.prop = 2;

    assert.notEqual(test.prop, test2.prop, 'props not equal');
  });

  it('should be pass factory instance by type into constructor', () => {
    let state = false;

    class Test3 {
      public state = true;
    }

    @Metadata
    class Test4 {
      constructor(t: Test3) {
        state = t.state;
      }
    }

    registry.register(Test3);
    registry.register(Test4);
    registry.get(Test4);

    assert(state);
  });

  it('should be pass factory instance without register by type into constructor', () => {
    let state = false;

    class Test3 {
      public state = true;
    }

    @Metadata
    class Test4 {
      constructor(t: Test3) {
        state = t.state;
      }
    }

    registry.register(Test4);
    registry.get(Test4);

    assert(state);
  });

  it('should be pass default value into constructor', () => {
    @Metadata
    class Test4 {
      constructor(public one: number = 1) {
      }
    }

    registry.register(Test4);
    const t = registry.get(Test4);

    assert.equal(1, t.one);
  });

  it('should be pass return null if get by not register class', () => {
    function Test() {

    }

    const t = registry.get(Test);

    assert.equal(null, t);
  });

  it('should be return singleton instance', () => {
    class Test {

    }

    registry.register(Test, RegistryScopeType.singleton);
    const t = registry.get(Test);

    assert(t instanceof Test);
  });

});