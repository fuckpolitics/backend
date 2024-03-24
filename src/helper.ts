import {createParamDecorator} from "@nestjs/common";

export const mapBy =
    <T>(items: T[], keySelector: (item: T) => string): Map<string, T> =>
        items.reduce((acc, item) => acc.set(keySelector(item), item), new Map<string, T>())

export const User = createParamDecorator((data, req) => {
    const user = req.args[0].user;
    return data? user[data]: user;
});

export const SocketUserToken = createParamDecorator((_, req) => {
    return req.args[0].handshake.headers.authorization;
});