import React, { useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './Button.css';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'
import { auth } from "../../firebase/firebase";
import { useSelector, useDispatch } from 'react-redux';




export default function Button() {
  const dispatch = useDispatch();

  const stetus = useSelector(state => state.auth)
  const stotus = stetus.status;
  const stotus2 = stetus.displayName;
  const stotus3 = stetus.photoURL;


  // const userRef = useRef(firestore.collection("users")).current;
  const [user, setuser] = useState(false)


  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      
      <span>
        <img src={stetus.photoURL} className="img-profile-nav" alt="" />
      </span>
      <span>&nbsp;{stetus.displayName} <i className="fas fa-angle-down" ></i> </span>

    </span>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className="btn-user"
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled user-menu">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  useEffect( () => {
    setuser(stotus);
  }, [stetus,stotus2,stotus3]);
  
  const signouthandle = () => {
    auth.signOut().then(() => {
      console.log("Logout OK");
      dispatch({ type: "SET_LOGOUT" });
      return <Redirect to="/" />
    })
      .catch((err) => {
        console.log("Logout Not work" + err)
      })
  }
  return (
    <div>
      {user ? (
        <Dropdown className="btn-user-menu" >
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1" href="/me"><i className="fas fa-user"></i> ข้อมูลส่วนตัว</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={signouthandle}><i className="fas fa-sign-out-alt"></i> ออกจากระบบ</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
          
            <Link to='/login'>
              <button className='signup-btn'>ลงชื่อเข้าใช้</button>
            </Link>
          
        )
      }
    </div >

  );
}
