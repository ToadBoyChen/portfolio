import React from 'react';
import { FaCalendarAlt, FaStar, FaCheckCircle } from 'react-icons/fa';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export type SortOption = 'date-desc' | 'difficulty-desc' | 'progress-desc';

const options: { id: SortOption; icon: React.ReactElement; label: string }[] = [
    { id: 'progress-desc', icon: <FaCheckCircle />, label: 'Progress' },
	{ id: 'date-desc', icon: <FaCalendarAlt />, label: 'Date' },
	{ id: 'difficulty-desc', icon: <FaStar />, label: 'Difficulty' },
];

interface SortOptionsBarProps {
	currentSort: SortOption;
	onSortChange: (option: SortOption) => void;
}

const SortOptionsBarFC: React.FC<SortOptionsBarProps> = ({ currentSort, onSortChange }) => {
	return (
		<div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 p-2 bg-slate-900/50 rounded-lg border border-purple-400/20 my-4">
			{options.map((option) => (
				<Button
					key={option.id}
					variant="ghost"
					onClick={() => onSortChange(option.id)}
					className={cn(
						'flex-1 flex items-center justify-center gap-2 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all px-3 py-1.5 text-xs sm:text-sm rounded-md',
						currentSort === option.id && 'bg-purple-500/20 text-white shadow-inner shadow-purple-500/20'
					)}
				>
					{option.icon}
					<span>{option.label}</span>
				</Button>
			))}
		</div>
	);
};

export const SortOptionsBar = React.memo(SortOptionsBarFC);
