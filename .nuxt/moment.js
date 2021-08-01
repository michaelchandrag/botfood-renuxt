import moment from 'moment'

import 'moment/locale/id'

export default (ctx, inject) => {
  ctx.$moment = moment
  inject('moment', moment)
}
