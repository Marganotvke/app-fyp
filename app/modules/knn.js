function dotp(x, y) {
    function dotp_sum(a, b) {
      return a + b;
    }
    function dotp_times(a, i) {
      return x[i] * y[i];
    }
    return x.map(dotp_times).reduce(dotp_sum, 0);
}

function cosineSimilarity(A,B){
    var similarity = dotp(A, B) / (Math.sqrt(dotp(A,A)) * Math.sqrt(dotp(B,B)));
    return similarity;
}

function findNearestNeighbors(dataset, targetVector, k = 2, method = 'cosine') {
  const neighbors = [];
  let maxSimilarity = -1;

  for (let i = 0; i < dataset.length; i++) {
    const similarity = cosineSimilarity(targetVector, dataset[i]);
    if (similarity > maxSimilarity) {
      neighbors.push(i);
      maxSimilarity = similarity;
    }

    if (neighbors.length >= k) {
      break;
    }
  }

  return neighbors;
}
