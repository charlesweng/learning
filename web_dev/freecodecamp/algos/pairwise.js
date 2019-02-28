
function pairwise(arr, arg) {
  let totalSum = 0;
  let skip = {};
  for (let i = 0; i < arr.length; i++) {
    let target = arg - arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (!skip[i] && !skip[j] && arr[j] === target) {
        skip[i] = true;
        skip[j] = true;
        totalSum += i + j;
        console.log(skip + `${i}+${j}`)
      }
    }
  }
  console.log(totalSum)
  return totalSum;
}

pairwise([1,1,1], 2);
