export default function ChartsPage({ symbol }) {
    return <div className="fullscreen-container">
        <h1>Redirecting to BTCUSDT (1D)</h1>
    </div>
}

export function getServerSideProps() {
    return {
      redirect: {
        destination: "/charts/BTCUSDT/1d",
        permanent: false,
      },
      props: {},
    };
  }