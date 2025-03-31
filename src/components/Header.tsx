
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/types';
import ProfileModal from './ProfileModal';

interface HeaderProps {
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
}

const Header = ({ userProfile, onUpdateProfile }: HeaderProps) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
        <h1 className="text-2xl font-bold">CultureBite</h1>
      </div>

      <div className="flex items-center gap-4">
        {userProfile ? (
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-100"
            onClick={() => setShowProfileModal(true)}
          >
            {userProfile.name} • Edit Profile
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-100"
            onClick={() => setShowProfileModal(true)}
          >
            Create Profile
          </Button>
        )}
      </div>

      {showProfileModal && (
        <ProfileModal 
          userProfile={userProfile}
          onClose={() => setShowProfileModal(false)} 
          onSave={onUpdateProfile} 
        />
      )}
    </header>
  );
};

export default Header;
