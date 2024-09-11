import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarFile from './sidebar-file';
import useSidebar from '@/contexts/sidebar/useSidebar';
import { cn } from '@/lib/utils';
import { confirmRouteMatch } from '@/utils';

// Animation definitions for the sidebar folder
const variants = {
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	initial: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

// Animation definitions for the folder's children
const childVariants = {
	open: {
		y: 0,
		opacity: 1,
		height: 'auto',
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 10,
		opacity: 0,
		height: 0 + 'px',
		overflow: 'hidden',
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

interface ISidebarFolderProps {
	path: string;
	name: string;
	children: any;
	disableCollapse?: boolean;
}

const SidebarFolder: React.FC<ISidebarFolderProps> = (props) => {
	// Destructure props
	const { path, name, children, disableCollapse } = props;

	// Use navigation and sidebar context
	const navigate = useNavigate();
	const {
		path: { pathname },
		isCloseAll,
		setIsCloseAll,
	} = useSidebar();

	// State for folder openness
	const [isOpen, setIsOpen] = useState(false);

	// Check if the current route matches the folder's path
	const routeMatch = useMemo(
		() => confirmRouteMatch(props, pathname),
		[props, pathname]
	);

	// Update folder state based on route match and close-all state
	useEffect(() => {
		if (routeMatch === true && !isCloseAll) {
			setIsOpen(true);
		}

		if (isCloseAll) {
			setIsOpen(false);
		}
	}, [path, isCloseAll, routeMatch]);

	// If the folder is disabled from collapsing, render the file component
	if (disableCollapse) {
		return <SidebarFile path={path} name={name} />;
	}

	// Determine the folder's class based on its state
	const folderClassName = cn(
		'text-primary-content group relative z-10 flex w-full items-center justify-between gap-2 rounded-none rounded-r-md border-l-[3px] px-4 py-2 text-sm',
		isOpen && !isCloseAll
			? 'text-primary-content border-secondary bg-gradient-to-r from-accent/10 to-accent/30'
			: 'text-primary-content/70 hover:text-primary-content border-transparent hover:bg-secondary/20'
	);

	// Handle folder click
	const handleClick = () => {
		setIsOpen((prev) => !prev);
		setIsCloseAll(false);
	};

	return (
		<motion.ul
			variants={variants}
			initial='initial'
			animate='animate'
			className={''}>
			{/* Render the folder link if it has a path */}
			{path && (
				<Link
					key={name}
					onClick={handleClick}
					className={folderClassName}
					to={path}>
					<span className='truncate'>{name}</span>
					<ChevronRight
						className={cn(
							'size-5 transform duration-300 ease-in-out group-hover:scale-110',
							isOpen && !isCloseAll && 'rotate-90'
						)}
					/>
				</Link>
			)}

			{/* Render a button if the folder doesn't have a path */}
			{!path && (
				<motion.button
					whileTap={{ scale: 0.95 }}
					key={name}
					onClick={() => {
						if (!isOpen && children[0]?.path) {
							navigate(children[0].path);
						}
						handleClick();
					}}
					className={folderClassName}>
					<span className='truncate'>{name}</span>
					<ChevronRight
						className={cn(
							'size-5 transform duration-300 ease-in-out group-hover:scale-110',
							isOpen && !isCloseAll && 'rotate-90'
						)}
					/>
				</motion.button>
			)}

			{/* Render children if the folder is open */}
			<motion.ul
				variants={childVariants}
				animate={isOpen ? 'open' : 'closed'}
				className='space-y-1 border-l-[1px] border-secondary/40 pl-3 pt-1'>
				{children?.map((child: any, index: number) => {
					if (child?.children) {
						return <SidebarFolder key={index} {...child} />;
					} else {
						return <SidebarFile key={index} {...child} />;
					}
				})}
			</motion.ul>
		</motion.ul>
	);
};

export default SidebarFolder;
