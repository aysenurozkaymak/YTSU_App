import { Ingredient, ScaledIngredient } from '../types';

/**
 * Malzeme miktarlarını hedef kişi sayısına göre ölçekler.
 *
 * Formül: ölçeklenmiş_miktar = (orijinal_miktar / orijinal_kişi) × hedef_kişi
 *
 * @param ingredients - Orijinal malzeme listesi
 * @param originalServings - Orijinal tarif kaç kişilik
 * @param targetServings - Hedef kişi sayısı
 * @returns Ölçeklenmiş malzeme listesi
 */
export function scaleIngredients(
    ingredients: Ingredient[],
    originalServings: number,
    targetServings: number,
): ScaledIngredient[] {
    if (originalServings <= 0 || targetServings <= 0) {
        return ingredients.map(ing => ({
            ...ing,
            scaledQuantity: ing.quantity,
        }));
    }

    const scaleFactor = targetServings / originalServings;

    return ingredients.map(ingredient => {
        const scaledQuantity =
            Math.round(ingredient.quantity * scaleFactor * 100) / 100;

        return {
            ...ingredient,
            scaledQuantity,
        };
    });
}

/**
 * Miktar değerini kullanıcı dostu formatta gösterir.
 * Tam sayılarda ondalık gösterilmez.
 */
export function formatQuantity(quantity: number): string {
    if (Number.isInteger(quantity)) {
        return quantity.toString();
    }
    return quantity.toFixed(2).replace(/\.?0+$/, '');
}
