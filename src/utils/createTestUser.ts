
import { v4 as uuidv4 } from 'uuid';

export const createTestUser = (): boolean => {
  // Check if test user already exists
  const existingUsers = localStorage.getItem('users');
  let users = [];
  
  if (existingUsers) {
    try {
      users = JSON.parse(existingUsers);
      // If test user already exists, don't recreate
      if (users.some((user: any) => user.email === 'test@example.com')) {
        return false;
      }
    } catch (error) {
      console.error("Error parsing existing users:", error);
      return false;
    }
  }

  // Create test user
  const testUser = {
    id: uuidv4(),
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123', // In a real app, this would be hashed
    company: 'Test Company',
    country: 'IN',
    defaultCurrency: 'INR',
    settings: {
      country: 'IN',
      defaultCurrency: 'INR',
      dateFormat: 'MMM d, yyyy'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Add to users array
  users.push(testUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  console.log('Test user created successfully');
  return true;
};
