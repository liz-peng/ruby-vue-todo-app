import { mount, shallowMount } from '@vue/test-utils'
import App from 'packs/test.vue'

describe('App', () => {
  const wrapper = mount(App)

  it('has checkbox', () => {
    expect(wrapper.contains('input[type="checkbox"]')).toBe(true)
  })

  it('change done/todo status after click the checkbox', async () => {
    expect(wrapper.vm.task.completed).toBe(true) // task is done
    const checkbox = wrapper.find('input[type="checkbox"]')
    checkbox.trigger('click')
    await wrapper.vm.$forceUpdate();
    expect(wrapper.vm.task.completed).toBe(false)
    expect(wrapper.html()).toContain('<div class="todo">') // task moves to todo
  })
})