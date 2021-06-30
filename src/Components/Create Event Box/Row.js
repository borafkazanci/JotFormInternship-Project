import './Create.css';
import { AiFillDelete } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';

function Row({ data, deleteRow }) {
    const { type: typeCheck, title: titleCheck, number: numberCheck, price: priceCheck, dates: datesArr } = data;

    return (
        <tbody>
            <tr>
                <td>
                    {
                        typeCheck !== '' ?
                            typeCheck.substring(0, 4) :
                            null
                    }
                </td>
                <td>
                    {
                        titleCheck
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            typeCheck.substring(5) :
                            null
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            (typeCheck.substring(0, 4) === 'cate' ?
                                null :
                                numberCheck) :
                            null
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            (typeCheck.substring(0, 4) === 'cate' ?
                                null :
                                <p>${priceCheck}</p>) :
                            null
                    }
                </td>
                <td>
                    <div className="type-box">
                        <label><BiShow className="show-dates-btn" /></label>
                        <span className="type-box-text-long">
                            {
                                datesArr.map((data) => {
                                    return (
                                        <h5 key={data.day + data.number} >
                                            Day:{data.day} - Number:{data.number}
                                        </h5>
                                    );
                                })
                            }
                        </span>
                    </div>
                </td>
                <td>
                    <div className="type-box">
                        <button onClick={() => deleteRow(data)}>
                            <AiFillDelete />
                        </button>
                        <span className="type-box-text">
                            Delete row
                        </span>
                    </div>
                </td>
            </tr>
        </tbody>
    );
}

export default Row;