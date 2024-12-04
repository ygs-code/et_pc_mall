//AMBA-注释
import Vue from 'vue'
import '@/assets/theme/element-variables.scss'
import {
  Loading,
  Button,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  Dialog,
  Form,
  FormItem,
  Image,
  Input,
  Message,
  MessageBox,
  Option,
  Pagination,
  Rate,
  Row,
  Select,
  TabPane,
  Tabs,
  Upload,
  Carousel,
  CarouselItem,
  InputNumber,
  DatePicker,
  TimeSelect,
  Divider,
  Steps,
  Step,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Button,
  Form,
  FormItem,
  Input,
  Upload,
  Dialog,
  Pagination,
  Checkbox,
  MessageBox,
  Message,
  Select,
  Option,
  Rate,
  Image,CheckboxGroup,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  InputNumber,
  DatePicker,
  TimeSelect,
  Divider,
  Steps,
  Step,
  Dropdown,
  DropdownMenu,
  DropdownItem
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
Vue.prototype.$message = Message
Vue.use(Loading.directive);
