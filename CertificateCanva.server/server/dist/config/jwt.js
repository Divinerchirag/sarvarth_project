"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    accessToken: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: "15m",
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: "7d",
    },
};
