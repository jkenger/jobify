import { allJobsQuery, useAllJobs } from "@/context/AllJobsProvider";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Button } from "./ui/button";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function Pagination() {
  const { onSetParams, queryParams } = useAllJobs();
  const { data } = useQuery(
    allJobsQuery(queryParams)
  ) as UseQueryResult<AxiosResponse>;
  const { currentPage, limit, numOfPages, totalJobs } =
    data?.data.message || {};
  function handlePageChange(page: number) {
    onSetParams("page", [page]);
  }

  function addPageButton({ page }: { page: number }) {
    return (
      <Button
        key={page}
        onClick={() => handlePageChange(page)}
        aria-current="page"
        size="icon"
        variant={currentPage === page ? "default" : "outline"}
      >
        {page}
      </Button>
    );
  }

  function renderPageButton() {
    const pageButtons = [];
    //  first page
    pageButtons.push(addPageButton({ page: 1 }));

    if (currentPage > 3) {
      pageButtons.push(
        <Button
          key={currentPage - 2}
          onClick={() => handlePageChange(currentPage - 2)}
          size="icon"
          variant="outline"
        >
          ...
        </Button>
      );
    }

    // before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ page: currentPage - 1 }));
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton({ page: currentPage }));
    }

    // after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(addPageButton({ page: currentPage + 1 }));
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <Button
          key={currentPage + 2}
          onClick={() => handlePageChange(currentPage + 2)}
          size="icon"
          variant="outline"
        >
          ...
        </Button>
      );
    }

    // last page
    if (numOfPages > 1) {
      pageButtons.push(addPageButton({ page: numOfPages }));
    }
    return pageButtons;
  }

  const firstPageLimit = limit * (currentPage - 1) + 1;
  const lastPageLimit = totalJobs > limit ? limit * currentPage : totalJobs;
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-foreground">
            Showing <span className="font-medium">{firstPageLimit}</span> to{" "}
            <span className="font-medium">{lastPageLimit}</span> of{" "}
            <span className="font-medium">{totalJobs}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const prevPage = currentPage - 1;
                if (prevPage > 0) handlePageChange(prevPage);
              }}
              disabled={currentPage === 1 || currentPage === 0 ? true : false}
            >
              <span className="sr-only">Previous</span>
              <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {renderPageButton()}

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const nextPage = currentPage + 1;
                if (nextPage <= numOfPages) handlePageChange(nextPage);
              }}
              disabled={
                currentPage === numOfPages || currentPage === numOfPages + 1
                  ? true
                  : false
              }
            >
              <span className="sr-only">Next</span>
              <BiChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
