export default {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: 0,
      borderRadius: 10,
      borderTop: 'none',
    },
  },
  Dismiss: {
    DefaultStyle: {
      backgroundColor: 'transparent',
      color: 'white',
      zIndex: 1,
      paddingTop: 5,
    },
  },
};
