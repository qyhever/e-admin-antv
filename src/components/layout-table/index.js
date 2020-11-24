import { h } from 'vue'
import {
  SyncOutlined,
  FilterOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue'
import { Table } from 'ant-design-vue'
import './index.less'

export default {
  name: 'LayoutTable',
  components: {
    SyncOutlined,
    FilterOutlined,
    ColumnHeightOutlined,
    FullscreenOutlined
  },
  props: {
    tableTitle: {
      type: String
    },
    columns: {
      type: Array
    },
    dataSource: {
      type: Array
    },
    pagination: {
      type: [Object, Boolean]
    }
  },
  data() {
    return {}
  },
  render() {
    const {
      search = () => {}, // eslint-disable-line
      buttons = () => {}, // eslint-disable-line
      extraIcons = () => {}, // eslint-disable-line
      ...restSlots
    } = this.$slots
    const tableProps = {
      columns: this.columns,
      dataSource: this.dataSource,
      pagination: this.pagination
    }
    return (
      <div class="layout-table">
        <div class="layout-table__header">
          {search()}
        </div>
        <div class="layout-table__toolbar">
          <div class="toolbar-left">{this.tableTitle}</div>
          <div class="toolbar-right">
            <div class="toolbar-right__buttons">
              {buttons()}
            </div>
            {this.$slots.buttons ? <a-divider type="vertical" /> : null}
            <div class="toolbar-right__icons">
              <a-tooltip title="刷新" placement="bottom">
                <SyncOutlined />
              </a-tooltip>
              <a-tooltip title="过滤" placement="left">
                <FilterOutlined />
              </a-tooltip>
              <a-tooltip title="密度" placement="left">
                <ColumnHeightOutlined />
              </a-tooltip>
              <a-tooltip title="全屏" placement="bottom">
                <FullscreenOutlined />
              </a-tooltip>
              {extraIcons()}
            </div>
          </div>
        </div>
        {
          h(
            Table,
            tableProps,
            restSlots
          )
        }
      </div>
    )
  }
}
