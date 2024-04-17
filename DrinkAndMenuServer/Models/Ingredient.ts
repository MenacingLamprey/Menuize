import { Association,
    HasManyAddAssociationMixin,
    Model,
    Optional,
    DataTypes,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
  } from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { DrinkIngredient } from "./DrinkIngredient";
import { IIngredient, IRecipe, IRecipeIngredient } from './modelTypes';
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { Recipe } from "./Recipe";
import { Brand } from "./Brand";

type IngredientCreationAttributes = Optional<IIngredient, "id">;

export class Ingredient extends Model<IIngredient, IngredientCreationAttributes> {
  declare id : number
  declare name: string
  declare family : string
  declare isPublic : boolean
  declare recipe : Recipe
  declare userId : string
  declare isUnique : boolean
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public static associations: {
    drinks : Association<Drink, Ingredient>
    creator : Association<User, Ingredient>;  
    DrinkIngredient : Association<DrinkIngredient, Ingredient>
    recipe : Association<Recipe, Ingredient>
  };

  public addDrink!: HasManyAddAssociationMixin<Ingredient, string>;
  public removeDrink!: HasManyAddAssociationMixin<Ingredient, string>;

  public addIngredient!: HasManyAddAssociationMixin<Ingredient, string>;
  public removeIngredient!: HasManyAddAssociationMixin<Ingredient, string>;

  declare createRecipe : HasOneCreateAssociationMixin<Recipe>
  declare setRecipe : HasOneSetAssociationMixin<Recipe, Ingredient>
  declare getRecipe : HasOneGetAssociationMixin<Recipe>

  declare addBrand :  HasManyAddAssociationMixin<Ingredient, Brand>
}
  
Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique : true
    },
    family: {
      type: DataTypes.TEXT
    },
    isPublic : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    isUnique : {
      type :DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true
    }
  },

  {
    sequelize,
    tableName: "ingredients",
  }
);-

Ingredient.belongsToMany(Drink, { through: DrinkIngredient});
Drink.belongsToMany(Ingredient, {through : DrinkIngredient})

Ingredient.hasMany(Brand, {as : 'brands'})
Brand.belongsTo(Ingredient, {as : 'ingredint'})

Brand.hasOne(Recipe, {as : 'homeMade'})
Recipe.belongsTo(Brand)

Recipe.belongsTo(Ingredient, {as : 'ingredient'})
Ingredient.hasOne(Recipe, {as : 'ingredient'})
Recipe.hasOne(Ingredient, {as : 'recipe'})
Ingredient.belongsTo(Recipe, {as : 'recipe'})

Recipe.hasMany(RecipeIngredient, {as : 'childIngredients', foreignKey : 'recipeId'})
RecipeIngredient.belongsTo(Recipe, {as : "childIngredients" , foreignKey : 'recipeId'})

RecipeIngredient.belongsTo(Ingredient, { as : "childIngredient", foreignKey :'childIngredientId'})
Ingredient.hasMany(RecipeIngredient, { as : "childIngredient", foreignKey :'childIngredientId'})