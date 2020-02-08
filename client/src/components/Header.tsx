import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { useQuery, useMutation } from 'react-apollo';
import { NavLink as RRNavLink } from 'react-router-dom';

import { GET_USER } from '../graphql/queries';
import { LOGOUT } from '../graphql/mutations';

export const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const { loading, data, client } = useQuery(GET_USER);
  const [logout] = useMutation(LOGOUT);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">English365</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

          {!loading && data && (
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {data.currentUser && (
                  <>
                    <NavItem>
                      <NavLink
                        className="text-danger"
                        tag={RRNavLink}
                        to="/"
                        onClick={async () => {
                          await logout();
                          // The easiest way to ensure that the UI and store state reflects the current user's permissions is to call client.resetStore() after your login or logout process has completed.
                          // This will cause the store to be cleared and all active queries to be refetched.
                          client.resetStore();
                        }}
                      >
                        Logout
                      </NavLink>
                    </NavItem>
                  </>
                )}
                {!data.currentUser && (
                  <>
                    <NavItem>
                      <a href="/auth/google">
                        <img src="/google_login.png" alt="google_login" />
                      </a>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
          )}
        </Container>
      </Navbar>
    </div>
  );
};
