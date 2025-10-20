import { useNavigate } from 'react-router-dom';

export function Account(props) {

  const navigate = useNavigate();
  let appTitle = "Customer App";
  let accountContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
  }

  let padLeft = {
    paddingLeft: '16px',
  }

  let padDivTop = {
    paddingTop: '16px',
  }

  let onLogoutClick = function () {
    if (window.confirm("Do you want to log out?")) {
      props.setUsername("");
      navigate("/login"); 
    } 
  }

  let onCustomersClick = function () {
    navigate("/app");
  }

  let onEventsClick = function () {
    navigate("/events");
  }

  return (
    <div style={padDivTop}>
      <div className='boxed pad5' >
        <h3 className='floatL' style={accountContainer}>
          {appTitle}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={onCustomersClick}>Customers</button>
            <button onClick={onEventsClick}>Events</button>
            <button className='floatR icon-button'
              onClick={onLogoutClick}
              title="Click here to log out!" >
              <img
                src="/person.png"
                alt="Person"
                style={{ width: '24px', height: '24px' }}
              />
              {props.username}
            </button>
          </div>
        </h3>
      </div>
    </div>
  );
}