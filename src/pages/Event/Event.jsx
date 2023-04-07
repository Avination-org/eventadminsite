import { Delete, Edit } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LinkBtn from '../../components/Button/LinkBtn'
import { HttpService } from '../../utility/api';

function Event() {
  const [events, setEvents] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 210
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 180
    },
    {
      field: 'status',
      headerName: 'Published',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value ? <Chip label={"Published"} color={'success'} /> : <Chip color="error" label="Draft" />}
          </>
        );
      }
    },
    {
      field: 'carousel',
      headerName: 'Carousel',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value ? <Chip label={"Carousel"} color={'success'} /> : <Chip color="error" label="No Carousel" />}
          </>
        );
      }
    },
    {
      field: 'create_date',
      headerName: 'Created Date',
      width: 160
    },
    {
      field: 'event_start',
      headerName: 'Start Date',
      width: 160
    },
    {
      field: 'event_end',
      headerName: 'End Date',
      width: 160
    },

    {
      field: 'edit',
      headerName: 'Actions',
      renderCell: (params) => {
        return (<>
          <IconButton onClick={() => navigate(`/edit/event/${params.value}`)}><Edit /></IconButton>
          <IconButton onClick={() => {HttpService.removeEvent(params.value); window.reload()}}><Delete /></IconButton>
        </>);
      }
    }
  ];

  const getEvents = async () => {
    const res = await HttpService.getAllEvents()
    const newRow = [];
    const resData = await res.data;
    resData.events.map((event) => {
      let toLocalDT = (e) => new Date(e).toLocaleString()
      console.log(event);
      newRow.push({
        id: event._id,
        edit: event._id,
        name: event.name,
        event_start: toLocalDT(event.event_date.from),
        event_end: toLocalDT(event.event_date.to),
        carousel: event.meta_data && event.meta_data.in_carousel? true:false,
        status: !event.draft,
        create_date: toLocalDT(event.created_date),

      });
    });
    setRows(newRow);
  };

  useEffect(() => {
    getEvents();
  }, [])

  return (
    <Container sx={{m:'1rem 12rem 1rem 15rem', height:'90vh',  minWidth:'80vw !important'}}>
      <Paper elevation={3} sx={{ p: '1rem', height: "100%", width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <LinkBtn to="/addevent" text={"Add Event"} />
        </div>
        <Typography variant='h4'>Events</Typography>
        <Box sx={{ height:'90%', mb:'5rem'}}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
    </Container>
  )
}

export default Event