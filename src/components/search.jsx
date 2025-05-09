import React, { useState } from "react";
import Input from "./input";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Tìm kiếm sinh viên theo tên..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-3 w-full border border-gray-300 rounded-sm"
      />
      <input />
    </div>
  );
}
