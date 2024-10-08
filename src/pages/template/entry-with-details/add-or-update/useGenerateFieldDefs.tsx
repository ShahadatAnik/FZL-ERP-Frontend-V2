import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action-button';
import { FieldDef } from '@/components/core/form/form-dynamic-fields';
import { IFormSelectOption } from '@/components/core/form/form-select';

import { ITest3 } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<ITest3>; // TODO: Update Schema Type
}

const useGenerateFieldDefs = ({
	copy,
	remove,
	watch,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const designationOptions: IFormSelectOption[] = [
		{
			label: 'Software Engineer',
			value: 'software_engineer',
		},
		{
			label: 'Project Manager',
			value: 'project_manager',
		},
		{
			label: 'Video Editor',
			value: 'video_editor',
		},
	];

	const departmentOptions: IFormSelectOption[] = [
		{
			label: 'IT',
			value: 'it',
		},
		{
			label: 'HR',
			value: 'hr',
		},
	];

	return [
		{
			header: 'Name',
			accessorKey: 'name',
			type: 'input',
		},
		{
			header: 'Email',
			accessorKey: 'email',
			type: 'input',
		},
		{
			header: 'Phone',
			accessorKey: 'phone',
			type: 'input',
		},
		{
			header: 'Designation',
			accessorKey: 'designation',
			type: 'select',
			placeholder: 'Select Designation',
			options: designationOptions,
		},
		{
			header: 'Department',
			accessorKey: 'department',
			type: 'select',
			placeholder: 'Select Department',
			options: departmentOptions,
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (field: any, index: number) => {
				return (
					<FieldActionButton
						handleCopy={copy}
						handleRemove={remove}
						index={index}
					/>
				);
			},
		},
	];
};

export default useGenerateFieldDefs;
