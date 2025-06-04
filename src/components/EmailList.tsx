import React from 'react';
import EmailItem from './EmailItem';
import { Email } from '../types/email';

interface EmailListProps {
  emails: Email[];
  selectedIds: Set<string>;
  onSelectEmail: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedIds,
  onSelectEmail,
  onToggleFavorite
}) => {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg
          className="w-16 h-16 mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">No emails found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 bg-white rounded-md shadow">
      {emails.map(email => (
        <EmailItem
          key={email.id}
          email={email}
          isSelected={selectedIds.has(email.id)}
          onSelect={onSelectEmail}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default EmailList;