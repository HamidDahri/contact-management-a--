import React , {Fragment , useContext}from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

export const Navbar = ({title, icon}) => {

    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext);

    const {isAuthenticated , logout , user} = authContext;
    const {clearcontacts} = contactContext;


    const onLogout = () => {
        logout();
        clearcontacts();
    }
   const authLinks = (
    <Fragment>
        <li>Hello {user && user.name}</li>
        <li>
            <a onClick={onLogout} href='#'>
                <i className='fas fa-sign-out-alt'></i>
                <span className='hide-sm'>Logout</span>
            </a>
        </li>
    </Fragment>
   );

   const guestLinks = (
    <Fragment>
        <li>
        <Link to='/register'>Register</Link>
        </li>
        <li>
        <Link to='/login'>Login</Link>
        </li>
    </Fragment>
   )

  return (
    <div className='navbar bg-primary'>
        <h1>
            <i className={icon}></i> {title}
        </h1>
        <ul>
            {isAuthenticated ? authLinks : guestLinks}
        </ul>
    </div>
  )
}

Navbar.protoTypes= {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Contact Management",
    icon: "fas fa-id-card-alt"
}