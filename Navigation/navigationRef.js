// src/navigation/navigationRef.js
import { createRef } from 'react';

export const navigationRef = createRef();

export function navigate(name, params) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.navigate(name, params);
  } else {
    console.warn('Navigator not ready yet');
  }
}