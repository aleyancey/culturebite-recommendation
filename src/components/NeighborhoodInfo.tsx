
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Neighborhood } from "@/types";

interface NeighborhoodInfoProps {
  neighborhood: Neighborhood | null;
  className?: string;
}

const NeighborhoodInfo = ({ neighborhood, className }: NeighborhoodInfoProps) => {
  if (!neighborhood) return null;

  const getFoodAccessRating = () => {
    const { groceryStores, farmersMarkets, healthFoodStores, foodDesert } = neighborhood.foodAccess;
    if (foodDesert) return "Limited";
    if (groceryStores > 8 || (groceryStores > 5 && farmersMarkets)) return "Excellent";
    if (groceryStores > 4 || (groceryStores > 2 && farmersMarkets)) return "Good";
    return "Moderate";
  };

  const accessColor = {
    "Excellent": "bg-green-100 text-green-800 border-green-200",
    "Good": "bg-blue-100 text-blue-800 border-blue-200",
    "Moderate": "bg-yellow-100 text-yellow-800 border-yellow-200", 
    "Limited": "bg-red-100 text-red-800 border-red-200"
  };

  const accessRating = getFoodAccessRating();

  return (
    <Card className={`shadow-sm border-2 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{neighborhood.name}, {neighborhood.borough}</span>
          <Badge variant="outline" 
            className={accessColor[accessRating as keyof typeof accessColor]}>
            {accessRating} Access
          </Badge>
        </CardTitle>
        <CardDescription>ZIP Code: {neighborhood.zipCode}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium">Food Resources</h3>
            <ul className="mt-1 space-y-1">
              <li className="flex justify-between">
                <span>Grocery Stores:</span>
                <span>{neighborhood.foodAccess.groceryStores}</span>
              </li>
              <li className="flex justify-between">
                <span>Health Food Stores:</span>
                <span>{neighborhood.foodAccess.healthFoodStores}</span>
              </li>
              <li className="flex justify-between">
                <span>Farmers Markets:</span>
                <span>{neighborhood.foodAccess.farmersMarkets ? "Yes" : "No"}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium">Local Health Statistics</h3>
            <ul className="mt-1 space-y-1">
              <li className="flex justify-between">
                <span>Obesity Rate:</span>
                <span>{neighborhood.healthStats.obesityRate}%</span>
              </li>
              <li className="flex justify-between">
                <span>Diabetes Rate:</span>
                <span>{neighborhood.healthStats.diabetesRate}%</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium">Predominant Cultures</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {neighborhood.predominantCultures.map((culture) => (
                <Badge key={culture} variant="outline">{culture}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeighborhoodInfo;
