import React from 'react';
import { Star, StarOff } from 'lucide-react';
import { Email } from '../types/email';

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  isSelected,
  onSelect,
  onToggleFavorite
}) => {
  const formattedDate = new Date(email.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: new Date(email.date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(email.id);
  };

  return (
    <div 
      className={`
        flex items-center p-3 border-b transition-colors duration-150 cursor-pointer
        ${!email.read ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}
        ${isSelected ? 'bg-blue-100 hover:bg-blue-100' : ''}
      `}
      onClick={() => onSelect(email.id)}
    >
      <div className="flex items-center mr-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(email.id)}
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <div 
        className="mr-3 text-amber-500 cursor-pointer"
        onClick={handleFavoriteClick}
      >
        {email.isFavorite ? (
          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
        ) : (
          <StarOff className="h-5 w-5 text-gray-400" />
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-baseline justify-between">
          <span className={`text-sm font-medium truncate ${!email.read ? 'font-semibold' : ''}`}>
            {email.sender}
          </span>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {formattedDate}
          </span>
        </div>
        
        <div className="text-sm font-medium truncate">
          {email.title}
        </div>
        
        <div className="text-xs text-gray-600 truncate">
          {email.preview}
        </div>
        
        {email.tags && email.tags.length > 0 && (
          <div className="mt-1 flex gap-1">
            {email.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailItem;