// Test mock for the pagefind runtime — pagefind is a build-time artifact
// that doesn't exist in dev/test. The dynamic import in SearchOverlay.tsx
// would fail; this stub returns an empty search API instead.
const pagefindMock = {
  search: async () => ({ results: [] }),
  options: () => undefined,
};
export default pagefindMock;
