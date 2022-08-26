export function getPageButtonStartPoint(
  totalPages: number,
  currentPage: number
) {
  if (totalPages <= 3) {
    return 1;
  } else {
    if (currentPage > 1) {
      if (currentPage === totalPages) {
        return currentPage - 2;
      }
      return currentPage - 1;
    } else {
      return 1;
    }
  }
};

export function getPageButtonEndPoint(
  totalPages: number,
  currentPage: number
) {
  if (totalPages <= 3) {
    return totalPages;
  } else {
    if (currentPage === 1) {
      return 3;
    } else {
      if (currentPage + 1 < totalPages) {
        return currentPage + 1;
      } else if (currentPage + 2 < totalPages) {
        return currentPage + 2;
      } else {
        return totalPages;
      }
    }
  }
};
