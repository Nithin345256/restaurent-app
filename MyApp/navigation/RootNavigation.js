import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function resetToLogin() {  
  const resetAction = () => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      setTimeout(resetAction, 100); // Retry after a short delay
    }
  };
  resetAction();
}

export default navigationRef;
