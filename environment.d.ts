declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SQL_URI: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;

        ARGON_TIME_COST: string;
        ARGON_MEMORY_COST: string;
        ARGON_PARALLELISM: string;
        ARGON_HASH_LENGTH:  string;

        JWT_SECRET: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}