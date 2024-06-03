import sql from 'mssql';

// Define the interface for your data
export interface YourData {
    id: number;
    name: string;
    // Add other fields as needed
}

// Configuration object for your database
const config: sql.config = {
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
    private pool: sql.ConnectionPool | null;

    constructor() {
        this.pool = null;
    }

    async connect(): Promise<sql.ConnectionPool> {
        if (this.pool) {
            return this.pool;
        }
        try {
            this.pool = await sql.connect(config);
            return this.pool;
        } catch (err: any) {
            throw new Error('Database connection failed: ' + err.message);
        }
    }

    async query<T>(queryString: string): Promise<T[]> {
        try {
            const pool = await this.connect();
            const result = await pool.request().query(queryString);
            return result.recordset as T[];
        } catch (err: any) {
            throw new Error('Query failed: ' + err.message);
        }
    }

    async close(): Promise<void> {
        if (this.pool) {
            await this.pool.close();
            this.pool = null;
        }
    }
}

export default new Database();
