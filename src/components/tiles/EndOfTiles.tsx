const EndOfTiles = (): JSX.Element => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      background: '#eeede7',
      textAlign: "center",
    }}>
      <h1>We are at the end of the line. No more gifs can be fetched</h1>
    </div>
  )
}

export default EndOfTiles;