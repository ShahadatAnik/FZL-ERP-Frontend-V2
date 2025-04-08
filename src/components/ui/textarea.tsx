import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.ComponentProps<'textarea'> {}

function Textarea({ className, ...props }: TextareaProps) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				'bg-gradient border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring disabled:border-destructive/30 disabled:from-destructive/5 disabled:to-destructive/5 disabled:text-destructive flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
