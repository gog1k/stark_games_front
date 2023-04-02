import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class UserService
{
    getAll() {
        return axios.get(API_URL + '/admin/user', { headers: authHeader() })
    }
}

export default new UserService()
