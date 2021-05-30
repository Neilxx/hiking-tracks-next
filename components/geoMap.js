import React, { Component, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvent } from 'react-leaflet'
import { Link, animateScroll as scroll } from 'react-scroll';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faSearch, faLink } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from "react-device-detect";
import CustomMarker from './marker.js'
import LazyLoad from 'react-lazyload';

//http://rudy.tile.basecamp.tw/{z}/{x}/{y}.png
//https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png

const TILE_MAP = {
  '魯地圖(彩色)': 'https://rs.happyman.idv.tw/map/rudy/{z}/{x}/{y}.png  ',
  '魯地圖(黑白)': 'https://rs.happyman.idv.tw/map/moi_osm/{z}/{x}/{y}.png',
}

const PanTo = ({ currentCenter }) => {
  const map = useMap();
  map.panTo(currentCenter, { animate: true })
  return null;
};

class GeoMap extends Component {
  state = {
    zoom: 15,
    loading: true,
    isMobile: false,
    tile: Object.keys(TILE_MAP)[0],
  }
  animateRef = React.createRef();

  componentDidMount() {
    this.handleData();
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

    const leafletContainer = document.getElementsByClassName('leaflet-container')[0];
    if (!leafletContainer) return;

    const mapHeight = leafletContainer.clientHeight;
    document.getElementById("mapBlocker").style.height = `${mapHeight + 48}px`;
    [...document.getElementsByClassName('sticky-container')].forEach(element => element.style.top = `${mapHeight + 48}px`);
  }

  handleData = () => {
    const { trackInfo: { points } = {} } = this.props;
    const point2Coordinate = _.chain(points)
      .keyBy('timeStr')
      .mapValues(o => [o.latitude, o.longitude])
      .value();

    this.setState({
      point2Coordinate,
      currentPoint: points[0].timeStr,
    });
  }

