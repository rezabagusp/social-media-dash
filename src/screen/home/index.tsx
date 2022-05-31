import { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchUser,
  selectData,
} from '../../redux/user/userSlice';
import UserCard from '../../component/card';
import ScreenTitle from '../../component/screenTitle';
import type { User } from '../../type/user';

const HomeScreen = () => {
  const { users, fetchStatus} = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [fetchStatus, dispatch])

  if (fetchStatus === 'failed') {
    return <>Fail to fetch users</>;
  }

  if (fetchStatus === 'loading') {
    return <>Loading...</>
  }

  return (
    <Box p="16px">
      <ScreenTitle title="User List" />
      <Box mt="20px">
        {
          users.map((user: User, idx) => {
            const key = `user-${user.id}`;

            return (
              <Box mb="24px">
                <UserCard
                  key={key}
                  user={user}
                />
              </Box>
            )
          })
        }
      </Box>
    </Box>
  );
};

export default HomeScreen;
