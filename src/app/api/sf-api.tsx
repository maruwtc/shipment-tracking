import axios from 'axios';

class SFTrackingApi {
  private apiKey: string = "apiKey";
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://sfapi.sf-express.com/std/service';
  }

  async trackShipment(trackingNumber: string) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          service: 'tracking_international',
          key: this.apiKey,
          payload: {
            trackingNumber,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching SF Express tracking info:', error);
      throw new Error('An error occurred while fetching tracking info.');
    }
  }
}

export default SFTrackingApi;
