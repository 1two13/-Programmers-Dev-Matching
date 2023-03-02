import Pagination from './src/Pagination.js';
import Table from './src/Table.js';
import Dropdown from './src/Dropdown.js';

class App {
  async render() {
    const response = await fetch('./src/data.json');

    if (response.ok) {
      const fetchedData = await response.json();
      // 첫 화면에서 table 5개 보여주기
      new Table(fetchedData.slice(0, 5));
      new Pagination(fetchedData).render();
      new Dropdown(fetchedData, [5, 15]);
    }
  }
}

export default App;
