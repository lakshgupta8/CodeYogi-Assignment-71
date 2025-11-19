import { memo, useCallback } from "react";

function Filter({ query, sort, onSearch, onSort }) {
  const handleSearch = useCallback(
    function (event) {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  const handleSort = useCallback(
    function (event) {
      onSort(event.target.value);
    },
    [onSort]
  );

  return (
    <div className="flex sm:flex-row flex-col sm:justify-between gap-3">
      <input
        value={query}
        type="text"
        placeholder="Search"
        className="bg-gray-100 px-2 py-2 border w-full sm:w-64 md:w-48 text-gray-600 text-xs"
        onChange={handleSearch}
      />
      <select
        value={sort}
        className="bg-gray-100 py-2 border w-full sm:w-64 md:w-48 text-gray-600 text-xs"
        onChange={handleSort}
      >
        <option value="default">Default Sort</option>
        <option value="title">Sort by title</option>
        <option value="price-asc">Sort by price: low to high</option>
        <option value="price-desc">Sort by price: high to low</option>
      </select>
    </div>
  );
}

export default memo(Filter);
