import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

export type ITableListItems = { label: string; value: string }[];

interface ITableListProps {
	items: ITableListItems;
	title?: string;
	className?: string;
}

const TableList = ({ items, title, className }: ITableListProps) => {
	return (
		<div className={cn('h-full', className)}>
			{title && (
				<h4 className='bg-base-200 px-3 py-2 text-lg font-medium capitalize leading-tight text-primary'>
					{title}
				</h4>
			)}
			<div className='overflow-x-auto'>
				<Table>
					<TableBody>
						{items.map((item) => (
							<TableRow
								key={item.label}
								className='h-10 cursor-pointer border-b last:border-b-0 even:bg-base-150'>
								<TableCell className='font-semibold'>
									{item.label}
								</TableCell>
								<TableCell>{item.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TableList;
