
import {
  Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'

const navbar = () => {
  return (<>
    {/* <Router> */}
      <Navbar bg="light" fixed="top" expand="sm" className="py-1">
        <Navbar.Brand style={{fontFamily: 'Lobster'}}>
          {/* <img
              style={{width: '28px'}}
              src="../logo_96.png"
              className="d-inline-block align-top"
              alt="Mountain Tracks logo"
            /> */}
          {' '}
          Hiking Tracks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href='/tracks/60322b18b69d64f0ce86c6a5'>
              <Nav.Link>石夢眠月水漾</Nav.Link>
            </Link>
            {/* <Nav.Link as={Link} to='/tracks/2'>20200621</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <Switch>
          <Route exact path="/">
          </Route>
          <Route {...{
            path: "/tracks/:id",
            component: props => <GeoMap key={props.match.params.id} {...props}/>
          }}>
          </Route>
          <Route {...{
            path: "/*",
            component: () => <NotFound/>
          }}></Route>
        </Switch> */}
    {/* </Router> */}
    </>)
}

export default navbar;
