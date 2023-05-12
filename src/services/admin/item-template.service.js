import axios from 'axios'
import authHeader from '../auth-header'

const API_URL = process.env.VUE_APP_API_URL

class ItemTemplateService
{
    all() {
        return axios.get(API_URL + '/admin/room-item-templates', { headers: authHeader() })
    }

    allowListForProject(id) {
        return axios.get(API_URL + '/admin/room-item-templates/allowList/' + id, { headers: authHeader() })
    }

    getAllForTemplate(templateId) {
        return axios.get(API_URL + '/admin/room-item-templates/template/' + templateId, { headers: authHeader() })
    }

    getAllForItem(itemId) {
        return axios.get(API_URL + '/admin/room-item-templates/item/' + itemId, { headers: authHeader() })
    }

    get(id) {
        return axios.get(API_URL + '/admin/room-item-templates/' + id, { headers: authHeader() })
    }

    save(item) {

        let formData = new FormData()
        formData.append('active', item.active)
        formData.append('name', item.name)

        if (typeof item.file.name !== 'undefined') {
            formData.append('file', item.file)
        }

        if (item.id > 0) {
            formData.append('id', item.id)
            return axios.post(API_URL + '/admin/room-item-template/update', formData, { headers: authHeader() })
        } else {
            return axios.post(API_URL + '/admin/room-item-template/create', formData, { headers: authHeader() })
        }
    }
}

export default new ItemTemplateService()
