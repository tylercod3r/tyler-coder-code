import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { SEARCH_ORG_LIST_DISPLAY_PAGE_SIZE } from '../../../models/consntant/constants';
import Organization from '../../../models/class/organization.model';
import PagView from '../pag/pag-view';

import styles from './org-list.module.scss';

interface Props {
  displayNoResultsFound: boolean;
  orgData?: Organization[];
  pageCount: number;
  pageIndex: number;
  totalCount: number;
  paginationRequestHandler(pageIndex: number): void;
}

const OrgListView = ({
  displayNoResultsFound,
  orgData,
  pageCount,
  pageIndex,
  totalCount,
  paginationRequestHandler,
}: Props) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'blue', color: 'white' }}>
      <Container sx={{ width: '100%', bgcolor: 'blue', color: 'white' }}>
        <PagView
          count={
            orgData ? orgData.length / SEARCH_ORG_LIST_DISPLAY_PAGE_SIZE : 0
          }
          index={0}
        />

        <ListItemText sx={{ width: '100%', padding: '0px', fontSize: '12px' }}>
          Count: {totalCount}
        </ListItemText>

        <List sx={{ width: '100%' }}>
          {orgData &&
            orgData.map((d) => (
              <ListItem
                key={d.id}
                sx={{ width: '100%', padding: '0px', fontSize: '12px' }}
              >
                <ListItemButton
                  sx={{ width: '100%', padding: '0px', fontSize: '12px' }}
                >
                  <ListItemText
                    sx={{ width: '100%', padding: '0px', fontSize: '12px' }}
                    primary={d.name}
                    secondary={d.distance?.toFixed(2)}
                  >
                    {d.distance?.toFixed(2)}
                  </ListItemText>
                  {/* <ListItemText
                    sx={{
                      width: '100%',
                      padding: '0px',
                      paddingRight: '40px',
                      fontSize: '12px',
                    }}
                  >
                    {d.name}
                  </ListItemText> */}
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Container>
    </Box>
  );
};

export default OrgListView;
