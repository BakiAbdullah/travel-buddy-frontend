"use client";

import ClearFiltersButton from "@/components/shared/DashboardComponents/ClearFiltersButton";
import RefreshButton from "@/components/shared/DashboardComponents/RefreshButton";
import SearchFilter from "@/components/shared/DashboardComponents/SearchFilter";

const UsersManagementFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search travel plans..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default UsersManagementFilter;
