export function controlStock(e) {
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  let bol = true;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === e.target.value) {
      bol = true;
      break;
    } else {
      bol = false;
    }
  }
  if (bol === false) {
    e.target.value = 1;
    return true;
  }
  return false;
}
