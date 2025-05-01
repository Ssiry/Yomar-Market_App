// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, Platform, Alert } from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// // import PushNotification from 'react-native-push-notification';

// const CheckNotificationPermission = () => {
//     const [permission, setPermission] = useState(false);

//     const checkPermissions = () => {
//         if (Platform.OS === 'ios') {
//             PushNotificationIOS.checkPermissions(perms => {
//                 const enabled = perms.alert || perms.badge || perms.sound;
//                 setPermission(!!enabled);
//             });
//         } else {
//             // Android: always returns true unless blocked at system level
//             setPermission(true);
//         }
//     };

//     const requestPermissions = () => {
//         if (Platform.OS === 'ios') {
//             PushNotificationIOS.requestPermissions().then(perms => {
//                 const enabled = perms.alert || perms.badge || perms.sound;
//                 setPermission(!!enabled);
//             });
//         } else {
//             // Android does not require manual permission request for notifications (since API 33+ it's in AndroidManifest)
//             Alert.alert('Android', 'Permissions are handled by system settings.');
//         }
//     };

//     useEffect(() => {
//         checkPermissions();
//     }, []);

//     return (
//         <View style={{ padding: 20 }}>
//             <Text style={{ fontSize: 18 }}>
//                 Notifications: {permission ? '✅ Enabled' : '🚫 Disabled'}
//             </Text>
//             {!permission && Platform.OS === 'ios' && (
//                 <Button title="Request Permission" onPress={requestPermissions} />
//             )}
//         </View>
//     );
// };

// export default CheckNotificationPermission;
