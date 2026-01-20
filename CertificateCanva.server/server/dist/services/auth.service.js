"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.refresh = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = require("../repository/auth.repository");
const hash_1 = require("../utils/hash");
const login = async (data) => {
    if (!data)
        throw new Error("Request body missing");
    const { email, password } = data;
    if (!email || !password)
        throw new Error("Email and password are required");
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await (0, hash_1.comparePassword)(password, user.password_hash);
    if (!valid)
        throw new Error("Invalid credentials");
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role_name }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await (0, auth_repository_1.saveRefreshToken)(user.id, refreshToken);
    return { accessToken, refreshToken };
};
exports.login = login;
const refresh = async (token) => {
    if (!token)
        throw new Error("Token missing");
    const stored = await (0, auth_repository_1.findRefreshToken)(token);
    if (!stored)
        throw new Error("Forbidden");
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    return jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
exports.refresh = refresh;
const logout = async (userId) => {
    await (0, auth_repository_1.deleteRefreshTokensByUser)(userId);
};
exports.logout = logout;
const getUser = async (id) => {
    return (0, auth_repository_1.findUserById)(id);
};
exports.getUser = getUser;
