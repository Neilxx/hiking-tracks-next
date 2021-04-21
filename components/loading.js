import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <div id="loading" style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51,51,51,.6)',
    position: 'fixed',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',
  }}>
    <Spinner {...{
      animation: "grow",
      variant: "light",
      style: { width: 150, height: 150 },
    }}/>
  </div>
);

export default Loading;
