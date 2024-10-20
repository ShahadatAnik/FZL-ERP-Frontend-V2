import { useEffect } from 'react';
import { IResponse } from '@/types';
import { getDateTime } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form';
import { IFormSelectOption } from '@/components/core/form/form-select';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import { useOtherParty } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';

import { IMerchandiserData } from '../_config/columns/columns.type';
import { useOrderMerchandiserByUUID } from '../_config/query';
import {
	IMerchandiser,
	MERCHANDISER_NULL,
	MERCHANDISER_SCHEMA,
} from '../_config/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IMerchandiserData | null;
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IMerchandiserData | null>
	>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AddOrUpdate: React.FC<IAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useOrderMerchandiserByUUID(updatedData?.uuid as string);
	const { data: party } = useOtherParty<IFormSelectOption[]>();

	const form = useRHF(MERCHANDISER_SCHEMA, MERCHANDISER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MERCHANDISER_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IMerchandiser) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Merchandiser' : 'Add Merchandiser'}
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='party_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Party'
						options={party || []}
						{...props}
					/>
				)}
			/>

			<FormField
				control={form.control}
				name='name'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='email'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='phone'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='address'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
