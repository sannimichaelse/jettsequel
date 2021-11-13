
type THeaders = {
    Authorization: string
}

export type TGetOptions = {
    method: string,
    headers: THeaders,
    json: boolean,
    uri: string
}

export type TPostOptions = {
    method: string,
    json: boolean,
    data: object,
    uri: string
}