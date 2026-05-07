import React, { createContext, useContext } from 'react';

const DraftContext = createContext(null);

export const useDraft = () => {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error('useDraft must be used inside DraftContext');
  return ctx;
};

export default DraftContext;
