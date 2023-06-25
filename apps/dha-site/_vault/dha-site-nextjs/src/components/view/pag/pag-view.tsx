import { Stack, Pagination } from '@mui/material';

import styles from './pag.module.scss';

interface Props {
  count: number;
  index: number;
}

const PagView = ({ count, index }: Props): JSX.Element => {
  return (
    <Stack spacing={2} sx={{ width: '100%', padding: '0px', fontSize: '12px' }}>
      <Pagination
        count={count}
        shape="rounded"
        sx={{ width: '100%', padding: '0px', fontSize: '12px' }}
      />
    </Stack>
  );
};

export default PagView;
