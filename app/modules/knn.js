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

function findNear(dataset, target, k=2, method='cosine') {
    var nn = [];
    var maxSim = -1;
    var simRes;
    for (var i = 0; i < dataset.length; i++) {
        simRes = cosineSimilarity(target, dataset[i]);
        if (simRes >= maxSim) {
            nn.push(i);
            maxSim = simRes;
        }
        if (nn.length >= k) {
            break;
        }
    }
    return nn;
}