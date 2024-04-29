
export interface PacketOut {
    payload: string | number,
    payloadType: string,
    token: number
}

export interface PacketIn {
    payload: string | number,
    payloadType: string,
    token: number
}

export const Token = 1898654634536898