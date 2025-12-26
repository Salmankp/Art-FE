import { createContext } from 'react';

interface ContextData {
  userId: () => any;
  worldId: () => any;
}

export const ContextIDS = createContext<ContextData | null>(null);
