import fns from './extra/fns.js';
import Model from './model.js';
import View from './view.js';

export default class Controller {

    /**
     * 
     * @param {View} view 
     * @param {Model} model 
     */
    constructor(model, view) {

        this.model = model;
        this.view = view;

        const handlers = {

            masterKey: this.handlerMasterKey_Click,
            keys: this.handlerKeys_Click,
            betsPerWeek: this.handlerBetsPerWeek_Input,
            years: this.handlerYears_Input
        };

        this.view.bindControls(handlers);

        this.view.updateStats(0, this.model);
        this.view.keysButton.disabled = true;
    }

    /**
     *
     * @param {Event} event 
     */
    handlerMasterKey_Click = (event) => {

        event.currentTarget.disabled = true;

        this.model.generateMasterKey();

        this.view.fillMasters(this.model);
    }

    /**
     * 
     * @param {Event} event 
     */
    handlerKeys_Click = (event) => {

        this.view.disableInputs();

        const times = this.view.totalTimes;

        let count = 1;

        const interval = setInterval(() => {

            this.model.generateSlaveKey();

            const prizeLabel = this.model.matchMaster();

            this.view.fillSlaves(this.model);

            this.view.updateStats(count, this.model);

            if (count === times || prizeLabel === '52') {

                clearInterval(interval);

                if (prizeLabel === '52') {

                    alert('OMG!');
                }
            }

            count++;

        }, 0);

        event.currentTarget.disabled = true;
    }

    handlerBetsPerWeek_Input = (event) => {

        const { value } = event.currentTarget;

        event.currentTarget.value = fns.onlyNumbers(value);

        this.view.updateStats(0, this.model);
    }

    handlerYears_Input = (event) => {

        const { value } = event.currentTarget;

        event.currentTarget.value = fns.onlyNumbers(value);

        this.view.updateStats(0, this.model);
    }

}