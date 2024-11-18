import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { IDeleteModal } from '@/types';
import { Row } from '@tanstack/react-table';
import useDateRange from '@/hooks/useDateRange';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { merchandiserColumns } from '../_config/columns';
import { IMerchandiserData } from '../_config/columns/type';
import { useOrderMerchandiser } from '../_config/query';

//* Modals
const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Merchandiser = () => {
	const { start_date, end_date, onUpdate, onClear, isClear } = useDateRange();
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useOrderMerchandiser<
		IMerchandiserData[]
	>({ start_date, end_date });

	const pageInfo = useMemo(() => new PageInfo('Merchandiser', url, 'order__merchandiser'), [url]);

	//* Add Modal
	const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	//* Update Modal
	const [updatedData, setUpdatedData] = useState<IMerchandiserData | null>(null);

	const handleUpdate = (row: Row<IMerchandiserData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	//* Delete Modal
	const [deleteItem, setDeleteItem] = useState<IDeleteModal>(null);

	const handleDelete = (row: Row<IMerchandiserData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	//* Columns
	const columns = merchandiserColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				start_date={start_date}
				end_date={end_date}
				onUpdate={onUpdate}
				onClear={onClear}
				isClear={isClear}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Merchandiser;
