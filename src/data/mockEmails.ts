import { Email } from '../types/email';

// Generate random date within a range
const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generate a list of 100 mock emails
const generateMockEmails = (): Email[] => {
  const senders = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Olivia Davis', 
    'William Wilson', 'Sophia Miller', 'James Moore', 'Charlotte Taylor',
    'Benjamin Anderson', 'Mia Thomas', 'Tech Newsletter', 'Your Bank',
    'Social Media', 'Job Board', 'Travel Deals'
  ];

  const subjects = [
    'Meeting reminder', 'Project update', 'Weekly newsletter', 'Your account statement',
    'New feature announcement', 'Invitation to event', 'Feedback request', 'Order confirmation',
    'Payment received', 'Security alert', 'Subscription renewal', 'Job opportunity',
    'Holiday promotion', 'Survey request', 'Policy update', 'Webinar invitation'
  ];

  const previewTexts = [
    'Just wanted to follow up on our discussion about...',
    'Here are the latest updates on the project we discussed...',
    'Check out our latest news and updates for this month...',
    'Your monthly statement is now available. Here\'s a summary...',
    'We\'re excited to announce a new feature that will help you...',
    'You\'re invited to our upcoming event. Details inside...',
    'We value your opinion. Please take a moment to provide feedback...',
    'Thank you for your order. Here are the details of your purchase...'
  ];

  const tags = ['Work', 'Personal', 'Social', 'Finance', 'Shopping', 'Travel', 'Updates'];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  return Array.from({ length: 100 }, (_, i) => ({
    id: `email-${i + 1}`,
    title: `${subjects[Math.floor(Math.random() * subjects.length)]} ${i + 1}`,
    date: randomDate(startDate, endDate),
    isFavorite: Math.random() > 0.8,
    sender: senders[Math.floor(Math.random() * senders.length)],
    preview: previewTexts[Math.floor(Math.random() * previewTexts.length)],
    read: Math.random() > 0.3,
    tags: Math.random() > 0.5 ? [tags[Math.floor(Math.random() * tags.length)]] : undefined
  }));
};

export const mockEmails = generateMockEmails();