/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link passHref href="/">
          <Navbar.Brand>Wander Lens</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/post/new">
              <Nav.Link>Create Post</Nav.Link>
            </Link>
            <Link passHref href="/my-posts">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
          </Nav>
          <img
            src={user.fbUser.photoURL}
            alt="User profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
            }}
          />
          <div className="ms-auto">
            <Button type="button" size="sm" variant="danger" onClick={signOut}>
              SIGN OUT
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
