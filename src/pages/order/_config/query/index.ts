import { IStartEndDateProps } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import { formatQueryDates } from '@/utils/formatDate';
import addUrlParams from '@/utils/routes/addUrlParams';

import QK from './queryKeys';

// * Details * //
export const useOrderDetails = <T>() =>
	useTQuery<T>({
		queryKey: QK.details(),
		url: '/zipper/order/details',
	});

export const useOrderDetailsByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: QK.detailsByQuery(query),
		url: `/zipper/order/details${query}`,
		enabled: !!query,
	});

export const useOrderDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.detailsByUUID(uuid),
		url: `/zipper/order-detail/${uuid}`,
		enabled: !!uuid,
	});

export const useOrderDetailsByOrderNumber = <T>(orderNumber: string) =>
	useTQuery<T>({
		queryKey: QK.detailsByOrderNumber(orderNumber),
		url: `/zipper/order/details/single-order/by/${orderNumber}`,
		enabled: !!orderNumber,
	});

// * Description * //
export const useOrderDescription = <T>() =>
	useTQuery<T>({
		queryKey: QK.description(),
		url: '/zipper/order-description',
	});

export const useOrderDescriptionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.descriptionByUUID(uuid),
		url: `/zipper/order-description/${uuid}`,
		enabled: !!uuid,
	});

// * Entry * //
export const useOrderEntries = <T>() =>
	useTQuery<T>({
		queryKey: QK.entry(),
		url: '/zipper/order-entry',
	});

export const useOrderEntriesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.entryByUUID(uuid),
		url: `/zipper/order-entry/${uuid}`,
		enabled: !!uuid,
	});

// * Buyer * //
export const useOrderBuyer = <T>() =>
	useTQuery<T>({
		queryKey: QK.buyer(),
		url: '/public/buyer',
	});

export const useOrderBuyerByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.buyerByUUID(uuid),
		url: `/public/buyer/${uuid}`,
		enabled: !!uuid,
	});

//*Party */
export const useOrderParty = <T>() =>
	useTQuery<T>({
		queryKey: QK.party(),
		url: '/public/party',
	});
export const useOrderPartyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.partyByUUID(uuid),
		url: `/public/party/${uuid}`,
		enabled: !!uuid,
	});

// * Marketing * //
export const useOrderMarketing = <T>() =>
	useTQuery<T>({
		queryKey: QK.marketing(),
		url: '/public/marketing',
	});

export const useOrderMarketingByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.marketingByUUID(uuid),
		url: `/public/marketing/${uuid}`,
		enabled: !!uuid,
	});

// * Factory * //
export const useOrderFactory = <T>() =>
	useTQuery<T>({
		queryKey: QK.factory(),
		url: '/public/factory',
	});

export const useOrderFactoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.factoryByUUID(uuid),
		url: `/public/factory/${uuid}`,
		enabled: !!uuid,
	});

// * Merchandiser * //
// export const useOrderMerchandiser = <T>() => {
// 	const { limit, page } = useQueryParams();
// 	return useTQuery<T>({
// 		queryKey: QK.merchandiserPagination({ limit, page }),
// 		url: addUrlParams('/public/merchandiser', { limit, page }),
// 	});
// };
// type IStartEndDateProps = {
// 	start_date: Date | undefined;
// 	end_date: Date | undefined;
// };

// const formatDates = ({ start_date, end_date }: IStartEndDateProps) => ({
// 	start_date: start_date ? (format(start_date, 'yyyy-MM-dd') as string) : undefined,
// 	end_date: end_date ? (format(end_date, 'yyyy-MM-dd') as string) : undefined,
// });

export const useOrderMerchandiser = <T>({ start_date, end_date }: IStartEndDateProps) => {
	return useTQuery<T>({
		queryKey: QK.merchandiser(formatQueryDates({ start_date, end_date })),
		url: addUrlParams(`/public/merchandiser`, formatQueryDates({ start_date, end_date })),
	});
};

export const useOrderMerchandiserByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.merchandiserByUUID(uuid),
		url: `/public/merchandiser/${uuid}`,
		enabled: !!uuid,
	});

// * Properties * //
export const useOrderProperties = <T>() =>
	useTQuery<T>({
		queryKey: QK.properties(),
		url: '/public/properties',
	});
export const useOrderPropertiesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.propertiesByUUID(uuid),
		url: `/public/properties/${uuid}`,
		enabled: !!uuid,
	});

// * Info * //
export const useOrderInfo = <T>() =>
	useTQuery<T>({
		queryKey: QK.info(),
		url: '/zipper/order-info',
	});

export const useOrderInfoByUUID = <T>(uuid: string) => {
	useTQuery<T>({
		queryKey: QK.infoByUUID(uuid),
		url: `/zipper/order-info/${uuid}`,
		enabled: !!uuid,
	});
};
