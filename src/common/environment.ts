require("dotenv").config();

export const enviroment = {
    server:{
        port: process.env.PORT || 3001
    },
    db:{
        url: process.env.DB_URI_CONNECT || "localhost"
    }
}