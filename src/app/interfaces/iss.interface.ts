export interface ISSResponse {
    iss_position: {
        latitude: string,
        longitude: string
    };
    timestamp: number;
    message: string;
}
