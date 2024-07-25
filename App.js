import * as React from 'react';
import './App.css';
// MUI components
import { Button, Box, Paper, Container } from '@mui/material';
// Local components
import { MuiTypogrpahy } from './UI Components/MuiTypogrpahy';
import IconButtons from './UI Components/IconButtons';
import IconButtonGroup from './UI Components/IconButtonGroup';
import TabGroup from './UI Components/TabGroup';
import MiniDrawer from './UI Components/MiniDrawer';
import ToggleGalleryButton from './UI Components/ToggleGalleryButton';
import GridCardView from './UI Components/GridCardView';

//Icons
import IconSettings from '@mui/icons-material/Settings'
import IconPerson from '@mui/icons-material/Person'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import UploadForm from './Utils';


export default function App() {
  const [page, setPage] = React.useState(0);

  return <div className='App'>
    <header className='App-header'>
      <Container maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
        <Paper sx={{ padding: 0, textAlign: 'center' }} >
          <Container maxWidth="lg">

            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
              <Box display="flex" flexDirection="column" alignItems="left">
                <MuiTypogrpahy textSize={'subtitle2'} customText="Aug 17" />
                <MuiTypogrpahy textSize={'h4'} customText="Sam's Wedding" />
              </Box>
              <IconButtons isPrimaryCOllection={[false, false, true]} />
            </Box>
            <UploadForm />
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
              <TabGroup tabCount={3} iconTypes={[<IconSettings />, <VerifiedOutlinedIcon />, <VisibilityOffOutlinedIcon />]} tabText={["All (999)", "Selected (0)", "Unviewed (0)"]} />
              <ToggleGalleryButton />
            </Box>

            <GridCardView itemCount={40} />
          </Container>
        </Paper>

      </Container>
      <MiniDrawer />

    </header>

  </div>
}