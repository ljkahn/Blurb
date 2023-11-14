// // NotificationContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);

//   const markNotificationAsRead = async (notificationId) => {
//     // Call the mutation to mark the notification as read on the server
//     // Update the local state accordingly
//     try {
//         // Call the mutation to mark the notification as read on the server
//         const [markNotificationAsReadMutation] = useMutation(MARK_NOTIFICATION_AS_READ_MUTATION, {
//           variables: { notificationId },
//         });

//         const result = await markNotificationAsReadMutation();

//         // Assuming the mutation returns the updated notification
//         const updatedNotification = result.data.markNotificationAsRead;

//         // Update the local state accordingly (this depends on your state management approach)
//         // For example, you might have a state hook to manage notifications:
//         setNotifications((prevNotifications) =>
//           prevNotifications.map((notification) =>
//             notification.id === updatedNotification.id
//               ? { ...notification, isRead: true }
//               : notification
//           )
//         );
//       } catch (error) {
//         console.error('Error marking notification as read:', error);
//       }
//   };

//   const fetchNotifications = async () => {
//     // Call the query to fetch notifications from the server
//     // Update the local state accordingly
//     try {
//         // Call the query to fetch notifications from the server
//         const { data } = useQuery(FETCH_NOTIFICATIONS_QUERY);

//         // Assuming your query returns an array of notifications
//         const fetchedNotifications = data.notifications;

//         // Update the local state accordingly (this depends on your state management approach)
//         // For example, you might have a state hook to manage notifications:
//         // setNotifications(fetchedNotifications);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []); // Fetch notifications on component mount

//   const contextValue = {
//     notifications,
//     markNotificationAsRead,
//   };

//   return (
//     <NotificationContext.Provider value={contextValue}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }
//   return context;
// };
