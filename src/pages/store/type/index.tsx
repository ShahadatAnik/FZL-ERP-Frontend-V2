import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { PageInfo } from '@/utils';
import { Row } from '@tanstack/react-table';

import { DeleteAllModal, DeleteModal } from '@/components/core/modal';

import { ITypeTableData, typeColumns } from '../_const/columns';
import { useMaterialType } from '../_const/query';
import AddOrUpdate from './add-or-update';

const TestType1 = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useMaterialType<ITypeTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Type', url, 'store__type'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ITypeTableData | null>(null);
	const handleUpdate = (row: Row<ITypeTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<ITypeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<
		{ id: string; name: string; checked: boolean }[] | null
	>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<ITypeTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.name,
				checked: true,
			}))
		);
	};

	// Table Columns
	const columns = typeColumns();

	return (
		<PageProvider
			pageName={pageInfo.getTab()}
			pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}>
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
				/>

				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url,
						deleteData,
					}}
				/>

				<DeleteAllModal
					{...{ deleteItems, setDeleteItems, url, deleteData }}
				/>
			</TableProvider>
		</PageProvider>
	);
};

export default TestType1;