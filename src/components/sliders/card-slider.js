import BotTile from '../tiles/botTile';
import Slider from 'react-slick';
import Link from 'next/link';

export default function CardSlider({data}) {
    return (
        <Slider
            className="card-slider"
            centerMode={true}
            centerPadding="0"
            slidesToShow={1}
            dots={true}
            infinite={true}
            arrows={false}
        >
            {data && data.map(bot=>{
                const botURL = createURL('/bot-details', { bot: bot._id});
                return <a key={bot._id} href={botURL} className="bot-tile carousel-item">
                    <div><BotTile  bot={bot} /></div>
                </a>
            })}
        </Slider>
    )
}
