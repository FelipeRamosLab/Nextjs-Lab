export default function ChartsPage({ symbol }) {
    return <div className="fullscreen-container">
        <h1>Redirecting to BTCUSDT</h1>
    </div>
}

export function getServerSideProps() {
    return {
      redirect: {
        destination: "/charts/BTCUSDT",
        permanent: false,
      },
      props: {},
    };
  }