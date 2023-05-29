import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import * as React from 'react';

import useMyPage from './hooks/useMyPage';

import Button from '@/components/ui/Button/Button';

const MyPage = () => {
  const { userUrlList, urlsStatus, deleteHandler, error } = useMyPage();

  return (
    <>
      {urlsStatus === 'loading' ? (
        <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Creator</TableCell>
                  <TableCell align="right">Short URL</TableCell>
                  <TableCell align="right">Long URL</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userUrlList.map((item: DocumentData) => (
                  <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.creator}</TableCell>
                    <TableCell align="right">
                      <Link href={item.longUrl}>{item.shortUrl}</Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link href={item.longUrl}>{item.longUrl}</Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        text="Delete"
                        variant="contained"
                        type="button"
                        onClick={() => deleteHandler(item.NO_ID_FIELD)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {error && <Typography sx={{ textAlign: 'center' }}>{error}</Typography>}
    </>
  );
};

export default MyPage;
