import BotTile from '../tiles/botTile';
import Slider from 'react-slick';

export default function CardSlider({data, pageData}) {
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
                return <BotTile key={bot._id} pageData={pageData} bot={bot} />
            })}
        </Slider>
    )
}
