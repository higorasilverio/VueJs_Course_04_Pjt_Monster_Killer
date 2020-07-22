new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(special) {
            this.hurt('monsterLife', 5, 10, special, 'Hero', 'Monster', 'player')
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monster', 'Hero', 'monster')
            }
        },
        hurt(who, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[who] = Math.max(this[who] - hurt, 0)
            this.registerLog(`${source} hit ${target} with ${hurt} damage points.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Hero', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Hero was healed with ${heal} life points.`, 'healing')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        },
        givenUp(){
            this.running = false
            this.logs = []
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
            this.logs = []
        }
    }
})