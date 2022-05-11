import React from 'react'
import Card from '@mui/material/Card';
import { Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { Link, Outlet } from "react-router-dom";
import { VetService } from '../apiClient/eVetApi';

type Props = {
  service: VetService
}

export default function ServiceCard(props: Props) {

  const service = props.service;
  const randomImageUrl = "https://media.istockphoto.com/photos/happy-doctor-with-dog-at-vet-clinic-picture-id489083722"; // todo...
  return (
    <Card elevation={4} sx={{p:5}}>
      {/* <CardMedia component="img"
        height="200"
        image={randomImageUrl}
        alt="service description" 
      /> */}
      <CardContent>
          <Typography variant="h5" component="span">
              {service.name}
          </Typography>
          <Typography variant="body1" component="div">
                <strong>from {service.price} Eur</strong>
          </Typography>
          <Typography variant="body1" component="div">
                {/* TODO - description
                <ul>
                  <li>TODO - description</li>
                  <li>TODO - description</li>
                  <li>TODO - description</li>
                </ul> */}

          </Typography>

      </CardContent>
      <CardActions>
        <AuthenticatedTemplate>
          <Button href="/appointments/book">Book now</Button>
        </AuthenticatedTemplate> 
        <Button href={`/services/${service.vetServiceCode}`} 
        disabled={true}>Read more</Button>
      </CardActions>
    </Card>
  )
}

