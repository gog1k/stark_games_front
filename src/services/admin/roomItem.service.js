import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class RoomItemService
{
    getAll() {
        return axios.get(API_URL + '/admin/room-items', { headers: authHeader() })
    }

    get(id) {
        return axios.get(API_URL + '/admin/room-items/' + id, { headers: authHeader() })
    }

    save(item) {
        if (item.id > 0) {
            return axios.post(API_URL + '/admin/room-items/update', item, { headers: authHeader() })
        } else {
            return axios.post(API_URL + '/admin/room-items/create', item, { headers: authHeader() })
        }
    }
}

export default new RoomItemService()
