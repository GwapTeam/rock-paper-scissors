import score from "score.js"

window.addEventListener(
    "load",
    _ => main(),
    false
)

let main = () => {
    let gameForm = document.getElementById("gameForm");
    gameForm.addEventListener("submit", e => myGame(e), false);

    console.log(score)
    document.getElementById("deleteScore")
      .addEventListener(
          "click",
          _ => score.deleteAllScore(),
          false
      )

    score.subscribe(
        score => {
            let scoreElement = document.getElementById("score")
            while (scoreElement.firstChild)
                scoreElement.removeChild(scoreElement.firstChild);
            score.map(x => {
                let tr = document.createElement("tr")
                Object
                    .entries(x)
                    .map(x => {
                        let td = document.createElement("td")
                        td.innerHTML = x[1]
                        tr.appendChild(td)
                    })
                scoreElement.appendChild(tr)
            })
        }
    )

    let myGame = e => {
        e.preventDefault()
        let form = e.target
        let myNumber = form.elements["mySelect"].selectedIndex
        let hisNumber = Math.floor(Math.random()*3);

        let x = myNumber - hisNumber;
        let judge = x == -2 || x == 1 ? "あなたの 負け"
                  : x == 0            ? "両者の 引き分け"
                  :                     "あなたの 勝ち"

        // tuple
        let hands = (
            [myNumber, hisNumber].map(x =>
                x == 0 ? "グー"
              : x == 1 ? "チョキ"
              :          "パー"
            )
        )

        document.getElementById("opponentMessage").innerHTML = "相手の選択は " + hands[1];
        document.getElementById("selfMessage").innerHTML     = "勝敗の結果は " + judge;

        score.addScore({
            recode: {
                hisHand: hands[1],
                myHand : hands[0],
                judge
            },
            isPermanent: form.elements["isPermanent"].checked
        })
    }
}
