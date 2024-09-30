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

function euclideanDistance(A,B){
    var distance = 0;
    for (var i = 0; i < A.length; i++) {
        distance += Math.pow(A[i] - B[i], 2);
    }
    return Math.sqrt(distance);
}

export default function findNearestNeighbors(dataset, targetVector, k = 2, method = 'cosine') {
    const neighbors = [];
    let maxSimilarity = -Infinity;
    var distMethod = (method === 'cosine') ? cosineSimilarity : euclideanDistance;

    const cosSimData = dataset.map((x) => distMethod(x, targetVector));
    const sortedCosSimData = [...cosSimData].sort((a, b) => b - a);
    const topK = sortedCosSimData.slice(0, k);

    for (let i = 0; i < k; i++) {
        const idx = cosSimData.indexOf(topK[i]);
        neighbors.push(idx);
    }

  return neighbors;
}
