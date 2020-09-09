import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const DownloadPanel = ({
    title,
    subtitle,
    catalogue,
    doDownload
}) => {
    const [options, setOptions] = useState([]);
    const [years, setYears] = useState([]);

    const generateOptions = () => {
        let temp = catalogue.sort();
        const o = temp.map((c) => (
            <Button
                outline
                active={years.includes(String(c))}
                color="info"
                id={c}
                onClick={onOptionsClick}
            >
                {c}
            </Button>
        ));
        setOptions(o);
    }

    useEffect(() => {
        generateOptions();// eslint-disable-next-line
    },[catalogue, years]);

    const onDownload = () => {
        if(years.length > 0)
            doDownload(years.join('-'))
    }

    const onOptionsClick = (selected) => {
        selected = selected.target.id
        const index = years.indexOf(selected);
        if (index < 0)
            years.push(selected);
        else
            years.splice(index, 1);
            setYears([...years]);
    }

    return(
        <div className="download-container">
            <h4>{title}</h4>
            <div className='download-options'>
                <h5>{subtitle}</h5>
                {options}
            </div>
            <Button
            size="md"
            color="success"
            onClick={ onDownload }>
                Download
            </Button>
        </div>
    );
}

DownloadPanel.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    catalogue: PropTypes.array,
    doDownload: PropTypes.func
}

DownloadPanel.defaultProps = {
    title: '',
    subtitle: '',
    catalogue: []
  }

export default DownloadPanel;