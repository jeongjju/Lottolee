import React from 'react';
import {useSortableData} from '../actions/sort'
import '../css/table.css'

export const CreateTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassRoundsFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <div>
        <table >
          <thead >
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('round')}
                  className={getClassRoundsFor('round')}
                >
                  회차
              </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('number')}
                  className={getClassRoundsFor('number')}
                >
                  번호
              </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('rank')}
                  className={getClassRoundsFor('rank')}
                >
                  등수
              </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('price')}
                  className={getClassRoundsFor('price')}
                >
                  당첨 금액
              </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.round} 회차</td>
                <td>{item.number}</td>
                <td>{item.rank}등</td>
                <td>₩{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    );
  };
  