function defaultMinValue() {
  return Number.MIN_SAFE_INTEGER;
}
function defaultSetValue(index, key) {
  this._heap[index] = key;
}
function defaultCompare(a, b) {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}
function MaxHeap(compare = defaultCompare, minValue = defaultMinValue,
  setValue = defaultSetValue) {
    this.compare = compare;
    this.minValue = minValue;
    this.setValue = setValue;
    this._heap = [];
}
MaxHeap.prototype.swap = function(a, b) {
  [this._heap[a], this._heap[b]] = [this._heap[b], this._heap[a]];
}
MaxHeap.prototype.left = function(index) {
  return 1 + (2 * index);
}
MaxHeap.prototype.right = function(index) {
  return 2 + (2 * index);
}
MaxHeap.prototype.parent = function(index) {
  return Math.ceil(index / 2) - 1;
}
MaxHeap.prototype.heapify = function(index) {
  const leftIndex = this.left(index);
  const rightIndex = this.right(index);
  let biggest;

  if (this._heap[leftIndex]
      && this.compare(this._heap[leftIndex], this._heap[index]) < 0) {
    biggest = leftIndex;
  } else {
    biggest = index;
  }
  if (this._heap[rightIndex]
      && this.compare(this._heap[rightIndex], this._heap[biggest]) < 0) {
    biggest = rightIndex;
  }
  if (biggest !== index) {
    this.swap(biggest, index);
    this.heapify(biggest);
  }
}
MaxHeap.prototype.maximum = function() {
  return this._heap[0];
}
MaxHeap.prototype.extractMax = function() {
  if (this._heap.length === 0) {
    throw Error('Heap is empty!');
  }
  if (this._heap.length === 1) {
    return this._heap.pop();
  }
  const max = this._heap[0];

  this._heap[0] = this._heap.pop();
  this.heapify(0);

  return max;
}
MaxHeap.prototype.increaseKey = function(index, key) {
  if (index < 0 || index >= this._heap.length) {
    throw Error('Index is outside the bounds of the heap!');
  }
  if (this.compare(key, this._heap[index]) >= 0) {
    return;
  }
  this.setValue(index, key);

  while (index > 0
    && this.compare(this._heap[this.parent(index)], this._heap[index]) > 0) {
      let curParent = this.parent(index);

      this.swap(index, curParent);
      index = curParent;
  }
}
MaxHeap.prototype.insert = function(key) {
  this._heap.push(this.minValue());
  this.increaseKey(this._heap.length - 1, key);
}
module.exports = { defaultCompare, MaxHeap };
