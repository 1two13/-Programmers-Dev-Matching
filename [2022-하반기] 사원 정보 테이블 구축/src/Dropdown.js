import Pagination from './Pagination.js';
import Table from './Table.js';

class Dropdown {
  #data;
  #options;

  constructor(data, options) {
    this.#data = data;
    this.#options = options;
    this.render();
  }

  render() {
    const select = document.createElement('select');
    select.setAttribute('id', 'cntPerPage');

    for (let i in this.#options) {
      const option = document.createElement('option');
      option.setAttribute('value', this.#options[i]);
      option.appendChild(document.createTextNode(this.#options[i] + '개씩'));
      select.appendChild(option);
    }

    document.getElementById('dropdown').appendChild(select);
    select.addEventListener('change', (event) => {
      let pagePerCnt = Number(event.target.value);
      let maxPageCnt = pagePerCnt === 15 ? 4 : 7;
      let currentPage = 1;

      // select 클릭할 때마다 pagination과 table 초기화
      document.getElementById('pagination').innerHTML = '';
      document.getElementById('table').innerHTML = '';
      // 새로운 데이터 화면에 그리기
      new Table(this.#data.slice(0, pagePerCnt));
      new Pagination(this.#data).setPaginationButtons(maxPageCnt, currentPage);
    });
  }
}

export default Dropdown;
