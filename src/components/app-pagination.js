import { AppButton } from "./app-button";

export const AppPagination = ({
  itemsPerPage,
  pageIndex,
  total,
  setPageIndex,
}) => {
  const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
  const totalPage = lastPageIndex === -1 ? 1 : lastPageIndex + 1;
  return (
    <div>
      <AppButton
        color={pageIndex === 0 ? "gray" : "blue"}
        disabled={pageIndex === 0}
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        Prev
      </AppButton>
      <span>
        Page {pageIndex + 1}/{totalPage}
      </span>
      <AppButton
        color={
          pageIndex === lastPageIndex || lastPageIndex === -1 ? "gray" : "blue"
        }
        disabled={pageIndex === lastPageIndex || lastPageIndex === -1}
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        Next
      </AppButton>
      <span>Total: {total} items</span>
    </div>
  );
};
