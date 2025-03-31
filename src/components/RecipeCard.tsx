
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card 
      className="recipe-card cursor-pointer overflow-hidden border-2 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-secondary text-secondary-foreground">
            {recipe.cuisineType}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold">{recipe.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.suitableFor.dietaryPreferences.slice(0, 2).map((pref) => (
            <Badge key={pref} variant="outline" className="bg-green-50 text-green-800 border-green-200">
              {pref}
            </Badge>
          ))}
          
          {recipe.suitableFor.healthConditions.slice(0, 1).map((condition) => (
            <Badge key={condition} variant="outline" className="bg-accent2-50 text-accent2-800 border-accent2-200">
              {condition}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Prep: {recipe.prepTimeMinutes} min
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.798-2.034c-.784-.57-.381-1.81.587-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1">{recipe.rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
