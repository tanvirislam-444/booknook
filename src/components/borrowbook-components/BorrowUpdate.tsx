"use client";

import { useState } from "react";
import BorrowBook from "./BorrowBook";


interface Book {
  _id: string;
  title: string;
  image: string;
  totalCopies: number;
}

const BookDetailsContent = ({ book }: { book: Book }) => {
  const [totalCopies, setTotalCopies] = useState(book.totalCopies);

  return (
    <div>
      
      <div>
        <p className="text-xs font-medium text-[#806D60]">
          Available Copies
        </p>

        <p className="mt-2 text-2xl font-bold text-[#422B1F]">
          {totalCopies}
        </p>
      </div>

     
      <BorrowBook
        book={{ ...book, totalCopies }}
        onBorrowSuccess={setTotalCopies}
      />
    </div>
  );
};

export default BookDetailsContent;