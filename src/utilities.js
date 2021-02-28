export const collectIDsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};
