import { useState } from 'react';

import useUserStatus from '@/components/page/top/hooks/useUser';

const useHeader = () => {
  const { signedInUser, userStatus } = useUserStatus();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    state: {
      anchorElNav,
      anchorElUser,
      signedInUser,
      userStatus,
    },
    action: {
      handleOpenNavMenu,
      handleOpenUserMenu,
      handleCloseNavMenu,
      handleCloseUserMenu,
    },
  };
};

export default useHeader;
