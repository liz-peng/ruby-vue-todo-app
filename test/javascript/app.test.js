import { mount, shallowMount } from '@vue/test-utils';
import App from 'packs/test.vue';

describe('App', () => {
  const wrapper = mount(App);

  it('has checkbox', () => {
    expect(wrapper.contains('input[type="checkbox"]')).toBe(true);
  })

  it('change todo/done status after click the checkbox', async () => {
    const wrapperArray = wrapper.findAll('.task');
    // task is done
    expect(wrapper.vm.tasks[0].completed).toBe(true);
    expect(wrapper.vm.tasks[1].completed).toBe(true);

    // click one checkbox
    const checkbox = wrapper.findAll('input[type="checkbox"]');
    checkbox.at(0).trigger('click');
    await wrapper.vm.$forceUpdate();

    // task moves to todo
    expect(wrapper.vm.tasks[0].completed).toBe(false);
    expect(wrapper.vm.tasks[1].completed).toBe(true);
    expect(wrapper.html()).toContain('<div class="ui cards todo">');
  })
})

