import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80',
				primary:
					'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
				destructive:
					'border-transparent bg-red-500 text-neutral-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80',
				outline: 'text-neutral-950 dark:text-neutral-50',
				accent: 'border-transparent bg-accent text-accent-foreground hover:bg-accent/80 ',
				gradient:
					'border-transparent bg-gradient-to-r from-accent/50 to-accent/50 font-medium text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
	asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
	const Comp = asChild ? Slot : 'span';

	return <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
