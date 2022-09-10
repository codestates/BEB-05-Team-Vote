export const UseReloadSession = () => {
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
};
