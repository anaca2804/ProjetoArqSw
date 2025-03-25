import { enviroment } from "../common/environment";
import mongoose , {mongo} from 'mongoose';

async function conectarBaseDados() {
    try {
        await mongoose.connect(enviroment.db.url)
        console.log("conectado o banco");
    } catch (error) {
        throw(`Erro: ${error}`);        
    }
    
}

export default conectarBaseDados;