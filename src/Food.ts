import Nutritions from './Nutritions';
import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';

class Food {
    constructor(
        private readonly name: string,
        private readonly unit: string,
        private readonly baseValues: Nutritions) {
        this.validateFoodName(name);
        this.validateFoodAmount(baseValues);
    }

    private validateFoodAmount(baseValues: Nutritions) {
        if (baseValues.amount <= 0) {
            throw new InvalidFoodAmountError(baseValues.amount);
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
}

export default Food;
