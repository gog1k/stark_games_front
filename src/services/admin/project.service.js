import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class ProjectService
{
    getAll(page = 0) {
        return axios.get(API_URL + '/admin/projects?page=' + page, { headers: authHeader() })
    }

    get(id) {
        return axios.get(API_URL + '/admin/projects/' + id, { headers: authHeader() })
    }

    save(item) {
        if (item.id > 0) {
            return axios.post(API_URL + '/admin/projects/update', item, { headers: authHeader() })
        } else {
            return axios.post(API_URL + '/admin/projects/create', item, { headers: authHeader() })
        }
    }
}

export default new ProjectService()
