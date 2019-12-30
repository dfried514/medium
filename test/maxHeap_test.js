const expect = require('chai').expect;

describe('defaultCompare', () => {
  const defaultCompare = require('../heap/maxHeap.js').defaultCompare;
  const a = 4, b = 3;

  it('should correctly compare two values', () => {
    expect(defaultCompare(a, b)).to.equal(-1);
    expect(defaultCompare(b, a)).to.equal(1);
    expect(defaultCompare(a, a)).to.equal(0);
  });
});
describe('MAX HEAP METHODS', () => {
  const MaxHeap = require('../heap/maxHeap.js').MaxHeap;
  let heap;

  before(() => {
    heap = new MaxHeap();
  });
  describe('swap', () => {
    beforeEach(() => {
      heap._heap = [1, 2, 3, 4, 5];
    });
    it('should correctly swap two apart values within the heap', () => {
      heap.swap(1, 4);

      expect(heap._heap).to.eql([1, 5, 3, 4, 2]);
    });
    it('should correctly swap two adjacent values within the heap', () => {
      heap.swap(2, 3);

      expect(heap._heap).to.eql([1, 2, 4, 3, 5]);
    });
    it('should correctly swap the same value within the heap', () => {
      heap.swap(2, 2);

      expect(heap._heap).to.eql([1, 2, 3, 4, 5]);
    });
  });
  describe('heapify', () => {
    it('should correctly maintain heap structure of already formed heap', () => {
      heap._heap = [4, 3, 2, 1];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([4, 3, 2, 1]);
    });

    it('should correctly update heap structure of altered heap', () => {
      heap._heap = [1, 4, 2, 3];
      heap.heapify(0);

      expect(heap._heap).to.deep.equal([4, 3, 2, 1]);
    });
  });
  describe('extractMax', () => {
    it('should throw an error if the heap is empty', () => {
      heap._heap = [];

      const handler = () => {
        heap.extractMax();
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Heap is empty!');
    });
    it('should return max key and update the heap', () => {
      heap._heap = [4, 3, 2, 1];

      expect(heap.extractMax()).to.equal(4);
      expect(heap._heap).to.deep.equal([3, 1, 2]);
    });
    it('should return max key and empty heap when one key is in the heap', () => {
      heap._heap = [1];

      expect(heap.extractMax()).to.equal(1);
      expect(heap._heap).to.be.empty;
    });
  });
  describe('increaseKey', () => {
    it('should throw an error if the index is outside the bounds of the heap', () => {
      heap._heap = [40, 30, 20, 10];

      const handler = () => {
        heap.increaseKey(4, 50);
      };
      expect(handler).to.throw(Error);
      expect(handler).to.throw('Index is outside the bounds of the heap!');
    });
    it('should not throw an error when increase value is less than key', () => {
      heap._heap = [10, 20, 30, 40];

      const handler = () => {
        heap.increaseKey(3, 25);
      };
      expect(handler).to.not.throw();
    });
    it('should not throw an error if the value matches the key', () => {
      heap._heap = [4, 3, 2, 1];

      const handler = () => {
        heap.increaseKey(1, 3);
      };
      expect(handler).to.not.throw();
    });
    it('should increase the key of a particular index and update the heap', () => {
      heap._heap = [40, 30, 20, 10];

      heap.increaseKey(3, 35);

      expect(heap._heap).to.deep.equal([40, 35, 20, 30]);
    });
  });
  describe('insert', () => {
    beforeEach(() => {
      heap._heap = [40, 30, 20, 10];
    });
    it('should correctly insert a key into the heap and update the heap', () => {
      heap.insert(35);

      expect(heap._heap).to.deep.equal([40, 35, 20, 10, 30]);
    });
    it('should properly handle duplicate values within the heap', () => {
      heap.insert(40);

      expect(heap._heap).to.deep.equal([40, 40, 20, 10, 30]);
    });
  });
});
