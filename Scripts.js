let count = 59;
const interval = setInterval(() => {
  if (count <= 0) {
    clearInterval(interval);
    return;
  }
  console.log(`Hello World ${count}`);
  count--;
}, 1000);
