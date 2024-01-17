// SharedStateContext.jsx
import { createContext, useContext, useState } from 'react';

const changeEffectContext = createContext();

export const ChangeEffectProvider = ({ children }) => {
    const [changeEffect, setChangeEffect] = useState(null);

  return (
    <changeEffectContext.Provider value={{ changeEffect, setChangeEffect }}>
      {children}
    </changeEffectContext.Provider>
  );
};

export const useChangeEffect = () => useContext(changeEffectContext);
