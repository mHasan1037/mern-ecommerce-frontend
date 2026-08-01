import React from "react";

const index = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-gray-100 bg-gray-50 text-xs">
      <div className="flex items-center gap-1 truncate">
        <span className="text-gray-500">Comparing:</span>
        <span className="font-medium truncate">{first!.name}</span>
        {second ? (
          <>
            <span className="text-gray-400">vs</span>
            <span className="font-medium truncate">{second.name}</span>
          </>
        ) : (
          <span className="text-gray-400 italic">— pick another product</span>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {second && (
          <button
            onClick={handleCompareNow}
            disabled={loading}
            className="rounded-full bg-green-600 text-white px-3 py-1 disabled:opacity-50"
          >
            Compare
          </button>
        )}
        <button
          onClick={() => dispatch(clearComparisonStaging())}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cancel comparison"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default index;
