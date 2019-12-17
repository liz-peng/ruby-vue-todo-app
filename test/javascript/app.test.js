import { mount } from '@vue/test-utils'
import App from 'packs/app.js'

describe('App', () => {
  const wrapper = mount(App)
  
  it('has a checkbox', () => {
    expect(wrapper.contains('input[type="checkbox"]')).toBe(true)
  })

  it('toggle the checkbox', () => {
    expect(wrapper.vm.task.completed).toBe(true)
    const checkbox = wrapper.find('input[type="checkbox"]')
    checkbox.trigger('click')
    expect(wrapper.vm.task.completed).toBe(false)
  })
})

