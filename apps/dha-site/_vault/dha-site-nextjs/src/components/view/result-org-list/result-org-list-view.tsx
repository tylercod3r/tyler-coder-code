import Organization from '../../../models/class/organization.model';

import styles from './results-org-list.module.scss';

interface Props {
  orgData?: Organization[];
  // paginationRequestHandler(pageIndex: number): void;
}

export default function ResultOrgListView({ orgData }: Props) {
  const onClickSearch = (url: string) => {
    console.log('search: ' + url);
  };

  const onClickVisit = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="results-org-list-view">
      <ul>
        {orgData &&
          orgData.map((d) => (
            <li key={d.id}>
              <label>{d.distance?.toFixed(2)}</label>
              <button onClick={() => onClickSearch(d.url ? d.url : '')}>
                SEARCH
              </button>
              <button onClick={() => onClickVisit(d.url ? d.url : '')}>
                VISIT
              </button>
              {d.name}{' '}
            </li>
          ))}
      </ul>
    </div>
  );
}
