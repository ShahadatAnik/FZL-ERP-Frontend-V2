import { lazy } from 'react';
import { IRoute } from '@/types';

const Merchandiser = lazy(() => import('@/pages/order/merchandiser'));

const OrderRoutes: IRoute[] = [
	{
		name: 'Order',
		children: [
			{
				name: 'Merchandiser',
				path: '/order/merchandiser',
				element: <Merchandiser />,
				page_name: 'order__merchandiser',
				actions: ['create', 'read', 'update', 'delete'],
				page_type: {
					type: 'library',
					name: 'lib',
				},
			},
		],
	},
];
export default OrderRoutes;
