import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chartjs from 'chart.js';
import chartConfig from './chartConfig';
import selectors from '../selectors';

const WordsStatistics = ({ data }) => {
    const chartContainer = useRef(null);
    const labelFn = (tooltipItem) => {
        const labelData = data.toolTipsData[tooltipItem.index];
        return [
            `Learning words: ${data.data[tooltipItem.index]}`,
            `Right answers: ${labelData.success}`,
            `Wrong answers: ${labelData.wrong}`,
            `Max sequence: ${labelData.maxSequence}`,
        ];
    };
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];
    const config = useMemo(() => {
        const initConf = chartConfig();
        initConf.data.labels = data.dates;
        initConf.data.datasets[0].data = data.data;
        initConf.options.tooltips.callbacks.label = labelFn;
        while (data.dates.length > initConf.data.datasets[0].backgroundColor.length) {
            initConf.data.datasets[0].backgroundColor.push(...backgroundColor);
        }
        while (data.dates.length > initConf.data.datasets[0].borderColor.length) {
            initConf.data.datasets[0].borderColor.push(...borderColor);
        }
        return initConf;
    }, [data]);

    useEffect(() => {
        let newChartInstance = null;
        if (chartContainer && chartContainer.current) {
            newChartInstance = new Chartjs(chartContainer.current, config);
        }
        return () => {
            if (newChartInstance !== null) {
                newChartInstance = null;
            }
        };
    }, [chartContainer]);

    return (
        <>
            <div>
                <canvas ref={chartContainer} />
            </div>
            <p>{`You alredy learned ${data.persent}% words`}</p>
        </>
    );
};
const mapStateToProps = (state) => ({
    data: selectors.mainGameStats(state),
});

WordsStatistics.propTypes = {
    data: PropTypes.shape({
        dates: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        persent: PropTypes.string.isRequired,
        toolTipsData: PropTypes.arrayOf(
            PropTypes.exact({
                wordPerDay: PropTypes.number.isRequired,
                success: PropTypes.number.isRequired,
                wrong: PropTypes.number.isRequired,
                maxSequence: PropTypes.number.isRequired,
            })
        ),
    }).isRequired,
};

export default connect(mapStateToProps)(WordsStatistics);
