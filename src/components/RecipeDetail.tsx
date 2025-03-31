
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types";

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetail = ({ recipe, onClose }: RecipeDetailProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
          <DialogDescription className="text-base font-normal opacity-85">
            {recipe.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="relative h-64 overflow-hidden rounded-md">
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className="bg-secondary text-secondary-foreground">{recipe.cuisineType}</Badge>
            <span className="text-muted-foreground">•</span>
            <Badge variant="outline">{recipe.culturalOrigin}</Badge>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.798-2.034c-.784-.57-.381-1.81.587-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{recipe.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min total
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nutrition Facts</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted p-2 rounded-md">
                  <div className="font-medium">Calories</div>
                  <div>{recipe.nutritionalInfo.calories} kcal</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="font-medium">Protein</div>
                  <div>{recipe.nutritionalInfo.protein}g</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="font-medium">Carbs</div>
                  <div>{recipe.nutritionalInfo.carbs}g</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="font-medium">Fat</div>
                  <div>{recipe.nutritionalInfo.fat}g</div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium">Suitable For</h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm text-muted-foreground">Health Conditions:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.suitableFor.healthConditions.map((condition) => (
                      <Badge key={condition} variant="outline" className="bg-accent2-50 text-accent2-800 border-accent2-200">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm text-muted-foreground">Dietary Preferences:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.suitableFor.dietaryPreferences.map((pref) => (
                      <Badge key={pref} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {recipe.suitableFor.religiousRestrictions.length > 0 && (
                  <div>
                    <h4 className="text-sm text-muted-foreground">Religious Considerations:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recipe.suitableFor.religiousRestrictions.map((restriction) => (
                        <Badge key={restriction} variant="outline" className="bg-earth-50 text-earth-800 border-earth-200">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Ingredients</h3>
              <ul className="space-y-2 list-disc pl-6">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Instructions</h3>
            <ol className="space-y-4 list-decimal pl-6">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="pl-1">{step}</li>
              ))}
            </ol>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Save to Favorites</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
