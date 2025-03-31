
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfile } from "@/types";

interface ProfileModalProps {
  userProfile: UserProfile | null;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

const ProfileModal = ({ userProfile, onClose, onSave }: ProfileModalProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: userProfile?.id || `user-${Date.now()}`,
    name: userProfile?.name || "",
    age: userProfile?.age || 30,
    gender: userProfile?.gender || "prefer-not-to-say",
    healthConditions: userProfile?.healthConditions || [],
    dietaryPreferences: userProfile?.dietaryPreferences || [],
    religiousRestrictions: userProfile?.religiousRestrictions || [],
    zipCode: userProfile?.zipCode || "",
    favoriteRecipes: userProfile?.favoriteRecipes || [],
  });

  const healthConditions = [
    "diabetes", 
    "high blood pressure", 
    "heart disease",
    "obesity",
    "high cholesterol",
    "digestive issues"
  ];

  const dietaryPreferences = [
    "vegetarian",
    "vegan",
    "gluten-free",
    "low-carb",
    "low-fat",
    "low-sodium",
    "high-protein",
    "high-fiber",
  ];

  const religiousRestrictions = [
    "kosher",
    "halal",
    "hindu",
    "buddhist",
    "jain",
  ];

  const handleCheckboxChange = (category: "healthConditions" | "dietaryPreferences" | "religiousRestrictions", value: string) => {
    setProfile(prev => {
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

  const handleSubmit = () => {
    onSave(profile);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">Age</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">Gender</Label>
            <Select 
              value={profile.gender} 
              onValueChange={(value: "male" | "female" | "non-binary" | "prefer-not-to-say") => 
                setProfile({...profile, gender: value})
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipCode" className="text-right">ZIP Code</Label>
            <Input
              id="zipCode"
              value={profile.zipCode}
              onChange={(e) => setProfile({...profile, zipCode: e.target.value})}
              className="col-span-3"
              placeholder="NYC ZIP Code (e.g., 10001)"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right pt-2">Health Conditions</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {healthConditions.map((condition) => (
                <div key={condition} className="flex items-center gap-2">
                  <Checkbox 
                    id={`health-${condition}`}
                    checked={profile.healthConditions.includes(condition)}
                    onCheckedChange={() => handleCheckboxChange("healthConditions", condition)}
                  />
                  <Label htmlFor={`health-${condition}`}>{condition.charAt(0).toUpperCase() + condition.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right pt-2">Dietary Preferences</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {dietaryPreferences.map((pref) => (
                <div key={pref} className="flex items-center gap-2">
                  <Checkbox 
                    id={`diet-${pref}`}
                    checked={profile.dietaryPreferences.includes(pref)}
                    onCheckedChange={() => handleCheckboxChange("dietaryPreferences", pref)}
                  />
                  <Label htmlFor={`diet-${pref}`}>{pref.charAt(0).toUpperCase() + pref.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right pt-2">Religious Restrictions</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {religiousRestrictions.map((restriction) => (
                <div key={restriction} className="flex items-center gap-2">
                  <Checkbox 
                    id={`religion-${restriction}`}
                    checked={profile.religiousRestrictions.includes(restriction)}
                    onCheckedChange={() => handleCheckboxChange("religiousRestrictions", restriction)}
                  />
                  <Label htmlFor={`religion-${restriction}`}>{restriction.charAt(0).toUpperCase() + restriction.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
