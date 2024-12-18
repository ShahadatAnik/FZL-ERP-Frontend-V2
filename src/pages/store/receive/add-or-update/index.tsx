import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePurchaseDescription, usePurchaseDetailsByUUID } from '../../_config/query';
import { IReceive, RECEIVE_NULL, RECEIVE_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams();
	const isUpdate = !!id;

	const { url: purchaseDescriptionUrl, updateData, postData, deleteData } = usePurchaseDescription();

	const { data, invalidateQuery: invalidatePurchaseDetails } = usePurchaseDetailsByUUID(id as string);

	const form = useRHF(RECEIVE_SCHEMA, RECEIVE_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'purchase',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IReceive) {
		/* -------------------------------------------------------------------------- */
		/*                                EDIT PURCHASE                               */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const purchase_description_data = {
				...values,
				updated_at: getDateTime(),
			};

			const purchase_description_promise = await updateData.mutateAsync({
				url: `${purchaseDescriptionUrl}/${id}`,
				updatedData: purchase_description_data,
				isOnCloseNeeded: false,
			});

			const purchase_entries_promise = values.purchase.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						purchase_description_uuid: id,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/purchase/entry',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/purchase/entry/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([purchase_description_promise, ...purchase_entries_promise])
					.then(() => form.reset(RECEIVE_NULL))
					.then(() => {
						invalidatePurchaseDetails();
						// invalidateMaterialInfo();
						// invalidatePurchaseLog();
						navigate(`/store/receive/${id}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		/* -------------------------------------------------------------------------- */
		/*                                ADD PURCHASE                                */
		/* -------------------------------------------------------------------------- */
		const new_purchase_description_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description
		const purchase_description_data = {
			...values,
			uuid: new_purchase_description_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent
		if ('purchase' in purchase_description_data) {
			delete (purchase_description_data as { purchase?: any })['purchase'];
		}

		const purchase_description_promise = await postData.mutateAsync({
			url: purchaseDescriptionUrl,
			newData: purchase_description_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const purchase_entries = [...values.purchase].map((item) => ({
			...item,
			purchase_description_uuid: new_purchase_description_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const purchase_entries_promise = purchase_entries.map((item) =>
			postData.mutateAsync({
				url: '/purchase/entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			await Promise.all([purchase_description_promise, ...purchase_entries_promise])
				.then(() => form.reset(RECEIVE_NULL))
				.then(() => {
					// invalidateMaterialInfo();
					navigate(`/store/receive/${new_purchase_description_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			material_uuid: '',
			remarks: '',
			quantity: 0,
			price: 0,
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].uuid,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('purchase')[index];
		append({
			material_uuid: field.material_uuid,
			remarks: field.remarks,
			quantity: field.quantity,
			price: field.price,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Purchase' : 'Add Purchase'} form={form} onSubmit={onSubmit}>
			<Header />
			<CoreForm.DynamicFields
				viewAs={'default'}
				title='Purchase'
				form={form}
				fieldName='purchase'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/purchase/entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'purchase',
								form.getValues('purchase').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
