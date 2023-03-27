import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class RoomService
{
    getAllItems() {
        return axios.get(API_URL + '/room-items', { headers: authHeader() })
    }

    saveItem(item) {
        if (item.id > 0) {
            return axios.post(API_URL + '/room-items/update', {
                id: item.id,
                active: item.active,
                name: item.name,
                type: item.type,
            }, { headers: authHeader() })
        } else {
            return axios.post(API_URL + '/room-items/create', {
                active: item.active,
                name: item.name,
                type: item.type,
            }, { headers: authHeader() })
        }
    }
}

export default new RoomService()
