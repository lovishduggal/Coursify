function useDebounce(e, cb, delay = 3000) {
  let id;
  clearTimeout(id);
  id = setTimeout(() => {
    cb(e.target.value);
  }, delay);
}
export default useDebounce;
