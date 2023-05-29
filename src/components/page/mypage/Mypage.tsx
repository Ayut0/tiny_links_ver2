import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Stack, TextField, Typography } from '@mui/material';
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

import { Controller } from 'react-hook-form';

import useMyPage from './hooks/useMyPage';

import Button from '@/components/ui/Button/Button';

const MyPage = () => {
  const {
    userUrlList,
    urlsStatus,
    deleteHandler,
    editUrl,
    editHandler,
    updateHandler,
    handleSubmit,
    control,
    error,
    successMessage,
  } = useMyPage();

  return (
    <Box sx={{ backgroundColor: '#fffffe' }}>
      {urlsStatus === 'loading' ? (
        <Typography sx={{ textAlign: 'center', color: '#5f6c7b' }}>Loading...</Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: '80%', margin: '0 auto', paddingTop: '4rem' }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Creator</TableCell>
                  <TableCell align="right">Short URL</TableCell>
                  <TableCell align="right">Long URL</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userUrlList.map((item: DocumentData) => (
                  <TableRow
                    key={item.id}
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
                      {editUrl === item ? (
                        <Stack
                          component="form"
                          noValidate
                          onSubmit={handleSubmit(updateHandler)}
                        >
                          <Controller
                            name="longUrl"
                            control={control}
                            defaultValue={item.longUrl}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                              <TextField {...field} label="Long URL" />
                            )}
                          />
                          <Button text="Update" variant="contained" type="submit" />
                        </Stack>
                      ) : (
                        <Button
                          text="Edit"
                          variant="contained"
                          type="button"
                          onClick={() => editHandler(item)}
                        >
                          <EditIcon />
                        </Button>
                      )}
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
          <Box
            sx={{
              marginTop: '2rem',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link href={'/'}>
              <Button text="Add new" variant="contained" type="button" />
            </Link>
          </Box>
          {error && (
            <Typography sx={{ textAlign: 'center', color: '#5f6c7b' }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography sx={{ textAlign: 'center', color: '#5f6c7b' }}>
              {successMessage}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default MyPage;
