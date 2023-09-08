var bingos = [
  "用龜殼擊中對手",
  "擋下所有的龜殼攻擊（不含藍龜）",
  "用蘑菇躲過藍龜",
  "成功使閃電無效化",
  "抵達終點時持有10枚金幣",
  "連續取得前三名3次",
  "積分尾數為69",
  "用香蕉皮擊中對手",
  "使用砲彈刺客",
  "毫髮無傷通過終點",
  "墜落懸崖",
  "贏過積分比自己高1000以上的對手",
  "得到第一名",
  "得到最後一名",
  "用超級喇叭破壞藍龜",
  "用火球擊中對手",
  "抄捷徑",
  "用迴旋鏢擊中對手",
  "用吞食花擊中對手",
  "賽後積分無變化",
  "不使用任何道具得到前三名",
  "抵達終點時持有0枚金幣",
  "抵達終點時仍有道具未使用",
  "得到第二名",
  "使用奇蹟之8",
  "用炸彈兵擊中對手",
  "選中隨機賽道",
  "選中新增賽道通行證的賽道",
  "積分尾數為00",
  "全程沒有踩到加速板",
  "撞牆",
  "選中彩虹之路",
  "選中200cc賽道",
  "被害羞幽靈偷走道具",
  "害羞幽靈給你蘑菇",
  "無敵星狀態擊中對手",
  "得到第四～六名",
  "使用閃電",
  "自己挑的賽道被選中",
]

var squares = document.querySelectorAll(".bingo-square")
var modal = document.querySelector(".bingo-modal-backdrop")
var bingoMatch = straightBingoPatterns(5)
// /12345|678910|1112131415|1617181920|2122232425|1.*6.*11.*16.*21|2.*7.*12.*17.*22|3.*8.*13.*18.*23|4.*9.*14.*19.*24|5.*10.*15.*20.*25|1.*7.*13.*19.*25|5.*9.*13.*17.*21/

function straightBingoPatterns(length) {
  // // Version 1
  // var bingoLength = new Array(length).fill()
  // var totalSquares = new Array(length ** 2).fill().map((_, i) => i + 1)
  // var rows = bingoLength.map((_, i) =>
  //   totalSquares.slice(i * length, i * length + length).join("")
  // )
  // var columns = bingoLength.map((_, i) =>
  //   bingoLength.map((_, j) => totalSquares[j * length + i]).join(".*")
  // )
  // var topLeftDiagonal = bingoLength.map((_, i) => length * i + i + 1).join(".*")
  // var topRightDiagonal = bingoLength.map((_, i) => length * (i + 1) - i).join(".*")

  // return new RegExp(`${[...rows, ...columns, topLeftDiagonal, topRightDiagonal].join("|")}`)

  // Version 2
  var bingoLength = new Array(length).fill()
  var squareMap = bingoLength.reduce((obj, _, i) => {
    obj[i + 1] = bingoLength.map((_, j) => i * length + j + 1)
    return obj
  }, {})

  var rows = Object.values(squareMap).map(arr => arr.join(""))
  var columns = bingoLength.map((_, i) => bingoLength.map((_, j) => squareMap[j + 1][i]).join(".*"))
  var topLeftDiagonal = bingoLength.map((_, j) => squareMap[j + 1][j]).join(".*")
  var topRightDiagonal = bingoLength.map((_, j) => squareMap[j + 1][length - (j + 1)]).join(".*")

  return new RegExp(`${[...rows, ...columns, topLeftDiagonal, topRightDiagonal].join("|")}`)
}

function setCard() {
  shuffleArray()
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = bingos[i]
  }
}

function shuffleArray() {
  for (var i = bingos.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = bingos[i]
    bingos[i] = bingos[j]
    bingos[j] = temp
  }
}

function playAgain() {
  keepPlaying()
  clearBoard()
  setCard()
}

function markBoard(e) {
  e.target.classList.toggle("cross-off")
  checkBingo()
}

function clearBoard() {
  Array.from(squares).forEach(square => {
    square.classList.remove("cross-off")
  })
}

function checkBingo() {
  var values = Array.from(document.querySelectorAll(".cross-off"))
    .map(x => +x.getAttribute("value"))
    .sort((a, b) => a - b)
    .join("")
  if (bingoMatch.test(values)) bingo()
}

function bingo() {
  modal.classList.add("got-bingo")
}

function keepPlaying() {
  modal.classList.remove("got-bingo")
}

setCard()
document.querySelector(".copyright").innerText = `David Irvin © ${new Date().getFullYear()}`
