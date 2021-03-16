
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
          Hiking Tracks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href='/tracks/60322b18b69d64f0ce86c6a5' passHref>
              <Nav.Link>石夢眠月水漾</Nav.Link>
            </Link>
            <Link href='/tracks/6050a26e8a62c1cc17100fd2' passHref>
              <Nav.Link>童話嘆息</Nav.Link>
            </Link>
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
