export interface AliceRequest {
    request: { command: string };
    session: any;
    version: string;
  }
  
  export interface AliceResponse {
    version: "1.0";
    session: any;
    response: {
      text: string;
      end_session: boolean;
    };
  }
  