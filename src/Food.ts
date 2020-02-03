import Nutritions from './Nutritions';
import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';
import Units from './Units';

class Food {
    private currentValues: Nutritions;

    constructor(
        private readonly name: string,
        private readonly unit: Units,
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
        this.calculateNutrients(['calories', 'fat', 'carbohydrate', 'protein']);
    }

    changeCalories(calories: number) {
        this.validateFoodAmount(calories);
        this.currentValues.calories = calories;
        this.currentValues.amount = this.calculateAmountFromNutrition('calories');
        this.calculateNutrients(['fat', 'carbohydrate', 'protein']);
    }

    private calculateNutrients(nutrients: string[]) {
        nutrients.map(nutrient => {
            this.currentValues[nutrient] = this.calculateNutritionFromAmount(nutrient);
        });
    }

    calculateNutritionFromAmount(nutrition: string) {
        return Math.ceil(
            this.currentValues.amount * this.baseValues[nutrition]
            / this.baseValues.amount);
    }

    calculateAmountFromNutrition(nutrition: string) {
        return Math.ceil(
            this.currentValues[nutrition] * this.baseValues.amount
            / this.baseValues[nutrition]);
    }
}

export default Food;
