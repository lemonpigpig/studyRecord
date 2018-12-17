function minCoin(values, valueKinds, money, coinsUsed) {
  coinsUsed[0] = 0;
  for (let cents = 1; cents <= money; cents++) {
    let minCoins = cents;
    for (let kind = 0; kind < valueKinds; kind++) {
      // 若当前面值的硬币小于当前的cents则分解问题并查表
      if (values[kind] <= cents) {
        let temp = coinsUsed[cents - values[kind]] + 1;
        if (temp < minCoins) {
          minCoins = temp;
        }
      }
    }
    coinsUsed[cents] = minCoins;
    //   console.log("面值为 " + (cents) + " 的最小硬币数 : " + coinsUsed[cents])
  }
  return coinsUsed
}

function minCoin1(values, valueKinds, money, coinsUsed, min) {
  coinsUsed[0] = 0;
  for (let cents = 1; cents <= money; cents++) {
    let minCoins = cents;
    for (let kind = 0; kind < valueKinds; kind++) {
      // 若当前面值的硬币小于当前的cents则分解问题并查表
      if (values[kind] <= cents) {
        let temp = coinsUsed[cents - values[kind]] + min;
        if(temp === money) {
          if (temp < minCoins) {
            minCoins = temp;
          }
        }
       
      }
    }
    if(minCoins === cents) {
      minCoins = 0
    }
    coinsUsed[cents] = minCoins;
    //   console.log("面值为 " + (cents) + " 的最小硬币数 : " + coinsUsed[cents])
  }
  return coinsUsed
}
var coiValue = [25, 21, 10, 5, 1];
minCoin(coiValue, coiValue.length, 65, []);

var coiValue1 = [25, 21, 10, 5, 3];
minCoin1(coiValue1, coiValue1.length, 2, [], 3);