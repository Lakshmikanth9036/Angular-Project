import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Grilled-Turkish',
  //     'A super-tasty Grilled - just awsome!!!',
  //     'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg',
  //       [
  //           new Ingredient('Chicken Wings', 8),
  //           new Ingredient('French Fries', 20)
  //       ]
  //   ),
  //   new Recipe(
  //     'DIY Pudding Pops',
  //     'Few desserts are both rich and refreshing!!!',
  //     'https://www.seriouseats.com/recipes/images/2016/08/20160714-vanilla-pudding-pops-vicky-wasik-18.jpg',
  //     [
  //       new Ingredient('Milk in ounces', 10),
  //       new Ingredient('Sugar in ounces', 7)
  //   ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }
}
