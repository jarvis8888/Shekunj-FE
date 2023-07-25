import React, { useEffect } from "react";
import "./NotificationComponent.scss";
import NotificationIcon from "../../assets/icons/svgs/notification.svg";
import {
  Badge,
  Dropdown,
  Drawer,
  ButtonToolbar,
  Button,
  Placeholder,
} from "rsuite";
import { getAllNotifications } from "../../store/notifications";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const NotificationComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { notifications } = useSelector((state) => state.notificationsReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  const [open, setOpen] = React.useState(false);

  const handleRedirect = () => {
    window.location.href = "/all-notifications";
  };

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch, lan]);

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function CustomNotificationIcon() {
    if (notifications["Notifications "]?.length > 0) {
      const updatedAt = new Date(notifications["Notifications "][0].updated_at);
      const isNewNotification = isToday(updatedAt);
      return (
        <div className='custom-notification-icon'>
          {isNewNotification ? (
            <Badge>
              <img
                src={NotificationIcon}
                alt='Notification Icon'
                className='bell'
              />
            </Badge>
          ) : (
            <div className='custom-notification-icon'>
              <img src={NotificationIcon} alt='Notification Icon' />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className='custom-notification-icon'>
          <img src={NotificationIcon} alt='Notification Icon' />
        </div>
      );
    }
  }

  return (
    <>
      <div>
        <Dropdown
          onClick={() => setOpen(true)}
          title={"Notification"}
          className='custom-dropdown'
          noCaret
          icon={<CustomNotificationIcon />}
        >
          {/* {notifications["Notifications "]?.length > 0
            ? notifications["Notifications "].map((index, data) => {
                return (
                  <Dropdown.Item>
                    <a href={`/${data?.url}`}>
                      {data?.title ? data?.title : "New Notification"}
                    </a>
                  </Dropdown.Item>
                );
              })
            : "no data"}
          <Dropdown.Item>
            <a href='/all-notifications'>View All</a>
          </Dropdown.Item> */}
        </Dropdown>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} size='xs'>
        <Drawer.Header>
          <Drawer.Title>Notifications</Drawer.Title>

          <Drawer.Actions>
            <Badge
              content={
                notifications["Notifications "]?.length > 99
                  ? "99+"
                  : notifications["Notifications "]?.length
              }
            >
              <button className='custom-button' onClick={handleRedirect}>
                View All
              </button>
            </Badge>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {notifications && notifications["Notifications "]?.length > 0 ? (
            <ul className='notification-list'>
              {notifications["Notifications "].map((notification, index) => (
                <li key={index}>
                  <a
                    href={`/${notification?.url}`}
                    className='notification-link'
                  >
                    {notification?.title || "New Notification"}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </Drawer.Body>
      </Drawer>
    </>
  );
};
