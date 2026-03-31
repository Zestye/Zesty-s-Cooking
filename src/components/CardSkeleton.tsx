const Skeleton = ({ className }: { className?: string }) => (
	<div className={`animate-pulse rounded-md bg-muted ${className ?? ""}`} />
);

const CardSkeleton = () => {
	return (
		<div className="bg-white rounded-lg overflow-hidden shadow-md">
			<Skeleton className="h-48 w-full rounded-none" />
			<div className="p-4">
				<Skeleton className="h-6 w-full mb-2" />
				<Skeleton className="h-4 w-2/3 mb-4" />
				<div className="flex gap-2">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-16" />
				</div>
			</div>
		</div>
	);
};

export default CardSkeleton;
