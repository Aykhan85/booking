import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './header.css'
import { useNavigate } from 'react-router-dom';

export default function Header({ type }) {

    const [openDate, setOpenDate] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [destination, setDestination] = useState('')
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const navigate = useNavigate()

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return { ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1 }
        })
    };

    const handleSearch = () => {
        navigate('/hotels', { state: { date, destination, options } })
    }

    return (
        <div className='header'>
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rental</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? it's Genuis.</h1>
                        <p className='headerDescription'>Get rewarded for your travels - unlock instant saving of 10% or more with a free Lamabooking account</p>
                        <button className="headerBtn">Sign in / Register</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input
                                    type="text"
                                    placeholder='Where are you going'
                                    className='headerSearchInput'
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span className='headerSearchText' onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{
                                    `${options.adult} adult | ${options.children} children |  ${options.room} room`
                                }</span>
                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className='optionText'>Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" onClick={() => handleOption('adult', 'd')} disabled={options.adult <= 1}>-</button>
                                            <span className='optionCounterNumber'>{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className='optionText'>Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" onClick={() => handleOption('children', 'd')} disabled={options.children <= 0}>-</button>
                                            <span className='optionCounterNumber'>{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className='optionText'>Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" onClick={() => handleOption('room', 'd')} disabled={options.room <= 1}>-</button>
                                            <span className='optionCounterNumber'>{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }

            </div>

        </div>
    )
}
