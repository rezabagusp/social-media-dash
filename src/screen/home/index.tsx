import { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchUser,
  selectData,
} from '../../redux/user/userSlice';
import UserCard from '../../component/card/user';
import ScreenTitle from '../../component/screenTitle';
import type { User } from '../../type/user';

const HomeScreen = () => {
  const { users, fetchStatus} = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchUser())
  }, [dispatch])

  const renderUsers = () => {
    if (fetchStatus === 'failed') {
      return <>Fail to fetch users</>;
    }
  
    if (fetchStatus === 'loading') {
      return <>Loading...</>
    }
  
    if (fetchStatus === 'succeeded' && !users.length) {
      return <>No User Found</>
    }

    return users.map((user: User, idx) => {
      const key = `user-${user.id}`;

      return (
        <Box
          mb="24px"
          key={key}
        >
          <UserCard
            user={user}
          />
        </Box>
      )
    })
  }


  return (
    <Box p="16px">
      <ScreenTitle title="User List" />
      <Box mt="20px">
        {renderUsers()}
      </Box>
    </Box>
  );
};

export default HomeScreen;
