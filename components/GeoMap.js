import React, { Component, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvent } from 'react-leaflet'
import L from 'leaflet';
import { Link, animateScroll as scroll } from 'react-scroll';
import moment from 'moment';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from "react-device-detect";
import CustomMarker from './marker.js'
// import LazyLoad from 'react-lazyload';
// import 'leaflet/dist/leaflet.css'
//http://rudy.tile.basecamp.tw/{z}/{x}/{y}.png
//https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png
const PanTo = ({ currentCenter }) => {
    const map = useMap();
    map.panTo(currentCenter, { animate: true })
    console.log('currentCenter:', currentCenter)
    return null;
};

class GeoMap extends Component {
    state = {
        zoom: 15,
        overview: this.props.overview,
        loading: true,
        imageFlag: false,
        inBrowser: false,
    }
    animateRef = React.createRef();
    markers = {};

    componentDidMount() {
        this.handleData();
        if (isMobile) {
            new ResizeObserver(this.setDivHeight).observe(document.getElementsByClassName('leaflet-container')[0])
        }
        setTimeout(() => {
            if (document.getElementsByClassName('leaflet-marker-icon').length > 0)
                document.getElementsByClassName('leaflet-marker-icon')[0].click();
            scroll.scrollToTop();
        }, 1000)
    }

    setDivHeight() {
        const mapHeight = document.getElementsByClassName('leaflet-container')[0].clientHeight;
        document.getElementById("mapBlocker").style.height = `${mapHeight + 48}px`;
        [...document.getElementsByClassName('date-first-point')].forEach(element => element.style.top = `${mapHeight + 48}px`)
    }

    handleData = () => {
        const { id, tracks, trackInfo: { summary, points, overviews } = {}} = this.props;
        const dates = [];
        _.forEach(points, point => {
            const { time } = point;
            point.timeStr = moment(time).format('YYYYMMDD_HHmmss');

            // 產生 layout 的日期欄位
            const date = point.timeStr.substring(0, 8);
            if (!dates.includes(date)) {
                dates.push(date);
                const index = dates.indexOf(date);
                point.dateFirstPoint = {
                    date: moment(time).format('MM.DD'),
                    overview: overviews[index],
                    index: index + 1,        // 從 Day1 開始算,
                };
            }
        })
        const point2Coordinate = _.chain(points)
                                  .keyBy(o => moment(o.time).format('YYYYMMDD_HHmmss'))
                                  .mapValues(o => [o.latitude, o.longitude])
                                  .value()

        this.setState({
            point2Coordinate,
            currentPoint: points[0].timeStr
        });
    }


    render() {
        const { id, tracks, trackInfo: { summary, points, overviews } = {}} = this.props;
        const { zoom, currentPoint, loading, imageFlag, point2Coordinate } = this.state
        const originalPostion = points
            ? [points[0].latitude, points[0].longitude]
            : [23.575272, 120.770131];

        return (
            <div className="outer-container">
                <FontAwesomeIcon icon={faChevronUp} id="toTopButton" transform="shrink-6" onClick={() =>  scroll.scrollToTop()}/>
                <MapContainer {...{
                    center: originalPostion,
                    zoom: 15,
                }}>
                    <TileLayer
                        attribution='&amp;copy <a href="//rudy.basecamp.tw/taiwan_topo.html" style="">Taiwan TOPO</a> contributors'
                        url="https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png"
                    />
                    <GeoJSON data={tracks} />
                    <PanTo currentCenter={point2Coordinate && point2Coordinate[currentPoint]}/>

                    {points.map((point, idx) => {
                        const { timeStr, time, name, latitude, longitude } = point;
                        return (
                            <Link {...{
                                key: time,
                                to: timeStr,
                                spy: true,
                                activeClass: "active",
                                offset: isMobile ? -400 : -340,
                                smooth: true,
                                duration: 500,
                                onSetActive: to => this.setState({ currentPoint: to }),
                            }}>
                                <Marker {...{
                                    position: [latitude, longitude],
                                    icon: CustomMarker({
                                        icon: currentPoint === timeStr ? 'red' : 'blue',
                                        size: isMobile ? 'xs' : 'md',
                                    }),
                                }}>
                                    <Popup autoPan={false}>
                                        <div className='popup-content'>
                                            {`${name}  `}
                                            <span><i className="fas fa-search"></i></span>
                                        </div>
                                    </Popup>
                                </Marker>
                            </Link>
                        )
                    })}
                </MapContainer>
                <Container fluid>
                    <Row>
                        <Col id="mapBlocker" style={{ position: 'static' }} xs={12} sm={6}>
                            <div className="element"  ></div>
                        </Col>
                        <Col xs={12} sm={6} >
                            <div className='summary' name="summary">
                                <h3>{summary.title}</h3>
                                <p>{summary.content}</p>
                            </div>
                            <div id="record-container">
                                {points.map((point, idx) => {
                                    const { time, name, description, dateFirstPoint } = point;
                                    return <>
                                            {dateFirstPoint
                                                ? <Row className='date-first-point' >
                                                    <Col xs={2} className='date-block'>
                                                        <div className='date-day'>{`Day ${dateFirstPoint.index}`}</div>
                                                        <div className='date-number'>{dateFirstPoint.date}</div>
                                                    </Col>
                                                    <Col className='date-schedule'>
                                                        {dateFirstPoint.overview}
                                                    </Col>
                                                </Row>
                                                : null
                                            }
                                            <Row>
                                                <Col xs={2} className='time'>
                                                    <div id="vertical-timeline"></div>
                                                    <div className='circle' style={point.timeStr === currentPoint ? { backgroundColor: '#F97F75' } : {}}></div>
                                                    <p>{moment(time).format('HH:mm')}</p>
                                                </Col>
                                                <Col >
                                                    <div className='triangle'></div>
                                                    <div className="record" name={point.timeStr} key={time}>
                                                        <p className="title">{name}</p>
                                                        {description
                                                            ? <p className="description">{description}</p>
                                                            : null
                                                        }
                                                        <ImageWrapper src={`/images/${id}/${point.timeStr}.jpg`} alt="" />
                                                        {/* <img src={`/images/${id}/${point.timeStr}.jpg`} alt={point.timeStr} /> */}
                                                        {/* <ImageWrapper src={`/images/${id}/${point.timeStr}.jpg`} alt={point.timeStr}/> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>)
    }
}

const ImageWrapper = props => {
    const [error, setError] = useState(false)
    return (<>
        {
            error
                ? null
                : <img {...{
                    src: props.src,
                    alt: props.alt,
                    onError: () => setError(true),
                }} />
        }
        {/* <LazyLoad height={200} offset={100}> */}
                {/* <img src={imagesMap.imagesMap[`${point.timeStr}.jpg`]} alt={point.timeStr} /> */}
                {/* <img src={require(`../public/image/${point.timeStr}.jpg`)} alt={point.timeStr} /> */}
                {/* <img src={props.props} alt={props.alt} /> */}
        {/* </LazyLoad> */}
    </>)
}
export default GeoMap
