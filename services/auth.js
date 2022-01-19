import axios from 'axios'

function login(data) {
  if (data.username && data.password) {
    axios.post('api/login_brand', {
      slug: data.username,
      password: data.password
    }).then(() => {
      return true
    })
  } else if (!data.email) {
    throw "Email tidak boleh kosong !"
  } else if (!data.password) {
    throw "Password tidak boleh kosong !"
  }
}

export default login
