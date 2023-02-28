import Table from './Table.js';

class Pagination {
  #data;
  #sliceData;

  constructor(data) {
    this.#data = data;
    this.#sliceData;
  }

  render() {
    // 버튼의 개수
    let maxPageCnt = 7;
    // 페이지 당 데이터 개수
    let pagePerCnt = 0;
    // 현재 페이지 번호
    let currentPage = 1;

    this.setPaginationBtns(maxPageCnt, pagePerCnt, currentPage);
  }

  setPaginationBtns = (maxPageCnt, pagePerCnt, currentPage) => {
    for (let i = 0; i < maxPageCnt; i++) {
      const button = document.createElement('button');

      if (i == 0) {
        button.setAttribute('class', 'arrow');
        button.appendChild(document.createTextNode('<<'));
      } else if (i === 1) {
        button.setAttribute('class', 'active');
        button.appendChild(document.createTextNode(i));
      } else if (i === maxPageCnt - 1) {
        button.setAttribute('class', 'arrow');
        button.appendChild(document.createTextNode('>>'));
      } else button.appendChild(document.createTextNode(i));

      button.setAttribute('id', 'paginationButton');
      document.getElementById('pagination').appendChild(button);
      button.addEventListener('click', () => {
        if (i === 0) currentPage = 1;
        else if (i === maxPageCnt - 1) currentPage = maxPageCnt - 2;
        else currentPage = i;

        this.paginationBtnClicked(
          maxPageCnt,
          pagePerCnt,
          currentPage,
          document.getElementById('pagination').children
        );
      });
    }
  };

  paginationBtnClicked = (maxPageCnt, pagePerCnt, currentPage, button) => {
    let end;
    let start;
    if (maxPageCnt === 4) {
      end = currentPage * 15;
      start = end - 15;
    } else if (maxPageCnt === 7) {
      end = currentPage * 5;
      start = end - 5;
    }

    // 초기화
    document.getElementById('table').innerHTML = '';
    this.paginationBtnsStyle(maxPageCnt, currentPage, button);
    this.sliceData(start, end);
  };

  paginationBtnsStyle = (maxPageCnt, currentPage, button) => {
    for (let i = 0; i < maxPageCnt; i++) {
      if (currentPage === i) {
        button[i].classList.add('active');
      } else button[i].classList.remove('active');
    }
  };

  sliceData(start, end) {
    new Table(this.#data.slice(start, end));
  }
}

export default Pagination;
