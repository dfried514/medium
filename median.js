const lineReader = require('line-reader');
const MinHeap = require('./heap/minHeap.js').MinHeap;
const MaxHeap = require('./heap/maxHeap.js').MaxHeap;

const median = () => {
  const lowHeap = new MaxHeap();
  const highHeap = new MinHeap();
  let medianResult = 0;

  lineReader.eachLine('./data/median.txt', function(line, last) {
    let curInt = parseInt(line);

    if (lowHeap._heap.length === 0 || curInt < lowHeap.maximum()) {
      lowHeap.insert(curInt);
    } else {
      highHeap.insert(curInt);
    }
    if (lowHeap._heap.length > (highHeap._heap.length + 1)) {
      highHeap.insert(lowHeap.extractMax());
    } else if (highHeap._heap.length > lowHeap._heap.length) {
      lowHeap.insert(highHeap.extractMin());
    }
    medianResult += lowHeap.maximum();

    if(last){
      console.log(medianResult % 10000);
    }
  });
};
median();
