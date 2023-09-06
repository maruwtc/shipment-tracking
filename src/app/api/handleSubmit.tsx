import DHLApi from './dhl-api';
import SFTrackingApi from './sf-api';

const isDHLTrackingNumberFormat = (trackingNumber: string) => {
  return /^[A-Za-z0-9]{10}$/.test(trackingNumber);
};

const isSFTrackingNumberFormat = (trackingNumber: string) => {
  return trackingNumber.startsWith('SF');
};

export const handleSubmit = async (
  trackingNumber: string,
  setResponseData: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setFormat: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    setResponseData(null);
    setError(null);
    setFormat(null);
    if (isSFTrackingNumberFormat(trackingNumber)) {
      const sfApi = new SFTrackingApi('YOUR_SF_API_KEY');
      const sfResponse = await sfApi.trackShipment(trackingNumber);
      const isFormat = "SF";
      setResponseData(sfResponse);
      setFormat(isFormat);
    } else if (isDHLTrackingNumberFormat(trackingNumber)) {
      const dhlApi = new DHLApi();
      const dhlResponse = await dhlApi.getShipmentStatus(trackingNumber);
      const isFormat = "DHL";
      if (dhlResponse.status === 404) {
        setError(new Error('Shipment was not found'));
      } else if (dhlResponse.status === 400) {
        setError(new Error('Bad Request Error'));
      } else {
        setResponseData(dhlResponse.data);
      }
      setFormat(isFormat);
    } else {
      setError(new Error('Invalid Format'));
    }
  } catch (error) {
    setError(error);
    console.error(error);
  }
};