import axios from "axios";
import { CreateCepDto } from "src/modules/cep/dto/create-cep.dto";

export async function ViaCepRequisition(cep:string)  {

        const requisition = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      
        const data: CreateCepDto = {
            cep:  requisition.data.cep,
            publicSpace: requisition.data.logradouro,
            state: requisition.data.uf,
            city: requisition.data.localidade,
        }
        return data;
    
}