import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class RoomItemService
{
    all(page = 0) {
        return axios.get(API_URL + '/admin/room-items?page=' + page, { headers: authHeader() })
    }

    get(id) {
        return axios.get(API_URL + '/admin/room-items/' + id, { headers: authHeader() })
    }

    save(item) {
        return axios.post(API_URL + '/admin/room-items/' + (item.id > 0 ? item.id : 'create'), item, { headers: authHeader() })
    }
}

export default new RoomItemService()
