import React  from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function Chart(props) {
    // const [count, setCount] = useState(0);
    return (
        <LineChart
            width={700}
            height={400}
            data={props.data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <XAxis dataKey="value" stroke="#8884d8"/>
            <YAxis dataKey="value" stroke="#8884d8"/>
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="value" stroke="#ff7300"/>
            <Line type="monotone" dataKey="value" stroke="#387908"/>
        </LineChart>
    );
}
export default Chart;