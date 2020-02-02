import Nutritions from './Nutritions';
import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';

class Food {
    private currentValues: Nutritions;

    constructor(
        private readonly name: string,
        private readonly unit: string,
        private readonly baseValues: Nutritions) {
        this.validateFoodName(name);
        this.validateFoodAmount(baseValues.amount);
        this.currentValues = { ...baseValues }
    }

    private validateFoodAmount(amount: number) {
        if (amount <= 0) {
            throw new InvalidFoodAmountError(amount);
        }
    }

    private validateFoodName(name: string) {
        if (name.length === 0) {
            throw new EmptyFoodNameError();
        }
    }

    getName(): string {
        return this.name;
    }

    getUnit(): string {
        return this.unit;
    }

    getBaseValues(): Nutritions {
        return this.baseValues;
    }

    getCurrentValues(): Nutritions {
        return this.currentValues;
    }

    changeAmount(amount: number) {
        this.validateFoodAmount(amount);
        this.currentValues.amount = amount;
    }
}

export default Food;
