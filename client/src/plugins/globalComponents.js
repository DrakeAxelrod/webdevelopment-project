import Badge from '../components/argon/Badge'
import BaseAlert from '../components/argon/BaseAlert'
import BaseButton from '../components/argon/BaseButton'
import BaseCheckbox from '../components/argon/BaseCheckbox'
import BaseInput from '../components/argon/BaseInput'
import BasePagination from '../components/argon/BasePagination'
import BaseProgress from '../components/argon/BaseProgress'
import BaseRadio from '../components/argon/BaseRadio'
import BaseSlider from '../components/argon/BaseSlider'
import BaseSwitch from '../components/argon/BaseSwitch'
import Card from '../components/argon/Card'
import Icon from '../components/argon/Icon'

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge)
    Vue.component(BaseAlert.name, BaseAlert)
    Vue.component(BaseButton.name, BaseButton)
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseCheckbox.name, BaseCheckbox)
    Vue.component(BasePagination.name, BasePagination)
    Vue.component(BaseProgress.name, BaseProgress)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(BaseSlider.name, BaseSlider)
    Vue.component(BaseSwitch.name, BaseSwitch)
    Vue.component(Card.name, Card)
    Vue.component(Icon.name, Icon)
  }
}
