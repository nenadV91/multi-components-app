import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = (props) => {
    const [indexes, setIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const fetchValues = async () => {
        const res = await axios.get('/api/values/current');
        setValues(res.data);
    }

    const fetchIndexes = async () => {
        const res = await axios.get('/api/values/all');
        setIndexes(res.data);
    }

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    const renderIndexes = () => indexes.map(({ number }) => number).join(', ')
    const renderValues = () => 
        Object.entries(values).map(([key, value]) => (
            <div key={key}> 
                {key} - {value}
            </div>
        ))

    const handleSubmit = async event => {
        event.preventDefault();
        await axios.post('/api/values', { index })
        setIndex('');
    }

    const handleChange = event => {
        setIndex(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter index:</label>
                <input onChange={handleChange} type="text"/>
                <button>Submit</button>
            </form>

            <h4>Seen indexes:</h4>
            <div>{renderIndexes()}</div>

            <h4>Calculated values:</h4>
            <div>{renderValues()}</div>
        </div>
    )
}

export default Fib;