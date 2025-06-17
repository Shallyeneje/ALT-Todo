// import React, { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "../components/ui/pagination"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const PaginationContainer: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const maxPageButtons = 5 // Number of page buttons shown before using ellipsis

  const getPageNumbers = () => {
    let pages = []
    if (totalPages <= maxPageButtons) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages]
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
      }
    }
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(Math.max(1, currentPage - 1))} />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(Number(page))}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationContainer

// import { Button } from "./ui/button";

// interface PaginationProps {
//   totalItems: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// export default function PaginationContainer({
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   onPageChange,
// }: PaginationProps) {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center gap-2">
//       {/* Prev */}
//       <Button
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//         className="px-3 py-1 bg-gray-300 text-black hover:bg-gray-400 disabled:opacity-50"
//       >
//         Prev
//       </Button>

//       {/* Page Numbers */}
//       <div className="flex gap-1">
//         {pageNumbers.map((num) => (
//           <Button
//             key={num}
//             onClick={() => onPageChange(num)}
//             className={`px-3 py-1 ${
//               currentPage === num
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-black hover:bg-gray-300"
//             }`}
//           >
//             {num}
//           </Button>
//         ))}
//       </div>

//       {/* Next */}
//       <Button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//         className="px-3 py-1 bg-gray-300 text-black hover:bg-gray-400 disabled:opacity-50"
//       >
//         Next
//       </Button>
//     </div>
//   );
// }

