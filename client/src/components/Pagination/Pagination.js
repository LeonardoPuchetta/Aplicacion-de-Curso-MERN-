import React from 'react';
import './Pagination.scss';

import {Pagination as PaginationAntd} from 'antd';

export default function Pagination(props) {

    const {posts,location,history} = props ;
    //para obtener pagina como entero
    const currentPage = parseInt(posts.page);


    //funcion para recargar lista sin 
    //recargar pagina 
    const onChangePage = newPage =>{
        history.push(`${location.pathname}?page=${newPage}`)
    }

    return (
      <PaginationAntd
        defaultCurrent={currentPage}
        total={posts.total}
        pageSize={posts.limit}
        onChange={newPage => onChangePage(newPage)}
        className='pagination'
        />

    )
}
