import CandlestickChart from '../../../components/displays/CandlestickChart';

export default function ChartsPage({ symbol, interval, limit }) {
    return <div className="fullscreen-container fixed">
        <CandlestickChart
            symbol={symbol}
            interval={interval}
            limit={limit}
        />
    </div>
}

export async function getServerSideProps({ query }) {
    return { props: { ...query } };
}
