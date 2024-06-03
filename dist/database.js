"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
// Configuration object for your database
const config = {
    user: 'db_a9ed87_uneofrojtest_admin',
    password: 'UneOfroj123$',
    server: 'SQL5111.site4now.net', // e.g., 'localhost' or '192.168.1.1'
    database: 'db_a9ed87_uneofrojtest',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        enableArithAbort: true
    }
};
class Database {
    constructor() {
        this.pool = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool) {
                return this.pool;
            }
            try {
                this.pool = yield mssql_1.default.connect(config);
                return this.pool;
            }
            catch (err) {
                throw new Error('Database connection failed: ' + err.message);
            }
        });
    }
    query(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connect();
                const result = yield pool.request().query(queryString);
                return result.recordset;
            }
            catch (err) {
                throw new Error('Query failed: ' + err.message);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool) {
                yield this.pool.close();
                this.pool = null;
            }
        });
    }
}
exports.default = new Database();
