import axios from 'axios';

class DHLApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api-eu.dhl.com/track/shipments';
  }

  async getShipmentStatus(trackingNumber: string) {
    const apiUrl = `${this.baseUrl}?trackingNumber=${trackingNumber}&language=en&offset=0&limit=5`;
    const headers = {
      'accept': 'application/json',
      'DHL-API-Key': 'vjt3elnto4bAOfxYzNcCTmmyertLzyUO', // Replace with your DHL API key
    };

    const response = await axios.get(apiUrl, { headers });
    return response;
  }
}

export default DHLApi;
