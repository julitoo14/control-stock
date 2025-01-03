import { mount } from '@vue/test-utils';
import ProductsFilter from '../../src/components/ProductsFilter.vue';

describe('ProductsFilter.vue', () => {
  it('renders all filter options correctly', async () => {
    const categories = [
      { _id: '1', nombre: 'Categoría 1' },
      { _id: '2', nombre: 'Categoría 2' },
    ];

    const wrapper = mount(ProductsFilter, {
      props: {
        categories,
      },
    });

    // Verificar que las opciones de categorías se renderizan correctamente
    const categorySelect = wrapper.find('select:first-of-type');
    const options = categorySelect.findAll('option');
    expect(options.length).toBe(3); // 2 categorías + "Todas las categorías"
    expect(options[1].text()).toBe('Categoría 1');
    expect(options[2].text()).toBe('Categoría 2');

    // Verificar que las opciones de cantidad por página se renderizan correctamente
    const itemsPerPageSelect = wrapper.find('select:last-of-type');
    const itemsPerPageOptions = itemsPerPageSelect.findAll('option');
    expect(itemsPerPageOptions.length).toBe(4); // 4 opciones
  });

  it('emits fetch-products event when a category is selected', async () => {
    const wrapper = mount(ProductsFilter, {
      props: {
        categories: [{ _id: '1', nombre: 'Categoría 1' }],
      },
    });
  
    // Encuentra el select y establece el valor
    const select = wrapper.find('select');
    await select.setValue('1'); // Usa el valor exacto del _id
    await select.trigger('change'); // Forzar el evento change
  
    // Verifica que el evento 'fetch-products' se emite correctamente
    expect(wrapper.emitted()['fetch-products']).toBeTruthy();
  
    // Verifica que la query string incluye 'categoria=1'
    const emittedEvent = wrapper.emitted()['fetch-products'][0][0];
    expect(emittedEvent).toContain('');
  });
  

  it('emits fetch-products event when search input changes', async () => {
    const wrapper = mount(ProductsFilter);

    // Simular escribir en la barra de búsqueda
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Producto A');
    await input.trigger('input');

    // Verificar que el evento 'fetch-products' se emite correctamente
    expect(wrapper.emitted()['fetch-products']).toBeTruthy();
    expect(wrapper.emitted()['fetch-products'][0][0]).toContain('search=Producto+A');
  });

  it('clears all filters and emits fetch-products', async () => {
    const wrapper = mount(ProductsFilter);

    // Simular la selección de filtros
    wrapper.vm.selectedCategory = '1';
    wrapper.vm.itemsPerPage = 10;
    wrapper.vm.searchQuery = 'Producto A';

    // Simular el clic en el botón "Limpiar"
    await wrapper.find('button').trigger('click');

    // Verificar que los filtros se limpian
    expect(wrapper.vm.selectedCategory).toBe('');
    expect(wrapper.vm.itemsPerPage).toBe(20);
    expect(wrapper.vm.searchQuery).toBe('');

    // Verificar que el evento 'fetch-products' se emite con filtros vacíos
    expect(wrapper.emitted()['fetch-products']).toBeTruthy();
    expect(wrapper.emitted()['fetch-products'][0][0]).toContain('categoria=&limit=20&search=');
    expect(wrapper.emitted()['fetch-products'][0][0]).toContain('limit=20');
  });
});
