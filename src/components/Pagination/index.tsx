export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

const ITEMS_PER_PAGE = 10;

function Pagination({
  currentPage,
  totalItems,
  onPageChange,
  className = '',
  siblingCount = 1,
}: PaginationProps) {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const startPage = Math.max(1, currentPage - siblingCount);
  const endPage = Math.min(totalPages, currentPage + siblingCount);
  const pages = range(startPage, endPage);

  const showStartEllipsis = startPage > 2;
  const showEndEllipsis = endPage < totalPages - 1;

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 cursor-pointer rounded-md border border-[#636363] bg-[#0d0d0d] text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#636363] hover:text-white"
        aria-label="Previous page"
      >
        Prev
      </button>

      {showStartEllipsis && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="px-3 py-2 cursor-pointer rounded-md border border-[#636363] bg-[#0d0d0d] text-gray-200 hover:bg-[#636363] hover:text-white"
          >
            1
          </button>
          <span className="px-2 text-gray-400">…</span>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 cursor-pointer rounded-md border border-[#636363] min-w-[2.5rem] ${
            page === currentPage
              ? 'border-gray-500 bg-[#636363] text-white'
              : 'border-[#636363] bg-[#0d0d0d] text-gray-200 hover:bg-[#636363] hover:text-white'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {showEndEllipsis && (
        <>
          <span className="px-2 text-gray-400">…</span>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 cursor-pointer rounded-md border border-[#636363] bg-[#0d0d0d] text-gray-200 hover:bg-[#636363] hover:text-white"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 cursor-pointer rounded-md border border-[#636363] bg-[#0d0d0d] text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#636363] hover:text-white"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
