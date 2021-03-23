import React, { Component, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvent } from 'react-leaflet'
import { Link, animateScroll as scroll } from 'react-scroll';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from "react-device-detect";
import CustomMarker from './marker.js'
// import LazyLoad from 'react-lazyload';

//http://rudy.tile.basecamp.tw/{z}/{x}/{y}.png
//https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png

const TILE_MAP = {
  '魯地圖(黑白)': 'https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png',
  '魯地圖(彩色)': 'http://rudy.tile.basecamp.tw/{z}/{x}/{y}.png',
}

const PanTo = ({ currentCenter }) => {
  const map = useMap();
  map.panTo(currentCenter, { animate: true })
  console.log('currentCenter:', currentCenter)
  return null;
};

class GeoMap extends Component {
  state = {
    zoom: 15,
    loading: true,
    showImage: false,
    isMobile: false,
    tile: Object.keys(TILE_MAP)[0],
  }
  animateRef = React.createRef();

  componentDidMount() {
    this.handleData();

    // tricks: 讓 marker icon 先 load
    setTimeout(() => this.setState({ showImage: true }), 0);
  }

  initFirstRecord() {
    const firstMarker = _.get(document.getElementsByClassName('leaflet-marker-icon'), [0]);
    if (firstMarker) {
      firstMarker.click();
      scroll.scrollToTop();
    }
  }

  setMobileDivHeight() {
    if (!isMobile) return;

    const mapHeight = document.getElementsByClassName('leaflet-container')[0].clientHeight;
    document.getElementById("mapBlocker").style.height = `${mapHeight + 48}px`;
    [...document.getElementsByClassName('date-first-point')].forEach(element => element.style.top = `${mapHeight + 48}px`);
  }

  handleData = () => {
    const { trackInfo: { points } = {} } = this.props;
    const point2Coordinate = _.chain(points)
      .keyBy('timeStr')
      .mapValues(o => [o.latitude, o.longitude])
      .value();

    this.setState({
      point2Coordinate,
      currentPoint: points[0].timeStr
    });
  }

  render() {
    const { id, tracks, trackInfo: { summary, points, overviews } = {} } = this.props;
    const { currentPoint, showImage, point2Coordinate, tile } = this.state;
    const defaultPosition = [23.575272, 120.770131];
    const originalPostion = points
      ? [points[0].latitude, points[0].longitude]
      : defaultPosition;
    let day = 0;
    console.log('render', id)
    console.log('points', points)
    console.log('originalPostion', originalPostion)
    return (
      <div className="outer-container">
        <Form id='tileSelect'>
          <Form.Control as="select" onChange={event => this.setState({ tile: event.target.value })}>
            {Object.keys(TILE_MAP).map(name => <option>{name}</option>)}
          </Form.Control>
        </Form>
        <FontAwesomeIcon icon={faChevronUp} id="toTopButton" transform="shrink-6" onClick={() => scroll.scrollToTop()} />
        <MapContainer {...{
          key: tile,
          center: originalPostion,
          zoom: 15,
          whenCreated: () => {
            this.setMobileDivHeight();
            this.initFirstRecord();
          },
        }}>
          <TileLayer
            attribution='&amp;copy <a href="https://rudy.basecamp.tw/taiwan_topo.html" style="">Taiwan TOPO</a> contributors'
            url={TILE_MAP[tile]}
          />
          <GeoJSON data={tracks} />
          <PanTo currentCenter={point2Coordinate && point2Coordinate[currentPoint]} />
          {points.map(point => {
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
                      {name}{' '}
                      <span><FontAwesomeIcon icon={faSearch}/></span>
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
                {_.map(_.groupBy(points, point => point.timeStr.substring(0, 8)), (value, date) => {
                  const overview = overviews[date];
                  day++;
                  return <div>
                    {overviews[date] &&
                      <Row className='date-first-point' >
                        <Col xs={2} className='date-block'>
                          <div className='date-day'>{`Day ${day}`}</div>
                          <div className='date-number'>{dayjs(date).format('MM.DD')}</div>
                        </Col>
                        <Col className='date-schedule'>
                          {overview}
                        </Col>
                      </Row>
                    }
                    {
                      value.map(point => <Row key={point.timeStr}>
                        <Col xs={2} className='time'>
                          <div id="vertical-timeline"></div>
                          <div className='circle' style={point.timeStr === currentPoint ? { backgroundColor: '#F97F75' } : {}}></div>
                          <p>{dayjs(point.time).format('HH:mm')}</p>
                        </Col>
                        <Col >
                          <div className='triangle'></div>
                          <div className="record" name={point.timeStr} key={point.time}>
                            <p className="title">{point.name}</p>
                            {point.description
                              ? <p className="description">{point.description}</p>
                              : null
                            }
                            <ImageWrapper src={`/images/${id}/${point.timeStr}.jpg`} alt={point.timeStr} showImage={showImage}/>
                            {/* <img src={`/images/${id}/${point.timeStr}.jpg`} alt={point.timeStr} /> */}
                            {/* <ImageWrapper src={`/images/${id}/${point.timeStr}.jpg`} alt={point.timeStr}/> */}
                          </div>
                        </Col>
                      </Row>)
                    }
                  </div>
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
    { error || !props.showImage
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
