import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import CommercialRoutes from './Commercial';
import { DashboardRoutes } from './Dashboard';
import HrRoutes from './Hr';
import OrderRoutes from './Order';
import StoreRoutes from './Store';
import TemplateRoutes from './Template';
import ThreadRoutes from './Thread';

// import  IssueRoutes  from './Issue';
// import  CommonRoutes  from './Common';
// import  MetalRoutes  from './Metal';
// import  NylonRoutes  from './Nylon';
// import  VislonRoutes  from './Vislon';
// import  SliderRoutes  from './Slider';
// import  LibraryRoutes  from './Library';
// import  DeliveryRoutes  from './Delivery';
// import  LabDipRoutes  from './LabDip';
// import  DyeingAndIronRoutes  from './DyeingAndIron';

const privateRoutes: IRoute[] = [
	...DashboardRoutes,
	...OrderRoutes,
	// ...LabDipRoutes,
	...ThreadRoutes,
	...CommercialRoutes,
	// ...DeliveryRoutes,
	...StoreRoutes,
	// ...CommonRoutes,
	// ...IssueRoutes,
	// ...DyeingAndIronRoutes,
	// ...NylonRoutes,
	// ...VislonRoutes,
	// ...MetalRoutes,
	// ...SliderRoutes,
	...HrRoutes,
	// ...LibraryRoutes,
	...TemplateRoutes,
];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
