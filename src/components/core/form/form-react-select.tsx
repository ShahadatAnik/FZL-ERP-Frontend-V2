import { isArray } from 'lodash';
import {
	ControllerFieldState,
	ControllerRenderProps,
	UseFormStateReturn,
} from 'react-hook-form';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';

export interface IFormSelectOption {
	label: string;
	value: string | number;
}

interface FormReactSelectProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	options: IFormSelectOption[];
	isDisabled?: boolean;
	disableLabel?: boolean;
	isMulti?: boolean;
	menuPortalTarget?: any;
	valueType?: 'string' | 'number';
}

const FormReactSelect: React.FC<FormReactSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
	isDisabled = false,
	disableLabel,
	isMulti = false,
	menuPortalTarget,
	valueType = 'string',
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name.split('_').join(' ')}{' '}
					{optional ? (
						<span className='text-xs'>(Optional)</span>
					) : (
						''
					)}
				</FormLabel>
			)}
			<FormControl>
				<ReactSelect
					isMulti={isMulti}
					options={options}
					isDisabled={isDisabled}
					placeholder={placeholder}
					menuPortalTarget={menuPortalTarget}
					{...field}
					value={
						isMulti
							? isArray(field.value)
								? field.value.map((item: any) => {
										console.log({
											item,
										});
										return options.find(
											(option: IFormSelectOption) =>
												option.value === item
										);
									})
								: []
							: options.filter(
									(item: IFormSelectOption) =>
										item.value === field.value
								)
					}
					onChange={(option: any) => {
						if (option === null) {
							if (isMulti) {
								field.onChange([]);
							} else {
								field.onChange('');
							}
							return;
						}
						if (isMulti) {
							field.onChange(
								option.map((item: any) => item.value)
							);

							return;
						}

						if (valueType === 'number') {
							field.onChange(Number(option.value));
						} else {
							field.onChange(option.value);
						}
					}}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormReactSelect;
