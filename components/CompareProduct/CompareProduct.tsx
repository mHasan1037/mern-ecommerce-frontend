import { StagedProduct } from "@/types/chat";

interface CompareProductProps {
  first: StagedProduct | null;
  second?: StagedProduct | null;
  loading: boolean;
  onCompareNow: () => void;
  onClear: () => void;
}

const CompareProduct = ({
  first,
  second,
  loading,
  onCompareNow,
  onClear,
}: CompareProductProps) => {
  return (
    <div className="px-3 flex flex-col gap-2 py-2 border-t border-gray-100 bg-gray-50 text-xs">
      <div className={'flex justify-between w-full'}>
        <span className="text-gray-500">Comparing:</span>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cancel comparison"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-1 truncate">
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
            onClick={onCompareNow}
            disabled={loading}
            className="rounded-full bg-green-600 text-white px-3 py-1 disabled:opacity-50"
          >
            Compare
          </button>
        )}
      </div>
    </div>
  );
};

export default CompareProduct;
