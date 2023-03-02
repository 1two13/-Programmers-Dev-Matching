import Table from './Table.js';

class Pagination {
  #data;

  constructor(data) {
    this.#data = data;
  }

  render() {
    // 버튼의 개수
    let maxPageCnt = 7;
    // 현재 페이지 번호
    let currentPage = 1;

    this.setPaginationButtons(maxPageCnt, currentPage);
  }

  setPaginationButtons = (maxPageCnt, currentPage) => {
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

      document.getElementById('pagination').appendChild(button);
      button.addEventListener('click', () => {
        if (i === 0) currentPage = 1;
        else if (i === maxPageCnt - 1) currentPage = maxPageCnt - 2;
        else currentPage = i;

        this.paginationButtonClicked(
          maxPageCnt,
          currentPage,
          document.getElementById('pagination').children
        );
      });
    }
  };

  paginationButtonClicked = (maxPageCnt, currentPage, button) => {
    let end;
    let start;
    if (maxPageCnt === 4) {
      end = currentPage * 15;
      start = end - 15;
    } else if (maxPageCnt === 7) {
      end = currentPage * 5;
      start = end - 5;
    }

    // 버튼 클릭할 때마다 table 초기화
    document.getElementById('table').innerHTML = '';
    this.paginationButtonsStyle(maxPageCnt, currentPage, button);
    this.sliceData(start, end);
  };

  paginationButtonsStyle = (maxPageCnt, currentPage, button) => {
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
