// SharedStateContext.jsx
import { createContext, useContext, useState } from 'react';

const changeEffectContext = createContext();

export const ChangeEffectProvider = ({ children }) => {
    const [changeEffect, setChangeEffect] = useState(null);
    const [peer, setPeer] = useState({});
    const [selectPeer, setSelectPeer] = useState();


  return (
    <changeEffectContext.Provider value={{
       changeEffect,
        setChangeEffect,
        peer,
        setPeer,
        selectPeer,
        setSelectPeer
        }}>
          
      {children}
    </changeEffectContext.Provider>
  );
};

export const useChangeEffect = () => useContext(changeEffectContext);
