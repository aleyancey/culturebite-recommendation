
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface RecipeFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  cuisineTypes: string[];
  dietaryPreferences: string[];
  healthConditions: string[];
  maxPrepTime: number | null;
}

const cuisineOptions = [
  "Caribbean", 
  "Jewish", 
  "Soul Food", 
  "Chinese", 
  "Mexican", 
  "Italian", 
  "Middle Eastern"
];

const dietaryOptions = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "low-carb",
  "low-sodium"
];

const healthConditionOptions = [
  "diabetes", 
  "high blood pressure", 
  "heart disease",
  "obesity"
];

const RecipeFilters = ({ onFilterChange }: RecipeFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    cuisineTypes: [],
    dietaryPreferences: [],
    healthConditions: [],
    maxPrepTime: null,
  });
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const handleCheckboxChange = (category: keyof Omit<Filters, 'maxPrepTime'>, value: string) => {
    setFilters(prev => {
      const array = [...prev[category]];
      if (array.includes(value)) {
        return {
          ...prev,
          [category]: array.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...array, value]
        };
      }
    });
  };
  
  const handleClearFilters = () => {
    setFilters({
      cuisineTypes: [],
      dietaryPreferences: [],
      healthConditions: [],
      maxPrepTime: null,
    });
    onFilterChange({
      cuisineTypes: [],
      dietaryPreferences: [],
      healthConditions: [],
      maxPrepTime: null,
    });
    setFiltersOpen(false);
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setFiltersOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(filters.cuisineTypes.length > 0 || filters.dietaryPreferences.length > 0 || filters.healthConditions.length > 0) && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.cuisineTypes.length + filters.dietaryPreferences.length + filters.healthConditions.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Cuisine Types</h3>
              <div className="grid grid-cols-2 gap-2">
                {cuisineOptions.map(cuisine => (
                  <div key={cuisine} className="flex items-center gap-2">
                    <Checkbox 
                      id={`cuisine-${cuisine}`}
                      checked={filters.cuisineTypes.includes(cuisine)}
                      onCheckedChange={() => handleCheckboxChange("cuisineTypes", cuisine)}
                    />
                    <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Dietary Preferences</h3>
              <div className="grid grid-cols-2 gap-2">
                {dietaryOptions.map(diet => (
                  <div key={diet} className="flex items-center gap-2">
                    <Checkbox 
                      id={`diet-${diet}`}
                      checked={filters.dietaryPreferences.includes(diet)}
                      onCheckedChange={() => handleCheckboxChange("dietaryPreferences", diet)}
                    />
                    <Label htmlFor={`diet-${diet}`}>{diet}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Health Conditions</h3>
              <div className="grid grid-cols-2 gap-2">
                {healthConditionOptions.map(condition => (
                  <div key={condition} className="flex items-center gap-2">
                    <Checkbox 
                      id={`health-${condition}`}
                      checked={filters.healthConditions.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange("healthConditions", condition)}
                    />
                    <Label htmlFor={`health-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="ghost" onClick={handleClearFilters}>Clear Filters</Button>
              <Button onClick={handleApplyFilters}>Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RecipeFilters;
