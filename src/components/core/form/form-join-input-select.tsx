import {
	ControllerFieldState,
	ControllerRenderProps,
	useFormContext,
	UseFormStateReturn,
} from 'react-hook-form';

import { buttonVariants } from '@/components/ui/button';
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import { IFormSelectOption } from './form-select';

interface FormJoinInputSelectProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	selectField: {
		name: string;
		options: IFormSelectOption[];
		isDisabled?: boolean;
	};
}

const FormJoinInputSelect: React.FC<FormJoinInputSelectProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	type,
	className = 'border-0 w-8 bg-transparent',
	icon,
	selectField,
}) => {
	const { register, getValues, setValue } = useFormContext();

	return (
		<FormItem className='space-y-1.5'>
			<FormLabel className='flex items-center justify-between capitalize'>
				<span>
					{label || field.name.replace('_', ' ')}{' '}
					{optional ? (
						<span className='text-xs'>(Optional)</span>
					) : (
						''
					)}
				</span>
				{subLabel && <span className='text-xs'>{subLabel}</span>}
			</FormLabel>
			<div className='flex h-10 items-center overflow-hidden rounded-md border border-input bg-gradient-to-r from-base to-base-150 p-0.5'>
				<FormControl className='h-8 flex-1'>
					{type === 'password' ? (
						<PasswordInput
							className={cn(className)}
							placeholder={placeholder}
							icon={icon}
							{...field}
						/>
					) : type === 'number' ? (
						<Input
							className={cn(className)}
							placeholder={placeholder}
							icon={icon}
							{...field}
							onBlur={(e) => {
								field.onChange(+e.target.value);
							}}
						/>
					) : (
						<Input
							className={cn(className)}
							placeholder={placeholder}
							type={type}
							icon={icon}
							{...field}
						/>
					)}
				</FormControl>

				<Select
					onValueChange={(value) => {
						setValue(selectField.name, value, {
							shouldDirty: true,
						});
					}}
					defaultValue={getValues(selectField.name)}
					disabled={selectField?.isDisabled}
					{...register(selectField.name)}>
					<FormControl>
						<SelectTrigger
							className={buttonVariants({
								variant: 'accent',
								className:
									'h-8 max-w-[100px] justify-between truncate rounded bg-gradient-to-r from-accent to-accent capitalize',
							})}>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{selectField?.options?.map((option) => (
							<SelectItem
								className='capitalize'
								key={option.value}
								value={option.value.toString()}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<FormMessage />
		</FormItem>
	);
};

export default FormJoinInputSelect;
