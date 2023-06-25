import './resultOrgView.sass';

import { useState } from 'react';

import Organization from '../../../models/class/organization.model';
import PaginationView from '../paginationView/paginationView';
import ResultsOrgListView from '../resultsOrgListView/resultsOrgListView';

interface Props {
  displayNoResultsFound: boolean;
  orgData?: Organization[];
  pageCount: number;
  pageIndex: number;
  totalCount: number;
  paginationRequestHandler(pageIndex: number): void;
}

export default function ResultOrgView({
  displayNoResultsFound,
  orgData,
  pageCount,
  pageIndex,
  totalCount,
  paginationRequestHandler,
}: Props) {
  function handlePaginationViewSelection(pageNum: number) {
    paginationRequestHandler(pageNum);
  }

  return (
    <div className="display-box">
      {/* <!-- pagination --> */}
      <PaginationView
        count={pageCount}
        curIndex={pageIndex}
        buttonSelectedHandler={handlePaginationViewSelection}
      />

      {/* <!-- total count --> */}
      {totalCount > 0 && <h3>{totalCount} Organizations found!</h3>}

      {/* <!-- orgs --> */}
      <ResultsOrgListView orgData={orgData} />

      {/* <!-- no results found --> */}
      {displayNoResultsFound && (
        <div className="no-results-text">No Results Found.</div>
      )}
    </div>
  );
}
