import './list.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchItem from '../../components/searchItem/SearchItem'

export default function List() {

    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [options, setOptions] = useState(location.state.options)
    const [openDate, setOpenDate] = useState(false)
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="listSearchTitle">Search</h1>
                        <div className="listSearchItem">
                            <label>Destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="listSearchItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)} className='listSearchSpan'>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
                            {openDate &&
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />
                            }
                        </div>
                        <div className="listSearchOption">

                            <div className="listSearchOptionTitle">
                                <label>Options</label>
                            </div>
                            <div className="listSearchOptionItem">
                                <span className='listSearchOptionText'>
                                    Min price <small>per night</small>
                                </span>
                                <input type="text" className="listItemOptionInput" />
                            </div>
                            <div className="listSearchOptionItem">
                                <span className='listSearchOptionText'>
                                    Max price <small>per night</small>
                                </span>
                                <input type="text" className="listItemOptionInput" />
                            </div>
                            <div className="listSearchOptionItem">
                                <span className='listSearchOptionText'>
                                    Adult
                                </span>
                                <input type="number" min={1} className="listItemOptionInput" placeholder={options.adult} />
                            </div>
                            <div className="listSearchOptionItem">
                                <span className='listSearchOptionText'>
                                    Children
                                </span>
                                <input type="number" min={0} className="listItemOptionInput" placeholder={options.children} />
                            </div>
                            <div className="listSearchOptionItem">
                                <span className='listSearchOptionText'>
                                    Room
                                </span>
                                <input type="number" min={1} className="listItemOptionInput" placeholder={options.room} />
                            </div>

                        </div>
                        <button className='searchBtn'>Search</button>
                    </div>
                    <div className="listResult">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>
        </div>
    )
}
