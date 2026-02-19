import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, Search } from 'lucide-react';

import Table from './components/Table';
import Button from '../../components/ui/Button';
import Pagination from '../../components/Pagination';
import ConfirmationModal from '../../components/ConfirmationModal';

import { useUser } from '../../hooks/useUser';

function ListUsers() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const debouncedSetSearchTerm = useCallback(
    (value: string) => {
      debounce((value: string) => setDebouncedSearchTerm(value), 500)(value);
    },
    [debouncedSearchTerm]
  );

  const handleSearchTermChange = useCallback(
    (value: string) => {
      debouncedSetSearchTerm(value);
      setLocalSearchTerm(value);
    },
    [debouncedSetSearchTerm]
  );

  const { items, totalItems, isLoading, handleDeleteUser } = useUser({
    page: currentPage,
    search: debouncedSearchTerm,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onConfirmDelete = () => {
    if (selectedId == null) return;
    handleDeleteUser(String(selectedId));
    setSelectedId(null);
  };

  const handleNavigateToUserDetails = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] justify-center items-center text-center bg-black pt-4">
        <div className="flex items-center justify-between mx-8 mb-2 p-4 border rounded-md border-gray-600">
          <div className="flex flex-col justify-start text-left ">
            <p className="text-3xl font-medium">Users</p>
            <p className="text-sm text-gray-400">
              Manage your users information
            </p>
          </div>

          <Button
            variant="default"
            className="px-4 py-2"
            onClick={() => navigate('/user/create')}
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Add user
          </Button>
        </div>

        <div className="py-4 px-8 bg-black">
          <div className="flex justify-end gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search users..."
                value={localSearchTerm}
                onChange={(e) => handleSearchTermChange(e.target.value)}
                className="w-64 pl-9 pr-4 py-2 rounded-md bg-[#1a1a1a] border border-[#4d4d4d] text-white placeholder-gray-500 focus:outline-none focus:border-[#636363]"
                aria-label="Search users"
              />
            </div>
          </div>

          <Table
            isLoading={isLoading}
            items={items ?? []}
            navigate={handleNavigateToUserDetails}
            setOpenMenuId={setOpenMenuId}
            openMenuId={openMenuId}
            setSelectedId={setSelectedId}
          />

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems ?? 0}
            onPageChange={handlePageChange}
            className="mt-4"
          />

          <ConfirmationModal
            open={selectedId !== null}
            title="Delete item"
            description="Are you sure you want to delete this item? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            variant="danger"
            onCancel={() => setSelectedId(null)}
            onConfirm={onConfirmDelete}
          />
        </div>
      </div>
    </>
  );
}

export default ListUsers;
