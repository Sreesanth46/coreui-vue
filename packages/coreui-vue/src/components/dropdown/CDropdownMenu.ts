import { defineComponent, h, inject, Ref } from 'vue'

import { CConditionalTeleport } from '../conditional-teleport'
import { getAlignmentClassNames } from './utils'

const CDropdownMenu = defineComponent({
  name: 'CDropdownMenu',
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     * @values 'div', 'ul'
     */
    component: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const dropdownMenuRef = inject('dropdownMenuRef') as Ref<HTMLElement>
    const config = inject('config') as any // eslint-disable-line @typescript-eslint/no-explicit-any
    const visible = inject('visible') as Ref<boolean>

    const { alignment, container, dark, popper, teleport } = config

    return () =>
      h(
        CConditionalTeleport,
        {
          container: container,
          teleport: teleport,
        },
        {
          default: () =>
            h(
              props.component,
              {
                class: [
                  'dropdown-menu',
                  { show: visible.value },
                  getAlignmentClassNames(alignment),
                ],
                ...((typeof alignment === 'object' || !popper) && {
                  'data-coreui-popper': 'static',
                }),
                ...(dark && { 'data-coreui-theme': 'dark' }),
                ref: dropdownMenuRef,
              },
              props.component === 'ul'
                ? slots.default && slots.default().map((vnode) => h('li', {}, vnode))
                : slots.default && slots.default(),
            ),
        },
      )
  },
})

export { CDropdownMenu }
