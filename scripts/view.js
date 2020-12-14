import Model from './model.js';

export default class View {

    constructor() {

        this.masterNumbers = document.querySelectorAll('.number-master');
        this.masterStars = document.querySelectorAll('.star-master');
        this.masterKeyButton = document.querySelector('#master-key-btn');

        this.slaveNumbers = document.querySelectorAll('.number-slave');
        this.slaveStars = document.querySelectorAll('.star-slave');
        this.keysButton = document.querySelector('#keys-btn');


        this.years = document.querySelector('#years');
        this.betsPerWeek = document.querySelector('#bets-per-week');

        this.moneySpend = document.querySelector('#money-spend');
        this.moneyWon = document.querySelector('#money-won');
        this.profit = document.querySelector('#profit');

        this.keysCounter = document.querySelector('#keys-counter');

        this.table = document.querySelectorAll('.wins');
    }

    get totalTimes() {

        const years = Number(this.years.value);
        const betsPerWeek = Number(this.betsPerWeek.value);

        return years * 52 * betsPerWeek;
    }

    bindControls(handlers) {

        this.masterKeyButton.addEventListener('click', handlers.masterKey);
        this.keysButton.addEventListener('click', handlers.keys);

        this.betsPerWeek.addEventListener('input', handlers.betsPerWeek);
        this.years.addEventListener('input', handlers.years);
    }

    /**
     * 
     * @param {Model} model 
     */
    fillMasters(model) {

        const fps = 60;

        const frameRate = 1000 / fps;

        const { masterNumbers, masterStars } = model;

        let current = 0;

        let index = -1;

        setInterval(() => {

            const { numbers, stars } = model.generateKey();

            masterNumbers.forEach((n, i) => {

                const temp = i < index ? n : numbers[i];
                this.masterNumbers[i].innerHTML = temp;
            });

            masterStars.forEach((n, i) => {

                const temp = i + 5 < index ? n : stars[i];
                this.masterStars[i].innerHTML = temp;
            });

            if (current % 15 === 0) index++;

            if (index == 7) this.keysButton.disabled = false;

            current++;

        }, frameRate);
    }

    fillSlaves({ slaveNumbers, slaveStars }) {

        slaveNumbers.forEach((n, i) => this.slaveNumbers[i].innerHTML = n);
        slaveStars.forEach((n, i) => this.slaveStars[i].innerHTML = n);
    }


    updateStats(count, model) {

        const prizesLabel = ['52', '51', '50', '42', '41', '32', '40', '22', '31', '30', '12', '21', '20'];

        const { prizes, moneyWon } = model;

        // this.table.forEach((el, i) => el.innerHTML = prizes[prizesLabel[i]] || 0);

        this.table.forEach((el, i) => {

            const label = prizesLabel[i];
            el.innerHTML = prizes[label].wins;
        });

        const moneySpend = count * 2.2;
        const profit = moneyWon - moneySpend;

        const totalTimes = this.totalTimes === 0
            ? `Infinity or 1st Prize`
            : this.totalTimes.toLocaleString('en-US');

        this.keysCounter.innerHTML = `Times: ${count.toLocaleString('en-US')} / ${totalTimes}`;
        this.moneySpend.innerHTML = `Money Invested: € ${moneySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        this.moneyWon.innerHTML = `Money Won: € ${moneyWon.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        this.profit.innerHTML = `€ ${profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

        this.updateProfitCSS(profit);
    }

    updateProfitCSS(profit) {

        const color = profit > 0 ? "green" : "red";

        this.profit.style.color = color;
    }

    disableInputs(){

        this.betsPerWeek.setAttribute("disabled", true);
        this.years.setAttribute("disabled", true);
    }

}

// ("51,991,282.53").replace(/,/g,'')