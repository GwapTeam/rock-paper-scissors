
class Score {
    constructor() {
        this.subscribers = []
    }

    addScore({
        // sample recode
        // [{
        //     hisHand: "ぐー",
        //     myHand : "パー",
        //     result : "あなたの 負け"
        // }]
        recode,
        isPermanent=true
    }) {
        let storage = isPermanent ? localStorage : sessionStorage
        storage.setItem(
            "score",
            JSON.stringify(
                this._readScoreByStorages({
                    storages: [storage]
                })
                .concat(recode)
            )
        )
        this._callSubscribers(this.readAllScore())

        return recode
    }

    readAllScore() {
        return this._readScoreByStorages(
            {
                storages: [sessionStorage, localStorage]
            }
        )
    }

    deleteAllScore() {
        [sessionStorage, localStorage].map(x => {
            x.removeItem("score")
        })
        this._callSubscribers(this.readAllScore())
    }

    subscribe(callback) {
        let id = Math.random()
        this.subscribers = this.subscribers.concat({
            id,
            callback
        })
        callback(this.readAllScore())

        return id
    }

    unsubscribe(id) {
        this.subscribers.filter(x => x.id != id)
        return true
    }

    _callSubscribers(result) {
        this.subscribers.map(x =>
            x.callback(result || [])
        )
        return true;
    }

    _readScoreByStorages({
        storages=[]
    }) {
        let result = storages
            .map(x =>
                JSON.parse(x.getItem("score")) || []
            )
            .reduce((a, b) =>
                a.concat(b),
                []
            )
        return result
    }
}

export default new Score();
