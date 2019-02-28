function permAlone(s) {
  if (!s) {
    return null;
  }
  permutations = [];
  skip  = {};
  permAloneHelper(s, permutations, skip, [], '');
  return permutations.map((list) => {
    return list.join('');
  });
}

function permAloneHelper(s, list, skip, tempList, prev) {
  if (s.length === tempList.length) {
    list.push(tempList);
  }
  else {
    for (let i = 0; i < s.length; i++) {
      if (skip[i] || prev==s[i]) {
        continue;
      }
      skip[i] = true;
      newList = tempList.slice();
      newList.push(s[i]);
      permAloneHelper(s, list, skip, newList, s[i]);
      delete skip[i];
    }
  }
}

console.log(permAlone("aabb"));
