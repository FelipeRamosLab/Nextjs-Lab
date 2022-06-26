import BotTile from '../tiles/botTile';
import Slider from 'react-slick';

export default function CardSlider({data, pageData}) {
    return (
        <Slider
            className="card-slider"
            centerMode={true}
            centerPadding="0px"
            slidesToShow={3}
            dots={true}
            infinite={false}
            responsive={[{
                breakpoint: 601,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }]}
        >
            {data && data.map(bot=>{
                return <BotTile key={bot._id} pageData={pageData} bot={bot} />
            })}
        </Slider>
    )
}
