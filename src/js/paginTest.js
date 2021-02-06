const ulTag = document.querySelector('ul');
let totalPages;

function pagination(totalPages, page) {
  let liTag = '';
  let beforePages = page - 1;
  let afterPages = page + 1;
  let activeLi;

  if (page > 1) {
    liTag += `<li class="left js-arrow-left" onclick="pagination(totalPages,${
      page - 1
    })"><span><i class=" arrow-left"></i>Prev</span></li>`;
  }
  if (page > 3) {
    liTag += `<li class="numb" onclick="pagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 4) {
      liTag += `<li class="dots"><span></span></li>`;
    }
  }
  if (page == totalPages) {
    beforePages = beforePages - 2;
  } else if (page == totalPages - 1) {
    beforePages = beforePages - 1;
  }
  if (page == 1) {
    afterPages = afterPages + 2;
  } else if (page == 2) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if ((pageLength = totalPages)) {
      continue;
    }
    if ((pageLength = 0)) {
      pageLength = pageLength + 1;
    }
    if (page == pageLength) {
      activeLi = 'active';
    } else {
      activLi = '';
    }
    liTag += `<li class="numb ${activeLi}" onclick="pagination(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }
  if (page < totalPages - 3) {
    if (page < totalPages - 4) {
      liTag += `<li class="dots"><span></span></li>`;
    }
    liTag += `<li class="numb ${activeLi}" onclick="pagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="right js-arrow-right" onclick=" pagination(totalPages, ${
      page + 1
    })"><span>Next<i class="arrow-right"></i></span></li>`;
  }
  ulTag.innerHtml = liTag;
}

pagination(totalPages, page);
