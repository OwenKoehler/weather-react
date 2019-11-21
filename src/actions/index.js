export const daySelect = selection => {
  return {
    type: 'DAY_SELECT',
    payload: selection
  };
};

export const hourSelect = selection => {
  return {
    type: 'HOUR_SELECT',
    payload: selection
  };
};
