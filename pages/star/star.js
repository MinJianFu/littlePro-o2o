/**
 * Created by Administrator on 2017/3/20.
 */

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

 function showStar(data,result) {

  let score = Math.floor(data * 2) / 2;
  let hasDecimal = score % 1 !== 0;
  let integer = Math.floor(score);
  for (let i = 0; i < integer; i++) {
    result.push(CLS_ON);
  }
  if (hasDecimal) {
    result.push(CLS_HALF);
  }
  while (result.length < LENGTH) {
    result.push(CLS_OFF);
  }
  return result
}
module.exports.showStar = showStar