import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pet_care from "../static/images/pet_care.png";
import { Link } from "react-router-dom";
import { AuthenticatedTemplate } from '@azure/msal-react';

export default function ServiceInfoCard() {
  return (
    <Card elevation={4}>
      <CardMedia
        component="img"
        alt="service"
        height="240"
        image={pet_care}
      />
      <CardContent>
      <Typography variant="h4" color={"text.primary"}>
          Special Care Service
      </Typography>
        <Typography variant="h6" color="text.secondary">
          Unique offer for 24 hours only!
        </Typography>
      </CardContent>
      <CardActions>
      <AuthenticatedTemplate>
      <Link to="/appointments/book"> <Button size="large">Book Appointment</Button></Link>
      </AuthenticatedTemplate>
        <Button size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}
