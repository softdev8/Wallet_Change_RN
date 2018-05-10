import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const screenDimensions = Dimensions.get('window');

 const AppConstants = {
    ScreenDimensions: screenDimensions,
    HeaderTitleWidth: screenDimensions.width - 130,
    IsSmallDevice: screenDimensions.height <= 568,
    BundleId: DeviceInfo.getBundleId(),
    DeviceId:DeviceInfo.getUniqueID(),
};
export default AppConstants;
