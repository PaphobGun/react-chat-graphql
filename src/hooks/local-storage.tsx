import React from 'react'

function useLocalStorageState(key: string, defaultValue = '') {
  const [state, setState] = React.useState<string>(
    () => window.localStorage.getItem(key) || defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state, key])

  return [state, setState] as [string, (text: string) => void];
}

export { useLocalStorageState }
