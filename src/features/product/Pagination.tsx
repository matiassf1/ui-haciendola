import ReactPaginate from 'react-paginate';

interface IPaginationProps {
	totalPages: number;
	setPage: (page: number) => void;
	disable: boolean;
	actualPage: number;
}

export const Pagination = ({
	totalPages,
	setPage,
	disable,
	actualPage,
}: IPaginationProps): JSX.Element => {
	const handlePageClick = (event: { selected: number }) => {
		if (!disable) {
			setPage(event.selected + 1);
		}
	};

	return (
		<ReactPaginate
			// Page counts and ranges
			forcePage={actualPage - 1}
			initialPage={actualPage - 1}
			pageCount={totalPages}
			pageRangeDisplayed={4} // Adjusted to display more pages in the pagination bar
			marginPagesDisplayed={2}
			// Labels
			previousLabel="<"
			nextLabel=">"
			breakLabel="..."
			// Current page handling
			onPageChange={handlePageClick}
			onPageActive={() => disable}
			onClick={() => !disable}
			// Class names
			className={`isolate inline-flex -space-x-px rounded-md shadow-sm ${
				disable ? 'opacity-80' : ''
			}`}
			containerClassName="pagination"
			pageClassName={`sm:flex relative inline-flex items-center text-[18px] font-object-sans-heavy leading-[15.343px] tracking-[0.66px] text-zinc-500 ${
				disable ? 'cursor-default' : ''
			}`}
			pageLinkClassName="px-4 py-2"
			activeClassName="cursor-default relative z-10 inline-flex text-zinc-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
			activeLinkClassName="cursor-default py-2 text-indigo-800 font-bold"
			previousClassName={`flex relative inline-flex items-center rounded-l-md text-gray-400 ${
				disable ? 'cursor-default' : ''
			}`}
			previousLinkClassName="w-[20px] h-[20px] text-[22px] font-object-sans-regular leading-[15.343px] tracking-[0.66px] text-zinc-500"
			nextClassName={`flex relative inline-flex items-center rounded-r-md text-gray-400 ${
				disable ? 'cursor-default' : ''
			}`}
			nextLinkClassName="w-[20px] h-[20px] text-[22px] font-object-sans-regular leading-[15.343px] tracking-[0.66px] text-zinc-500"
			breakClassName="sm:flex cursor-default relative inline-flex items-center text-gray-700"
			breakLinkClassName="px-1 py-2"
			disabledClassName="cursor-default"
			disabledLinkClassName="cursor-default"
			// Miscellaneous
			renderOnZeroPageCount={null}
		/>
	);
};
