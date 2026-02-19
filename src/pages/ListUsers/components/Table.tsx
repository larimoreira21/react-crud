import {
  CircleUserRound,
  Briefcase,
  MoreVertical,
  TrashIcon,
} from 'lucide-react';

import Loading from '../../../components/ui/Loading';

interface TableProps {
  isLoading: boolean;
  items: any[];
  navigate: (path: string) => void;
  setOpenMenuId: (id: number | null) => void;
  openMenuId: number | null;
  setSelectedId: (id: number | null) => void;
}

function getDisplayName(item: Record<string, unknown>): string {
  const first = item.firstName ?? item.firstname;
  const last = item.lastName ?? item.lastname;
  if (first != null || last != null) {
    const full = [first, last].filter(Boolean).join(' ').trim();
    if (full) return full;
  }
  if (item.name && typeof item.name === 'string') return item.name;
  return '—';
}

function getDisplayCountry(item: Record<string, unknown>): string {
  if (item.country && typeof item.country === 'string') return item.country;
  const addr = item.address as Record<string, unknown> | undefined;
  if (addr?.country && typeof addr.country === 'string') return addr.country;
  return '—';
}

function Table({
  isLoading,
  items,
  navigate,
  setOpenMenuId,
  openMenuId,
  setSelectedId,
}: TableProps) {
  return (
    <table className="w-full border-collapse border border-[#4d4d4d] bg-[#0d0d0d]">
      <thead>
        <tr className="bg-[#1a1a1a] border-b border-[#4d4d4d]">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Contact</th>
          <th className="p-3 text-left">Job area</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td
              colSpan={7}
              className="text-center h-[calc(90vh-300px)] align-middle"
            >
              <div className="flex items-center justify-center min-h-[200px]">
                <Loading />
              </div>
            </td>
          </tr>
        )}

        {!isLoading && items.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center">
              <p>No items found</p>
            </td>
          </tr>
        )}

        {!isLoading &&
          items.length > 0 &&
          items.map((item: any) => (
            <tr
              key={item.id}
              className="border-b border-[#4d4d4d] hover:bg-[#1a1a1a] cursor-pointer"
              onClick={() => navigate(item.id)}
            >
              <td className="p-3">
                {item.avatar ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={getDisplayName(item)}
                      className="w-8 h-8 rounded-full"
                    />

                    <div className="flex flex-col items-start">
                      <p className="text-sm font-medium">
                        {getDisplayName(item)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {getDisplayCountry(item)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CircleUserRound className="w-8 h-8 shrink-0 rounded-full text-gray-400" />
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-medium">
                        {getDisplayName(item)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {getDisplayCountry(item)}
                      </p>
                    </div>
                  </div>
                )}
              </td>
              <td className="p-3">
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">{item.email}</p>
                  <p className="text-sm text-gray-400">{item.phone}</p>
                </div>
              </td>
              <td className="p-3 text-left">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full text-gray-300 border border-gray-600`}
                  style={{ backgroundColor: item.color }}
                >
                  <Briefcase
                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                    aria-hidden
                  />
                  {item.jobArea || '—'}
                </span>
              </td>
              <td
                className="p-3 text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative inline-block">
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#636363] cursor-pointer outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.currentTarget.blur();
                      setOpenMenuId(openMenuId === item.id ? null : item.id);
                    }}
                    aria-expanded={openMenuId === item.id}
                    aria-haspopup="true"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openMenuId === item.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        aria-hidden
                        onClick={() => setOpenMenuId(null)}
                      />
                      <div
                        className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-md border border-gray-600 bg-gray-800 py-1 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                          onClick={() => {
                            setSelectedId(item.id);
                            setOpenMenuId(null);
                          }}
                        >
                          <TrashIcon className="w-4 h-4 shrink-0" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