  render() {
    const { id, tracks, trackInfo: { summary, points, overviews } = {} } = this.props;
    const { currentPoint, point2Coordinate, tile } = this.state;
    const defaultPosition = [23.575272, 120.770131];
    const originalPostion = points
      ? [points[0].latitude, points[0].longitude]
      : defaultPosition;
    let day = 0;
    return (
      <div className="outer-container">
        <Form id='tile-select' ref={ele => this.select = ele}>
          <Form.Control as="select" onChange={event => this.setState({ tile: event.target.value })}>
            {Object.keys(TILE_MAP).map(name => <option key={name}>{name}</option>)}
          </Form.Control>
        </Form>
        <FontAwesomeIcon icon={faChevronUp} id="to-top-btn" transform="shrink-6" onClick={() => scroll.scrollToTop()} />
        <MapContainer {...{
          key: tile,
          center: originalPostion,
          zoom: 15,
          tap: false,
          whenCreated: () => {
            this.initFirstRecord();
            if (isMobile) {
              new ResizeObserver(this.setMobileDivHeight).observe(document.getElementsByClassName('leaflet-container')[0]);
            }
          },
        }}>
          <TileLayer
            attribution='&amp;copy <a href="https://rudy.basecamp.tw/taiwan_topo.html" style="">Taiwan TOPO</a> contributors'
            url={TILE_MAP[tile]}
          />
          <GeoJSON data={tracks} />
          <PanTo currentCenter={point2Coordinate && point2Coordinate[currentPoint]} />
          {points.map(point => {
            const { timeStr, time, name, description, latitude, longitude } = point;
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
                      {name || `${description.substring(0 ,7)}...`}{' '}
                      <span><FontAwesomeIcon icon={faSearch}/></span>
                    </div>
                  </Popup>
                </Marker>
              </Link>
            )
          })}
        </MapContainer>
        <Container fluid id="record-container" >
          <Row>
            <Col id="mapBlocker" style={{ position: 'static' }} xs={12} sm={6}>
              <div className="element"  ></div>
            </Col>
            <Col xs={12} sm={6} >
              <div className='summary' name="summary">
                <h3>{summary.title}</h3>
                <div>
                  <Row>
                    <Col xs={12} sm={2}>日期：</Col>
                    <Col xs={12} sm={10}>{summary.date}<span>{summary.day}天</span></Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={2}>人員：</Col>
                    <Col xs={12} sm={10}>{summary.members}<span>{summary.memberNumber}人</span></Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={2}>實際行程：</Col>
                    <Col xs={12} sm={10}>
                      {Object.values(overviews).map((overview, index) => (
                        <div key={index}>D{index + 1}: {overview}</div>
                      ))}
                    </Col>
                  </Row>
                  {summary.references &&
                    <Row>
                      <Col xs={12} sm={2}>參考資料：</Col>
                      <Col xs={12} sm={10}>
                        {summary.references.map(({ name, url }, index) => (
                          <div className="reference" key={index}>
                            <a href={url} target="_blank">{name}<FontAwesomeIcon icon={faLink} transform="shrink-8" /></a>
                          </div>
                        ))}
                        </Col>
                    </Row>
                  }
                  {_.get(summary, ['others', 'length']) > 0 && <>
                    <Row>
                      <Col xs={12} sm={2}>其他：</Col>
                      <Col xs={12} sm={10}>
                        {summary.others.map((other, index) => <div key={index}>{other}</div>)}
                        </Col>
                    </Row>
                  </>}
                  <Row>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                      <TextRecordModal points={points} />
                      {summary.gpxFileName &&
                        <Button
                          variant="primary"
                          className="custom-btn"
                          href={`/tracks/${id}/${summary.gpxFileName}`}
                        >GPX 下載</Button>
                      }
                    </Col>
                  </Row>
                </div>
              </div>
              <div>
                {_.map(_.groupBy(points, point => point.timeStr.substring(0, 8)), (value, date) => {
                  const overview = overviews[date];
                  day++;
                  return <div key={day}>
                    {overviews[date] &&
                      <div className="sticky-container">
                        <Row className='sticky-date-block' >
                          <Col xs={2} className='date-block'>
                            <div className='date-day'>{`Day ${day}`}</div>
                            <div className='date-number'>{dayjs(date).format('MM.DD')}</div>
                          </Col>
                          <Col className='date-schedule'>
                            {overview}
                          </Col>
                        </Row>
                      </div>
                    }
                    {
                      value.map(point => <Row key={point.timeStr}>
                        <Col xs={1} className='time-block'>
                          <div id="vertical-timeline"></div>
                          <div className='time' style={point.timeStr === currentPoint ? { backgroundColor: '#F97F75' } : {}}>{dayjs(point.time).format('HH:mm')}</div>
                        </Col>
                        <Col className='record-block'>
                          <div className="record" name={point.timeStr} key={point.time}>
                            {point.name && <p className="title">{point.name}</p>}
                            {point.description && <>
                              {point.description.split('\\n').map((text, index) => <p key={index} className="description">{text}</p>)}
                            </>}
                            {point.photos.map(photo => (
                                <ImageWrapper {...{
                                  key: photo.fileName,
                                  src: `/images/${id}/${photo.fileName}`,
                                  ...photo,
                                }}/>
                            ))}
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
  const [error, setError] = useState(false);
  const { src, description, fileName, placeholder } = props;
  return (<>
    {error
      ? <img src={placeholder} alt={fileName} />
      : <div className="image-container">
          <LazyLoad {...{
            height: 200,
            offset: 5000,
            placeholder: <img src={placeholder} alt={fileName} />,
          }}>
            <img {...{
              src,
              alt: fileName,
              onError: () => setError(true),
            }} />
        </LazyLoad>
        {!!description && <div className="image-description">{description}</div>}
      </div>
    }
  </>)
}

const TextRecordModal = props => {
  const { points } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="custom-btn">
        純文字紀錄
      </Button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {
            _.map(_.groupBy(points, point => point.timeStr.substring(0, 8)), (value, date) => (<React.Fragment key={date}>
              <div className="modal-date">{date}</div>
              {value.map(point => <div key={point.time}>{dayjs(point.time).format('HH:mm')} {point.name} {point.name && point.description && '。'} {point.description}</div>)}
            </React.Fragment>))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default GeoMap
