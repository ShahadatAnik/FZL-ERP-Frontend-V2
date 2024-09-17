import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { PageInfo } from '@/utils';
import { Row } from '@tanstack/react-table';

import { DeleteAllModal, DeleteModal } from '@/components/core/modal';

import { ISectionTableData, sectionColumns } from '../_const/columns';
import { useMaterialSection } from '../_const/query';
import AddOrUpdate from './add-or-update';

const Section = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useMaterialSection<ISectionTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Section', url, 'store__section'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ISectionTableData | null>(
		null
	);
	const handleUpdate = (row: Row<ISectionTableData>) => {
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
	const handleDelete = (row: Row<ISectionTableData>) => {
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
	const handleDeleteAll = (rows: Row<ISectionTableData>[]) => {
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
	const columns = sectionColumns();

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

export default Section;