export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  emoji: string;
}

export type FoodCategory = 'breakfast' | 'lunch' | 'dinner';

export interface CategoryInfo {
  id: FoodCategory;
  name: string;
  emoji: string;
  color: string;
  foods: Food[];
}