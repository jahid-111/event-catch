"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedSearch = useDebounce((term) => {
    //Debounce cache user data for the first time
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params?.toString()}`);
  }, 1000);

  //   const handleSearch = (term) => {
  //     const params = new URLSearchParams(searchParams);
  //     if (term) {
  //       params.set("query", term);
  //     } else {
  //       params.delete("query");
  //     }
  //     replace(`${pathname}?${params?.toString()}`);
  //   };

  return (
    <div>
      <input
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
      />
    </div>
  );
};

export default Search;
