import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Customer from './components/Customer';
import Training from './components/Training';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' component='div'>
              Personal trainer
              <Button component={Link} to='/' color='inherit'>Home</Button>
            </Typography>
            <Button component={Link} to='/customers' color='inherit'>
              Customers
            </Button>
            <Button component={Link} to='/training' color='inherit'>
              Training
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/customers' element={<Customer />} />
          <Route path='/training' element={<Training />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
