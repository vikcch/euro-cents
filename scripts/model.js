import fns from './extra/fns.js';

export default class Model {

    constructor() {

        this.masterNumbers = Array(5);
        this.masterStars = Array(2);

        this.slaveNumbers = Array(5);
        this.slaveStars = Array(2);

        this.allNumbers = Array.from(Array(50), (v, k) => k + 1);
        this.allStars = Array.from(Array(12), (v, k) => k + 1);








        // charAt(0) => Number
        // charAt(1) => Star
        this.prizes = {
            // '52': 0,
            // '30': 0,
            // '12': 0,
            // '21': 0,
            // '20': 0,
            // // Sem premio
            // '02': 0,
            // '01': 0,
            // '10': 0,
            // '00': 0
        };

        const prizesLabel = ['52', '51', '50', '42', '41', '32', '40', '22', '31', '30', '12', '21', '20'];

        const valuesOnTable = document.querySelectorAll('.prize');

        prizesLabel.forEach((label, i) => {
            this.prizes[label] = {
                wins: 0,
                amount: Number(valuesOnTable[i].innerText.replace(/,/g, '').slice(2))
            };
        });


        this.moneyWon = 0;
    }

    generateKey() {

        const rnd = arr => () => fns.head(arr.splice(Math.random() * arr.length, 1));

        return {
            numbers: Array.from(Array(5), rnd(this.allNumbers.slice())),
            stars: Array.from(Array(2), rnd(this.allStars.slice()))
        };

    }

    /*     generateKey() {
    
    
            const numbers = new Set([(Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1]);
    
            while (numbers.size !== 5) numbers.add((Math.random() * 50) + 1);
    
            const stars = new Set([(Math.random() * 12) + 1, (Math.random() * 12) + 1]);
            while (stars.size !== 2) stars.add((Math.random() * 12) + 1);
    
            return {
                numbers: [...numbers],
                stars: [...stars]
            };
    
        } */

    // Solução mais muito mais rapida, mas não faz diferença porque o 
    // bottle neck e o setInterval
    // tinha que ficar apenas com a parte inteira

    /*     generateKey() {
    
            const numbers = [(Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1, (Math.random() * 50) + 1];
    
            while (numbers.length !== 5) {
    
                const n = Math.random() * 50 + 1;
                if (!numbers.includes(n)) numbers.push(n);
            }
    
            const stars = [(Math.random() * 12) + 1, (Math.random() * 12) + 1];
            while (stars.length !== 2) {
    
                const n = Math.random() * 12 + 1;
                if (!stars.includes(n)) stars.push(n);
            }
    
            return { numbers, stars };
        } */

    generateMasterKey() {

        const r = this.generateKey();

        this.masterNumbers = r.numbers;
        this.masterStars = r.stars;
    }

    generateSlaveKey() {

        const r = this.generateKey();

        this.slaveNumbers = r.numbers;
        this.slaveStars = r.stars;
    }

    matchMaster() {

        const setNumbers = new Set([...this.masterNumbers, ...this.slaveNumbers]);

        const numbersCount = 10 - setNumbers.size;

        const setStars = new Set([...this.masterStars, ...this.slaveStars]);

        const starsCount = 4 - setStars.size;

        const prizeLabel = `${numbersCount}${starsCount}`;

        if (this.prizes[prizeLabel]) {

            this.prizes[prizeLabel].wins++;
            this.moneyWon += this.prizes[prizeLabel].amount;
        }

        return prizeLabel;
    }

}